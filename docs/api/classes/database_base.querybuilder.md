[](../README.md) / [Exports](../modules.md) / [database/base](../modules/database_base.md) / QueryBuilder

# Class: QueryBuilder

[database/base](../modules/database_base.md).QueryBuilder

Reprents the basic query builder to build a bit of a query
or the entire query itself and this class is supposed to
be extended by other builders

## Hierarchy

* **QueryBuilder**

  ↳ [*AlterTableBuilder*](database_altertablebuilder.altertablebuilder.md)

  ↳ [*CreateTableBuilder*](database_createtablebuilder.createtablebuilder.md)

  ↳ [*FromBuilder*](database_frombuilder.frombuilder.md)

  ↳ [*GroupByBuilder*](database_groupbybuilder.groupbybuilder.md)

  ↳ [*InsertBuilder*](database_insertbuilder.insertbuilder.md)

  ↳ [*JoinBuilder*](database_joinbuilder.joinbuilder.md)

  ↳ [*OrderByBuilder*](database_orderbybuilder.orderbybuilder.md)

  ↳ [*RawBuilder*](database_rawbuilder.rawbuilder.md)

  ↳ [*ReturningBuilder*](database_returningbuilder.returningbuilder.md)

  ↳ [*SelectBuilder*](database_selectbuilder.selectbuilder.md)

  ↳ [*SetBuilder*](database_setbuilder.setbuilder.md)

  ↳ [*UpdateBuilder*](database_updatebuilder.updatebuilder.md)

  ↳ [*WithBuilder*](database_withbuilder.withbuilder.md)

  ↳ [*ConditionalBuilder*](database_base.conditionalbuilder.md)

## Table of contents

### Constructors

- [constructor](database_base.querybuilder.md#constructor)

### Properties

- [bindingSources](database_base.querybuilder.md#bindingsources)

### Methods

- [addBindingSource](database_base.querybuilder.md#addbindingsource)
- [addBindingSources](database_base.querybuilder.md#addbindingsources)
- [clearBindingSources](database_base.querybuilder.md#clearbindingsources)
- [compile](database_base.querybuilder.md#compile)
- [getBindings](database_base.querybuilder.md#getbindings)
- [popBindingSource](database_base.querybuilder.md#popbindingsource)
- [shiftBindingSource](database_base.querybuilder.md#shiftbindingsource)
- [shiftBindingSources](database_base.querybuilder.md#shiftbindingsources)
- [toSQL](database_base.querybuilder.md#tosql)

## Constructors

### constructor

\+ **new QueryBuilder**(): [*QueryBuilder*](database_base.querybuilder.md)

Constructs a new query

**Returns:** [*QueryBuilder*](database_base.querybuilder.md)

Defined in: [database/base.ts:57](https://github.com/onzag/itemize/blob/0569bdf2/database/base.ts#L57)

## Properties

### bindingSources

• `Private` **bindingSources**: [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)[]

These are all the bindings that are used by the query builder
in order

Defined in: [database/base.ts:57](https://github.com/onzag/itemize/blob/0569bdf2/database/base.ts#L57)

## Methods

### addBindingSource

▸ **addBindingSource**(`value`: [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)): *void*

Adds a binding source to the binding source list in order

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`value` | [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype) | the binding source to add    |

**Returns:** *void*

Defined in: [database/base.ts:69](https://github.com/onzag/itemize/blob/0569bdf2/database/base.ts#L69)

___

### addBindingSources

▸ **addBindingSources**(`values`: [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)[]): *void*

Adds many binding sources to the bindings sources list

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`values` | [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)[] | the binding sources to add    |

**Returns:** *void*

Defined in: [database/base.ts:77](https://github.com/onzag/itemize/blob/0569bdf2/database/base.ts#L77)

___

### clearBindingSources

▸ **clearBindingSources**(): *void*

Removes all binding sources

**Returns:** *void*

Defined in: [database/base.ts:102](https://github.com/onzag/itemize/blob/0569bdf2/database/base.ts#L102)

___

### compile

▸ **compile**(): *string*

Returns the result of the compilation of the query
this function needs to be overriden

**`override`** 

**Returns:** *string*

Defined in: [database/base.ts:118](https://github.com/onzag/itemize/blob/0569bdf2/database/base.ts#L118)

___

### getBindings

▸ **getBindings**(): [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]

Provides the bindings for the query in order that
should match the compilation

**Returns:** [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]

a list of basic bindings

Defined in: [database/base.ts:165](https://github.com/onzag/itemize/blob/0569bdf2/database/base.ts#L165)

___

### popBindingSource

▸ **popBindingSource**(): [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Removes the last added biding source and returns it

**Returns:** [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Defined in: [database/base.ts:109](https://github.com/onzag/itemize/blob/0569bdf2/database/base.ts#L109)

___

### shiftBindingSource

▸ **shiftBindingSource**(`value`: [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)): *void*

Adds a binding source at the start of the bindings source
list

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`value` | [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype) | the binding source to add    |

**Returns:** *void*

Defined in: [database/base.ts:86](https://github.com/onzag/itemize/blob/0569bdf2/database/base.ts#L86)

___

### shiftBindingSources

▸ **shiftBindingSources**(`values`: [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)[]): *void*

Adds many binding sources at the start of the bindings source
list

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`values` | [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)[] | the binding sources to add    |

**Returns:** *void*

Defined in: [database/base.ts:95](https://github.com/onzag/itemize/blob/0569bdf2/database/base.ts#L95)

___

### toSQL

▸ **toSQL**(): IQueryBuilderSQLResult

Returns the SQL result for usage in the query builder

**Returns:** IQueryBuilderSQLResult

a sql builder result with the bindings and the query itself

Defined in: [database/base.ts:126](https://github.com/onzag/itemize/blob/0569bdf2/database/base.ts#L126)
