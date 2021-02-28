[](../README.md) / [Exports](../modules.md) / base/Root/Module/ItemDefinition/ConditionalRuleSet/schema

# Module: base/Root/Module/ItemDefinition/ConditionalRuleSet/schema

This file represents the schema for the compilation of the the conditional
rule sets in the JSON schema form

related files are index.ts and checkers.ts

## Table of contents

### Properties

- [default](base_root_module_itemdefinition_conditionalruleset_schema.md#default)

## Properties

### default

• **default**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`$id` | *string* |
`oneOf` | ({ `additionalProperties`: *boolean* = false; `dependencies`: { `condition`: *string*[] ; `gate`: *string*[]  } ; `properties`: { `attribute`: { `type`: *string* = "string" } ; `comparator`: { `enum`: *string*[] ; `type`: *string* = "string" } ; `component`: *undefined* ; `condition`: { `$ref`: *string* = "ConditionalRuleSet" } ; `gate`: { `enum`: *string*[] ; `type`: *string* = "string" } ; `isIncluded`: *undefined* ; `method`: { `enum`: *string*[] ; `type`: *string* = "string" } ; `property`: { `pattern`: *string* = "^[a-z\_]+$\|^&this$"; `type`: *string* = "string" } ; `serverFlag`: { `enum`: *string*[] ; `type`: *string* = "string" } ; `value`: { `oneOf`: ({ `additionalProperties`: *boolean* = false; `properties`: { `exactValue`: *undefined* ; `property`: { `pattern`: *string* = "^[a-z\_]+$"; `type`: *string* = "string" }  } ; `required`: *string*[]  } \| { `additionalProperties`: *boolean* = false; `properties`: { `exactValue`: {} ; `property`: *undefined*  } ; `required`: *string*[]  })[] ; `type`: *string* = "object" } ; `valueAttribute`: { `type`: *string* = "string" }  } ; `required`: *string*[]  } \| { `additionalProperties`: *boolean* = false; `dependencies`: { `condition`: *string*[] ; `gate`: *string*[]  } ; `properties`: { `attribute`: *undefined* ; `comparator`: *undefined* ; `component`: { `type`: *string* = "string" } ; `condition`: { `$ref`: *string* = "ConditionalRuleSet" } ; `gate`: { `enum`: *string*[] ; `type`: *string* = "string" } ; `isIncluded`: { `type`: *string* = "boolean" } ; `method`: *undefined* ; `property`: *undefined* ; `serverFlag`: { `enum`: *string*[] ; `type`: *string* = "string" } ; `value`: *undefined* ; `valueAttribute`: *undefined*  } ; `required`: *string*[]  })[] |
`type` | *string* |
