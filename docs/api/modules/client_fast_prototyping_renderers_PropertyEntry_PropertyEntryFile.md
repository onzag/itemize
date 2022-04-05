[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/fast-prototyping/renderers/PropertyEntry/PropertyEntryFile

# Module: client/fast-prototyping/renderers/PropertyEntry/PropertyEntryFile

Contains the fast prototyping element for renering a file entry

## Table of contents

### Variables

- [style](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryFile.md#style)

### Functions

- [default](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryFile.md#default)

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
| `fileDeleteButton.position` | `string` |
| `fileDeleteButton.right` | `number` |
| `fileDeleteButton.top` | `string` |
| `fileRejectedDescription` | `Object` |
| `fileRejectedDescription.fontSize` | `string` |
| `fileRejectedDescription.overflow` | `string` |
| `fileRejectedDescription.textAlign` | `string` |
| `fileRejectedDescription.textOverflow` | `string` |
| `fileRejectedDescription.width` | `string` |
| `icon` | `Object` |
| `icon.color` | `string` |
| `label` | (`isInvalid`: `boolean`) => { `&.focused`: { `color`: `string`  } ; `alignItems`: `string` = "center"; `color`: `string` ; `display`: `string` = "flex"; `justifyContent`: `string` = "space-between"; `width`: `string` = "100%" } |
| `paper` | `Object` |
| `paper.alignItems` | `string` |
| `paper.backgroundColor` | `string` |
| `paper.cursor` | `string` |
| `paper.display` | `string` |
| `paper.flexWrap` | `string` |
| `paper.height` | `string` |
| `paper.justifyContent` | `string` |
| `paper.marginTop` | `string` |
| `paper.minHeight` | `string` |
| `paper.padding` | `string` |
| `paper.position` | `string` |
| `paper.width` | `string` |
| `paperIconAdd` | `Object` |
| `paperIconAdd.fontSize` | `string` |
| `paperIconAdd.opacity` | `number` |
| `paperPlaceholder` | (`accepting`: `boolean`, `rejecting`: `boolean`) => { `border`: `string` = "dotted 2px #ccc"; `borderColor`: `string` ; `borderRadius`: `string` = "25px"; `color`: `string` = "rgb(117, 117, 117)"; `display`: `string` = "block"; `flexGrow`: `number` = 2; `fontSize`: `string` = "1rem"; `margin`: `string` = "0 25px"; `padding`: `string` = "25px 0"; `textAlign`: `string` = "center"; `userSelect`: `string` = "none" } |

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryFile.tsx:36](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryFile.tsx#L36)

## Functions

### default

▸ **default**(`props`): `Element`

The property entry file renderer, allows to set and upload a single file in its
form, support both images and standard files

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyEntryFileRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md) | the entry props |

#### Returns

`Element`

a react element

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryFile.tsx:164](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryFile.tsx#L164)
