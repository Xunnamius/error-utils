[**@-xun/error**](../../README.md)

***

[@-xun/error](../../README.md) / [src](../README.md) / isANamedErrorClass

# Function: isANamedErrorClass()

> **isANamedErrorClass**(`parameter`): `parameter is AnyErrorClassConstructor & NamedErrorMixin<Error>`

Defined in: [src/index.ts:52](https://github.com/Xunnamius/named-app-errors/blob/4a823a46c02f035232ca951b2f6cf9794b432b4e/src/index.ts#L52)

Returns `true` if `parameter` is a Error subclass created using
[makeNamedError](makeNamedError.md).

**This function is NOT for match instances, but actual classes extending
Error!**

## Parameters

### parameter

`unknown`

## Returns

`parameter is AnyErrorClassConstructor & NamedErrorMixin<Error>`
