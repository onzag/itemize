[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/search-mode

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/search-mode

Builds the search mode of a property definition that is used within
the search module for used within searches, basically this is an alternative
item definition and alternative property that is used during searches

## Table of contents

### Functions

- [buildSearchModePaymentProperty](base_Root_Module_ItemDefinition_PropertyDefinition_search_mode.md#buildsearchmodepaymentproperty)
- [buildSearchModePropertyDefinitions](base_Root_Module_ItemDefinition_PropertyDefinition_search_mode.md#buildsearchmodepropertydefinitions)
- [getConversionIds](base_Root_Module_ItemDefinition_PropertyDefinition_search_mode.md#getconversionids)

## Functions

### buildSearchModePaymentProperty

▸ **buildSearchModePaymentProperty**(`newPropDef`, `rootI8nData`): [`IPropertyDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `newPropDef` | [`IPropertyDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md) |
| `rootI8nData` | [`Ii18NType`](../interfaces/base_Root.Ii18NType.md) |

#### Returns

[`IPropertyDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md)[]

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/search-mode.ts:118](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/search-mode.ts#L118)

___

### buildSearchModePropertyDefinitions

▸ **buildSearchModePropertyDefinitions**(`rawData`, `otherKnownProperties`, `rootI8nData`): [`IPropertyDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md)[]

Builds a property definition to its search mode

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rawData` | [`IPropertyDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md) | the raw property definition source |
| `otherKnownProperties` | `Object` | the object with the other known properties that this one can see |
| `rootI8nData` | [`Ii18NType`](../interfaces/base_Root.Ii18NType.md) | the root i18n data |

#### Returns

[`IPropertyDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md)[]

an array of property definitions

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/search-mode.ts:256](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/search-mode.ts#L256)

___

### getConversionIds

▸ **getConversionIds**(`rawData`, `noConflict?`): `string`[]

Provides all the ids that a property would be referred to in search mode

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rawData` | [`IPropertyDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md) | the raw property |
| `noConflict?` | `boolean` | in search mode when used some of these search ways can be conflicting with each other used only in case of string, when you can use SEARCH or IN, but both are conflicting and shouldn't be used together this is used mainly for usability |

#### Returns

`string`[]

an array of string for the ids in search mode for the property

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/search-mode.ts:27](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/search-mode.ts#L27)
