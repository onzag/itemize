[@onzag/itemize](../README.md) / [Modules](../modules.md) / [database/base](../modules/database_base.md) / QueryBuilder

# Class: QueryBuilder

[database/base](../modules/database_base.md).QueryBuilder

Reprents the basic query builder to build a bit of a query
or the entire query itself and this class is supposed to
be extended by other builders

## Hierarchy

- **`QueryBuilder`**

  ↳ [`AlterTableBuilder`](database_AlterTableBuilder.AlterTableBuilder.md)

  ↳ [`CreateTableBuilder`](database_CreateTableBuilder.CreateTableBuilder.md)

  ↳ [`DeleteBuilder`](database_DeleteBuilder.DeleteBuilder.md)

  ↳ [`FromBuilder`](database_FromBuilder.FromBuilder.md)

  ↳ [`GroupByBuilder`](database_GroupByBuilder.GroupByBuilder.md)

  ↳ [`InsertBuilder`](database_InsertBuilder.InsertBuilder.md)

  ↳ [`JoinBuilder`](database_JoinBuilder.JoinBuilder.md)

  ↳ [`OrderByBuilder`](database_OrderByBuilder.OrderByBuilder.md)

  ↳ [`RawBuilder`](database_RawBuilder.RawBuilder.md)

  ↳ [`ReturningBuilder`](database_ReturningBuilder.ReturningBuilder.md)

  ↳ [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)

  ↳ [`SetBuilder`](database_SetBuilder.SetBuilder.md)

  ↳ [`UpdateBuilder`](database_UpdateBuilder.UpdateBuilder.md)

  ↳ [`WithBuilder`](database_WithBuilder.WithBuilder.md)

  ↳ [`ConditionalBuilder`](database_base.ConditionalBuilder.md)

## Table of contents

### Constructors

- [constructor](database_base.QueryBuilder.md#constructor)

### Properties

- [bindingSources](database_base.QueryBuilder.md#bindingsources)

### Methods

- [addBindingSource](database_base.QueryBuilder.md#addbindingsource)
- [addBindingSources](database_base.QueryBuilder.md#addbindingsources)
- [clearBindingSources](database_base.QueryBuilder.md#clearbindingsources)
- [compile](database_base.QueryBuilder.md#compile)
- [getBindings](database_base.QueryBuilder.md#getbindings)
- [popBindingSource](database_base.QueryBuilder.md#popbindingsource)
- [shiftBindingSource](database_base.QueryBuilder.md#shiftbindingsource)
- [shiftBindingSources](database_base.QueryBuilder.md#shiftbindingsources)
- [toSQL](database_base.QueryBuilder.md#tosql)

## Constructors

### constructor

• **new QueryBuilder**()

Constructs a new query

#### Defined in

[database/base.ts:62](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L62)

## Properties

### bindingSources

• `Private` **bindingSources**: [`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype)[] = `[]`

These are all the bindings that are used by the query builder
in order

#### Defined in

[database/base.ts:57](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L57)

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

#### Defined in

[database/base.ts:77](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L77)

___

### clearBindingSources

▸ **clearBindingSources**(): `void`

Removes all binding sources

#### Returns

`void`

#### Defined in

[database/base.ts:105](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L105)

___

### compile

▸ **compile**(): `string`

Returns the result of the compilation of the query
this function needs to be overriden

**`override`**

#### Returns

`string`

#### Defined in

[database/base.ts:121](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L121)

___

### getBindings

▸ **getBindings**(): [`BasicBindingType`](../modules/database_base.md#basicbindingtype)[]

Provides the bindings for the query in order that
should match the compilation

#### Returns

[`BasicBindingType`](../modules/database_base.md#basicbindingtype)[]

a list of basic bindings

#### Defined in

[database/base.ts:168](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L168)

___

### popBindingSource

▸ **popBindingSource**(): [`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype)

Removes the last added biding source and returns it

#### Returns

[`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype)

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

#### Defined in

[database/base.ts:98](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L98)

___

### toSQL

▸ **toSQL**(): `IQueryBuilderSQLResult`

Returns the SQL result for usage in the query builder

#### Returns

`IQueryBuilderSQLResult`

a sql builder result with the bindings and the query itself

#### Defined in

[database/base.ts:129](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L129)
