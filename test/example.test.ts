/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable no-restricted-syntax */
import { isANamedErrorClass, isANamedErrorInstance, makeNamedError } from 'universe';

it('feature examples work', async () => {
  expect.hasAssertions();

  const { MyCustomError } = makeNamedError(
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

  // *

  expect(MyCustomError.name).toBe('MyCustomError');
  expect(new MyCustomError().name).toBe('MyCustomError');

  // *

  const { MyCoolError: M } = makeNamedError(
    class minified_name_bad extends Error {},
    'MyCoolError'
  );

  expect(M.name).toBe('MyCoolError');

  // *

  const { BigError, isBigError } = makeNamedError(class extends Error {}, 'BigError');

  expect(isBigError(new BigError())).toBeTrue();
  expect(isBigError(new MyCustomError())).toBeFalse();
  expect(isBigError(new Error('"'))).toBeFalse();

  expect(BigError.isError(new BigError())).toBeTrue();
  expect(BigError.isError(new MyCustomError())).toBeFalse();
  expect(BigError.isError(new Error('"'))).toBeFalse();

  // *

  const lib1 = makeNamedError(class extends Error {}, 'YourError');
  const lib2 = makeNamedError(class extends Error {}, 'YourError');

  expect(new lib1.YourError() instanceof lib2.YourError).toBeFalse();
  expect(lib2.YourError.isError(new lib1.YourError())).toBeTrue();

  // *

  {
    let successes = 0;

    const { AppError } = makeNamedError(
      class AppError extends Error {
        panic() {
          successes += 1;
        }
      },
      'AppError'
    );

    const { ValidationError } = makeNamedError(
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
      successes += 1;
      expect('validation errors: ' + error.getValidationErrors().join(', ')).toBe(
        'validation errors: validation error 1, validation error 2'
      );
    }

    if (AppError.isError(error)) {
      error.panic();
    }

    expect(successes).toBe(2);
  }

  // *

  const { SmallError, isSmallError } = makeNamedError(
    class extends Error {},
    'SmallError'
  );

  expect(isANamedErrorClass(Error)).toBeFalse();
  expect(isANamedErrorInstance(new Error('"'))).toBeFalse();
  expect(SmallError.isError(new Error('"'))).toBeFalse();
  expect(isSmallError(new Error('"'))).toBeFalse();

  expect(isANamedErrorClass(SmallError)).toBeTrue();
  expect(isANamedErrorInstance(new SmallError())).toBeTrue();
  expect(SmallError.isError(new SmallError())).toBeTrue();
  expect(isSmallError(new SmallError())).toBeTrue();
});

it('usage examples work', async () => {
  expect.hasAssertions();

  const { AppError } = makeNamedError(class AppError extends Error {}, 'AppError');

  const { ValidationError } = makeNamedError(
    class ValidationError extends AppError {},
    'ValidationError'
  );

  const { AuthError } = makeNamedError(class AuthError extends AppError {}, 'AuthError');

  const { NotFoundError } = makeNamedError(
    class NotFoundError extends AppError {},
    'NotFoundError'
  );

  expect(isANamedErrorClass(ValidationError)).toBeTrue();
  expect(isANamedErrorClass(AuthError)).toBeTrue();
  expect(isANamedErrorClass(NotFoundError)).toBeTrue();

  // The TypeScript DX lines are tested in type.test.ts
});
