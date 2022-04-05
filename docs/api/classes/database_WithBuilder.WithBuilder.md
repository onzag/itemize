[@onzag/itemize](../README.md) / [Modules](../modules.md) / [database/WithBuilder](../modules/database_WithBuilder.md) / WithBuilder

# Class: WithBuilder

[database/WithBuilder](../modules/database_WithBuilder.md).WithBuilder

The with query builder that allows to create WITH queries

## Hierarchy

- [`QueryBuilder`](database_base.QueryBuilder.md)

  ↳ **`WithBuilder`**

## Table of contents

### Constructors

- [constructor](database_WithBuilder.WithBuilder.md#constructor)

### Properties

- [query](database_WithBuilder.WithBuilder.md#query)
- [withs](database_WithBuilder.WithBuilder.md#withs)

### Methods

- [addBindingSource](database_WithBuilder.WithBuilder.md#addbindingsource)
- [addBindingSources](database_WithBuilder.WithBuilder.md#addbindingsources)
- [clear](database_WithBuilder.WithBuilder.md#clear)
- [clearBindingSources](database_WithBuilder.WithBuilder.md#clearbindingsources)
- [compile](database_WithBuilder.WithBuilder.md#compile)
- [do](database_WithBuilder.WithBuilder.md#do)
- [getBindings](database_WithBuilder.WithBuilder.md#getbindings)
- [popBindingSource](database_WithBuilder.WithBuilder.md#popbindingsource)
- [shiftBindingSource](database_WithBuilder.WithBuilder.md#shiftbindingsource)
- [shiftBindingSources](database_WithBuilder.WithBuilder.md#shiftbindingsources)
- [toSQL](database_WithBuilder.WithBuilder.md#tosql)
- [with](database_WithBuilder.WithBuilder.md#with)

## Constructors

### constructor

• **new WithBuilder**()

Builds a new query builder for a WITH query

#### Overrides

[QueryBuilder](database_base.QueryBuilder.md).[constructor](database_base.QueryBuilder.md#constructor)

#### Defined in

[database/WithBuilder.ts:38](https://github.com/onzag/itemize/blob/5c2808d3/database/WithBuilder.ts#L38)

## Properties

### query

• `Private` **query**: [`QueryBuilder`](database_base.QueryBuilder.md)

And this is the query itself we are executing with WITH ... DO ...

#### Defined in

[database/WithBuilder.ts:33](https://github.com/onzag/itemize/blob/5c2808d3/database/WithBuilder.ts#L33)

___

### withs

• `Private` **withs**: `IWithRules`[] = `[]`

These are all the WITH ... queries we are doing

#### Defined in

[database/WithBuilder.ts:29](https://github.com/onzag/itemize/blob/5c2808d3/database/WithBuilder.ts#L29)

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

▸ **clear**(): [`WithBuilder`](database_WithBuilder.WithBuilder.md)

Clears all the with selections and the query itself

#### Returns

[`WithBuilder`](database_WithBuilder.WithBuilder.md)

itself

#### Defined in

[database/WithBuilder.ts:92](https://github.com/onzag/itemize/blob/5c2808d3/database/WithBuilder.ts#L92)

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

[database/WithBuilder.ts:82](https://github.com/onzag/itemize/blob/5c2808d3/database/WithBuilder.ts#L82)

___

### do

▸ **do**(`query`): [`WithBuilder`](database_WithBuilder.WithBuilder.md)

Specifies the query that would execute

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | [`QueryBuilder`](database_base.QueryBuilder.md) | the query to execute |

#### Returns

[`WithBuilder`](database_WithBuilder.WithBuilder.md)

itself

#### Defined in

[database/WithBuilder.ts:72](https://github.com/onzag/itemize/blob/5c2808d3/database/WithBuilder.ts#L72)

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

___

### with

▸ **with**(`name`, `asWhat`): [`WithBuilder`](database_WithBuilder.WithBuilder.md)

Adds a new query to use with

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the name to assign to it |
| `asWhat` | [`QueryBuilder`](database_base.QueryBuilder.md) | and the query itself |

#### Returns

[`WithBuilder`](database_WithBuilder.WithBuilder.md)

itself

#### Defined in

[database/WithBuilder.ts:48](https://github.com/onzag/itemize/blob/5c2808d3/database/WithBuilder.ts#L48)
