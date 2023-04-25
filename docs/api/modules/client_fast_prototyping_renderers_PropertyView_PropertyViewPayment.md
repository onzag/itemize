[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/fast-prototyping/renderers/PropertyView/PropertyViewPayment

# Module: client/fast-prototyping/renderers/PropertyView/PropertyViewPayment

Contains the property view currency renderer

## Table of contents

### Functions

- [default](client_fast_prototyping_renderers_PropertyView_PropertyViewPayment.md#default)

## Functions

### default

▸ **default**(`props`): `Element`

The property view for payment itself
works by sending them to other renderers that may do a better
job at rendering the value

supported args:
  render: "amount" | "type" | "status"

  amount uses the currency renderer
  type uses the simple renderer
  status uses the simple renderer

the remaining args will be passed to the precise renderer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyViewPaymentRendererProps`](../interfaces/client_internal_components_PropertyView_PropertyViewPayment.IPropertyViewPaymentRendererProps.md) | the props passed by the handler |

#### Returns

`Element`

a react element

#### Defined in

[client/fast-prototyping/renderers/PropertyView/PropertyViewPayment.tsx:29](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/renderers/PropertyView/PropertyViewPayment.tsx#L29)
