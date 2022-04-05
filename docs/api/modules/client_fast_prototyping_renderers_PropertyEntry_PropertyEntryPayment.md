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

• **style**: `Object`

The styles of the renderer

#### Type declaration

| Name | Type |
| :------ | :------ |
| `container` | `Object` |
| `container.paddingBottom` | `string` |
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
| `label` | (`isInvalid`: `boolean`) => { `alignItems`: `string` = "center"; `color`: `string` ; `display`: `string` = "flex"; `justifyContent`: `string` = "space-between"; `width`: `string` = "100%" } |

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryPayment.tsx:34](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryPayment.tsx#L34)

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

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryPayment.tsx:82](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryPayment.tsx#L82)
