[](../README.md) / [Exports](../modules.md) / [database/base](../modules/database_base.md) / ConditionalBuilder

# Class: ConditionalBuilder

[database/base](../modules/database_base.md).ConditionalBuilder

The conditional builder class is based on the query builder
and its an utility to create conditional based queries like the
where query, joins queries, etc... whatever is using boolean
conditions

## Hierarchy

* [*QueryBuilder*](database_base.querybuilder.md)

  ↳ **ConditionalBuilder**

  ↳↳ [*HavingBuilder*](database_havingbuilder.havingbuilder.md)

  ↳↳ [*JoinRuleBuilder*](database_joinbuilder.joinrulebuilder.md)

  ↳↳ [*WhereBuilder*](database_wherebuilder.wherebuilder.md)

## Table of contents

### Constructors

- [constructor](database_base.conditionalbuilder.md#constructor)

### Properties

- [conditions](database_base.conditionalbuilder.md#conditions)
- [parent](database_base.conditionalbuilder.md#parent)
- [type](database_base.conditionalbuilder.md#type)

### Methods

- [addBindingSource](database_base.conditionalbuilder.md#addbindingsource)
- [addBindingSources](database_base.conditionalbuilder.md#addbindingsources)
- [clear](database_base.conditionalbuilder.md#clear)
- [clearBindingSources](database_base.conditionalbuilder.md#clearbindingsources)
- [compile](database_base.conditionalbuilder.md#compile)
- [condition](database_base.conditionalbuilder.md#condition)
- [getBindings](database_base.conditionalbuilder.md#getbindings)
- [hasRulesAssigned](database_base.conditionalbuilder.md#hasrulesassigned)
- [popBindingSource](database_base.conditionalbuilder.md#popbindingsource)
- [shiftBindingSource](database_base.conditionalbuilder.md#shiftbindingsource)
- [shiftBindingSources](database_base.conditionalbuilder.md#shiftbindingsources)
- [subcondition](database_base.conditionalbuilder.md#subcondition)
- [toSQL](database_base.conditionalbuilder.md#tosql)

## Constructors

### constructor

\+ **new ConditionalBuilder**(`parent?`: [*ConditionalBuilder*](database_base.conditionalbuilder.md), `type`: *string*): [*ConditionalBuilder*](database_base.conditionalbuilder.md)

Build a new conditional builder

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`parent` | [*ConditionalBuilder*](database_base.conditionalbuilder.md) | null | the parent of it   |
`type` | *string* | - | the type, WHERE, ON, etc... it will be used    |

**Returns:** [*ConditionalBuilder*](database_base.conditionalbuilder.md)

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:238](https://github.com/onzag/itemize/blob/5fcde7cf/database/base.ts#L238)

## Properties

### conditions

• `Private` **conditions**: [*IConditionalBuilderConditionType*](../interfaces/database_base.iconditionalbuilderconditiontype.md)[]

This is the list of conditions, it represents either a expression
or a subcondition with a gate included, and or or

Defined in: [database/base.ts:228](https://github.com/onzag/itemize/blob/5fcde7cf/database/base.ts#L228)

___

### parent

• `Private` **parent**: [*ConditionalBuilder*](database_base.conditionalbuilder.md)

The parent of the condition, they might compile different
since these conditions nest

Defined in: [database/base.ts:233](https://github.com/onzag/itemize/blob/5fcde7cf/database/base.ts#L233)

___

### type

• **type**: *string*

The type of the condition, WHERE, ON, etc... whatever
you fancy

Defined in: [database/base.ts:238](https://github.com/onzag/itemize/blob/5fcde7cf/database/base.ts#L238)

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

Defined in: [database/base.ts:69](https://github.com/onzag/itemize/blob/5fcde7cf/database/base.ts#L69)

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

Defined in: [database/base.ts:77](https://github.com/onzag/itemize/blob/5fcde7cf/database/base.ts#L77)

___

### clear

▸ **clear**(): [*ConditionalBuilder*](database_base.conditionalbuilder.md)

Clears the conditional builder

**Returns:** [*ConditionalBuilder*](database_base.conditionalbuilder.md)

itself

Defined in: [database/base.ts:347](https://github.com/onzag/itemize/blob/5fcde7cf/database/base.ts#L347)

___

### clearBindingSources

▸ **clearBindingSources**(): *void*

Removes all binding sources

**Returns:** *void*

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:102](https://github.com/onzag/itemize/blob/5fcde7cf/database/base.ts#L102)

___

### compile

▸ **compile**(): *string*

Compiles the condition

**Returns:** *string*

a string that represents the condition

Overrides: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:357](https://github.com/onzag/itemize/blob/5fcde7cf/database/base.ts#L357)

___

### condition

▸ **condition**(`gate`: *AND* \| *OR*, `prefix`: *string*, `rule`: *string* \| [*QueryBuilder*](database_base.querybuilder.md) \| [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<any\>, `bindings?`: [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]): [*ConditionalBuilder*](database_base.conditionalbuilder.md)

Makes a new condition based on an expression or a subrule function

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`gate` | *AND* \| *OR* | the gate to use   |
`prefix` | *string* | an optional prefix to the rule, if none, make it null   |
`rule` | *string* \| [*QueryBuilder*](database_base.querybuilder.md) \| [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<any\> | either the expression itself or a subcondition   |
`bindings?` | [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[] | the bindings for the expression, will not be used if using a subcondition   |

**Returns:** [*ConditionalBuilder*](database_base.conditionalbuilder.md)

itself

Defined in: [database/base.ts:288](https://github.com/onzag/itemize/blob/5fcde7cf/database/base.ts#L288)

___

### getBindings

▸ **getBindings**(): [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]

Provides the bindings for the query in order that
should match the compilation

**Returns:** [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]

a list of basic bindings

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:165](https://github.com/onzag/itemize/blob/5fcde7cf/database/base.ts#L165)

___

### hasRulesAssigned

▸ **hasRulesAssigned**(): *boolean*

Specifies whether the builder has conditions
whatsoever

**Returns:** *boolean*

Defined in: [database/base.ts:256](https://github.com/onzag/itemize/blob/5fcde7cf/database/base.ts#L256)

___

### popBindingSource

▸ **popBindingSource**(): [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Removes the last added biding source and returns it

**Returns:** [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:109](https://github.com/onzag/itemize/blob/5fcde7cf/database/base.ts#L109)

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

Defined in: [database/base.ts:86](https://github.com/onzag/itemize/blob/5fcde7cf/database/base.ts#L86)

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

Defined in: [database/base.ts:95](https://github.com/onzag/itemize/blob/5fcde7cf/database/base.ts#L95)

___

### subcondition

▸ **subcondition**(): [*ConditionalBuilder*](database_base.conditionalbuilder.md)

It should provide a new conditional builder that should
be a child of this

**`override`** 

**Returns:** [*ConditionalBuilder*](database_base.conditionalbuilder.md)

a new builder for itself to make a child of

Defined in: [database/base.ts:274](https://github.com/onzag/itemize/blob/5fcde7cf/database/base.ts#L274)

___

### toSQL

▸ **toSQL**(): IQueryBuilderSQLResult

Returns the SQL result for usage in the query builder

**Returns:** IQueryBuilderSQLResult

a sql builder result with the bindings and the query itself

Inherited from: [QueryBuilder](database_base.querybuilder.md)

Defined in: [database/base.ts:126](https://github.com/onzag/itemize/blob/5fcde7cf/database/base.ts#L126)
