[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/Include/schema

# Module: base/Root/Module/ItemDefinition/Include/schema

This file contains the schema that is used to validate includes within the
item definition using the JSON Schema specification in the compile process

related files index.ts and checkers.ts

## Table of contents

### Properties

- [default](base_Root_Module_ItemDefinition_Include_schema.md#default)

## Properties

### default

• **default**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `$id` | `string` |
| `additionalProperties` | `boolean` |
| `definitions` | `Object` |
| `definitions.ConditionalRuleSet` | `Object` |
| `definitions.ConditionalRuleSet.$id` | `string` |
| `definitions.ConditionalRuleSet.oneOf` | ({ `additionalProperties`: `boolean` = false; `dependencies`: { `condition`: `string`[] ; `gate`: `string`[]  } ; `properties`: { `attribute`: { `type`: `string` = "string" } ; `comparator`: { `enum`: `string`[] = comparators; `type`: `string` = "string" } ; `component`: `undefined` ; `condition`: { `$ref`: `string` = "ConditionalRuleSet" } ; `gate`: { `enum`: `string`[] = gates; `type`: `string` = "string" } ; `isIncluded`: `undefined` ; `method`: { `enum`: `string`[] = methods; `type`: `string` = "string" } ; `property`: { `pattern`: `string` = "^[a-z\_]+$\|^&this$"; `type`: `string` = "string" } ; `serverFlag`: { `enum`: `string`[] = serverFlags; `type`: `string` = "string" } ; `value`: { `oneOf`: ({ `additionalProperties`: `boolean` = false; `properties`: { `exactValue`: `undefined` = {}; `property`: { `pattern`: `string` = "^[a-z\_]+$"; `type`: `string` = "string" }  } ; `required`: `string`[]  } \| { `additionalProperties`: `boolean` = false; `properties`: { `exactValue`: {} = {}; `property`: `undefined`  } ; `required`: `string`[]  })[] ; `type`: `string` = "object" } ; `valueAttribute`: { `type`: `string` = "string" }  } ; `required`: `string`[]  } \| { `additionalProperties`: `boolean` = false; `dependencies`: { `condition`: `string`[] ; `gate`: `string`[]  } ; `properties`: { `attribute`: `undefined` ; `comparator`: `undefined` ; `component`: { `type`: `string` = "string" } ; `condition`: { `$ref`: `string` = "ConditionalRuleSet" } ; `gate`: { `enum`: `string`[] = gates; `type`: `string` = "string" } ; `isIncluded`: { `type`: `string` = "boolean" } ; `method`: `undefined` ; `property`: `undefined` ; `serverFlag`: { `enum`: `string`[] = serverFlags; `type`: `string` = "string" } ; `value`: `undefined` ; `valueAttribute`: `undefined`  } ; `required`: `string`[]  })[] |
| `definitions.ConditionalRuleSet.type` | `string` |
| `definitions.PropertiesValueMappingDefiniton` | `Object` |
| `definitions.PropertiesValueMappingDefiniton.$id` | `string` |
| `definitions.PropertiesValueMappingDefiniton.additionalProperties` | `boolean` |
| `definitions.PropertiesValueMappingDefiniton.minProperties` | `number` |
| `definitions.PropertiesValueMappingDefiniton.patternProperties` | `Object` |
| `definitions.PropertiesValueMappingDefiniton.patternProperties.^[a-z_]+$` | `Object` |
| `definitions.PropertiesValueMappingDefiniton.patternProperties.^[a-z_]+$.oneOf` | ({ `additionalProperties`: `boolean` = false; `properties`: { `exactValue`: `undefined` = {}; `property`: { `pattern`: `string` = "^[a-z\_]+$"; `type`: `string` = "string" }  } ; `required`: `string`[]  } \| { `additionalProperties`: `boolean` = false; `properties`: { `exactValue`: {} = {}; `property`: `undefined`  } ; `required`: `string`[]  })[] |
| `definitions.PropertiesValueMappingDefiniton.patternProperties.^[a-z_]+$.type` | `string` |
| `definitions.PropertiesValueMappingDefiniton.type` | `string` |
| `properties` | `Object` |
| `properties.canUserExclude` | `Object` |
| `properties.canUserExclude.type` | `string` |
| `properties.canUserExcludeIf` | `Object` |
| `properties.canUserExcludeIf.$ref` | `string` |
| `properties.defaultExcluded` | `Object` |
| `properties.defaultExcluded.type` | `string` |
| `properties.defaultExcludedIf` | `Object` |
| `properties.defaultExcludedIf.$ref` | `string` |
| `properties.definition` | `Object` |
| `properties.definition.pattern` | `string` |
| `properties.definition.type` | `string` |
| `properties.disableSearch` | `Object` |
| `properties.disableSearch.type` | `string` |
| `properties.enforcedProperties` | `Object` |
| `properties.enforcedProperties.$ref` | `string` |
| `properties.excludedIf` | `Object` |
| `properties.excludedIf.$ref` | `string` |
| `properties.exclusionIsCallout` | `Object` |
| `properties.exclusionIsCallout.type` | `string` |
| `properties.id` | `Object` |
| `properties.id.pattern` | `string` |
| `properties.id.type` | `string` |
| `properties.predefinedProperties` | `Object` |
| `properties.predefinedProperties.$ref` | `string` |
| `properties.sinkIn` | `Object` |
| `properties.sinkIn.items` | `Object` |
| `properties.sinkIn.items.type` | `string` |
| `properties.sinkIn.type` | `string` |
| `properties.ternaryExclusionState` | `Object` |
| `properties.ternaryExclusionState.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |
