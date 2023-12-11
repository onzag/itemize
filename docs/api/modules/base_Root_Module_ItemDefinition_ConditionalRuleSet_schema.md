[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/ConditionalRuleSet/schema

# Module: base/Root/Module/ItemDefinition/ConditionalRuleSet/schema

This file represents the schema for the compilation of the the conditional
rule sets in the JSON schema form

related files are index.ts and checkers.ts

## Table of contents

### Variables

- [default](base_Root_Module_ItemDefinition_ConditionalRuleSet_schema.md#default)

## Variables

### default

• **default**: `Object`

The schema

#### Type declaration

| Name | Type |
| :------ | :------ |
| `$id` | `string` |
| `oneOf` | (\{ `additionalProperties`: `boolean` = false; `dependencies`: \{ `condition`: `string`[] ; `gate`: `string`[]  } ; `properties`: \{ `attribute`: \{ `type`: `string` = "string" } ; `comparator`: \{ `enum`: `string`[] = comparators; `type`: `string` = "string" } ; `component?`: `undefined` ; `condition`: \{ `oneOf`: (\{ `$ref`: `string` = "ConditionalRuleSet"; `items?`: `undefined` ; `type?`: `undefined` = "object" } \| \{ `$ref?`: `undefined` = "ConditionalRuleSet"; `items`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `type`: `string` = "array" })[]  } ; `gate`: \{ `enum`: `string`[] = gates; `type`: `string` = "string" } ; `internalConditionGate`: \{ `enum`: `string`[] = gates; `type`: `string` = "string" } ; `isIncluded?`: `undefined` ; `method`: \{ `enum`: `string`[] = methods; `type`: `string` = "string" } ; `property`: \{ `pattern`: `string` = "^[a-z\_]+$\|^&this$"; `type`: `string` = "string" } ; `serverFlag`: \{ `enum`: `string`[] = serverFlags; `type`: `string` = "string" } ; `value`: \{ `oneOf`: (\{ `additionalProperties`: `boolean` = false; `properties`: \{ `exactValue?`: `undefined` = \{}; `property`: \{ `pattern`: `string` = "^[a-z\_]+$"; `type`: `string` = "string" }  } ; `required`: `string`[]  } \| \{ `additionalProperties`: `boolean` = false; `properties`: \{ `exactValue`: {} = \{}; `property?`: `undefined`  } ; `required`: `string`[]  })[] ; `type`: `string` = "object" } ; `valueAttribute`: \{ `type`: `string` = "string" }  } ; `required`: `string`[]  } \| \{ `additionalProperties`: `boolean` = false; `dependencies`: \{ `condition`: `string`[] ; `gate`: `string`[]  } ; `properties`: \{ `attribute?`: `undefined` ; `comparator?`: `undefined` ; `component`: \{ `type`: `string` = "string" } ; `condition`: \{ `oneOf`: (\{ `$ref`: `string` = "ConditionalRuleSet"; `items?`: `undefined` ; `type?`: `undefined` = "object" } \| \{ `$ref?`: `undefined` = "ConditionalRuleSet"; `items`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `type`: `string` = "array" })[]  } ; `gate`: \{ `enum`: `string`[] = gates; `type`: `string` = "string" } ; `internalConditionGate`: \{ `enum`: `string`[] = gates; `type`: `string` = "string" } ; `isIncluded`: \{ `type`: `string` = "boolean" } ; `method?`: `undefined` ; `property?`: `undefined` ; `serverFlag`: \{ `enum`: `string`[] = serverFlags; `type`: `string` = "string" } ; `value?`: `undefined` ; `valueAttribute?`: `undefined`  } ; `required`: `string`[]  } \| \{ `additionalProperties`: `boolean` = false; `dependencies`: \{ `condition`: `string`[] ; `gate`: `string`[]  } ; `properties`: \{ `attribute?`: `undefined` ; `comparator?`: `undefined` ; `component?`: `undefined` ; `condition`: \{ `oneOf`: (\{ `$ref`: `string` = "ConditionalRuleSet"; `items?`: `undefined` ; `type?`: `undefined` = "object" } \| \{ `$ref?`: `undefined` = "ConditionalRuleSet"; `items`: \{ `$ref`: `string` = "ConditionalRuleSet" } ; `type`: `string` = "array" })[]  } ; `gate`: \{ `enum`: `string`[] = gates; `type`: `string` = "string" } ; `internalConditionGate`: \{ `enum`: `string`[] = gates; `type`: `string` = "string" } ; `isIncluded?`: `undefined` ; `method?`: `undefined` ; `property?`: `undefined` ; `serverFlag`: \{ `enum`: `string`[] = serverFlags; `type`: `string` = "string" } ; `value?`: `undefined` ; `valueAttribute?`: `undefined`  } ; `required?`: `undefined`  })[] |
| `type` | `string` |

#### Defined in

[base/Root/Module/ItemDefinition/ConditionalRuleSet/schema.ts:32](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/ConditionalRuleSet/schema.ts#L32)
