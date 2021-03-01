[](../README.md) / [Exports](../modules.md) / [database/JoinBuilder](../modules/database_joinbuilder.md) / JoinRuleBuilder

# Class: JoinRuleBuilder

[database/JoinBuilder](../modules/database_joinbuilder.md).JoinRuleBuilder

Represents the join rule basically the real LEFT JOIN, RIGHT  JOIN, INNER JOIN and whatnot

## Hierarchy

* [*ConditionalBuilder*](database_base.conditionalbuilder.md)

  ↳ **JoinRuleBuilder**

## Table of contents

### Constructors

- [constructor](database_joinbuilder.joinrulebuilder.md#constructor)

### Properties

- [type](database_joinbuilder.joinrulebuilder.md#type)

### Methods

- [addBindingSource](database_joinbuilder.joinrulebuilder.md#addbindingsource)
- [addBindingSources](database_joinbuilder.joinrulebuilder.md#addbindingsources)
- [clear](database_joinbuilder.joinrulebuilder.md#clear)
- [clearBindingSources](database_joinbuilder.joinrulebuilder.md#clearbindingsources)
- [compile](database_joinbuilder.joinrulebuilder.md#compile)
- [condition](database_joinbuilder.joinrulebuilder.md#condition)
- [getBindings](database_joinbuilder.joinrulebuilder.md#getbindings)
- [hasRulesAssigned](database_joinbuilder.joinrulebuilder.md#hasrulesassigned)
- [on](database_joinbuilder.joinrulebuilder.md#on)
- [onColumnEquals](database_joinbuilder.joinrulebuilder.md#oncolumnequals)
- [orOn](database_joinbuilder.joinrulebuilder.md#oron)
- [orOnColumnEquals](database_joinbuilder.joinrulebuilder.md#oroncolumnequals)
- [popBindingSource](database_joinbuilder.joinrulebuilder.md#popbindingsource)
- [shiftBindingSource](database_joinbuilder.joinrulebuilder.md#shiftbindingsource)
- [shiftBindingSources](database_joinbuilder.joinrulebuilder.md#shiftbindingsources)
- [subcondition](database_joinbuilder.joinrulebuilder.md#subcondition)
- [toSQL](database_joinbuilder.joinrulebuilder.md#tosql)

## Constructors

### constructor

\+ **new JoinRuleBuilder**(`parent?`: [*ConditionalBuilder*](database_base.conditionalbuilder.md), `type`: *string*): [*JoinRuleBuilder*](database_joinbuilder.joinrulebuilder.md)

Build a new conditional builder

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`parent` | [*ConditionalBuilder*](database_base.conditionalbuilder.md) | null | the parent of it   |
`type` | *string* | - | the type, WHERE, ON, etc... it will be used    |

**Returns:** [*JoinRuleBuilder*](database_joinbuilder.joinrulebuilder.md)

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md)

Defined in: [database/base.ts:238](https://github.com/onzag/itemize/blob/3efa2a4a/database/base.ts#L238)

## Properties

### type

• **type**: *string*

The type of the condition, WHERE, ON, etc... whatever
you fancy

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md).[type](database_base.conditionalbuilder.md#type)

Defined in: [database/base.ts:238](https://github.com/onzag/itemize/blob/3efa2a4a/database/base.ts#L238)

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

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md)

Defined in: [database/base.ts:77](https://github.com/onzag/itemize/blob/3efa2a4a/database/base.ts#L77)

___

### clear

▸ **clear**(): [*JoinRuleBuilder*](database_joinbuilder.joinrulebuilder.md)

Clears the conditional builder

**Returns:** [*JoinRuleBuilder*](database_joinbuilder.joinrulebuilder.md)

itself

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md)

Defined in: [database/base.ts:347](https://github.com/onzag/itemize/blob/3efa2a4a/database/base.ts#L347)

___

### clearBindingSources

▸ **clearBindingSources**(): *void*

Removes all binding sources

**Returns:** *void*

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md)

Defined in: [database/base.ts:102](https://github.com/onzag/itemize/blob/3efa2a4a/database/base.ts#L102)

___

### compile

▸ **compile**(): *string*

Compiles the condition

**Returns:** *string*

a string that represents the condition

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md)

Defined in: [database/base.ts:357](https://github.com/onzag/itemize/blob/3efa2a4a/database/base.ts#L357)

___

### condition

▸ **condition**(`gate`: *AND* \| *OR*, `prefix`: *string*, `rule`: *string* \| [*QueryBuilder*](database_base.querybuilder.md) \| [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<any\>, `bindings?`: [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]): [*JoinRuleBuilder*](database_joinbuilder.joinrulebuilder.md)

Makes a new condition based on an expression or a subrule function

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`gate` | *AND* \| *OR* | the gate to use   |
`prefix` | *string* | an optional prefix to the rule, if none, make it null   |
`rule` | *string* \| [*QueryBuilder*](database_base.querybuilder.md) \| [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<any\> | either the expression itself or a subcondition   |
`bindings?` | [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[] | the bindings for the expression, will not be used if using a subcondition   |

**Returns:** [*JoinRuleBuilder*](database_joinbuilder.joinrulebuilder.md)

itself

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md)

Defined in: [database/base.ts:288](https://github.com/onzag/itemize/blob/3efa2a4a/database/base.ts#L288)

___

### getBindings

▸ **getBindings**(): [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]

Provides the bindings for the query in order that
should match the compilation

**Returns:** [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]

a list of basic bindings

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md)

Defined in: [database/base.ts:165](https://github.com/onzag/itemize/blob/3efa2a4a/database/base.ts#L165)

___

### hasRulesAssigned

▸ **hasRulesAssigned**(): *boolean*

Specifies whether the builder has conditions
whatsoever

**Returns:** *boolean*

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md)

Defined in: [database/base.ts:256](https://github.com/onzag/itemize/blob/3efa2a4a/database/base.ts#L256)

___

### on

▸ **on**(`rule`: *string* \| [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<[*JoinRuleBuilder*](database_joinbuilder.joinrulebuilder.md)\>, `bindings?`: (*string* \| *number*)[]): [*JoinRuleBuilder*](database_joinbuilder.joinrulebuilder.md)

Specifies a rule where the conditiuon applies this is an AND rule

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rule` | *string* \| [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<[*JoinRuleBuilder*](database_joinbuilder.joinrulebuilder.md)\> | the rule to join with   |
`bindings?` | (*string* \| *number*)[] | the bindings for the expression   |

**Returns:** [*JoinRuleBuilder*](database_joinbuilder.joinrulebuilder.md)

itself

Defined in: [database/JoinBuilder.ts:27](https://github.com/onzag/itemize/blob/3efa2a4a/database/JoinBuilder.ts#L27)

___

### onColumnEquals

▸ **onColumnEquals**(`columnA`: *string*, `columnB`: *string*): [*JoinRuleBuilder*](database_joinbuilder.joinrulebuilder.md)

Specify a join rule on equality between columns this is an AND rule

#### Parameters:

Name | Type |
:------ | :------ |
`columnA` | *string* |
`columnB` | *string* |

**Returns:** [*JoinRuleBuilder*](database_joinbuilder.joinrulebuilder.md)

itself

Defined in: [database/JoinBuilder.ts:47](https://github.com/onzag/itemize/blob/3efa2a4a/database/JoinBuilder.ts#L47)

___

### orOn

▸ **orOn**(`rule`: *string* \| [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<[*JoinRuleBuilder*](database_joinbuilder.joinrulebuilder.md)\>, `bindings?`: (*string* \| *number*)[]): [*JoinRuleBuilder*](database_joinbuilder.joinrulebuilder.md)

Specifies a rule where the conditiuon applies this is an OR rule

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rule` | *string* \| [*ConditionalBuilderFn*](../modules/database_base.md#conditionalbuilderfn)<[*JoinRuleBuilder*](database_joinbuilder.joinrulebuilder.md)\> | the rule to join with   |
`bindings?` | (*string* \| *number*)[] | the bindings for the expression   |

**Returns:** [*JoinRuleBuilder*](database_joinbuilder.joinrulebuilder.md)

itself

Defined in: [database/JoinBuilder.ts:37](https://github.com/onzag/itemize/blob/3efa2a4a/database/JoinBuilder.ts#L37)

___

### orOnColumnEquals

▸ **orOnColumnEquals**(`columnA`: *string*, `columnB`: *string*): [*JoinRuleBuilder*](database_joinbuilder.joinrulebuilder.md)

Specify a join rule on equality between columns this is an OR rule

#### Parameters:

Name | Type |
:------ | :------ |
`columnA` | *string* |
`columnB` | *string* |

**Returns:** [*JoinRuleBuilder*](database_joinbuilder.joinrulebuilder.md)

itself

Defined in: [database/JoinBuilder.ts:57](https://github.com/onzag/itemize/blob/3efa2a4a/database/JoinBuilder.ts#L57)

___

### popBindingSource

▸ **popBindingSource**(): [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Removes the last added biding source and returns it

**Returns:** [*ExtendedBindingType*](../modules/database_base.md#extendedbindingtype)

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md)

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

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md)

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

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md)

Defined in: [database/base.ts:95](https://github.com/onzag/itemize/blob/3efa2a4a/database/base.ts#L95)

___

### subcondition

▸ **subcondition**(): [*JoinRuleBuilder*](database_joinbuilder.joinrulebuilder.md)

Specifies how to subcondition this conditional builder

**Returns:** [*JoinRuleBuilder*](database_joinbuilder.joinrulebuilder.md)

Overrides: [ConditionalBuilder](database_base.conditionalbuilder.md)

Defined in: [database/JoinBuilder.ts:16](https://github.com/onzag/itemize/blob/3efa2a4a/database/JoinBuilder.ts#L16)

___

### toSQL

▸ **toSQL**(): IQueryBuilderSQLResult

Returns the SQL result for usage in the query builder

**Returns:** IQueryBuilderSQLResult

a sql builder result with the bindings and the query itself

Inherited from: [ConditionalBuilder](database_base.conditionalbuilder.md)

Defined in: [database/base.ts:126](https://github.com/onzag/itemize/blob/3efa2a4a/database/base.ts#L126)
