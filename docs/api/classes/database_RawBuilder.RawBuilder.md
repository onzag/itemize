[@onzag/itemize](../README.md) / [Modules](../modules.md) / [database/RawBuilder](../modules/database_RawBuilder.md) / RawBuilder

# Class: RawBuilder

[database/RawBuilder](../modules/database_RawBuilder.md).RawBuilder

This is the raw builder for raw queries, it's not very useful
you might prefer to pass raw queries into the database connection
instead of using this

## Hierarchy

- [`QueryBuilder`](database_base.QueryBuilder.md)

  ↳ **`RawBuilder`**

## Table of contents

### Constructors

- [constructor](database_RawBuilder.RawBuilder.md#constructor)

### Properties

- [raw](database_RawBuilder.RawBuilder.md#raw)

### Methods

- [addBindingSource](database_RawBuilder.RawBuilder.md#addbindingsource)
- [addBindingSources](database_RawBuilder.RawBuilder.md#addbindingsources)
- [clearBindingSources](database_RawBuilder.RawBuilder.md#clearbindingsources)
- [compile](database_RawBuilder.RawBuilder.md#compile)
- [getBindings](database_RawBuilder.RawBuilder.md#getbindings)
- [popBindingSource](database_RawBuilder.RawBuilder.md#popbindingsource)
- [shiftBindingSource](database_RawBuilder.RawBuilder.md#shiftbindingsource)
- [shiftBindingSources](database_RawBuilder.RawBuilder.md#shiftbindingsources)
- [toSQL](database_RawBuilder.RawBuilder.md#tosql)

## Constructors

### constructor

• **new RawBuilder**(`raw`, `bindings?`)

Builds a new raw query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `raw` | `string` | the raw query |
| `bindings?` | (`string` \| `number`)[] | the bindings for such |

#### Overrides

[QueryBuilder](database_base.QueryBuilder.md).[constructor](database_base.QueryBuilder.md#constructor)

#### Defined in

[database/RawBuilder.ts:25](https://github.com/onzag/itemize/blob/f2db74a5/database/RawBuilder.ts#L25)

## Properties

### raw

• `Private` **raw**: `string`

The raw expression

#### Defined in

[database/RawBuilder.ts:18](https://github.com/onzag/itemize/blob/f2db74a5/database/RawBuilder.ts#L18)

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

[database/RawBuilder.ts:39](https://github.com/onzag/itemize/blob/f2db74a5/database/RawBuilder.ts#L39)

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
