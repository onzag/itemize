[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition/ConditionalRuleSet](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md) / IConditionalRuleSetRawJSONDataIncludeType

# Interface: IConditionalRuleSetRawJSONDataIncludeType

[base/Root/Module/ItemDefinition/ConditionalRuleSet](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md).IConditionalRuleSetRawJSONDataIncludeType

this represents rules that are built for includes

## Hierarchy

- `IConditionalRuleSetRawJSONDataBaseType`

  ↳ **`IConditionalRuleSetRawJSONDataIncludeType`**

## Table of contents

### Properties

- [condition](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataIncludeType.md#condition)
- [gate](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataIncludeType.md#gate)
- [include](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataIncludeType.md#include)
- [isIncluded](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataIncludeType.md#isincluded)
- [serverFlag](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataIncludeType.md#serverflag)

## Properties

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

### include

• **include**: `string`

includes can either by matched by id or by name
the id of an include is unique, and is matched by using #identifier
and the name just doesn't include the numeral

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:100](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L100)

___

### isIncluded

• **isIncluded**: `boolean`

the inclusion state expected for the conditional rule to apply

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:104](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L104)

___

### serverFlag

• `Optional` **serverFlag**: [`ConditionalRuleServerFlagType`](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md#conditionalruleserverflagtype)

#### Inherited from

IConditionalRuleSetRawJSONDataBaseType.serverFlag

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:55](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L55)
