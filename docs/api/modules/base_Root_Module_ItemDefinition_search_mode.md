[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/search-mode

# Module: base/Root/Module/ItemDefinition/search-mode

This file specifies how search mode for item definitions are built
given its raw data

## Table of contents

### Functions

- [buildSearchModeItemDefinition](base_Root_Module_ItemDefinition_search_mode.md#buildsearchmodeitemdefinition)

## Functions

### buildSearchModeItemDefinition

▸ **buildSearchModeItemDefinition**(`rawData`, `modulePropExtensions`, `originalModule`, `rootI18nData`): [`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md)

This builds item definitions

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rawData` | [`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md) | the raw data for the item definition |
| `modulePropExtensions` | `Object` | the prop extensions coming from the module |
| `originalModule` | [`IModuleRawJSONDataType`](../interfaces/base_Root_Module.IModuleRawJSONDataType.md) | and the original module that brought those extensions |
| `rootI18nData` | [`Ii18NType`](../interfaces/base_Root.Ii18NType.md) | - |

#### Returns

[`IItemDefinitionRawJSONDataType`](../interfaces/base_Root_Module_ItemDefinition.IItemDefinitionRawJSONDataType.md)

a raw json item definition form that represents the search mode

#### Defined in

[base/Root/Module/ItemDefinition/search-mode.ts:23](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/search-mode.ts#L23)
