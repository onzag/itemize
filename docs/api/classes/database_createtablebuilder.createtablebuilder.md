[](../README.md) / [Exports](../modules.md) / [database/CreateTableBuilder](../modules/database_createtablebuilder.md) / CreateTableBuilder

# Class: CreateTableBuilder

[database/CreateTableBuilder](../modules/database_createtablebuilder.md).CreateTableBuilder

## Hierarchy

* [*QueryBuilder*](database_base.querybuilder.md)

  ↳ **CreateTableBuilder**

## Table of contents

### Constructors

- [constructor](database_createtablebuilder.createtablebuilder.md#constructor)

### Properties

- [columns](database_createtablebuilder.createtablebuilder.md#columns)
- [createIfNotExists](database_createtablebuilder.createtablebuilder.md#createifnotexists)
- [tableName](database_createtablebuilder.createtablebuilder.md#tablename)

### Methods

- [addBindingSource](database_createtablebuilder.createtablebuilder.md#addbindingsource)
- [addBindingSources](database_createtablebuilder.createtablebuilder.md#addbindingsources)
- [addColumn](database_createtablebuilder.createtablebuilder.md#addcolumn)
- [clear](database_createtablebuilder.createtablebuilder.md#clear)
- [clearBindingSources](database_createtablebuilder.createtablebuilder.md#clearbindingsources)
- [compile](database_createtablebuilder.createtablebuilder.md#compile)
- [getBindings](database_createtablebuilder.createtablebuilder.md#getbindings)
- [ifNotExists](database_createtablebuilder.createtablebuilder.md#ifnotexists)
- [popBindingSource](database_createtablebuilder.createtablebuilder.md#popbindingsource)
- [shiftBindingSource](database_createtablebuilder.createtablebuilder.md#shiftbindingsource)
- [shiftBindingSources](database_createtablebuilder.createtablebuilder.md#shiftbindingsources)
- [table](database_createtablebuilder.createtablebuilder.md#table)
- [toSQL](database_createtablebuilder.createtablebuilder.md#tosql)

## Constructors

### constructor

\+ **new CreateTableBuilder**(): [*CreateTableBuilder*](database_createtablebuilder.createtablebuilder.md)

Builds a new create table query builder

**Returns:** [*CreateTableBuilder*](database_createtablebuilder.createtablebuilder.md)

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/CreateTableBuilder.ts:32](https://github.com/onzag/itemize/blob/0569bdf2/database/CreateTableBuilder.ts#L32)

## Properties

### columns

• `Private` **columns**: ICreateTableColumnDataWithExpressionAsDefault[]

Defined in: [database/CreateTableBuilder.ts:32](https://github.com/onzag/itemize/blob/0569bdf2/database/CreateTableBuilder.ts#L32)

___

### createIfNotExists

• `Private` **createIfNotExists**: *boolean*

Defined in: [database/CreateTableBuilder.ts:31](https://github.com/onzag/itemize/blob/0569bdf2/database/CreateTableBuilder.ts#L31)

___

### tableName

• `Private` **tableName**: *string*

Table name in question we are updating against

Defined in: [database/CreateTableBuilder.ts:30](https://github.com/onzag/itemize/blob/0569bdf2/database/CreateTableBuilder.ts#L30)

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

▸ **addColumn**(`info`: ICreateTableColumnData): [*CreateTableBuilder*](database_createtablebuilder.createtablebuilder.md)

Adds a column to the create rule

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`info` | ICreateTableColumnData | the info about the column   |

**Returns:** [*CreateTableBuilder*](database_createtablebuilder.createtablebuilder.md)

itself

Defined in: [database/CreateTableBuilder.ts:48](https://github.com/onzag/itemize/blob/0569bdf2/database/CreateTableBuilder.ts#L48)

___

### clear

▸ **clear**(): [*CreateTableBuilder*](database_createtablebuilder.createtablebuilder.md)

Clears the table name, if not exists state and columns

**Returns:** [*CreateTableBuilder*](database_createtablebuilder.createtablebuilder.md)

itself

Defined in: [database/CreateTableBuilder.ts:93](https://github.com/onzag/itemize/blob/0569bdf2/database/CreateTableBuilder.ts#L93)

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

Defined in: [database/CreateTableBuilder.ts:105](https://github.com/onzag/itemize/blob/0569bdf2/database/CreateTableBuilder.ts#L105)

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

### ifNotExists

▸ **ifNotExists**(): [*CreateTableBuilder*](database_createtablebuilder.createtablebuilder.md)

Makes the update be IF NOT EXISTS

**Returns:** [*CreateTableBuilder*](database_createtablebuilder.createtablebuilder.md)

itself

Defined in: [database/CreateTableBuilder.ts:84](https://github.com/onzag/itemize/blob/0569bdf2/database/CreateTableBuilder.ts#L84)

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

### table

▸ **table**(`tableName`: *string*): [*CreateTableBuilder*](database_createtablebuilder.createtablebuilder.md)

Specifies the table we are updating

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`tableName` | *string* | the table in question   |

**Returns:** [*CreateTableBuilder*](database_createtablebuilder.createtablebuilder.md)

itself

Defined in: [database/CreateTableBuilder.ts:75](https://github.com/onzag/itemize/blob/0569bdf2/database/CreateTableBuilder.ts#L75)

___

### toSQL

▸ **toSQL**(): IQueryBuilderSQLResult

Returns the SQL result for usage in the query builder

**Returns:** IQueryBuilderSQLResult

a sql builder result with the bindings and the query itself

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:126](https://github.com/onzag/itemize/blob/0569bdf2/database/base.ts#L126)
