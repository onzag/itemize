[](../README.md) / [Exports](../modules.md) / base/Root/Module/ItemDefinition/ConditionalRuleSet

# Module: base/Root/Module/ItemDefinition/ConditionalRuleSet

This file contains the critical code that runs the evaluation of the conditions
that are contained within an itemize schema

Related files are schema.ts and checkers.ts for the build process

## Table of contents

### Classes

- [default](../classes/base_root_module_itemdefinition_conditionalruleset.default.md)

### Interfaces

- [IConditionalRuleSetRawJSONDataIncludeType](../interfaces/base_root_module_itemdefinition_conditionalruleset.iconditionalrulesetrawjsondataincludetype.md)
- [IConditionalRuleSetRawJSONDataPropertyType](../interfaces/base_root_module_itemdefinition_conditionalruleset.iconditionalrulesetrawjsondatapropertytype.md)

### Type aliases

- [ConditionalRuleComparatorType](base_root_module_itemdefinition_conditionalruleset.md#conditionalrulecomparatortype)
- [ConditionalRuleGateType](base_root_module_itemdefinition_conditionalruleset.md#conditionalrulegatetype)
- [ConditionalRuleServerFlagType](base_root_module_itemdefinition_conditionalruleset.md#conditionalruleserverflagtype)
- [IConditionalRuleSetRawJSONDataType](base_root_module_itemdefinition_conditionalruleset.md#iconditionalrulesetrawjsondatatype)

## Type aliases

### ConditionalRuleComparatorType

Ƭ **ConditionalRuleComparatorType**: *equals* \| *not-equal* \| *greater-than* \| *less-than* \| *greater-or-equal-than* \| *less-or-equal-than*

Types for the conditions

Defined in: [base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:38](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L38)

___

### ConditionalRuleGateType

Ƭ **ConditionalRuleGateType**: *or* \| *and* \| *xor*

Types for the gates that are available

Defined in: [base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:43](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L43)

___

### ConditionalRuleServerFlagType

Ƭ **ConditionalRuleServerFlagType**: *CREATE_ONLY* \| *EDIT_ONLY* \| *SEARCH_ONLY*

Server flags available for the conditional rule set

Defined in: [base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:47](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L47)

___

### IConditionalRuleSetRawJSONDataType

Ƭ **IConditionalRuleSetRawJSONDataType**: [*IConditionalRuleSetRawJSONDataPropertyType*](../interfaces/base_root_module_itemdefinition_conditionalruleset.iconditionalrulesetrawjsondatapropertytype.md) \| [*IConditionalRuleSetRawJSONDataIncludeType*](../interfaces/base_root_module_itemdefinition_conditionalruleset.iconditionalrulesetrawjsondataincludetype.md)

both types of conditions combined

Defined in: [base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:109](https://github.com/onzag/itemize/blob/28218320/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L109)
