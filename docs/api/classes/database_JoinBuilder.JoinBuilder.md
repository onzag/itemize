[@onzag/itemize](../README.md) / [Modules](../modules.md) / [database/JoinBuilder](../modules/database_JoinBuilder.md) / JoinBuilder

# Class: JoinBuilder

[database/JoinBuilder](../modules/database_JoinBuilder.md).JoinBuilder

This class is the actual join builder as it represents a collection of multiple join
rules builders

## Hierarchy

- [`QueryBuilder`](database_base.QueryBuilder.md)

  ↳ **`JoinBuilder`**

## Table of contents

### Constructors

- [constructor](database_JoinBuilder.JoinBuilder.md#constructor)

### Properties

- [builders](database_JoinBuilder.JoinBuilder.md#builders)

### Methods

- [addBindingSource](database_JoinBuilder.JoinBuilder.md#addbindingsource)
- [addBindingSources](database_JoinBuilder.JoinBuilder.md#addbindingsources)
- [clear](database_JoinBuilder.JoinBuilder.md#clear)
- [clearBindingSources](database_JoinBuilder.JoinBuilder.md#clearbindingsources)
- [compile](database_JoinBuilder.JoinBuilder.md#compile)
- [fullJoin](database_JoinBuilder.JoinBuilder.md#fulljoin)
- [getBindings](database_JoinBuilder.JoinBuilder.md#getbindings)
- [join](database_JoinBuilder.JoinBuilder.md#join)
- [joinBase](database_JoinBuilder.JoinBuilder.md#joinbase)
- [leftJoin](database_JoinBuilder.JoinBuilder.md#leftjoin)
- [popBindingSource](database_JoinBuilder.JoinBuilder.md#popbindingsource)
- [rightJoin](database_JoinBuilder.JoinBuilder.md#rightjoin)
- [shiftBindingSource](database_JoinBuilder.JoinBuilder.md#shiftbindingsource)
- [shiftBindingSources](database_JoinBuilder.JoinBuilder.md#shiftbindingsources)
- [toSQL](database_JoinBuilder.JoinBuilder.md#tosql)

## Constructors

### constructor

• **new JoinBuilder**(): [`JoinBuilder`](database_JoinBuilder.JoinBuilder.md)

Builds a new join builder

#### Returns

[`JoinBuilder`](database_JoinBuilder.JoinBuilder.md)

#### Overrides

[QueryBuilder](database_base.QueryBuilder.md).[constructor](database_base.QueryBuilder.md#constructor)

#### Defined in

[database/JoinBuilder.ts:80](https://github.com/onzag/itemize/blob/73e0c39e/database/JoinBuilder.ts#L80)

## Properties

### builders

• `Private` **builders**: [`JoinRuleBuilder`](database_JoinBuilder.JoinRuleBuilder.md)[] = `[]`

These are the list of all the builders that represents the join rules

#### Defined in

[database/JoinBuilder.ts:75](https://github.com/onzag/itemize/blob/73e0c39e/database/JoinBuilder.ts#L75)

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

### clear

▸ **clear**(): [`JoinBuilder`](database_JoinBuilder.JoinBuilder.md)

Clears all the joining rules from the builder

#### Returns

[`JoinBuilder`](database_JoinBuilder.JoinBuilder.md)

itself

#### Defined in

[database/JoinBuilder.ts:149](https://github.com/onzag/itemize/blob/73e0c39e/database/JoinBuilder.ts#L149)

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

[database/JoinBuilder.ts:159](https://github.com/onzag/itemize/blob/73e0c39e/database/JoinBuilder.ts#L159)

___

### fullJoin

▸ **fullJoin**(`tableName`, `fn`): [`JoinBuilder`](database_JoinBuilder.JoinBuilder.md)

Performs a full join with a table

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tableName` | `string` | the table name |
| `fn` | `JoinBuilderFn` | a function to specify the join rule |

#### Returns

[`JoinBuilder`](database_JoinBuilder.JoinBuilder.md)

itself

#### Defined in

[database/JoinBuilder.ts:139](https://github.com/onzag/itemize/blob/73e0c39e/database/JoinBuilder.ts#L139)

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

### join

▸ **join**(`tableName`, `fn`): [`JoinBuilder`](database_JoinBuilder.JoinBuilder.md)

Performs a join with a table

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tableName` | `string` | the table name |
| `fn` | `JoinBuilderFn` | a function to specify the join rule |

#### Returns

[`JoinBuilder`](database_JoinBuilder.JoinBuilder.md)

itself

#### Defined in

[database/JoinBuilder.ts:103](https://github.com/onzag/itemize/blob/73e0c39e/database/JoinBuilder.ts#L103)

___

### joinBase

▸ **joinBase**(`type`, `tableName`): [`JoinRuleBuilder`](database_JoinBuilder.JoinRuleBuilder.md)

Base function for joining

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | ``"JOIN"`` \| ``"LEFT JOIN"`` \| ``"RIGHT JOIN"`` \| ``"FULL JOIN"`` | the type of join |
| `tableName` | `string` | the table name that we join at |

#### Returns

[`JoinRuleBuilder`](database_JoinBuilder.JoinRuleBuilder.md)

the new builder

#### Defined in

[database/JoinBuilder.ts:90](https://github.com/onzag/itemize/blob/73e0c39e/database/JoinBuilder.ts#L90)

___

### leftJoin

▸ **leftJoin**(`tableName`, `fn`): [`JoinBuilder`](database_JoinBuilder.JoinBuilder.md)

Performs a left join with a table

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tableName` | `string` | the table name |
| `fn` | `JoinBuilderFn` | a function to specify the join rule |

#### Returns

[`JoinBuilder`](database_JoinBuilder.JoinBuilder.md)

itself

#### Defined in

[database/JoinBuilder.ts:115](https://github.com/onzag/itemize/blob/73e0c39e/database/JoinBuilder.ts#L115)

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

### rightJoin

▸ **rightJoin**(`tableName`, `fn`): [`JoinBuilder`](database_JoinBuilder.JoinBuilder.md)

Performs a right join with a table

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tableName` | `string` | the table name |
| `fn` | `JoinBuilderFn` | a function to specify the join rule |

#### Returns

[`JoinBuilder`](database_JoinBuilder.JoinBuilder.md)

itself

#### Defined in

[database/JoinBuilder.ts:127](https://github.com/onzag/itemize/blob/73e0c39e/database/JoinBuilder.ts#L127)

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
