[@onzag/itemize](../README.md) / [Modules](../modules.md) / [database/ReturningBuilder](../modules/database_ReturningBuilder.md) / ReturningBuilder

# Class: ReturningBuilder

[database/ReturningBuilder](../modules/database_ReturningBuilder.md).ReturningBuilder

The returning builder that allows to create RETURNING statments

## Hierarchy

- [`QueryBuilder`](database_base.QueryBuilder.md)

  ↳ **`ReturningBuilder`**

## Table of contents

### Constructors

- [constructor](database_ReturningBuilder.ReturningBuilder.md#constructor)

### Properties

- [expressions](database_ReturningBuilder.ReturningBuilder.md#expressions)

### Methods

- [addBindingSource](database_ReturningBuilder.ReturningBuilder.md#addbindingsource)
- [addBindingSources](database_ReturningBuilder.ReturningBuilder.md#addbindingsources)
- [clear](database_ReturningBuilder.ReturningBuilder.md#clear)
- [clearBindingSources](database_ReturningBuilder.ReturningBuilder.md#clearbindingsources)
- [compile](database_ReturningBuilder.ReturningBuilder.md#compile)
- [getBindings](database_ReturningBuilder.ReturningBuilder.md#getbindings)
- [popBindingSource](database_ReturningBuilder.ReturningBuilder.md#popbindingsource)
- [returning](database_ReturningBuilder.ReturningBuilder.md#returning)
- [returningAll](database_ReturningBuilder.ReturningBuilder.md#returningall)
- [returningColumn](database_ReturningBuilder.ReturningBuilder.md#returningcolumn)
- [returningColumnInTable](database_ReturningBuilder.ReturningBuilder.md#returningcolumnintable)
- [shiftBindingSource](database_ReturningBuilder.ReturningBuilder.md#shiftbindingsource)
- [shiftBindingSources](database_ReturningBuilder.ReturningBuilder.md#shiftbindingsources)
- [toSQL](database_ReturningBuilder.ReturningBuilder.md#tosql)

## Constructors

### constructor

• **new ReturningBuilder**()

Builds a new SQL RETURNING statment

#### Overrides

[QueryBuilder](database_base.QueryBuilder.md).[constructor](database_base.QueryBuilder.md#constructor)

#### Defined in

[database/ReturningBuilder.ts:20](https://github.com/onzag/itemize/blob/5c2808d3/database/ReturningBuilder.ts#L20)

## Properties

### expressions

• `Private` **expressions**: `string`[] = `[]`

the expressions that we are returning

#### Defined in

[database/ReturningBuilder.ts:15](https://github.com/onzag/itemize/blob/5c2808d3/database/ReturningBuilder.ts#L15)

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

▸ **clear**(): [`ReturningBuilder`](database_ReturningBuilder.ReturningBuilder.md)

Clears the expressions that we are returning

#### Returns

[`ReturningBuilder`](database_ReturningBuilder.ReturningBuilder.md)

itself

#### Defined in

[database/ReturningBuilder.ts:85](https://github.com/onzag/itemize/blob/5c2808d3/database/ReturningBuilder.ts#L85)

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

[database/ReturningBuilder.ts:74](https://github.com/onzag/itemize/blob/5c2808d3/database/ReturningBuilder.ts#L74)

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

### returning

▸ **returning**(`expression`, `bindings?`): [`ReturningBuilder`](database_ReturningBuilder.ReturningBuilder.md)

Returning an expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | the expression to return |
| `bindings?` | (`string` \| `number`)[] | the bindings for that expression |

#### Returns

[`ReturningBuilder`](database_ReturningBuilder.ReturningBuilder.md)

itself

#### Defined in

[database/ReturningBuilder.ts:60](https://github.com/onzag/itemize/blob/5c2808d3/database/ReturningBuilder.ts#L60)

___

### returningAll

▸ **returningAll**(`tableName?`): [`ReturningBuilder`](database_ReturningBuilder.ReturningBuilder.md)

a shorthand for RETURNING *

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tableName?` | `string` | an optional table name |

#### Returns

[`ReturningBuilder`](database_ReturningBuilder.ReturningBuilder.md)

itself

#### Defined in

[database/ReturningBuilder.ts:29](https://github.com/onzag/itemize/blob/5c2808d3/database/ReturningBuilder.ts#L29)

___

### returningColumn

▸ **returningColumn**(`column`): [`ReturningBuilder`](database_ReturningBuilder.ReturningBuilder.md)

Returning a specific column

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `column` | `string` | the column to return |

#### Returns

[`ReturningBuilder`](database_ReturningBuilder.ReturningBuilder.md)

itself

#### Defined in

[database/ReturningBuilder.ts:41](https://github.com/onzag/itemize/blob/5c2808d3/database/ReturningBuilder.ts#L41)

___

### returningColumnInTable

▸ **returningColumnInTable**(`tableName`, `column`): [`ReturningBuilder`](database_ReturningBuilder.ReturningBuilder.md)

Returning a specific column in a table

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tableName` | `string` | - |
| `column` | `string` | the column to return |

#### Returns

[`ReturningBuilder`](database_ReturningBuilder.ReturningBuilder.md)

itself

#### Defined in

[database/ReturningBuilder.ts:50](https://github.com/onzag/itemize/blob/5c2808d3/database/ReturningBuilder.ts#L50)

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
