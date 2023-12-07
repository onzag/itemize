[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/fast-prototyping/renderers/PropertyEntry/PropertyEntryFiles

# Module: client/fast-prototyping/renderers/PropertyEntry/PropertyEntryFiles

Contains the fast prototyping element for renering a file entry

## Table of contents

### Variables

- [style](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryFiles.md#style)

### Functions

- [default](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryFiles.md#default)

## Variables

### style

• **style**: `Object`

the styles for the file entry

#### Type declaration

| Name | Type |
| :------ | :------ |
| `button` | `Object` |
| `button.flexGrow` | `number` |
| `button.height` | `string` |
| `buttonContainer` | `Object` |
| `buttonContainer.bottom` | `string` |
| `buttonContainer.display` | `string` |
| `buttonContainer.left` | `string` |
| `buttonContainer.position` | `string` |
| `buttonContainer.right` | `string` |
| `buttonIcon` | `Object` |
| `buttonIcon.marginLeft` | `string` |
| `container` | `Object` |
| `container.width` | `string` |
| `description` | `Object` |
| `description.width` | `string` |
| `entry` | `Object` |
| `entry.alignItems` | `string` |
| `entry.display` | `string` |
| `entry.flexDirection` | `string` |
| `entry.justifyContent` | `string` |
| `entry.width` | `string` |
| `errorMessage` | `Object` |
| `errorMessage.color` | `string` |
| `errorMessage.fontSize` | `string` |
| `errorMessage.height` | `string` |
| `fileDeleteButton` | `Object` |
| `fileRejectedDescription` | `Object` |
| `fileRejectedDescription.fontSize` | `string` |
| `fileRejectedDescription.overflow` | `string` |
| `fileRejectedDescription.textAlign` | `string` |
| `fileRejectedDescription.textOverflow` | `string` |
| `fileRejectedDescription.width` | `string` |
| `icon` | `Object` |
| `icon.color` | `string` |
| `label` | (`isInvalid`: `boolean`) => { `&.focused`: { `color`: `string`  } ; `alignItems`: `string` = "center"; `color`: `string` ; `display`: `string` = "flex"; `justifyContent`: `string` = "space-between"; `width`: `string` = "100%" } |
| `paper` | `any` |
| `paperAccepting` | `Object` |
| `paperAccepting.borderColor` | `string` |
| `paperIconAdd` | `Object` |
| `paperIconAdd.fontSize` | `string` |
| `paperIconAdd.opacity` | `number` |
| `paperPlaceholder` | `Object` |
| `paperPlaceholder.borderRadius` | `string` |
| `paperPlaceholder.color` | `string` |
| `paperPlaceholder.display` | `string` |
| `paperPlaceholder.flexGrow` | `number` |
| `paperPlaceholder.fontSize` | `string` |
| `paperPlaceholder.margin` | `string` |
| `paperPlaceholder.padding` | `string` |
| `paperPlaceholder.textAlign` | `string` |
| `paperPlaceholder.userSelect` | `string` |
| `paperRejecting` | `Object` |
| `paperRejecting.borderColor` | `string` |

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryFiles.tsx:36](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryFiles.tsx#L36)

## Functions

### default

▸ **default**(`props`): `Element`

The property entry file renderer, allows to set and upload a single file in its
form, support both images and standard files

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyEntryFilesRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md) | the entry props |

#### Returns

`Element`

a react element

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryFiles.tsx:169](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryFiles.tsx#L169)
