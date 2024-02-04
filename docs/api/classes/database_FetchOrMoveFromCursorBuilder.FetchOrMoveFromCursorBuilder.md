[@onzag/itemize](../README.md) / [Modules](../modules.md) / [database/FetchOrMoveFromCursorBuilder](../modules/database_FetchOrMoveFromCursorBuilder.md) / FetchOrMoveFromCursorBuilder

# Class: FetchOrMoveFromCursorBuilder

[database/FetchOrMoveFromCursorBuilder](../modules/database_FetchOrMoveFromCursorBuilder.md).FetchOrMoveFromCursorBuilder

The select query builder that allows to create SELECT queries

## Hierarchy

- [`QueryBuilder`](database_base.QueryBuilder.md)

  ↳ **`FetchOrMoveFromCursorBuilder`**

## Table of contents

### Constructors

- [constructor](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md#constructor)

### Properties

- [direction](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md#direction)
- [directionCount](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md#directioncount)
- [name](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md#name)
- [type](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md#type)

### Methods

- [absolute](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md#absolute)
- [addBindingSource](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md#addbindingsource)
- [addBindingSources](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md#addbindingsources)
- [backward](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md#backward)
- [clearBindingSources](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md#clearbindingsources)
- [compile](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md#compile)
- [first](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md#first)
- [forward](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md#forward)
- [getBindings](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md#getbindings)
- [last](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md#last)
- [next](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md#next)
- [popBindingSource](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md#popbindingsource)
- [prior](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md#prior)
- [relative](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md#relative)
- [setDirection](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md#setdirection)
- [shiftBindingSource](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md#shiftbindingsource)
- [shiftBindingSources](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md#shiftbindingsources)
- [toSQL](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md#tosql)

## Constructors

### constructor

• **new FetchOrMoveFromCursorBuilder**(`type`, `name`): [`FetchOrMoveFromCursorBuilder`](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md)

Builds a new declare query builder

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | ``"FETCH"`` \| ``"MOVE"`` | - |
| `name` | `string` | the name |

#### Returns

[`FetchOrMoveFromCursorBuilder`](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md)

#### Overrides

[QueryBuilder](database_base.QueryBuilder.md).[constructor](database_base.QueryBuilder.md#constructor)

#### Defined in

[database/FetchOrMoveFromCursorBuilder.ts:23](https://github.com/onzag/itemize/blob/73e0c39e/database/FetchOrMoveFromCursorBuilder.ts#L23)

## Properties

### direction

• **direction**: [`FetchCursorDirection`](../modules/database_FetchOrMoveFromCursorBuilder.md#fetchcursordirection) = `"NEXT"`

#### Defined in

[database/FetchOrMoveFromCursorBuilder.ts:16](https://github.com/onzag/itemize/blob/73e0c39e/database/FetchOrMoveFromCursorBuilder.ts#L16)

___

### directionCount

• **directionCount**: `number` = `null`

#### Defined in

[database/FetchOrMoveFromCursorBuilder.ts:17](https://github.com/onzag/itemize/blob/73e0c39e/database/FetchOrMoveFromCursorBuilder.ts#L17)

___

### name

• **name**: `string`

#### Defined in

[database/FetchOrMoveFromCursorBuilder.ts:15](https://github.com/onzag/itemize/blob/73e0c39e/database/FetchOrMoveFromCursorBuilder.ts#L15)

___

### type

• **type**: ``"FETCH"`` \| ``"MOVE"``

#### Defined in

[database/FetchOrMoveFromCursorBuilder.ts:14](https://github.com/onzag/itemize/blob/73e0c39e/database/FetchOrMoveFromCursorBuilder.ts#L14)

## Methods

### absolute

▸ **absolute**(`count`): [`FetchOrMoveFromCursorBuilder`](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `count` | `number` |

#### Returns

[`FetchOrMoveFromCursorBuilder`](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md)

#### Defined in

[database/FetchOrMoveFromCursorBuilder.ts:52](https://github.com/onzag/itemize/blob/73e0c39e/database/FetchOrMoveFromCursorBuilder.ts#L52)

___

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

### backward

▸ **backward**(`count`): [`FetchOrMoveFromCursorBuilder`](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `count` | `number` |

#### Returns

[`FetchOrMoveFromCursorBuilder`](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md)

#### Defined in

[database/FetchOrMoveFromCursorBuilder.ts:67](https://github.com/onzag/itemize/blob/73e0c39e/database/FetchOrMoveFromCursorBuilder.ts#L67)

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

[database/FetchOrMoveFromCursorBuilder.ts:86](https://github.com/onzag/itemize/blob/73e0c39e/database/FetchOrMoveFromCursorBuilder.ts#L86)

___

### first

▸ **first**(): [`FetchOrMoveFromCursorBuilder`](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md)

#### Returns

[`FetchOrMoveFromCursorBuilder`](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md)

#### Defined in

[database/FetchOrMoveFromCursorBuilder.ts:42](https://github.com/onzag/itemize/blob/73e0c39e/database/FetchOrMoveFromCursorBuilder.ts#L42)

___

### forward

▸ **forward**(`count`): [`FetchOrMoveFromCursorBuilder`](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `count` | `number` |

#### Returns

[`FetchOrMoveFromCursorBuilder`](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md)

#### Defined in

[database/FetchOrMoveFromCursorBuilder.ts:62](https://github.com/onzag/itemize/blob/73e0c39e/database/FetchOrMoveFromCursorBuilder.ts#L62)

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

### last

▸ **last**(): [`FetchOrMoveFromCursorBuilder`](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md)

#### Returns

[`FetchOrMoveFromCursorBuilder`](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md)

#### Defined in

[database/FetchOrMoveFromCursorBuilder.ts:47](https://github.com/onzag/itemize/blob/73e0c39e/database/FetchOrMoveFromCursorBuilder.ts#L47)

___

### next

▸ **next**(): [`FetchOrMoveFromCursorBuilder`](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md)

#### Returns

[`FetchOrMoveFromCursorBuilder`](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md)

#### Defined in

[database/FetchOrMoveFromCursorBuilder.ts:32](https://github.com/onzag/itemize/blob/73e0c39e/database/FetchOrMoveFromCursorBuilder.ts#L32)

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

### prior

▸ **prior**(): [`FetchOrMoveFromCursorBuilder`](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md)

#### Returns

[`FetchOrMoveFromCursorBuilder`](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md)

#### Defined in

[database/FetchOrMoveFromCursorBuilder.ts:37](https://github.com/onzag/itemize/blob/73e0c39e/database/FetchOrMoveFromCursorBuilder.ts#L37)

___

### relative

▸ **relative**(`count`): [`FetchOrMoveFromCursorBuilder`](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `count` | `number` |

#### Returns

[`FetchOrMoveFromCursorBuilder`](database_FetchOrMoveFromCursorBuilder.FetchOrMoveFromCursorBuilder.md)

#### Defined in

[database/FetchOrMoveFromCursorBuilder.ts:57](https://github.com/onzag/itemize/blob/73e0c39e/database/FetchOrMoveFromCursorBuilder.ts#L57)

___

### setDirection

▸ **setDirection**(`dir`, `count`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dir` | [`FetchCursorDirection`](../modules/database_FetchOrMoveFromCursorBuilder.md#fetchcursordirection) |
| `count` | `number` |

#### Returns

`void`

#### Defined in

[database/FetchOrMoveFromCursorBuilder.ts:72](https://github.com/onzag/itemize/blob/73e0c39e/database/FetchOrMoveFromCursorBuilder.ts#L72)

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
