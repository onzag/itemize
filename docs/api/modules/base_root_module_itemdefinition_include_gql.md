[](../README.md) / [Exports](../modules.md) / base/Root/Module/ItemDefinition/Include/gql

# Module: base/Root/Module/ItemDefinition/Include/gql

This file contains the graphql utility functions for managing
Includes that exist within item definitions, it doesn't contain
the conversion function sql.ts does

## Table of contents

### Functions

- [getGQLFieldsDefinitionForInclude](base_root_module_itemdefinition_include_gql.md#getgqlfieldsdefinitionforinclude)

## Functions

### getGQLFieldsDefinitionForInclude

▸ **getGQLFieldsDefinitionForInclude**(`include`: [*default*](../classes/base_root_module_itemdefinition_include.default.md), `options`: { `optionalForm`: *boolean* ; `propertiesAsInput`: *boolean*  }): [*IGQLFieldsDefinitionType*](../interfaces/base_root_gql.igqlfieldsdefinitiontype.md)

Provides the graphql definition that will be required to store
this include bit

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`include` | [*default*](../classes/base_root_module_itemdefinition_include.default.md) | the include   |
`options` | *object* | - |
`options.optionalForm` | *boolean* | makes all the field of the include optional so they can be decided   |
`options.propertiesAsInput` | *boolean* | if it's in input mode to get graphql input fields instead   |

**Returns:** [*IGQLFieldsDefinitionType*](../interfaces/base_root_gql.igqlfieldsdefinitiontype.md)

a list of field definitions that represent the include in graphql form
for use within the graphql description

Defined in: [base/Root/Module/ItemDefinition/Include/gql.ts:28](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/Include/gql.ts#L28)
