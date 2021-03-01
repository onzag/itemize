[](../README.md) / [Exports](../modules.md) / [database/HavingBuilder](../modules/database_havingbuilder.md) / HavingBuilder

# Class: HavingBuilder

[database/HavingBuilder](../modules/database_havingbuilder.md).HavingBuilder

The having builder that allows to create HAVING statments

## Hierarchy

* [*ConditionalBuilder*](database_base.conditionalbuilder.md)

  ↳ **HavingBuilder**

## Table of contents

### Constructors

- [constructor](database_havingbuilder.havingbuilder.md#constructor)

### Properties

- [type](database_havingbuilder.havingbuilder.md#type)

### Methods

- [addBindingSource](database_havingbuilder.havingbuilder.md#addbindingsource)
- [addBindingSources](database_havingbuilder.havingbuilder.md#addbindingsources)
- [andHaving](database_havingbuilder.havingbuilder.md#andhaving)
- [clear](database_havingbuilder.havingbuilder.md#clear)
- [clearBindingSources](database_havingbuilder.havingbuilder.md#clearbindingsources)
- [compile](database_havingbuilder.havingbuilder.md#compile)
- [condition](database_havingbuilder.havingbuilder.md#condition)
- [getBindings](database_havingbuilder.havingbuilder.md#getbindings)
- [hasRulesAssigned](database_havingbuilder.havingbuilder.md#hasrulesassigned)
- [orHaving](database_havingbuilder.havingbuilder.md#orhaving)
- [popBindingSource](database_havingbuilder.havingbuilder.md#popbindingsource)
- [shiftBindingSource](database_havingbuilder.havingbuilder.md#shiftbindingsource)
- [shiftBindingSources](database_havingbuilder.havingbuilder.md#shiftbindingsources)
- [subcondition](database_havingbuilder.havingbuilder.md#subcondition)
- [toSQL](database_havingbuilder.havingbuilder.md#tosql)

## Constructors

### constructor

\+ **new HavingBuilder**(`parent?`: [*HavingBuilder*](database_havingbuilder.havingbuilder.md)): [*HavingBuilder*](database_havingbuilder.havingbuilder.md)

Builds a new having builder, because this is the nested
conditional builder it needs to take a parent in order
to compile properly

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`parent` | [*HavingBuilder*](database_havingbuilder.havingbuilder.md) | null |

**Returns:** [*HavingBuilder*](database_havingbuilder.havingbuilder.md)

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md)

Defined in: [database/HavingBuilder.ts:11](https://github.com/onzag/itemize/blob/0e9b128c/database/HavingBuilder.ts#L11)

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

### andHaving

▸ **andHaving**(`rule`: *string* \| [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<[*HavingBuilder*](database_havingbuilder.havingbuilder.md)\>, `bindings?`: (*string* \| *number*)[]): [*HavingBuilder*](database_havingbuilder.havingbuilder.md)

Specifies a new AND having condition

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rule` | *string* \| [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<[*HavingBuilder*](database_havingbuilder.havingbuilder.md)\> | the rule expression   |
`bindings?` | (*string* \| *number*)[] | the bindings for that expression   |

**Returns:** [*HavingBuilder*](database_havingbuilder.havingbuilder.md)

itself

Defined in: [database/HavingBuilder.ts:37](https://github.com/onzag/itemize/blob/0e9b128c/database/HavingBuilder.ts#L37)

___

### clear

▸ **clear**(): [*HavingBuilder*](database_havingbuilder.havingbuilder.md)

Clears the conditional builder

**Returns:** [*HavingBuilder*](database_havingbuilder.havingbuilder.md)

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

▸ **condition**(`gate`: *AND* \| *OR*, `prefix`: *string*, `rule`: *string* \| [*QueryBuilder*](database_base.querybuilder.md) \| [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<any\>, `bindings?`: [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]): [*HavingBuilder*](database_havingbuilder.havingbuilder.md)

Makes a new condition based on an expression or a subrule function

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`gate` | *AND* \| *OR* | the gate to use   |
`prefix` | *string* | an optional prefix to the rule, if none, make it null   |
`rule` | *string* \| [*QueryBuilder*](database_base.querybuilder.md) \| [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<any\> | either the expression itself or a subcondition   |
`bindings?` | [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[] | the bindings for the expression, will not be used if using a subcondition   |

**Returns:** [*HavingBuilder*](database_havingbuilder.havingbuilder.md)

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

### orHaving

▸ **orHaving**(`rule`: *string* \| [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<[*HavingBuilder*](database_havingbuilder.havingbuilder.md)\>, `bindings?`: (*string* \| *number*)[]): [*HavingBuilder*](database_havingbuilder.havingbuilder.md)

Specifies a new OR having condition

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rule` | *string* \| [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<[*HavingBuilder*](database_havingbuilder.havingbuilder.md)\> | the rule expression   |
`bindings?` | (*string* \| *number*)[] | the bindings for that expression   |

**Returns:** [*HavingBuilder*](database_havingbuilder.havingbuilder.md)

itself

Defined in: [database/HavingBuilder.ts:47](https://github.com/onzag/itemize/blob/0e9b128c/database/HavingBuilder.ts#L47)

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

▸ **subcondition**(): [*HavingBuilder*](database_havingbuilder.havingbuilder.md)

The override method that specifies how to create a subcondition

**Returns:** [*HavingBuilder*](database_havingbuilder.havingbuilder.md)

Overrides: [ConditionalBuilder](database_base.conditionalbuilder.md)

Defined in: [database/HavingBuilder.ts:27](https://github.com/onzag/itemize/blob/0e9b128c/database/HavingBuilder.ts#L27)

___

### toSQL

▸ **toSQL**(): IQueryBuilderSQLResult

Returns the SQL result for usage in the query builder

**Returns:** IQueryBuilderSQLResult

a sql builder result with the bindings and the query itself

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md)

Defined in: [database/base.ts:126](https://github.com/onzag/itemize/blob/0e9b128c/database/base.ts#L126)
