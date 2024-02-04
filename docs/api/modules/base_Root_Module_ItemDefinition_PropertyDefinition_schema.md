[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/schema

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/schema

Contains the schema for the property definition as it should
be defined in the json form

## Table of contents

### Variables

- [ConfigValueSetSchema](base_Root_Module_ItemDefinition_PropertyDefinition_schema.md#configvaluesetschema)
- [default](base_Root_Module_ItemDefinition_PropertyDefinition_schema.md#default)

## Variables

### ConfigValueSetSchema

• `Const` **ConfigValueSetSchema**: `Object`

This represents the config property value
for use with property set

#### Type declaration

| Name | Type |
| :------ | :------ |
| `additionalProperties` | \{ `oneOf`: (\{ `additionalProperties`: `boolean` = false; `properties`: \{ `exactValue?`: `undefined` = \{}; `property`: \{ `pattern`: `string` = "^[a-z\_]+$"; `type`: `string` = "string" }  } ; `required`: `string`[]  } \| \{ `additionalProperties`: `boolean` = false; `properties`: \{ `exactValue`: {} = \{}; `property?`: `undefined`  } ; `required`: `string`[]  })[] ; `type`: `string` = "object" } |
| `additionalProperties.oneOf` | (\{ `additionalProperties`: `boolean` = false; `properties`: \{ `exactValue?`: `undefined` = \{}; `property`: \{ `pattern`: `string` = "^[a-z\_]+$"; `type`: `string` = "string" }  } ; `required`: `string`[]  } \| \{ `additionalProperties`: `boolean` = false; `properties`: \{ `exactValue`: {} = \{}; `property?`: `undefined`  } ; `required`: `string`[]  })[] |
| `additionalProperties.type` | `string` |
| `type` | `string` |

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/schema.ts:14](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/schema.ts#L14)

___

### default

• **default**: `Object`

The schema for the definition
```
{
  "amount": 4,
  "type": "car"
}
```
properties can be any string
the values must be boolean string or number
we should have at least one

#### Type declaration

| Name | Type |
| :------ | :------ |
| `$id` | `string` |
| `additionalProperties` | `boolean` |
| `definitions` | \{ `ConditionalRuleSet`: \{ `$id`: `string` = "ConditionalRuleSet"; `oneOf`: (\{ `additionalProperties`: `boolean` = false; `dependencies`: \{ `condition`: `string`[] ; `gate`: `string`[]  } ; `properties`: \{ `attribute`: \{ `type`: `string` = "string" } ; `comparator`: \{ `enum`: `string`[] = comparators; `type`: `string` = "string" } ; `component?`: `undefined` ; `condition`: \{ `oneOf`: (\{ `$ref`: `string` = "ConditionalRuleSet"; `items?`: `undefined` ; `type?`: `undefined` = "object" } \| \{ `$ref?`: `undefined` = "ConditionalRuleSet"; `items`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `type`: `string` = "array" })[]  } ; `gate`: \{ `enum`: `string`[] = gates; `type`: `string` = "string" } ; `internalConditionGate`: \{ `enum`: `string`[] = gates; `type`: `string` = "string" } ; `isIncluded?`: `undefined` ; `method`: \{ `enum`: `string`[] = methods; `type`: `string` = "string" } ; `property`: \{ `pattern`: `string` = "^[a-z\_]+$\|^&this$"; `type`: `string` = "string" } ; `serverFlag`: \{ `enum`: `string`[] = serverFlags; `type`: `string` = "string" } ; `value`: \{ `oneOf`: (\{ `additionalProperties`: `boolean` = false; `properties`: \{ `exactValue?`: `undefined` = \{}; `property`: \{ `pattern`: `string` = "^[a-z\_]+$"; `type`: `string` = "string" }  } ; `required`: `string`[]  } \| \{ `additionalProperties`: `boolean` = false; `properties`: \{ `exactValue`: {} = \{}; `property?`: `undefined`  } ; `required`: `string`[]  })[] ; `type`: `string` = "object" } ; `valueAttribute`: \{ `type`: `string` = "string" }  } ; `required`: `string`[]  } \| \{ `additionalProperties`: `boolean` = false; `dependencies`: \{ `condition`: `string`[] ; `gate`: `string`[]  } ; `properties`: \{ `attribute?`: `undefined` ; `comparator?`: `undefined` ; `component`: \{ `type`: `string` = "string" } ; `condition`: \{ `oneOf`: (\{ `$ref`: `string` = "ConditionalRuleSet"; `items?`: `undefined` ; `type?`: `undefined` = "object" } \| \{ `$ref?`: `undefined` = "ConditionalRuleSet"; `items`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `type`: `string` = "array" })[]  } ; `gate`: \{ `enum`: `string`[] = gates; `type`: `string` = "string" } ; `internalConditionGate`: \{ `enum`: `string`[] = gates; `type`: `string` = "string" } ; `isIncluded`: \{ `type`: `string` = "boolean" } ; `method?`: `undefined` ; `property?`: `undefined` ; `serverFlag`: \{ `enum`: `string`[] = serverFlags; `type`: `string` = "string" } ; `value?`: `undefined` ; `valueAttribute?`: `undefined`  } ; `required`: `string`[]  } \| \{ `additionalProperties`: `boolean` = false; `dependencies`: \{ `condition`: `string`[] ; `gate`: `string`[]  } ; `properties`: \{ `attribute?`: `undefined` ; `comparator?`: `undefined` ; `component?`: `undefined` ; `condition`: \{ `oneOf`: (\{ `$ref`: `string` = "ConditionalRuleSet"; `items?`: `undefined` ; `type?`: `undefined` = "object" } \| \{ `$ref?`: `undefined` = "ConditionalRuleSet"; `items`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `type`: `string` = "array" })[]  } ; `gate`: \{ `enum`: `string`[] = gates; `type`: `string` = "string" } ; `internalConditionGate`: \{ `enum`: `string`[] = gates; `type`: `string` = "string" } ; `isIncluded?`: `undefined` ; `method?`: `undefined` ; `property?`: `undefined` ; `serverFlag`: \{ `enum`: `string`[] = serverFlags; `type`: `string` = "string" } ; `value?`: `undefined` ; `valueAttribute?`: `undefined`  } ; `required?`: `undefined`  })[] ; `type`: `string` = "object" } = ConditionalRuleSetSchema } |
| `definitions.ConditionalRuleSet` | \{ `$id`: `string` = "ConditionalRuleSet"; `oneOf`: (\{ `additionalProperties`: `boolean` = false; `dependencies`: \{ `condition`: `string`[] ; `gate`: `string`[]  } ; `properties`: \{ `attribute`: \{ `type`: `string` = "string" } ; `comparator`: \{ `enum`: `string`[] = comparators; `type`: `string` = "string" } ; `component?`: `undefined` ; `condition`: \{ `oneOf`: (\{ `$ref`: `string` = "ConditionalRuleSet"; `items?`: `undefined` ; `type?`: `undefined` = "object" } \| \{ `$ref?`: `undefined` = "ConditionalRuleSet"; `items`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `type`: `string` = "array" })[]  } ; `gate`: \{ `enum`: `string`[] = gates; `type`: `string` = "string" } ; `internalConditionGate`: \{ `enum`: `string`[] = gates; `type`: `string` = "string" } ; `isIncluded?`: `undefined` ; `method`: \{ `enum`: `string`[] = methods; `type`: `string` = "string" } ; `property`: \{ `pattern`: `string` = "^[a-z\_]+$\|^&this$"; `type`: `string` = "string" } ; `serverFlag`: \{ `enum`: `string`[] = serverFlags; `type`: `string` = "string" } ; `value`: \{ `oneOf`: (\{ `additionalProperties`: `boolean` = false; `properties`: \{ `exactValue?`: `undefined` = \{}; `property`: \{ `pattern`: `string` = "^[a-z\_]+$"; `type`: `string` = "string" }  } ; `required`: `string`[]  } \| \{ `additionalProperties`: `boolean` = false; `properties`: \{ `exactValue`: {} = \{}; `property?`: `undefined`  } ; `required`: `string`[]  })[] ; `type`: `string` = "object" } ; `valueAttribute`: \{ `type`: `string` = "string" }  } ; `required`: `string`[]  } \| \{ `additionalProperties`: `boolean` = false; `dependencies`: \{ `condition`: `string`[] ; `gate`: `string`[]  } ; `properties`: \{ `attribute?`: `undefined` ; `comparator?`: `undefined` ; `component`: \{ `type`: `string` = "string" } ; `condition`: \{ `oneOf`: (\{ `$ref`: `string` = "ConditionalRuleSet"; `items?`: `undefined` ; `type?`: `undefined` = "object" } \| \{ `$ref?`: `undefined` = "ConditionalRuleSet"; `items`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `type`: `string` = "array" })[]  } ; `gate`: \{ `enum`: `string`[] = gates; `type`: `string` = "string" } ; `internalConditionGate`: \{ `enum`: `string`[] = gates; `type`: `string` = "string" } ; `isIncluded`: \{ `type`: `string` = "boolean" } ; `method?`: `undefined` ; `property?`: `undefined` ; `serverFlag`: \{ `enum`: `string`[] = serverFlags; `type`: `string` = "string" } ; `value?`: `undefined` ; `valueAttribute?`: `undefined`  } ; `required`: `string`[]  } \| \{ `additionalProperties`: `boolean` = false; `dependencies`: \{ `condition`: `string`[] ; `gate`: `string`[]  } ; `properties`: \{ `attribute?`: `undefined` ; `comparator?`: `undefined` ; `component?`: `undefined` ; `condition`: \{ `oneOf`: (\{ `$ref`: `string` = "ConditionalRuleSet"; `items?`: `undefined` ; `type?`: `undefined` = "object" } \| \{ `$ref?`: `undefined` = "ConditionalRuleSet"; `items`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `type`: `string` = "array" })[]  } ; `gate`: \{ `enum`: `string`[] = gates; `type`: `string` = "string" } ; `internalConditionGate`: \{ `enum`: `string`[] = gates; `type`: `string` = "string" } ; `isIncluded?`: `undefined` ; `method?`: `undefined` ; `property?`: `undefined` ; `serverFlag`: \{ `enum`: `string`[] = serverFlags; `type`: `string` = "string" } ; `value?`: `undefined` ; `valueAttribute?`: `undefined`  } ; `required?`: `undefined`  })[] ; `type`: `string` = "object" } |
| `definitions.ConditionalRuleSet.$id` | `string` |
| `definitions.ConditionalRuleSet.oneOf` | (\{ `additionalProperties`: `boolean` = false; `dependencies`: \{ `condition`: `string`[] ; `gate`: `string`[]  } ; `properties`: \{ `attribute`: \{ `type`: `string` = "string" } ; `comparator`: \{ `enum`: `string`[] = comparators; `type`: `string` = "string" } ; `component?`: `undefined` ; `condition`: \{ `oneOf`: (\{ `$ref`: `string` = "ConditionalRuleSet"; `items?`: `undefined` ; `type?`: `undefined` = "object" } \| \{ `$ref?`: `undefined` = "ConditionalRuleSet"; `items`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `type`: `string` = "array" })[]  } ; `gate`: \{ `enum`: `string`[] = gates; `type`: `string` = "string" } ; `internalConditionGate`: \{ `enum`: `string`[] = gates; `type`: `string` = "string" } ; `isIncluded?`: `undefined` ; `method`: \{ `enum`: `string`[] = methods; `type`: `string` = "string" } ; `property`: \{ `pattern`: `string` = "^[a-z\_]+$\|^&this$"; `type`: `string` = "string" } ; `serverFlag`: \{ `enum`: `string`[] = serverFlags; `type`: `string` = "string" } ; `value`: \{ `oneOf`: (\{ `additionalProperties`: `boolean` = false; `properties`: \{ `exactValue?`: `undefined` = \{}; `property`: \{ `pattern`: `string` = "^[a-z\_]+$"; `type`: `string` = "string" }  } ; `required`: `string`[]  } \| \{ `additionalProperties`: `boolean` = false; `properties`: \{ `exactValue`: {} = \{}; `property?`: `undefined`  } ; `required`: `string`[]  })[] ; `type`: `string` = "object" } ; `valueAttribute`: \{ `type`: `string` = "string" }  } ; `required`: `string`[]  } \| \{ `additionalProperties`: `boolean` = false; `dependencies`: \{ `condition`: `string`[] ; `gate`: `string`[]  } ; `properties`: \{ `attribute?`: `undefined` ; `comparator?`: `undefined` ; `component`: \{ `type`: `string` = "string" } ; `condition`: \{ `oneOf`: (\{ `$ref`: `string` = "ConditionalRuleSet"; `items?`: `undefined` ; `type?`: `undefined` = "object" } \| \{ `$ref?`: `undefined` = "ConditionalRuleSet"; `items`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `type`: `string` = "array" })[]  } ; `gate`: \{ `enum`: `string`[] = gates; `type`: `string` = "string" } ; `internalConditionGate`: \{ `enum`: `string`[] = gates; `type`: `string` = "string" } ; `isIncluded`: \{ `type`: `string` = "boolean" } ; `method?`: `undefined` ; `property?`: `undefined` ; `serverFlag`: \{ `enum`: `string`[] = serverFlags; `type`: `string` = "string" } ; `value?`: `undefined` ; `valueAttribute?`: `undefined`  } ; `required`: `string`[]  } \| \{ `additionalProperties`: `boolean` = false; `dependencies`: \{ `condition`: `string`[] ; `gate`: `string`[]  } ; `properties`: \{ `attribute?`: `undefined` ; `comparator?`: `undefined` ; `component?`: `undefined` ; `condition`: \{ `oneOf`: (\{ `$ref`: `string` = "ConditionalRuleSet"; `items?`: `undefined` ; `type?`: `undefined` = "object" } \| \{ `$ref?`: `undefined` = "ConditionalRuleSet"; `items`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `type`: `string` = "array" })[]  } ; `gate`: \{ `enum`: `string`[] = gates; `type`: `string` = "string" } ; `internalConditionGate`: \{ `enum`: `string`[] = gates; `type`: `string` = "string" } ; `isIncluded?`: `undefined` ; `method?`: `undefined` ; `property?`: `undefined` ; `serverFlag`: \{ `enum`: `string`[] = serverFlags; `type`: `string` = "string" } ; `value?`: `undefined` ; `valueAttribute?`: `undefined`  } ; `required?`: `undefined`  })[] |
| `definitions.ConditionalRuleSet.type` | `string` |
| `properties` | \{ `coerceNullsIntoDefault`: \{ `type`: `string` = "boolean" } ; `config`: \{ `additionalProperties`: `boolean` = true; `properties`: {} = \{}; `type`: `string` = "object" } ; `createRoleAccess`: \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } ; `default`: {} = \{}; `defaultIf`: \{ `items`: \{ `additionalProperties`: `boolean` = false; `properties`: \{ `if`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `value`: {} = \{} } ; `required`: `string`[] ; `type`: `string` = "object" } ; `type`: `string` = "array" } ; `description`: \{ `type`: `string` = "string" } ; `disableRangedSearch`: \{ `type`: `string` = "boolean" } ; `disableRetrieval`: \{ `type`: `string` = "boolean" } ; `editRoleAccess`: \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } ; `enforcedValue`: {} = \{}; `enforcedValues`: \{ `items`: \{ `additionalProperties`: `boolean` = false; `properties`: \{ `if`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `value`: {} = \{} } ; `required`: `string`[] ; `type`: `string` = "object" } ; `type`: `string` = "array" } ; `hidden`: \{ `type`: `string` = "boolean" } ; `hiddenIf`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `hiddenIfEnforced`: \{ `type`: `string` = "boolean" } ; `i18nData`: \{ `type`: `string` = "object" } ; `id`: \{ `pattern`: `string` = "^[a-z\_]+$"; `type`: `string` = "string" } ; `invalidIf`: \{ `items`: \{ `additionalProperties`: `boolean` = false; `properties`: \{ `error`: \{ `pattern`: `string` = "^[A-Z\_]+$"; `type`: `string` = "string" } ; `if`: \{ `$ref`: `string` = "ConditionalRuleSet" }  } ; `required`: `string`[] ; `type`: `string` = "object" } ; `type`: `string` = "array" } ; `max`: \{ `type`: `string` = "number" } ; `maxDecimalCount`: \{ `minimum`: `number` = 0; `type`: `string` = "number" } ; `maxLength`: \{ `minimum`: `number` = 0; `type`: `string` = "number" } ; `min`: \{ `type`: `string` = "number" } ; `minLength`: \{ `minimum`: `number` = 0; `type`: `string` = "number" } ; `nonCaseSensitiveUnique`: \{ `type`: `string` = "boolean" } ; `nullIfHidden`: \{ `type`: `string` = "boolean" } ; `nullable`: \{ `type`: `string` = "boolean" } ; `pattern`: \{ `type`: `string` = "string" } ; `readRoleAccess`: \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } ; `searchDefault`: {} = \{}; `searchDefaultIf`: \{ `items`: \{ `additionalProperties`: `boolean` = false; `properties`: \{ `if`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `value`: {} = \{} } ; `required`: `string`[] ; `type`: `string` = "object" } ; `type`: `string` = "array" } ; `searchEnforcedValue`: {} = \{}; `searchEnforcedValues`: \{ `items`: \{ `additionalProperties`: `boolean` = false; `properties`: \{ `if`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `value`: {} = \{} } ; `required`: `string`[] ; `type`: `string` = "object" } ; `type`: `string` = "array" } ; `searchEngineBoost`: \{ `type`: `string` = "number" } ; `searchHidden`: \{ `type`: `string` = "boolean" } ; `searchHiddenIf`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `searchInvalidIf`: \{ `items`: \{ `additionalProperties`: `boolean` = false; `properties`: \{ `error`: \{ `pattern`: `string` = "^[A-Z\_]+$"; `type`: `string` = "string" } ; `if`: \{ `$ref`: `string` = "ConditionalRuleSet" }  } ; `required`: `string`[] ; `type`: `string` = "object" } ; `type`: `string` = "array" } ; `searchOnlyProperty`: \{ `type`: `string` = "boolean" } ; `searchable`: \{ `type`: `string` = "boolean" } ; `softReadRoleAccess`: \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } ; `subtype`: \{ `type`: `string` = "string" } ; `type`: \{ `type`: `string` = "string" } ; `unique`: \{ `type`: `string` = "boolean" } ; `values`: \{ `items`: \{ `type`: `string`[]  } ; `type`: `string` = "array" }  } |
| `properties.coerceNullsIntoDefault` | \{ `type`: `string` = "boolean" } |
| `properties.coerceNullsIntoDefault.type` | `string` |
| `properties.config` | \{ `additionalProperties`: `boolean` = true; `properties`: {} = \{}; `type`: `string` = "object" } |
| `properties.config.additionalProperties` | `boolean` |
| `properties.config.properties` | {} |
| `properties.config.type` | `string` |
| `properties.createRoleAccess` | \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } |
| `properties.createRoleAccess.items` | \{ `type`: `string` = "string" } |
| `properties.createRoleAccess.items.type` | `string` |
| `properties.createRoleAccess.type` | `string` |
| `properties.default` | {} |
| `properties.defaultIf` | \{ `items`: \{ `additionalProperties`: `boolean` = false; `properties`: \{ `if`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `value`: {} = \{} } ; `required`: `string`[] ; `type`: `string` = "object" } ; `type`: `string` = "array" } |
| `properties.defaultIf.items` | \{ `additionalProperties`: `boolean` = false; `properties`: \{ `if`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `value`: {} = \{} } ; `required`: `string`[] ; `type`: `string` = "object" } |
| `properties.defaultIf.items.additionalProperties` | `boolean` |
| `properties.defaultIf.items.properties` | \{ `if`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `value`: {} = \{} } |
| `properties.defaultIf.items.properties.if` | \{ `$ref`: `string` = "ConditionalRuleSet" } |
| `properties.defaultIf.items.properties.if.$ref` | `string` |
| `properties.defaultIf.items.properties.value` | {} |
| `properties.defaultIf.items.required` | `string`[] |
| `properties.defaultIf.items.type` | `string` |
| `properties.defaultIf.type` | `string` |
| `properties.description` | \{ `type`: `string` = "string" } |
| `properties.description.type` | `string` |
| `properties.disableRangedSearch` | \{ `type`: `string` = "boolean" } |
| `properties.disableRangedSearch.type` | `string` |
| `properties.disableRetrieval` | \{ `type`: `string` = "boolean" } |
| `properties.disableRetrieval.type` | `string` |
| `properties.editRoleAccess` | \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } |
| `properties.editRoleAccess.items` | \{ `type`: `string` = "string" } |
| `properties.editRoleAccess.items.type` | `string` |
| `properties.editRoleAccess.type` | `string` |
| `properties.enforcedValue` | {} |
| `properties.enforcedValues` | \{ `items`: \{ `additionalProperties`: `boolean` = false; `properties`: \{ `if`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `value`: {} = \{} } ; `required`: `string`[] ; `type`: `string` = "object" } ; `type`: `string` = "array" } |
| `properties.enforcedValues.items` | \{ `additionalProperties`: `boolean` = false; `properties`: \{ `if`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `value`: {} = \{} } ; `required`: `string`[] ; `type`: `string` = "object" } |
| `properties.enforcedValues.items.additionalProperties` | `boolean` |
| `properties.enforcedValues.items.properties` | \{ `if`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `value`: {} = \{} } |
| `properties.enforcedValues.items.properties.if` | \{ `$ref`: `string` = "ConditionalRuleSet" } |
| `properties.enforcedValues.items.properties.if.$ref` | `string` |
| `properties.enforcedValues.items.properties.value` | {} |
| `properties.enforcedValues.items.required` | `string`[] |
| `properties.enforcedValues.items.type` | `string` |
| `properties.enforcedValues.type` | `string` |
| `properties.hidden` | \{ `type`: `string` = "boolean" } |
| `properties.hidden.type` | `string` |
| `properties.hiddenIf` | \{ `$ref`: `string` = "ConditionalRuleSet" } |
| `properties.hiddenIf.$ref` | `string` |
| `properties.hiddenIfEnforced` | \{ `type`: `string` = "boolean" } |
| `properties.hiddenIfEnforced.type` | `string` |
| `properties.i18nData` | \{ `type`: `string` = "object" } |
| `properties.i18nData.type` | `string` |
| `properties.id` | \{ `pattern`: `string` = "^[a-z\_]+$"; `type`: `string` = "string" } |
| `properties.id.pattern` | `string` |
| `properties.id.type` | `string` |
| `properties.invalidIf` | \{ `items`: \{ `additionalProperties`: `boolean` = false; `properties`: \{ `error`: \{ `pattern`: `string` = "^[A-Z\_]+$"; `type`: `string` = "string" } ; `if`: \{ `$ref`: `string` = "ConditionalRuleSet" }  } ; `required`: `string`[] ; `type`: `string` = "object" } ; `type`: `string` = "array" } |
| `properties.invalidIf.items` | \{ `additionalProperties`: `boolean` = false; `properties`: \{ `error`: \{ `pattern`: `string` = "^[A-Z\_]+$"; `type`: `string` = "string" } ; `if`: \{ `$ref`: `string` = "ConditionalRuleSet" }  } ; `required`: `string`[] ; `type`: `string` = "object" } |
| `properties.invalidIf.items.additionalProperties` | `boolean` |
| `properties.invalidIf.items.properties` | \{ `error`: \{ `pattern`: `string` = "^[A-Z\_]+$"; `type`: `string` = "string" } ; `if`: \{ `$ref`: `string` = "ConditionalRuleSet" }  } |
| `properties.invalidIf.items.properties.error` | \{ `pattern`: `string` = "^[A-Z\_]+$"; `type`: `string` = "string" } |
| `properties.invalidIf.items.properties.error.pattern` | `string` |
| `properties.invalidIf.items.properties.error.type` | `string` |
| `properties.invalidIf.items.properties.if` | \{ `$ref`: `string` = "ConditionalRuleSet" } |
| `properties.invalidIf.items.properties.if.$ref` | `string` |
| `properties.invalidIf.items.required` | `string`[] |
| `properties.invalidIf.items.type` | `string` |
| `properties.invalidIf.type` | `string` |
| `properties.max` | \{ `type`: `string` = "number" } |
| `properties.max.type` | `string` |
| `properties.maxDecimalCount` | \{ `minimum`: `number` = 0; `type`: `string` = "number" } |
| `properties.maxDecimalCount.minimum` | `number` |
| `properties.maxDecimalCount.type` | `string` |
| `properties.maxLength` | \{ `minimum`: `number` = 0; `type`: `string` = "number" } |
| `properties.maxLength.minimum` | `number` |
| `properties.maxLength.type` | `string` |
| `properties.min` | \{ `type`: `string` = "number" } |
| `properties.min.type` | `string` |
| `properties.minLength` | \{ `minimum`: `number` = 0; `type`: `string` = "number" } |
| `properties.minLength.minimum` | `number` |
| `properties.minLength.type` | `string` |
| `properties.nonCaseSensitiveUnique` | \{ `type`: `string` = "boolean" } |
| `properties.nonCaseSensitiveUnique.type` | `string` |
| `properties.nullIfHidden` | \{ `type`: `string` = "boolean" } |
| `properties.nullIfHidden.type` | `string` |
| `properties.nullable` | \{ `type`: `string` = "boolean" } |
| `properties.nullable.type` | `string` |
| `properties.pattern` | \{ `type`: `string` = "string" } |
| `properties.pattern.type` | `string` |
| `properties.readRoleAccess` | \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } |
| `properties.readRoleAccess.items` | \{ `type`: `string` = "string" } |
| `properties.readRoleAccess.items.type` | `string` |
| `properties.readRoleAccess.type` | `string` |
| `properties.searchDefault` | {} |
| `properties.searchDefaultIf` | \{ `items`: \{ `additionalProperties`: `boolean` = false; `properties`: \{ `if`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `value`: {} = \{} } ; `required`: `string`[] ; `type`: `string` = "object" } ; `type`: `string` = "array" } |
| `properties.searchDefaultIf.items` | \{ `additionalProperties`: `boolean` = false; `properties`: \{ `if`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `value`: {} = \{} } ; `required`: `string`[] ; `type`: `string` = "object" } |
| `properties.searchDefaultIf.items.additionalProperties` | `boolean` |
| `properties.searchDefaultIf.items.properties` | \{ `if`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `value`: {} = \{} } |
| `properties.searchDefaultIf.items.properties.if` | \{ `$ref`: `string` = "ConditionalRuleSet" } |
| `properties.searchDefaultIf.items.properties.if.$ref` | `string` |
| `properties.searchDefaultIf.items.properties.value` | {} |
| `properties.searchDefaultIf.items.required` | `string`[] |
| `properties.searchDefaultIf.items.type` | `string` |
| `properties.searchDefaultIf.type` | `string` |
| `properties.searchEnforcedValue` | {} |
| `properties.searchEnforcedValues` | \{ `items`: \{ `additionalProperties`: `boolean` = false; `properties`: \{ `if`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `value`: {} = \{} } ; `required`: `string`[] ; `type`: `string` = "object" } ; `type`: `string` = "array" } |
| `properties.searchEnforcedValues.items` | \{ `additionalProperties`: `boolean` = false; `properties`: \{ `if`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `value`: {} = \{} } ; `required`: `string`[] ; `type`: `string` = "object" } |
| `properties.searchEnforcedValues.items.additionalProperties` | `boolean` |
| `properties.searchEnforcedValues.items.properties` | \{ `if`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `value`: {} = \{} } |
| `properties.searchEnforcedValues.items.properties.if` | \{ `$ref`: `string` = "ConditionalRuleSet" } |
| `properties.searchEnforcedValues.items.properties.if.$ref` | `string` |
| `properties.searchEnforcedValues.items.properties.value` | {} |
| `properties.searchEnforcedValues.items.required` | `string`[] |
| `properties.searchEnforcedValues.items.type` | `string` |
| `properties.searchEnforcedValues.type` | `string` |
| `properties.searchEngineBoost` | \{ `type`: `string` = "number" } |
| `properties.searchEngineBoost.type` | `string` |
| `properties.searchHidden` | \{ `type`: `string` = "boolean" } |
| `properties.searchHidden.type` | `string` |
| `properties.searchHiddenIf` | \{ `$ref`: `string` = "ConditionalRuleSet" } |
| `properties.searchHiddenIf.$ref` | `string` |
| `properties.searchInvalidIf` | \{ `items`: \{ `additionalProperties`: `boolean` = false; `properties`: \{ `error`: \{ `pattern`: `string` = "^[A-Z\_]+$"; `type`: `string` = "string" } ; `if`: \{ `$ref`: `string` = "ConditionalRuleSet" }  } ; `required`: `string`[] ; `type`: `string` = "object" } ; `type`: `string` = "array" } |
| `properties.searchInvalidIf.items` | \{ `additionalProperties`: `boolean` = false; `properties`: \{ `error`: \{ `pattern`: `string` = "^[A-Z\_]+$"; `type`: `string` = "string" } ; `if`: \{ `$ref`: `string` = "ConditionalRuleSet" }  } ; `required`: `string`[] ; `type`: `string` = "object" } |
| `properties.searchInvalidIf.items.additionalProperties` | `boolean` |
| `properties.searchInvalidIf.items.properties` | \{ `error`: \{ `pattern`: `string` = "^[A-Z\_]+$"; `type`: `string` = "string" } ; `if`: \{ `$ref`: `string` = "ConditionalRuleSet" }  } |
| `properties.searchInvalidIf.items.properties.error` | \{ `pattern`: `string` = "^[A-Z\_]+$"; `type`: `string` = "string" } |
| `properties.searchInvalidIf.items.properties.error.pattern` | `string` |
| `properties.searchInvalidIf.items.properties.error.type` | `string` |
| `properties.searchInvalidIf.items.properties.if` | \{ `$ref`: `string` = "ConditionalRuleSet" } |
| `properties.searchInvalidIf.items.properties.if.$ref` | `string` |
| `properties.searchInvalidIf.items.required` | `string`[] |
| `properties.searchInvalidIf.items.type` | `string` |
| `properties.searchInvalidIf.type` | `string` |
| `properties.searchOnlyProperty` | \{ `type`: `string` = "boolean" } |
| `properties.searchOnlyProperty.type` | `string` |
| `properties.searchable` | \{ `type`: `string` = "boolean" } |
| `properties.searchable.type` | `string` |
| `properties.softReadRoleAccess` | \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } |
| `properties.softReadRoleAccess.items` | \{ `type`: `string` = "string" } |
| `properties.softReadRoleAccess.items.type` | `string` |
| `properties.softReadRoleAccess.type` | `string` |
| `properties.subtype` | \{ `type`: `string` = "string" } |
| `properties.subtype.type` | `string` |
| `properties.type` | \{ `type`: `string` = "string" } |
| `properties.type.type` | `string` |
| `properties.unique` | \{ `type`: `string` = "boolean" } |
| `properties.unique.type` | `string` |
| `properties.values` | \{ `items`: \{ `type`: `string`[]  } ; `type`: `string` = "array" } |
| `properties.values.items` | \{ `type`: `string`[]  } |
| `properties.values.items.type` | `string`[] |
| `properties.values.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/schema.ts:52](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/schema.ts#L52)
