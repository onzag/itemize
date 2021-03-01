[](../README.md) / [Exports](../modules.md) / builder/checkers

# Module: builder/checkers

Contains checker functions that check the structure of the itemize schema
regarding things and correlations that might have been missed by the
ajv schema checker (because not everything can be setup as a json schema)
eg. interactions, imports, etc...

## Table of contents

### Functions

- [checkConditionalRuleSet](builder_checkers.md#checkconditionalruleset)
- [checkI18nCustomConsistency](builder_checkers.md#checki18ncustomconsistency)
- [checkInclude](builder_checkers.md#checkinclude)
- [checkItemDefinition](builder_checkers.md#checkitemdefinition)
- [checkModule](builder_checkers.md#checkmodule)
- [checkPropertiesValueMappingDefiniton](builder_checkers.md#checkpropertiesvaluemappingdefiniton)
- [checkPropertyDefinition](builder_checkers.md#checkpropertydefinition)
- [checkRoot](builder_checkers.md#checkroot)
- [checkUserItem](builder_checkers.md#checkuseritem)
- [checkUsersModule](builder_checkers.md#checkusersmodule)

## Functions

### checkConditionalRuleSet

▸ **checkConditionalRuleSet**(`rawData`: [*IConditionalRuleSetRawJSONDataType*](base_root_module_itemdefinition_conditionalruleset.md#iconditionalrulesetrawjsondatatype), `parentItemDefinition`: [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md), `parentModule`: [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md), `traceback`: [*default*](../classes/builder_traceback.default.md)): *void*

Checks a conditional rule set so that it is valid and contains valid
includes and rules

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawData` | [*IConditionalRuleSetRawJSONDataType*](base_root_module_itemdefinition_conditionalruleset.md#iconditionalrulesetrawjsondatatype) | the raw data of the conditional rule set   |
`parentItemDefinition` | [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md) | the parent item definition where the ruleset resides (if any, it is null for prop extensions)   |
`parentModule` | [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md) | the parent module where the ruleset resides   |
`traceback` | [*default*](../classes/builder_traceback.default.md) | the traceback object    |

**Returns:** *void*

Defined in: [builder/checkers.ts:53](https://github.com/onzag/itemize/blob/28218320/builder/checkers.ts#L53)

___

### checkI18nCustomConsistency

▸ **checkI18nCustomConsistency**(`rawData`: [*IRawJSONI18NDataType*](../interfaces/base_root_module.irawjsoni18ndatatype.md), `isUserIdef`: *boolean*, `traceback`: [*default*](../classes/builder_traceback.default.md)): *void*

Checks the i18n data consistency of custom keys
so that they are present in all languages

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawData` | [*IRawJSONI18NDataType*](../interfaces/base_root_module.irawjsoni18ndatatype.md) | the raw i18n data   |
`isUserIdef` | *boolean* | - |
`traceback` | [*default*](../classes/builder_traceback.default.md) | the traceback already pointing to this file the i18n data comes from a .properties file which cannot be pointed    |

**Returns:** *void*

Defined in: [builder/checkers.ts:1115](https://github.com/onzag/itemize/blob/28218320/builder/checkers.ts#L1115)

___

### checkInclude

▸ **checkInclude**(`rawData`: [*IIncludeRawJSONDataType*](../interfaces/base_root_module_itemdefinition_include.iincluderawjsondatatype.md), `parentItemDefinition`: [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md), `parentModule`: [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md), `idPool`: *string*[], `traceback`: [*default*](../classes/builder_traceback.default.md)): *void*

Checks an include that exist within the item definition, include represents
inclusion of properties as an sub item within another item, it's like prop
extensions but in reverse

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawData` | [*IIncludeRawJSONDataType*](../interfaces/base_root_module_itemdefinition_include.iincluderawjsondatatype.md) | the raw data of the include   |
`parentItemDefinition` | [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md) | the parent item definition that contains the include   |
`parentModule` | [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md) | the parent module that contains the item definition   |
`idPool` | *string*[] | the id pool is a referred array that checks that there are no duplicate includes with the same id   |
`traceback` | [*default*](../classes/builder_traceback.default.md) | the traceback already pointing to this include    |

**Returns:** *void*

Defined in: [builder/checkers.ts:519](https://github.com/onzag/itemize/blob/28218320/builder/checkers.ts#L519)

___

### checkItemDefinition

▸ **checkItemDefinition**(`rawRootData`: [*IRootRawJSONDataType*](../interfaces/base_root.irootrawjsondatatype.md), `rawData`: [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md), `parentModule`: [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md), `traceback`: [*default*](../classes/builder_traceback.default.md)): *void*

Checks an item definition so that all its imports, name, and so on
do match the specification as it is required

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawRootData` | [*IRootRawJSONDataType*](../interfaces/base_root.irootrawjsondatatype.md) | the root data   |
`rawData` | [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md) | the item definition data   |
`parentModule` | [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md) | the raw parent module   |
`traceback` | [*default*](../classes/builder_traceback.default.md) | the traceback object    |

**Returns:** *void*

Defined in: [builder/checkers.ts:168](https://github.com/onzag/itemize/blob/28218320/builder/checkers.ts#L168)

___

### checkModule

▸ **checkModule**(`rawRootData`: [*IRootRawJSONDataType*](../interfaces/base_root.irootrawjsondatatype.md), `rawData`: [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md), `traceback`: [*default*](../classes/builder_traceback.default.md)): *void*

Checks a module for consistency as well as all its prop extensions

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawRootData` | [*IRootRawJSONDataType*](../interfaces/base_root.irootrawjsondatatype.md) | the root data where this module is located   |
`rawData` | [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md) | the raw data of the module itself   |
`traceback` | [*default*](../classes/builder_traceback.default.md) | the traceback object    |

**Returns:** *void*

Defined in: [builder/checkers.ts:1184](https://github.com/onzag/itemize/blob/28218320/builder/checkers.ts#L1184)

___

### checkPropertiesValueMappingDefiniton

▸ **checkPropertiesValueMappingDefiniton**(`rawData`: [*IPropertiesValueMappingDefinitonRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertiesvaluemappingdefiniton.ipropertiesvaluemappingdefinitonrawjsondatatype.md), `parentItemDefinition`: [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md), `referredItemDefinition`: [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md), `parentModule`: [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md), `traceback`: [*default*](../classes/builder_traceback.default.md)): *void*

Checks the properties value mapping definition that is in use
by predefined and enforced properties

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawData` | [*IPropertiesValueMappingDefinitonRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertiesvaluemappingdefiniton.ipropertiesvaluemappingdefinitonrawjsondatatype.md) | the raw data of that value mapping   |
`parentItemDefinition` | [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md) | the parent item definition   |
`referredItemDefinition` | [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md) | the referred item definition it refers to as this is used within includes   |
`parentModule` | [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md) | the parent module of both item definitions   |
`traceback` | [*default*](../classes/builder_traceback.default.md) | the traceback already pointing to this mapping    |

**Returns:** *void*

Defined in: [builder/checkers.ts:676](https://github.com/onzag/itemize/blob/28218320/builder/checkers.ts#L676)

___

### checkPropertyDefinition

▸ **checkPropertyDefinition**(`rawData`: [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md), `parentItemDefinition`: [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md), `parentModule`: [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md), `traceback`: [*default*](../classes/builder_traceback.default.md)): *void*

Checks a property definition to ensure consistency

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawData` | [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md) | the raw data of the property   |
`parentItemDefinition` | [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md) | the parent item definition where the property is contained if any, as it could be a prop extension   |
`parentModule` | [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md) | the parent module   |
`traceback` | [*default*](../classes/builder_traceback.default.md) | the traceback already pointing to this property    |

**Returns:** *void*

Defined in: [builder/checkers.ts:776](https://github.com/onzag/itemize/blob/28218320/builder/checkers.ts#L776)

___

### checkRoot

▸ **checkRoot**(`rawData`: [*IRootRawJSONDataType*](../interfaces/base_root.irootrawjsondatatype.md)): *void*

Checks the entire root of the itemize schema

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawData` | [*IRootRawJSONDataType*](../interfaces/base_root.irootrawjsondatatype.md) | the root    |

**Returns:** *void*

Defined in: [builder/checkers.ts:1474](https://github.com/onzag/itemize/blob/28218320/builder/checkers.ts#L1474)

___

### checkUserItem

▸ **checkUserItem**(`rawData`: [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md), `traceback`: [*default*](../classes/builder_traceback.default.md)): *void*

Check the item definition for the user type to what
itemize expects and needs from it

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawData` | [*IItemDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition.iitemdefinitionrawjsondatatype.md) | the raw user item definition   |
`traceback` | [*default*](../classes/builder_traceback.default.md) | the traceback for it    |

**Returns:** *void*

Defined in: [builder/checkers.ts:1369](https://github.com/onzag/itemize/blob/28218320/builder/checkers.ts#L1369)

___

### checkUsersModule

▸ **checkUsersModule**(`rawData`: [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md), `traceback`: [*default*](../classes/builder_traceback.default.md)): *void*

Checks the user module for consistance to what the itemize
app expects from it

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawData` | [*IModuleRawJSONDataType*](../interfaces/base_root_module.imodulerawjsondatatype.md) | the raw user module   |
`traceback` | [*default*](../classes/builder_traceback.default.md) | traceback for it    |

**Returns:** *void*

Defined in: [builder/checkers.ts:1446](https://github.com/onzag/itemize/blob/28218320/builder/checkers.ts#L1446)
