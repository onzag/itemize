[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/cache](../modules/server_cache.md) / ICreationOptions

# Interface: ICreationOptions

[server/cache](../modules/server_cache.md).ICreationOptions

## Hierarchy

- [`IWritingOptions`](server_cache.IWritingOptions.md)

  ↳ **`ICreationOptions`**

## Table of contents

### Properties

- [containerId](server_cache.ICreationOptions.md#containerid)
- [createdBy](server_cache.ICreationOptions.md#createdby)
- [dictionary](server_cache.ICreationOptions.md#dictionary)
- [forId](server_cache.ICreationOptions.md#forid)
- [ifAlreadyExistsReturn](server_cache.ICreationOptions.md#ifalreadyexistsreturn)
- [ignoreAlreadyExists](server_cache.ICreationOptions.md#ignorealreadyexists)
- [ignorePreSideEffects](server_cache.ICreationOptions.md#ignorepresideeffects)
- [ignoreSideEffects](server_cache.ICreationOptions.md#ignoresideeffects)
- [indexing](server_cache.ICreationOptions.md#indexing)
- [language](server_cache.ICreationOptions.md#language)
- [listenerUUID](server_cache.ICreationOptions.md#listeneruuid)
- [parent](server_cache.ICreationOptions.md#parent)
- [version](server_cache.ICreationOptions.md#version)

### Methods

- [ifAlreadyExistsCall](server_cache.ICreationOptions.md#ifalreadyexistscall)

## Properties

### containerId

• **containerId**: `string`

#### Defined in

[server/cache.ts:90](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L90)

___

### createdBy

• `Optional` **createdBy**: `string`

#### Defined in

[server/cache.ts:87](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L87)

___

### dictionary

• **dictionary**: `string`

#### Defined in

[server/cache.ts:89](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L89)

___

### forId

• `Optional` **forId**: `string`

#### Defined in

[server/cache.ts:85](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L85)

___

### ifAlreadyExistsReturn

• `Optional` **ifAlreadyExistsReturn**: ``"null"`` \| ``"current"``

#### Inherited from

[IWritingOptions](server_cache.IWritingOptions.md).[ifAlreadyExistsReturn](server_cache.IWritingOptions.md#ifalreadyexistsreturn)

#### Defined in

[server/cache.ts:80](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L80)

___

### ignoreAlreadyExists

• `Optional` **ignoreAlreadyExists**: `boolean`

#### Inherited from

[IWritingOptions](server_cache.IWritingOptions.md).[ignoreAlreadyExists](server_cache.IWritingOptions.md#ignorealreadyexists)

#### Defined in

[server/cache.ts:79](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L79)

___

### ignorePreSideEffects

• `Optional` **ignorePreSideEffects**: `boolean`

#### Inherited from

[IWritingOptions](server_cache.IWritingOptions.md).[ignorePreSideEffects](server_cache.IWritingOptions.md#ignorepresideeffects)

#### Defined in

[server/cache.ts:68](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L68)

___

### ignoreSideEffects

• `Optional` **ignoreSideEffects**: `boolean`

#### Inherited from

[IWritingOptions](server_cache.IWritingOptions.md).[ignoreSideEffects](server_cache.IWritingOptions.md#ignoresideeffects)

#### Defined in

[server/cache.ts:69](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L69)

___

### indexing

• `Optional` **indexing**: ``"wait_for"`` \| ``"detached"``

#### Inherited from

[IWritingOptions](server_cache.IWritingOptions.md).[indexing](server_cache.IWritingOptions.md#indexing)

#### Defined in

[server/cache.ts:66](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L66)

___

### language

• **language**: `string`

#### Defined in

[server/cache.ts:88](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L88)

___

### listenerUUID

• `Optional` **listenerUUID**: `string`

#### Inherited from

[IWritingOptions](server_cache.IWritingOptions.md).[listenerUUID](server_cache.IWritingOptions.md#listeneruuid)

#### Defined in

[server/cache.ts:67](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L67)

___

### parent

• `Optional` **parent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `type` | `string` |
| `version` | `string` |

#### Defined in

[server/cache.ts:91](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L91)

___

### version

• `Optional` **version**: `string`

#### Defined in

[server/cache.ts:86](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L86)

## Methods

### ifAlreadyExistsCall

▸ `Optional` **ifAlreadyExistsCall**(`v`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md) |

#### Returns

`void`

#### Inherited from

[IWritingOptions](server_cache.IWritingOptions.md).[ifAlreadyExistsCall](server_cache.IWritingOptions.md#ifalreadyexistscall)

#### Defined in

[server/cache.ts:81](https://github.com/onzag/itemize/blob/a24376ed/server/cache.ts#L81)
