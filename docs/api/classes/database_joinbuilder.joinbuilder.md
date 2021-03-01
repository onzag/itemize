[](../README.md) / [Exports](../modules.md) / [database/JoinBuilder](../modules/database_joinbuilder.md) / JoinBuilder

# Class: JoinBuilder

[database/JoinBuilder](../modules/database_joinbuilder.md).JoinBuilder

This class is the actual join builder as it represents a collection of multiple join
rules builders

## Hierarchy

* [*QueryBuilder*](database_base.querybuilder.md)

  ↳ **JoinBuilder**

## Table of contents

### Constructors

- [constructor](database_joinbuilder.joinbuilder.md#constructor)

### Properties

- [builders](database_joinbuilder.joinbuilder.md#builders)

### Methods

- [addBindingSource](database_joinbuilder.joinbuilder.md#addbindingsource)
- [addBindingSources](database_joinbuilder.joinbuilder.md#addbindingsources)
- [clear](database_joinbuilder.joinbuilder.md#clear)
- [clearBindingSources](database_joinbuilder.joinbuilder.md#clearbindingsources)
- [compile](database_joinbuilder.joinbuilder.md#compile)
- [fullJoin](database_joinbuilder.joinbuilder.md#fulljoin)
- [getBindings](database_joinbuilder.joinbuilder.md#getbindings)
- [join](database_joinbuilder.joinbuilder.md#join)
- [joinBase](database_joinbuilder.joinbuilder.md#joinbase)
- [leftJoin](database_joinbuilder.joinbuilder.md#leftjoin)
- [popBindingSource](database_joinbuilder.joinbuilder.md#popbindingsource)
- [rightJoin](database_joinbuilder.joinbuilder.md#rightjoin)
- [shiftBindingSource](database_joinbuilder.joinbuilder.md#shiftbindingsource)
- [shiftBindingSources](database_joinbuilder.joinbuilder.md#shiftbindingsources)
- [toSQL](database_joinbuilder.joinbuilder.md#tosql)

## Constructors

### constructor

\+ **new JoinBuilder**(): [*JoinBuilder*](database_joinbuilder.joinbuilder.md)

Builds a new join builder

**Returns:** [*JoinBuilder*](database_joinbuilder.joinbuilder.md)

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/JoinBuilder.ts:75](https://github.com/onzag/itemize/blob/3efa2a4a/database/JoinBuilder.ts#L75)

## Properties

### builders

• `Private` **builders**: [*JoinRuleBuilder*](database_joinbuilder.joinrulebuilder.md)[]

These are the list of all the builders that represents the join rules

Defined in: [database/JoinBuilder.ts:75](https://github.com/onzag/itemize/blob/3efa2a4a/database/JoinBuilder.ts#L75)

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

▸ **clear**(): [*JoinBuilder*](database_joinbuilder.joinbuilder.md)

Clears all the joining rules from the builder

**Returns:** [*JoinBuilder*](database_joinbuilder.joinbuilder.md)

itself

Defined in: [database/JoinBuilder.ts:149](https://github.com/onzag/itemize/blob/3efa2a4a/database/JoinBuilder.ts#L149)

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

Defined in: [database/JoinBuilder.ts:159](https://github.com/onzag/itemize/blob/3efa2a4a/database/JoinBuilder.ts#L159)

___

### fullJoin

▸ **fullJoin**(`tableName`: *string*, `fn`: JoinBuilderFn): [*JoinBuilder*](database_joinbuilder.joinbuilder.md)

Performs a full join with a table

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`tableName` | *string* | the table name   |
`fn` | JoinBuilderFn | a function to specify the join rule   |

**Returns:** [*JoinBuilder*](database_joinbuilder.joinbuilder.md)

itself

Defined in: [database/JoinBuilder.ts:139](https://github.com/onzag/itemize/blob/3efa2a4a/database/JoinBuilder.ts#L139)

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

### join

▸ **join**(`tableName`: *string*, `fn`: JoinBuilderFn): [*JoinBuilder*](database_joinbuilder.joinbuilder.md)

Performs a join with a table

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`tableName` | *string* | the table name   |
`fn` | JoinBuilderFn | a function to specify the join rule   |

**Returns:** [*JoinBuilder*](database_joinbuilder.joinbuilder.md)

itself

Defined in: [database/JoinBuilder.ts:103](https://github.com/onzag/itemize/blob/3efa2a4a/database/JoinBuilder.ts#L103)

___

### joinBase

▸ `Private`**joinBase**(`type`: *JOIN* \| *LEFT JOIN* \| *RIGHT JOIN* \| *FULL JOIN*, `tableName`: *string*): [*JoinRuleBuilder*](database_joinbuilder.joinrulebuilder.md)

Base function for joining

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`type` | *JOIN* \| *LEFT JOIN* \| *RIGHT JOIN* \| *FULL JOIN* | the type of join   |
`tableName` | *string* | the table name that we join at   |

**Returns:** [*JoinRuleBuilder*](database_joinbuilder.joinrulebuilder.md)

the new builder

Defined in: [database/JoinBuilder.ts:90](https://github.com/onzag/itemize/blob/3efa2a4a/database/JoinBuilder.ts#L90)

___

### leftJoin

▸ **leftJoin**(`tableName`: *string*, `fn`: JoinBuilderFn): [*JoinBuilder*](database_joinbuilder.joinbuilder.md)

Performs a left join with a table

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`tableName` | *string* | the table name   |
`fn` | JoinBuilderFn | a function to specify the join rule   |

**Returns:** [*JoinBuilder*](database_joinbuilder.joinbuilder.md)

itself

Defined in: [database/JoinBuilder.ts:115](https://github.com/onzag/itemize/blob/3efa2a4a/database/JoinBuilder.ts#L115)

___

### popBindingSource

▸ **popBindingSource**(): [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Removes the last added biding source and returns it

**Returns:** [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:109](https://github.com/onzag/itemize/blob/3efa2a4a/database/base.ts#L109)

___

### rightJoin

▸ **rightJoin**(`tableName`: *string*, `fn`: JoinBuilderFn): [*JoinBuilder*](database_joinbuilder.joinbuilder.md)

Performs a right join with a table

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`tableName` | *string* | the table name   |
`fn` | JoinBuilderFn | a function to specify the join rule   |

**Returns:** [*JoinBuilder*](database_joinbuilder.joinbuilder.md)

itself

Defined in: [database/JoinBuilder.ts:127](https://github.com/onzag/itemize/blob/3efa2a4a/database/JoinBuilder.ts#L127)

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
