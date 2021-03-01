[](../README.md) / [Exports](../modules.md) / client/fast-prototyping/renderers/PropertyView/PropertyViewBoolean

# Module: client/fast-prototyping/renderers/PropertyView/PropertyViewBoolean

The property view boolean renderer a rather straightforward renderer

## Table of contents

### Functions

- [default](client_fast_prototyping_renderers_propertyview_propertyviewboolean.md#default)

## Functions

### default

▸ **default**(`props`: [*IPropertyViewBooleanRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewboolean.ipropertyviewbooleanrendererprops.md)): *Element*

The fast prototyping property view boolean renderer, basically used
the standard main i18n attributes to say yes, no or unspecified

supported args:
- NullComponent: a react component to render instead of the default when the value is null
- nullComponentArgs: an object to pass as props to the null component

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`props` | [*IPropertyViewBooleanRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewboolean.ipropertyviewbooleanrendererprops.md) | the property view boolean renderer props given by the handler   |

**Returns:** *Element*

a react element

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewBoolean.tsx:21](https://github.com/onzag/itemize/blob/55e63f2c/client/fast-prototyping/renderers/PropertyView/PropertyViewBoolean.tsx#L21)
