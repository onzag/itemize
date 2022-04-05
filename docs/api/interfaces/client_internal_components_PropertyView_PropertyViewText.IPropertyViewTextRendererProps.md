[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyView/PropertyViewText](../modules/client_internal_components_PropertyView_PropertyViewText.md) / IPropertyViewTextRendererProps

# Interface: IPropertyViewTextRendererProps

[client/internal/components/PropertyView/PropertyViewText](../modules/client_internal_components_PropertyView_PropertyViewText.md).IPropertyViewTextRendererProps

The property view renderer props as it requires the properties
note that this renderer is only used for html and plain, but not for the default
null subtype

## Hierarchy

- [`IPropertyViewRendererProps`](client_internal_components_PropertyView.IPropertyViewRendererProps.md)<[`PropertyDefinitionSupportedTextType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_text.md#propertydefinitionsupportedtexttype)\>

  ↳ **`IPropertyViewTextRendererProps`**

## Table of contents

### Properties

- [args](client_internal_components_PropertyView_PropertyViewText.IPropertyViewTextRendererProps.md#args)
- [currentValue](client_internal_components_PropertyView_PropertyViewText.IPropertyViewTextRendererProps.md#currentvalue)
- [isRichText](client_internal_components_PropertyView_PropertyViewText.IPropertyViewTextRendererProps.md#isrichtext)
- [rtl](client_internal_components_PropertyView_PropertyViewText.IPropertyViewTextRendererProps.md#rtl)
- [subtype](client_internal_components_PropertyView_PropertyViewText.IPropertyViewTextRendererProps.md#subtype)

## Properties

### args

• **args**: `Object`

The renderer args

#### Index signature

▪ [arg: `string`]: `any`

#### Inherited from

[IPropertyViewRendererProps](client_internal_components_PropertyView.IPropertyViewRendererProps.md).[args](client_internal_components_PropertyView.IPropertyViewRendererProps.md#args)

#### Defined in

[client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/f2f29986/client/internal/renderer.ts#L19)

___

### currentValue

• **currentValue**: `string`

The current value to be displayed

#### Inherited from

[IPropertyViewRendererProps](client_internal_components_PropertyView.IPropertyViewRendererProps.md).[currentValue](client_internal_components_PropertyView.IPropertyViewRendererProps.md#currentvalue)

#### Defined in

[client/internal/components/PropertyView/index.tsx:43](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/index.tsx#L43)

___

### isRichText

• **isRichText**: `boolean`

Whether it is rich text, as in its subtype is html

#### Defined in

[client/internal/components/PropertyView/PropertyViewText.tsx:24](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/PropertyViewText.tsx#L24)

___

### rtl

• **rtl**: `boolean`

Whether it is in rtl mode for a rtl language

#### Inherited from

[IPropertyViewRendererProps](client_internal_components_PropertyView.IPropertyViewRendererProps.md).[rtl](client_internal_components_PropertyView.IPropertyViewRendererProps.md#rtl)

#### Defined in

[client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/f2f29986/client/internal/renderer.ts#L15)

___

### subtype

• **subtype**: ``"html"`` \| ``"plain"``

Whether it is type html or plain

#### Defined in

[client/internal/components/PropertyView/PropertyViewText.tsx:28](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/PropertyViewText.tsx#L28)
