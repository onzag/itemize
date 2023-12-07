[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition

# Module: base/Root/Module/ItemDefinition/PropertyDefinition

This file contains the property definition that defines all the interactions
that occur within a property of an item

## Table of contents

### Enumerations

- [PropertyInvalidReason](../enums/base_Root_Module_ItemDefinition_PropertyDefinition.PropertyInvalidReason.md)

### Classes

- [default](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

### Interfaces

- [IPropertyDefinitionExactPropertyValue](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionExactPropertyValue.md)
- [IPropertyDefinitionInvalidRuleDataType](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionInvalidRuleDataType.md)
- [IPropertyDefinitionRawJSONDataType](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md)
- [IPropertyDefinitionRawJSONInvalidRuleDataType](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONInvalidRuleDataType.md)
- [IPropertyDefinitionRawJSONRuleDataType](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONRuleDataType.md)
- [IPropertyDefinitionReferredPropertyValue](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionReferredPropertyValue.md)
- [IPropertyDefinitionRuleDataType](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRuleDataType.md)
- [IPropertyDefinitionState](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)

### Type aliases

- [PropertyDefinitionCheckerFunctionType](base_Root_Module_ItemDefinition_PropertyDefinition.md#propertydefinitioncheckerfunctiontype)
- [PropertyDefinitionValueType](base_Root_Module_ItemDefinition_PropertyDefinition.md#propertydefinitionvaluetype)

## Type aliases

### PropertyDefinitionCheckerFunctionType

Ƭ **PropertyDefinitionCheckerFunctionType**: (`itemDefinition`: [`default`](../classes/base_Root_Module_ItemDefinition.default.md), `include`: [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md), `property`: [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md), `value`: [`PropertyDefinitionSupportedType`](base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype), `id`: `string`, `version`: `string`) => `Promise`<`boolean`\>

#### Type declaration

▸ (`itemDefinition`, `include`, `property`, `value`, `id`, `version`): `Promise`<`boolean`\>

Represents the external checkers that are used to
check index values

##### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) |
| `property` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |
| `value` | [`PropertyDefinitionSupportedType`](base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) |
| `id` | `string` |
| `version` | `string` |

##### Returns

`Promise`<`boolean`\>

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:399](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L399)

___

### PropertyDefinitionValueType

Ƭ **PropertyDefinitionValueType**: [`IPropertyDefinitionExactPropertyValue`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionExactPropertyValue.md) \| [`IPropertyDefinitionReferredPropertyValue`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionReferredPropertyValue.md)

And this is combined

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/index.ts:391](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/index.ts#L391)
