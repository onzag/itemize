[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition/Include](../modules/base_Root_Module_ItemDefinition_Include.md) / IIncludeRawJSONDataType

# Interface: IIncludeRawJSONDataType

[base/Root/Module/ItemDefinition/Include](../modules/base_Root_Module_ItemDefinition_Include.md).IIncludeRawJSONDataType

This is the raw json that comes from the json file that defines the schema

## Table of contents

### Properties

- [canUserExclude](base_Root_Module_ItemDefinition_Include.IIncludeRawJSONDataType.md#canuserexclude)
- [canUserExcludeIf](base_Root_Module_ItemDefinition_Include.IIncludeRawJSONDataType.md#canuserexcludeif)
- [defaultExcluded](base_Root_Module_ItemDefinition_Include.IIncludeRawJSONDataType.md#defaultexcluded)
- [defaultExcludedIf](base_Root_Module_ItemDefinition_Include.IIncludeRawJSONDataType.md#defaultexcludedif)
- [definition](base_Root_Module_ItemDefinition_Include.IIncludeRawJSONDataType.md#definition)
- [disableSearch](base_Root_Module_ItemDefinition_Include.IIncludeRawJSONDataType.md#disablesearch)
- [enforcedProperties](base_Root_Module_ItemDefinition_Include.IIncludeRawJSONDataType.md#enforcedproperties)
- [excludedIf](base_Root_Module_ItemDefinition_Include.IIncludeRawJSONDataType.md#excludedif)
- [exclusionIsCallout](base_Root_Module_ItemDefinition_Include.IIncludeRawJSONDataType.md#exclusioniscallout)
- [i18nData](base_Root_Module_ItemDefinition_Include.IIncludeRawJSONDataType.md#i18ndata)
- [id](base_Root_Module_ItemDefinition_Include.IIncludeRawJSONDataType.md#id)
- [predefinedProperties](base_Root_Module_ItemDefinition_Include.IIncludeRawJSONDataType.md#predefinedproperties)
- [sinkIn](base_Root_Module_ItemDefinition_Include.IIncludeRawJSONDataType.md#sinkin)
- [ternaryExclusionState](base_Root_Module_ItemDefinition_Include.IIncludeRawJSONDataType.md#ternaryexclusionstate)

## Properties

### canUserExclude

• `Optional` **canUserExclude**: `boolean`

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:94](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/Include/index.ts#L94)

___

### canUserExcludeIf

• `Optional` **canUserExcludeIf**: [`IConditionalRuleSetRawJSONDataType`](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md#iconditionalrulesetrawjsondatatype)

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:95](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/Include/index.ts#L95)

___

### defaultExcluded

• `Optional` **defaultExcluded**: `boolean`

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:96](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/Include/index.ts#L96)

___

### defaultExcludedIf

• `Optional` **defaultExcludedIf**: [`IConditionalRuleSetRawJSONDataType`](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md#iconditionalrulesetrawjsondatatype)

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:97](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/Include/index.ts#L97)

___

### definition

• **definition**: `string`

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:79](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/Include/index.ts#L79)

___

### disableSearch

• `Optional` **disableSearch**: `boolean`

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:101](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/Include/index.ts#L101)

___

### enforcedProperties

• `Optional` **enforcedProperties**: [`IPropertiesValueMappingDefinitonRawJSONDataType`](base_Root_Module_ItemDefinition_PropertiesValueMappingDefiniton.IPropertiesValueMappingDefinitonRawJSONDataType.md)

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:91](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/Include/index.ts#L91)

___

### excludedIf

• `Optional` **excludedIf**: [`IConditionalRuleSetRawJSONDataType`](../modules/base_Root_Module_ItemDefinition_ConditionalRuleSet.md#iconditionalrulesetrawjsondatatype)

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:93](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/Include/index.ts#L93)

___

### exclusionIsCallout

• `Optional` **exclusionIsCallout**: `boolean`

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:100](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/Include/index.ts#L100)

___

### i18nData

• `Optional` **i18nData**: `Object`

#### Index signature

▪ [locale: `string`]: \{ `any_label?`: `string` ; `callout_excluded_label?`: `string` ; `excluded_label?`: `string` ; `exclusion_selector_label?`: `string` ; `exclusion_ternary_selector_label?`: `string` ; `included_label?`: `string` ; `name?`: `string`  }

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:80](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/Include/index.ts#L80)

___

### id

• **id**: `string`

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:78](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/Include/index.ts#L78)

___

### predefinedProperties

• `Optional` **predefinedProperties**: [`IPropertiesValueMappingDefinitonRawJSONDataType`](base_Root_Module_ItemDefinition_PropertiesValueMappingDefiniton.IPropertiesValueMappingDefinitonRawJSONDataType.md)

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:92](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/Include/index.ts#L92)

___

### sinkIn

• `Optional` **sinkIn**: `string`[]

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:102](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/Include/index.ts#L102)

___

### ternaryExclusionState

• `Optional` **ternaryExclusionState**: `boolean`

#### Defined in

[base/Root/Module/ItemDefinition/Include/index.ts:98](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/Include/index.ts#L98)
