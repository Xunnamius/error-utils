[**@-xun/error**](../../README.md)

***

[@-xun/error](../../README.md) / [src](../README.md) / NamedErrorWithKind

# Interface: NamedErrorWithKind\<ErrorClassType\>

Defined in: [src/index.ts:20](https://github.com/Xunnamius/named-app-errors/blob/bca08674e8fdf0223738d3e05200af58a786846b/src/index.ts#L20)

The shape of a named error class and/or the instance of such a class.

## Type Parameters

### ErrorClassType

`ErrorClassType` *extends* (...`args`) => `Error`

## Properties

### is()

> **is**: (`parameter`) => `parameter is ErrorClassType`

Defined in: [src/index.ts:33](https://github.com/Xunnamius/named-app-errors/blob/bca08674e8fdf0223738d3e05200af58a786846b/src/index.ts#L33)

A reference to the `isX` function returned by [makeNamedError](../functions/makeNamedError.md).

#### Parameters

##### parameter

`unknown`

#### Returns

`parameter is ErrorClassType`
