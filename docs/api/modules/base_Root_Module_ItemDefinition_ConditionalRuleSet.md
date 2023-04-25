[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/ConditionalRuleSet

# Module: base/Root/Module/ItemDefinition/ConditionalRuleSet

This file contains the critical code that runs the evaluation of the conditions
that are contained within an itemize schema

Related files are schema.ts and checkers.ts for the build process

## Table of contents

### Classes

- [default](../classes/base_Root_Module_ItemDefinition_ConditionalRuleSet.default.md)

### Interfaces

- [IConditionalRuleSetRawJSONDataBaseType](../interfaces/base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataBaseType.md)
- [IConditionalRuleSetRawJSONDataIncludeType](../interfaces/base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataIncludeType.md)
- [IConditionalRuleSetRawJSONDataPropertyType](../interfaces/base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataPropertyType.md)

### Type aliases

- [ConditionalRuleComparatorType](base_Root_Module_ItemDefinition_ConditionalRuleSet.md#conditionalrulecomparatortype)
- [ConditionalRuleGateType](base_Root_Module_ItemDefinition_ConditionalRuleSet.md#conditionalrulegatetype)
- [ConditionalRuleServerFlagType](base_Root_Module_ItemDefinition_ConditionalRuleSet.md#conditionalruleserverflagtype)
- [IConditionalRuleSetRawJSONDataType](base_Root_Module_ItemDefinition_ConditionalRuleSet.md#iconditionalrulesetrawjsondatatype)

## Type aliases

### ConditionalRuleComparatorType

Ƭ **ConditionalRuleComparatorType**: ``"equals"`` \| ``"not-equal"`` \| ``"greater-than"`` \| ``"less-than"`` \| ``"greater-or-equal-than"`` \| ``"less-or-equal-than"``

Types for the conditions

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:38](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L38)

___

### ConditionalRuleGateType

Ƭ **ConditionalRuleGateType**: ``"or"`` \| ``"and"`` \| ``"xor"``

Types for the gates that are available

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:43](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L43)

___

### ConditionalRuleServerFlagType

Ƭ **ConditionalRuleServerFlagType**: ``"CREATE_ONLY"`` \| ``"EDIT_ONLY"`` \| ``"SEARCH_ONLY"``

Server flags available for the conditional rule set

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:47](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L47)

___

### IConditionalRuleSetRawJSONDataType

Ƭ **IConditionalRuleSetRawJSONDataType**: [`IConditionalRuleSetRawJSONDataBaseType`](../interfaces/base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataBaseType.md) \| [`IConditionalRuleSetRawJSONDataPropertyType`](../interfaces/base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataPropertyType.md) \| [`IConditionalRuleSetRawJSONDataIncludeType`](../interfaces/base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataIncludeType.md)

both types of conditions combined

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:111](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L111)
