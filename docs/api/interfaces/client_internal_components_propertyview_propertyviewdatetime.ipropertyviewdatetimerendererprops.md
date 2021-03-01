[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertyView/PropertyViewDateTime](../modules/client_internal_components_propertyview_propertyviewdatetime.md) / IPropertyViewDateTimeRendererProps

# Interface: IPropertyViewDateTimeRendererProps

[client/internal/components/PropertyView/PropertyViewDateTime](../modules/client_internal_components_propertyview_propertyviewdatetime.md).IPropertyViewDateTimeRendererProps

The property view date renderer

## Hierarchy

* [*IPropertyViewRendererProps*](client_internal_components_propertyview.ipropertyviewrendererprops.md)<string\>

  ↳ **IPropertyViewDateTimeRendererProps**

## Table of contents

### Properties

- [args](client_internal_components_propertyview_propertyviewdatetime.ipropertyviewdatetimerendererprops.md#args)
- [currentValue](client_internal_components_propertyview_propertyviewdatetime.ipropertyviewdatetimerendererprops.md#currentvalue)
- [dbFormat](client_internal_components_propertyview_propertyviewdatetime.ipropertyviewdatetimerendererprops.md#dbformat)
- [defaultFormat](client_internal_components_propertyview_propertyviewdatetime.ipropertyviewdatetimerendererprops.md#defaultformat)
- [defaultFormattedValue](client_internal_components_propertyview_propertyviewdatetime.ipropertyviewdatetimerendererprops.md#defaultformattedvalue)
- [momentValue](client_internal_components_propertyview_propertyviewdatetime.ipropertyviewdatetimerendererprops.md#momentvalue)
- [rtl](client_internal_components_propertyview_propertyviewdatetime.ipropertyviewdatetimerendererprops.md#rtl)

## Properties

### args

• **args**: *object*

The renderer args

#### Type declaration:

Inherited from: [IPropertyViewRendererProps](client_internal_components_propertyview.ipropertyviewrendererprops.md).[args](client_internal_components_propertyview.ipropertyviewrendererprops.md#args)

Defined in: [client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/renderer.ts#L19)

___

### currentValue

• **currentValue**: *string*

The current value to be displayed

Inherited from: [IPropertyViewRendererProps](client_internal_components_propertyview.ipropertyviewrendererprops.md).[currentValue](client_internal_components_propertyview.ipropertyviewrendererprops.md#currentvalue)

Defined in: [client/internal/components/PropertyView/index.tsx:43](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyView/index.tsx#L43)

___

### dbFormat

• **dbFormat**: *string*

database format used for parsing

Defined in: [client/internal/components/PropertyView/PropertyViewDateTime.tsx:24](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyView/PropertyViewDateTime.tsx#L24)

___

### defaultFormat

• **defaultFormat**: *string*

default format used for displaying according to moment
in the user's language

Defined in: [client/internal/components/PropertyView/PropertyViewDateTime.tsx:29](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyView/PropertyViewDateTime.tsx#L29)

___

### defaultFormattedValue

• **defaultFormattedValue**: *string*

The value already formatted in such form
using moment

Defined in: [client/internal/components/PropertyView/PropertyViewDateTime.tsx:34](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyView/PropertyViewDateTime.tsx#L34)

___

### momentValue

• **momentValue**: Moment

Current value as moment type

Defined in: [client/internal/components/PropertyView/PropertyViewDateTime.tsx:20](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyView/PropertyViewDateTime.tsx#L20)

___

### rtl

• **rtl**: *boolean*

Whether it is in rtl mode for a rtl language

Inherited from: [IPropertyViewRendererProps](client_internal_components_propertyview.ipropertyviewrendererprops.md).[rtl](client_internal_components_propertyview.ipropertyviewrendererprops.md#rtl)

Defined in: [client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/renderer.ts#L15)
