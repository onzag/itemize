[@onzag/itemize](../README.md) / [Modules](../modules.md) / [database/InsertBuilder](../modules/database_InsertBuilder.md) / InsertBuilder

# Class: InsertBuilder

[database/InsertBuilder](../modules/database_InsertBuilder.md).InsertBuilder

the insert query builder that allows to create INSERT queries

## Hierarchy

- [`QueryBuilder`](database_base.QueryBuilder.md)

  ↳ **`InsertBuilder`**

## Table of contents

### Constructors

- [constructor](database_InsertBuilder.InsertBuilder.md#constructor)

### Properties

- [columnSignature](database_InsertBuilder.InsertBuilder.md#columnsignature)
- [doOnConflict](database_InsertBuilder.InsertBuilder.md#doonconflict)
- [doOnConflictConstraint](database_InsertBuilder.InsertBuilder.md#doonconflictconstraint)
- [doOnConflictRows](database_InsertBuilder.InsertBuilder.md#doonconflictrows)
- [returningBuilder](database_InsertBuilder.InsertBuilder.md#returningbuilder)
- [tableName](database_InsertBuilder.InsertBuilder.md#tablename)
- [upsertSetBuilder](database_InsertBuilder.InsertBuilder.md#upsertsetbuilder)
- [upsertWhereBuilder](database_InsertBuilder.InsertBuilder.md#upsertwherebuilder)
- [valuesToInsert](database_InsertBuilder.InsertBuilder.md#valuestoinsert)

### Methods

- [addBindingSource](database_InsertBuilder.InsertBuilder.md#addbindingsource)
- [addBindingSources](database_InsertBuilder.InsertBuilder.md#addbindingsources)
- [clear](database_InsertBuilder.InsertBuilder.md#clear)
- [clearBindingSources](database_InsertBuilder.InsertBuilder.md#clearbindingsources)
- [clearValues](database_InsertBuilder.InsertBuilder.md#clearvalues)
- [compile](database_InsertBuilder.InsertBuilder.md#compile)
- [getBindings](database_InsertBuilder.InsertBuilder.md#getbindings)
- [insert](database_InsertBuilder.InsertBuilder.md#insert)
- [onConclictOnConstraint](database_InsertBuilder.InsertBuilder.md#onconclictonconstraint)
- [onConflict](database_InsertBuilder.InsertBuilder.md#onconflict)
- [onConflictOn](database_InsertBuilder.InsertBuilder.md#onconflicton)
- [popBindingSource](database_InsertBuilder.InsertBuilder.md#popbindingsource)
- [shiftBindingSource](database_InsertBuilder.InsertBuilder.md#shiftbindingsource)
- [shiftBindingSources](database_InsertBuilder.InsertBuilder.md#shiftbindingsources)
- [table](database_InsertBuilder.InsertBuilder.md#table)
- [toSQL](database_InsertBuilder.InsertBuilder.md#tosql)

## Constructors

### constructor

• **new InsertBuilder**(): [`InsertBuilder`](database_InsertBuilder.InsertBuilder.md)

Builds a new insert query

#### Returns

[`InsertBuilder`](database_InsertBuilder.InsertBuilder.md)

#### Overrides

[QueryBuilder](database_base.QueryBuilder.md).[constructor](database_base.QueryBuilder.md#constructor)

#### Defined in

[database/InsertBuilder.ts:62](https://github.com/onzag/itemize/blob/59702dd5/database/InsertBuilder.ts#L62)

## Properties

### columnSignature

• `Private` **columnSignature**: `string` = `null`

The signature of what we are trying to add
this is the columns list

"id", "version", "name"

as a string itself

#### Defined in

[database/InsertBuilder.ts:31](https://github.com/onzag/itemize/blob/59702dd5/database/InsertBuilder.ts#L31)

___

### doOnConflict

• `Private` **doOnConflict**: ``"NOTHING"`` \| ``"UPDATE"``

What to do on conflict

#### Defined in

[database/InsertBuilder.ts:55](https://github.com/onzag/itemize/blob/59702dd5/database/InsertBuilder.ts#L55)

___

### doOnConflictConstraint

• `Private` **doOnConflictConstraint**: `string`

#### Defined in

[database/InsertBuilder.ts:57](https://github.com/onzag/itemize/blob/59702dd5/database/InsertBuilder.ts#L57)

___

### doOnConflictRows

• `Private` **doOnConflictRows**: `string`[]

#### Defined in

[database/InsertBuilder.ts:56](https://github.com/onzag/itemize/blob/59702dd5/database/InsertBuilder.ts#L56)

___

### returningBuilder

• **returningBuilder**: [`ReturningBuilder`](database_ReturningBuilder.ReturningBuilder.md)

The returning builder to specify the returning condition

#### Defined in

[database/InsertBuilder.ts:46](https://github.com/onzag/itemize/blob/59702dd5/database/InsertBuilder.ts#L46)

___

### tableName

• `Private` **tableName**: `string`

The table name we try to insert at

#### Defined in

[database/InsertBuilder.ts:51](https://github.com/onzag/itemize/blob/59702dd5/database/InsertBuilder.ts#L51)

___

### upsertSetBuilder

• `Private` **upsertSetBuilder**: [`SetBuilder`](database_SetBuilder.SetBuilder.md) = `null`

The set builder for an upsert

#### Defined in

[database/InsertBuilder.ts:36](https://github.com/onzag/itemize/blob/59702dd5/database/InsertBuilder.ts#L36)

___

### upsertWhereBuilder

• `Private` **upsertWhereBuilder**: [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md) = `null`

The where builder for an upsert

#### Defined in

[database/InsertBuilder.ts:41](https://github.com/onzag/itemize/blob/59702dd5/database/InsertBuilder.ts#L41)

___

### valuesToInsert

• `Private` **valuesToInsert**: `string`[] = `[]`

Represents the expressions that we are trying
to insert in order, these are already converted
into a string form, for example

"?, ?, ?, NOW()" etc...

#### Defined in

[database/InsertBuilder.ts:22](https://github.com/onzag/itemize/blob/59702dd5/database/InsertBuilder.ts#L22)

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

### clear

▸ **clear**(): [`InsertBuilder`](database_InsertBuilder.InsertBuilder.md)

Clears the values to insert and removes the table name as well
this function does not affect the builders

#### Returns

[`InsertBuilder`](database_InsertBuilder.InsertBuilder.md)

itself

#### Defined in

[database/InsertBuilder.ts:90](https://github.com/onzag/itemize/blob/59702dd5/database/InsertBuilder.ts#L90)

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

### clearValues

▸ **clearValues**(): [`InsertBuilder`](database_InsertBuilder.InsertBuilder.md)

Clears the values to insert and the values alone

#### Returns

[`InsertBuilder`](database_InsertBuilder.InsertBuilder.md)

itself

#### Defined in

[database/InsertBuilder.ts:76](https://github.com/onzag/itemize/blob/59702dd5/database/InsertBuilder.ts#L76)

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

[database/InsertBuilder.ts:231](https://github.com/onzag/itemize/blob/59702dd5/database/InsertBuilder.ts#L231)

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

### insert

▸ **insert**(`...values`): [`InsertBuilder`](database_InsertBuilder.InsertBuilder.md)

Specifies what values to insert

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...values` | [`IManyValueType`](../interfaces/database_base.IManyValueType.md)[] | the values to insert as an object |

#### Returns

[`InsertBuilder`](database_InsertBuilder.InsertBuilder.md)

itself

#### Defined in

[database/InsertBuilder.ts:114](https://github.com/onzag/itemize/blob/59702dd5/database/InsertBuilder.ts#L114)

___

### onConclictOnConstraint

▸ **onConclictOnConstraint**(`constraint`, `doWhat`, `fn?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `constraint` | `string` |
| `doWhat` | ``"NOTHING"`` \| ``"UPDATE"`` |
| `fn?` | (`setBuilder`: [`SetBuilder`](database_SetBuilder.SetBuilder.md), `whereBuilder`: [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)) => `void` |

#### Returns

`void`

#### Defined in

[database/InsertBuilder.ts:183](https://github.com/onzag/itemize/blob/59702dd5/database/InsertBuilder.ts#L183)

___

### onConflict

▸ **onConflict**(`doWhat`, `fn?`): [`InsertBuilder`](database_InsertBuilder.InsertBuilder.md)

sets the on conflict rule for the insert

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `doWhat` | ``"NOTHING"`` \| ``"UPDATE"`` | what to do NOTHING or UPDATE |
| `fn?` | (`setBuilder`: [`SetBuilder`](database_SetBuilder.SetBuilder.md), `whereBuilder`: [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)) => `void` | a function to specify the set and where builder that is given on update |

#### Returns

[`InsertBuilder`](database_InsertBuilder.InsertBuilder.md)

itself

#### Defined in

[database/InsertBuilder.ts:203](https://github.com/onzag/itemize/blob/59702dd5/database/InsertBuilder.ts#L203)

___

### onConflictOn

▸ **onConflictOn**(`rows`, `doWhat`, `fn?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rows` | `string`[] \| [`string`, `string`][] |
| `doWhat` | ``"NOTHING"`` \| ``"UPDATE"`` |
| `fn?` | (`setBuilder`: [`SetBuilder`](database_SetBuilder.SetBuilder.md), `whereBuilder`: [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)) => `void` |

#### Returns

`void`

#### Defined in

[database/InsertBuilder.ts:190](https://github.com/onzag/itemize/blob/59702dd5/database/InsertBuilder.ts#L190)

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

### table

▸ **table**(`tableName`): [`InsertBuilder`](database_InsertBuilder.InsertBuilder.md)

Sets the table you are trying to insert at

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tableName` | `string` | the table name |

#### Returns

[`InsertBuilder`](database_InsertBuilder.InsertBuilder.md)

itself

#### Defined in

[database/InsertBuilder.ts:104](https://github.com/onzag/itemize/blob/59702dd5/database/InsertBuilder.ts#L104)

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
