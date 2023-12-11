[@onzag/itemize](../README.md) / [Modules](../modules.md) / [database/CreateTableBuilder](../modules/database_CreateTableBuilder.md) / CreateTableBuilder

# Class: CreateTableBuilder

[database/CreateTableBuilder](../modules/database_CreateTableBuilder.md).CreateTableBuilder

Reprents the basic query builder to build a bit of a query
or the entire query itself and this class is supposed to
be extended by other builders

## Hierarchy

- [`QueryBuilder`](database_base.QueryBuilder.md)

  ↳ **`CreateTableBuilder`**

## Table of contents

### Constructors

- [constructor](database_CreateTableBuilder.CreateTableBuilder.md#constructor)

### Properties

- [columns](database_CreateTableBuilder.CreateTableBuilder.md#columns)
- [createIfNotExists](database_CreateTableBuilder.CreateTableBuilder.md#createifnotexists)
- [tableName](database_CreateTableBuilder.CreateTableBuilder.md#tablename)

### Methods

- [addBindingSource](database_CreateTableBuilder.CreateTableBuilder.md#addbindingsource)
- [addBindingSources](database_CreateTableBuilder.CreateTableBuilder.md#addbindingsources)
- [addColumn](database_CreateTableBuilder.CreateTableBuilder.md#addcolumn)
- [clear](database_CreateTableBuilder.CreateTableBuilder.md#clear)
- [clearBindingSources](database_CreateTableBuilder.CreateTableBuilder.md#clearbindingsources)
- [compile](database_CreateTableBuilder.CreateTableBuilder.md#compile)
- [getBindings](database_CreateTableBuilder.CreateTableBuilder.md#getbindings)
- [ifNotExists](database_CreateTableBuilder.CreateTableBuilder.md#ifnotexists)
- [popBindingSource](database_CreateTableBuilder.CreateTableBuilder.md#popbindingsource)
- [shiftBindingSource](database_CreateTableBuilder.CreateTableBuilder.md#shiftbindingsource)
- [shiftBindingSources](database_CreateTableBuilder.CreateTableBuilder.md#shiftbindingsources)
- [table](database_CreateTableBuilder.CreateTableBuilder.md#table)
- [toSQL](database_CreateTableBuilder.CreateTableBuilder.md#tosql)

## Constructors

### constructor

• **new CreateTableBuilder**(): [`CreateTableBuilder`](database_CreateTableBuilder.CreateTableBuilder.md)

Builds a new create table query builder

#### Returns

[`CreateTableBuilder`](database_CreateTableBuilder.CreateTableBuilder.md)

#### Overrides

[QueryBuilder](database_base.QueryBuilder.md).[constructor](database_base.QueryBuilder.md#constructor)

#### Defined in

[database/CreateTableBuilder.ts:37](https://github.com/onzag/itemize/blob/59702dd5/database/CreateTableBuilder.ts#L37)

## Properties

### columns

• `Private` **columns**: `ICreateTableColumnDataWithExpressionAsDefault`[] = `[]`

#### Defined in

[database/CreateTableBuilder.ts:32](https://github.com/onzag/itemize/blob/59702dd5/database/CreateTableBuilder.ts#L32)

___

### createIfNotExists

• `Private` **createIfNotExists**: `boolean`

#### Defined in

[database/CreateTableBuilder.ts:31](https://github.com/onzag/itemize/blob/59702dd5/database/CreateTableBuilder.ts#L31)

___

### tableName

• `Private` **tableName**: `string`

Table name in question we are updating against

#### Defined in

[database/CreateTableBuilder.ts:30](https://github.com/onzag/itemize/blob/59702dd5/database/CreateTableBuilder.ts#L30)

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

[database/base.ts:69](https://github.com/onzag/itemize/blob/59702dd5/database/base.ts#L69)

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

[database/base.ts:77](https://github.com/onzag/itemize/blob/59702dd5/database/base.ts#L77)

___

### addColumn

▸ **addColumn**(`info`): [`CreateTableBuilder`](database_CreateTableBuilder.CreateTableBuilder.md)

Adds a column to the create rule

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `info` | `ICreateTableColumnData` | the info about the column |

#### Returns

[`CreateTableBuilder`](database_CreateTableBuilder.CreateTableBuilder.md)

itself

#### Defined in

[database/CreateTableBuilder.ts:48](https://github.com/onzag/itemize/blob/59702dd5/database/CreateTableBuilder.ts#L48)

___

### clear

▸ **clear**(): [`CreateTableBuilder`](database_CreateTableBuilder.CreateTableBuilder.md)

Clears the table name, if not exists state and columns

#### Returns

[`CreateTableBuilder`](database_CreateTableBuilder.CreateTableBuilder.md)

itself

#### Defined in

[database/CreateTableBuilder.ts:93](https://github.com/onzag/itemize/blob/59702dd5/database/CreateTableBuilder.ts#L93)

___

### clearBindingSources

▸ **clearBindingSources**(): `void`

Removes all binding sources

#### Returns

`void`

#### Inherited from

[QueryBuilder](database_base.QueryBuilder.md).[clearBindingSources](database_base.QueryBuilder.md#clearbindingsources)

#### Defined in

[database/base.ts:105](https://github.com/onzag/itemize/blob/59702dd5/database/base.ts#L105)

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

[database/CreateTableBuilder.ts:105](https://github.com/onzag/itemize/blob/59702dd5/database/CreateTableBuilder.ts#L105)

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

[database/base.ts:168](https://github.com/onzag/itemize/blob/59702dd5/database/base.ts#L168)

___

### ifNotExists

▸ **ifNotExists**(): [`CreateTableBuilder`](database_CreateTableBuilder.CreateTableBuilder.md)

Makes the update be IF NOT EXISTS

#### Returns

[`CreateTableBuilder`](database_CreateTableBuilder.CreateTableBuilder.md)

itself

#### Defined in

[database/CreateTableBuilder.ts:84](https://github.com/onzag/itemize/blob/59702dd5/database/CreateTableBuilder.ts#L84)

___

### popBindingSource

▸ **popBindingSource**(): [`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype)

Removes the last added biding source and returns it

#### Returns

[`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype)

#### Inherited from

[QueryBuilder](database_base.QueryBuilder.md).[popBindingSource](database_base.QueryBuilder.md#popbindingsource)

#### Defined in

[database/base.ts:112](https://github.com/onzag/itemize/blob/59702dd5/database/base.ts#L112)

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

[database/base.ts:89](https://github.com/onzag/itemize/blob/59702dd5/database/base.ts#L89)

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

[database/base.ts:98](https://github.com/onzag/itemize/blob/59702dd5/database/base.ts#L98)

___

### table

▸ **table**(`tableName`): [`CreateTableBuilder`](database_CreateTableBuilder.CreateTableBuilder.md)

Specifies the table we are updating

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tableName` | `string` | the table in question |

#### Returns

[`CreateTableBuilder`](database_CreateTableBuilder.CreateTableBuilder.md)

itself

#### Defined in

[database/CreateTableBuilder.ts:75](https://github.com/onzag/itemize/blob/59702dd5/database/CreateTableBuilder.ts#L75)

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

[database/base.ts:129](https://github.com/onzag/itemize/blob/59702dd5/database/base.ts#L129)
