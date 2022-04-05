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

• **style**: `Object`

The styles for the date time entry

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
| `fieldInput` | (`invalid`: `boolean`, `disabled`: `boolean`) => { `&::after`: { `borderBottomColor`: `string` = "#f44336" } ; `&::before`: { `borderBottomColor`: `string` = "#e57373" } ; `&:hover::before`: { `borderBottomColor`: `string`  } ; `width`: `string` = "100%" } |
| `iconButton` | `Object` |
| `iconButton.color` | `string` |
| `label` | (`invalid`: `boolean`) => { `&.focused`: { `color`: `string`  } ; `color`: `string`  } |

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryDateTime.tsx:33](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryDateTime.tsx#L33)

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

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryDateTime.tsx:120](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryDateTime.tsx#L120)
