[@onzag/itemize](../README.md) / [Modules](../modules.md) / [database/AlterTableBuilder](../modules/database_AlterTableBuilder.md) / AlterTableBuilder

# Class: AlterTableBuilder

[database/AlterTableBuilder](../modules/database_AlterTableBuilder.md).AlterTableBuilder

## Hierarchy

- [`QueryBuilder`](database_base.QueryBuilder.md)

  ↳ **`AlterTableBuilder`**

## Table of contents

### Constructors

- [constructor](database_AlterTableBuilder.AlterTableBuilder.md#constructor)

### Properties

- [action](database_AlterTableBuilder.AlterTableBuilder.md#action)
- [columnRule](database_AlterTableBuilder.AlterTableBuilder.md#columnrule)
- [tableName](database_AlterTableBuilder.AlterTableBuilder.md#tablename)

### Methods

- [addBindingSource](database_AlterTableBuilder.AlterTableBuilder.md#addbindingsource)
- [addBindingSources](database_AlterTableBuilder.AlterTableBuilder.md#addbindingsources)
- [affectColumn](database_AlterTableBuilder.AlterTableBuilder.md#affectcolumn)
- [clear](database_AlterTableBuilder.AlterTableBuilder.md#clear)
- [clearAlters](database_AlterTableBuilder.AlterTableBuilder.md#clearalters)
- [clearBindingSources](database_AlterTableBuilder.AlterTableBuilder.md#clearbindingsources)
- [compile](database_AlterTableBuilder.AlterTableBuilder.md#compile)
- [getBindings](database_AlterTableBuilder.AlterTableBuilder.md#getbindings)
- [popBindingSource](database_AlterTableBuilder.AlterTableBuilder.md#popbindingsource)
- [shiftBindingSource](database_AlterTableBuilder.AlterTableBuilder.md#shiftbindingsource)
- [shiftBindingSources](database_AlterTableBuilder.AlterTableBuilder.md#shiftbindingsources)
- [table](database_AlterTableBuilder.AlterTableBuilder.md#table)
- [toSQL](database_AlterTableBuilder.AlterTableBuilder.md#tosql)

## Constructors

### constructor

• **new AlterTableBuilder**()

Builds a new alter table query builder

#### Overrides

[QueryBuilder](database_base.QueryBuilder.md).[constructor](database_base.QueryBuilder.md#constructor)

#### Defined in

[database/AlterTableBuilder.ts:36](https://github.com/onzag/itemize/blob/f2db74a5/database/AlterTableBuilder.ts#L36)

## Properties

### action

• `Private` **action**: `string`

#### Defined in

[database/AlterTableBuilder.ts:32](https://github.com/onzag/itemize/blob/f2db74a5/database/AlterTableBuilder.ts#L32)

___

### columnRule

• `Private` **columnRule**: `IAlterTableColumnDataWithExpressionAsDefault`

#### Defined in

[database/AlterTableBuilder.ts:31](https://github.com/onzag/itemize/blob/f2db74a5/database/AlterTableBuilder.ts#L31)

___

### tableName

• `Private` **tableName**: `string`

Table name in question we are updating against

#### Defined in

[database/AlterTableBuilder.ts:30](https://github.com/onzag/itemize/blob/f2db74a5/database/AlterTableBuilder.ts#L30)

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

### affectColumn

▸ **affectColumn**(`action`, `info`): [`AlterTableBuilder`](database_AlterTableBuilder.AlterTableBuilder.md)

Adds a column to the alter rule

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action` | ``"DROP COLUMN"`` \| ``"ADD COLUMN"`` \| ``"ALTER COLUMN"`` | - |
| `info` | `IAlterTableColumnData` | the info about the column |

#### Returns

[`AlterTableBuilder`](database_AlterTableBuilder.AlterTableBuilder.md)

itself

#### Defined in

[database/AlterTableBuilder.ts:47](https://github.com/onzag/itemize/blob/f2db74a5/database/AlterTableBuilder.ts#L47)

___

### clear

▸ **clear**(): [`AlterTableBuilder`](database_AlterTableBuilder.AlterTableBuilder.md)

Clears the table name, if not exists state and columns

#### Returns

[`AlterTableBuilder`](database_AlterTableBuilder.AlterTableBuilder.md)

itself

#### Defined in

[database/AlterTableBuilder.ts:98](https://github.com/onzag/itemize/blob/f2db74a5/database/AlterTableBuilder.ts#L98)

___

### clearAlters

▸ **clearAlters**(): `void`

Clears only the alters without modifying the table name

#### Returns

`void`

#### Defined in

[database/AlterTableBuilder.ts:88](https://github.com/onzag/itemize/blob/f2db74a5/database/AlterTableBuilder.ts#L88)

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

[database/AlterTableBuilder.ts:108](https://github.com/onzag/itemize/blob/f2db74a5/database/AlterTableBuilder.ts#L108)

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

### table

▸ **table**(`tableName`): [`AlterTableBuilder`](database_AlterTableBuilder.AlterTableBuilder.md)

Specifies the table we are updating

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tableName` | `string` | the table in question |

#### Returns

[`AlterTableBuilder`](database_AlterTableBuilder.AlterTableBuilder.md)

itself

#### Defined in

[database/AlterTableBuilder.ts:80](https://github.com/onzag/itemize/blob/f2db74a5/database/AlterTableBuilder.ts#L80)

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
