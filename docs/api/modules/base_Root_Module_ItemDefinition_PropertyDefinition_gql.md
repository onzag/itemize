[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/gql

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/gql

This file contains all the graphql related helper functions that are used in order to
retrieve and set the values of properties, it doesn't contain the conversion functions
sql.ts does

## Table of contents

### Functions

- [getGQLFieldsDefinitionForProperty](base_Root_Module_ItemDefinition_PropertyDefinition_gql.md#getgqlfieldsdefinitionforproperty)

## Functions

### getGQLFieldsDefinitionForProperty

▸ **getGQLFieldsDefinitionForProperty**(`propertyDefinition`, `options`): [`IGQLFieldsDefinitionType`](../interfaces/base_Root_gql.IGQLFieldsDefinitionType.md)

Provides all the schema bit that is necessary to include or query
this property alone, that is a schema bit

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `propertyDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property definition in question |
| `options` | `Object` | - |
| `options.optionalForm` | `boolean` | makes all the properties optional, nullable |
| `options.prefix` | `string` | a prefix to prefix the fields by, usually the include prefix if exists |
| `options.propertiesAsInput` | `boolean` | if the property should be as an input object, for use within args |

#### Returns

[`IGQLFieldsDefinitionType`](../interfaces/base_Root_gql.IGQLFieldsDefinitionType.md)

the partial graphql fields definition for the property

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/gql.ts:30](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/gql.ts#L30)
