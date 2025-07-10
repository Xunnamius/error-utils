<!-- symbiote-template-region-start 1 -->

<p align="center" width="100%">
  <img width="300" src="https://raw.githubusercontent.com/Xunnamius/error-utils/refs/heads/main/logo.png">
</p>

<p align="center" width="100%">
<!-- symbiote-template-region-end -->
TypeScript error handling DX/UX improvements capable of surviving minification.
<!-- symbiote-template-region-start 2 -->
</p>

<hr />

<div align="center">

[![Black Lives Matter!][x-badge-blm-image]][x-badge-blm-link]
[![Last commit timestamp][x-badge-lastcommit-image]][x-badge-repo-link]
[![Codecov][x-badge-codecov-image]][x-badge-codecov-link]
[![Source license][x-badge-license-image]][x-badge-license-link]
[![Uses Semantic Release!][x-badge-semanticrelease-image]][x-badge-semanticrelease-link]

[![NPM version][x-badge-npm-image]][x-badge-npm-link]
[![Monthly Downloads][x-badge-downloads-image]][x-badge-downloads-link]

</div>

<br />

# @-xun/error

<!-- symbiote-template-region-end -->

This tiny library provides so-called "named errors," which are normal [Error][1]
classes (compatible with all JS runtimes) with some slight tweaks to improve
overall handling safety, improve DX for the developers that work with these
classes, and improve UX for the users that might encounter them.

More specifically, this library returns a factory function
([`makeNamedError`][6]) capable of creating custom [Error][1] subclasses with
powerful [cross][4]-[package][5] [cross-realm instanceof checks][3] and
human-readable names that both survive transpilation/minification and show up in
stack traces.

<!-- symbiote-template-region-start 3 -->

---

