[](../README.md) / [Exports](../modules.md) / [database/ReturningBuilder](../modules/database_returningbuilder.md) / ReturningBuilder

# Class: ReturningBuilder

[database/ReturningBuilder](../modules/database_returningbuilder.md).ReturningBuilder

The returning builder that allows to create RETURNING statments

## Hierarchy

* [*QueryBuilder*](database_base.querybuilder.md)

  ↳ **ReturningBuilder**

## Table of contents

### Constructors

- [constructor](database_returningbuilder.returningbuilder.md#constructor)

### Properties

- [expressions](database_returningbuilder.returningbuilder.md#expressions)

### Methods

- [addBindingSource](database_returningbuilder.returningbuilder.md#addbindingsource)
- [addBindingSources](database_returningbuilder.returningbuilder.md#addbindingsources)
- [clear](database_returningbuilder.returningbuilder.md#clear)
- [clearBindingSources](database_returningbuilder.returningbuilder.md#clearbindingsources)
- [compile](database_returningbuilder.returningbuilder.md#compile)
- [getBindings](database_returningbuilder.returningbuilder.md#getbindings)
- [popBindingSource](database_returningbuilder.returningbuilder.md#popbindingsource)
- [returning](database_returningbuilder.returningbuilder.md#returning)
- [returningAll](database_returningbuilder.returningbuilder.md#returningall)
- [returningColumn](database_returningbuilder.returningbuilder.md#returningcolumn)
- [returningColumnInTable](database_returningbuilder.returningbuilder.md#returningcolumnintable)
- [shiftBindingSource](database_returningbuilder.returningbuilder.md#shiftbindingsource)
- [shiftBindingSources](database_returningbuilder.returningbuilder.md#shiftbindingsources)
- [toSQL](database_returningbuilder.returningbuilder.md#tosql)

## Constructors

### constructor

\+ **new ReturningBuilder**(): [*ReturningBuilder*](database_returningbuilder.returningbuilder.md)

Builds a new SQL RETURNING statment

**Returns:** [*ReturningBuilder*](database_returningbuilder.returningbuilder.md)

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/ReturningBuilder.ts:15](https://github.com/onzag/itemize/blob/3efa2a4a/database/ReturningBuilder.ts#L15)

## Properties

### expressions

• `Private` **expressions**: *string*[]

the expressions that we are returning

Defined in: [database/ReturningBuilder.ts:15](https://github.com/onzag/itemize/blob/3efa2a4a/database/ReturningBuilder.ts#L15)

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

Defined in: [database/base.ts:69](https://github.com/onzag/itemize/blob/3efa2a4a/database/base.ts#L69)

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

Defined in: [database/base.ts:77](https://github.com/onzag/itemize/blob/3efa2a4a/database/base.ts#L77)

___

### clear

▸ **clear**(): [*ReturningBuilder*](database_returningbuilder.returningbuilder.md)

Clears the expressions that we are returning

**Returns:** [*ReturningBuilder*](database_returningbuilder.returningbuilder.md)

itself

Defined in: [database/ReturningBuilder.ts:85](https://github.com/onzag/itemize/blob/3efa2a4a/database/ReturningBuilder.ts#L85)

___

### clearBindingSources

▸ **clearBindingSources**(): *void*

Removes all binding sources

**Returns:** *void*

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:102](https://github.com/onzag/itemize/blob/3efa2a4a/database/base.ts#L102)

___

### compile

▸ **compile**(): *string*

Converts this from query to a pseudo SQL query that uses ?

**Returns:** *string*

a string that represents the compiled result

Overrides: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/ReturningBuilder.ts:74](https://github.com/onzag/itemize/blob/3efa2a4a/database/ReturningBuilder.ts#L74)

___

### getBindings

▸ **getBindings**(): [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]

Provides the bindings for the query in order that
should match the compilation

**Returns:** [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]

a list of basic bindings

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:165](https://github.com/onzag/itemize/blob/3efa2a4a/database/base.ts#L165)

___

### popBindingSource

▸ **popBindingSource**(): [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Removes the last added biding source and returns it

**Returns:** [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:109](https://github.com/onzag/itemize/blob/3efa2a4a/database/base.ts#L109)

___

### returning

▸ **returning**(`expression`: *string*, `bindings?`: (*string* \| *number*)[]): [*ReturningBuilder*](database_returningbuilder.returningbuilder.md)

Returning an expression

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`expression` | *string* | the expression to return   |
`bindings?` | (*string* \| *number*)[] | the bindings for that expression   |

**Returns:** [*ReturningBuilder*](database_returningbuilder.returningbuilder.md)

itself

Defined in: [database/ReturningBuilder.ts:60](https://github.com/onzag/itemize/blob/3efa2a4a/database/ReturningBuilder.ts#L60)

___

### returningAll

▸ **returningAll**(`tableName?`: *string*): [*ReturningBuilder*](database_returningbuilder.returningbuilder.md)

a shorthand for RETURNING *

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`tableName?` | *string* | an optional table name   |

**Returns:** [*ReturningBuilder*](database_returningbuilder.returningbuilder.md)

itself

Defined in: [database/ReturningBuilder.ts:29](https://github.com/onzag/itemize/blob/3efa2a4a/database/ReturningBuilder.ts#L29)

___

### returningColumn

▸ **returningColumn**(`column`: *string*): [*ReturningBuilder*](database_returningbuilder.returningbuilder.md)

Returning a specific column

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`column` | *string* | the column to return   |

**Returns:** [*ReturningBuilder*](database_returningbuilder.returningbuilder.md)

itself

Defined in: [database/ReturningBuilder.ts:41](https://github.com/onzag/itemize/blob/3efa2a4a/database/ReturningBuilder.ts#L41)

___

### returningColumnInTable

▸ **returningColumnInTable**(`tableName`: *string*, `column`: *string*): [*ReturningBuilder*](database_returningbuilder.returningbuilder.md)

Returning a specific column in a table

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`tableName` | *string* | - |
`column` | *string* | the column to return   |

**Returns:** [*ReturningBuilder*](database_returningbuilder.returningbuilder.md)

itself

Defined in: [database/ReturningBuilder.ts:50](https://github.com/onzag/itemize/blob/3efa2a4a/database/ReturningBuilder.ts#L50)

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

Defined in: [database/base.ts:86](https://github.com/onzag/itemize/blob/3efa2a4a/database/base.ts#L86)

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

Defined in: [database/base.ts:95](https://github.com/onzag/itemize/blob/3efa2a4a/database/base.ts#L95)

___

### toSQL

▸ **toSQL**(): IQueryBuilderSQLResult

Returns the SQL result for usage in the query builder

**Returns:** IQueryBuilderSQLResult

a sql builder result with the bindings and the query itself

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:126](https://github.com/onzag/itemize/blob/3efa2a4a/database/base.ts#L126)
