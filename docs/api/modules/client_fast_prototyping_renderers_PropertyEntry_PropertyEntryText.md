[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText

# Module: client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText

The behemoth that the entry fast prototyping is for the text type since text
types can be fairly complex, this renderer uses quill, quill also doesn't support SSR
so it must be double passed

This renderer is used for text/plain and text/html, aka rich text, but not with
any other non-subtype text, it will use the field instead

## Table of contents

### Classes

- [default](../classes/client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.default.md)

### Variables

- [style](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryText.md#style)

## Variables

### style

• `Const` **style**: `Object`

The styles for the text entry

#### Type declaration

| Name | Type |
| :------ | :------ |
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
| `icon` | \{ `color`: `string` = "#424242" } |
| `icon.color` | `string` |
| `iconButton` | \{ `&:hover`: \{ `backgroundColor`: `string` = "#1976d2" } ; `backgroundColor`: `string` = "#2196f3"; `color`: `string` = "#fff" } |
| `iconButton.&:hover` | \{ `backgroundColor`: `string` = "#1976d2" } |
| `iconButton.&:hover.backgroundColor` | `string` |
| `iconButton.backgroundColor` | `string` |
| `iconButton.color` | `string` |
| `label` | (`isInvalid`: `boolean`, `richText`: `boolean`) => \{ `&.focused`: \{ `color`: `string`  } ; `color`: `string`  } |
| `labelContainer` | \{ `alignItems`: `string` = "center"; `display`: `string` = "flex"; `justifyContent`: `string` = "center" } |
| `labelContainer.alignItems` | `string` |
| `labelContainer.display` | `string` |
| `labelContainer.justifyContent` | `string` |
| `labelNoToolbar` | \{ `alignItems`: `string` = "center"; `display`: `string` = "flex"; `height`: `string` = "5rem"; `justifyContent`: `string` = "space-between"; `padding`: `string` = "1rem 0 0 0"; `width`: `string` = "100%" } |
| `labelNoToolbar.alignItems` | `string` |
| `labelNoToolbar.display` | `string` |
| `labelNoToolbar.height` | `string` |
| `labelNoToolbar.justifyContent` | `string` |
| `labelNoToolbar.padding` | `string` |
| `labelNoToolbar.width` | `string` |
| `labelSingleLine` | \{ `alignItems`: `string` = "center"; `display`: `string` = "flex"; `height`: `string` = "5rem"; `justifyContent`: `string` = "space-between"; `padding`: `string` = "1rem 0"; `width`: `string` = "100%" } |
| `labelSingleLine.alignItems` | `string` |
| `labelSingleLine.display` | `string` |
| `labelSingleLine.height` | `string` |
| `labelSingleLine.justifyContent` | `string` |
| `labelSingleLine.padding` | `string` |
| `labelSingleLine.width` | `string` |
| `rawTextArea` | \{ `border`: `string` = "none"; `boxShadow`: `string` = "none"; `fontSize`: `string` = "1rem"; `outline`: `string` = "none"; `overflow`: `string` = "hidden"; `padding`: `string` = "12px 15px"; `resize`: `string` = "none"; `width`: `string` = "100%" } |
| `rawTextArea.border` | `string` |
| `rawTextArea.boxShadow` | `string` |
| `rawTextArea.fontSize` | `string` |
| `rawTextArea.outline` | `string` |
| `rawTextArea.overflow` | `string` |
| `rawTextArea.padding` | `string` |
| `rawTextArea.resize` | `string` |
| `rawTextArea.width` | `string` |
| `textButton` | \{ `alignItems`: `string` = "center"; `border`: `string` = "solid 1px rgba(0,0,0,0.1)"; `borderRadius`: `string` = "5px"; `display`: `string` = "flex"; `height`: `string` = "50px"; `justifyContent`: `string` = "center"; `margin`: `string` = "0"; `minWidth`: `string` = "50px"; `padding`: `string` = "0 10px" } |
| `textButton.alignItems` | `string` |
| `textButton.border` | `string` |
| `textButton.borderRadius` | `string` |
| `textButton.display` | `string` |
| `textButton.height` | `string` |
| `textButton.justifyContent` | `string` |
| `textButton.margin` | `string` |
| `textButton.minWidth` | `string` |
| `textButton.padding` | `string` |

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx:38](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx#L38)
