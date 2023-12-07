[@onzag/itemize](../README.md) / [Modules](../modules.md) / [database/SelectBuilder](../modules/database_SelectBuilder.md) / SelectBuilder

# Class: SelectBuilder

[database/SelectBuilder](../modules/database_SelectBuilder.md).SelectBuilder

The select query builder that allows to create SELECT queries

## Hierarchy

- [`QueryBuilder`](database_base.QueryBuilder.md)

  ↳ **`SelectBuilder`**

## Table of contents

### Constructors

- [constructor](database_SelectBuilder.SelectBuilder.md#constructor)

### Properties

- [fromBuilder](database_SelectBuilder.SelectBuilder.md#frombuilder)
- [groupByBuilder](database_SelectBuilder.SelectBuilder.md#groupbybuilder)
- [havingBuilder](database_SelectBuilder.SelectBuilder.md#havingbuilder)
- [ilimit](database_SelectBuilder.SelectBuilder.md#ilimit)
- [ioffset](database_SelectBuilder.SelectBuilder.md#ioffset)
- [joinBuilder](database_SelectBuilder.SelectBuilder.md#joinbuilder)
- [orderByBuilder](database_SelectBuilder.SelectBuilder.md#orderbybuilder)
- [selectedExpressions](database_SelectBuilder.SelectBuilder.md#selectedexpressions)
- [whereBuilder](database_SelectBuilder.SelectBuilder.md#wherebuilder)

### Methods

- [addBindingSource](database_SelectBuilder.SelectBuilder.md#addbindingsource)
- [addBindingSources](database_SelectBuilder.SelectBuilder.md#addbindingsources)
- [clear](database_SelectBuilder.SelectBuilder.md#clear)
- [clearBindingSources](database_SelectBuilder.SelectBuilder.md#clearbindingsources)
- [clearSelect](database_SelectBuilder.SelectBuilder.md#clearselect)
- [compile](database_SelectBuilder.SelectBuilder.md#compile)
- [getBindings](database_SelectBuilder.SelectBuilder.md#getbindings)
- [limit](database_SelectBuilder.SelectBuilder.md#limit)
- [offset](database_SelectBuilder.SelectBuilder.md#offset)
- [popBindingSource](database_SelectBuilder.SelectBuilder.md#popbindingsource)
- [select](database_SelectBuilder.SelectBuilder.md#select)
- [selectAll](database_SelectBuilder.SelectBuilder.md#selectall)
- [selectColumnFromTable](database_SelectBuilder.SelectBuilder.md#selectcolumnfromtable)
- [selectExpression](database_SelectBuilder.SelectBuilder.md#selectexpression)
- [shiftBindingSource](database_SelectBuilder.SelectBuilder.md#shiftbindingsource)
- [shiftBindingSources](database_SelectBuilder.SelectBuilder.md#shiftbindingsources)
- [toSQL](database_SelectBuilder.SelectBuilder.md#tosql)

## Constructors

### constructor

• **new SelectBuilder**()

Builds a new select query builder

#### Overrides

[QueryBuilder](database_base.QueryBuilder.md).[constructor](database_base.QueryBuilder.md#constructor)

#### Defined in

[database/SelectBuilder.ts:36](https://github.com/onzag/itemize/blob/a24376ed/database/SelectBuilder.ts#L36)

## Properties

### fromBuilder

• **fromBuilder**: [`FromBuilder`](database_FromBuilder.FromBuilder.md)

#### Defined in

[database/SelectBuilder.ts:23](https://github.com/onzag/itemize/blob/a24376ed/database/SelectBuilder.ts#L23)

___

### groupByBuilder

• **groupByBuilder**: [`GroupByBuilder`](database_GroupByBuilder.GroupByBuilder.md)

#### Defined in

[database/SelectBuilder.ts:26](https://github.com/onzag/itemize/blob/a24376ed/database/SelectBuilder.ts#L26)

___

### havingBuilder

• **havingBuilder**: [`HavingBuilder`](database_HavingBuilder.HavingBuilder.md)

#### Defined in

[database/SelectBuilder.ts:27](https://github.com/onzag/itemize/blob/a24376ed/database/SelectBuilder.ts#L27)

___

### ilimit

• `Private` **ilimit**: `number`

#### Defined in

[database/SelectBuilder.ts:30](https://github.com/onzag/itemize/blob/a24376ed/database/SelectBuilder.ts#L30)

___

### ioffset

• `Private` **ioffset**: `number`

#### Defined in

[database/SelectBuilder.ts:31](https://github.com/onzag/itemize/blob/a24376ed/database/SelectBuilder.ts#L31)

___

### joinBuilder

• **joinBuilder**: [`JoinBuilder`](database_JoinBuilder.JoinBuilder.md)

#### Defined in

[database/SelectBuilder.ts:24](https://github.com/onzag/itemize/blob/a24376ed/database/SelectBuilder.ts#L24)

___

### orderByBuilder

• **orderByBuilder**: [`OrderByBuilder`](database_OrderByBuilder.OrderByBuilder.md)

#### Defined in

[database/SelectBuilder.ts:28](https://github.com/onzag/itemize/blob/a24376ed/database/SelectBuilder.ts#L28)

___

### selectedExpressions

• `Private` **selectedExpressions**: `string`[] = `[]`

The expressions that we are selecting

#### Defined in

[database/SelectBuilder.ts:21](https://github.com/onzag/itemize/blob/a24376ed/database/SelectBuilder.ts#L21)

___

### whereBuilder

• **whereBuilder**: [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

#### Defined in

[database/SelectBuilder.ts:25](https://github.com/onzag/itemize/blob/a24376ed/database/SelectBuilder.ts#L25)

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

[database/base.ts:69](https://github.com/onzag/itemize/blob/a24376ed/database/base.ts#L69)

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

[database/base.ts:77](https://github.com/onzag/itemize/blob/a24376ed/database/base.ts#L77)

___

### clear

▸ **clear**(): [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)

Clears the seleted expressions, limit and offset but does not affect the builders

#### Returns

[`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)

itself

#### Defined in

[database/SelectBuilder.ts:122](https://github.com/onzag/itemize/blob/a24376ed/database/SelectBuilder.ts#L122)

___

### clearBindingSources

▸ **clearBindingSources**(): `void`

Removes all binding sources

#### Returns

`void`

#### Inherited from

[QueryBuilder](database_base.QueryBuilder.md).[clearBindingSources](database_base.QueryBuilder.md#clearbindingsources)

#### Defined in

[database/base.ts:105](https://github.com/onzag/itemize/blob/a24376ed/database/base.ts#L105)

___

### clearSelect

▸ **clearSelect**(): [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)

Clears the seleted expressions but does not affect the builders
nor the limit or offset

#### Returns

[`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)

itself

#### Defined in

[database/SelectBuilder.ts:104](https://github.com/onzag/itemize/blob/a24376ed/database/SelectBuilder.ts#L104)

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

[database/SelectBuilder.ts:161](https://github.com/onzag/itemize/blob/a24376ed/database/SelectBuilder.ts#L161)

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

[database/base.ts:168](https://github.com/onzag/itemize/blob/a24376ed/database/base.ts#L168)

___

### limit

▸ **limit**(`n`): [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)

Sets the limit

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | the limit |

#### Returns

[`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)

itself

#### Defined in

[database/SelectBuilder.ts:134](https://github.com/onzag/itemize/blob/a24376ed/database/SelectBuilder.ts#L134)

___

### offset

▸ **offset**(`n`): [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)

Sets the offset

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | the offset |

#### Returns

[`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)

itself

#### Defined in

[database/SelectBuilder.ts:148](https://github.com/onzag/itemize/blob/a24376ed/database/SelectBuilder.ts#L148)

___

### popBindingSource

▸ **popBindingSource**(): [`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype)

Removes the last added biding source and returns it

#### Returns

[`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype)

#### Inherited from

[QueryBuilder](database_base.QueryBuilder.md).[popBindingSource](database_base.QueryBuilder.md#popbindingsource)

#### Defined in

[database/base.ts:112](https://github.com/onzag/itemize/blob/a24376ed/database/base.ts#L112)

___

### select

▸ **select**(...`columns`): [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)

Allows to select many columns

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...columns` | `string`[] | the columns to select |

#### Returns

[`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)

itself

#### Defined in

[database/SelectBuilder.ts:65](https://github.com/onzag/itemize/blob/a24376ed/database/SelectBuilder.ts#L65)

___

### selectAll

▸ **selectAll**(`tableName?`): [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)

Allows to select all

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tableName?` | `string` | an optional table name |

#### Returns

[`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)

itself

#### Defined in

[database/SelectBuilder.ts:54](https://github.com/onzag/itemize/blob/a24376ed/database/SelectBuilder.ts#L54)

___

### selectColumnFromTable

▸ **selectColumnFromTable**(`tableName`, `column`): [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)

Allows to select based on a column in a table

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tableName` | `string` | the table in question |
| `column` | `string` | the column |

#### Returns

[`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)

itself

#### Defined in

[database/SelectBuilder.ts:78](https://github.com/onzag/itemize/blob/a24376ed/database/SelectBuilder.ts#L78)

___

### selectExpression

▸ **selectExpression**(`expression`, `bindings?`): [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)

Allows to select based on an expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | the expression in question |
| `bindings?` | [`BasicBindingType`](../modules/database_base.md#basicbindingtype)[] | the bindings for that expression |

#### Returns

[`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)

itself

#### Defined in

[database/SelectBuilder.ts:90](https://github.com/onzag/itemize/blob/a24376ed/database/SelectBuilder.ts#L90)

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

[database/base.ts:89](https://github.com/onzag/itemize/blob/a24376ed/database/base.ts#L89)

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

[database/base.ts:98](https://github.com/onzag/itemize/blob/a24376ed/database/base.ts#L98)

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

[database/base.ts:129](https://github.com/onzag/itemize/blob/a24376ed/database/base.ts#L129)
