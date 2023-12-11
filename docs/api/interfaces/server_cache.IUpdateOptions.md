[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/cache](../modules/server_cache.md) / IUpdateOptions

# Interface: IUpdateOptions

[server/cache](../modules/server_cache.md).IUpdateOptions

## Hierarchy

- [`IBasicOptions`](server_cache.IBasicOptions.md)

  ↳ **`IUpdateOptions`**

## Table of contents

### Properties

- [blocking](server_cache.IUpdateOptions.md#blocking)
- [containerId](server_cache.IUpdateOptions.md#containerid)
- [currentSQLValue](server_cache.IUpdateOptions.md#currentsqlvalue)
- [currentrqValue](server_cache.IUpdateOptions.md#currentrqvalue)
- [dictionary](server_cache.IUpdateOptions.md#dictionary)
- [editedBy](server_cache.IUpdateOptions.md#editedby)
- [ignorePreSideEffects](server_cache.IUpdateOptions.md#ignorepresideeffects)
- [ignoreSideEffects](server_cache.IUpdateOptions.md#ignoresideeffects)
- [indexing](server_cache.IUpdateOptions.md#indexing)
- [language](server_cache.IUpdateOptions.md#language)
- [listenerUUID](server_cache.IUpdateOptions.md#listeneruuid)
- [reparent](server_cache.IUpdateOptions.md#reparent)

## Properties

### blocking

• `Optional` **blocking**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `reason` | `string` |
| `status` | `boolean` |
| `until` | `string` |

#### Defined in

[server/cache.ts:124](https://github.com/onzag/itemize/blob/59702dd5/server/cache.ts#L124)

___

### containerId

• `Optional` **containerId**: `string`

#### Defined in

[server/cache.ts:118](https://github.com/onzag/itemize/blob/59702dd5/server/cache.ts#L118)

___

### currentSQLValue

• `Optional` **currentSQLValue**: [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

#### Defined in

[server/cache.ts:113](https://github.com/onzag/itemize/blob/59702dd5/server/cache.ts#L113)

___

### currentrqValue

• `Optional` **currentrqValue**: [`IRQValue`](rq_querier.IRQValue.md)

#### Defined in

[server/cache.ts:114](https://github.com/onzag/itemize/blob/59702dd5/server/cache.ts#L114)

___

### dictionary

• **dictionary**: `string`

#### Defined in

[server/cache.ts:117](https://github.com/onzag/itemize/blob/59702dd5/server/cache.ts#L117)

___

### editedBy

• `Optional` **editedBy**: `string`

#### Defined in

[server/cache.ts:115](https://github.com/onzag/itemize/blob/59702dd5/server/cache.ts#L115)

___

### ignorePreSideEffects

• `Optional` **ignorePreSideEffects**: `boolean`

#### Inherited from

[IBasicOptions](server_cache.IBasicOptions.md).[ignorePreSideEffects](server_cache.IBasicOptions.md#ignorepresideeffects)

#### Defined in

[server/cache.ts:68](https://github.com/onzag/itemize/blob/59702dd5/server/cache.ts#L68)

___

### ignoreSideEffects

• `Optional` **ignoreSideEffects**: `boolean`

#### Inherited from

[IBasicOptions](server_cache.IBasicOptions.md).[ignoreSideEffects](server_cache.IBasicOptions.md#ignoresideeffects)

#### Defined in

[server/cache.ts:69](https://github.com/onzag/itemize/blob/59702dd5/server/cache.ts#L69)

___

### indexing

• `Optional` **indexing**: ``"wait_for"`` \| ``"detached"``

#### Inherited from

[IBasicOptions](server_cache.IBasicOptions.md).[indexing](server_cache.IBasicOptions.md#indexing)

#### Defined in

[server/cache.ts:66](https://github.com/onzag/itemize/blob/59702dd5/server/cache.ts#L66)

___

### language

• **language**: `string`

#### Defined in

[server/cache.ts:116](https://github.com/onzag/itemize/blob/59702dd5/server/cache.ts#L116)

___

### listenerUUID

• `Optional` **listenerUUID**: `string`

#### Inherited from

[IBasicOptions](server_cache.IBasicOptions.md).[listenerUUID](server_cache.IBasicOptions.md#listeneruuid)

#### Defined in

[server/cache.ts:67](https://github.com/onzag/itemize/blob/59702dd5/server/cache.ts#L67)

___

### reparent

• `Optional` **reparent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `type` | `string` |
| `version` | `string` |

#### Defined in

[server/cache.ts:119](https://github.com/onzag/itemize/blob/59702dd5/server/cache.ts#L119)
