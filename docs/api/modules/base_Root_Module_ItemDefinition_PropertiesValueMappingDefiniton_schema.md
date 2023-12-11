[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/schema

# Module: base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/schema

This file represents the schema that is used to validate against in order
to use property value mapping definitions using the JSON schema spec in
the compilation step

related files index.ts and checkers.ts

## Table of contents

### Variables

- [default](base_Root_Module_ItemDefinition_PropertiesValueMappingDefiniton_schema.md#default)

## Variables

### default

• **default**: `Object`

The default property value mapping definition schema

#### Type declaration

| Name | Type |
| :------ | :------ |
| `$id` | `string` |
| `additionalProperties` | `boolean` |
| `minProperties` | `number` |
| `patternProperties` | \{ `^[a-z_]+$`: \{ `oneOf`: (\{ `additionalProperties`: `boolean` = false; `properties`: \{ `exactValue?`: `undefined` = \{}; `property`: \{ `pattern`: `string` = "^[a-z\_]+$"; `type`: `string` = "string" }  } ; `required`: `string`[]  } \| \{ `additionalProperties`: `boolean` = false; `properties`: \{ `exactValue`: {} = \{}; `property?`: `undefined`  } ; `required`: `string`[]  })[] ; `type`: `string` = "object" }  } |
| `patternProperties.^[a-z_]+$` | \{ `oneOf`: (\{ `additionalProperties`: `boolean` = false; `properties`: \{ `exactValue?`: `undefined` = \{}; `property`: \{ `pattern`: `string` = "^[a-z\_]+$"; `type`: `string` = "string" }  } ; `required`: `string`[]  } \| \{ `additionalProperties`: `boolean` = false; `properties`: \{ `exactValue`: {} = \{}; `property?`: `undefined`  } ; `required`: `string`[]  })[] ; `type`: `string` = "object" } |
| `patternProperties.^[a-z_]+$.oneOf` | (\{ `additionalProperties`: `boolean` = false; `properties`: \{ `exactValue?`: `undefined` = \{}; `property`: \{ `pattern`: `string` = "^[a-z\_]+$"; `type`: `string` = "string" }  } ; `required`: `string`[]  } \| \{ `additionalProperties`: `boolean` = false; `properties`: \{ `exactValue`: {} = \{}; `property?`: `undefined`  } ; `required`: `string`[]  })[] |
| `patternProperties.^[a-z_]+$.type` | `string` |
| `type` | `string` |

#### Defined in

[base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/schema.ts:14](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/schema.ts#L14)
