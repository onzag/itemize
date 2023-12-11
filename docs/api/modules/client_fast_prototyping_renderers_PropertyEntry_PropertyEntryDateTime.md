[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/fast-prototyping/renderers/PropertyEntry/PropertyEntryDateTime

# Module: client/fast-prototyping/renderers/PropertyEntry/PropertyEntryDateTime

The property entry date time for fast prototyping

## Table of contents

### Variables

- [style](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryDateTime.md#style)

### Functions

- [default](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryDateTime.md#default)

## Variables

### style

• `Const` **style**: `Object`

The styles for the date time entry

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
| `iconButton` | \{ `color`: `string` = "#424242" } |
| `iconButton.color` | `string` |
| `label` | (`invalid`: `boolean`) => \{ `&.focused`: \{ `color`: `string`  } ; `color`: `string`  } |

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryDateTime.tsx:33](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryDateTime.tsx#L33)

## Functions

### default

▸ **default**(`props`): `Element`

The date time renderer, it uses material ui in order to create very nice pickers for the user
these pickers are smart and will make a difference on whether it's a mobile or a computer,
it supports the following renderer args

- descriptionAsAlert: shows the description as an alert rather than the default

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyEntryDateTimeRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md) | the entry props |

#### Returns

`Element`

a react element

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryDateTime.tsx:102](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryDateTime.tsx#L102)
