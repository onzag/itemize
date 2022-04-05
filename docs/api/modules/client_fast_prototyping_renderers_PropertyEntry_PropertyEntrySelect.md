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

• **style**: `Object`

The styles for the select

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chip` | `Object` |
| `chip.margin` | `number` |
| `chips` | `Object` |
| `chips.display` | `string` |
| `chips.flexWrap` | `string` |
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
| `fieldInput` | (`isInvalid`: `boolean`, `disabled`: `boolean`) => { `&::after`: { `borderBottomColor`: `string` = "#f44336" } ; `&::before`: { `borderBottomColor`: `string` = "#e57373" } ; `&:hover::before`: { `borderBottomColor`: `string`  } ; `width`: `string` = "100%" } |
| `icon` | `Object` |
| `icon.color` | `string` |
| `label` | (`isInvalid`: `boolean`) => { `&.focused`: { `color`: `string`  } ; `color`: `string`  } |
| `selectRoot` | `Object` |
| `selectRoot.alignItems` | `string` |
| `selectRoot.display` | `string` |

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntrySelect.tsx:40](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/renderers/PropertyEntry/PropertyEntrySelect.tsx#L40)
