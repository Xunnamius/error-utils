[**@-xun/error**](../../README.md)

***

[@-xun/error](../../README.md) / [src](../README.md) / makeNamedError

# Function: makeNamedError()

> **makeNamedError**\<`ErrorClassType`, `Name`\>(`ErrorClass`, `name`): `` { [key in `$kind_${string}`]: symbol } `` & `{ [key in string]: ErrorClassType & NamedErrorMixin<InstanceType<ErrorClassType>> }` & `` { [key in `is${string}`]: (parameter: LiteralUnknownUnion<AnyErrorClassConstructor>) => parameter is ErrorClassType } ``

Defined in: [src/index.ts:79](https://github.com/Xunnamius/named-app-errors/blob/4a823a46c02f035232ca951b2f6cf9794b432b4e/src/index.ts#L79)

This function accepts a class extending Error and assigns it a name
that will survive minification/transpilation, improving DX.

Along with the error itself, this function returns the `is${name}` helper
function and the `$kind_${name}` symbol, both of which can be used to
identify instances of the class without resorting to `instanceof`, which has
some caveats (e.g. realms).

Note that all errors will have a non-own "name" property injected into their
prototype chain for improved DX.

## Type Parameters

### ErrorClassType

`ErrorClassType` *extends* [`AnyErrorClassConstructor`](../type-aliases/AnyErrorClassConstructor.md)

### Name

`Name` *extends* `string`

## Parameters

### ErrorClass

`ErrorClassType`

### name

`Name`

## Returns

`` { [key in `$kind_${string}`]: symbol } `` & `{ [key in string]: ErrorClassType & NamedErrorMixin<InstanceType<ErrorClassType>> }` & `` { [key in `is${string}`]: (parameter: LiteralUnknownUnion<AnyErrorClassConstructor>) => parameter is ErrorClassType } ``
