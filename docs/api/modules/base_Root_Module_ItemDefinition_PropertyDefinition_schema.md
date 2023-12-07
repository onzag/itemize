[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/schema

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/schema

Contains the schema for the property definition as it should
be defined in the json form

## Table of contents

### Properties

- [default](base_Root_Module_ItemDefinition_PropertyDefinition_schema.md#default)

### Variables

- [ConfigValueSetSchema](base_Root_Module_ItemDefinition_PropertyDefinition_schema.md#configvaluesetschema)

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
| `definitions.ConditionalRuleSet.oneOf` | ({ `additionalProperties`: `boolean` = false; `dependencies`: { `condition`: `string`[] ; `gate`: `string`[]  } ; `properties`: { `attribute`: { `type`: `string` = "string" } ; `comparator`: { `enum`: `string`[] = comparators; `type`: `string` = "string" } ; `component`: `undefined` ; `condition`: { `oneOf`: ({ `$ref`: `string` = "ConditionalRuleSet"; `items`: `undefined` ; `type`: `undefined` = "array" } \| { `$ref`: `undefined` = "ConditionalRuleSet"; `items`: { `$ref`: `string` = "ConditionalRuleSet" } ; `type`: `string` = "array" })[]  } ; `gate`: { `enum`: `string`[] = gates; `type`: `string` = "string" } ; `internalConditionGate`: { `enum`: `string`[] = gates; `type`: `string` = "string" } ; `isIncluded`: `undefined` ; `method`: { `enum`: `string`[] = methods; `type`: `string` = "string" } ; `property`: { `pattern`: `string` = "^[a-z\_]+$\|^&this$"; `type`: `string` = "string" } ; `serverFlag`: { `enum`: `string`[] = serverFlags; `type`: `string` = "string" } ; `value`: { `oneOf`: ({ `additionalProperties`: `boolean` = false; `properties`: { `exactValue`: `undefined` = {}; `property`: { `pattern`: `string` = "^[a-z\_]+$"; `type`: `string` = "string" }  } ; `required`: `string`[]  } \| { `additionalProperties`: `boolean` = false; `properties`: { `exactValue`: {} = {}; `property`: `undefined`  } ; `required`: `string`[]  })[] ; `type`: `string` = "object" } ; `valueAttribute`: { `type`: `string` = "string" }  } ; `required`: `string`[]  } \| { `additionalProperties`: `boolean` = false; `dependencies`: { `condition`: `string`[] ; `gate`: `string`[]  } ; `properties`: { `attribute`: `undefined` ; `comparator`: `undefined` ; `component`: { `type`: `string` = "string" } ; `condition`: { `oneOf`: ({ `$ref`: `string` = "ConditionalRuleSet"; `items`: `undefined` ; `type`: `undefined` = "array" } \| { `$ref`: `undefined` = "ConditionalRuleSet"; `items`: { `$ref`: `string` = "ConditionalRuleSet" } ; `type`: `string` = "array" })[]  } ; `gate`: { `enum`: `string`[] = gates; `type`: `string` = "string" } ; `internalConditionGate`: { `enum`: `string`[] = gates; `type`: `string` = "string" } ; `isIncluded`: { `type`: `string` = "boolean" } ; `method`: `undefined` ; `property`: `undefined` ; `serverFlag`: { `enum`: `string`[] = serverFlags; `type`: `string` = "string" } ; `value`: `undefined` ; `valueAttribute`: `undefined`  } ; `required`: `string`[]  } \| { `additionalProperties`: `boolean` = false; `dependencies`: { `condition`: `string`[] ; `gate`: `string`[]  } ; `properties`: { `attribute`: `undefined` ; `comparator`: `undefined` ; `component`: `undefined` ; `condition`: { `oneOf`: ({ `$ref`: `string` = "ConditionalRuleSet"; `items`: `undefined` ; `type`: `undefined` = "array" } \| { `$ref`: `undefined` = "ConditionalRuleSet"; `items`: { `$ref`: `string` = "ConditionalRuleSet" } ; `type`: `string` = "array" })[]  } ; `gate`: { `enum`: `string`[] = gates; `type`: `string` = "string" } ; `internalConditionGate`: { `enum`: `string`[] = gates; `type`: `string` = "string" } ; `isIncluded`: `undefined` ; `method`: `undefined` ; `property`: `undefined` ; `serverFlag`: { `enum`: `string`[] = serverFlags; `type`: `string` = "string" } ; `value`: `undefined` ; `valueAttribute`: `undefined`  } ; `required`: `undefined`  })[] |
| `definitions.ConditionalRuleSet.type` | `string` |
| `properties` | `Object` |
| `properties.coerceNullsIntoDefault` | `Object` |
| `properties.coerceNullsIntoDefault.type` | `string` |
| `properties.config` | `Object` |
| `properties.config.additionalProperties` | `boolean` |
| `properties.config.properties` | `Object` |
| `properties.config.type` | `string` |
| `properties.createRoleAccess` | `Object` |
| `properties.createRoleAccess.items` | `Object` |
| `properties.createRoleAccess.items.type` | `string` |
| `properties.createRoleAccess.type` | `string` |
| `properties.default` | `Object` |
| `properties.defaultIf` | `Object` |
| `properties.defaultIf.items` | `Object` |
| `properties.defaultIf.items.additionalProperties` | `boolean` |
| `properties.defaultIf.items.properties` | `Object` |
| `properties.defaultIf.items.properties.if` | `Object` |
| `properties.defaultIf.items.properties.if.$ref` | `string` |
| `properties.defaultIf.items.properties.value` | `Object` |
| `properties.defaultIf.items.required` | `string`[] |
| `properties.defaultIf.items.type` | `string` |
| `properties.defaultIf.type` | `string` |
| `properties.description` | `Object` |
| `properties.description.type` | `string` |
| `properties.disableRangedSearch` | `Object` |
| `properties.disableRangedSearch.type` | `string` |
| `properties.disableRetrieval` | `Object` |
| `properties.disableRetrieval.type` | `string` |
| `properties.editRoleAccess` | `Object` |
| `properties.editRoleAccess.items` | `Object` |
| `properties.editRoleAccess.items.type` | `string` |
| `properties.editRoleAccess.type` | `string` |
| `properties.enforcedValue` | `Object` |
| `properties.enforcedValues` | `Object` |
| `properties.enforcedValues.items` | `Object` |
| `properties.enforcedValues.items.additionalProperties` | `boolean` |
| `properties.enforcedValues.items.properties` | `Object` |
| `properties.enforcedValues.items.properties.if` | `Object` |
| `properties.enforcedValues.items.properties.if.$ref` | `string` |
| `properties.enforcedValues.items.properties.value` | `Object` |
| `properties.enforcedValues.items.required` | `string`[] |
| `properties.enforcedValues.items.type` | `string` |
| `properties.enforcedValues.type` | `string` |
| `properties.hidden` | `Object` |
| `properties.hidden.type` | `string` |
| `properties.hiddenIf` | `Object` |
| `properties.hiddenIf.$ref` | `string` |
| `properties.hiddenIfEnforced` | `Object` |
| `properties.hiddenIfEnforced.type` | `string` |
| `properties.i18nData` | `Object` |
| `properties.i18nData.type` | `string` |
| `properties.id` | `Object` |
| `properties.id.pattern` | `string` |
| `properties.id.type` | `string` |
| `properties.invalidIf` | `Object` |
| `properties.invalidIf.items` | `Object` |
| `properties.invalidIf.items.additionalProperties` | `boolean` |
| `properties.invalidIf.items.properties` | `Object` |
| `properties.invalidIf.items.properties.error` | `Object` |
| `properties.invalidIf.items.properties.error.pattern` | `string` |
| `properties.invalidIf.items.properties.error.type` | `string` |
| `properties.invalidIf.items.properties.if` | `Object` |
| `properties.invalidIf.items.properties.if.$ref` | `string` |
| `properties.invalidIf.items.required` | `string`[] |
| `properties.invalidIf.items.type` | `string` |
| `properties.invalidIf.type` | `string` |
| `properties.max` | `Object` |
| `properties.max.type` | `string` |
| `properties.maxDecimalCount` | `Object` |
| `properties.maxDecimalCount.minimum` | `number` |
| `properties.maxDecimalCount.type` | `string` |
| `properties.maxLength` | `Object` |
| `properties.maxLength.minimum` | `number` |
| `properties.maxLength.type` | `string` |
| `properties.min` | `Object` |
| `properties.min.type` | `string` |
| `properties.minLength` | `Object` |
| `properties.minLength.minimum` | `number` |
| `properties.minLength.type` | `string` |
| `properties.nonCaseSensitiveUnique` | `Object` |
| `properties.nonCaseSensitiveUnique.type` | `string` |
| `properties.nullIfHidden` | `Object` |
| `properties.nullIfHidden.type` | `string` |
| `properties.nullable` | `Object` |
| `properties.nullable.type` | `string` |
| `properties.pattern` | `Object` |
| `properties.pattern.type` | `string` |
| `properties.readRoleAccess` | `Object` |
| `properties.readRoleAccess.items` | `Object` |
| `properties.readRoleAccess.items.type` | `string` |
| `properties.readRoleAccess.type` | `string` |
| `properties.searchDefault` | `Object` |
| `properties.searchDefaultIf` | `Object` |
| `properties.searchDefaultIf.items` | `Object` |
| `properties.searchDefaultIf.items.additionalProperties` | `boolean` |
| `properties.searchDefaultIf.items.properties` | `Object` |
| `properties.searchDefaultIf.items.properties.if` | `Object` |
| `properties.searchDefaultIf.items.properties.if.$ref` | `string` |
| `properties.searchDefaultIf.items.properties.value` | `Object` |
| `properties.searchDefaultIf.items.required` | `string`[] |
| `properties.searchDefaultIf.items.type` | `string` |
| `properties.searchDefaultIf.type` | `string` |
| `properties.searchEnforcedValue` | `Object` |
| `properties.searchEnforcedValues` | `Object` |
| `properties.searchEnforcedValues.items` | `Object` |
| `properties.searchEnforcedValues.items.additionalProperties` | `boolean` |
| `properties.searchEnforcedValues.items.properties` | `Object` |
| `properties.searchEnforcedValues.items.properties.if` | `Object` |
| `properties.searchEnforcedValues.items.properties.if.$ref` | `string` |
| `properties.searchEnforcedValues.items.properties.value` | `Object` |
| `properties.searchEnforcedValues.items.required` | `string`[] |
| `properties.searchEnforcedValues.items.type` | `string` |
| `properties.searchEnforcedValues.type` | `string` |
| `properties.searchEngineBoost` | `Object` |
| `properties.searchEngineBoost.type` | `string` |
| `properties.searchHidden` | `Object` |
| `properties.searchHidden.type` | `string` |
| `properties.searchHiddenIf` | `Object` |
| `properties.searchHiddenIf.$ref` | `string` |
| `properties.searchInvalidIf` | `Object` |
| `properties.searchInvalidIf.items` | `Object` |
| `properties.searchInvalidIf.items.additionalProperties` | `boolean` |
| `properties.searchInvalidIf.items.properties` | `Object` |
| `properties.searchInvalidIf.items.properties.error` | `Object` |
| `properties.searchInvalidIf.items.properties.error.pattern` | `string` |
| `properties.searchInvalidIf.items.properties.error.type` | `string` |
| `properties.searchInvalidIf.items.properties.if` | `Object` |
| `properties.searchInvalidIf.items.properties.if.$ref` | `string` |
| `properties.searchInvalidIf.items.required` | `string`[] |
| `properties.searchInvalidIf.items.type` | `string` |
| `properties.searchInvalidIf.type` | `string` |
| `properties.searchOnlyProperty` | `Object` |
| `properties.searchOnlyProperty.type` | `string` |
| `properties.searchable` | `Object` |
| `properties.searchable.type` | `string` |
| `properties.softReadRoleAccess` | `Object` |
| `properties.softReadRoleAccess.items` | `Object` |
| `properties.softReadRoleAccess.items.type` | `string` |
| `properties.softReadRoleAccess.type` | `string` |
| `properties.subtype` | `Object` |
| `properties.subtype.type` | `string` |
| `properties.type` | `Object` |
| `properties.type.type` | `string` |
| `properties.unique` | `Object` |
| `properties.unique.type` | `string` |
| `properties.values` | `Object` |
| `properties.values.items` | `Object` |
| `properties.values.items.type` | `string`[] |
| `properties.values.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

## Variables

### ConfigValueSetSchema

• **ConfigValueSetSchema**: `Object`

This represents the config property value
for use with property set

#### Type declaration

| Name | Type |
| :------ | :------ |
| `additionalProperties` | `Object` |
| `additionalProperties.oneOf` | ({ `additionalProperties`: `boolean` = false; `properties`: { `exactValue`: `undefined` = {}; `property`: { `pattern`: `string` = "^[a-z\_]+$"; `type`: `string` = "string" }  } ; `required`: `string`[]  } \| { `additionalProperties`: `boolean` = false; `properties`: { `exactValue`: {} = {}; `property`: `undefined`  } ; `required`: `string`[]  })[] |
| `additionalProperties.type` | `string` |
| `type` | `string` |

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/schema.ts:14](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/schema.ts#L14)
