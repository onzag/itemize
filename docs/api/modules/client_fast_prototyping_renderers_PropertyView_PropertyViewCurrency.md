[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/fast-prototyping/renderers/PropertyView/PropertyViewCurrency

# Module: client/fast-prototyping/renderers/PropertyView/PropertyViewCurrency

Contains the property view currency renderer

## Table of contents

### Functions

- [default](client_fast_prototyping_renderers_PropertyView_PropertyViewCurrency.md#default)

## Functions

### default

▸ **default**(`props`): `Element`

The property view currency renderer itself

supported args:
- NullComponent: a react component to render instead of the default when the value is null
- nullComponentArgs: an object to pass as props to the null component
- nullNode: a react node to render instead of the default when the value is null
- className: the class name for the root span container
- convertedValueClassName: the class name for the actual value
- convertedSymbolClassName: the class name for the symbol that value has
- convertedClassName: the class name for the converted value
- originalClassName: the class name for the original value (if there is one)
- originalSymbolClassName: the class name for the original value symbol (if there is one)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyViewCurrencyRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewCurrency.IPropertyViewCurrencyRendererProps.md) | the props passed by the handler |

#### Returns

`Element`

a react element

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewCurrency.tsx:27](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/renderers/PropertyView/PropertyViewCurrency.tsx#L27)
