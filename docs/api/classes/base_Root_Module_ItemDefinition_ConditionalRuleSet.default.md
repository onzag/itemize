[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition/ConditionalRuleSet](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md) / default

# Class: default

[base/Root/Module/ItemDefinition/ConditionalRuleSet](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md).default

This class provides conditional rule sets that are set for
an specific situation to take place, it has multiple uses
like disabling an item, or making a property a certain value
conditional rule sets are chainable and represents rules
based on properties or items

for example say we have an item vehicle and which one is
motorbike and a motorbike might have a belt, chain or shaft
lets say we also decided to add a property drive-type to
the vehicle class

So we make a rule for this

```
{
 "name": "belt",
 "excludedIf": {
   "property": "type",
   "comparator": "not-equal",
   "value": "motorbike",
   "gate": "or",
   "condition": {
     "property": "drive-type",
     "comparator": "not-equal",
     "value": {
       "exactValue": "belt-drive"
     }
   }
 }
}
```

Conditional rule sets are chainable and might also include
components, components are the same as items, for example

```
{
 "name": "belt-keeper",
 "excludedIf": {
   "component": "belt",
   "isIncluded": false
 }
}
```

This means that the belt-keeper item is not available if there is no such
thing as a belt included

Rule sets are also available for things like properties, whether they
are available or not, default values, might exclusions, etc... they
are very practical, but limited on purpose to avoid excessive complexity

## Table of contents

### Constructors

- [constructor](base_Root_Module_ItemDefinition_ConditionalRuleSet.default.md#constructor)

### Properties

- [conditions](base_Root_Module_ItemDefinition_ConditionalRuleSet.default.md#conditions)
- [parentInclude](base_Root_Module_ItemDefinition_ConditionalRuleSet.default.md#parentinclude)
- [parentItemDefinition](base_Root_Module_ItemDefinition_ConditionalRuleSet.default.md#parentitemdefinition)
- [parentModule](base_Root_Module_ItemDefinition_ConditionalRuleSet.default.md#parentmodule)
- [parentPropertyDefinition](base_Root_Module_ItemDefinition_ConditionalRuleSet.default.md#parentpropertydefinition)
- [rawData](base_Root_Module_ItemDefinition_ConditionalRuleSet.default.md#rawdata)

### Methods

- [evaluate](base_Root_Module_ItemDefinition_ConditionalRuleSet.default.md#evaluate)

## Constructors

### constructor

• **new default**(`rawJSON`, `parentModule`, `parentItemDefinition`, `parentPropertyDefinition`, `parentInclude`): [`default`](base_Root_Module_ItemDefinition_ConditionalRuleSet.default.md)

Constructor

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rawJSON` | [`IConditionalRuleSetRawJSONDataType`](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md#iconditionalrulesetrawjsondatatype) | the raw data as JSON |
| `parentModule` | [`default`](base_Root_Module.default.md) | the module where this node is located |
| `parentItemDefinition` | [`default`](base_Root_Module_ItemDefinition.default.md) | the item definition that this node is |
| `parentPropertyDefinition` | [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property definition that contains the rule located, it might not be available for example for condition in prop extensions |
| `parentInclude` | [`default`](base_Root_Module_ItemDefinition_Include.default.md) | the item that contains this condition, such as in exclusion rules, it might not be available as well |

#### Returns

[`default`](base_Root_Module_ItemDefinition_ConditionalRuleSet.default.md)

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:208](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L208)

## Properties

### conditions

• `Private` **conditions**: [`default`](base_Root_Module_ItemDefinition_ConditionalRuleSet.default.md)[]

an internal condition for nested conditions

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:195](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L195)

___

### parentInclude

• **parentInclude**: [`default`](base_Root_Module_ItemDefinition_Include.default.md)

a parent include, if available, might be null

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:186](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L186)

___

### parentItemDefinition

• **parentItemDefinition**: [`default`](base_Root_Module_ItemDefinition.default.md)

the item definition where it is contained

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:178](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L178)

___

### parentModule

• **parentModule**: [`default`](base_Root_Module.default.md)

the parent module of this condition

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:174](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L174)

___

### parentPropertyDefinition

• **parentPropertyDefinition**: [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

the property that it is contained within, might be null for prop extensions

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:182](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L182)

___

### rawData

• **rawData**: [`IConditionalRuleSetRawJSONDataType`](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md#iconditionalrulesetrawjsondatatype)

the raw data that was used to generate this conditional rule set

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:190](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L190)

## Methods

### evaluate

▸ **evaluate**(`id`, `version`): `boolean`

Evaluates the result of the conditional value as this current point
as defined by the item defintion

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id to be used to retrieve values for properties during evaluation |
| `version` | `string` | the version used to retrieve values as well |

#### Returns

`boolean`

a boolean on whether the conditional rule set passes or not

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts:243](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/ConditionalRuleSet/index.ts#L243)
