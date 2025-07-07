import { expect, it } from 'tstyche';

import { isANamedErrorClass, isANamedErrorInstance, makeNamedError } from 'universe';

import type {
  AnyErrorClassConstructor,
  NamedErrorConstructorStaticProperties
} from 'universe';

it('returns properly typed named error components', async () => {
  const { ParentDummyError, isParentDummyError } = makeNamedError(
    class ParentDummyError extends Error {},
    'ParentDummyError'
  );

  const { ChildDummyError, isChildDummyError } = makeNamedError(
    class ChildDummyError extends ParentDummyError {
      a = 1;
      b = '1';

      constructor(a: number, b: string) {
        super();

        this.a = a;
        this.b = b;
      }

      /**
       * Comment!
       */
      additionalMethod() {
        return true;
      }
    },
    'ChildDummyError'
  );

  const error: unknown = {};
  const parentDummyError = new ParentDummyError();
  const childDummyError = new ChildDummyError(1, '2');

  expect(parentDummyError.message).type.toBe<string>();
  expect(childDummyError.a).type.toBe<number>();
  expect(childDummyError.b).type.toBe<string>();
  expect(childDummyError.additionalMethod()).type.toBe<boolean>();

  const errorClassHandlersMap: [
    type: AnyErrorClassConstructor,
    handler: () => undefined
  ][] = [];

  for (const [errorConstructor, _] of errorClassHandlersMap) {
    if (isANamedErrorClass(errorConstructor)) {
      expect(errorConstructor).type.toBeAssignableTo<AnyErrorClassConstructor>();
      expect(errorConstructor).type.toBeAssignableTo<
        NamedErrorConstructorStaticProperties<Error>
      >();

      if (errorConstructor.isError(error)) {
        expect(error).type.toBe<Error>();
      }
    }
  }

  if (isANamedErrorInstance(error)) {
    expect(error).type.toBeAssignableTo<Error>();
  }

  type ParentDummyError = InstanceType<typeof ParentDummyError>;
  type ChildDummyError = InstanceType<typeof ChildDummyError>;

  if (isParentDummyError(error)) {
    expect(error).type.toBeAssignableTo<ParentDummyError>();
    expect(error).type.toBeAssignableTo<Error>();
  }

  if (isChildDummyError(error)) {
    expect(error).type.toBeAssignableTo<ChildDummyError>();
    expect(error).type.toBeAssignableTo<Error>();
  }

  if (ChildDummyError.isError(error)) {
    expect(error).type.toBeAssignableTo<ChildDummyError>();
    expect(error).type.toBeAssignableTo<Error>();
  }
});
