[](../README.md) / [Exports](../modules.md) / [database/WithBuilder](../modules/database_withbuilder.md) / WithBuilder

# Class: WithBuilder

[database/WithBuilder](../modules/database_withbuilder.md).WithBuilder

The with query builder that allows to create WITH queries

## Hierarchy

* [*QueryBuilder*](database_base.querybuilder.md)

  ↳ **WithBuilder**

## Table of contents

### Constructors

- [constructor](database_withbuilder.withbuilder.md#constructor)

### Properties

- [query](database_withbuilder.withbuilder.md#query)
- [withs](database_withbuilder.withbuilder.md#withs)

### Methods

- [addBindingSource](database_withbuilder.withbuilder.md#addbindingsource)
- [addBindingSources](database_withbuilder.withbuilder.md#addbindingsources)
- [clear](database_withbuilder.withbuilder.md#clear)
- [clearBindingSources](database_withbuilder.withbuilder.md#clearbindingsources)
- [compile](database_withbuilder.withbuilder.md#compile)
- [do](database_withbuilder.withbuilder.md#do)
- [getBindings](database_withbuilder.withbuilder.md#getbindings)
- [popBindingSource](database_withbuilder.withbuilder.md#popbindingsource)
- [shiftBindingSource](database_withbuilder.withbuilder.md#shiftbindingsource)
- [shiftBindingSources](database_withbuilder.withbuilder.md#shiftbindingsources)
- [toSQL](database_withbuilder.withbuilder.md#tosql)
- [with](database_withbuilder.withbuilder.md#with)

## Constructors

### constructor

\+ **new WithBuilder**(): [*WithBuilder*](database_withbuilder.withbuilder.md)

Builds a new query builder for a WITH query

**Returns:** [*WithBuilder*](database_withbuilder.withbuilder.md)

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/WithBuilder.ts:33](https://github.com/onzag/itemize/blob/28218320/database/WithBuilder.ts#L33)

## Properties

### query

• `Private` **query**: [*QueryBuilder*](database_base.querybuilder.md)

And this is the query itself we are executing with WITH ... DO ...

Defined in: [database/WithBuilder.ts:33](https://github.com/onzag/itemize/blob/28218320/database/WithBuilder.ts#L33)

___

### withs

• `Private` **withs**: IWithRules[]

These are all the WITH ... queries we are doing

Defined in: [database/WithBuilder.ts:29](https://github.com/onzag/itemize/blob/28218320/database/WithBuilder.ts#L29)

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

Defined in: [database/base.ts:69](https://github.com/onzag/itemize/blob/28218320/database/base.ts#L69)

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

Defined in: [database/base.ts:77](https://github.com/onzag/itemize/blob/28218320/database/base.ts#L77)

___

### clear

▸ **clear**(): [*WithBuilder*](database_withbuilder.withbuilder.md)

Clears all the with selections and the query itself

**Returns:** [*WithBuilder*](database_withbuilder.withbuilder.md)

itself

Defined in: [database/WithBuilder.ts:92](https://github.com/onzag/itemize/blob/28218320/database/WithBuilder.ts#L92)

___

### clearBindingSources

▸ **clearBindingSources**(): *void*

Removes all binding sources

**Returns:** *void*

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:102](https://github.com/onzag/itemize/blob/28218320/database/base.ts#L102)

___

### compile

▸ **compile**(): *string*

Converts this from query to a pseudo SQL query that uses ?

**Returns:** *string*

a string that represents the compiled result

Overrides: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/WithBuilder.ts:82](https://github.com/onzag/itemize/blob/28218320/database/WithBuilder.ts#L82)

___

### do

▸ **do**(`query`: [*QueryBuilder*](database_base.querybuilder.md)): [*WithBuilder*](database_withbuilder.withbuilder.md)

Specifies the query that would execute

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | [*QueryBuilder*](database_base.querybuilder.md) | the query to execute   |

**Returns:** [*WithBuilder*](database_withbuilder.withbuilder.md)

itself

Defined in: [database/WithBuilder.ts:72](https://github.com/onzag/itemize/blob/28218320/database/WithBuilder.ts#L72)

___

### getBindings

▸ **getBindings**(): [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]

Provides the bindings for the query in order that
should match the compilation

**Returns:** [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]

a list of basic bindings

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:165](https://github.com/onzag/itemize/blob/28218320/database/base.ts#L165)

___

### popBindingSource

▸ **popBindingSource**(): [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Removes the last added biding source and returns it

**Returns:** [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:109](https://github.com/onzag/itemize/blob/28218320/database/base.ts#L109)

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

Defined in: [database/base.ts:86](https://github.com/onzag/itemize/blob/28218320/database/base.ts#L86)

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

Defined in: [database/base.ts:95](https://github.com/onzag/itemize/blob/28218320/database/base.ts#L95)

___

### toSQL

▸ **toSQL**(): IQueryBuilderSQLResult

Returns the SQL result for usage in the query builder

**Returns:** IQueryBuilderSQLResult

a sql builder result with the bindings and the query itself

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:126](https://github.com/onzag/itemize/blob/28218320/database/base.ts#L126)

___

### with

▸ **with**(`name`: *string*, `asWhat`: [*QueryBuilder*](database_base.querybuilder.md)): [*WithBuilder*](database_withbuilder.withbuilder.md)

Adds a new query to use with

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | the name to assign to it   |
`asWhat` | [*QueryBuilder*](database_base.querybuilder.md) | and the query itself   |

**Returns:** [*WithBuilder*](database_withbuilder.withbuilder.md)

itself

Defined in: [database/WithBuilder.ts:48](https://github.com/onzag/itemize/blob/28218320/database/WithBuilder.ts#L48)
