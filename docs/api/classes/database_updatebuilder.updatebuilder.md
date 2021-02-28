[](../README.md) / [Exports](../modules.md) / [database/UpdateBuilder](../modules/database_updatebuilder.md) / UpdateBuilder

# Class: UpdateBuilder

[database/UpdateBuilder](../modules/database_updatebuilder.md).UpdateBuilder

## Hierarchy

* [*QueryBuilder*](database_base.querybuilder.md)

  ↳ **UpdateBuilder**

## Table of contents

### Constructors

- [constructor](database_updatebuilder.updatebuilder.md#constructor)

### Properties

- [fromBuilder](database_updatebuilder.updatebuilder.md#frombuilder)
- [isOnly](database_updatebuilder.updatebuilder.md#isonly)
- [returningBuilder](database_updatebuilder.updatebuilder.md#returningbuilder)
- [setBuilder](database_updatebuilder.updatebuilder.md#setbuilder)
- [tableAlias](database_updatebuilder.updatebuilder.md#tablealias)
- [tableName](database_updatebuilder.updatebuilder.md#tablename)
- [whereBuilder](database_updatebuilder.updatebuilder.md#wherebuilder)

### Methods

- [addBindingSource](database_updatebuilder.updatebuilder.md#addbindingsource)
- [addBindingSources](database_updatebuilder.updatebuilder.md#addbindingsources)
- [alias](database_updatebuilder.updatebuilder.md#alias)
- [clear](database_updatebuilder.updatebuilder.md#clear)
- [clearBindingSources](database_updatebuilder.updatebuilder.md#clearbindingsources)
- [compile](database_updatebuilder.updatebuilder.md#compile)
- [getBindings](database_updatebuilder.updatebuilder.md#getbindings)
- [makeOnly](database_updatebuilder.updatebuilder.md#makeonly)
- [popBindingSource](database_updatebuilder.updatebuilder.md#popbindingsource)
- [shiftBindingSource](database_updatebuilder.updatebuilder.md#shiftbindingsource)
- [shiftBindingSources](database_updatebuilder.updatebuilder.md#shiftbindingsources)
- [table](database_updatebuilder.updatebuilder.md#table)
- [toSQL](database_updatebuilder.updatebuilder.md#tosql)

## Constructors

### constructor

\+ **new UpdateBuilder**(): [*UpdateBuilder*](database_updatebuilder.updatebuilder.md)

Builds a new update query builder

**Returns:** [*UpdateBuilder*](database_updatebuilder.updatebuilder.md)

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/UpdateBuilder.ts:30](https://github.com/onzag/itemize/blob/11a98dec/database/UpdateBuilder.ts#L30)

## Properties

### fromBuilder

• **fromBuilder**: [*FromBuilder*](database_frombuilder.frombuilder.md)

Defined in: [database/UpdateBuilder.ts:28](https://github.com/onzag/itemize/blob/11a98dec/database/UpdateBuilder.ts#L28)

___

### isOnly

• `Private` **isOnly**: *boolean*= false

Whether it's an update only query

Defined in: [database/UpdateBuilder.ts:25](https://github.com/onzag/itemize/blob/11a98dec/database/UpdateBuilder.ts#L25)

___

### returningBuilder

• **returningBuilder**: [*ReturningBuilder*](database_returningbuilder.returningbuilder.md)

Defined in: [database/UpdateBuilder.ts:30](https://github.com/onzag/itemize/blob/11a98dec/database/UpdateBuilder.ts#L30)

___

### setBuilder

• **setBuilder**: [*SetBuilder*](database_setbuilder.setbuilder.md)

Defined in: [database/UpdateBuilder.ts:27](https://github.com/onzag/itemize/blob/11a98dec/database/UpdateBuilder.ts#L27)

___

### tableAlias

• `Private` **tableAlias**: *string*

Defined in: [database/UpdateBuilder.ts:21](https://github.com/onzag/itemize/blob/11a98dec/database/UpdateBuilder.ts#L21)

___

### tableName

• `Private` **tableName**: *string*

Table name in question we are updating against

Defined in: [database/UpdateBuilder.ts:20](https://github.com/onzag/itemize/blob/11a98dec/database/UpdateBuilder.ts#L20)

___

### whereBuilder

• **whereBuilder**: [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

Defined in: [database/UpdateBuilder.ts:29](https://github.com/onzag/itemize/blob/11a98dec/database/UpdateBuilder.ts#L29)

## Methods

### addBindingSource

▸ **addBindingSource**(`value`: [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)): *void*

Adds a binding source to the binding source list in order

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`value` | [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype) | the binding source to add    |

**Returns:** *void*

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:69](https://github.com/onzag/itemize/blob/11a98dec/database/base.ts#L69)

___

### addBindingSources

▸ **addBindingSources**(`values`: [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)[]): *void*

Adds many binding sources to the bindings sources list

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`values` | [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)[] | the binding sources to add    |

**Returns:** *void*

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:77](https://github.com/onzag/itemize/blob/11a98dec/database/base.ts#L77)

___

### alias

▸ **alias**(`alias`: *string*): [*UpdateBuilder*](database_updatebuilder.updatebuilder.md)

Specifies an alias for the update

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`alias` | *string* | the alias in question   |

**Returns:** [*UpdateBuilder*](database_updatebuilder.updatebuilder.md)

itself

Defined in: [database/UpdateBuilder.ts:66](https://github.com/onzag/itemize/blob/11a98dec/database/UpdateBuilder.ts#L66)

___

### clear

▸ **clear**(): [*UpdateBuilder*](database_updatebuilder.updatebuilder.md)

Clears the table name, alias, and only state

**Returns:** [*UpdateBuilder*](database_updatebuilder.updatebuilder.md)

itself

Defined in: [database/UpdateBuilder.ts:84](https://github.com/onzag/itemize/blob/11a98dec/database/UpdateBuilder.ts#L84)

___

### clearBindingSources

▸ **clearBindingSources**(): *void*

Removes all binding sources

**Returns:** *void*

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:102](https://github.com/onzag/itemize/blob/11a98dec/database/base.ts#L102)

___

### compile

▸ **compile**(): *string*

Converts this from query to a pseudo SQL query that uses ?

**Returns:** *string*

a string that represents the compiled result

Overrides: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/UpdateBuilder.ts:95](https://github.com/onzag/itemize/blob/11a98dec/database/UpdateBuilder.ts#L95)

___

### getBindings

▸ **getBindings**(): [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]

Provides the bindings for the query in order that
should match the compilation

**Returns:** [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]

a list of basic bindings

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:165](https://github.com/onzag/itemize/blob/11a98dec/database/base.ts#L165)

___

### makeOnly

▸ **makeOnly**(): [*UpdateBuilder*](database_updatebuilder.updatebuilder.md)

Makes the update be UPDATE ONLY

**Returns:** [*UpdateBuilder*](database_updatebuilder.updatebuilder.md)

itself

Defined in: [database/UpdateBuilder.ts:75](https://github.com/onzag/itemize/blob/11a98dec/database/UpdateBuilder.ts#L75)

___

### popBindingSource

▸ **popBindingSource**(): [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Removes the last added biding source and returns it

**Returns:** [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:109](https://github.com/onzag/itemize/blob/11a98dec/database/base.ts#L109)

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

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:86](https://github.com/onzag/itemize/blob/11a98dec/database/base.ts#L86)

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

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:95](https://github.com/onzag/itemize/blob/11a98dec/database/base.ts#L95)

___

### table

▸ **table**(`tableName`: *string*): [*UpdateBuilder*](database_updatebuilder.updatebuilder.md)

Specifies the table we are updating

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`tableName` | *string* | the table in question   |

**Returns:** [*UpdateBuilder*](database_updatebuilder.updatebuilder.md)

itself

Defined in: [database/UpdateBuilder.ts:56](https://github.com/onzag/itemize/blob/11a98dec/database/UpdateBuilder.ts#L56)

___

### toSQL

▸ **toSQL**(): IQueryBuilderSQLResult

Returns the SQL result for usage in the query builder

**Returns:** IQueryBuilderSQLResult

a sql builder result with the bindings and the query itself

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:126](https://github.com/onzag/itemize/blob/11a98dec/database/base.ts#L126)
