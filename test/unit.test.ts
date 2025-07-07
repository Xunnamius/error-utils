/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable unicorn/error-message */
// * These tests ensure the exported interfaces under test function as expected.

import {
  $kind,
  isANamedErrorClass,
  isANamedErrorInstance,
  makeNamedError
} from 'universe';

import { ErrorMessage } from 'universe:error.ts';

describe('::makeNamedError', () => {
  it('accepts a class and returns expected named-error components that account for inheritance', async () => {
    expect.hasAssertions();

    const { $kind_MyError, MyError, isMyError } = makeNamedError(
      class extends Error {},
      'MyError'
    );

    const { $kind_MyExtendedError, MyExtendedError, isMyExtendedError } = makeNamedError(
      class extends MyError {},
      'MyExtendedError'
    );

    const {
      $kind_MyDoublyExtendedError,
      MyDoublyExtendedError,
      isMyDoublyExtendedError
    } = makeNamedError(class extends MyExtendedError {}, 'MyDoublyExtendedError');

    const kindMyError = MyError[$kind];
    const kindMyExtendedError = MyExtendedError[$kind];
    const kindMyDoublyExtendedError = MyDoublyExtendedError[$kind];

    expect(kindMyError).toStrictEqual([$kind_MyError]);
    expect(kindMyExtendedError).toStrictEqual([$kind_MyExtendedError, $kind_MyError]);
    expect(kindMyDoublyExtendedError).toStrictEqual([
      $kind_MyDoublyExtendedError,
      $kind_MyExtendedError,
      $kind_MyError
    ]);

    expect(isMyError(new Error())).toBeFalse();
    expect(isMyError(new MyError())).toBeTrue();

    expect(isMyExtendedError(new MyError())).toBeFalse();
    expect(isMyExtendedError(new MyExtendedError())).toBeTrue();
    expect(isMyError(new MyExtendedError())).toBeTrue();

    expect(isMyDoublyExtendedError(new MyError())).toBeFalse();
    expect(isMyDoublyExtendedError(new MyExtendedError())).toBeFalse();
    expect(isMyDoublyExtendedError(new MyDoublyExtendedError())).toBeTrue();
    expect(isMyExtendedError(new MyDoublyExtendedError())).toBeTrue();
    expect(isMyError(new MyDoublyExtendedError())).toBeTrue();

    expect(
      isMyError({
        [$kind]: [$kind_MyError]
      })
    ).toBeTrue();

    expect(
      isMyExtendedError({
        [$kind]: [$kind_MyExtendedError, $kind_MyError]
      })
    ).toBeTrue();

    expect(
      isMyDoublyExtendedError({
        [$kind]: [$kind_MyDoublyExtendedError, $kind_MyExtendedError, $kind_MyError]
      })
    ).toBeTrue();
  });

  it('returns isX function that returns false when passed non-instance type', async () => {
    expect.hasAssertions();

    const { isMyError } = makeNamedError(class extends Error {}, 'MyError');

    expect(isMyError(undefined)).toBeFalse();
    expect(isMyError(false)).toBeFalse();
    expect(isMyError(null)).toBeFalse();
    expect(isMyError({})).toBeFalse();
    expect(isMyError(Symbol('thing'))).toBeFalse();
    expect(isMyError(new Date())).toBeFalse();
  });

  it('returns isX function as both static and prototypical property on error class', async () => {
    expect.hasAssertions();

    const { MyError, isMyError } = makeNamedError(class extends Error {}, 'MyError');

    expect(MyError.is).toBe(isMyError);
    expect(MyError.is(Number.NaN)).toBeFalse();
    expect(MyError.is(new Error())).toBeFalse();
    expect(MyError.is(new MyError())).toBeTrue();
  });

  it('can fall back to normal instanceof', async () => {
    expect.hasAssertions();

    const { MyError, isMyError } = makeNamedError(class extends Error {}, 'MyError');

    // * Note how these classes are not named errors
    class MyErrorError extends MyError {}

    expect(isMyError(new MyErrorError())).toBeTrue();
    expect(isMyError(new (class extends MyErrorError {})())).toBeTrue();
  });

  it('does not throw if provided class extends Error directly', async () => {
    expect.hasAssertions();
    expect(() => makeNamedError(class extends Error {}, 'MyError')).not.toThrow();
  });

  it('throws if provided class does not extend a named error or Error itself', async () => {
    expect.hasAssertions();

    expect(() => makeNamedError(Error, 'MyError1')).toThrow(
      ErrorMessage.MissingSuperKind('MyError1')
    );

    // @ts-expect-error: only classes extending Error are allowed
    expect(() => makeNamedError(class {}, 'MyError2')).toThrow(
      ErrorMessage.MissingSuperKind('MyError2')
    );

    class X {}

    // @ts-expect-error: only classes extending Error are allowed
    expect(() => makeNamedError(class extends X {}, 'MyError2')).toThrow(
      ErrorMessage.MissingSuperKind('MyError2')
    );
  });

  it('throws if provided a prototype-less argument', async () => {
    expect.hasAssertions();

    expect(() => makeNamedError(Object.create(null), 'MyError')).toThrow(
      ErrorMessage.MissingPrototype('MyError')
    );
  });
});

describe('::isANamedErrorInstance', () => {
  it('returns true if and only if provided argument is an instance of a named error class', async () => {
    expect.hasAssertions();

    const { MyError } = makeNamedError(class extends Error {}, 'MyError');

    expect(isANamedErrorInstance(MyError)).toBeFalse();
    expect(isANamedErrorInstance(new MyError())).toBeTrue();

    expect(isANamedErrorInstance(Error)).toBeFalse();
    expect(isANamedErrorInstance(new Error())).toBeFalse();
  });
});

describe('::isANamedErrorClass', () => {
  it('returns true if and only if provided argument is a named error class', async () => {
    expect.hasAssertions();

    const { MyError } = makeNamedError(class extends Error {}, 'MyError');

    expect(isANamedErrorClass(MyError)).toBeTrue();
    expect(isANamedErrorClass(new MyError())).toBeFalse();

    expect(isANamedErrorClass(Error)).toBeFalse();
    expect(isANamedErrorClass(new Error())).toBeFalse();
  });
});
