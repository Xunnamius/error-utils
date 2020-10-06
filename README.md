

[![npm version](https://badge.fury.io/js/named-app-errors.svg)](https://badge.fury.io/js/named-app-errors)

# named-app-errors

This package exports a set of \"named\" (i.e. in the stack trace) error classes
(extending the
[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
class) with TypeScript support. The output of these errors provides better DX
than normal since the error type's name is included when `toString()` is called.

This package includes TypeScript types and provides:

+ A UMD/CJS/AMD bundle (no tree-shaking)
+ ES2015 modules (tree-shaking)

## Install

```sh
npm install named-app-errors
```

## Usage

When creating your own error classes, you should subclass [AppError](#apperror)
and call the special `makeNamedError` method afterwards like so:

```TypeScript
import { AppError, makeNamedError } from 'named-app-errors'

export class CustomSpecialError extends AppError {
    constructor(message?: string) {
        super(message ?? 'something important failed');
    }
}

makeNamedError(CustomSpecialError, 'CustomSpecialError');
```

It might seem redundant to supply both the class object and a class name string,
but it is necessary for the shiny new error name to survive minification.

Afterwards, you can use your error class like so:

```TypeScript
import { AppError, CustomSpecialError } from 'named-app-errors'

try {
    // ...
    throw new CustomSpecialError();
    // ...
}

catch(e) {
    if(e instanceof AppError)
        console.error(e) // ==> "CustomSpecialError: something important failed"

    else
        throw e;
}
```

## Type Glossary

This library provides the following types:

+ [AppError](#apperror)
+ [GuruMeditationError](#gurumeditationerror)
+ [HookError](#hookerror)
+ [FetchError](#fetcherror)
+ [NotAuthorizedError](#notauthorizederror)
+ [NotFoundError](#notfounderror)
+ [KeyTypeError](#keytypeerror)
+ [ValidationError](#validationerror)

### AppError

```TypeScript
AppError(message?: string, fileName?: string, lineNumber?: number)
```

A generic application error. Direct descendant of
[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
with the same constructor and no additional functionality. This class is meant
to be used as an application-wide base error class, which makes it useful for
stuff like
[instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)
checks in `catch` blocks (so that we're only handling our application's errors).

```TypeScript
import { AppError } from 'named-app-errors'

throw new AppError();
```

### GuruMeditationError
```TypeScript
GuruMeditationError(message?: string)
```

A generic application error.

```TypeScript
import { AppError } GuruMeditationError 'named-app-errors'

throw new GuruMeditationError();
```

### HookError
```TypeScript
HookError(message?: string)
```

A generic application error.

```TypeScript
import { HookError } from 'named-app-errors'

throw new HookError();
```

### FetchError
```TypeScript
FetchError(res: Response, error?: string)
```

A generic application error.

```TypeScript
import { FetchError } from 'named-app-errors'

throw new FetchError();
```

### NotAuthorizedError
```TypeScript
NotAuthorizedError(message?: string)
```

A generic application error.

```TypeScript
import { AppError NotAuthorizedError from 'named-app-errors'

throw new NotAuthorizedError();
```

### NotFoundError
```TypeScript
NotFoundError(reference?: T)
```

A generic application error.

```TypeScript
import { NotFoundError } from 'named-app-errors'

throw new NotFoundError();
```

### KeyTypeError
```TypeScript
KeyTypeError()
```

A generic application error.

```TypeScript
import { KeyTypeError } from 'named-app-errors'

throw new KeyTypeError();
```

### ValidationError
```TypeScript
ValidationError(message?: string)
```

A generic application error.

```TypeScript
import { ValidationError } from 'named-app-errors'

throw new ValidationError();
```


Represents an object with well-defined NextApiRequest and NextApiResponse
properties where generic type `T` is passed to
[NextApiResponse&lt;T&gt;](https://nextjs.org/docs/basic-features/typescript#api-routes).

Specifying `T` is optional. By default, `T = Record<string, unknown>`.

```TypeScript
import type { NextParamsRR } from '@ergodark/next-types'

export async function addToRequestLog({ req, res }: NextParamsRR) {
    ...
}
```

## Contributing

Issues and pull requests are welcome! In lieu of a formal styleguide, take care
to maintain the existing coding style.

Add unit tests for any new or changed functionality (if necessary). Please lint
and test your code!

## Release History

* 1.0.x Initial release
