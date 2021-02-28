[](../README.md) / [Exports](../modules.md) / base/Root/Module/ItemDefinition/Include/schema

# Module: base/Root/Module/ItemDefinition/Include/schema

This file contains the schema that is used to validate includes within the
item definition using the JSON Schema specification in the compile process

related files index.ts and checkers.ts

## Table of contents

### Properties

- [default](base_root_module_itemdefinition_include_schema.md#default)

## Properties

### default

• **default**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`$id` | *string* |
`additionalProperties` | *boolean* |
`definitions` | *object* |
`definitions.ConditionalRuleSet` | *object* |
`definitions.ConditionalRuleSet.$id` | *string* |
`definitions.ConditionalRuleSet.oneOf` | ({ `additionalProperties`: *boolean* = false; `dependencies`: { `condition`: *string*[] ; `gate`: *string*[]  } ; `properties`: { `attribute`: { `type`: *string* = "string" } ; `comparator`: { `enum`: *string*[] ; `type`: *string* = "string" } ; `component`: *undefined* ; `condition`: { `$ref`: *string* = "ConditionalRuleSet" } ; `gate`: { `enum`: *string*[] ; `type`: *string* = "string" } ; `isIncluded`: *undefined* ; `method`: { `enum`: *string*[] ; `type`: *string* = "string" } ; `property`: { `pattern`: *string* = "^[a-z\_]+$\|^&this$"; `type`: *string* = "string" } ; `serverFlag`: { `enum`: *string*[] ; `type`: *string* = "string" } ; `value`: { `oneOf`: ({ `additionalProperties`: *boolean* = false; `properties`: { `exactValue`: *undefined* ; `property`: { `pattern`: *string* = "^[a-z\_]+$"; `type`: *string* = "string" }  } ; `required`: *string*[]  } \| { `additionalProperties`: *boolean* = false; `properties`: { `exactValue`: {} ; `property`: *undefined*  } ; `required`: *string*[]  })[] ; `type`: *string* = "object" } ; `valueAttribute`: { `type`: *string* = "string" }  } ; `required`: *string*[]  } \| { `additionalProperties`: *boolean* = false; `dependencies`: { `condition`: *string*[] ; `gate`: *string*[]  } ; `properties`: { `attribute`: *undefined* ; `comparator`: *undefined* ; `component`: { `type`: *string* = "string" } ; `condition`: { `$ref`: *string* = "ConditionalRuleSet" } ; `gate`: { `enum`: *string*[] ; `type`: *string* = "string" } ; `isIncluded`: { `type`: *string* = "boolean" } ; `method`: *undefined* ; `property`: *undefined* ; `serverFlag`: { `enum`: *string*[] ; `type`: *string* = "string" } ; `value`: *undefined* ; `valueAttribute`: *undefined*  } ; `required`: *string*[]  })[] |
`definitions.ConditionalRuleSet.type` | *string* |
`definitions.PropertiesValueMappingDefiniton` | *object* |
`definitions.PropertiesValueMappingDefiniton.$id` | *string* |
`definitions.PropertiesValueMappingDefiniton.additionalProperties` | *boolean* |
`definitions.PropertiesValueMappingDefiniton.minProperties` | *number* |
`definitions.PropertiesValueMappingDefiniton.patternProperties` | *object* |
`definitions.PropertiesValueMappingDefiniton.patternProperties.^[a-z_]+$` | *object* |
`definitions.PropertiesValueMappingDefiniton.patternProperties.^[a-z_]+$.oneOf` | ({ `additionalProperties`: *boolean* = false; `properties`: { `exactValue`: *undefined* ; `property`: { `pattern`: *string* = "^[a-z\_]+$"; `type`: *string* = "string" }  } ; `required`: *string*[]  } \| { `additionalProperties`: *boolean* = false; `properties`: { `exactValue`: {} ; `property`: *undefined*  } ; `required`: *string*[]  })[] |
`definitions.PropertiesValueMappingDefiniton.patternProperties.^[a-z_]+$.type` | *string* |
`definitions.PropertiesValueMappingDefiniton.type` | *string* |
`properties` | *object* |
`properties.canUserExclude` | *object* |
`properties.canUserExclude.type` | *string* |
`properties.canUserExcludeIf` | *object* |
`properties.canUserExcludeIf.$ref` | *string* |
`properties.defaultExcluded` | *object* |
`properties.defaultExcluded.type` | *string* |
`properties.defaultExcludedIf` | *object* |
`properties.defaultExcludedIf.$ref` | *string* |
`properties.definition` | *object* |
`properties.definition.pattern` | *string* |
`properties.definition.type` | *string* |
`properties.disableSearch` | *object* |
`properties.disableSearch.type` | *string* |
`properties.enforcedProperties` | *object* |
`properties.enforcedProperties.$ref` | *string* |
`properties.excludedIf` | *object* |
`properties.excludedIf.$ref` | *string* |
`properties.exclusionIsCallout` | *object* |
`properties.exclusionIsCallout.type` | *string* |
`properties.id` | *object* |
`properties.id.pattern` | *string* |
`properties.id.type` | *string* |
`properties.predefinedProperties` | *object* |
`properties.predefinedProperties.$ref` | *string* |
`properties.sinkIn` | *object* |
`properties.sinkIn.items` | *object* |
`properties.sinkIn.items.type` | *string* |
`properties.sinkIn.type` | *string* |
`properties.ternaryExclusionState` | *object* |
`properties.ternaryExclusionState.type` | *string* |
`required` | *string*[] |
`type` | *string* |
