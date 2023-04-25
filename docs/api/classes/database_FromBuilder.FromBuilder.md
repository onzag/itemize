[@onzag/itemize](../README.md) / [Modules](../modules.md) / [database/FromBuilder](../modules/database_FromBuilder.md) / FromBuilder

# Class: FromBuilder

[database/FromBuilder](../modules/database_FromBuilder.md).FromBuilder

Provides a builder for a FROM statments in SQL

## Hierarchy

- [`QueryBuilder`](database_base.QueryBuilder.md)

  ↳ **`FromBuilder`**

## Table of contents

### Constructors

- [constructor](database_FromBuilder.FromBuilder.md#constructor)

### Properties

- [selectBuilder](database_FromBuilder.FromBuilder.md#selectbuilder)
- [selectBuilderAlias](database_FromBuilder.FromBuilder.md#selectbuilderalias)
- [tables](database_FromBuilder.FromBuilder.md#tables)

### Methods

- [addBindingSource](database_FromBuilder.FromBuilder.md#addbindingsource)
- [addBindingSources](database_FromBuilder.FromBuilder.md#addbindingsources)
- [clear](database_FromBuilder.FromBuilder.md#clear)
- [clearBindingSources](database_FromBuilder.FromBuilder.md#clearbindingsources)
- [compile](database_FromBuilder.FromBuilder.md#compile)
- [from](database_FromBuilder.FromBuilder.md#from)
- [fromSelect](database_FromBuilder.FromBuilder.md#fromselect)
- [getBindings](database_FromBuilder.FromBuilder.md#getbindings)
- [popBindingSource](database_FromBuilder.FromBuilder.md#popbindingsource)
- [shiftBindingSource](database_FromBuilder.FromBuilder.md#shiftbindingsource)
- [shiftBindingSources](database_FromBuilder.FromBuilder.md#shiftbindingsources)
- [toSQL](database_FromBuilder.FromBuilder.md#tosql)

## Constructors

### constructor

• **new FromBuilder**()

builds a new from builder

#### Overrides

[QueryBuilder](database_base.QueryBuilder.md).[constructor](database_base.QueryBuilder.md#constructor)

#### Defined in

[database/FromBuilder.ts:23](https://github.com/onzag/itemize/blob/f2db74a5/database/FromBuilder.ts#L23)

## Properties

### selectBuilder

• `Private` **selectBuilder**: [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md) = `null`

#### Defined in

[database/FromBuilder.ts:17](https://github.com/onzag/itemize/blob/f2db74a5/database/FromBuilder.ts#L17)

___

### selectBuilderAlias

• `Private` **selectBuilderAlias**: `string` = `null`

#### Defined in

[database/FromBuilder.ts:18](https://github.com/onzag/itemize/blob/f2db74a5/database/FromBuilder.ts#L18)

___

### tables

• `Private` **tables**: (`string` \| [`string`, `string`])[] = `[]`

The tables we do the from rule

#### Defined in

[database/FromBuilder.ts:16](https://github.com/onzag/itemize/blob/f2db74a5/database/FromBuilder.ts#L16)

## Methods

### addBindingSource

▸ **addBindingSource**(`value`): `void`

Adds a binding source to the binding source list in order

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype) | the binding source to add |

#### Returns

`void`

#### Inherited from

[QueryBuilder](database_base.QueryBuilder.md).[addBindingSource](database_base.QueryBuilder.md#addbindingsource)

#### Defined in

[database/base.ts:69](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L69)

___

### addBindingSources

▸ **addBindingSources**(`values`): `void`

Adds many binding sources to the bindings sources list

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | [`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype)[] | the binding sources to add |

#### Returns

`void`

#### Inherited from

[QueryBuilder](database_base.QueryBuilder.md).[addBindingSources](database_base.QueryBuilder.md#addbindingsources)

#### Defined in

[database/base.ts:77](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L77)

___

### clear

▸ **clear**(): [`FromBuilder`](database_FromBuilder.FromBuilder.md)

On the from builder this will clear all the tables

#### Returns

[`FromBuilder`](database_FromBuilder.FromBuilder.md)

itself

#### Defined in

[database/FromBuilder.ts:49](https://github.com/onzag/itemize/blob/f2db74a5/database/FromBuilder.ts#L49)

___

### clearBindingSources

▸ **clearBindingSources**(): `void`

Removes all binding sources

#### Returns

`void`

#### Inherited from

[QueryBuilder](database_base.QueryBuilder.md).[clearBindingSources](database_base.QueryBuilder.md#clearbindingsources)

#### Defined in

[database/base.ts:105](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L105)

___

### compile

▸ **compile**(): `string`

Converts this from query to a pseudo SQL query that uses ?

#### Returns

`string`

a string that represents the compiled result

#### Overrides

[QueryBuilder](database_base.QueryBuilder.md).[compile](database_base.QueryBuilder.md#compile)

#### Defined in

[database/FromBuilder.ts:62](https://github.com/onzag/itemize/blob/f2db74a5/database/FromBuilder.ts#L62)

___

### from

▸ **from**(...`tableNames`): [`FromBuilder`](database_FromBuilder.FromBuilder.md)

Select tables to pick from

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...tableNames` | (`string` \| [`string`, `string`])[] | the tables to select |

#### Returns

[`FromBuilder`](database_FromBuilder.FromBuilder.md)

itself

#### Defined in

[database/FromBuilder.ts:32](https://github.com/onzag/itemize/blob/f2db74a5/database/FromBuilder.ts#L32)

___

### fromSelect

▸ **fromSelect**(`builder`, `alias`): [`FromBuilder`](database_FromBuilder.FromBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `builder` | (`b`: [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)) => `void` |
| `alias` | `string` |

#### Returns

[`FromBuilder`](database_FromBuilder.FromBuilder.md)

#### Defined in

[database/FromBuilder.ts:37](https://github.com/onzag/itemize/blob/f2db74a5/database/FromBuilder.ts#L37)

___

### getBindings

▸ **getBindings**(): [`BasicBindingType`](../modules/database_base.md#basicbindingtype)[]

Provides the bindings for the query in order that
should match the compilation

#### Returns

[`BasicBindingType`](../modules/database_base.md#basicbindingtype)[]

a list of basic bindings

#### Inherited from

[QueryBuilder](database_base.QueryBuilder.md).[getBindings](database_base.QueryBuilder.md#getbindings)

#### Defined in

[database/base.ts:168](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L168)

___

### popBindingSource

▸ **popBindingSource**(): [`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype)

Removes the last added biding source and returns it

#### Returns

[`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype)

#### Inherited from

[QueryBuilder](database_base.QueryBuilder.md).[popBindingSource](database_base.QueryBuilder.md#popbindingsource)

#### Defined in

[database/base.ts:112](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L112)

___

### shiftBindingSource

▸ **shiftBindingSource**(`value`): `void`

Adds a binding source at the start of the bindings source
list

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype) | the binding source to add |

#### Returns

`void`

#### Inherited from

[QueryBuilder](database_base.QueryBuilder.md).[shiftBindingSource](database_base.QueryBuilder.md#shiftbindingsource)

#### Defined in

[database/base.ts:89](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L89)

___

### shiftBindingSources

▸ **shiftBindingSources**(`values`): `void`

Adds many binding sources at the start of the bindings source
list

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | [`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype)[] | the binding sources to add |

#### Returns

`void`

#### Inherited from

[QueryBuilder](database_base.QueryBuilder.md).[shiftBindingSources](database_base.QueryBuilder.md#shiftbindingsources)

#### Defined in

[database/base.ts:98](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L98)

___

### toSQL

▸ **toSQL**(): `IQueryBuilderSQLResult`

Returns the SQL result for usage in the query builder

#### Returns

`IQueryBuilderSQLResult`

a sql builder result with the bindings and the query itself

#### Inherited from

[QueryBuilder](database_base.QueryBuilder.md).[toSQL](database_base.QueryBuilder.md#tosql)

#### Defined in

[database/base.ts:129](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L129)
