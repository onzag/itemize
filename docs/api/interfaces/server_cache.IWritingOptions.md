[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/cache](../modules/server_cache.md) / IWritingOptions

# Interface: IWritingOptions

[server/cache](../modules/server_cache.md).IWritingOptions

## Hierarchy

- [`IBasicOptions`](server_cache.IBasicOptions.md)

  ↳ **`IWritingOptions`**

  ↳↳ [`ICreationOptions`](server_cache.ICreationOptions.md)

  ↳↳ [`ICopyOptions`](server_cache.ICopyOptions.md)

## Table of contents

### Properties

- [ifAlreadyExistsReturn](server_cache.IWritingOptions.md#ifalreadyexistsreturn)
- [ignoreAlreadyExists](server_cache.IWritingOptions.md#ignorealreadyexists)
- [ignorePreSideEffects](server_cache.IWritingOptions.md#ignorepresideeffects)
- [ignoreSideEffects](server_cache.IWritingOptions.md#ignoresideeffects)
- [indexing](server_cache.IWritingOptions.md#indexing)
- [listenerUUID](server_cache.IWritingOptions.md#listeneruuid)

### Methods

- [ifAlreadyExistsCall](server_cache.IWritingOptions.md#ifalreadyexistscall)

## Properties

### ifAlreadyExistsReturn

• `Optional` **ifAlreadyExistsReturn**: ``"null"`` \| ``"current"``

#### Defined in

[server/cache.ts:80](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L80)

___

### ignoreAlreadyExists

• `Optional` **ignoreAlreadyExists**: `boolean`

#### Defined in

[server/cache.ts:79](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L79)

___

### ignorePreSideEffects

• `Optional` **ignorePreSideEffects**: `boolean`

#### Inherited from

[IBasicOptions](server_cache.IBasicOptions.md).[ignorePreSideEffects](server_cache.IBasicOptions.md#ignorepresideeffects)

#### Defined in

[server/cache.ts:68](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L68)

___

### ignoreSideEffects

• `Optional` **ignoreSideEffects**: `boolean`

#### Inherited from

[IBasicOptions](server_cache.IBasicOptions.md).[ignoreSideEffects](server_cache.IBasicOptions.md#ignoresideeffects)

#### Defined in

[server/cache.ts:69](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L69)

___

### indexing

• `Optional` **indexing**: ``"wait_for"`` \| ``"detached"``

#### Inherited from

[IBasicOptions](server_cache.IBasicOptions.md).[indexing](server_cache.IBasicOptions.md#indexing)

#### Defined in

[server/cache.ts:66](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L66)

___

### listenerUUID

• `Optional` **listenerUUID**: `string`

#### Inherited from

[IBasicOptions](server_cache.IBasicOptions.md).[listenerUUID](server_cache.IBasicOptions.md#listeneruuid)

#### Defined in

[server/cache.ts:67](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L67)

## Methods

### ifAlreadyExistsCall

▸ `Optional` **ifAlreadyExistsCall**(`v`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md) |

#### Returns

`void`

#### Defined in

[server/cache.ts:81](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L81)
