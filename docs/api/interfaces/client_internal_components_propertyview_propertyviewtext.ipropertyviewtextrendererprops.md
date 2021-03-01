[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertyView/PropertyViewText](../modules/client_internal_components_propertyview_propertyviewtext.md) / IPropertyViewTextRendererProps

# Interface: IPropertyViewTextRendererProps

[client/internal/components/PropertyView/PropertyViewText](../modules/client_internal_components_propertyview_propertyviewtext.md).IPropertyViewTextRendererProps

The property view renderer props as it requires the properties
note that this renderer is only used for html and plain, but not for the default
null subtype

## Hierarchy

* [*IPropertyViewRendererProps*](client_internal_components_propertyview.ipropertyviewrendererprops.md)<[*PropertyDefinitionSupportedTextType*](../modules/base_root_module_itemdefinition_propertydefinition_types_text.md#propertydefinitionsupportedtexttype)\>

  ↳ **IPropertyViewTextRendererProps**

## Table of contents

### Properties

- [args](client_internal_components_propertyview_propertyviewtext.ipropertyviewtextrendererprops.md#args)
- [currentValue](client_internal_components_propertyview_propertyviewtext.ipropertyviewtextrendererprops.md#currentvalue)
- [isRichText](client_internal_components_propertyview_propertyviewtext.ipropertyviewtextrendererprops.md#isrichtext)
- [rtl](client_internal_components_propertyview_propertyviewtext.ipropertyviewtextrendererprops.md#rtl)
- [subtype](client_internal_components_propertyview_propertyviewtext.ipropertyviewtextrendererprops.md#subtype)

## Properties

### args

• **args**: *object*

The renderer args

#### Type declaration:

Inherited from: [IPropertyViewRendererProps](client_internal_components_propertyview.ipropertyviewrendererprops.md).[args](client_internal_components_propertyview.ipropertyviewrendererprops.md#args)

Defined in: [client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/renderer.ts#L19)

___

### currentValue

• **currentValue**: *string*

The current value to be displayed

Inherited from: [IPropertyViewRendererProps](client_internal_components_propertyview.ipropertyviewrendererprops.md).[currentValue](client_internal_components_propertyview.ipropertyviewrendererprops.md#currentvalue)

Defined in: [client/internal/components/PropertyView/index.tsx:43](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyView/index.tsx#L43)

___

### isRichText

• **isRichText**: *boolean*

Whether it is rich text, as in its subtype is html

Defined in: [client/internal/components/PropertyView/PropertyViewText.tsx:23](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyView/PropertyViewText.tsx#L23)

___

### rtl

• **rtl**: *boolean*

Whether it is in rtl mode for a rtl language

Inherited from: [IPropertyViewRendererProps](client_internal_components_propertyview.ipropertyviewrendererprops.md).[rtl](client_internal_components_propertyview.ipropertyviewrendererprops.md#rtl)

Defined in: [client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/renderer.ts#L15)

___

### subtype

• **subtype**: *html* \| *plain*

Whether it is type html or plain

Defined in: [client/internal/components/PropertyView/PropertyViewText.tsx:27](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyView/PropertyViewText.tsx#L27)
