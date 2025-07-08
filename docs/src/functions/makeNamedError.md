[**@-xun/error**](../../README.md)

***

[@-xun/error](../../README.md) / [src](../README.md) / makeNamedError

# Function: makeNamedError()

> **makeNamedError**\<`ErrorClass`, `Name`\>(`ErrorClass`, `name`): `` { [key in `$kind_${string}`]: symbol } `` & `{ [key in string]: SpecificErrorClassConstructor<InstanceType<ErrorClass>> & NamedErrorConstructorStaticProperties<InstanceType<ErrorClass>> }` & `` { [key in `is${string}`]: (parameter: unknown) => parameter is InstanceType<ErrorClass> } ``

Defined in: [src/index.ts:83](https://github.com/Xunnamius/named-app-errors/blob/550bfbcf4c0f36fec3564e86927ee97dd5416e9d/src/index.ts#L83)

This function accepts a class extending Error and assigns it a name
that will survive minification/transpilation, improving DX.

Along with the error itself, this function returns the `is${name}` helper
function and the `$kind_${name}` symbol, both of which can be used to
identify instances of the class without resorting to `instanceof`, which has
some caveats (e.g. realms).

Note that all errors will have a non-own "name" property injected into their
prototype chain for improved DX.

## Type Parameters

### ErrorClass

`ErrorClass` *extends* [`AnyErrorClassConstructor`](../type-aliases/AnyErrorClassConstructor.md)

### Name

`Name` *extends* `string`

## Parameters

### ErrorClass

`ErrorClass`

### name

`Name`

## Returns

`` { [key in `$kind_${string}`]: symbol } `` & `{ [key in string]: SpecificErrorClassConstructor<InstanceType<ErrorClass>> & NamedErrorConstructorStaticProperties<InstanceType<ErrorClass>> }` & `` { [key in `is${string}`]: (parameter: unknown) => parameter is InstanceType<ErrorClass> } ``
