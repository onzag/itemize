[@onzag/itemize](../README.md) / [Modules](../modules.md) / [database/DeleteBuilder](../modules/database_DeleteBuilder.md) / DeleteBuilder

# Class: DeleteBuilder

[database/DeleteBuilder](../modules/database_DeleteBuilder.md).DeleteBuilder

The select query builder that allows to create SELECT queries

## Hierarchy

- [`QueryBuilder`](database_base.QueryBuilder.md)

  ↳ **`DeleteBuilder`**

## Table of contents

### Constructors

- [constructor](database_DeleteBuilder.DeleteBuilder.md#constructor)

### Properties

- [returningBuilder](database_DeleteBuilder.DeleteBuilder.md#returningbuilder)
- [tableDeleteFromExpression](database_DeleteBuilder.DeleteBuilder.md#tabledeletefromexpression)
- [whereBuilder](database_DeleteBuilder.DeleteBuilder.md#wherebuilder)

### Methods

- [addBindingSource](database_DeleteBuilder.DeleteBuilder.md#addbindingsource)
- [addBindingSources](database_DeleteBuilder.DeleteBuilder.md#addbindingsources)
- [clear](database_DeleteBuilder.DeleteBuilder.md#clear)
- [clearBindingSources](database_DeleteBuilder.DeleteBuilder.md#clearbindingsources)
- [compile](database_DeleteBuilder.DeleteBuilder.md#compile)
- [deleteFrom](database_DeleteBuilder.DeleteBuilder.md#deletefrom)
- [getBindings](database_DeleteBuilder.DeleteBuilder.md#getbindings)
- [popBindingSource](database_DeleteBuilder.DeleteBuilder.md#popbindingsource)
- [shiftBindingSource](database_DeleteBuilder.DeleteBuilder.md#shiftbindingsource)
- [shiftBindingSources](database_DeleteBuilder.DeleteBuilder.md#shiftbindingsources)
- [toSQL](database_DeleteBuilder.DeleteBuilder.md#tosql)

## Constructors

### constructor

• **new DeleteBuilder**()

Builds a new select query builder

#### Overrides

[QueryBuilder](database_base.QueryBuilder.md).[constructor](database_base.QueryBuilder.md#constructor)

#### Defined in

[database/DeleteBuilder.ts:22](https://github.com/onzag/itemize/blob/5c2808d3/database/DeleteBuilder.ts#L22)

## Properties

### returningBuilder

• **returningBuilder**: [`ReturningBuilder`](database_ReturningBuilder.ReturningBuilder.md)

#### Defined in

[database/DeleteBuilder.ts:17](https://github.com/onzag/itemize/blob/5c2808d3/database/DeleteBuilder.ts#L17)

___

### tableDeleteFromExpression

• `Private` **tableDeleteFromExpression**: `string`

#### Defined in

[database/DeleteBuilder.ts:14](https://github.com/onzag/itemize/blob/5c2808d3/database/DeleteBuilder.ts#L14)

___

### whereBuilder

• **whereBuilder**: [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

#### Defined in

[database/DeleteBuilder.ts:16](https://github.com/onzag/itemize/blob/5c2808d3/database/DeleteBuilder.ts#L16)

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

[database/base.ts:69](https://github.com/onzag/itemize/blob/5c2808d3/database/base.ts#L69)

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

[database/base.ts:77](https://github.com/onzag/itemize/blob/5c2808d3/database/base.ts#L77)

___

### clear

▸ **clear**(): [`DeleteBuilder`](database_DeleteBuilder.DeleteBuilder.md)

Clears the seleted expressions, limit and offset but does not affect the builders

#### Returns

[`DeleteBuilder`](database_DeleteBuilder.DeleteBuilder.md)

itself

#### Defined in

[database/DeleteBuilder.ts:36](https://github.com/onzag/itemize/blob/5c2808d3/database/DeleteBuilder.ts#L36)

___

### clearBindingSources

▸ **clearBindingSources**(): `void`

Removes all binding sources

#### Returns

`void`

#### Inherited from

[QueryBuilder](database_base.QueryBuilder.md).[clearBindingSources](database_base.QueryBuilder.md#clearbindingsources)

#### Defined in

[database/base.ts:105](https://github.com/onzag/itemize/blob/5c2808d3/database/base.ts#L105)

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

[database/DeleteBuilder.ts:58](https://github.com/onzag/itemize/blob/5c2808d3/database/DeleteBuilder.ts#L58)

___

### deleteFrom

▸ **deleteFrom**(`tableName`): `void`

Allows to select all

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tableName` | `string` | an optional table name |

#### Returns

`void`

itself

#### Defined in

[database/DeleteBuilder.ts:50](https://github.com/onzag/itemize/blob/5c2808d3/database/DeleteBuilder.ts#L50)

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

[database/base.ts:168](https://github.com/onzag/itemize/blob/5c2808d3/database/base.ts#L168)

___

### popBindingSource

▸ **popBindingSource**(): [`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype)

Removes the last added biding source and returns it

#### Returns

[`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype)

#### Inherited from

[QueryBuilder](database_base.QueryBuilder.md).[popBindingSource](database_base.QueryBuilder.md#popbindingsource)

#### Defined in

[database/base.ts:112](https://github.com/onzag/itemize/blob/5c2808d3/database/base.ts#L112)

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

[database/base.ts:89](https://github.com/onzag/itemize/blob/5c2808d3/database/base.ts#L89)

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

[database/base.ts:98](https://github.com/onzag/itemize/blob/5c2808d3/database/base.ts#L98)

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

[database/base.ts:129](https://github.com/onzag/itemize/blob/5c2808d3/database/base.ts#L129)
