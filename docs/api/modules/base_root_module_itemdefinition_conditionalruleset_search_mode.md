[](../README.md) / [Exports](../modules.md) / base/Root/Module/ItemDefinition/ConditionalRuleSet/search-mode

# Module: base/Root/Module/ItemDefinition/ConditionalRuleSet/search-mode

This file builds the search mode for a conditional rule set as when the
module tries to convert a module into its search form, this file contains
the instructions specific to the conditional rule set conversion

## Table of contents

### Functions

- [buildSearchModeConditionalRuleSet](base_root_module_itemdefinition_conditionalruleset_search_mode.md#buildsearchmodeconditionalruleset)
- [getConversionRulesetId](base_root_module_itemdefinition_conditionalruleset_search_mode.md#getconversionrulesetid)

## Functions

### buildSearchModeConditionalRuleSet

▸ **buildSearchModeConditionalRuleSet**(`rawData`: [*IConditionalRuleSetRawJSONDataType*](base_root_module_itemdefinition_conditionalruleset.md#iconditionalrulesetrawjsondatatype), `otherKnownProperties`: { [id: string]: [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md);  }): [*IConditionalRuleSetRawJSONDataType*](base_root_module_itemdefinition_conditionalruleset.md#iconditionalrulesetrawjsondatatype)

Converts a conditional rule set to a search mode, or collapses if it's
not able to manage to do so

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawData` | [*IConditionalRuleSetRawJSONDataType*](base_root_module_itemdefinition_conditionalruleset.md#iconditionalrulesetrawjsondatatype) | the raw data for the conditional rule set   |
`otherKnownProperties` | *object* | the properties this set has access to   |

**Returns:** [*IConditionalRuleSetRawJSONDataType*](base_root_module_itemdefinition_conditionalruleset.md#iconditionalrulesetrawjsondatatype)

a raw conditional rule set that is the search mode form of this ruleset

Defined in: [base/Root/Module/ItemDefinition/ConditionalRuleSet/search-mode.ts:36](https://github.com/onzag/itemize/blob/55e63f2c/base/Root/Module/ItemDefinition/ConditionalRuleSet/search-mode.ts#L36)

___

### getConversionRulesetId

▸ **getConversionRulesetId**(`rawData`: [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md)): *string*

Gives the id for a property that would be referred to in search mode
for a ruleset, just takes the first result, aka FROM and LOCATION, but
ignores TO and RADIUS

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawData` | [*IPropertyDefinitionRawJSONDataType*](../interfaces/base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md) | the property raw data    |

**Returns:** *string*

Defined in: [base/Root/Module/ItemDefinition/ConditionalRuleSet/search-mode.ts:19](https://github.com/onzag/itemize/blob/55e63f2c/base/Root/Module/ItemDefinition/ConditionalRuleSet/search-mode.ts#L19)
