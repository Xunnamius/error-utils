[![npm version](https://badge.fury.io/js/named-app-errors.svg)](https://badge.fury.io/js/named-app-errors)

# error-utils (@-xun/error)

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

```typescript
import { AppError, makeNamedError } from 'named-app-errors';

export class CustomSpecialError extends AppError {
    constructor(message?: string) {
        super(message ?? 'something important failed');
    }
}
makeNamedError(CustomSpecialError, 'CustomSpecialError');

export class DeepCustomSpecialError extends CustomSpecialError {
    constructor(details?: string)
    constructor(
      public readonly details = '(no details)',
      message: string | undefined = undefined
    ) {
        super(message ?? `something important failed: ${details}`);
    }
}
makeNamedError(DeepCustomSpecialError, 'DeepCustomSpecialError');
```

It might seem redundant to supply both the class object and a class name string,
but it is necessary for the shiny new error name to survive minification.

Note how `DeepCustomSpecialError`'s parameter list ends with
`message: string | undefined = undefined`. Ensuring your error constructor
always accepts an optional `message` as its final parameter allows easy
extension of all `AppError` subclasses. Additionally, the `public readonly`
[parameter property](https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties)
can be used to expose any extra constructor arguments.

Afterwards, you can use your error classes like so:

```typescript
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
  if (e instanceof DeepCustomSpecialError) {
    console.warn(e.details);
    externalLogger(e);
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
    - [AppValidationError](#appvalidationerror)
      - [InvalidAppConfigurationError](#invalidappconfigurationerror)
      - [InvalidAppEnvironmentError](#invalidappenvironmenterror)
    - [ClientValidationError](#clientvalidationerror)
      - [InvalidClientConfigurationError](#invalidclientconfigurationerror)
      - [InvalidItemError](#invaliditemerror)
      - [InvalidSecretError](#invalidsecreterror)

### AppError

```typescript
AppError(message?: string) extends Error
```

`AppError` represents a generic application error. It should be used as an
application-wide base error class, which makes hygienic practices like
application-specific
[instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)
guards in `catch` blocks much easier to implement and more meaningful in
context.

#### Example

```typescript
import { AppError } from 'named-app-errors';

throw new AppError('badness');
```

### AuthError

```typescript
AuthError(message?: string) extends AppError
```

`AuthError` represents a generic auth error.

#### Example

```typescript
import { AuthError } from 'named-app-errors';

throw new AuthError();
```

### NotAuthenticatedError

```typescript
NotAuthenticatedError(message?: string) extends AuthError
```

`NotAuthenticatedError` represents an authentication failure.

#### Example

```typescript
import { NotAuthenticatedError } from 'named-app-errors';

throw new NotAuthenticatedError();
```

### NotAuthorizedError

```typescript
NotAuthorizedError(message?: string) extends AuthError
```

`NotAuthorizedError` represents an authorization failure.

#### Example

```typescript
import { NotAuthorizedError } from 'named-app-errors';

throw new NotAuthorizedError();
```

### GuruMeditationError

```typescript
GuruMeditationError(message?: string) extends AppError
```

`GuruMeditationError` represents the occurrence of a supposedly impossible
runtime condition, the implication being the assistance of a senior developer is
required to debug efficiently. Scary!

#### Example

```typescript
import { GuruMeditationError } from 'named-app-errors';

throw new GuruMeditationError();
```

### HttpError

```typescript
HttpError(
  public readonly res?: ServerResponseLike,
  error?: string
) extends AppError
```

`HttpError` represents a generic HTTP, request, response, or related failure.

The `ServerResponseLike` type is compatible with response types from Node.js and
most fetch libraries:

```typescript
type ResponseShapeA = { statusCode: number; statusMessage: string };
type ResponseShapeB = { status: number; statusText: string };
type ServerResponseLike = ResponseShapeA | ResponseShapeB;
```

#### Example

```typescript
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

```typescript
NotFoundError(message?: string) extends AppError
```

`NotFoundError` represents a failure to locate something.

#### Example

```typescript
import { NotFoundError } from 'named-app-errors';

throw new NotFoundError('user');
```

### ItemNotFoundError

```typescript
ItemNotFoundError<T = undefined>(
  public readonly item?: T,
  public readonly itemName?: string
) extends NotFoundError
```

`ItemNotFoundError` represents the failure to locate a specific item.

#### Example

```typescript
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

```typescript
TrialError(message?: string) extends AppError
```

`TrialError` represents a generic failure that occurred while setting up and/or
running a test. This error should never appear outside of a testing environment.

#### Example

```typescript
import { TrialError } from 'named-app-errors';

jest.beforeAll(() => {
  throw new TrialError('failed to setup test environment');
});
```

### DummyError

```typescript
DummyError(message?: string) extends TrialError
```

`DummyError` is a generic pseudo-error meant to be thrown, caught, and consumed
exclusively within a testing environment to verify the correctness of error
handling behavior.

#### Example

```typescript
import { DummyError } from 'named-app-errors';
import { thingUnderTest } from './place';

it('handles errors properly', async () => {
  await expect(thingUnderTest(() => {
    throw new DummyError('this error should be caught');
  })).resolves.toBeUndefined();
});
```

### ValidationError

```typescript
ValidationError(message?: string) extends AppError
```

`ValidationError` represents a generic validation failure.

#### Example

```typescript
import { ValidationError } from 'named-app-errors';

throw new ValidationError('invalid data received');
```

### AppValidationError

```typescript
AppValidationError(message?: string) extends ValidationError
```

`AppValidationError` represents a generic validation failure outside of the
user's control.

#### Example

```typescript
import { AppValidationError } from 'named-app-errors';

throw new AppValidationError('invalid application data');
```

### InvalidAppConfigurationError

```typescript
InvalidAppConfigurationError(
  public readonly details?: string
) extends AppValidationError
```

`InvalidAppConfigurationError` represents an application misconfiguration
outside of the user's control.

#### Example

```typescript
import { InvalidAppConfigurationError } from 'named-app-errors';

throw new InvalidAppConfigurationError('config at "./myapp.config.js" is invalid');
```

### InvalidAppEnvironmentError

```typescript
InvalidAppEnvironmentError(
  public readonly details?: string
) extends AppValidationError
```

`InvalidAppEnvironmentError` represents a misconfigured runtime environment
outside of the user's control.

#### Example

```typescript
import { InvalidAppEnvironmentError } from 'named-app-errors';

throw new InvalidAppEnvironmentError('missing NODE_ENV in process.env');
```

### ClientValidationError

```typescript
ClientValidationError(message?: string) extends ValidationError
```

`ClientValidationError` represents a generic validation failure due to user
error.

#### Example

```typescript
import { ClientValidationError } from 'named-app-errors';

throw new ClientValidationError('invalid data received');
```

### InvalidClientConfigurationError

```typescript
InvalidClientConfigurationError(
  public readonly details?: string
) extends ClientValidationError
```

`InvalidClientConfigurationError` represents a user-provided misconfiguration.

#### Example

```typescript
import { InvalidClientConfigurationError } from 'named-app-errors';

throw new InvalidClientConfigurationError('client config is invalid');
```

### InvalidItemError

```typescript
InvalidItemError<T = undefined>(
  public readonly item?: T,
  public readonly itemName?: string = 'id'
) extends ClientValidationError
```

`InvalidItemError` represents encountering a specific invalid item.

#### Example

```typescript
import { InvalidItemError } from 'named-app-errors';
import { ObjectId } from 'mongodb';

const ref = 'some-ref-string';
let oid: ObjectId;

try {
  oid = new ObjectId(ref);
} catch {
  throw new InvalidItemError(ref);
}
```

### InvalidSecretError

```typescript
InvalidSecretError(secretType?: string) extends ClientValidationError
```

`InvalidSecretError` represents a failure while validating credentials, key
material, some token, or other sensitive data. This error does not reveal any
additional information about the data or the error other than that it occurred.

```typescript
import { InvalidSecretError } from 'named-app-errors';

const secret = ...
const token = new BearerToken(secret);

if(!token) {
  throw new InvalidSecretError();
  // Or:
  throw new InvalidSecretError('bearer token');
}
```
