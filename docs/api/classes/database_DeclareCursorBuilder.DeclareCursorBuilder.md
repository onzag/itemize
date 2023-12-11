[@onzag/itemize](../README.md) / [Modules](../modules.md) / [database/DeclareCursorBuilder](../modules/database_DeclareCursorBuilder.md) / DeclareCursorBuilder

# Class: DeclareCursorBuilder

[database/DeclareCursorBuilder](../modules/database_DeclareCursorBuilder.md).DeclareCursorBuilder

The select query builder that allows to create SELECT queries

## Hierarchy

- [`QueryBuilder`](database_base.QueryBuilder.md)

  ↳ **`DeclareCursorBuilder`**

## Table of contents

### Constructors

- [constructor](database_DeclareCursorBuilder.DeclareCursorBuilder.md#constructor)

### Properties

- [forQuery](database_DeclareCursorBuilder.DeclareCursorBuilder.md#forquery)
- [isWithHold](database_DeclareCursorBuilder.DeclareCursorBuilder.md#iswithhold)
- [name](database_DeclareCursorBuilder.DeclareCursorBuilder.md#name)
- [scrollState](database_DeclareCursorBuilder.DeclareCursorBuilder.md#scrollstate)

### Methods

- [addBindingSource](database_DeclareCursorBuilder.DeclareCursorBuilder.md#addbindingsource)
- [addBindingSources](database_DeclareCursorBuilder.DeclareCursorBuilder.md#addbindingsources)
- [clearBindingSources](database_DeclareCursorBuilder.DeclareCursorBuilder.md#clearbindingsources)
- [clearScroll](database_DeclareCursorBuilder.DeclareCursorBuilder.md#clearscroll)
- [compile](database_DeclareCursorBuilder.DeclareCursorBuilder.md#compile)
- [getBindings](database_DeclareCursorBuilder.DeclareCursorBuilder.md#getbindings)
- [noScroll](database_DeclareCursorBuilder.DeclareCursorBuilder.md#noscroll)
- [popBindingSource](database_DeclareCursorBuilder.DeclareCursorBuilder.md#popbindingsource)
- [scroll](database_DeclareCursorBuilder.DeclareCursorBuilder.md#scroll)
- [shiftBindingSource](database_DeclareCursorBuilder.DeclareCursorBuilder.md#shiftbindingsource)
- [shiftBindingSources](database_DeclareCursorBuilder.DeclareCursorBuilder.md#shiftbindingsources)
- [toSQL](database_DeclareCursorBuilder.DeclareCursorBuilder.md#tosql)
- [withHold](database_DeclareCursorBuilder.DeclareCursorBuilder.md#withhold)
- [withoutHold](database_DeclareCursorBuilder.DeclareCursorBuilder.md#withouthold)

## Constructors

### constructor

• **new DeclareCursorBuilder**(`name`, `forQuery`): [`DeclareCursorBuilder`](database_DeclareCursorBuilder.DeclareCursorBuilder.md)

Builds a new declare query builder

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the name |
| `forQuery` | [`QueryBuilder`](database_base.QueryBuilder.md) | the query it is done for |

#### Returns

[`DeclareCursorBuilder`](database_DeclareCursorBuilder.DeclareCursorBuilder.md)

#### Overrides

[QueryBuilder](database_base.QueryBuilder.md).[constructor](database_base.QueryBuilder.md#constructor)

#### Defined in

[database/DeclareCursorBuilder.ts:22](https://github.com/onzag/itemize/blob/59702dd5/database/DeclareCursorBuilder.ts#L22)

## Properties

### forQuery

• **forQuery**: [`QueryBuilder`](database_base.QueryBuilder.md)

#### Defined in

[database/DeclareCursorBuilder.ts:12](https://github.com/onzag/itemize/blob/59702dd5/database/DeclareCursorBuilder.ts#L12)

___

### isWithHold

• **isWithHold**: `boolean` = `false`

#### Defined in

[database/DeclareCursorBuilder.ts:14](https://github.com/onzag/itemize/blob/59702dd5/database/DeclareCursorBuilder.ts#L14)

___

### name

• **name**: `string`

#### Defined in

[database/DeclareCursorBuilder.ts:13](https://github.com/onzag/itemize/blob/59702dd5/database/DeclareCursorBuilder.ts#L13)

___

### scrollState

• **scrollState**: `string` = `null`

#### Defined in

[database/DeclareCursorBuilder.ts:15](https://github.com/onzag/itemize/blob/59702dd5/database/DeclareCursorBuilder.ts#L15)

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

### clearScroll

▸ **clearScroll**(): [`DeclareCursorBuilder`](database_DeclareCursorBuilder.DeclareCursorBuilder.md)

#### Returns

[`DeclareCursorBuilder`](database_DeclareCursorBuilder.DeclareCursorBuilder.md)

#### Defined in

[database/DeclareCursorBuilder.ts:56](https://github.com/onzag/itemize/blob/59702dd5/database/DeclareCursorBuilder.ts#L56)

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

[database/DeclareCursorBuilder.ts:66](https://github.com/onzag/itemize/blob/59702dd5/database/DeclareCursorBuilder.ts#L66)

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

### noScroll

▸ **noScroll**(): [`DeclareCursorBuilder`](database_DeclareCursorBuilder.DeclareCursorBuilder.md)

#### Returns

[`DeclareCursorBuilder`](database_DeclareCursorBuilder.DeclareCursorBuilder.md)

#### Defined in

[database/DeclareCursorBuilder.ts:50](https://github.com/onzag/itemize/blob/59702dd5/database/DeclareCursorBuilder.ts#L50)

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

### scroll

▸ **scroll**(): [`DeclareCursorBuilder`](database_DeclareCursorBuilder.DeclareCursorBuilder.md)

#### Returns

[`DeclareCursorBuilder`](database_DeclareCursorBuilder.DeclareCursorBuilder.md)

#### Defined in

[database/DeclareCursorBuilder.ts:44](https://github.com/onzag/itemize/blob/59702dd5/database/DeclareCursorBuilder.ts#L44)

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

___

### withHold

▸ **withHold**(): [`DeclareCursorBuilder`](database_DeclareCursorBuilder.DeclareCursorBuilder.md)

#### Returns

[`DeclareCursorBuilder`](database_DeclareCursorBuilder.DeclareCursorBuilder.md)

#### Defined in

[database/DeclareCursorBuilder.ts:32](https://github.com/onzag/itemize/blob/59702dd5/database/DeclareCursorBuilder.ts#L32)

___

### withoutHold

▸ **withoutHold**(): [`DeclareCursorBuilder`](database_DeclareCursorBuilder.DeclareCursorBuilder.md)

#### Returns

[`DeclareCursorBuilder`](database_DeclareCursorBuilder.DeclareCursorBuilder.md)

#### Defined in

[database/DeclareCursorBuilder.ts:38](https://github.com/onzag/itemize/blob/59702dd5/database/DeclareCursorBuilder.ts#L38)
