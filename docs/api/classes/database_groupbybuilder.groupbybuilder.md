[](../README.md) / [Exports](../modules.md) / [database/GroupByBuilder](../modules/database_groupbybuilder.md) / GroupByBuilder

# Class: GroupByBuilder

[database/GroupByBuilder](../modules/database_groupbybuilder.md).GroupByBuilder

Provides the group by builders that allows to create GROUP BY sql statments

## Hierarchy

* [*QueryBuilder*](database_base.querybuilder.md)

  ↳ **GroupByBuilder**

## Table of contents

### Constructors

- [constructor](database_groupbybuilder.groupbybuilder.md#constructor)

### Properties

- [expressions](database_groupbybuilder.groupbybuilder.md#expressions)

### Methods

- [addBindingSource](database_groupbybuilder.groupbybuilder.md#addbindingsource)
- [addBindingSources](database_groupbybuilder.groupbybuilder.md#addbindingsources)
- [addColumn](database_groupbybuilder.groupbybuilder.md#addcolumn)
- [addColumnWithTable](database_groupbybuilder.groupbybuilder.md#addcolumnwithtable)
- [addExpression](database_groupbybuilder.groupbybuilder.md#addexpression)
- [clear](database_groupbybuilder.groupbybuilder.md#clear)
- [clearBindingSources](database_groupbybuilder.groupbybuilder.md#clearbindingsources)
- [compile](database_groupbybuilder.groupbybuilder.md#compile)
- [getBindings](database_groupbybuilder.groupbybuilder.md#getbindings)
- [popBindingSource](database_groupbybuilder.groupbybuilder.md#popbindingsource)
- [shiftBindingSource](database_groupbybuilder.groupbybuilder.md#shiftbindingsource)
- [shiftBindingSources](database_groupbybuilder.groupbybuilder.md#shiftbindingsources)
- [toSQL](database_groupbybuilder.groupbybuilder.md#tosql)

## Constructors

### constructor

\+ **new GroupByBuilder**(): [*GroupByBuilder*](database_groupbybuilder.groupbybuilder.md)

**Returns:** [*GroupByBuilder*](database_groupbybuilder.groupbybuilder.md)

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/GroupByBuilder.ts:12](https://github.com/onzag/itemize/blob/0569bdf2/database/GroupByBuilder.ts#L12)

## Properties

### expressions

• `Private` **expressions**: *string*[]

Defined in: [database/GroupByBuilder.ts:12](https://github.com/onzag/itemize/blob/0569bdf2/database/GroupByBuilder.ts#L12)

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

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:77](https://github.com/onzag/itemize/blob/0569bdf2/database/base.ts#L77)

___

### addColumn

▸ **addColumn**(`column`: *string*): [*GroupByBuilder*](database_groupbybuilder.groupbybuilder.md)

Adds a column to group by

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`column` | *string* | the colum in question   |

**Returns:** [*GroupByBuilder*](database_groupbybuilder.groupbybuilder.md)

itself

Defined in: [database/GroupByBuilder.ts:22](https://github.com/onzag/itemize/blob/0569bdf2/database/GroupByBuilder.ts#L22)

___

### addColumnWithTable

▸ **addColumnWithTable**(`tableName`: *string*, `column`: *string*): [*GroupByBuilder*](database_groupbybuilder.groupbybuilder.md)

Adds a column to group by in a given table

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`tableName` | *string* | the table that holds the column   |
`column` | *string* | the column in question   |

**Returns:** [*GroupByBuilder*](database_groupbybuilder.groupbybuilder.md)

itself

Defined in: [database/GroupByBuilder.ts:32](https://github.com/onzag/itemize/blob/0569bdf2/database/GroupByBuilder.ts#L32)

___

### addExpression

▸ **addExpression**(`expression`: *string*, `bindings?`: (*string* \| *number*)[]): [*GroupByBuilder*](database_groupbybuilder.groupbybuilder.md)

Adds a expression to group by

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`expression` | *string* | the expression as a string   |
`bindings?` | (*string* \| *number*)[] | the bindings for that expression   |

**Returns:** [*GroupByBuilder*](database_groupbybuilder.groupbybuilder.md)

itself

Defined in: [database/GroupByBuilder.ts:44](https://github.com/onzag/itemize/blob/0569bdf2/database/GroupByBuilder.ts#L44)

___

### clear

▸ **clear**(): [*GroupByBuilder*](database_groupbybuilder.groupbybuilder.md)

Removes all the expressions that were used to group by

**Returns:** [*GroupByBuilder*](database_groupbybuilder.groupbybuilder.md)

itself

Defined in: [database/GroupByBuilder.ts:68](https://github.com/onzag/itemize/blob/0569bdf2/database/GroupByBuilder.ts#L68)

___

### clearBindingSources

▸ **clearBindingSources**(): *void*

Removes all binding sources

**Returns:** *void*

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:102](https://github.com/onzag/itemize/blob/0569bdf2/database/base.ts#L102)

___

### compile

▸ **compile**(): *string*

Converts this from query to a pseudo SQL query that uses ?

**Returns:** *string*

a string that represents the compiled result

Overrides: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/GroupByBuilder.ts:57](https://github.com/onzag/itemize/blob/0569bdf2/database/GroupByBuilder.ts#L57)

___

### getBindings

▸ **getBindings**(): [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]

Provides the bindings for the query in order that
should match the compilation

**Returns:** [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]

a list of basic bindings

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:165](https://github.com/onzag/itemize/blob/0569bdf2/database/base.ts#L165)

___

### popBindingSource

▸ **popBindingSource**(): [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Removes the last added biding source and returns it

**Returns:** [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Inherited from: [QueryBuilder](database_base.querybuilder.md)

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

Inherited from: [QueryBuilder](database_base.querybuilder.md)

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

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:95](https://github.com/onzag/itemize/blob/0569bdf2/database/base.ts#L95)

___

### toSQL

▸ **toSQL**(): IQueryBuilderSQLResult

Returns the SQL result for usage in the query builder

**Returns:** IQueryBuilderSQLResult

a sql builder result with the bindings and the query itself

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:126](https://github.com/onzag/itemize/blob/0569bdf2/database/base.ts#L126)
