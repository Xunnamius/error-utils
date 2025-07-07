import { ErrorMessage } from 'universe:error.ts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyErrorClassConstructor = new (...args: any[]) => Error;

// Error being a "constructor" (and class) at runtime but "an instance of Error"
// to the type system simultaneously reminds me of C/C++ structs and what not :)
export type SpecificErrorClassConstructor<ErrorInstance extends Error> = new (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
) => ErrorInstance;

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
 * Additional properties exposed as static properties of named error classes.
 */
export type NamedErrorConstructorStaticProperties<ErrorConstructor extends Error> = {
  /**
   * A reference to this class's `isX` function originally returned by
   * {@link makeNamedError}.
   */
  isError: (parameter: unknown) => parameter is ErrorConstructor;
};

/**
 * Returns `true` if `parameter` is _an instance of_ an {@link Error} subclass
 * created using {@link makeNamedError}.
 */
export function isANamedErrorInstance(parameter: unknown): parameter is Error {
  return (
    !!parameter &&
    typeof parameter === 'object' &&
    $kind in parameter &&
    Array.isArray(parameter[$kind])
  );
}

/**
 * Returns `true` if `parameter` is an {@link Error} subclass (_not an
 * instance_) created using {@link makeNamedError}.
 *
 * **This function is NOT for match instances, but actual classes extending
 * {@link Error}!**
 */
export function isANamedErrorClass(
  parameter: unknown
): parameter is AnyErrorClassConstructor & NamedErrorConstructorStaticProperties<Error> {
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
  ErrorClass extends AnyErrorClassConstructor,
  const Name extends string
>(
  ErrorClass: ErrorClass,
  name: Name
): { [key in `$kind_${Name}`]: symbol } & {
  // ? We need to narrow ErrorClass for the benefit of .isError()
  [key in Name]: SpecificErrorClassConstructor<InstanceType<ErrorClass>> &
    NamedErrorConstructorStaticProperties<InstanceType<ErrorClass>>;
} & {
  [key in `is${Name}`]: (parameter: unknown) => parameter is InstanceType<ErrorClass>;
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
  Object.defineProperty(ErrorClass, 'isError', {
    value: isError,
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

  return {
    [`$kind_${name}`]: $specificKind,
    [name]: ErrorClass,
    [`is${name}`]: isError
  } as ReturnType<typeof makeNamedError<ErrorClass, Name>>;

  type IsX = ReturnType<typeof makeNamedError>['isX'];
  function isError(...[parameter]: Parameters<IsX>): ReturnType<IsX> {
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
