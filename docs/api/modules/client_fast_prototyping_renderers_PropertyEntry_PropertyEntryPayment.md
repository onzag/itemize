[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/fast-prototyping/renderers/PropertyEntry/PropertyEntryPayment

# Module: client/fast-prototyping/renderers/PropertyEntry/PropertyEntryPayment

The property entry boolean fast prototyping renderer uses material ui to render
an entry for a boolean value

## Table of contents

### Variables

- [style](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryPayment.md#style)

### Functions

- [default](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryPayment.md#default)

## Variables

### style

• `Const` **style**: `Object`

The styles of the renderer

#### Type declaration

| Name | Type |
| :------ | :------ |
| `container` | \{ `paddingBottom`: `string` = "1.3rem"; `width`: `string` = "100%" } |
| `container.paddingBottom` | `string` |
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
| `label` | (`isInvalid`: `boolean`) => \{ `alignItems`: `string` = "center"; `color`: `string` ; `display`: `string` = "flex"; `justifyContent`: `string` = "space-between"; `width`: `string` = "100%" } |

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryPayment.tsx:34](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryPayment.tsx#L34)

## Functions

### default

▸ **default**(`props`): `Element`

This is the fast prototyping boolean renderer and uses material ui in order to render a slick
boolean entry for it, supports the following args

- descriptionAsAlert: displays the description as an alert rather than its normal form

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyEntryPaymentRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md) | the entry boolean props |

#### Returns

`Element`

a react element

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryPayment.tsx:82](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryPayment.tsx#L82)
