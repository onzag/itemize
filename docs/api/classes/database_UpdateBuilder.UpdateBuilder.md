[@onzag/itemize](../README.md) / [Modules](../modules.md) / [database/UpdateBuilder](../modules/database_UpdateBuilder.md) / UpdateBuilder

# Class: UpdateBuilder

[database/UpdateBuilder](../modules/database_UpdateBuilder.md).UpdateBuilder

Reprents the basic query builder to build a bit of a query
or the entire query itself and this class is supposed to
be extended by other builders

## Hierarchy

- [`QueryBuilder`](database_base.QueryBuilder.md)

  ↳ **`UpdateBuilder`**

## Table of contents

### Constructors

- [constructor](database_UpdateBuilder.UpdateBuilder.md#constructor)

### Properties

- [fromBuilder](database_UpdateBuilder.UpdateBuilder.md#frombuilder)
- [isOnly](database_UpdateBuilder.UpdateBuilder.md#isonly)
- [returningBuilder](database_UpdateBuilder.UpdateBuilder.md#returningbuilder)
- [setBuilder](database_UpdateBuilder.UpdateBuilder.md#setbuilder)
- [tableAlias](database_UpdateBuilder.UpdateBuilder.md#tablealias)
- [tableName](database_UpdateBuilder.UpdateBuilder.md#tablename)
- [whereBuilder](database_UpdateBuilder.UpdateBuilder.md#wherebuilder)

### Methods

- [addBindingSource](database_UpdateBuilder.UpdateBuilder.md#addbindingsource)
- [addBindingSources](database_UpdateBuilder.UpdateBuilder.md#addbindingsources)
- [alias](database_UpdateBuilder.UpdateBuilder.md#alias)
- [clear](database_UpdateBuilder.UpdateBuilder.md#clear)
- [clearBindingSources](database_UpdateBuilder.UpdateBuilder.md#clearbindingsources)
- [compile](database_UpdateBuilder.UpdateBuilder.md#compile)
- [getBindings](database_UpdateBuilder.UpdateBuilder.md#getbindings)
- [makeOnly](database_UpdateBuilder.UpdateBuilder.md#makeonly)
- [popBindingSource](database_UpdateBuilder.UpdateBuilder.md#popbindingsource)
- [shiftBindingSource](database_UpdateBuilder.UpdateBuilder.md#shiftbindingsource)
- [shiftBindingSources](database_UpdateBuilder.UpdateBuilder.md#shiftbindingsources)
- [table](database_UpdateBuilder.UpdateBuilder.md#table)
- [toSQL](database_UpdateBuilder.UpdateBuilder.md#tosql)

## Constructors

### constructor

• **new UpdateBuilder**(): [`UpdateBuilder`](database_UpdateBuilder.UpdateBuilder.md)

Builds a new update query builder

#### Returns

[`UpdateBuilder`](database_UpdateBuilder.UpdateBuilder.md)

#### Overrides

[QueryBuilder](database_base.QueryBuilder.md).[constructor](database_base.QueryBuilder.md#constructor)

#### Defined in

[database/UpdateBuilder.ts:35](https://github.com/onzag/itemize/blob/73e0c39e/database/UpdateBuilder.ts#L35)

## Properties

### fromBuilder

• **fromBuilder**: [`FromBuilder`](database_FromBuilder.FromBuilder.md)

#### Defined in

[database/UpdateBuilder.ts:28](https://github.com/onzag/itemize/blob/73e0c39e/database/UpdateBuilder.ts#L28)

___

### isOnly

• `Private` **isOnly**: `boolean` = `false`

Whether it's an update only query

#### Defined in

[database/UpdateBuilder.ts:25](https://github.com/onzag/itemize/blob/73e0c39e/database/UpdateBuilder.ts#L25)

___

### returningBuilder

• **returningBuilder**: [`ReturningBuilder`](database_ReturningBuilder.ReturningBuilder.md)

#### Defined in

[database/UpdateBuilder.ts:30](https://github.com/onzag/itemize/blob/73e0c39e/database/UpdateBuilder.ts#L30)

___

### setBuilder

• **setBuilder**: [`SetBuilder`](database_SetBuilder.SetBuilder.md)

#### Defined in

[database/UpdateBuilder.ts:27](https://github.com/onzag/itemize/blob/73e0c39e/database/UpdateBuilder.ts#L27)

___

### tableAlias

• `Private` **tableAlias**: `string`

#### Defined in

[database/UpdateBuilder.ts:21](https://github.com/onzag/itemize/blob/73e0c39e/database/UpdateBuilder.ts#L21)

___

### tableName

• `Private` **tableName**: `string`

Table name in question we are updating against

#### Defined in

[database/UpdateBuilder.ts:20](https://github.com/onzag/itemize/blob/73e0c39e/database/UpdateBuilder.ts#L20)

___

### whereBuilder

• **whereBuilder**: [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

#### Defined in

[database/UpdateBuilder.ts:29](https://github.com/onzag/itemize/blob/73e0c39e/database/UpdateBuilder.ts#L29)

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

### alias

▸ **alias**(`alias`): [`UpdateBuilder`](database_UpdateBuilder.UpdateBuilder.md)

Specifies an alias for the update

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alias` | `string` | the alias in question |

#### Returns

[`UpdateBuilder`](database_UpdateBuilder.UpdateBuilder.md)

itself

#### Defined in

[database/UpdateBuilder.ts:66](https://github.com/onzag/itemize/blob/73e0c39e/database/UpdateBuilder.ts#L66)

___

### clear

▸ **clear**(): [`UpdateBuilder`](database_UpdateBuilder.UpdateBuilder.md)

Clears the table name, alias, and only state

#### Returns

[`UpdateBuilder`](database_UpdateBuilder.UpdateBuilder.md)

itself

#### Defined in

[database/UpdateBuilder.ts:84](https://github.com/onzag/itemize/blob/73e0c39e/database/UpdateBuilder.ts#L84)

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

[database/UpdateBuilder.ts:95](https://github.com/onzag/itemize/blob/73e0c39e/database/UpdateBuilder.ts#L95)

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

### makeOnly

▸ **makeOnly**(): [`UpdateBuilder`](database_UpdateBuilder.UpdateBuilder.md)

Makes the update be UPDATE ONLY

#### Returns

[`UpdateBuilder`](database_UpdateBuilder.UpdateBuilder.md)

itself

#### Defined in

[database/UpdateBuilder.ts:75](https://github.com/onzag/itemize/blob/73e0c39e/database/UpdateBuilder.ts#L75)

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

### table

▸ **table**(`tableName`): [`UpdateBuilder`](database_UpdateBuilder.UpdateBuilder.md)

Specifies the table we are updating

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tableName` | `string` | the table in question |

#### Returns

[`UpdateBuilder`](database_UpdateBuilder.UpdateBuilder.md)

itself

#### Defined in

[database/UpdateBuilder.ts:56](https://github.com/onzag/itemize/blob/73e0c39e/database/UpdateBuilder.ts#L56)

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
