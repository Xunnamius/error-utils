[**@-xun/error**](../../README.md)

***

[@-xun/error](../../README.md) / [src](../README.md) / isANamedErrorClass

# Function: isANamedErrorClass()

> **isANamedErrorClass**(`parameter`): `parameter is AnyErrorClassConstructor & NamedErrorConstructorStaticProperties<Error>`

Defined in: [src/index.ts:56](https://github.com/Xunnamius/named-app-errors/blob/550bfbcf4c0f36fec3564e86927ee97dd5416e9d/src/index.ts#L56)

Returns `true` if `parameter` is an Error subclass (_not an
instance_) created using [makeNamedError](makeNamedError.md).

**This function is NOT for match instances, but actual classes extending
Error!**

## Parameters

### parameter

`unknown`

## Returns

`parameter is AnyErrorClassConstructor & NamedErrorConstructorStaticProperties<Error>`
