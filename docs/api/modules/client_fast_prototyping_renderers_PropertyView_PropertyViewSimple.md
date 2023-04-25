[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/fast-prototyping/renderers/PropertyView/PropertyViewSimple

# Module: client/fast-prototyping/renderers/PropertyView/PropertyViewSimple

Contains the property view simple renderer that simply displays a thing
used in raw properties and in simple properties such as text or numbers

## Table of contents

### Functions

- [default](client_fast_prototyping_renderers_PropertyView_PropertyViewSimple.md#default)

## Functions

### default

▸ **default**(`props`): `Element`

Allows for simple viewing of simple attributes

supported args:
- NullComponent: a react component to use rather than the default if the value is null
- nullComponentArgs: an object to pass as props to the null component
- nullNode: a react node to render instead of the default when the value is null
- dateFormat: a string, if specified will use that with moment to format the string like that

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyViewSimpleRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewSimple.IPropertyViewSimpleRendererProps.md) | the props for the simple renderer passed by the handler |

#### Returns

`Element`

a react element

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewSimple.tsx:25](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/renderers/PropertyView/PropertyViewSimple.tsx#L25)
