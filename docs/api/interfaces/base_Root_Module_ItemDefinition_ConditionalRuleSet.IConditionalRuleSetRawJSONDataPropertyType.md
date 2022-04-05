[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition/ConditionalRuleSet](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md) / IConditionalRuleSetRawJSONDataPropertyType

# Interface: IConditionalRuleSetRawJSONDataPropertyType

[base/Root/Module/ItemDefinition/ConditionalRuleSet](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md).IConditionalRuleSetRawJSONDataPropertyType

this is the raw json of a conditional rule set

## Hierarchy

- `IConditionalRuleSetRawJSONDataBaseType`

  ↳ **`IConditionalRuleSetRawJSONDataPropertyType`**

## Table of contents

### Properties

- [attribute](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataPropertyType.md#attribute)
- [comparator](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataPropertyType.md#comparator)
- [condition](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataPropertyType.md#condition)
- [gate](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataPropertyType.md#gate)
- [method](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataPropertyType.md#method)
- [property](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataPropertyType.md#property)
- [serverFlag](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataPropertyType.md#serverflag)
- [value](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataPropertyType.md#value)
- [valueAttribute](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataPropertyType.md#valueattribute)

## Properties

### attribute

• `Optional` **attribute**: `string`

the attribute of that property, as some properties are objects

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:70](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L70)

___

### comparator

• **comparator**: [`ConditionalRuleComparatorType`](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md#conditionalrulecomparatortype)

the comparator, equal, greater than, etc...

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:78](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L78)

___

### condition

• `Optional` **condition**: [`IConditionalRuleSetRawJSONDataType`](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md#iconditionalrulesetrawjsondatatype)

#### Inherited from

IConditionalRuleSetRawJSONDataBaseType.condition

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:54](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L54)

___

### gate

• `Optional` **gate**: [`ConditionalRuleGateType`](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md#conditionalrulegatetype)

#### Inherited from

IConditionalRuleSetRawJSONDataBaseType.gate

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:53](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L53)

___

### method

• `Optional` **method**: ``"string"`` \| ``"default"`` \| ``"date"`` \| ``"datetime"`` \| ``"time"``

the method, default, string or datetime (uses Date)

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:74](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L74)

___

### property

• **property**: `string`

the property to be compared

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:66](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L66)

___

### serverFlag

• `Optional` **serverFlag**: [`ConditionalRuleServerFlagType`](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md#conditionalruleserverflagtype)

#### Inherited from

IConditionalRuleSetRawJSONDataBaseType.serverFlag

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:55](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L55)

___

### value

• **value**: [`PropertyDefinitionValueType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition.md#propertydefinitionvaluetype)

the value to be compared against, either a value itself, or alternatively, a property

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:82](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L82)

___

### valueAttribute

• `Optional` **valueAttribute**: `string`

the attribute of the value, if any that is used to compare against
with the comparator, rather than the value of itself

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:87](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L87)
