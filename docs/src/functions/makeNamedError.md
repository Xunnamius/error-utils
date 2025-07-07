[**@-xun/error**](../../README.md)

***

[@-xun/error](../../README.md) / [src](../README.md) / makeNamedError

# Function: makeNamedError()

> **makeNamedError**\<`ErrorClassType`, `Name`\>(`ErrorClass`, `name`): `` { [key in `$kind_${string}`]: symbol } `` & `{ [key in string]: ErrorClassType }` & `` { [key in `is${string}`]: (parameter: LiteralUnknownUnion<(args: any[]) => Error>) => parameter is ErrorClassType } ``

Defined in: [src/index.ts:29](https://github.com/Xunnamius/named-app-errors/blob/6a1ce16534f6454b3aea0e5a08ffefddb249d41c/src/index.ts#L29)

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

`ErrorClassType` *extends* (...`args`) => `Error`

### Name

`Name` *extends* `string`

## Parameters

### ErrorClass

`ErrorClassType`

### name

`Name`

## Returns

`` { [key in `$kind_${string}`]: symbol } `` & `{ [key in string]: ErrorClassType }` & `` { [key in `is${string}`]: (parameter: LiteralUnknownUnion<(args: any[]) => Error>) => parameter is ErrorClassType } ``
