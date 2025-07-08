[**@-xun/error**](../../README.md)

***

[@-xun/error](../../README.md) / [src](../README.md) / isANamedErrorClass

# Function: isANamedErrorClass()

> **isANamedErrorClass**(`parameter`): `parameter is AnyErrorClassConstructor & NamedErrorConstructorStaticProperties<Error>`

Defined in: [src/index.ts:55](https://github.com/Xunnamius/named-app-errors/blob/39b58db82425d19d50ab6c04797cd1d8cdaae37c/src/index.ts#L55)

Returns `true` if `parameter` is an Error subclass (_not an
instance_) created using [makeNamedError](makeNamedError.md).

**This function is NOT for match instances, but actual classes extending
Error!**

## Parameters

### parameter

`unknown`

## Returns

`parameter is AnyErrorClassConstructor & NamedErrorConstructorStaticProperties<Error>`
