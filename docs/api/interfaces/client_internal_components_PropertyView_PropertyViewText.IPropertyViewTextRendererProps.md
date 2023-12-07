[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyView/PropertyViewText](../modules/client_internal_components_PropertyView_PropertyViewText.md) / IPropertyViewTextRendererProps

# Interface: IPropertyViewTextRendererProps

[client/internal/components/PropertyView/PropertyViewText](../modules/client_internal_components_PropertyView_PropertyViewText.md).IPropertyViewTextRendererProps

The property view renderer props as it requires the properties
note that this renderer is only used for html and plain, but not for the default
null subtype

## Hierarchy

- [`IPropertyViewRendererProps`](client_internal_components_PropertyView.IPropertyViewRendererProps.md)<[`IPropertyDefinitionSupportedTextType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md)\>

  ↳ **`IPropertyViewTextRendererProps`**

## Table of contents

### Properties

- [args](client_internal_components_PropertyView_PropertyViewText.IPropertyViewTextRendererProps.md#args)
- [currentValue](client_internal_components_PropertyView_PropertyViewText.IPropertyViewTextRendererProps.md#currentvalue)
- [currentValueLang](client_internal_components_PropertyView_PropertyViewText.IPropertyViewTextRendererProps.md#currentvaluelang)
- [currentValueText](client_internal_components_PropertyView_PropertyViewText.IPropertyViewTextRendererProps.md#currentvaluetext)
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

[client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/a24376ed/client/internal/renderer.ts#L19)

___

### currentValue

• **currentValue**: [`IPropertyDefinitionSupportedTextType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md)

The current value to be displayed

#### Inherited from

[IPropertyViewRendererProps](client_internal_components_PropertyView.IPropertyViewRendererProps.md).[currentValue](client_internal_components_PropertyView.IPropertyViewRendererProps.md#currentvalue)

#### Defined in

[client/internal/components/PropertyView/index.tsx:44](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyView/index.tsx#L44)

___

### currentValueLang

• **currentValueLang**: `string`

The language used, or null, if no language found

#### Defined in

[client/internal/components/PropertyView/PropertyViewText.tsx:30](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyView/PropertyViewText.tsx#L30)

___

### currentValueText

• **currentValueText**: `string`

A safe sanitized and processed value to use
with the text type

#### Defined in

[client/internal/components/PropertyView/PropertyViewText.tsx:25](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyView/PropertyViewText.tsx#L25)

___

### isRichText

• **isRichText**: `boolean`

Whether it is rich text, as in its subtype is html

#### Defined in

[client/internal/components/PropertyView/PropertyViewText.tsx:35](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyView/PropertyViewText.tsx#L35)

___

### rtl

• **rtl**: `boolean`

Whether it is in rtl mode for a rtl language

#### Inherited from

[IPropertyViewRendererProps](client_internal_components_PropertyView.IPropertyViewRendererProps.md).[rtl](client_internal_components_PropertyView.IPropertyViewRendererProps.md#rtl)

#### Defined in

[client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/a24376ed/client/internal/renderer.ts#L15)

___

### subtype

• **subtype**: ``"html"`` \| ``"plain"``

Whether it is type html or plain

#### Defined in

[client/internal/components/PropertyView/PropertyViewText.tsx:39](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyView/PropertyViewText.tsx#L39)