<!-- remark-ignore-start -->
<!-- symbiote-template-region-end -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Features](#features)
- [Install](#install)
- [Usage](#usage)
- [Appendix](#appendix)
  - [Published Package Details](#published-package-details)
  - [License](#license)
- [Contributing and Support](#contributing-and-support)
  - [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- symbiote-template-region-start 4 -->
<!-- remark-ignore-end -->

<br />

## Features

**Works via a [simple wrapper function][2] using normal ES6 class syntax**

```typescript
makeNamedError(
  // Anonymous classes will be transformed into a named class by makeNamedError
  class extends Error {
    // ...
  },
  'MyCustomError'
);

makeNamedError(
  // However, for improved DX in TypeScript, give your class definitions names
  class MyCustomSubclassError extends MyCustomError {
    // ...
  },
  'MyCustomSubclassError'
);
```

**Makes error name available via prototypical instance and as a static class
property**

```typescript
const { MyCustomError } = makeNamedError(/* ... */, 'MyCustomError');

console.log(MyCustomError.name) // MyCustomError
console.log((new MyCustomError()).name) // MyCustomError
```

**Ensures error class names in error messages and other outputs survive
minification**

```typescript
const { MyCoolError } = makeNamedError(/* ... */, 'MyCoolError');

console.log(MyCoolError.name) // MyCoolError (every time!)
```

**Provides built-in type guards that are safer and more powerful than
`instanceof`**

```typescript
const { BigError, isBigError } = makeNamedError(/* ... */, 'BigError');

console.log(isBigError(new BigError())) // true
console.log(isBigError(new SomeOtherError())) // false
console.log(isBigError(new Error())) // false
```

Each class's `.isX()` function is additionally provided as a static class
property:

```typescript
const { BigError } = makeNamedError(/* ... */, 'BigError');

console.log(BigError.isError(new BigError())); // true
console.log(BigError.isError(new SomeOtherError())); // false
console.log(BigError.isError(new Error())); // false
```

All instanceof checks still work as expected (but can be avoided):

```typescript
const { BigError } = makeNamedError(/* ... */, 'BigError');
const { BiggestError } = makeNamedError(/* ... */, 'BiggestError');

console.log(new BigError() instanceof BigError); // true
console.log(new BigError() instanceof Error); // true
console.log(new BiggestError() instanceof BiggestError); // true
console.log(new BiggestError() instanceof Error); // true

console.log(new Error() instanceof BigError); // false
```

Unlike instanceof, the `.isX()`/`.isError()` function is both [cross-realm
safe][3] and safe to use in situations where multiple _distinct_ copies of your
error classes might exist in the dependency tree (e.g. [dual package
hazard][4]).

In case of the latter, where [two different libraries might import two different
versions of your error classes][5] (a surprisingly common occurrence!), this
package takes away the pain:

```typescript
import lib1 from 'some-lib-exports-your-error';
import lib2 from 'unrelated-lib-also-exports-same-error-but-not-strictly-equal';

console.log(new lib1.YourError() instanceof lib2.YourError); // false
console.log(lib2.YourError.isError(new lib1.YourError())); // true
```

**Supports inheritance** (both ES6 "extends" and pre-ES6 prototypical)

```typescript
const { AppError } = makeNamedError(
  class AppError extends Error {
    panic() {
      console.log('oh no!');
      process.exit(123);
    }
  },
  'AppError'
);

const { ValidationError } = makeNamedError(
  // Note how ValidationError extends AppError
  class ValidationError extends AppError {
    #validationErrors: string[];

    constructor(issues: string[]) {
      super();
      this.#validationErrors = issues;
    }

    getValidationErrors() {
      return this.#validationErrors;
    }
  },
  'ValidationError'
);

const error = new ValidationError(['validation error 1', 'validation error 2']);

if (ValidationError.isError(error)) {
  console.log('validation errors:', error.getValidationErrors().join(', '));
  // validation errors: validation error 1, validation error 2
}

// Other logic...

if (AppError.isError(error)) {
  error.panic(); // This will run thanks to polymorphism and inheritance rules
}

// The program will die before reaching this point thanks to error.panic()
```

**Comes with kickass TypeScript types out of the box**

```typescript
import {
  makeNamedError,
  isANamedErrorClass,
  isANamedErrorInstance
} from '@-xun/error';

const { SmallError, isSmallError } = makeNamedError(
  /* ... */, // All class methods and properties are preserved as expected
  'SmallError'
);

console.log(isANamedErrorClass(Error)); // false
console.log(isANamedErrorInstance(new Error())); // false
console.log(SmallError.isError(new Error())); // false
console.log(isSmallError(new Error())); // false

// All isX type guard functions will narrow unknown types properly!

console.log(isANamedErrorClass(SmallError)); // true
console.log(isANamedErrorInstance(new SmallError())); // true
console.log(SmallError.isError(new SmallError())); // true
console.log(isSmallError(new SmallError())); // true
```

## Install

<!-- symbiote-template-region-end -->

To install:

```shell
npm install @-xun/error
```

## Usage

Start using `@-xun/error` in four quick and easy steps.

1. Import:

```typescript
import { makeNamedError } from '@-xun/error';
```

2. Optionally create a "root" error class from which the rest of your custom
   Error subclasses will descend:

```typescript
export const { AppError } = makeNamedError(
  class AppError extends Error {},
  'AppError'
);
```

3. Create and export the rest of your custom Error subclasses as you normally
   would:

```typescript
export const { ValidationError } = makeNamedError(
  class ValidationError extends AppError {},
  'ValidationError'
);

export const { AuthError } = makeNamedError(
  class AuthError extends AppError {},
  'AuthError'
);

export const { NotFoundError } = makeNamedError(
  class NotFoundError extends AppError {},
  'NotFoundError'
);

// Improve TypeScript DX by exporting the literal class types too, if you want:

/**
 * Helpful comment for users of your Error subclass goes here.
 */
export type ValidationError = InstanceType<typeof ValidationError>;

/**
 * Helpful comment for users of your Error subclass goes here.
 */
export type AuthError = InstanceType<typeof AuthError>;

/**
 * Helpful comment for users of your Error subclass goes here.
 */
export type NotFoundError = InstanceType<typeof NotFoundError>;
```

4. Use your custom errors like any other `Error` subclass (because they are):

```typescript
import { ValidationError } from './shared/errors.ts';

// ...

if (somethingBadHappened) {
  throw new ValidationError();
}

// ...
```

Neat! 📸

<!-- symbiote-template-region-start 5 -->

## Appendix

<!-- symbiote-template-region-end -->

Further documentation can be found under [`docs/`][x-repo-docs].

<!-- TODO: additional appendix sections here -->
<!-- symbiote-template-region-start 6 -->

### Published Package Details

This is a [CJS2 package][x-pkg-cjs-mojito] with statically-analyzable exports
built by Babel for use in Node.js versions that are not end-of-life. For
TypeScript users, this package supports both `"Node10"` and `"Node16"` module
resolution strategies.

<!-- symbiote-template-region-end -->
<!-- TODO: additional package details here -->
<!-- symbiote-template-region-start 7 -->

<details><summary>Expand details</summary>

That means both CJS2 (via `require(...)`) and ESM (via `import { ... } from ...`
or `await import(...)`) source will load this package from the same entry points
when using Node. This has several benefits, the foremost being: less code
shipped/smaller package size, avoiding [dual package
hazard][x-pkg-dual-package-hazard] entirely, distributables are not
packed/bundled/uglified, a drastically less complex build process, and CJS
consumers aren't shafted.

Each entry point (i.e. `ENTRY`) in [`package.json`'s
`exports[ENTRY]`][x-repo-package-json] object includes one or more [export
conditions][x-pkg-exports-conditions]. These entries may or may not include: an
[`exports[ENTRY].types`][x-pkg-exports-types-key] condition pointing to a type
declaration file for TypeScript and IDEs, a
[`exports[ENTRY].module`][x-pkg-exports-module-key] condition pointing to
(usually ESM) source for Webpack/Rollup, a `exports[ENTRY].node` and/or
`exports[ENTRY].default` condition pointing to (usually CJS2) source for Node.js
`require`/`import` and for browsers and other environments, and [other
conditions][x-pkg-exports-conditions] not enumerated here. Check the
[package.json][x-repo-package-json] file to see which export conditions are
supported.

Note that, regardless of the [`{ "type": "..." }`][x-pkg-type] specified in
[`package.json`][x-repo-package-json], any JavaScript files written in ESM
syntax (including distributables) will always have the `.mjs` extension. Note
also that [`package.json`][x-repo-package-json] may include the
[`sideEffects`][x-pkg-side-effects-key] key, which is almost always `false` for
optimal [tree shaking][x-pkg-tree-shaking] where appropriate.

<!-- symbiote-template-region-end -->
<!-- TODO: additional package details here -->
<!-- symbiote-template-region-start 8 -->

</details>

### License

<!-- symbiote-template-region-end -->

See [LICENSE][x-repo-license].

<!-- TODO: additional license information and/or sections here -->
<!-- symbiote-template-region-start 9 -->

## Contributing and Support

**[New issues][x-repo-choose-new-issue] and [pull requests][x-repo-pr-compare]
are always welcome and greatly appreciated! 🤩** Just as well, you can [star 🌟
this project][x-badge-repo-link] to let me know you found it useful! ✊🏿 Or [buy
me a beer][x-repo-sponsor], I'd appreciate it. Thank you!

See [CONTRIBUTING.md][x-repo-contributing] and [SUPPORT.md][x-repo-support] for
more information.

<!-- symbiote-template-region-end -->
<!-- TODO: additional contribution/support sections here -->
<!-- symbiote-template-region-start 10 -->

### Contributors

<!-- symbiote-template-region-end -->
<!-- symbiote-template-region-start root-package-only -->
<!-- remark-ignore-start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- remark-ignore-end -->

Thanks goes to these wonderful people ([emoji
key][x-repo-all-contributors-emojis]):

<!-- remark-ignore-start -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://xunn.io/"><img src="https://avatars.githubusercontent.com/u/656017?v=4?s=100" width="100px;" alt="Bernard"/><br /><sub><b>Bernard</b></sub></a><br /><a href="#infra-Xunnamius" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/Xunnamius/error-utils/commits?author=Xunnamius" title="Code">💻</a> <a href="https://github.com/Xunnamius/error-utils/commits?author=Xunnamius" title="Documentation">📖</a> <a href="#maintenance-Xunnamius" title="Maintenance">🚧</a> <a href="https://github.com/Xunnamius/error-utils/commits?author=Xunnamius" title="Tests">⚠️</a> <a href="https://github.com/Xunnamius/error-utils/pulls?q=is%3Apr+reviewed-by%3AXunnamius" title="Reviewed Pull Requests">👀</a></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td align="center" size="13px" colspan="7">
        <img src="https://raw.githubusercontent.com/all-contributors/all-contributors-cli/1b8533af435da9854653492b1327a23a4dbd0a10/assets/logo-small.svg">
          <a href="https://all-contributors.js.org/docs/en/bot/usage">Add your contributions</a>
        </img>
      </td>
    </tr>
  </tfoot>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- remark-ignore-end -->

This project follows the [all-contributors][x-repo-all-contributors]
specification. Contributions of any kind welcome!

<!-- symbiote-template-region-end -->
<!-- symbiote-template-region-start workspace-package-only -->
<!-- (section elided by symbiote) -->
<!-- symbiote-template-region-end -->

[x-badge-blm-image]: https://xunn.at/badge-blm 'Join the movement!'
[x-badge-blm-link]: https://xunn.at/donate-blm
[x-badge-codecov-image]:
  https://img.shields.io/codecov/c/github/Xunnamius/error-utils/main?style=flat-square&token=HWRIOBAAPW&flag=package.main_root
  'Is this package well-tested?'
[x-badge-codecov-link]: https://codecov.io/gh/Xunnamius/error-utils
[x-badge-downloads-image]:
  https://img.shields.io/npm/dm/@-xun/error?style=flat-square
  'Number of times this package has been downloaded per month'
[x-badge-downloads-link]: https://npmtrends.com/@-xun/error
[x-badge-lastcommit-image]:
  https://img.shields.io/github/last-commit/Xunnamius/error-utils?style=flat-square
  'Latest commit timestamp'
[x-badge-license-image]:
  https://img.shields.io/npm/l/@-xun/error?style=flat-square
  "This package's source license"
[x-badge-license-link]:
  https://github.com/Xunnamius/error-utils/blob/main/LICENSE
[x-badge-npm-image]:
  https://xunn.at/npm-pkg-version/@-xun/error
  'Install this package using npm or yarn!'
[x-badge-npm-link]: https://npm.im/@-xun/error
[x-badge-repo-link]: https://github.com/Xunnamius/error-utils
[x-badge-semanticrelease-image]:
  https://xunn.at/badge-semantic-release
  'This repo practices continuous integration and deployment!'
[x-badge-semanticrelease-link]:
  https://github.com/semantic-release/semantic-release
[x-pkg-cjs-mojito]:
  https://dev.to/jakobjingleheimer/configuring-commonjs-es-modules-for-nodejs-12ed#publish-only-a-cjs-distribution-with-property-exports
[x-pkg-dual-package-hazard]:
  https://nodejs.org/api/packages.html#dual-package-hazard
[x-pkg-exports-conditions]:
  https://webpack.js.org/guides/package-exports#reference-syntax
[x-pkg-exports-module-key]:
  https://webpack.js.org/guides/package-exports#providing-commonjs-and-esm-version-stateless
[x-pkg-exports-types-key]:
  https://devblogs.microsoft.com/typescript/announcing-typescript-4-5-beta#packagejson-exports-imports-and-self-referencing
[x-pkg-side-effects-key]:
  https://webpack.js.org/guides/tree-shaking#mark-the-file-as-side-effect-free
[x-pkg-tree-shaking]: https://webpack.js.org/guides/tree-shaking
[x-pkg-type]:
  https://github.com/nodejs/node/blob/8d8e06a345043bec787e904edc9a2f5c5e9c275f/doc/api/packages.md#type
[x-repo-all-contributors]: https://github.com/all-contributors/all-contributors
[x-repo-all-contributors-emojis]: https://allcontributors.org/docs/en/emoji-key
[x-repo-choose-new-issue]:
  https://github.com/Xunnamius/error-utils/issues/new/choose
[x-repo-contributing]: /CONTRIBUTING.md
[x-repo-docs]: docs
[x-repo-license]: ./LICENSE
[x-repo-package-json]: package.json
[x-repo-pr-compare]: https://github.com/Xunnamius/error-utils/compare
[x-repo-sponsor]: https://github.com/sponsors/Xunnamius
[x-repo-support]: /.github/SUPPORT.md
[1]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[2]: #usage
[3]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof#instanceof_and_multiple_realms
[4]: https://github.com/GeoffreyBooth/dual-package-hazard
[5]: https://github.com/isaacs/node-primordials/issues/3#issuecomment-1592383083
[6]: ./docs/src/functions/makeNamedError.md
