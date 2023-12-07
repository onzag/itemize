[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyView/PropertyViewSimple](../modules/client_internal_components_PropertyView_PropertyViewSimple.md) / IPropertyViewSimpleRendererProps

# Interface: IPropertyViewSimpleRendererProps

[client/internal/components/PropertyView/PropertyViewSimple](../modules/client_internal_components_PropertyView_PropertyViewSimple.md).IPropertyViewSimpleRendererProps

The property view simple renderer props

## Hierarchy

- [`IPropertyViewRendererProps`](client_internal_components_PropertyView.IPropertyViewRendererProps.md)<`string`\>

  ↳ **`IPropertyViewSimpleRendererProps`**

## Table of contents

### Properties

- [args](client_internal_components_PropertyView_PropertyViewSimple.IPropertyViewSimpleRendererProps.md#args)
- [capitalize](client_internal_components_PropertyView_PropertyViewSimple.IPropertyViewSimpleRendererProps.md#capitalize)
- [currentValue](client_internal_components_PropertyView_PropertyViewSimple.IPropertyViewSimpleRendererProps.md#currentvalue)
- [isRichText](client_internal_components_PropertyView_PropertyViewSimple.IPropertyViewSimpleRendererProps.md#isrichtext)
- [language](client_internal_components_PropertyView_PropertyViewSimple.IPropertyViewSimpleRendererProps.md#language)
- [rtl](client_internal_components_PropertyView_PropertyViewSimple.IPropertyViewSimpleRendererProps.md#rtl)

## Properties

### args

• **args**: `Object`

The renderer args

#### Index signature

▪ [arg: `string`]: `any`

#### Inherited from

[IPropertyViewRendererProps](client_internal_components_PropertyView.IPropertyViewRendererProps.md).[args](client_internal_components_PropertyView.IPropertyViewRendererProps.md#args)

#### Defined in

[client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/a24376ed/client/internal/renderer.ts#L19)

___

### capitalize

• **capitalize**: `boolean`

Whether it should capitalize

#### Defined in

[client/internal/components/PropertyView/PropertyViewSimple.tsx:20](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyView/PropertyViewSimple.tsx#L20)

___

### currentValue

• **currentValue**: `string`

The current value to be displayed

#### Inherited from

[IPropertyViewRendererProps](client_internal_components_PropertyView.IPropertyViewRendererProps.md).[currentValue](client_internal_components_PropertyView.IPropertyViewRendererProps.md#currentvalue)

#### Defined in

[client/internal/components/PropertyView/index.tsx:44](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyView/index.tsx#L44)

___

### isRichText

• **isRichText**: `boolean`

wether it is using rich text, this is not full blown rich text
and only regards to highlights

#### Defined in

[client/internal/components/PropertyView/PropertyViewSimple.tsx:29](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyView/PropertyViewSimple.tsx#L29)

___

### language

• **language**: `string`

The language code it's currently using

#### Defined in

[client/internal/components/PropertyView/PropertyViewSimple.tsx:24](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyView/PropertyViewSimple.tsx#L24)

___

### rtl

• **rtl**: `boolean`

Whether it is in rtl mode for a rtl language

#### Inherited from

[IPropertyViewRendererProps](client_internal_components_PropertyView.IPropertyViewRendererProps.md).[rtl](client_internal_components_PropertyView.IPropertyViewRendererProps.md#rtl)

#### Defined in

[client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/a24376ed/client/internal/renderer.ts#L15)
