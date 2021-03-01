[](../README.md) / [Exports](../modules.md) / [database/RawBuilder](../modules/database_rawbuilder.md) / RawBuilder

# Class: RawBuilder

[database/RawBuilder](../modules/database_rawbuilder.md).RawBuilder

This is the raw builder for raw queries, it's not very useful
you might prefer to pass raw queries into the database connection
instead of using this

## Hierarchy

* [*QueryBuilder*](database_base.querybuilder.md)

  ↳ **RawBuilder**

## Table of contents

### Constructors

- [constructor](database_rawbuilder.rawbuilder.md#constructor)

### Properties

- [raw](database_rawbuilder.rawbuilder.md#raw)

### Methods

- [addBindingSource](database_rawbuilder.rawbuilder.md#addbindingsource)
- [addBindingSources](database_rawbuilder.rawbuilder.md#addbindingsources)
- [clearBindingSources](database_rawbuilder.rawbuilder.md#clearbindingsources)
- [compile](database_rawbuilder.rawbuilder.md#compile)
- [getBindings](database_rawbuilder.rawbuilder.md#getbindings)
- [popBindingSource](database_rawbuilder.rawbuilder.md#popbindingsource)
- [shiftBindingSource](database_rawbuilder.rawbuilder.md#shiftbindingsource)
- [shiftBindingSources](database_rawbuilder.rawbuilder.md#shiftbindingsources)
- [toSQL](database_rawbuilder.rawbuilder.md#tosql)

## Constructors

### constructor

\+ **new RawBuilder**(`raw`: *string*, `bindings?`: (*string* \| *number*)[]): [*RawBuilder*](database_rawbuilder.rawbuilder.md)

Builds a new raw query

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`raw` | *string* | the raw query   |
`bindings?` | (*string* \| *number*)[] | the bindings for such    |

**Returns:** [*RawBuilder*](database_rawbuilder.rawbuilder.md)

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/RawBuilder.ts:18](https://github.com/onzag/itemize/blob/55e63f2c/database/RawBuilder.ts#L18)

## Properties

### raw

• `Private` **raw**: *string*

The raw expression

Defined in: [database/RawBuilder.ts:18](https://github.com/onzag/itemize/blob/55e63f2c/database/RawBuilder.ts#L18)

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

### clearBindingSources

▸ **clearBindingSources**(): *void*

Removes all binding sources

**Returns:** *void*

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:102](https://github.com/onzag/itemize/blob/55e63f2c/database/base.ts#L102)

___

### compile

▸ **compile**(): *string*

Converts this from query to a pseudo SQL query that uses ?

**Returns:** *string*

a string that represents the compiled result

Overrides: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/RawBuilder.ts:39](https://github.com/onzag/itemize/blob/55e63f2c/database/RawBuilder.ts#L39)

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

### popBindingSource

▸ **popBindingSource**(): [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Removes the last added biding source and returns it

**Returns:** [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:109](https://github.com/onzag/itemize/blob/55e63f2c/database/base.ts#L109)

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
