[](../README.md) / [Exports](../modules.md) / [database/SelectBuilder](../modules/database_selectbuilder.md) / SelectBuilder

# Class: SelectBuilder

[database/SelectBuilder](../modules/database_selectbuilder.md).SelectBuilder

The select query builder that allows to create SELECT queries

## Hierarchy

* [*QueryBuilder*](database_base.querybuilder.md)

  ↳ **SelectBuilder**

## Table of contents

### Constructors

- [constructor](database_selectbuilder.selectbuilder.md#constructor)

### Properties

- [fromBuilder](database_selectbuilder.selectbuilder.md#frombuilder)
- [groupByBuilder](database_selectbuilder.selectbuilder.md#groupbybuilder)
- [havingBuilder](database_selectbuilder.selectbuilder.md#havingbuilder)
- [ilimit](database_selectbuilder.selectbuilder.md#ilimit)
- [ioffset](database_selectbuilder.selectbuilder.md#ioffset)
- [joinBuilder](database_selectbuilder.selectbuilder.md#joinbuilder)
- [orderByBuilder](database_selectbuilder.selectbuilder.md#orderbybuilder)
- [selectedExpressions](database_selectbuilder.selectbuilder.md#selectedexpressions)
- [whereBuilder](database_selectbuilder.selectbuilder.md#wherebuilder)

### Methods

- [addBindingSource](database_selectbuilder.selectbuilder.md#addbindingsource)
- [addBindingSources](database_selectbuilder.selectbuilder.md#addbindingsources)
- [clear](database_selectbuilder.selectbuilder.md#clear)
- [clearBindingSources](database_selectbuilder.selectbuilder.md#clearbindingsources)
- [clearSelect](database_selectbuilder.selectbuilder.md#clearselect)
- [compile](database_selectbuilder.selectbuilder.md#compile)
- [getBindings](database_selectbuilder.selectbuilder.md#getbindings)
- [limit](database_selectbuilder.selectbuilder.md#limit)
- [offset](database_selectbuilder.selectbuilder.md#offset)
- [popBindingSource](database_selectbuilder.selectbuilder.md#popbindingsource)
- [select](database_selectbuilder.selectbuilder.md#select)
- [selectAll](database_selectbuilder.selectbuilder.md#selectall)
- [selectColumnFromTable](database_selectbuilder.selectbuilder.md#selectcolumnfromtable)
- [selectExpression](database_selectbuilder.selectbuilder.md#selectexpression)
- [shiftBindingSource](database_selectbuilder.selectbuilder.md#shiftbindingsource)
- [shiftBindingSources](database_selectbuilder.selectbuilder.md#shiftbindingsources)
- [toSQL](database_selectbuilder.selectbuilder.md#tosql)

## Constructors

### constructor

\+ **new SelectBuilder**(): [*SelectBuilder*](database_selectbuilder.selectbuilder.md)

Builds a new select query builder

**Returns:** [*SelectBuilder*](database_selectbuilder.selectbuilder.md)

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/SelectBuilder.ts:31](https://github.com/onzag/itemize/blob/55e63f2c/database/SelectBuilder.ts#L31)

## Properties

### fromBuilder

• **fromBuilder**: [*FromBuilder*](database_frombuilder.frombuilder.md)

Defined in: [database/SelectBuilder.ts:23](https://github.com/onzag/itemize/blob/55e63f2c/database/SelectBuilder.ts#L23)

___

### groupByBuilder

• **groupByBuilder**: [*GroupByBuilder*](database_groupbybuilder.groupbybuilder.md)

Defined in: [database/SelectBuilder.ts:26](https://github.com/onzag/itemize/blob/55e63f2c/database/SelectBuilder.ts#L26)

___

### havingBuilder

• **havingBuilder**: [*HavingBuilder*](database_havingbuilder.havingbuilder.md)

Defined in: [database/SelectBuilder.ts:27](https://github.com/onzag/itemize/blob/55e63f2c/database/SelectBuilder.ts#L27)

___

### ilimit

• `Private` **ilimit**: *number*

Defined in: [database/SelectBuilder.ts:30](https://github.com/onzag/itemize/blob/55e63f2c/database/SelectBuilder.ts#L30)

___

### ioffset

• `Private` **ioffset**: *number*

Defined in: [database/SelectBuilder.ts:31](https://github.com/onzag/itemize/blob/55e63f2c/database/SelectBuilder.ts#L31)

___

### joinBuilder

• **joinBuilder**: [*JoinBuilder*](database_joinbuilder.joinbuilder.md)

Defined in: [database/SelectBuilder.ts:24](https://github.com/onzag/itemize/blob/55e63f2c/database/SelectBuilder.ts#L24)

___

### orderByBuilder

• **orderByBuilder**: [*OrderByBuilder*](database_orderbybuilder.orderbybuilder.md)

Defined in: [database/SelectBuilder.ts:28](https://github.com/onzag/itemize/blob/55e63f2c/database/SelectBuilder.ts#L28)

___

### selectedExpressions

• `Private` **selectedExpressions**: *string*[]

The expressions that we are selecting

Defined in: [database/SelectBuilder.ts:21](https://github.com/onzag/itemize/blob/55e63f2c/database/SelectBuilder.ts#L21)

___

### whereBuilder

• **whereBuilder**: [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

Defined in: [database/SelectBuilder.ts:25](https://github.com/onzag/itemize/blob/55e63f2c/database/SelectBuilder.ts#L25)

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

Defined in: [database/base.ts:69](https://github.com/onzag/itemize/blob/55e63f2c/database/base.ts#L69)

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

Defined in: [database/base.ts:77](https://github.com/onzag/itemize/blob/55e63f2c/database/base.ts#L77)

___

### clear

▸ **clear**(): [*SelectBuilder*](database_selectbuilder.selectbuilder.md)

Clears the seleted expressions, limit and offset but does not affect the builders

**Returns:** [*SelectBuilder*](database_selectbuilder.selectbuilder.md)

itself

Defined in: [database/SelectBuilder.ts:122](https://github.com/onzag/itemize/blob/55e63f2c/database/SelectBuilder.ts#L122)

___

### clearBindingSources

▸ **clearBindingSources**(): *void*

Removes all binding sources

**Returns:** *void*

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:102](https://github.com/onzag/itemize/blob/55e63f2c/database/base.ts#L102)

___

### clearSelect

▸ **clearSelect**(): [*SelectBuilder*](database_selectbuilder.selectbuilder.md)

Clears the seleted expressions but does not affect the builders
nor the limit or offset

**Returns:** [*SelectBuilder*](database_selectbuilder.selectbuilder.md)

itself

Defined in: [database/SelectBuilder.ts:104](https://github.com/onzag/itemize/blob/55e63f2c/database/SelectBuilder.ts#L104)

___

### compile

▸ **compile**(): *string*

Converts this from query to a pseudo SQL query that uses ?

**Returns:** *string*

a string that represents the compiled result

Overrides: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/SelectBuilder.ts:161](https://github.com/onzag/itemize/blob/55e63f2c/database/SelectBuilder.ts#L161)

___

### getBindings

▸ **getBindings**(): [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]

Provides the bindings for the query in order that
should match the compilation

**Returns:** [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]

a list of basic bindings

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:165](https://github.com/onzag/itemize/blob/55e63f2c/database/base.ts#L165)

___

### limit

▸ **limit**(`n`: *number*): [*SelectBuilder*](database_selectbuilder.selectbuilder.md)

Sets the limit

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`n` | *number* | the limit   |

**Returns:** [*SelectBuilder*](database_selectbuilder.selectbuilder.md)

itself

Defined in: [database/SelectBuilder.ts:134](https://github.com/onzag/itemize/blob/55e63f2c/database/SelectBuilder.ts#L134)

___

### offset

▸ **offset**(`n`: *number*): [*SelectBuilder*](database_selectbuilder.selectbuilder.md)

Sets the offset

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`n` | *number* | the offset   |

**Returns:** [*SelectBuilder*](database_selectbuilder.selectbuilder.md)

itself

Defined in: [database/SelectBuilder.ts:148](https://github.com/onzag/itemize/blob/55e63f2c/database/SelectBuilder.ts#L148)

___

### popBindingSource

▸ **popBindingSource**(): [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Removes the last added biding source and returns it

**Returns:** [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:109](https://github.com/onzag/itemize/blob/55e63f2c/database/base.ts#L109)

___

### select

▸ **select**(...`columns`: *string*[]): [*SelectBuilder*](database_selectbuilder.selectbuilder.md)

Allows to select many columns

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`...columns` | *string*[] | the columns to select   |

**Returns:** [*SelectBuilder*](database_selectbuilder.selectbuilder.md)

itself

Defined in: [database/SelectBuilder.ts:65](https://github.com/onzag/itemize/blob/55e63f2c/database/SelectBuilder.ts#L65)

___

### selectAll

▸ **selectAll**(`tableName?`: *string*): [*SelectBuilder*](database_selectbuilder.selectbuilder.md)

Allows to select all

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`tableName?` | *string* | an optional table name   |

**Returns:** [*SelectBuilder*](database_selectbuilder.selectbuilder.md)

itself

Defined in: [database/SelectBuilder.ts:54](https://github.com/onzag/itemize/blob/55e63f2c/database/SelectBuilder.ts#L54)

___

### selectColumnFromTable

▸ **selectColumnFromTable**(`tableName`: *string*, `column`: *string*): [*SelectBuilder*](database_selectbuilder.selectbuilder.md)

Allows to select based on a column in a table

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`tableName` | *string* | the table in question   |
`column` | *string* | the column   |

**Returns:** [*SelectBuilder*](database_selectbuilder.selectbuilder.md)

itself

Defined in: [database/SelectBuilder.ts:78](https://github.com/onzag/itemize/blob/55e63f2c/database/SelectBuilder.ts#L78)

___

### selectExpression

▸ **selectExpression**(`expression`: *string*, `bindings?`: [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]): [*SelectBuilder*](database_selectbuilder.selectbuilder.md)

Allows to select based on an expression

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`expression` | *string* | the expression in question   |
`bindings?` | [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[] | the bindings for that expression   |

**Returns:** [*SelectBuilder*](database_selectbuilder.selectbuilder.md)

itself

Defined in: [database/SelectBuilder.ts:90](https://github.com/onzag/itemize/blob/55e63f2c/database/SelectBuilder.ts#L90)

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

Defined in: [database/base.ts:86](https://github.com/onzag/itemize/blob/55e63f2c/database/base.ts#L86)

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

Defined in: [database/base.ts:95](https://github.com/onzag/itemize/blob/55e63f2c/database/base.ts#L95)

___

### toSQL

▸ **toSQL**(): IQueryBuilderSQLResult

Returns the SQL result for usage in the query builder

**Returns:** IQueryBuilderSQLResult

a sql builder result with the bindings and the query itself

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:126](https://github.com/onzag/itemize/blob/55e63f2c/database/base.ts#L126)
