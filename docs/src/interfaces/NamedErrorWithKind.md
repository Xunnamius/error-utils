[**@-xun/error**](../../README.md)

***

[@-xun/error](../../README.md) / [src](../README.md) / NamedErrorWithKind

# Interface: NamedErrorWithKind\<ErrorClassType\>

Defined in: [src/index.ts:20](https://github.com/Xunnamius/named-app-errors/blob/c85fb8ef5ac55346f5ae735c31d49b3beed72bb9/src/index.ts#L20)

The shape of a named error class and/or the instance of such a class.

## Type Parameters

### ErrorClassType

`ErrorClassType` *extends* (...`args`) => `Error`

## Properties

### is()

> **is**: (`parameter`) => `parameter is ErrorClassType`

Defined in: [src/index.ts:26](https://github.com/Xunnamius/named-app-errors/blob/c85fb8ef5ac55346f5ae735c31d49b3beed72bb9/src/index.ts#L26)

A reference to the `isX` function returned by [makeNamedError](../functions/makeNamedError.md).

#### Parameters

##### parameter

`unknown`

#### Returns

`parameter is ErrorClassType`
