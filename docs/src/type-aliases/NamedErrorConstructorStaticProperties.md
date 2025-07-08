[**@-xun/error**](../../README.md)

***

[@-xun/error](../../README.md) / [src](../README.md) / NamedErrorConstructorStaticProperties

# Type Alias: NamedErrorConstructorStaticProperties\<ErrorInstance\>

> **NamedErrorConstructorStaticProperties**\<`ErrorInstance`\> = `object`

Defined in: [src/index.ts:28](https://github.com/Xunnamius/named-app-errors/blob/550bfbcf4c0f36fec3564e86927ee97dd5416e9d/src/index.ts#L28)

Additional properties exposed as static properties of named error classes.

## Type Parameters

### ErrorInstance

`ErrorInstance` *extends* `Error`

## Properties

### isError()

> **isError**: (`parameter`) => `parameter is Error & ErrorInstance`

Defined in: [src/index.ts:33](https://github.com/Xunnamius/named-app-errors/blob/550bfbcf4c0f36fec3564e86927ee97dd5416e9d/src/index.ts#L33)

A reference to this class's `isX` function originally returned by
[makeNamedError](../functions/makeNamedError.md).

#### Parameters

##### parameter

`unknown`

#### Returns

`parameter is Error & ErrorInstance`
