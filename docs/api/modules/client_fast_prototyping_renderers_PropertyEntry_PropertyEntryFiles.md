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

• `Const` **style**: `Object`

the styles for the file entry

#### Type declaration

| Name | Type |
| :------ | :------ |
| `button` | \{ `flexGrow`: `number` = 1; `height`: `string` = "2.5rem" } |
| `button.flexGrow` | `number` |
| `button.height` | `string` |
| `buttonContainer` | \{ `bottom`: `string` = "0"; `display`: `string` = "flex"; `left`: `string` = "0"; `position`: `string` = "absolute"; `right`: `string` = "0" } |
| `buttonContainer.bottom` | `string` |
| `buttonContainer.display` | `string` |
| `buttonContainer.left` | `string` |
| `buttonContainer.position` | `string` |
| `buttonContainer.right` | `string` |
| `buttonIcon` | \{ `marginLeft`: `string` = "0.75rem" } |
| `buttonIcon.marginLeft` | `string` |
| `container` | \{ `width`: `string` = "100%" } |
| `container.width` | `string` |
| `description` | \{ `width`: `string` = "100%" } |
| `description.width` | `string` |
| `entry` | \{ `alignItems`: `string` = "center"; `display`: `string` = "flex"; `flexDirection`: `string` = "row"; `justifyContent`: `string` = "space-between"; `width`: `string` = "100%" } |
| `entry.alignItems` | `string` |
| `entry.display` | `string` |
| `entry.flexDirection` | `string` |
| `entry.justifyContent` | `string` |
| `entry.width` | `string` |
| `errorMessage` | \{ `color`: `string` = "#f44336"; `fontSize`: `string` = "0.85rem"; `height`: `string` = "1.3rem" } |
| `errorMessage.color` | `string` |
| `errorMessage.fontSize` | `string` |
| `errorMessage.height` | `string` |
| `fileDeleteButton` | {} |
| `fileRejectedDescription` | \{ `fontSize`: `string` = "0.75rem"; `overflow`: `string` = "hidden"; `textAlign`: `string` = "center"; `textOverflow`: `string` = "ellipsis"; `width`: `string` = "100%" } |
| `fileRejectedDescription.fontSize` | `string` |
| `fileRejectedDescription.overflow` | `string` |
| `fileRejectedDescription.textAlign` | `string` |
| `fileRejectedDescription.textOverflow` | `string` |
| `fileRejectedDescription.width` | `string` |
| `icon` | \{ `color`: `string` = "#424242" } |
| `icon.color` | `string` |
| `label` | (`isInvalid`: `boolean`) => \{ `&.focused`: \{ `color`: `string`  } ; `alignItems`: `string` = "center"; `color`: `string` ; `display`: `string` = "flex"; `justifyContent`: `string` = "space-between"; `width`: `string` = "100%" } |
| `paper` | `any` |
| `paperAccepting` | \{ `borderColor`: `string` = "#42a5f5 !important" } |
| `paperAccepting.borderColor` | `string` |
| `paperIconAdd` | \{ `fontSize`: `string` = "100px"; `opacity`: `number` = 0.1 } |
| `paperIconAdd.fontSize` | `string` |
| `paperIconAdd.opacity` | `number` |
| `paperPlaceholder` | \{ `borderRadius`: `string` = "25px"; `color`: `string` = "rgb(117, 117, 117)"; `display`: `string` = "block"; `flexGrow`: `number` = 2; `fontSize`: `string` = "1rem"; `margin`: `string` = "0 25px"; `padding`: `string` = "25px 0"; `textAlign`: `string` = "center"; `userSelect`: `string` = "none" } |
| `paperPlaceholder.borderRadius` | `string` |
| `paperPlaceholder.color` | `string` |
| `paperPlaceholder.display` | `string` |
| `paperPlaceholder.flexGrow` | `number` |
| `paperPlaceholder.fontSize` | `string` |
| `paperPlaceholder.margin` | `string` |
| `paperPlaceholder.padding` | `string` |
| `paperPlaceholder.textAlign` | `string` |
| `paperPlaceholder.userSelect` | `string` |
| `paperRejecting` | \{ `borderColor`: `string` = "#f44336 !important" } |
| `paperRejecting.borderColor` | `string` |

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryFiles.tsx:36](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryFiles.tsx#L36)

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

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryFiles.tsx:169](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryFiles.tsx#L169)
