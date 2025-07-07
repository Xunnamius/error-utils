/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage } from 'universe:error.ts';

import type { LiteralUnknownUnion } from '@-xun/types';

/**
 * An internal symbol used to track class metadata.
 */
export const $kind = Symbol.for('@-xun/error:instance-kind-hint');

const lockedDownProperty = {
  configurable: false,
  writable: false,
  enumerable: false
};

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
export function makeNamedError<ErrorClassType extends new (...args: any[]) => Error>(
  ErrorClass: ErrorClassType,
  name: string
) {
  const $specificKind = Symbol.for(`instance-kind-hint:${name}`);
  // ? This is an *instance* of ErrorClass's parent
  const prototypicalParentInstance = ErrorClass.prototype;

  if (!prototypicalParentInstance) {
    throw new Error(ErrorMessage.MissingPrototype(name));
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
    value: [$specificKind],
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
    value: [$specificKind],
    ...lockedDownProperty
  });

  const superKindProperty = Object.getPrototypeOf(ErrorClass)?.[$kind] as
    | symbol[]
    | undefined;

  // ? If superKindProperty isn't defined, and we're not dealing with the Error
  // ? class itself, then this is probably an incorrect use of this function
  if (!Array.isArray(superKindProperty) || !superKindProperty.length) {
    throw new Error(ErrorMessage.MissingSuperKind(name));
  }

  prototypicalParentInstance[$kind].push(...superKindProperty);

  return {
    [`$kind_${name}`]: $specificKind,
    [name]: ErrorClass,
    [`is${name}`]: function (
      parameter: LiteralUnknownUnion<new (...args: any[]) => Error>
    ): parameter is typeof ErrorClass {
      const castedParameter = parameter as unknown as { [$kind]: symbol[] };

      return (
        !!parameter &&
        Object.getOwnPropertySymbols(parameter).includes($kind) &&
        Array.isArray(castedParameter[$kind]) &&
        castedParameter[$kind].includes($specificKind)
      );
    }
  };
}
