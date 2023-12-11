[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField

# Module: client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField

The entry for field based (text/number) types

## Table of contents

### Classes

- [default](../classes/client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.default.md)

### Variables

- [style](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryField.md#style)

## Variables

### style

• `Const` **style**: `Object`

The styles for the field

#### Type declaration

| Name | Type |
| :------ | :------ |
| `container` | \{ `width`: `string` = "100%" } |
| `container.width` | `string` |
| `countryPicker` | \{ `&:active`: \{ `backgroundColor`: `string` = "#aaa" } ; `&:disabled`: \{ `backgroundColor`: `string` = "#ddd"; `color`: `string` = "rgba(0,0,0,0.5)"; `cursor`: `string` = "default" } ; `&:hover`: \{ `backgroundColor`: `string` = "#bbb" } ; `backgroundColor`: `string` = "#ccc"; `borderBottomRightRadius`: `string` = "0px !important"; `borderTopRightRadius`: `string` = "0px !important"; `fontWeight`: `number` = 500; `paddingLeft`: `string` = "24px !important" } |
| `countryPicker.&:active` | \{ `backgroundColor`: `string` = "#aaa" } |
| `countryPicker.&:active.backgroundColor` | `string` |
| `countryPicker.&:disabled` | \{ `backgroundColor`: `string` = "#ddd"; `color`: `string` = "rgba(0,0,0,0.5)"; `cursor`: `string` = "default" } |
| `countryPicker.&:disabled.backgroundColor` | `string` |
| `countryPicker.&:disabled.color` | `string` |
| `countryPicker.&:disabled.cursor` | `string` |
| `countryPicker.&:hover` | \{ `backgroundColor`: `string` = "#bbb" } |
| `countryPicker.&:hover.backgroundColor` | `string` |
| `countryPicker.backgroundColor` | `string` |
| `countryPicker.borderBottomRightRadius` | `string` |
| `countryPicker.borderTopRightRadius` | `string` |
| `countryPicker.fontWeight` | `number` |
| `countryPicker.paddingLeft` | `string` |
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
| `fieldForPhone` | \{ `display`: `string` = "flex"; `width`: `string` = "100%" } |
| `fieldForPhone.display` | `string` |
| `fieldForPhone.width` | `string` |
| `fieldInput` | (`phone`: `boolean`) => \{ `& fieldset`: \{ `borderBottomLeftRadius`: `number` = 0; `borderTopLeftRadius`: `number` = 0 }  } \| \{ `& fieldset?`: `undefined`  } |
| `iconButton` | \{ `color`: `string` = "#424242" } |
| `iconButton.color` | `string` |
| `iconButtonPassword` | \{ `&:hover`: \{ `backgroundColor`: `string` = "#1976d2" } ; `backgroundColor`: `string` = "#2196f3"; `color`: `string` = "#fff" } |
| `iconButtonPassword.&:hover` | \{ `backgroundColor`: `string` = "#1976d2" } |
| `iconButtonPassword.&:hover.backgroundColor` | `string` |
| `iconButtonPassword.backgroundColor` | `string` |
| `iconButtonPassword.color` | `string` |
| `iconButtonSmall` | \{ `color`: `string` = "#424242"; `height`: `string` = "32px"; `width`: `string` = "32px" } |
| `iconButtonSmall.color` | `string` |
| `iconButtonSmall.height` | `string` |
| `iconButtonSmall.width` | `string` |
| `label` | (`isInvalid`: `boolean`) => \{ `&.focused`: \{ `color`: `string`  } ; `color`: `string`  } |
| `labelSingleLine` | \{ `alignItems`: `string` = "center"; `display`: `string` = "flex"; `justifyContent`: `string` = "space-between"; `width`: `string` = "100%" } |
| `labelSingleLine.alignItems` | `string` |
| `labelSingleLine.display` | `string` |
| `labelSingleLine.justifyContent` | `string` |
| `labelSingleLine.width` | `string` |
| `smallAddornment` | (`isInvalid`: `boolean`) => \{ `color`: `string`  } |
| `standardAddornment` | (`isInvalid`: `boolean`) => \{ `color`: `string` ; `marginRight`: `string` = "-10px" } |
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
| `unitDialog` | \{ `minWidth`: `string` = "400px" } |
| `unitDialog.minWidth` | `string` |
| `unitDialogSubheader` | \{ `backgroundColor`: `string` = "white"; `borderBottom`: `string` = "solid 1px #eee" } |
| `unitDialogSubheader.backgroundColor` | `string` |
| `unitDialogSubheader.borderBottom` | `string` |

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx:44](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx#L44)
