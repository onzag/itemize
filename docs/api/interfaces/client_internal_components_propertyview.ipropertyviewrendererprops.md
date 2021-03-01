[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertyView](../modules/client_internal_components_propertyview.md) / IPropertyViewRendererProps

# Interface: IPropertyViewRendererProps<ValueType\>

[client/internal/components/PropertyView](../modules/client_internal_components_propertyview.md).IPropertyViewRendererProps

This is what every view renderer gets

Expect these to be extended

## Type parameters

Name |
:------ |
`ValueType` |

## Hierarchy

* [*IRendererProps*](client_internal_renderer.irendererprops.md)

  ↳ **IPropertyViewRendererProps**

  ↳↳ [*IPropertyViewBooleanRendererProps*](client_internal_components_propertyview_propertyviewboolean.ipropertyviewbooleanrendererprops.md)

  ↳↳ [*IPropertyViewCurrencyRendererProps*](client_internal_components_propertyview_propertyviewcurrency.ipropertyviewcurrencyrendererprops.md)

  ↳↳ [*IPropertyViewDateTimeRendererProps*](client_internal_components_propertyview_propertyviewdatetime.ipropertyviewdatetimerendererprops.md)

  ↳↳ [*IPropertyViewFileRendererProps*](client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)

  ↳↳ [*IPropertyViewLocationRendererProps*](client_internal_components_propertyview_propertyviewlocation.ipropertyviewlocationrendererprops.md)

  ↳↳ [*IPropertyViewSimpleRendererProps*](client_internal_components_propertyview_propertyviewsimple.ipropertyviewsimplerendererprops.md)

  ↳↳ [*IPropertyViewTextRendererProps*](client_internal_components_propertyview_propertyviewtext.ipropertyviewtextrendererprops.md)

## Table of contents

### Properties

- [args](client_internal_components_propertyview.ipropertyviewrendererprops.md#args)
- [currentValue](client_internal_components_propertyview.ipropertyviewrendererprops.md#currentvalue)
- [rtl](client_internal_components_propertyview.ipropertyviewrendererprops.md#rtl)

## Properties

### args

• **args**: *object*

The renderer args

#### Type declaration:

Inherited from: [IRendererProps](client_internal_renderer.irendererprops.md).[args](client_internal_renderer.irendererprops.md#args)

Defined in: [client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/28218320/client/internal/renderer.ts#L19)

___

### currentValue

• **currentValue**: ValueType

The current value to be displayed

Defined in: [client/internal/components/PropertyView/index.tsx:43](https://github.com/onzag/itemize/blob/28218320/client/internal/components/PropertyView/index.tsx#L43)

___

### rtl

• **rtl**: *boolean*

Whether it is in rtl mode for a rtl language

Inherited from: [IRendererProps](client_internal_renderer.irendererprops.md).[rtl](client_internal_renderer.irendererprops.md#rtl)

Defined in: [client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/28218320/client/internal/renderer.ts#L15)
