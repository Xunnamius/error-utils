[**@-xun/error**](../../README.md)

***

[@-xun/error](../../README.md) / [src](../README.md) / NamedErrorMixin

# Type Alias: NamedErrorMixin\<ErrorType\>

> **NamedErrorMixin**\<`ErrorType`\> = `object`

Defined in: [src/index.ts:23](https://github.com/Xunnamius/named-app-errors/blob/4a823a46c02f035232ca951b2f6cf9794b432b4e/src/index.ts#L23)

Additional properties exposed by named error instances and as static
properties of their respective classes.

## Type Parameters

### ErrorType

`ErrorType` *extends* `Error`

## Properties

### is()

> **is**: (`parameter`) => `parameter is ErrorType`

Defined in: [src/index.ts:27](https://github.com/Xunnamius/named-app-errors/blob/4a823a46c02f035232ca951b2f6cf9794b432b4e/src/index.ts#L27)

A reference to the `isX` function returned by [makeNamedError](../functions/makeNamedError.md).

#### Parameters

##### parameter

`unknown`

#### Returns

`parameter is ErrorType`
