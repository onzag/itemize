[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/server-checkers

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/server-checkers

This file contains the functionality that is required to perform checks
in the server side, they are done against the database rather than
using fetch requests that ultimately end up running these functions

## Table of contents

### Functions

- [serverSideIndexChecker](base_Root_Module_ItemDefinition_PropertyDefinition_server_checkers.md#serversideindexchecker)

## Functions

### serverSideIndexChecker

▸ **serverSideIndexChecker**(`appData`, `itemDefinition`, `include`, `property`, `value`, `id`, `version`): `Promise`<`boolean`\>

The server side index checker checks for unique indexes within properties

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | the app data object |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | item definition |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include where the property resides (or null) |
| `property` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property in question |
| `value` | [`PropertyDefinitionSupportedType`](base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) | the value of that property as requested to check |
| `id` | `string` | the slot id |
| `version` | `string` | the slot version |

#### Returns

`Promise`<`boolean`\>

a boolean on whether the unique index is valid

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/server-checkers.ts:27](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/server-checkers.ts#L27)
