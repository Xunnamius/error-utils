[**@-xun/error**](../../README.md)

***

[@-xun/error](../../README.md) / [src](../README.md) / isANamedErrorClass

# Function: isANamedErrorClass()

> **isANamedErrorClass**(`parameter`): `parameter is NamedErrorWithKind<any>`

Defined in: [src/index.ts:51](https://github.com/Xunnamius/named-app-errors/blob/c85fb8ef5ac55346f5ae735c31d49b3beed72bb9/src/index.ts#L51)

Returns `true` if `parameter` is a Error subclass created using
[makeNamedError](makeNamedError.md).

**This function is NOT for match instances, but actual classes extending
Error!**

## Parameters

### parameter

`unknown`

## Returns

`parameter is NamedErrorWithKind<any>`
