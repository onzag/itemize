[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/cache](../modules/server_cache.md) / ICopyOptions

# Interface: ICopyOptions

[server/cache](../modules/server_cache.md).ICopyOptions

## Hierarchy

- [`IWritingOptions`](server_cache.IWritingOptions.md)

  ↳ **`ICopyOptions`**

## Table of contents

### Properties

- [currentRawValueSQL](server_cache.ICopyOptions.md#currentrawvaluesql)
- [ifAlreadyExistsCall](server_cache.ICopyOptions.md#ifalreadyexistscall)
- [ifAlreadyExistsReturn](server_cache.ICopyOptions.md#ifalreadyexistsreturn)
- [ignoreAlreadyExists](server_cache.ICopyOptions.md#ignorealreadyexists)
- [ignorePreSideEffects](server_cache.ICopyOptions.md#ignorepresideeffects)
- [ignoreSideEffects](server_cache.ICopyOptions.md#ignoresideeffects)
- [indexing](server_cache.ICopyOptions.md#indexing)
- [listenerUUID](server_cache.ICopyOptions.md#listeneruuid)
- [targetContainerId](server_cache.ICopyOptions.md#targetcontainerid)
- [targetCreatedBy](server_cache.ICopyOptions.md#targetcreatedby)
- [targetId](server_cache.ICopyOptions.md#targetid)
- [targetOverrides](server_cache.ICopyOptions.md#targetoverrides)
- [targetParent](server_cache.ICopyOptions.md#targetparent)
- [targetVersion](server_cache.ICopyOptions.md#targetversion)

## Properties

### currentRawValueSQL

• `Optional` **currentRawValueSQL**: [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

#### Defined in

[server/cache.ts:109](https://github.com/onzag/itemize/blob/73e0c39e/server/cache.ts#L109)

___

### ifAlreadyExistsCall

• `Optional` **ifAlreadyExistsCall**: (`v`: [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)) => `void`

#### Type declaration

▸ (`v`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md) |

##### Returns

`void`

#### Inherited from

[IWritingOptions](server_cache.IWritingOptions.md).[ifAlreadyExistsCall](server_cache.IWritingOptions.md#ifalreadyexistscall)

#### Defined in

[server/cache.ts:81](https://github.com/onzag/itemize/blob/73e0c39e/server/cache.ts#L81)

___

### ifAlreadyExistsReturn

• `Optional` **ifAlreadyExistsReturn**: ``"null"`` \| ``"current"``

#### Inherited from

[IWritingOptions](server_cache.IWritingOptions.md).[ifAlreadyExistsReturn](server_cache.IWritingOptions.md#ifalreadyexistsreturn)

#### Defined in

[server/cache.ts:80](https://github.com/onzag/itemize/blob/73e0c39e/server/cache.ts#L80)

___

### ignoreAlreadyExists

• `Optional` **ignoreAlreadyExists**: `boolean`

#### Inherited from

[IWritingOptions](server_cache.IWritingOptions.md).[ignoreAlreadyExists](server_cache.IWritingOptions.md#ignorealreadyexists)

#### Defined in

[server/cache.ts:79](https://github.com/onzag/itemize/blob/73e0c39e/server/cache.ts#L79)

___

### ignorePreSideEffects

• `Optional` **ignorePreSideEffects**: `boolean`

#### Inherited from

[IWritingOptions](server_cache.IWritingOptions.md).[ignorePreSideEffects](server_cache.IWritingOptions.md#ignorepresideeffects)

#### Defined in

[server/cache.ts:68](https://github.com/onzag/itemize/blob/73e0c39e/server/cache.ts#L68)

___

### ignoreSideEffects

• `Optional` **ignoreSideEffects**: `boolean`

#### Inherited from

[IWritingOptions](server_cache.IWritingOptions.md).[ignoreSideEffects](server_cache.IWritingOptions.md#ignoresideeffects)

#### Defined in

[server/cache.ts:69](https://github.com/onzag/itemize/blob/73e0c39e/server/cache.ts#L69)

___

### indexing

• `Optional` **indexing**: ``"wait_for"`` \| ``"detached"``

#### Inherited from

[IWritingOptions](server_cache.IWritingOptions.md).[indexing](server_cache.IWritingOptions.md#indexing)

#### Defined in

[server/cache.ts:66](https://github.com/onzag/itemize/blob/73e0c39e/server/cache.ts#L66)

___

### listenerUUID

• `Optional` **listenerUUID**: `string`

#### Inherited from

[IWritingOptions](server_cache.IWritingOptions.md).[listenerUUID](server_cache.IWritingOptions.md#listeneruuid)

#### Defined in

[server/cache.ts:67](https://github.com/onzag/itemize/blob/73e0c39e/server/cache.ts#L67)

___

### targetContainerId

• `Optional` **targetContainerId**: `string`

#### Defined in

[server/cache.ts:101](https://github.com/onzag/itemize/blob/73e0c39e/server/cache.ts#L101)

___

### targetCreatedBy

• `Optional` **targetCreatedBy**: `string`

#### Defined in

[server/cache.ts:102](https://github.com/onzag/itemize/blob/73e0c39e/server/cache.ts#L102)

___

### targetId

• `Optional` **targetId**: `string`

#### Defined in

[server/cache.ts:99](https://github.com/onzag/itemize/blob/73e0c39e/server/cache.ts#L99)

___

### targetOverrides

• `Optional` **targetOverrides**: [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

#### Defined in

[server/cache.ts:108](https://github.com/onzag/itemize/blob/73e0c39e/server/cache.ts#L108)

___

### targetParent

• `Optional` **targetParent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `type` | `string` |
| `version` | `string` |

#### Defined in

[server/cache.ts:103](https://github.com/onzag/itemize/blob/73e0c39e/server/cache.ts#L103)

___

### targetVersion

• `Optional` **targetVersion**: `string`

#### Defined in

[server/cache.ts:100](https://github.com/onzag/itemize/blob/73e0c39e/server/cache.ts#L100)
