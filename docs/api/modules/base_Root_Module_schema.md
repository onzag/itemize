[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/schema

# Module: base/Root/Module/schema

This file contains the schema of the unprocessed form of the module

## Table of contents

### Variables

- [default](base_Root_Module_schema.md#default)

## Variables

### default

• **default**: `Object`

this is the standard form of the module as it is unprocessed
in the file itself

#### Type declaration

| Name | Type |
| :------ | :------ |
| `additionalProperties` | `boolean` |
| `properties` | \{ `children`: \{ `items`: \{ `type`: `string` = "string" } ; `minItems`: `number` = 1; `type`: `string` = "array" } ; `description`: \{ `type`: `string` = "string" } ; `maxSearchRecords`: \{ `type`: `string` = "number" } ; `maxSearchResults`: \{ `type`: `string` = "number" } ; `modRoleAccess`: \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } ; `readRoleAccess`: \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } ; `searchEngineEnabled`: \{ `type`: `string` = "boolean" } ; `searchLimiters`: \{ `additionalProperties`: `boolean` = false; `properties`: \{ `condition`: \{ `enum`: `string`[] ; `type`: `string` = "string" } ; `createdBy`: \{ `type`: `string` = "boolean" } ; `custom`: \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } ; `parenting`: \{ `type`: `string` = "boolean" } ; `since`: \{ `type`: `string` = "boolean" }  } ; `required`: `string`[] ; `type`: `string` = "object" } ; `searchRoleAccess`: \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } ; `searchable`: \{ `type`: `string` = "boolean" } ; `type`: \{ `const`: `string` = "module" }  } |
| `properties.children` | \{ `items`: \{ `type`: `string` = "string" } ; `minItems`: `number` = 1; `type`: `string` = "array" } |
| `properties.children.items` | \{ `type`: `string` = "string" } |
| `properties.children.items.type` | `string` |
| `properties.children.minItems` | `number` |
| `properties.children.type` | `string` |
| `properties.description` | \{ `type`: `string` = "string" } |
| `properties.description.type` | `string` |
| `properties.maxSearchRecords` | \{ `type`: `string` = "number" } |
| `properties.maxSearchRecords.type` | `string` |
| `properties.maxSearchResults` | \{ `type`: `string` = "number" } |
| `properties.maxSearchResults.type` | `string` |
| `properties.modRoleAccess` | \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } |
| `properties.modRoleAccess.items` | \{ `type`: `string` = "string" } |
| `properties.modRoleAccess.items.type` | `string` |
| `properties.modRoleAccess.type` | `string` |
| `properties.readRoleAccess` | \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } |
| `properties.readRoleAccess.items` | \{ `type`: `string` = "string" } |
| `properties.readRoleAccess.items.type` | `string` |
| `properties.readRoleAccess.type` | `string` |
| `properties.searchEngineEnabled` | \{ `type`: `string` = "boolean" } |
| `properties.searchEngineEnabled.type` | `string` |
| `properties.searchLimiters` | \{ `additionalProperties`: `boolean` = false; `properties`: \{ `condition`: \{ `enum`: `string`[] ; `type`: `string` = "string" } ; `createdBy`: \{ `type`: `string` = "boolean" } ; `custom`: \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } ; `parenting`: \{ `type`: `string` = "boolean" } ; `since`: \{ `type`: `string` = "boolean" }  } ; `required`: `string`[] ; `type`: `string` = "object" } |
| `properties.searchLimiters.additionalProperties` | `boolean` |
| `properties.searchLimiters.properties` | \{ `condition`: \{ `enum`: `string`[] ; `type`: `string` = "string" } ; `createdBy`: \{ `type`: `string` = "boolean" } ; `custom`: \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } ; `parenting`: \{ `type`: `string` = "boolean" } ; `since`: \{ `type`: `string` = "boolean" }  } |
| `properties.searchLimiters.properties.condition` | \{ `enum`: `string`[] ; `type`: `string` = "string" } |
| `properties.searchLimiters.properties.condition.enum` | `string`[] |
| `properties.searchLimiters.properties.condition.type` | `string` |
| `properties.searchLimiters.properties.createdBy` | \{ `type`: `string` = "boolean" } |
| `properties.searchLimiters.properties.createdBy.type` | `string` |
| `properties.searchLimiters.properties.custom` | \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } |
| `properties.searchLimiters.properties.custom.items` | \{ `type`: `string` = "string" } |
| `properties.searchLimiters.properties.custom.items.type` | `string` |
| `properties.searchLimiters.properties.custom.type` | `string` |
| `properties.searchLimiters.properties.parenting` | \{ `type`: `string` = "boolean" } |
| `properties.searchLimiters.properties.parenting.type` | `string` |
| `properties.searchLimiters.properties.since` | \{ `type`: `string` = "boolean" } |
| `properties.searchLimiters.properties.since.type` | `string` |
| `properties.searchLimiters.required` | `string`[] |
| `properties.searchLimiters.type` | `string` |
| `properties.searchRoleAccess` | \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } |
| `properties.searchRoleAccess.items` | \{ `type`: `string` = "string" } |
| `properties.searchRoleAccess.items.type` | `string` |
| `properties.searchRoleAccess.type` | `string` |
| `properties.searchable` | \{ `type`: `string` = "boolean" } |
| `properties.searchable.type` | `string` |
| `properties.type` | \{ `const`: `string` = "module" } |
| `properties.type.const` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/Root/Module/schema.ts:11](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/schema.ts#L11)
