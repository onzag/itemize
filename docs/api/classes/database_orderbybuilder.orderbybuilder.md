[](../README.md) / [Exports](../modules.md) / [database/OrderByBuilder](../modules/database_orderbybuilder.md) / OrderByBuilder

# Class: OrderByBuilder

[database/OrderByBuilder](../modules/database_orderbybuilder.md).OrderByBuilder

The order by query builder that allows to create ORDER BY statments

## Hierarchy

* [*QueryBuilder*](database_base.querybuilder.md)

  ↳ **OrderByBuilder**

## Table of contents

### Constructors

- [constructor](database_orderbybuilder.orderbybuilder.md#constructor)

### Properties

- [expressions](database_orderbybuilder.orderbybuilder.md#expressions)

### Methods

- [addBindingSource](database_orderbybuilder.orderbybuilder.md#addbindingsource)
- [addBindingSources](database_orderbybuilder.orderbybuilder.md#addbindingsources)
- [clear](database_orderbybuilder.orderbybuilder.md#clear)
- [clearBindingSources](database_orderbybuilder.orderbybuilder.md#clearbindingsources)
- [compile](database_orderbybuilder.orderbybuilder.md#compile)
- [getBindings](database_orderbybuilder.orderbybuilder.md#getbindings)
- [orderBy](database_orderbybuilder.orderbybuilder.md#orderby)
- [orderByColumn](database_orderbybuilder.orderbybuilder.md#orderbycolumn)
- [orderByColumnInTable](database_orderbybuilder.orderbybuilder.md#orderbycolumnintable)
- [orderByUsing](database_orderbybuilder.orderbybuilder.md#orderbyusing)
- [popBindingSource](database_orderbybuilder.orderbybuilder.md#popbindingsource)
- [shiftBindingSource](database_orderbybuilder.orderbybuilder.md#shiftbindingsource)
- [shiftBindingSources](database_orderbybuilder.orderbybuilder.md#shiftbindingsources)
- [toSQL](database_orderbybuilder.orderbybuilder.md#tosql)

## Constructors

### constructor

\+ **new OrderByBuilder**(): [*OrderByBuilder*](database_orderbybuilder.orderbybuilder.md)

Builds a new order by query

**Returns:** [*OrderByBuilder*](database_orderbybuilder.orderbybuilder.md)

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/OrderByBuilder.ts:25](https://github.com/onzag/itemize/blob/55e63f2c/database/OrderByBuilder.ts#L25)

## Properties

### expressions

• `Private` **expressions**: IOrderByExpression[]

The expressions we are ordering by

Defined in: [database/OrderByBuilder.ts:25](https://github.com/onzag/itemize/blob/55e63f2c/database/OrderByBuilder.ts#L25)

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

▸ **clear**(): [*OrderByBuilder*](database_orderbybuilder.orderbybuilder.md)

Clears all the expressions in the order by builder

**Returns:** [*OrderByBuilder*](database_orderbybuilder.orderbybuilder.md)

itself

Defined in: [database/OrderByBuilder.ts:109](https://github.com/onzag/itemize/blob/55e63f2c/database/OrderByBuilder.ts#L109)

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

Defined in: [database/OrderByBuilder.ts:119](https://github.com/onzag/itemize/blob/55e63f2c/database/OrderByBuilder.ts#L119)

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

### orderBy

▸ **orderBy**(`expression`: *string*, `style`: *ASC* \| *DESC*, `nulls`: *FIRST* \| *LAST*, `bindings?`: (*string* \| *number*)[]): [*OrderByBuilder*](database_orderbybuilder.orderbybuilder.md)

Allows to order by an expression

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`expression` | *string* | the expression in question   |
`style` | *ASC* \| *DESC* | ASC or DESC, for ascending or descending   |
`nulls` | *FIRST* \| *LAST* | whether nulls go first or last   |
`bindings?` | (*string* \| *number*)[] | the bindings for the expression   |

**Returns:** [*OrderByBuilder*](database_orderbybuilder.orderbybuilder.md)

itself

Defined in: [database/OrderByBuilder.ts:72](https://github.com/onzag/itemize/blob/55e63f2c/database/OrderByBuilder.ts#L72)

___

### orderByColumn

▸ **orderByColumn**(`column`: *string*, `style`: *ASC* \| *DESC*, `nulls`: *FIRST* \| *LAST*): [*OrderByBuilder*](database_orderbybuilder.orderbybuilder.md)

Allows to order by a column

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`column` | *string* | the column   |
`style` | *ASC* \| *DESC* | ASC or DESC, for ascending or descending   |
`nulls` | *FIRST* \| *LAST* | whether nulls go first or last   |

**Returns:** [*OrderByBuilder*](database_orderbybuilder.orderbybuilder.md)

itself

Defined in: [database/OrderByBuilder.ts:60](https://github.com/onzag/itemize/blob/55e63f2c/database/OrderByBuilder.ts#L60)

___

### orderByColumnInTable

▸ **orderByColumnInTable**(`tableName`: *string*, `column`: *string*, `style`: *ASC* \| *DESC*, `nulls`: *FIRST* \| *LAST*): [*OrderByBuilder*](database_orderbybuilder.orderbybuilder.md)

Allows to order by a specific column in a specific table

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`tableName` | *string* | the table   |
`column` | *string* | the column   |
`style` | *ASC* \| *DESC* | ASC or DESC, for ascending or descending   |
`nulls` | *FIRST* \| *LAST* | whether nulls go first or last   |

**Returns:** [*OrderByBuilder*](database_orderbybuilder.orderbybuilder.md)

itself

Defined in: [database/OrderByBuilder.ts:42](https://github.com/onzag/itemize/blob/55e63f2c/database/OrderByBuilder.ts#L42)

___

### orderByUsing

▸ **orderByUsing**(`expression`: *string*, `operator`: *string*, `nulls`: *FIRST* \| *LAST*, `bindings?`: (*string* \| *number*)[]): [*OrderByBuilder*](database_orderbybuilder.orderbybuilder.md)

Allows to order by an expression

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`expression` | *string* | the expression in question   |
`operator` | *string* | the operator to go with USING   |
`nulls` | *FIRST* \| *LAST* | whether nulls go first or last   |
`bindings?` | (*string* \| *number*)[] | the bindings for the expression   |

**Returns:** [*OrderByBuilder*](database_orderbybuilder.orderbybuilder.md)

itself

Defined in: [database/OrderByBuilder.ts:92](https://github.com/onzag/itemize/blob/55e63f2c/database/OrderByBuilder.ts#L92)

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
