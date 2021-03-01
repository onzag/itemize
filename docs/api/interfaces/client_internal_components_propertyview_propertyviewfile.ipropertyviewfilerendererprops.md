[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertyView/PropertyViewFile](../modules/client_internal_components_propertyview_propertyviewfile.md) / IPropertyViewFileRendererProps

# Interface: IPropertyViewFileRendererProps

[client/internal/components/PropertyView/PropertyViewFile](../modules/client_internal_components_propertyview_propertyviewfile.md).IPropertyViewFileRendererProps

The property view renderer props that every property renderer
for file contains

## Hierarchy

* [*IPropertyViewRendererProps*](client_internal_components_propertyview.ipropertyviewrendererprops.md)<[*PropertyDefinitionSupportedFileType*](../modules/base_root_module_itemdefinition_propertydefinition_types_file.md#propertydefinitionsupportedfiletype)\>

  ↳ **IPropertyViewFileRendererProps**

## Table of contents

### Properties

- [args](client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md#args)
- [currentValue](client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md#currentvalue)
- [extension](client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md#extension)
- [imageSrcSet](client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md#imagesrcset)
- [isSupportedImage](client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md#issupportedimage)
- [openFile](client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md#openfile)
- [prettySize](client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md#prettysize)
- [rtl](client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md#rtl)

## Properties

### args

• **args**: *object*

The renderer args

#### Type declaration:

Inherited from: [IPropertyViewRendererProps](client_internal_components_propertyview.ipropertyviewrendererprops.md).[args](client_internal_components_propertyview.ipropertyviewrendererprops.md#args)

Defined in: [client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/renderer.ts#L19)

___

### currentValue

• **currentValue**: [*IGQLFile*](gql_querier.igqlfile.md)

The current value to be displayed

Inherited from: [IPropertyViewRendererProps](client_internal_components_propertyview.ipropertyviewrendererprops.md).[currentValue](client_internal_components_propertyview.ipropertyviewrendererprops.md#currentvalue)

Defined in: [client/internal/components/PropertyView/index.tsx:43](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyView/index.tsx#L43)

___

### extension

• **extension**: *string*

The extension of that file

Defined in: [client/internal/components/PropertyView/PropertyViewFile.tsx:36](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyView/PropertyViewFile.tsx#L36)

___

### imageSrcSet

• **imageSrcSet**: *string*

If it's a supported image, the source set
that is attached to that image

Defined in: [client/internal/components/PropertyView/PropertyViewFile.tsx:28](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyView/PropertyViewFile.tsx#L28)

___

### isSupportedImage

• **isSupportedImage**: *boolean*

whether the file is a supported image

Defined in: [client/internal/components/PropertyView/PropertyViewFile.tsx:23](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyView/PropertyViewFile.tsx#L23)

___

### openFile

• **openFile**: () => *void*

open the current file

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyView/PropertyViewFile.tsx:40](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyView/PropertyViewFile.tsx#L40)

Defined in: [client/internal/components/PropertyView/PropertyViewFile.tsx:40](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyView/PropertyViewFile.tsx#L40)

___

### prettySize

• **prettySize**: *string*

The size of the file in a human readable form

Defined in: [client/internal/components/PropertyView/PropertyViewFile.tsx:32](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/components/PropertyView/PropertyViewFile.tsx#L32)

___

### rtl

• **rtl**: *boolean*

Whether it is in rtl mode for a rtl language

Inherited from: [IPropertyViewRendererProps](client_internal_components_propertyview.ipropertyviewrendererprops.md).[rtl](client_internal_components_propertyview.ipropertyviewrendererprops.md#rtl)

Defined in: [client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/renderer.ts#L15)
