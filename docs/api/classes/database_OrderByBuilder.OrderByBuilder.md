[@onzag/itemize](../README.md) / [Modules](../modules.md) / [database/OrderByBuilder](../modules/database_OrderByBuilder.md) / OrderByBuilder

# Class: OrderByBuilder

[database/OrderByBuilder](../modules/database_OrderByBuilder.md).OrderByBuilder

The order by query builder that allows to create ORDER BY statments

## Hierarchy

- [`QueryBuilder`](database_base.QueryBuilder.md)

  ↳ **`OrderByBuilder`**

## Table of contents

### Constructors

- [constructor](database_OrderByBuilder.OrderByBuilder.md#constructor)

### Properties

- [expressions](database_OrderByBuilder.OrderByBuilder.md#expressions)

### Methods

- [addBindingSource](database_OrderByBuilder.OrderByBuilder.md#addbindingsource)
- [addBindingSources](database_OrderByBuilder.OrderByBuilder.md#addbindingsources)
- [clear](database_OrderByBuilder.OrderByBuilder.md#clear)
- [clearBindingSources](database_OrderByBuilder.OrderByBuilder.md#clearbindingsources)
- [compile](database_OrderByBuilder.OrderByBuilder.md#compile)
- [getBindings](database_OrderByBuilder.OrderByBuilder.md#getbindings)
- [orderBy](database_OrderByBuilder.OrderByBuilder.md#orderby)
- [orderByColumn](database_OrderByBuilder.OrderByBuilder.md#orderbycolumn)
- [orderByColumnInTable](database_OrderByBuilder.OrderByBuilder.md#orderbycolumnintable)
- [orderByUsing](database_OrderByBuilder.OrderByBuilder.md#orderbyusing)
- [popBindingSource](database_OrderByBuilder.OrderByBuilder.md#popbindingsource)
- [shiftBindingSource](database_OrderByBuilder.OrderByBuilder.md#shiftbindingsource)
- [shiftBindingSources](database_OrderByBuilder.OrderByBuilder.md#shiftbindingsources)
- [toSQL](database_OrderByBuilder.OrderByBuilder.md#tosql)

## Constructors

### constructor

• **new OrderByBuilder**()

Builds a new order by query

#### Overrides

[QueryBuilder](database_base.QueryBuilder.md).[constructor](database_base.QueryBuilder.md#constructor)

#### Defined in

[database/OrderByBuilder.ts:30](https://github.com/onzag/itemize/blob/f2db74a5/database/OrderByBuilder.ts#L30)

## Properties

### expressions

• `Private` **expressions**: `IOrderByExpression`[] = `[]`

The expressions we are ordering by

#### Defined in

[database/OrderByBuilder.ts:25](https://github.com/onzag/itemize/blob/f2db74a5/database/OrderByBuilder.ts#L25)

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

▸ **clear**(): [`OrderByBuilder`](database_OrderByBuilder.OrderByBuilder.md)

Clears all the expressions in the order by builder

#### Returns

[`OrderByBuilder`](database_OrderByBuilder.OrderByBuilder.md)

itself

#### Defined in

[database/OrderByBuilder.ts:113](https://github.com/onzag/itemize/blob/f2db74a5/database/OrderByBuilder.ts#L113)

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

[database/OrderByBuilder.ts:123](https://github.com/onzag/itemize/blob/f2db74a5/database/OrderByBuilder.ts#L123)

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

### orderBy

▸ **orderBy**(`expression`, `style`, `nulls`, `bindings?`): [`OrderByBuilder`](database_OrderByBuilder.OrderByBuilder.md)

Allows to order by an expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | the expression in question |
| `style` | ``"ASC"`` \| ``"DESC"`` | ASC or DESC, for ascending or descending |
| `nulls` | ``"FIRST"`` \| ``"LAST"`` | whether nulls go first or last |
| `bindings?` | (`string` \| `number`)[] | the bindings for the expression |

#### Returns

[`OrderByBuilder`](database_OrderByBuilder.OrderByBuilder.md)

itself

#### Defined in

[database/OrderByBuilder.ts:72](https://github.com/onzag/itemize/blob/f2db74a5/database/OrderByBuilder.ts#L72)

___

### orderByColumn

▸ **orderByColumn**(`column`, `style`, `nulls`): [`OrderByBuilder`](database_OrderByBuilder.OrderByBuilder.md)

Allows to order by a column

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `column` | `string` | the column |
| `style` | ``"ASC"`` \| ``"DESC"`` | ASC or DESC, for ascending or descending |
| `nulls` | ``"FIRST"`` \| ``"LAST"`` | whether nulls go first or last |

#### Returns

[`OrderByBuilder`](database_OrderByBuilder.OrderByBuilder.md)

itself

#### Defined in

[database/OrderByBuilder.ts:60](https://github.com/onzag/itemize/blob/f2db74a5/database/OrderByBuilder.ts#L60)

___

### orderByColumnInTable

▸ **orderByColumnInTable**(`tableName`, `column`, `style`, `nulls`): [`OrderByBuilder`](database_OrderByBuilder.OrderByBuilder.md)

Allows to order by a specific column in a specific table

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tableName` | `string` | the table |
| `column` | `string` | the column |
| `style` | ``"ASC"`` \| ``"DESC"`` | ASC or DESC, for ascending or descending |
| `nulls` | ``"FIRST"`` \| ``"LAST"`` | whether nulls go first or last |

#### Returns

[`OrderByBuilder`](database_OrderByBuilder.OrderByBuilder.md)

itself

#### Defined in

[database/OrderByBuilder.ts:42](https://github.com/onzag/itemize/blob/f2db74a5/database/OrderByBuilder.ts#L42)

___

### orderByUsing

▸ **orderByUsing**(`expression`, `operator`, `nulls`, `bindings?`): [`OrderByBuilder`](database_OrderByBuilder.OrderByBuilder.md)

Allows to order by an expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | the expression in question |
| `operator` | `string` | the operator to go with USING |
| `nulls` | ``"FIRST"`` \| ``"LAST"`` | whether nulls go first or last |
| `bindings?` | (`string` \| `number`)[] | the bindings for the expression |

#### Returns

[`OrderByBuilder`](database_OrderByBuilder.OrderByBuilder.md)

itself

#### Defined in

[database/OrderByBuilder.ts:94](https://github.com/onzag/itemize/blob/f2db74a5/database/OrderByBuilder.ts#L94)

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
