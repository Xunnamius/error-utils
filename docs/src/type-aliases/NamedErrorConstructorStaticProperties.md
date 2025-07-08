[**@-xun/error**](../../README.md)

***

[@-xun/error](../../README.md) / [src](../README.md) / NamedErrorConstructorStaticProperties

# Type Alias: NamedErrorConstructorStaticProperties\<ErrorConstructor\>

> **NamedErrorConstructorStaticProperties**\<`ErrorConstructor`\> = `object`

Defined in: [src/index.ts:27](https://github.com/Xunnamius/named-app-errors/blob/39b58db82425d19d50ab6c04797cd1d8cdaae37c/src/index.ts#L27)

Additional properties exposed as static properties of named error classes.

## Type Parameters

### ErrorConstructor

`ErrorConstructor` *extends* `Error`

## Properties

### isError()

> **isError**: (`parameter`) => `parameter is ErrorConstructor`

Defined in: [src/index.ts:32](https://github.com/Xunnamius/named-app-errors/blob/39b58db82425d19d50ab6c04797cd1d8cdaae37c/src/index.ts#L32)

A reference to this class's `isX` function originally returned by
[makeNamedError](../functions/makeNamedError.md).

#### Parameters

##### parameter

`unknown`

#### Returns

`parameter is ErrorConstructor`
