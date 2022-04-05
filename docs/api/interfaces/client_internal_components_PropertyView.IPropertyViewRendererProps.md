[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyView](../modules/client_internal_components_PropertyView.md) / IPropertyViewRendererProps

# Interface: IPropertyViewRendererProps<ValueType\>

[client/internal/components/PropertyView](../modules/client_internal_components_PropertyView.md).IPropertyViewRendererProps

This is what every view renderer gets

Expect these to be extended

## Type parameters

| Name |
| :------ |
| `ValueType` |

## Hierarchy

- [`IRendererProps`](client_internal_renderer.IRendererProps.md)

  ↳ **`IPropertyViewRendererProps`**

  ↳↳ [`IPropertyViewBooleanRendererProps`](client_internal_components_PropertyView_PropertyViewBoolean.IPropertyViewBooleanRendererProps.md)

  ↳↳ [`IPropertyViewCurrencyRendererProps`](client_internal_components_PropertyView_PropertyViewCurrency.IPropertyViewCurrencyRendererProps.md)

  ↳↳ [`IPropertyViewDateTimeRendererProps`](client_internal_components_PropertyView_PropertyViewDateTime.IPropertyViewDateTimeRendererProps.md)

  ↳↳ [`IPropertyViewFileRendererProps`](client_internal_components_PropertyView_PropertyViewFile.IPropertyViewFileRendererProps.md)

  ↳↳ [`IPropertyViewLocationRendererProps`](client_internal_components_PropertyView_PropertyViewLocation.IPropertyViewLocationRendererProps.md)

  ↳↳ [`IPropertyViewSimpleRendererProps`](client_internal_components_PropertyView_PropertyViewSimple.IPropertyViewSimpleRendererProps.md)

  ↳↳ [`IPropertyViewTextRendererProps`](client_internal_components_PropertyView_PropertyViewText.IPropertyViewTextRendererProps.md)

## Table of contents

### Properties

- [args](client_internal_components_PropertyView.IPropertyViewRendererProps.md#args)
- [currentValue](client_internal_components_PropertyView.IPropertyViewRendererProps.md#currentvalue)
- [rtl](client_internal_components_PropertyView.IPropertyViewRendererProps.md#rtl)

## Properties

### args

• **args**: `Object`

The renderer args

#### Index signature

▪ [arg: `string`]: `any`

#### Inherited from

[IRendererProps](client_internal_renderer.IRendererProps.md).[args](client_internal_renderer.IRendererProps.md#args)

#### Defined in

[client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/f2f29986/client/internal/renderer.ts#L19)

___

### currentValue

• **currentValue**: `ValueType`

The current value to be displayed

#### Defined in

[client/internal/components/PropertyView/index.tsx:43](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/index.tsx#L43)

___

### rtl

• **rtl**: `boolean`

Whether it is in rtl mode for a rtl language

#### Inherited from

[IRendererProps](client_internal_renderer.IRendererProps.md).[rtl](client_internal_renderer.IRendererProps.md#rtl)

#### Defined in

[client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/f2f29986/client/internal/renderer.ts#L15)
