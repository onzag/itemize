[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/fast-prototyping/renderers/PropertyEntry/PropertyEntryBoolean

# Module: client/fast-prototyping/renderers/PropertyEntry/PropertyEntryBoolean

The property entry boolean fast prototyping renderer uses material ui to render
an entry for a boolean value

## Table of contents

### Variables

- [style](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryBoolean.md#style)

### Functions

- [default](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryBoolean.md#default)

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
| `icon` | \{ `color`: `string` = "#424242" } |
| `icon.color` | `string` |
| `label` | \{ `&.focused`: \{ `color`: `string` = "#3f51b5" } ; `alignItems`: `string` = "center"; `color`: `string` = "rgb(66, 66, 66)"; `display`: `string` = "flex"; `justifyContent`: `string` = "space-between"; `width`: `string` = "100%" } |
| `label.&.focused` | \{ `color`: `string` = "#3f51b5" } |
| `label.&.focused.color` | `string` |
| `label.alignItems` | `string` |
| `label.color` | `string` |
| `label.display` | `string` |
| `label.justifyContent` | `string` |
| `label.width` | `string` |
| `labelSingleLine` | \{ `alignItems`: `string` = "center"; `display`: `string` = "flex"; `justifyContent`: `string` = "space-between"; `width`: `string` = "100%" } |
| `labelSingleLine.alignItems` | `string` |
| `labelSingleLine.display` | `string` |
| `labelSingleLine.justifyContent` | `string` |
| `labelSingleLine.width` | `string` |

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryBoolean.tsx:27](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryBoolean.tsx#L27)

## Functions

### default

▸ **default**(`props`): `Element`

This is the fast prototyping boolean renderer and uses material ui in order to render a slick
boolean entry for it, supports the following args

- descriptionAsAlert: displays the description as an alert rather than its normal form

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyEntryBooleanRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryBoolean.IPropertyEntryBooleanRendererProps.md) | the entry boolean props |

#### Returns

`Element`

a react element

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryBoolean.tsx:95](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryBoolean.tsx#L95)
