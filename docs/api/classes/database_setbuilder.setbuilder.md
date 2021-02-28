[](../README.md) / [Exports](../modules.md) / [database/SetBuilder](../modules/database_setbuilder.md) / SetBuilder

# Class: SetBuilder

[database/SetBuilder](../modules/database_setbuilder.md).SetBuilder

## Hierarchy

* [*QueryBuilder*](database_base.querybuilder.md)

  ↳ **SetBuilder**

## Table of contents

### Constructors

- [constructor](database_setbuilder.setbuilder.md#constructor)

### Properties

- [expressions](database_setbuilder.setbuilder.md#expressions)

### Methods

- [addBindingSource](database_setbuilder.setbuilder.md#addbindingsource)
- [addBindingSources](database_setbuilder.setbuilder.md#addbindingsources)
- [clear](database_setbuilder.setbuilder.md#clear)
- [clearBindingSources](database_setbuilder.setbuilder.md#clearbindingsources)
- [compile](database_setbuilder.setbuilder.md#compile)
- [getBindings](database_setbuilder.setbuilder.md#getbindings)
- [popBindingSource](database_setbuilder.setbuilder.md#popbindingsource)
- [set](database_setbuilder.setbuilder.md#set)
- [setColumn](database_setbuilder.setbuilder.md#setcolumn)
- [setColumnWithTable](database_setbuilder.setbuilder.md#setcolumnwithtable)
- [setMany](database_setbuilder.setbuilder.md#setmany)
- [shiftBindingSource](database_setbuilder.setbuilder.md#shiftbindingsource)
- [shiftBindingSources](database_setbuilder.setbuilder.md#shiftbindingsources)
- [toSQL](database_setbuilder.setbuilder.md#tosql)

## Constructors

### constructor

\+ **new SetBuilder**(): [*SetBuilder*](database_setbuilder.setbuilder.md)

Builds a new set builder

**Returns:** [*SetBuilder*](database_setbuilder.setbuilder.md)

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/SetBuilder.ts:16](https://github.com/onzag/itemize/blob/11a98dec/database/SetBuilder.ts#L16)

## Properties

### expressions

• `Private` **expressions**: *string*[]

What we are setting as expressions

Defined in: [database/SetBuilder.ts:16](https://github.com/onzag/itemize/blob/11a98dec/database/SetBuilder.ts#L16)

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

### clear

▸ **clear**(): [*SetBuilder*](database_setbuilder.setbuilder.md)

Clears all the expressions in the set rule

**Returns:** [*SetBuilder*](database_setbuilder.setbuilder.md)

itself

Defined in: [database/SetBuilder.ts:97](https://github.com/onzag/itemize/blob/11a98dec/database/SetBuilder.ts#L97)

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

Defined in: [database/SetBuilder.ts:86](https://github.com/onzag/itemize/blob/11a98dec/database/SetBuilder.ts#L86)

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

### popBindingSource

▸ **popBindingSource**(): [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Removes the last added biding source and returns it

**Returns:** [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:109](https://github.com/onzag/itemize/blob/11a98dec/database/base.ts#L109)

___

### set

▸ **set**(`expression`: *string*, `bindings?`: [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]): [*SetBuilder*](database_setbuilder.setbuilder.md)

sets based on an expression

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`expression` | *string* | the expression to use   |
`bindings?` | [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[] | - |

**Returns:** [*SetBuilder*](database_setbuilder.setbuilder.md)

itself

Defined in: [database/SetBuilder.ts:76](https://github.com/onzag/itemize/blob/11a98dec/database/SetBuilder.ts#L76)

___

### setColumn

▸ **setColumn**(`columnName`: *string*, `value`: [*ValueType*](../modules/database_base.md#valuetype)): [*SetBuilder*](database_setbuilder.setbuilder.md)

allows to set an specific column an specific value

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`columnName` | *string* | the column to set   |
`value` | [*ValueType*](../modules/database_base.md#valuetype) | the value to set   |

**Returns:** [*SetBuilder*](database_setbuilder.setbuilder.md)

itself

Defined in: [database/SetBuilder.ts:44](https://github.com/onzag/itemize/blob/11a98dec/database/SetBuilder.ts#L44)

___

### setColumnWithTable

▸ **setColumnWithTable**(`tableName`: *string*, `columnName`: *string*, `value`: [*ValueType*](../modules/database_base.md#valuetype)): [*SetBuilder*](database_setbuilder.setbuilder.md)

allows to set an specific column an specific value

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`tableName` | *string* | the table in question   |
`columnName` | *string* | the column to set   |
`value` | [*ValueType*](../modules/database_base.md#valuetype) | the value to set   |

**Returns:** [*SetBuilder*](database_setbuilder.setbuilder.md)

itself

Defined in: [database/SetBuilder.ts:55](https://github.com/onzag/itemize/blob/11a98dec/database/SetBuilder.ts#L55)

___

### setMany

▸ **setMany**(`value`: [*IManyValueType*](../interfaces/database_base.imanyvaluetype.md)): [*SetBuilder*](database_setbuilder.setbuilder.md)

allows to set many at once as a column-value fashion

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`value` | [*IManyValueType*](../interfaces/database_base.imanyvaluetype.md) | the values to set   |

**Returns:** [*SetBuilder*](database_setbuilder.setbuilder.md)

itself

Defined in: [database/SetBuilder.ts:30](https://github.com/onzag/itemize/blob/11a98dec/database/SetBuilder.ts#L30)

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

### toSQL

▸ **toSQL**(): IQueryBuilderSQLResult

Returns the SQL result for usage in the query builder

**Returns:** IQueryBuilderSQLResult

a sql builder result with the bindings and the query itself

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:126](https://github.com/onzag/itemize/blob/11a98dec/database/base.ts#L126)
