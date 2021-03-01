[](../README.md) / [Exports](../modules.md) / [base/Root/Module/ItemDefinition/ConditionalRuleSet](../modules/base_root_module_itemdefinition_conditionalruleset.md) / IConditionalRuleSetRawJSONDataIncludeType

# Interface: IConditionalRuleSetRawJSONDataIncludeType

[base/Root/Module/ItemDefinition/ConditionalRuleSet](../modules/base_root_module_itemdefinition_conditionalruleset.md).IConditionalRuleSetRawJSONDataIncludeType

this represents rules that are built for includes

## Hierarchy

* *IConditionalRuleSetRawJSONDataBaseType*

  ↳ **IConditionalRuleSetRawJSONDataIncludeType**

## Table of contents

### Properties

- [condition](base_root_module_itemdefinition_conditionalruleset.iconditionalrulesetrawjsondataincludetype.md#condition)
- [gate](base_root_module_itemdefinition_conditionalruleset.iconditionalrulesetrawjsondataincludetype.md#gate)
- [include](base_root_module_itemdefinition_conditionalruleset.iconditionalrulesetrawjsondataincludetype.md#include)
- [isIncluded](base_root_module_itemdefinition_conditionalruleset.iconditionalrulesetrawjsondataincludetype.md#isincluded)
- [serverFlag](base_root_module_itemdefinition_conditionalruleset.iconditionalrulesetrawjsondataincludetype.md#serverflag)

## Properties

### condition

• `Optional` **condition**: [*IConditionalRuleSetRawJSONDataType*](../modules/base_root_module_itemdefinition_conditionalruleset.md#iconditionalrulesetrawjsondatatype)

Defined in: [base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:54](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L54)

___

### gate

• `Optional` **gate**: [*ConditionalRuleGateType*](../modules/base_root_module_itemdefinition_conditionalruleset.md#conditionalrulegatetype)

Defined in: [base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:53](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L53)

___

### include

• **include**: *string*

includes can either by matched by id or by name
the id of an include is unique, and is matched by using #identifier
and the name just doesn't include the numeral

Defined in: [base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:99](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L99)

___

### isIncluded

• **isIncluded**: *boolean*

the inclusion state expected for the conditional rule to apply

Defined in: [base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:103](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L103)

___

### serverFlag

• `Optional` **serverFlag**: [*ConditionalRuleServerFlagType*](../modules/base_root_module_itemdefinition_conditionalruleset.md#conditionalruleserverflagtype)

Defined in: [base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:55](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L55)
