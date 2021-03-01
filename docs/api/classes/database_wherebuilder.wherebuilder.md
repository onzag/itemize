[](../README.md) / [Exports](../modules.md) / [database/WhereBuilder](../modules/database_wherebuilder.md) / WhereBuilder

# Class: WhereBuilder

[database/WhereBuilder](../modules/database_wherebuilder.md).WhereBuilder

The where query builder allows to create WHERE statments
extends the conditional builder since it's basically a nesting condition

## Hierarchy

* [*ConditionalBuilder*](database_base.conditionalbuilder.md)

  ↳ **WhereBuilder**

## Table of contents

### Constructors

- [constructor](database_wherebuilder.wherebuilder.md#constructor)

### Properties

- [type](database_wherebuilder.wherebuilder.md#type)

### Methods

- [addBindingSource](database_wherebuilder.wherebuilder.md#addbindingsource)
- [addBindingSources](database_wherebuilder.wherebuilder.md#addbindingsources)
- [andWhere](database_wherebuilder.wherebuilder.md#andwhere)
- [andWhereColumn](database_wherebuilder.wherebuilder.md#andwherecolumn)
- [andWhereColumnNotNull](database_wherebuilder.wherebuilder.md#andwherecolumnnotnull)
- [andWhereColumnNull](database_wherebuilder.wherebuilder.md#andwherecolumnnull)
- [andWhereExists](database_wherebuilder.wherebuilder.md#andwhereexists)
- [andWhereMany](database_wherebuilder.wherebuilder.md#andwheremany)
- [andWhereNotExists](database_wherebuilder.wherebuilder.md#andwherenotexists)
- [clear](database_wherebuilder.wherebuilder.md#clear)
- [clearBindingSources](database_wherebuilder.wherebuilder.md#clearbindingsources)
- [compile](database_wherebuilder.wherebuilder.md#compile)
- [condition](database_wherebuilder.wherebuilder.md#condition)
- [getBindings](database_wherebuilder.wherebuilder.md#getbindings)
- [hasRulesAssigned](database_wherebuilder.wherebuilder.md#hasrulesassigned)
- [orWhere](database_wherebuilder.wherebuilder.md#orwhere)
- [orWhereColumn](database_wherebuilder.wherebuilder.md#orwherecolumn)
- [orWhereColumnNotNull](database_wherebuilder.wherebuilder.md#orwherecolumnnotnull)
- [orWhereColumnNull](database_wherebuilder.wherebuilder.md#orwherecolumnnull)
- [orWhereExists](database_wherebuilder.wherebuilder.md#orwhereexists)
- [orWhereMany](database_wherebuilder.wherebuilder.md#orwheremany)
- [orWhereNotExists](database_wherebuilder.wherebuilder.md#orwherenotexists)
- [popBindingSource](database_wherebuilder.wherebuilder.md#popbindingsource)
- [shiftBindingSource](database_wherebuilder.wherebuilder.md#shiftbindingsource)
- [shiftBindingSources](database_wherebuilder.wherebuilder.md#shiftbindingsources)
- [subcondition](database_wherebuilder.wherebuilder.md#subcondition)
- [toSQL](database_wherebuilder.wherebuilder.md#tosql)

## Constructors

### constructor

\+ **new WhereBuilder**(`parent?`: [*WhereBuilder*](database_wherebuilder.wherebuilder.md)): [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

Creates a new where builder instance

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`parent` | [*WhereBuilder*](database_wherebuilder.wherebuilder.md) | null | the parent where builder in question    |

**Returns:** [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md)

Defined in: [database/WhereBuilder.ts:13](https://github.com/onzag/itemize/blob/0e9b128c/database/WhereBuilder.ts#L13)

## Properties

### type

• **type**: *string*

The type of the condition, WHERE, ON, etc... whatever
you fancy

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md).[type](database_base.conditionalbuilder.md#type)

Defined in: [database/base.ts:238](https://github.com/onzag/itemize/blob/0e9b128c/database/base.ts#L238)

## Methods

### addBindingSource

▸ **addBindingSource**(`value`: [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)): *void*

Adds a binding source to the binding source list in order

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`value` | [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype) | the binding source to add    |

**Returns:** *void*

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md)

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

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md)

Defined in: [database/base.ts:77](https://github.com/onzag/itemize/blob/0e9b128c/database/base.ts#L77)

___

### andWhere

▸ **andWhere**(`rule`: *string* \| [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<[*WhereBuilder*](database_wherebuilder.wherebuilder.md)\>, `bindings?`: (*string* \| *number*)[]): [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

Specifies a simple expression as an AND rule

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rule` | *string* \| [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<[*WhereBuilder*](database_wherebuilder.wherebuilder.md)\> | the expression in question   |
`bindings?` | (*string* \| *number*)[] | the bindings for that rule   |

**Returns:** [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

itself

Defined in: [database/WhereBuilder.ts:197](https://github.com/onzag/itemize/blob/0e9b128c/database/WhereBuilder.ts#L197)

___

### andWhereColumn

▸ **andWhereColumn**(`column`: *string*, `valueOrComparator`: [*ValueType*](../modules/database_base.md#valuetype), `valueToCompare?`: [*ValueType*](../modules/database_base.md#valuetype)): [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

Specifies an AND rule for a column with a given value or comparator

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`column` | *string* | the column in question   |
`valueOrComparator` | [*ValueType*](../modules/database_base.md#valuetype) | a value to compare against in equality or a comparator   |
`valueToCompare?` | [*ValueType*](../modules/database_base.md#valuetype) | if the previous value was a comparator, then this one should be the value   |

**Returns:** [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

itself

Defined in: [database/WhereBuilder.ts:110](https://github.com/onzag/itemize/blob/0e9b128c/database/WhereBuilder.ts#L110)

___

### andWhereColumnNotNull

▸ **andWhereColumnNotNull**(`column`: *string*): [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

Specifies an AND rule for a column when this one is not null

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`column` | *string* | the column in question   |

**Returns:** [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

itself

Defined in: [database/WhereBuilder.ts:166](https://github.com/onzag/itemize/blob/0e9b128c/database/WhereBuilder.ts#L166)

___

### andWhereColumnNull

▸ **andWhereColumnNull**(`column`: *string*): [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

Specifies an AND rule for a column when this one is null

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`column` | *string* | the column in question   |

**Returns:** [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

itself

Defined in: [database/WhereBuilder.ts:156](https://github.com/onzag/itemize/blob/0e9b128c/database/WhereBuilder.ts#L156)

___

### andWhereExists

▸ **andWhereExists**(`arg`: [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<[*SelectBuilder*](database_selectbuilder.selectbuilder.md)\>): [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

Specifies a condition for an EXISTS rule

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<[*SelectBuilder*](database_selectbuilder.selectbuilder.md)\> | a function that provides a select builder   |

**Returns:** [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

itself

Defined in: [database/WhereBuilder.ts:36](https://github.com/onzag/itemize/blob/0e9b128c/database/WhereBuilder.ts#L36)

___

### andWhereMany

▸ **andWhereMany**(`obj`: [*IManyValueType*](../interfaces/database_base.imanyvaluetype.md)): [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

Specifies an AND rule for column value key pairs

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`obj` | [*IManyValueType*](../interfaces/database_base.imanyvaluetype.md) | the values that are relevant   |

**Returns:** [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

itself

Defined in: [database/WhereBuilder.ts:84](https://github.com/onzag/itemize/blob/0e9b128c/database/WhereBuilder.ts#L84)

___

### andWhereNotExists

▸ **andWhereNotExists**(`arg`: [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<[*SelectBuilder*](database_selectbuilder.selectbuilder.md)\>): [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

Specifies a condition for an EXISTS rule

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<[*SelectBuilder*](database_selectbuilder.selectbuilder.md)\> | a function that provides a select builder   |

**Returns:** [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

itself

Defined in: [database/WhereBuilder.ts:48](https://github.com/onzag/itemize/blob/0e9b128c/database/WhereBuilder.ts#L48)

___

### clear

▸ **clear**(): [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

Clears the conditional builder

**Returns:** [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

itself

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md)

Defined in: [database/base.ts:347](https://github.com/onzag/itemize/blob/0e9b128c/database/base.ts#L347)

___

### clearBindingSources

▸ **clearBindingSources**(): *void*

Removes all binding sources

**Returns:** *void*

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md)

Defined in: [database/base.ts:102](https://github.com/onzag/itemize/blob/0e9b128c/database/base.ts#L102)

___

### compile

▸ **compile**(): *string*

Compiles the condition

**Returns:** *string*

a string that represents the condition

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md)

Defined in: [database/base.ts:357](https://github.com/onzag/itemize/blob/0e9b128c/database/base.ts#L357)

___

### condition

▸ **condition**(`gate`: *AND* \| *OR*, `prefix`: *string*, `rule`: *string* \| [*QueryBuilder*](database_base.querybuilder.md) \| [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<any\>, `bindings?`: [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]): [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

Makes a new condition based on an expression or a subrule function

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`gate` | *AND* \| *OR* | the gate to use   |
`prefix` | *string* | an optional prefix to the rule, if none, make it null   |
`rule` | *string* \| [*QueryBuilder*](database_base.querybuilder.md) \| [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<any\> | either the expression itself or a subcondition   |
`bindings?` | [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[] | the bindings for the expression, will not be used if using a subcondition   |

**Returns:** [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

itself

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md)

Defined in: [database/base.ts:288](https://github.com/onzag/itemize/blob/0e9b128c/database/base.ts#L288)

___

### getBindings

▸ **getBindings**(): [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]

Provides the bindings for the query in order that
should match the compilation

**Returns:** [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]

a list of basic bindings

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md)

Defined in: [database/base.ts:165](https://github.com/onzag/itemize/blob/0e9b128c/database/base.ts#L165)

___

### hasRulesAssigned

▸ **hasRulesAssigned**(): *boolean*

Specifies whether the builder has conditions
whatsoever

**Returns:** *boolean*

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md)

Defined in: [database/base.ts:256](https://github.com/onzag/itemize/blob/0e9b128c/database/base.ts#L256)

___

### orWhere

▸ **orWhere**(`rule`: *string* \| [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<[*WhereBuilder*](database_wherebuilder.wherebuilder.md)\>, `bindings?`: (*string* \| *number*)[]): [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

Specifies a simple expression as a OR rule

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rule` | *string* \| [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<[*WhereBuilder*](database_wherebuilder.wherebuilder.md)\> | the expression in question   |
`bindings?` | (*string* \| *number*)[] | the bindings for that rule   |

**Returns:** [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

itself

Defined in: [database/WhereBuilder.ts:207](https://github.com/onzag/itemize/blob/0e9b128c/database/WhereBuilder.ts#L207)

___

### orWhereColumn

▸ **orWhereColumn**(`column`: *string*, `valueOrComparator`: [*ValueType*](../modules/database_base.md#valuetype), `valueToCompare?`: [*ValueType*](../modules/database_base.md#valuetype)): [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

Specifies an OR rule for a column with a given value or comparator

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`column` | *string* | the column in question   |
`valueOrComparator` | [*ValueType*](../modules/database_base.md#valuetype) | a value to compare against in equality or a comparator   |
`valueToCompare?` | [*ValueType*](../modules/database_base.md#valuetype) | if the previous value was a comparator, then this one should be the value   |

**Returns:** [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

itself

Defined in: [database/WhereBuilder.ts:134](https://github.com/onzag/itemize/blob/0e9b128c/database/WhereBuilder.ts#L134)

___

### orWhereColumnNotNull

▸ **orWhereColumnNotNull**(`column`: *string*): [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

Specifies an OR rule for a column when this one is not null

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`column` | *string* | the column in question   |

**Returns:** [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

itself

Defined in: [database/WhereBuilder.ts:186](https://github.com/onzag/itemize/blob/0e9b128c/database/WhereBuilder.ts#L186)

___

### orWhereColumnNull

▸ **orWhereColumnNull**(`column`: *string*): [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

Specifies an OR rule for a column when this one is null

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`column` | *string* | the column in question   |

**Returns:** [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

itself

Defined in: [database/WhereBuilder.ts:176](https://github.com/onzag/itemize/blob/0e9b128c/database/WhereBuilder.ts#L176)

___

### orWhereExists

▸ **orWhereExists**(`arg`: [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<[*SelectBuilder*](database_selectbuilder.selectbuilder.md)\>): [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

Specifies a condition for an EXISTS rule

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<[*SelectBuilder*](database_selectbuilder.selectbuilder.md)\> | a function that provides a select builder   |

**Returns:** [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

itself

Defined in: [database/WhereBuilder.ts:60](https://github.com/onzag/itemize/blob/0e9b128c/database/WhereBuilder.ts#L60)

___

### orWhereMany

▸ **orWhereMany**(`obj`: [*IManyValueType*](../interfaces/database_base.imanyvaluetype.md)): [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

Specifies an OR rule for column value key pairs

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`obj` | [*IManyValueType*](../interfaces/database_base.imanyvaluetype.md) | the values that are relevant   |

**Returns:** [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

itself

Defined in: [database/WhereBuilder.ts:96](https://github.com/onzag/itemize/blob/0e9b128c/database/WhereBuilder.ts#L96)

___

### orWhereNotExists

▸ **orWhereNotExists**(`arg`: [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<[*SelectBuilder*](database_selectbuilder.selectbuilder.md)\>): [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

Specifies a condition for an EXISTS rule

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<[*SelectBuilder*](database_selectbuilder.selectbuilder.md)\> | a function that provides a select builder   |

**Returns:** [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

itself

Defined in: [database/WhereBuilder.ts:72](https://github.com/onzag/itemize/blob/0e9b128c/database/WhereBuilder.ts#L72)

___

### popBindingSource

▸ **popBindingSource**(): [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Removes the last added biding source and returns it

**Returns:** [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md)

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

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md)

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

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md)

Defined in: [database/base.ts:95](https://github.com/onzag/itemize/blob/0e9b128c/database/base.ts#L95)

___

### subcondition

▸ **subcondition**(): [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

Specifies how to build a subcondition for the where builder

**Returns:** [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

a new subcondition instance parented by this one

Overrides: [ConditionalBuilder](database_base.conditionalbuilder.md)

Defined in: [database/WhereBuilder.ts:27](https://github.com/onzag/itemize/blob/0e9b128c/database/WhereBuilder.ts#L27)

___

### toSQL

▸ **toSQL**(): IQueryBuilderSQLResult

Returns the SQL result for usage in the query builder

**Returns:** IQueryBuilderSQLResult

a sql builder result with the bindings and the query itself

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md)

Defined in: [database/base.ts:126](https://github.com/onzag/itemize/blob/0e9b128c/database/base.ts#L126)
