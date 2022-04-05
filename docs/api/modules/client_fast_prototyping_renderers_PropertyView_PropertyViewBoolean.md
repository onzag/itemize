[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/fast-prototyping/renderers/PropertyView/PropertyViewBoolean

# Module: client/fast-prototyping/renderers/PropertyView/PropertyViewBoolean

The property view boolean renderer a rather straightforward renderer

## Table of contents

### Functions

- [default](client_fast_prototyping_renderers_PropertyView_PropertyViewBoolean.md#default)

## Functions

### default

▸ **default**(`props`): `any`

The fast prototyping property view boolean renderer, basically used
the standard main i18n attributes to say yes, no or unspecified

supported args:
- NullComponent: a react component to render instead of the default when the value is null
- nullComponentArgs: an object to pass as props to the null component
- nullNode: a react node to render instead of the default when the value is null

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyViewBooleanRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewBoolean.IPropertyViewBooleanRendererProps.md) | the property view boolean renderer props given by the handler |

#### Returns

`any`

a react element

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewBoolean.tsx:22](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyView/PropertyViewBoolean.tsx#L22)
