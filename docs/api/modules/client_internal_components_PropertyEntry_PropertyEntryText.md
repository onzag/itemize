[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/internal/components/PropertyEntry/PropertyEntryText

# Module: client/internal/components/PropertyEntry/PropertyEntryText

The gargantuan entry text handler

## Table of contents

### Classes

- [default](../classes/client_internal_components_PropertyEntry_PropertyEntryText.default.md)

### Interfaces

- [IInsertedFileInformationType](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IInsertedFileInformationType.md)
- [IPropertyEntryTextRendererProps](../interfaces/client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)

### Functions

- [fileResolver](client_internal_components_PropertyEntry_PropertyEntryText.md#fileresolver)

## Functions

### fileResolver

▸ **fileResolver**(`config`, `currentFiles`, `itemDefinition`, `forId`, `forVersion`, `containerId`, `include`, `mediaProperty`, `cacheFiles`, `forceFullURLS`, `fileId`, `isImage`, `node`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md) |
| `currentFiles` | [`PropertyDefinitionSupportedFilesType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype) |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |
| `forId` | `string` |
| `forVersion` | `string` |
| `containerId` | `string` |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) |
| `mediaProperty` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |
| `cacheFiles` | `boolean` |
| `forceFullURLS` | `boolean` |
| `fileId` | `string` |
| `isImage` | `boolean` |
| `node` | `HTMLElement` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `src` | `string` |
| `srcset` | `string` |

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:43](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L43)
