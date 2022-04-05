[@onzag/itemize](../README.md) / [Modules](../modules.md) / [database/GroupByBuilder](../modules/database_GroupByBuilder.md) / GroupByBuilder

# Class: GroupByBuilder

[database/GroupByBuilder](../modules/database_GroupByBuilder.md).GroupByBuilder

Provides the group by builders that allows to create GROUP BY sql statments

## Hierarchy

- [`QueryBuilder`](database_base.QueryBuilder.md)

  ↳ **`GroupByBuilder`**

## Table of contents

### Constructors

- [constructor](database_GroupByBuilder.GroupByBuilder.md#constructor)

### Properties

- [expressions](database_GroupByBuilder.GroupByBuilder.md#expressions)

### Methods

- [addBindingSource](database_GroupByBuilder.GroupByBuilder.md#addbindingsource)
- [addBindingSources](database_GroupByBuilder.GroupByBuilder.md#addbindingsources)
- [addColumn](database_GroupByBuilder.GroupByBuilder.md#addcolumn)
- [addColumnWithTable](database_GroupByBuilder.GroupByBuilder.md#addcolumnwithtable)
- [addExpression](database_GroupByBuilder.GroupByBuilder.md#addexpression)
- [clear](database_GroupByBuilder.GroupByBuilder.md#clear)
- [clearBindingSources](database_GroupByBuilder.GroupByBuilder.md#clearbindingsources)
- [compile](database_GroupByBuilder.GroupByBuilder.md#compile)
- [getBindings](database_GroupByBuilder.GroupByBuilder.md#getbindings)
- [popBindingSource](database_GroupByBuilder.GroupByBuilder.md#popbindingsource)
- [shiftBindingSource](database_GroupByBuilder.GroupByBuilder.md#shiftbindingsource)
- [shiftBindingSources](database_GroupByBuilder.GroupByBuilder.md#shiftbindingsources)
- [toSQL](database_GroupByBuilder.GroupByBuilder.md#tosql)

## Constructors

### constructor

• **new GroupByBuilder**()

Constructs a new query

#### Overrides

[QueryBuilder](database_base.QueryBuilder.md).[constructor](database_base.QueryBuilder.md#constructor)

#### Defined in

[database/GroupByBuilder.ts:13](https://github.com/onzag/itemize/blob/5c2808d3/database/GroupByBuilder.ts#L13)

## Properties

### expressions

• `Private` **expressions**: `string`[] = `[]`

#### Defined in

[database/GroupByBuilder.ts:12](https://github.com/onzag/itemize/blob/5c2808d3/database/GroupByBuilder.ts#L12)

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

### addColumn

▸ **addColumn**(`column`): [`GroupByBuilder`](database_GroupByBuilder.GroupByBuilder.md)

Adds a column to group by

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `column` | `string` | the colum in question |

#### Returns

[`GroupByBuilder`](database_GroupByBuilder.GroupByBuilder.md)

itself

#### Defined in

[database/GroupByBuilder.ts:22](https://github.com/onzag/itemize/blob/5c2808d3/database/GroupByBuilder.ts#L22)

___

### addColumnWithTable

▸ **addColumnWithTable**(`tableName`, `column`): [`GroupByBuilder`](database_GroupByBuilder.GroupByBuilder.md)

Adds a column to group by in a given table

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tableName` | `string` | the table that holds the column |
| `column` | `string` | the column in question |

#### Returns

[`GroupByBuilder`](database_GroupByBuilder.GroupByBuilder.md)

itself

#### Defined in

[database/GroupByBuilder.ts:32](https://github.com/onzag/itemize/blob/5c2808d3/database/GroupByBuilder.ts#L32)

___

### addExpression

▸ **addExpression**(`expression`, `bindings?`): [`GroupByBuilder`](database_GroupByBuilder.GroupByBuilder.md)

Adds a expression to group by

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | the expression as a string |
| `bindings?` | (`string` \| `number`)[] | the bindings for that expression |

#### Returns

[`GroupByBuilder`](database_GroupByBuilder.GroupByBuilder.md)

itself

#### Defined in

[database/GroupByBuilder.ts:44](https://github.com/onzag/itemize/blob/5c2808d3/database/GroupByBuilder.ts#L44)

___

### clear

▸ **clear**(): [`GroupByBuilder`](database_GroupByBuilder.GroupByBuilder.md)

Removes all the expressions that were used to group by

#### Returns

[`GroupByBuilder`](database_GroupByBuilder.GroupByBuilder.md)

itself

#### Defined in

[database/GroupByBuilder.ts:68](https://github.com/onzag/itemize/blob/5c2808d3/database/GroupByBuilder.ts#L68)

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

[database/GroupByBuilder.ts:57](https://github.com/onzag/itemize/blob/5c2808d3/database/GroupByBuilder.ts#L57)

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
