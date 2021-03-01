[](../README.md) / [Exports](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/search-mode

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/search-mode

Builds the search mode of a property definition that is used within
the search module for used within searches, basically this is an alternative
item definition and alternative property that is used during searches

## Table of contents

### Functions

- [buildSearchModePropertyDefinitions](base_root_module_itemdefinition_propertydefinition_search_mode.md#buildsearchmodepropertydefinitions)
- [getConversionIds](base_root_module_itemdefinition_propertydefinition_search_mode.md#getconversionids)

## Functions

### buildSearchModePropertyDefinitions

▸ **buildSearchModePropertyDefinitions**(`rawData`: [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md), `otherKnownProperties`: { [id: string]: [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md);  }): [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md)[]

Builds a property definition to its search mode

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawData` | [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md) | the raw property definition source   |
`otherKnownProperties` | *object* | the object with the other known properties that this one can see   |

**Returns:** [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md)[]

an array of property definitions

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/search-mode.ts:86](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/ItemDefinition/PropertyDefinition/search-mode.ts#L86)

___

### getConversionIds

▸ **getConversionIds**(`rawData`: [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md)): *string*[]

Provides all the ids that a property would be referred to in search mode

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawData` | [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md) | the raw property   |

**Returns:** *string*[]

an array of string for the ids in search mode for the property

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/search-mode.ts:22](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/ItemDefinition/PropertyDefinition/search-mode.ts#L22)
