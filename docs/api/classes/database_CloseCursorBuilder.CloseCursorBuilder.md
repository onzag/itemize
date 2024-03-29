[@onzag/itemize](../README.md) / [Modules](../modules.md) / [database/CloseCursorBuilder](../modules/database_CloseCursorBuilder.md) / CloseCursorBuilder

# Class: CloseCursorBuilder

[database/CloseCursorBuilder](../modules/database_CloseCursorBuilder.md).CloseCursorBuilder

The select query builder that allows to create SELECT queries

## Hierarchy

- [`QueryBuilder`](database_base.QueryBuilder.md)

  ↳ **`CloseCursorBuilder`**

## Table of contents

### Constructors

- [constructor](database_CloseCursorBuilder.CloseCursorBuilder.md#constructor)

### Properties

- [name](database_CloseCursorBuilder.CloseCursorBuilder.md#name)

### Methods

- [addBindingSource](database_CloseCursorBuilder.CloseCursorBuilder.md#addbindingsource)
- [addBindingSources](database_CloseCursorBuilder.CloseCursorBuilder.md#addbindingsources)
- [clearBindingSources](database_CloseCursorBuilder.CloseCursorBuilder.md#clearbindingsources)
- [compile](database_CloseCursorBuilder.CloseCursorBuilder.md#compile)
- [getBindings](database_CloseCursorBuilder.CloseCursorBuilder.md#getbindings)
- [popBindingSource](database_CloseCursorBuilder.CloseCursorBuilder.md#popbindingsource)
- [shiftBindingSource](database_CloseCursorBuilder.CloseCursorBuilder.md#shiftbindingsource)
- [shiftBindingSources](database_CloseCursorBuilder.CloseCursorBuilder.md#shiftbindingsources)
- [toSQL](database_CloseCursorBuilder.CloseCursorBuilder.md#tosql)

## Constructors

### constructor

• **new CloseCursorBuilder**(`name`): [`CloseCursorBuilder`](database_CloseCursorBuilder.CloseCursorBuilder.md)

Builds a new declare query builder

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the name |

#### Returns

[`CloseCursorBuilder`](database_CloseCursorBuilder.CloseCursorBuilder.md)

#### Overrides

[QueryBuilder](database_base.QueryBuilder.md).[constructor](database_base.QueryBuilder.md#constructor)

#### Defined in

[database/CloseCursorBuilder.ts:18](https://github.com/onzag/itemize/blob/73e0c39e/database/CloseCursorBuilder.ts#L18)

## Properties

### name

• **name**: `string`

#### Defined in

[database/CloseCursorBuilder.ts:12](https://github.com/onzag/itemize/blob/73e0c39e/database/CloseCursorBuilder.ts#L12)

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

[database/base.ts:69](https://github.com/onzag/itemize/blob/73e0c39e/database/base.ts#L69)

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

[database/base.ts:77](https://github.com/onzag/itemize/blob/73e0c39e/database/base.ts#L77)

___

### clearBindingSources

▸ **clearBindingSources**(): `void`

Removes all binding sources

#### Returns

`void`

#### Inherited from

[QueryBuilder](database_base.QueryBuilder.md).[clearBindingSources](database_base.QueryBuilder.md#clearbindingsources)

#### Defined in

[database/base.ts:105](https://github.com/onzag/itemize/blob/73e0c39e/database/base.ts#L105)

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

[database/CloseCursorBuilder.ts:30](https://github.com/onzag/itemize/blob/73e0c39e/database/CloseCursorBuilder.ts#L30)

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

[database/base.ts:168](https://github.com/onzag/itemize/blob/73e0c39e/database/base.ts#L168)

___

### popBindingSource

▸ **popBindingSource**(): [`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype)

Removes the last added biding source and returns it

#### Returns

[`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype)

#### Inherited from

[QueryBuilder](database_base.QueryBuilder.md).[popBindingSource](database_base.QueryBuilder.md#popbindingsource)

#### Defined in

[database/base.ts:112](https://github.com/onzag/itemize/blob/73e0c39e/database/base.ts#L112)

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

[database/base.ts:89](https://github.com/onzag/itemize/blob/73e0c39e/database/base.ts#L89)

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

[database/base.ts:98](https://github.com/onzag/itemize/blob/73e0c39e/database/base.ts#L98)

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

[database/base.ts:129](https://github.com/onzag/itemize/blob/73e0c39e/database/base.ts#L129)
