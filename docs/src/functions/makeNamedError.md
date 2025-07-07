[**@-xun/error**](../../README.md)

***

[@-xun/error](../../README.md) / [src](../README.md) / makeNamedError

# Function: makeNamedError()

> **makeNamedError**\<`ErrorClassType`, `Name`\>(`ErrorClass`, `name`): `` { [key in `$kind_${string}`]: symbol } `` & `{ [key in string]: ErrorClassType & NamedErrorWithKind<ErrorClassType> }` & `` { [key in `is${string}`]: (parameter: LiteralUnknownUnion<(args: any[]) => Error>) => parameter is ErrorClassType } ``

Defined in: [src/index.ts:85](https://github.com/Xunnamius/named-app-errors/blob/bca08674e8fdf0223738d3e05200af58a786846b/src/index.ts#L85)

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

`` { [key in `$kind_${string}`]: symbol } `` & `{ [key in string]: ErrorClassType & NamedErrorWithKind<ErrorClassType> }` & `` { [key in `is${string}`]: (parameter: LiteralUnknownUnion<(args: any[]) => Error>) => parameter is ErrorClassType } ``
