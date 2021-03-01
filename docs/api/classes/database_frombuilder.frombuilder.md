[](../README.md) / [Exports](../modules.md) / [database/FromBuilder](../modules/database_frombuilder.md) / FromBuilder

# Class: FromBuilder

[database/FromBuilder](../modules/database_frombuilder.md).FromBuilder

Provides a builder for a FROM statments in SQL

## Hierarchy

* [*QueryBuilder*](database_base.querybuilder.md)

  ↳ **FromBuilder**

## Table of contents

### Constructors

- [constructor](database_frombuilder.frombuilder.md#constructor)

### Properties

- [tables](database_frombuilder.frombuilder.md#tables)

### Methods

- [addBindingSource](database_frombuilder.frombuilder.md#addbindingsource)
- [addBindingSources](database_frombuilder.frombuilder.md#addbindingsources)
- [clear](database_frombuilder.frombuilder.md#clear)
- [clearBindingSources](database_frombuilder.frombuilder.md#clearbindingsources)
- [compile](database_frombuilder.frombuilder.md#compile)
- [from](database_frombuilder.frombuilder.md#from)
- [getBindings](database_frombuilder.frombuilder.md#getbindings)
- [popBindingSource](database_frombuilder.frombuilder.md#popbindingsource)
- [shiftBindingSource](database_frombuilder.frombuilder.md#shiftbindingsource)
- [shiftBindingSources](database_frombuilder.frombuilder.md#shiftbindingsources)
- [toSQL](database_frombuilder.frombuilder.md#tosql)

## Constructors

### constructor

\+ **new FromBuilder**(): [*FromBuilder*](database_frombuilder.frombuilder.md)

builds a new from builder

**Returns:** [*FromBuilder*](database_frombuilder.frombuilder.md)

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/FromBuilder.ts:15](https://github.com/onzag/itemize/blob/0e9b128c/database/FromBuilder.ts#L15)

## Properties

### tables

• `Private` **tables**: *string*[]

The tables we do the from rule

Defined in: [database/FromBuilder.ts:15](https://github.com/onzag/itemize/blob/0e9b128c/database/FromBuilder.ts#L15)

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

### clear

▸ **clear**(): [*FromBuilder*](database_frombuilder.frombuilder.md)

On the from builder this will clear all the tables

**Returns:** [*FromBuilder*](database_frombuilder.frombuilder.md)

itself

Defined in: [database/FromBuilder.ts:38](https://github.com/onzag/itemize/blob/0e9b128c/database/FromBuilder.ts#L38)

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

Defined in: [database/FromBuilder.ts:48](https://github.com/onzag/itemize/blob/0e9b128c/database/FromBuilder.ts#L48)

___

### from

▸ **from**(...`tableNames`: *string*[]): [*FromBuilder*](database_frombuilder.frombuilder.md)

Select tables to pick from

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`...tableNames` | *string*[] | the tables to select   |

**Returns:** [*FromBuilder*](database_frombuilder.frombuilder.md)

itself

Defined in: [database/FromBuilder.ts:29](https://github.com/onzag/itemize/blob/0e9b128c/database/FromBuilder.ts#L29)

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

### toSQL

▸ **toSQL**(): IQueryBuilderSQLResult

Returns the SQL result for usage in the query builder

**Returns:** IQueryBuilderSQLResult

a sql builder result with the bindings and the query itself

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:126](https://github.com/onzag/itemize/blob/0e9b128c/database/base.ts#L126)
