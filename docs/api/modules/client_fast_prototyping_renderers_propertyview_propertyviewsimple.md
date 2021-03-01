[](../README.md) / [Exports](../modules.md) / client/fast-prototyping/renderers/PropertyView/PropertyViewSimple

# Module: client/fast-prototyping/renderers/PropertyView/PropertyViewSimple

Contains the property view simple renderer that simply displays a thing
used in raw properties and in simple properties such as text or numbers

## Table of contents

### Functions

- [default](client_fast_prototyping_renderers_propertyview_propertyviewsimple.md#default)

## Functions

### default

▸ **default**(`props`: [*IPropertyViewSimpleRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewsimple.ipropertyviewsimplerendererprops.md)): *Element*

Allows for simple viewing of simple attributes

supported args:
- NullComponent: a react component to use rather than the default if the value is null
- nullComponentArgs: an object to pass as props to the null component
- dateFormat: a string, if specified will use that with moment to format the string like that

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`props` | [*IPropertyViewSimpleRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewsimple.ipropertyviewsimplerendererprops.md) | the props for the simple renderer passed by the handler   |

**Returns:** *Element*

a react element

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewSimple.tsx:24](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/renderers/PropertyView/PropertyViewSimple.tsx#L24)
