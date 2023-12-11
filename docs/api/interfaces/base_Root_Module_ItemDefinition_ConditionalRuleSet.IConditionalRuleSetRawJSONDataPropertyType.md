[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition/ConditionalRuleSet](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md) / IConditionalRuleSetRawJSONDataPropertyType

# Interface: IConditionalRuleSetRawJSONDataPropertyType

[base/Root/Module/ItemDefinition/ConditionalRuleSet](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md).IConditionalRuleSetRawJSONDataPropertyType

this is the raw json of a conditional rule set

## Hierarchy

- [`IConditionalRuleSetRawJSONDataBaseType`](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataBaseType.md)

  ↳ **`IConditionalRuleSetRawJSONDataPropertyType`**

## Table of contents

### Properties

- [attribute](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataPropertyType.md#attribute)
- [comparator](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataPropertyType.md#comparator)
- [condition](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataPropertyType.md#condition)
- [gate](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataPropertyType.md#gate)
- [internalConditionGate](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataPropertyType.md#internalconditiongate)
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

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:71](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L71)

___

### comparator

• **comparator**: [`ConditionalRuleComparatorType`](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md#conditionalrulecomparatortype)

the comparator, equal, greater than, etc...

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:79](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L79)

___

### condition

• `Optional` **condition**: [`IConditionalRuleSetRawJSONDataType`](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md#iconditionalrulesetrawjsondatatype) \| [`IConditionalRuleSetRawJSONDataType`](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md#iconditionalrulesetrawjsondatatype)[]

#### Inherited from

[IConditionalRuleSetRawJSONDataBaseType](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataBaseType.md).[condition](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataBaseType.md#condition)

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:54](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L54)

___

### gate

• `Optional` **gate**: [`ConditionalRuleGateType`](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md#conditionalrulegatetype)

#### Inherited from

[IConditionalRuleSetRawJSONDataBaseType](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataBaseType.md).[gate](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataBaseType.md#gate)

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:53](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L53)

___

### internalConditionGate

• `Optional` **internalConditionGate**: [`ConditionalRuleGateType`](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md#conditionalrulegatetype)

#### Inherited from

[IConditionalRuleSetRawJSONDataBaseType](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataBaseType.md).[internalConditionGate](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataBaseType.md#internalconditiongate)

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:55](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L55)

___

### method

• `Optional` **method**: ``"string"`` \| ``"default"`` \| ``"date"`` \| ``"datetime"`` \| ``"time"``

the method, default, string or datetime (uses Date)

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:75](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L75)

___

### property

• **property**: `string`

the property to be compared

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:67](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L67)

___

### serverFlag

• `Optional` **serverFlag**: [`ConditionalRuleServerFlagType`](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md#conditionalruleserverflagtype)

#### Inherited from

[IConditionalRuleSetRawJSONDataBaseType](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataBaseType.md).[serverFlag](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataBaseType.md#serverflag)

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:56](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L56)

___

### value

• **value**: [`PropertyDefinitionValueType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition.md#propertydefinitionvaluetype)

the value to be compared against, either a value itself, or alternatively, a property

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:83](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L83)

___

### valueAttribute

• `Optional` **valueAttribute**: `string`

the attribute of the value, if any that is used to compare against
with the comparator, rather than the value of itself

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:88](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L88)
