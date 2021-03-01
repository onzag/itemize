[](../README.md) / [Exports](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/server-checkers

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/server-checkers

This file contains the functionality that is required to perform checks
in the server side, they are done against the database rather than
using fetch requests that ultimately end up running these functions

## Table of contents

### Functions

- [serverSideIndexChecker](base_root_module_itemdefinition_propertydefinition_server_checkers.md#serversideindexchecker)

## Functions

### serverSideIndexChecker

▸ **serverSideIndexChecker**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md), `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md), `include`: [*default*](../classes/base_root_module_itemdefinition_include.default.md), `property`: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md), `value`: [*PropertyDefinitionSupportedType*](base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype), `id`: *string*, `version`: *string*): *Promise*<boolean\>

The server side index checker checks for unique indexes within properties

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) | the app data object   |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | item definition   |
`include` | [*default*](../classes/base_root_module_itemdefinition_include.default.md) | the include where the property resides (or null)   |
`property` | [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md) | the property in question   |
`value` | [*PropertyDefinitionSupportedType*](base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype) | the value of that property as requested to check   |
`id` | *string* | the slot id   |
`version` | *string* | the slot version   |

**Returns:** *Promise*<boolean\>

a boolean on whether the unique index is valid

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/server-checkers.ts:27](https://github.com/onzag/itemize/blob/55e63f2c/base/Root/Module/ItemDefinition/PropertyDefinition/server-checkers.ts#L27)
