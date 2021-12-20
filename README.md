[![npm version](https://badge.fury.io/js/named-app-errors.svg)](https://badge.fury.io/js/named-app-errors)

# named-app-errors

This package exports a set of \"named\" (i.e. in the stack trace) typed error
classes extending the
[`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
class. The output of these errors provides better DX than is achieved by
extending `Error` alone, especially when using minifiers.

This package includes TypeScript types and provides:

- A UMD/CJS/AMD bundle (no tree-shaking)
- ES2015 modules (tree-shaking)

## Install

```sh
npm install named-app-errors
```

## Usage

When creating your own error classes, you should extend [AppError](#apperror)
(or any of its descendants) and call the special `makeNamedError` method
afterwards like so:

```TypeScript
import { AppError, makeNamedError } from 'named-app-errors';

export class CustomSpecialError extends AppError {
    constructor(message?: string) {
        super(message ?? 'something important failed');
    }
}
makeNamedError(CustomSpecialError, 'CustomSpecialError');

export class DeepCustomSpecialError extends CustomSpecialError {
    constructor(public readonly details?: string, message?: string) {
        super(message ?? `something important failed: ${details ?? 'unknown'}`);
    }
}
makeNamedError(DeepCustomSpecialError, 'DeepCustomSpecialError');
```

It might seem redundant to supply both the class object and a class name string,
but it is necessary for the shiny new error name to survive destructive
minification.

Note that each constructor's parameter list ends with the `message?: string`
parameter. Adhering to this pattern allows easy extension of your error classes.
Additionally, the `public readonly`
[parameter property](https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties)
can be used to expose any extra constructor arguments. See
`DeepCustomSpecialError` for an example.

Afterwards, you can use your error classes like so:

```TypeScript
import { AppError } from 'named-app-errors';
// ...
try {
  // ...
  if (badness) {
    throw new CustomSpecialError();
  }
  // ...
  if (badCondition) {
    throw new DeepCustomSpecialError('bad bad not good');
  }
} catch (e) {
  if (e instanceof CustomSpecialError) { // ◄ Catches both custom error types
    externalLogger(e);
    console.warn(e);
  } else if (e instanceof AppError) { // ◄ Catches any other AppError subtypes
    console.error(e);
  } else {
    // Must be someone else's problem
    throw e;
  }
}
```

## Type Glossary

This library comes with the following error types built in:

- [AppError](#apperror)
  - [AuthError](#autherror)
    - [NotAuthenticatedError](#notauthenticatederror)
    - [NotAuthorizedError](#notauthorizederror)
  - [GuruMeditationError](#gurumeditationerror)
  - [HttpError](#httperror)
  - [NotFoundError](#notfounderror)
    - [ItemNotFoundError](#itemnotfounderror)
  - [TrialError](#trialerror)
    - [DummyError](#dummyerror)
  - [ValidationError](#validationerror)
    - [InvalidConfigurationError](#invalidconfigurationerror)
    - [InvalidEnvironmentError](#invalidenvironmenterror)
    - [InvalidIdError](#invalididerror)
    - [InvalidParameterError](#invalidparametererror)
    - [InvalidTokenError](#invalidtokenerror)

### AppError

```TypeScript
AppError(message?: string) extends Error
```

`AppError` represents a generic application error. It should be used as an
application-wide base error class, which makes hygienic practices like
application-specific
[instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)
guards in `catch` blocks much easier to implement and more meaningful in
context.

#### Example

```TypeScript
import { AppError } from 'named-app-errors';

throw new AppError('badness');
```

### AuthError

```TypeScript
AuthError(message?: string) extends AppError
```

`AuthError` represents a generic auth error.

#### Example

```TypeScript
import { AuthError } from 'named-app-errors';

throw new AuthError();
```

### NotAuthenticatedError

```TypeScript
NotAuthenticatedError(message?: string) extends AuthError
```

`NotAuthenticatedError` represents an authentication failure.

#### Example

```TypeScript
import { NotAuthenticatedError } from 'named-app-errors';

throw new NotAuthenticatedError();
```

### NotAuthorizedError

```TypeScript
NotAuthorizedError(message?: string) extends AuthError
```

`NotAuthorizedError` represents an authorization failure.

#### Example

```TypeScript
import { NotAuthorizedError } from 'named-app-errors';

throw new NotAuthorizedError();
```

### GuruMeditationError

```TypeScript
GuruMeditationError(message?: string) extends AppError
```

`GuruMeditationError` represents the occurrence of a supposedly impossible
runtime condition, the implication being the assistance of a senior developer is
required to debug efficiently. Scary!

#### Example

```TypeScript
import { GuruMeditationError } from 'named-app-errors';

throw new GuruMeditationError();
```

### HttpError

```TypeScript
HttpError(public readonly res: ServerResponse, error?: string, message?: string) extends AppError
```

`HttpError` represents a generic HTTP, request, response, or related failure.

#### Example

```TypeScript
import { HttpError } from 'named-app-errors';
import { fetch } from 'node-fetch';

try {
  const res = await fetch('https://some.url');

  if (!res.ok) {
    throw new HttpError(res);
  }
  // ...
  if(...) {
    throw new HttpError(res, 'some specific error occurred');
  }
} catch (e) {
  if (e instanceof HttpError) {
    console.log('extra context:', e.res.headers.raw());
  }

  handleError(e);
}
```

### NotFoundError

```TypeScript
NotFoundError(message?: string) extends AppError
```

`NotFoundError` represents a failure to locate something.

#### Example

```TypeScript
import { NotFoundError } from 'named-app-errors';

throw new NotFoundError('user');
```

### ItemNotFoundError

```TypeScript
ItemNotFoundError<T = undefined>(public readonly ref?: T, message?: string) extends NotFoundError
```

`ItemNotFoundError` represents the failure to locate a specified item.

#### Example

```TypeScript
import { ItemNotFoundError } from 'named-app-errors';
import { ObjectId } from 'mongodb';

const ref = 'some-string-reference-id';
const id = new ObjectId(ref);
// ...
throw new ItemNotFoundError();
throw new ItemNotFoundError(id);
throw new ItemNotFoundError(ref);
```

### TrialError

```TypeScript
TrialError(message?: string) extends AppError
```

`TrialError` represents a generic failure that occurred while setting up and/or
running a test. This error should never appear outside of a testing environment.

#### Example

```TypeScript
import { TrialError } from 'named-app-errors';

jest.beforeAll(() => {
  throw new TrialError('failed to setup test environment');
});
```

### DummyError

```TypeScript
DummyError(message?: string) extends TrialError
```

`DummyError` is a generic pseudo-error meant to be thrown, caught, and consumed
during exclusively within a testing environment to verify the correctness of
error handling behavior.

#### Example

```TypeScript
import { DummyError } from 'named-app-errors';
import { thingUnderTest } from './place';

it('handles errors properly', async () => {
  await expect(thingUnderTest(() => {
    throw new DummyError('this error should be caught');
  })).resolves.toBeUndefined();
});
```

### ValidationError

```TypeScript
ValidationError(message?: string) extends AppError
```

`ValidationError` represents a generic validation failure.

#### Example

```TypeScript
import { ValidationError } from 'named-app-errors';

throw new ValidationError('invalid data received');
```

### InvalidConfigurationError

```TypeScript
InvalidConfigurationError(public readonly details?: string, message?: string) extends ValidationError
```

`InvalidConfigurationError` represents a user-provided misconfiguration.

#### Example

```TypeScript
import { InvalidConfigurationError } from 'named-app-errors';

throw new InvalidConfigurationError('config at "./myapp.config.js" is invalid');
```

### InvalidEnvironmentError

```TypeScript
InvalidEnvironmentError(public readonly details?: string, message?: string) extends ValidationError
```

`InvalidEnvironmentError` represents a misconfigured runtime environment.

#### Example

```TypeScript
import { InvalidEnvironmentError } from 'named-app-errors';

throw new InvalidEnvironmentError('missing NODE_ENV in process.env');
```

### InvalidIdError

```TypeScript
InvalidIdError<T = unknown>(public readonly id?: T, message?: string) extends ValidationError
```

`InvalidIdError` represents encountering an invalid or illegal identifier.

#### Example

```TypeScript
import { InvalidIdError } from 'named-app-errors';
import { ObjectId } from 'mongodb';

const ref = 'some-ref-string';
let oid: ObjectId;

try {
  oid = new ObjectId(ref);
} catch {
  throw new InvalidIdError(ref);
}
```

### InvalidParameterError

```TypeScript
InvalidParameterError(public readonly param: string | string[], message?: string) extends ValidationError
```

`InvalidParameterError` represents encountering one or more invalid, illegal, or
otherwise unexpected parameters/arguments.

#### Example

```TypeScript
import { InvalidParameterError } from 'named-app-errors';

throw new InvalidParameterError('username');
throw new InvalidParameterError(['username', 'id', 'date']);
// Handles empty arrays too
throw new InvalidParameterError([]);
```

### InvalidTokenError

```TypeScript
InvalidTokenError() extends ValidationError
```

`InvalidTokenError` represents a failure while handling credentials, key
material, some token, or other sensitive data. This error does not reveal any
additional information about the data or the error other than that it occurred.

```TypeScript
import { InvalidTokenError } from 'named-app-errors';

const secret = ...
const token = new BearerToken(secret);

if(!token) {
  throw new InvalidTokenError();
}
```
