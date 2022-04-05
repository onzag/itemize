[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/property/View

# Module: client/components/property/View

Contains the view component that pipes the data to the all mighty function
in base.tsx

## Table of contents

### Functions

- [default](client_components_property_View.md#default)

## Functions

### default

▸ **default**(`props`): `Element`

Creates an view for a given property id

The viewer can be used with meta properties, such as created_at edited_at, etc...

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyViewProps`](../interfaces/client_components_property_base.IPropertyViewProps.md)<[`IPropertyViewRendererProps`](../interfaces/client_internal_components_PropertyView.IPropertyViewRendererProps.md)<`boolean`\>\> | the props for the view |

#### Returns

`Element`

a react component

#### Defined in

[client/components/property/View.tsx:20](https://github.com/onzag/itemize/blob/5c2808d3/client/components/property/View.tsx#L20)
