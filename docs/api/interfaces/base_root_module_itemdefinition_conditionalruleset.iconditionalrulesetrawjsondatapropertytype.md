[](../README.md) / [Exports](../modules.md) / [base/Root/Module/ItemDefinition/ConditionalRuleSet](../modules/base_root_module_itemdefinition_conditionalruleset.md) / IConditionalRuleSetRawJSONDataPropertyType

# Interface: IConditionalRuleSetRawJSONDataPropertyType

[base/Root/Module/ItemDefinition/ConditionalRuleSet](../modules/base_root_module_itemdefinition_conditionalruleset.md).IConditionalRuleSetRawJSONDataPropertyType

this is the raw json of a conditional rule set

## Hierarchy

* *IConditionalRuleSetRawJSONDataBaseType*

  ↳ **IConditionalRuleSetRawJSONDataPropertyType**

## Table of contents

### Properties

- [attribute](base_root_module_itemdefinition_conditionalruleset.iconditionalrulesetrawjsondatapropertytype.md#attribute)
- [comparator](base_root_module_itemdefinition_conditionalruleset.iconditionalrulesetrawjsondatapropertytype.md#comparator)
- [condition](base_root_module_itemdefinition_conditionalruleset.iconditionalrulesetrawjsondatapropertytype.md#condition)
- [gate](base_root_module_itemdefinition_conditionalruleset.iconditionalrulesetrawjsondatapropertytype.md#gate)
- [method](base_root_module_itemdefinition_conditionalruleset.iconditionalrulesetrawjsondatapropertytype.md#method)
- [property](base_root_module_itemdefinition_conditionalruleset.iconditionalrulesetrawjsondatapropertytype.md#property)
- [serverFlag](base_root_module_itemdefinition_conditionalruleset.iconditionalrulesetrawjsondatapropertytype.md#serverflag)
- [value](base_root_module_itemdefinition_conditionalruleset.iconditionalrulesetrawjsondatapropertytype.md#value)
- [valueAttribute](base_root_module_itemdefinition_conditionalruleset.iconditionalrulesetrawjsondatapropertytype.md#valueattribute)

## Properties

### attribute

• `Optional` **attribute**: *string*

the attribute of that property, as some properties are objects

Defined in: [base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:70](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L70)

___

### comparator

• **comparator**: [*ConditionalRuleComparatorType*](../modules/base_root_module_itemdefinition_conditionalruleset.md#conditionalrulecomparatortype)

the comparator, equal, greater than, etc...

Defined in: [base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:78](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L78)

___

### condition

• `Optional` **condition**: [*IConditionalRuleSetRawJSONDataType*](../modules/base_root_module_itemdefinition_conditionalruleset.md#iconditionalrulesetrawjsondatatype)

Defined in: [base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:54](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L54)

___

### gate

• `Optional` **gate**: [*ConditionalRuleGateType*](../modules/base_root_module_itemdefinition_conditionalruleset.md#conditionalrulegatetype)

Defined in: [base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:53](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L53)

___

### method

• `Optional` **method**: *string* \| *default* \| *date* \| *datetime* \| *time*

the method, default, string or datetime (uses Date)

Defined in: [base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:74](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L74)

___

### property

• **property**: *string*

the property to be compared

Defined in: [base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:66](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L66)

___

### serverFlag

• `Optional` **serverFlag**: [*ConditionalRuleServerFlagType*](../modules/base_root_module_itemdefinition_conditionalruleset.md#conditionalruleserverflagtype)

Defined in: [base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:55](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L55)

___

### value

• **value**: [*PropertyDefinitionValueType*](../modules/base_root_module_itemdefinition_propertydefinition.md#propertydefinitionvaluetype)

the value to be compared against, either a value itself, or alternatively, a property

Defined in: [base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:82](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L82)

___

### valueAttribute

• `Optional` **valueAttribute**: *string*

the attribute of the value, if any

Defined in: [base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:86](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L86)
