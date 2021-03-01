[](../README.md) / [Exports](../modules.md) / client/fast-prototyping/renderers/PropertyView/PropertyViewCurrency

# Module: client/fast-prototyping/renderers/PropertyView/PropertyViewCurrency

Contains the property view currency renderer

## Table of contents

### Functions

- [default](client_fast_prototyping_renderers_propertyview_propertyviewcurrency.md#default)

## Functions

### default

▸ **default**(`props`: [*IPropertyViewCurrencyRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewcurrency.ipropertyviewcurrencyrendererprops.md)): *Element*

The property view currency renderer itself

supported args:
- NullComponent: a react component to render instead of the default when the value is null
- nullComponentArgs: an object to pass as props to the null component
- className: the class name for the root span container
- valueClassName: the class name for the actual value
- symbolClassName: the class name for the symbol that value has
- originalClassName: the class name for the original value (if there is one)
- originalSymbolClassName: the class name for the original value symbol (if there is one)

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`props` | [*IPropertyViewCurrencyRendererProps*](../interfaces/client_internal_components_propertyview_propertyviewcurrency.ipropertyviewcurrencyrendererprops.md) | the props passed by the handler   |

**Returns:** *Element*

a react element

Defined in: [client/fast-prototyping/renderers/PropertyView/PropertyViewCurrency.tsx:25](https://github.com/onzag/itemize/blob/55e63f2c/client/fast-prototyping/renderers/PropertyView/PropertyViewCurrency.tsx#L25)
