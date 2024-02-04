[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/schema

# Module: base/Root/schema

This file contains a json schema for the unprocessed form
of the root, this root schema is meant to be used in order to check
root json files

## Table of contents

### Variables

- [default](base_Root_schema.md#default)

## Variables

### default

• **default**: `Object`

The root schema unprocessed and unbuilt

#### Type declaration

| Name | Type |
| :------ | :------ |
| `additionalProperties` | `boolean` |
| `properties` | \{ `children`: \{ `items`: \{ `type`: `string` = "string" } ; `minItems`: `number` = 1; `type`: `string` = "array" } ; `i18n`: \{ `type`: `string` = "string" } ; `type`: \{ `const`: `string` = "root" }  } |
| `properties.children` | \{ `items`: \{ `type`: `string` = "string" } ; `minItems`: `number` = 1; `type`: `string` = "array" } |
| `properties.children.items` | \{ `type`: `string` = "string" } |
| `properties.children.items.type` | `string` |
| `properties.children.minItems` | `number` |
| `properties.children.type` | `string` |
| `properties.i18n` | \{ `type`: `string` = "string" } |
| `properties.i18n.type` | `string` |
| `properties.type` | \{ `const`: `string` = "root" } |
| `properties.type.const` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[base/Root/schema.ts:12](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/schema.ts#L12)
