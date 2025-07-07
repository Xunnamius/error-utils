[**@-xun/error**](../../README.md)

***

[@-xun/error](../../README.md) / [src](../README.md) / isANamedErrorClass

# Function: isANamedErrorClass()

> **isANamedErrorClass**(`parameter`): `parameter is NamedErrorWithKind<any>`

Defined in: [src/index.ts:58](https://github.com/Xunnamius/named-app-errors/blob/bca08674e8fdf0223738d3e05200af58a786846b/src/index.ts#L58)

Returns `true` if `parameter` is a Error subclass created using
[makeNamedError](makeNamedError.md).

**This function is NOT for match instances, but actual classes extending
Error!**

## Parameters

### parameter

`unknown`

## Returns

`parameter is NamedErrorWithKind<any>`
