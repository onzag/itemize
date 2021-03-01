[](../README.md) / [Exports](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/schema

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/schema

Contains the schema for the property definition as it should
be defined in the json form

## Table of contents

### Properties

- [default](base_root_module_itemdefinition_propertydefinition_schema.md#default)

### Variables

- [SpecialPropertyValueSetSchema](base_root_module_itemdefinition_propertydefinition_schema.md#specialpropertyvaluesetschema)

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
`properties` | *object* |
`properties.coerceNullsIntoDefault` | *object* |
`properties.coerceNullsIntoDefault.type` | *string* |
`properties.createRoleAccess` | *object* |
`properties.createRoleAccess.items` | *object* |
`properties.createRoleAccess.items.type` | *string* |
`properties.createRoleAccess.type` | *string* |
`properties.default` | *object* |
`properties.defaultIf` | *object* |
`properties.defaultIf.items` | *object* |
`properties.defaultIf.items.additionalProperties` | *boolean* |
`properties.defaultIf.items.properties` | *object* |
`properties.defaultIf.items.properties.if` | *object* |
`properties.defaultIf.items.properties.if.$ref` | *string* |
`properties.defaultIf.items.properties.value` | *object* |
`properties.defaultIf.items.required` | *string*[] |
`properties.defaultIf.items.type` | *string* |
`properties.defaultIf.type` | *string* |
`properties.disableRangedSearch` | *object* |
`properties.disableRangedSearch.type` | *string* |
`properties.disableRetrieval` | *object* |
`properties.disableRetrieval.type` | *string* |
`properties.editRoleAccess` | *object* |
`properties.editRoleAccess.items` | *object* |
`properties.editRoleAccess.items.type` | *string* |
`properties.editRoleAccess.type` | *string* |
`properties.enforcedValue` | *object* |
`properties.enforcedValues` | *object* |
`properties.enforcedValues.items` | *object* |
`properties.enforcedValues.items.additionalProperties` | *boolean* |
`properties.enforcedValues.items.properties` | *object* |
`properties.enforcedValues.items.properties.if` | *object* |
`properties.enforcedValues.items.properties.if.$ref` | *string* |
`properties.enforcedValues.items.properties.value` | *object* |
`properties.enforcedValues.items.required` | *string*[] |
`properties.enforcedValues.items.type` | *string* |
`properties.enforcedValues.type` | *string* |
`properties.hidden` | *object* |
`properties.hidden.type` | *string* |
`properties.hiddenIf` | *object* |
`properties.hiddenIf.$ref` | *string* |
`properties.hiddenIfEnforced` | *object* |
`properties.hiddenIfEnforced.type` | *string* |
`properties.htmlAutocomplete` | *object* |
`properties.htmlAutocomplete.type` | *string* |
`properties.i18nData` | *object* |
`properties.i18nData.type` | *string* |
`properties.id` | *object* |
`properties.id.pattern` | *string* |
`properties.id.type` | *string* |
`properties.invalidIf` | *object* |
`properties.invalidIf.items` | *object* |
`properties.invalidIf.items.additionalProperties` | *boolean* |
`properties.invalidIf.items.properties` | *object* |
`properties.invalidIf.items.properties.error` | *object* |
`properties.invalidIf.items.properties.error.pattern` | *string* |
`properties.invalidIf.items.properties.error.type` | *string* |
`properties.invalidIf.items.properties.if` | *object* |
`properties.invalidIf.items.properties.if.$ref` | *string* |
`properties.invalidIf.items.required` | *string*[] |
`properties.invalidIf.items.type` | *string* |
`properties.invalidIf.type` | *string* |
`properties.max` | *object* |
`properties.max.type` | *string* |
`properties.maxDecimalCount` | *object* |
`properties.maxDecimalCount.minimum` | *number* |
`properties.maxDecimalCount.type` | *string* |
`properties.maxLength` | *object* |
`properties.maxLength.minimum` | *number* |
`properties.maxLength.type` | *string* |
`properties.min` | *object* |
`properties.min.type` | *string* |
`properties.minLength` | *object* |
`properties.minLength.minimum` | *number* |
`properties.minLength.type` | *string* |
`properties.nonCaseSensitiveUnique` | *object* |
`properties.nonCaseSensitiveUnique.type` | *string* |
`properties.nullIfHidden` | *object* |
`properties.nullIfHidden.type` | *string* |
`properties.nullable` | *object* |
`properties.nullable.type` | *string* |
`properties.pattern` | *object* |
`properties.pattern.type` | *string* |
`properties.readRoleAccess` | *object* |
`properties.readRoleAccess.items` | *object* |
`properties.readRoleAccess.items.type` | *string* |
`properties.readRoleAccess.type` | *string* |
`properties.searchDefault` | *object* |
`properties.searchDefaultIf` | *object* |
`properties.searchDefaultIf.items` | *object* |
`properties.searchDefaultIf.items.additionalProperties` | *boolean* |
`properties.searchDefaultIf.items.properties` | *object* |
`properties.searchDefaultIf.items.properties.if` | *object* |
`properties.searchDefaultIf.items.properties.if.$ref` | *string* |
`properties.searchDefaultIf.items.properties.value` | *object* |
`properties.searchDefaultIf.items.required` | *string*[] |
`properties.searchDefaultIf.items.type` | *string* |
`properties.searchDefaultIf.type` | *string* |
`properties.searchHidden` | *object* |
`properties.searchHidden.type` | *string* |
`properties.searchHiddenIf` | *object* |
`properties.searchHiddenIf.$ref` | *string* |
`properties.searchInvalidIf` | *object* |
`properties.searchInvalidIf.items` | *object* |
`properties.searchInvalidIf.items.additionalProperties` | *boolean* |
`properties.searchInvalidIf.items.properties` | *object* |
`properties.searchInvalidIf.items.properties.error` | *object* |
`properties.searchInvalidIf.items.properties.error.pattern` | *string* |
`properties.searchInvalidIf.items.properties.error.type` | *string* |
`properties.searchInvalidIf.items.properties.if` | *object* |
`properties.searchInvalidIf.items.properties.if.$ref` | *string* |
`properties.searchInvalidIf.items.required` | *string*[] |
`properties.searchInvalidIf.items.type` | *string* |
`properties.searchInvalidIf.type` | *string* |
`properties.searchOnlyProperty` | *object* |
`properties.searchOnlyProperty.type` | *string* |
`properties.searchable` | *object* |
`properties.searchable.type` | *string* |
`properties.specialProperties` | *object* |
`properties.specialProperties.additionalProperties` | *boolean* |
`properties.specialProperties.properties` | *object* |
`properties.specialProperties.type` | *string* |
`properties.subtype` | *object* |
`properties.subtype.type` | *string* |
`properties.type` | *object* |
`properties.type.type` | *string* |
`properties.unique` | *object* |
`properties.unique.type` | *string* |
`properties.values` | *object* |
`properties.values.items` | *object* |
`properties.values.items.type` | *string*[] |
`properties.values.type` | *string* |
`required` | *string*[] |
`type` | *string* |

## Variables

### SpecialPropertyValueSetSchema

• `Const` **SpecialPropertyValueSetSchema**: *object*

This represents the special property value
for use with property set

#### Type declaration:

Name | Type |
:------ | :------ |
`additionalProperties` | *object* |
`additionalProperties.oneOf` | ({ `additionalProperties`: *boolean* = false; `properties`: { `exactValue`: *undefined* ; `property`: { `pattern`: *string* = "^[a-z\_]+$"; `type`: *string* = "string" }  } ; `required`: *string*[]  } \| { `additionalProperties`: *boolean* = false; `properties`: { `exactValue`: {} ; `property`: *undefined*  } ; `required`: *string*[]  })[] |
`additionalProperties.type` | *string* |
`type` | *string* |

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/schema.ts:14](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/schema.ts#L14)
