[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/Include/gql

# Module: base/Root/Module/ItemDefinition/Include/gql

This file contains the graphql utility functions for managing
Includes that exist within item definitions, it doesn't contain
the conversion function sql.ts does

## Table of contents

### Functions

- [getGQLFieldsDefinitionForInclude](base_Root_Module_ItemDefinition_Include_gql.md#getgqlfieldsdefinitionforinclude)

## Functions

### getGQLFieldsDefinitionForInclude

▸ **getGQLFieldsDefinitionForInclude**(`include`, `options`): [`IGQLFieldsDefinitionType`](../interfaces/base_Root_gql.IGQLFieldsDefinitionType.md)

Provides the graphql definition that will be required to store
this include bit

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include |
| `options` | `Object` | - |
| `options.optionalForm` | `boolean` | makes all the field of the include optional so they can be decided |
| `options.propertiesAsInput` | `boolean` | if it's in input mode to get graphql input fields instead |

#### Returns

[`IGQLFieldsDefinitionType`](../interfaces/base_Root_gql.IGQLFieldsDefinitionType.md)

a list of field definitions that represent the include in graphql form
for use within the graphql description

#### Defined in

[base/Root/Module/ItemDefinition/Include/gql.ts:28](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/Include/gql.ts#L28)
