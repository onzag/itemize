[](../README.md) / [Exports](../modules.md) / base/Root/Module/ItemDefinition/search-mode

# Module: base/Root/Module/ItemDefinition/search-mode

This file specifies how search mode for item definitions are built
given its raw data

## Table of contents

### Functions

- [buildSearchModeItemDefinition](base_root_module_itemdefinition_search_mode.md#buildsearchmodeitemdefinition)

## Functions

### buildSearchModeItemDefinition

▸ **buildSearchModeItemDefinition**(`rawData`: [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md), `modulePropExtensions`: { [id: string]: [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md);  }, `originalModule`: [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md)): [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md)

This builds item definitions

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawData` | [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md) | the raw data for the item definition   |
`modulePropExtensions` | *object* | the prop extensions coming from the module   |
`originalModule` | [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md) | and the original module that brought those extensions   |

**Returns:** [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md)

a raw json item definition form that represents the search mode

Defined in: [base/Root/Module/ItemDefinition/search-mode.ts:22](https://github.com/onzag/itemize/blob/11a98dec/base/Root/Module/ItemDefinition/search-mode.ts#L22)
