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

• **style**: `Object`

The styles for the text entry

#### Type declaration

| Name | Type |
| :------ | :------ |
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
| `icon` | `Object` |
| `icon.color` | `string` |
| `iconButton` | `Object` |
| `iconButton.&:hover` | `Object` |
| `iconButton.&:hover.backgroundColor` | `string` |
| `iconButton.backgroundColor` | `string` |
| `iconButton.color` | `string` |
| `label` | (`isInvalid`: `boolean`, `richText`: `boolean`) => { `&.focused`: { `color`: `string`  } ; `color`: `string`  } |
| `labelContainer` | `Object` |
| `labelContainer.alignItems` | `string` |
| `labelContainer.display` | `string` |
| `labelContainer.justifyContent` | `string` |
| `labelNoToolbar` | `Object` |
| `labelNoToolbar.alignItems` | `string` |
| `labelNoToolbar.display` | `string` |
| `labelNoToolbar.height` | `string` |
| `labelNoToolbar.justifyContent` | `string` |
| `labelNoToolbar.padding` | `string` |
| `labelNoToolbar.width` | `string` |
| `labelSingleLine` | `Object` |
| `labelSingleLine.alignItems` | `string` |
| `labelSingleLine.display` | `string` |
| `labelSingleLine.height` | `string` |
| `labelSingleLine.justifyContent` | `string` |
| `labelSingleLine.padding` | `string` |
| `labelSingleLine.width` | `string` |
| `rawTextArea` | `Object` |
| `rawTextArea.border` | `string` |
| `rawTextArea.boxShadow` | `string` |
| `rawTextArea.fontSize` | `string` |
| `rawTextArea.outline` | `string` |
| `rawTextArea.overflow` | `string` |
| `rawTextArea.padding` | `string` |
| `rawTextArea.resize` | `string` |
| `rawTextArea.width` | `string` |
| `textButton` | `Object` |
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

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx:38](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx#L38)
