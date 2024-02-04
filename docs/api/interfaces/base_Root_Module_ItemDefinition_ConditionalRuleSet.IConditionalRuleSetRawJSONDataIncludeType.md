[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition/ConditionalRuleSet](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md) / IConditionalRuleSetRawJSONDataIncludeType

# Interface: IConditionalRuleSetRawJSONDataIncludeType

[base/Root/Module/ItemDefinition/ConditionalRuleSet](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md).IConditionalRuleSetRawJSONDataIncludeType

this represents rules that are built for includes

## Hierarchy

- [`IConditionalRuleSetRawJSONDataBaseType`](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataBaseType.md)

  ↳ **`IConditionalRuleSetRawJSONDataIncludeType`**

## Table of contents

### Properties

- [condition](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataIncludeType.md#condition)
- [gate](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataIncludeType.md#gate)
- [include](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataIncludeType.md#include)
- [internalConditionGate](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataIncludeType.md#internalconditiongate)
- [isIncluded](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataIncludeType.md#isincluded)
- [serverFlag](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataIncludeType.md#serverflag)

## Properties

### condition

• `Optional` **condition**: [`IConditionalRuleSetRawJSONDataType`](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md#iconditionalrulesetrawjsondatatype) \| [`IConditionalRuleSetRawJSONDataType`](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md#iconditionalrulesetrawjsondatatype)[]

#### Inherited from

[IConditionalRuleSetRawJSONDataBaseType](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataBaseType.md).[condition](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataBaseType.md#condition)

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:54](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L54)

___

### gate

• `Optional` **gate**: [`ConditionalRuleGateType`](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md#conditionalrulegatetype)

#### Inherited from

[IConditionalRuleSetRawJSONDataBaseType](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataBaseType.md).[gate](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataBaseType.md#gate)

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:53](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L53)

___

### include

• **include**: `string`

includes can either by matched by id or by name
the id of an include is unique, and is matched by using #identifier
and the name just doesn't include the numeral

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:101](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L101)

___

### internalConditionGate

• `Optional` **internalConditionGate**: [`ConditionalRuleGateType`](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md#conditionalrulegatetype)

#### Inherited from

[IConditionalRuleSetRawJSONDataBaseType](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataBaseType.md).[internalConditionGate](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataBaseType.md#internalconditiongate)

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:55](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L55)

___

### isIncluded

• **isIncluded**: `boolean`

the inclusion state expected for the conditional rule to apply

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:105](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L105)

___

### serverFlag

• `Optional` **serverFlag**: [`ConditionalRuleServerFlagType`](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md#conditionalruleserverflagtype)

#### Inherited from

[IConditionalRuleSetRawJSONDataBaseType](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataBaseType.md).[serverFlag](base_Root_Module_ItemDefinition_ConditionalRuleSet.IConditionalRuleSetRawJSONDataBaseType.md#serverflag)

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:56](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L56)
