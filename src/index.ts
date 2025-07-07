/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage } from 'universe:error.ts';

import type { LiteralUnknownUnion } from '@-xun/types';

/**
 * An internal symbol used to track class metadata.
 */
export const $kind = Symbol.for('@-xun/error:instance-kind-hint');

const lockedDownProperty = Object.freeze({
  configurable: false,
  writable: false,
  enumerable: false
});

/**
 * The shape of a named error class and/or the instance of such a class.
 */
export interface NamedErrorWithKind<
  ErrorClassType extends new (...args: any[]) => Error
> {
  /**
   * A reference to the `isX` function returned by {@link makeNamedError}.
   */
  is: (parameter: unknown) => parameter is ErrorClassType;
}

/**
 * Returns `true` if `parameter` is an instance of an {@link Error} subclass
 * created using {@link makeNamedError}.
 */
export function isANamedErrorInstance(
  parameter: unknown
): parameter is NamedErrorWithKind<any> {
  return (
    !!parameter &&
    typeof parameter === 'object' &&
    $kind in parameter &&
    Array.isArray(parameter[$kind])
  );
}

/**
 * Returns `true` if `parameter` is a {@link Error} subclass created using
 * {@link makeNamedError}.
 *
 * **This function is NOT for match instances, but actual classes extending
 * {@link Error}!**
 */
export function isANamedErrorClass(
  parameter: unknown
): parameter is NamedErrorWithKind<any> {
  return (
    !!parameter &&
    typeof parameter === 'function' &&
    $kind in parameter &&
    Array.isArray(parameter[$kind]) &&
    'prototype' in parameter &&
    isANamedErrorInstance(parameter.prototype) &&
    'constructor' in parameter.prototype &&
    parameter.prototype.constructor === parameter
  );
}

/**
 * This function accepts a class extending {@link Error} and assigns it a name
 * that will survive minification/transpilation, improving DX.
 *
 * Along with the error itself, this function returns the `is${name}` helper
 * function and the `$kind_${name}` symbol, both of which can be used to
 * identify instances of the class without resorting to `instanceof`, which has
 * some caveats (e.g. realms).
 *
 * Note that all errors will have a non-own "name" property injected into their
 * prototype chain for improved DX.
 */
export function makeNamedError<
  ErrorClassType extends new (...args: any[]) => Error,
  const Name extends string
>(
  ErrorClass: ErrorClassType,
  name: Name
): { [key in `$kind_${Name}`]: symbol } & {
  [key in Name]: ErrorClassType & NamedErrorWithKind<ErrorClassType>;
} & {
  [key in `is${Name}`]: (
    parameter: LiteralUnknownUnion<new (...args: any[]) => Error>
  ) => parameter is typeof ErrorClass;
} {
  const $specificKind = Symbol.for(`instance-kind-hint:${name}`);
  // ? This is an *instance* of ErrorClass's parent
  const prototypicalParentInstance = ErrorClass.prototype;
  const ourKinds: symbol[] = [$specificKind];

  if (!prototypicalParentInstance) {
    throw new Error(ErrorMessage.MissingPrototype(name));
  }

  const superKindProperty = Object.getPrototypeOf(ErrorClass)?.[$kind] as
    | symbol[]
    | undefined;

  const isMissingSuperKind =
    !Array.isArray(superKindProperty) || !superKindProperty.length;

  const isParentClassTheErrorClass =
    Object.getPrototypeOf(prototypicalParentInstance)?.name === 'Error';

  // ? If superKindProperty isn't defined, and we're not dealing with the Error
  // ? class itself, then this is probably an incorrect use of this function
  if (isMissingSuperKind) {
    if (!isParentClassTheErrorClass) {
      throw new Error(ErrorMessage.MissingSuperKind(name));
    }
  } else {
    ourKinds.push(...superKindProperty);
  }

  // ? We do this because minified/transpiled classes might lose their names
  Object.defineProperty(ErrorClass, 'name', {
    value: name,
    ...lockedDownProperty,
    // ? Preserve ES6 semantics
    configurable: true
  });

  // ? We do this to keep track of inheritance statically on the class itself
  Object.defineProperty(ErrorClass, $kind, {
    value: ourKinds,
    ...lockedDownProperty
  });

  // ? We do this so that nobody has to pass around a buncha isX functions
  Object.defineProperty(ErrorClass, 'is', {
    value: isX,
    ...lockedDownProperty
  });

  // ? This is just for sugar purposes
  Object.defineProperty(prototypicalParentInstance, 'name', {
    value: name,
    ...lockedDownProperty,
    // ? Preserve ES6 semantics
    configurable: true
  });

  // ? We do this to keep track of inheritance statically at the instance level
  Object.defineProperty(prototypicalParentInstance, $kind, {
    value: ourKinds,
    ...lockedDownProperty
  });

  // ? We do this so that nobody has to pass around a buncha isX functions
  Object.defineProperty(prototypicalParentInstance, 'is', {
    value: isX,
    ...lockedDownProperty
  });

  return {
    [`$kind_${name}`]: $specificKind,
    [name]: ErrorClass,
    [`is${name}`]: isX
  } as ReturnType<typeof makeNamedError<ErrorClassType, Name>>;

  function isX(
    parameter: LiteralUnknownUnion<new (...args: any[]) => Error>
  ): parameter is typeof ErrorClass {
    // eslint-disable-next-line no-restricted-syntax
    const isInstanceOf = parameter instanceof ErrorClass;

    if (isANamedErrorInstance(parameter)) {
      const isMatchingKind = (parameter as unknown as { [$kind]: symbol[] })[
        $kind
      ].includes($specificKind);

      return isInstanceOf || isMatchingKind;
    }

    return false;
  }
}
