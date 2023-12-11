[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/fast-prototyping/renderers/PropertyEntry/PropertyEntrySelect

# Module: client/fast-prototyping/renderers/PropertyEntry/PropertyEntrySelect

Contains the select entry field renderer for fast prototyping

The select entry field renderer is used for types, number, integer and string when
they have defined values

## Table of contents

### Classes

- [default](../classes/client_fast_prototyping_renderers_PropertyEntry_PropertyEntrySelect.default.md)

### Variables

- [style](client_fast_prototyping_renderers_PropertyEntry_PropertyEntrySelect.md#style)

## Variables

### style

• `Const` **style**: `Object`

The styles for the select

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chip` | \{ `margin`: `number` = 2 } |
| `chip.margin` | `number` |
| `chips` | \{ `display`: `string` = 'flex'; `flexWrap`: `string` = 'wrap' } |
| `chips.display` | `string` |
| `chips.flexWrap` | `string` |
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
| `label` | (`isInvalid`: `boolean`) => \{ `&.focused`: \{ `color`: `string`  } ; `color`: `string`  } |
| `selectRoot` | \{ `alignItems`: `string` = "center"; `display`: `string` = "flex" } |
| `selectRoot.alignItems` | `string` |
| `selectRoot.display` | `string` |

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntrySelect.tsx:64](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyEntry/PropertyEntrySelect.tsx#L64)
