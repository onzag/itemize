[](../README.md) / [Exports](../modules.md) / [database/AlterTableBuilder](../modules/database_altertablebuilder.md) / AlterTableBuilder

# Class: AlterTableBuilder

[database/AlterTableBuilder](../modules/database_altertablebuilder.md).AlterTableBuilder

## Hierarchy

* [*QueryBuilder*](database_base.querybuilder.md)

  ↳ **AlterTableBuilder**

## Table of contents

### Constructors

- [constructor](database_altertablebuilder.altertablebuilder.md#constructor)

### Properties

- [action](database_altertablebuilder.altertablebuilder.md#action)
- [columnRule](database_altertablebuilder.altertablebuilder.md#columnrule)
- [tableName](database_altertablebuilder.altertablebuilder.md#tablename)

### Methods

- [addBindingSource](database_altertablebuilder.altertablebuilder.md#addbindingsource)
- [addBindingSources](database_altertablebuilder.altertablebuilder.md#addbindingsources)
- [affectColumn](database_altertablebuilder.altertablebuilder.md#affectcolumn)
- [clear](database_altertablebuilder.altertablebuilder.md#clear)
- [clearAlters](database_altertablebuilder.altertablebuilder.md#clearalters)
- [clearBindingSources](database_altertablebuilder.altertablebuilder.md#clearbindingsources)
- [compile](database_altertablebuilder.altertablebuilder.md#compile)
- [getBindings](database_altertablebuilder.altertablebuilder.md#getbindings)
- [popBindingSource](database_altertablebuilder.altertablebuilder.md#popbindingsource)
- [shiftBindingSource](database_altertablebuilder.altertablebuilder.md#shiftbindingsource)
- [shiftBindingSources](database_altertablebuilder.altertablebuilder.md#shiftbindingsources)
- [table](database_altertablebuilder.altertablebuilder.md#table)
- [toSQL](database_altertablebuilder.altertablebuilder.md#tosql)

## Constructors

### constructor

\+ **new AlterTableBuilder**(): [*AlterTableBuilder*](database_altertablebuilder.altertablebuilder.md)

Builds a new alter table query builder

**Returns:** [*AlterTableBuilder*](database_altertablebuilder.altertablebuilder.md)

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/AlterTableBuilder.ts:32](https://github.com/onzag/itemize/blob/0e9b128c/database/AlterTableBuilder.ts#L32)

## Properties

### action

• `Private` **action**: *string*

Defined in: [database/AlterTableBuilder.ts:32](https://github.com/onzag/itemize/blob/0e9b128c/database/AlterTableBuilder.ts#L32)

___

### columnRule

• `Private` **columnRule**: IAlterTableColumnDataWithExpressionAsDefault

Defined in: [database/AlterTableBuilder.ts:31](https://github.com/onzag/itemize/blob/0e9b128c/database/AlterTableBuilder.ts#L31)

___

### tableName

• `Private` **tableName**: *string*

Table name in question we are updating against

Defined in: [database/AlterTableBuilder.ts:30](https://github.com/onzag/itemize/blob/0e9b128c/database/AlterTableBuilder.ts#L30)

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

Defined in: [database/base.ts:69](https://github.com/onzag/itemize/blob/0e9b128c/database/base.ts#L69)

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

Defined in: [database/base.ts:77](https://github.com/onzag/itemize/blob/0e9b128c/database/base.ts#L77)

___

### affectColumn

▸ **affectColumn**(`action`: *DROP COLUMN* \| *ADD COLUMN* \| *ALTER COLUMN*, `info`: IAlterTableColumnData): [*AlterTableBuilder*](database_altertablebuilder.altertablebuilder.md)

Adds a column to the alter rule

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`action` | *DROP COLUMN* \| *ADD COLUMN* \| *ALTER COLUMN* | - |
`info` | IAlterTableColumnData | the info about the column   |

**Returns:** [*AlterTableBuilder*](database_altertablebuilder.altertablebuilder.md)

itself

Defined in: [database/AlterTableBuilder.ts:47](https://github.com/onzag/itemize/blob/0e9b128c/database/AlterTableBuilder.ts#L47)

___

### clear

▸ **clear**(): [*AlterTableBuilder*](database_altertablebuilder.altertablebuilder.md)

Clears the table name, if not exists state and columns

**Returns:** [*AlterTableBuilder*](database_altertablebuilder.altertablebuilder.md)

itself

Defined in: [database/AlterTableBuilder.ts:98](https://github.com/onzag/itemize/blob/0e9b128c/database/AlterTableBuilder.ts#L98)

___

### clearAlters

▸ **clearAlters**(): *void*

Clears only the alters without modifying the table name

**Returns:** *void*

Defined in: [database/AlterTableBuilder.ts:88](https://github.com/onzag/itemize/blob/0e9b128c/database/AlterTableBuilder.ts#L88)

___

### clearBindingSources

▸ **clearBindingSources**(): *void*

Removes all binding sources

**Returns:** *void*

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:102](https://github.com/onzag/itemize/blob/0e9b128c/database/base.ts#L102)

___

### compile

▸ **compile**(): *string*

Converts this from query to a pseudo SQL query that uses ?

**Returns:** *string*

a string that represents the compiled result

Overrides: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/AlterTableBuilder.ts:108](https://github.com/onzag/itemize/blob/0e9b128c/database/AlterTableBuilder.ts#L108)

___

### getBindings

▸ **getBindings**(): [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]

Provides the bindings for the query in order that
should match the compilation

**Returns:** [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]

a list of basic bindings

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:165](https://github.com/onzag/itemize/blob/0e9b128c/database/base.ts#L165)

___

### popBindingSource

▸ **popBindingSource**(): [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Removes the last added biding source and returns it

**Returns:** [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:109](https://github.com/onzag/itemize/blob/0e9b128c/database/base.ts#L109)

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

Defined in: [database/base.ts:86](https://github.com/onzag/itemize/blob/0e9b128c/database/base.ts#L86)

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

Defined in: [database/base.ts:95](https://github.com/onzag/itemize/blob/0e9b128c/database/base.ts#L95)

___

### table

▸ **table**(`tableName`: *string*): [*AlterTableBuilder*](database_altertablebuilder.altertablebuilder.md)

Specifies the table we are updating

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`tableName` | *string* | the table in question   |

**Returns:** [*AlterTableBuilder*](database_altertablebuilder.altertablebuilder.md)

itself

Defined in: [database/AlterTableBuilder.ts:80](https://github.com/onzag/itemize/blob/0e9b128c/database/AlterTableBuilder.ts#L80)

___

### toSQL

▸ **toSQL**(): IQueryBuilderSQLResult

Returns the SQL result for usage in the query builder

**Returns:** IQueryBuilderSQLResult

a sql builder result with the bindings and the query itself

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:126](https://github.com/onzag/itemize/blob/0e9b128c/database/base.ts#L126)
