[](../README.md) / [Exports](../modules.md) / [database/InsertBuilder](../modules/database_insertbuilder.md) / InsertBuilder

# Class: InsertBuilder

[database/InsertBuilder](../modules/database_insertbuilder.md).InsertBuilder

the insert query builder that allows to create INSERT queries

## Hierarchy

* [*QueryBuilder*](database_base.querybuilder.md)

  ↳ **InsertBuilder**

## Table of contents

### Constructors

- [constructor](database_insertbuilder.insertbuilder.md#constructor)

### Properties

- [columnSignature](database_insertbuilder.insertbuilder.md#columnsignature)
- [doOnConflict](database_insertbuilder.insertbuilder.md#doonconflict)
- [returningBuilder](database_insertbuilder.insertbuilder.md#returningbuilder)
- [tableName](database_insertbuilder.insertbuilder.md#tablename)
- [valuesToInsert](database_insertbuilder.insertbuilder.md#valuestoinsert)

### Methods

- [addBindingSource](database_insertbuilder.insertbuilder.md#addbindingsource)
- [addBindingSources](database_insertbuilder.insertbuilder.md#addbindingsources)
- [clear](database_insertbuilder.insertbuilder.md#clear)
- [clearBindingSources](database_insertbuilder.insertbuilder.md#clearbindingsources)
- [clearValues](database_insertbuilder.insertbuilder.md#clearvalues)
- [compile](database_insertbuilder.insertbuilder.md#compile)
- [getBindings](database_insertbuilder.insertbuilder.md#getbindings)
- [insert](database_insertbuilder.insertbuilder.md#insert)
- [onConflict](database_insertbuilder.insertbuilder.md#onconflict)
- [popBindingSource](database_insertbuilder.insertbuilder.md#popbindingsource)
- [shiftBindingSource](database_insertbuilder.insertbuilder.md#shiftbindingsource)
- [shiftBindingSources](database_insertbuilder.insertbuilder.md#shiftbindingsources)
- [table](database_insertbuilder.insertbuilder.md#table)
- [toSQL](database_insertbuilder.insertbuilder.md#tosql)

## Constructors

### constructor

\+ **new InsertBuilder**(): [*InsertBuilder*](database_insertbuilder.insertbuilder.md)

Builds a new insert query

**Returns:** [*InsertBuilder*](database_insertbuilder.insertbuilder.md)

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/InsertBuilder.ts:43](https://github.com/onzag/itemize/blob/3efa2a4a/database/InsertBuilder.ts#L43)

## Properties

### columnSignature

• `Private` **columnSignature**: *string*= null

The signature of what we are trying to add
this is the columns list

"id", "version", "name"

as a string itself

Defined in: [database/InsertBuilder.ts:29](https://github.com/onzag/itemize/blob/3efa2a4a/database/InsertBuilder.ts#L29)

___

### doOnConflict

• `Private` **doOnConflict**: *NOTHING* \| *UPDATE*

What to do on conflict

Defined in: [database/InsertBuilder.ts:43](https://github.com/onzag/itemize/blob/3efa2a4a/database/InsertBuilder.ts#L43)

___

### returningBuilder

• **returningBuilder**: [*ReturningBuilder*](database_returningbuilder.returningbuilder.md)

The returning builder to specify the returning condition

Defined in: [database/InsertBuilder.ts:34](https://github.com/onzag/itemize/blob/3efa2a4a/database/InsertBuilder.ts#L34)

___

### tableName

• `Private` **tableName**: *string*

The table name we try to insert at

Defined in: [database/InsertBuilder.ts:39](https://github.com/onzag/itemize/blob/3efa2a4a/database/InsertBuilder.ts#L39)

___

### valuesToInsert

• `Private` **valuesToInsert**: *string*[]

Represents the expressions that we are trying
to insert in order, these are already converted
into a string form, for example

"?, ?, ?, NOW()" etc...

Defined in: [database/InsertBuilder.ts:20](https://github.com/onzag/itemize/blob/3efa2a4a/database/InsertBuilder.ts#L20)

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

▸ **clear**(): [*InsertBuilder*](database_insertbuilder.insertbuilder.md)

Clears the values to insert and removes the table name as well
this function does not affect the builders

**Returns:** [*InsertBuilder*](database_insertbuilder.insertbuilder.md)

itself

Defined in: [database/InsertBuilder.ts:76](https://github.com/onzag/itemize/blob/3efa2a4a/database/InsertBuilder.ts#L76)

___

### clearBindingSources

▸ **clearBindingSources**(): *void*

Removes all binding sources

**Returns:** *void*

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:102](https://github.com/onzag/itemize/blob/3efa2a4a/database/base.ts#L102)

___

### clearValues

▸ **clearValues**(): [*InsertBuilder*](database_insertbuilder.insertbuilder.md)

Clears the values to insert and the values alone

**Returns:** [*InsertBuilder*](database_insertbuilder.insertbuilder.md)

itself

Defined in: [database/InsertBuilder.ts:62](https://github.com/onzag/itemize/blob/3efa2a4a/database/InsertBuilder.ts#L62)

___

### compile

▸ **compile**(): *string*

Converts this from query to a pseudo SQL query that uses ?

**Returns:** *string*

a string that represents the compiled result

Overrides: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/InsertBuilder.ts:180](https://github.com/onzag/itemize/blob/3efa2a4a/database/InsertBuilder.ts#L180)

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

### insert

▸ **insert**(...`values`: [*IManyValueType*](../interfaces/database_base.imanyvaluetype.md)[]): [*InsertBuilder*](database_insertbuilder.insertbuilder.md)

Specifies what values to insert

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`...values` | [*IManyValueType*](../interfaces/database_base.imanyvaluetype.md)[] | the values to insert as an object   |

**Returns:** [*InsertBuilder*](database_insertbuilder.insertbuilder.md)

itself

Defined in: [database/InsertBuilder.ts:97](https://github.com/onzag/itemize/blob/3efa2a4a/database/InsertBuilder.ts#L97)

___

### onConflict

▸ **onConflict**(`doWhat`: *NOTHING* \| *UPDATE*): [*InsertBuilder*](database_insertbuilder.insertbuilder.md)

sets the on conflict rule for the insert

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`doWhat` | *NOTHING* \| *UPDATE* | what to do NOTHING or UPDATE   |

**Returns:** [*InsertBuilder*](database_insertbuilder.insertbuilder.md)

itself

Defined in: [database/InsertBuilder.ts:171](https://github.com/onzag/itemize/blob/3efa2a4a/database/InsertBuilder.ts#L171)

___

### popBindingSource

▸ **popBindingSource**(): [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Removes the last added biding source and returns it

**Returns:** [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:109](https://github.com/onzag/itemize/blob/3efa2a4a/database/base.ts#L109)

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

### table

▸ **table**(`tableName`: *string*): [*InsertBuilder*](database_insertbuilder.insertbuilder.md)

Sets the table you are trying to insert at

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`tableName` | *string* | the table name   |

**Returns:** [*InsertBuilder*](database_insertbuilder.insertbuilder.md)

itself

Defined in: [database/InsertBuilder.ts:87](https://github.com/onzag/itemize/blob/3efa2a4a/database/InsertBuilder.ts#L87)

___

### toSQL

▸ **toSQL**(): IQueryBuilderSQLResult

Returns the SQL result for usage in the query builder

**Returns:** IQueryBuilderSQLResult

a sql builder result with the bindings and the query itself

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:126](https://github.com/onzag/itemize/blob/3efa2a4a/database/base.ts#L126)
