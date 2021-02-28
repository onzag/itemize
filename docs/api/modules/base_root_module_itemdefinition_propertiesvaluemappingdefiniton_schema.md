[](../README.md) / [Exports](../modules.md) / base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/schema

# Module: base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton/schema

This file represents the schema that is used to validate against in order
to use property value mapping definitions using the JSON schema spec in
the compilation step

related files index.ts and checkers.ts

## Table of contents

### Properties

- [default](base_root_module_itemdefinition_propertiesvaluemappingdefiniton_schema.md#default)

## Properties

### default

• **default**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`$id` | *string* |
`additionalProperties` | *boolean* |
`minProperties` | *number* |
`patternProperties` | *object* |
`patternProperties.^[a-z_]+$` | *object* |
`patternProperties.^[a-z_]+$.oneOf` | ({ `additionalProperties`: *boolean* = false; `properties`: { `exactValue`: *undefined* ; `property`: { `pattern`: *string* = "^[a-z\_]+$"; `type`: *string* = "string" }  } ; `required`: *string*[]  } \| { `additionalProperties`: *boolean* = false; `properties`: { `exactValue`: {} ; `property`: *undefined*  } ; `required`: *string*[]  })[] |
`patternProperties.^[a-z_]+$.type` | *string* |
`type` | *string* |
