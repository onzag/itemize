[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyView/PropertyViewFile](../modules/client_internal_components_PropertyView_PropertyViewFile.md) / IPropertyViewFileRendererProps

# Interface: IPropertyViewFileRendererProps

[client/internal/components/PropertyView/PropertyViewFile](../modules/client_internal_components_PropertyView_PropertyViewFile.md).IPropertyViewFileRendererProps

The property view renderer props that every property renderer
for file contains

## Hierarchy

- [`IPropertyViewRendererProps`](client_internal_components_PropertyView.IPropertyViewRendererProps.md)<[`PropertyDefinitionSupportedFileType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_file.md#propertydefinitionsupportedfiletype)\>

  ↳ **`IPropertyViewFileRendererProps`**

## Table of contents

### Properties

- [args](client_internal_components_PropertyView_PropertyViewFile.IPropertyViewFileRendererProps.md#args)
- [currentValue](client_internal_components_PropertyView_PropertyViewFile.IPropertyViewFileRendererProps.md#currentvalue)
- [extension](client_internal_components_PropertyView_PropertyViewFile.IPropertyViewFileRendererProps.md#extension)
- [imageSrcSet](client_internal_components_PropertyView_PropertyViewFile.IPropertyViewFileRendererProps.md#imagesrcset)
- [isSupportedImage](client_internal_components_PropertyView_PropertyViewFile.IPropertyViewFileRendererProps.md#issupportedimage)
- [prettySize](client_internal_components_PropertyView_PropertyViewFile.IPropertyViewFileRendererProps.md#prettysize)
- [rtl](client_internal_components_PropertyView_PropertyViewFile.IPropertyViewFileRendererProps.md#rtl)

### Methods

- [openFile](client_internal_components_PropertyView_PropertyViewFile.IPropertyViewFileRendererProps.md#openfile)

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

• **currentValue**: [`IGQLFile`](gql_querier.IGQLFile.md)

The current value to be displayed

#### Inherited from

[IPropertyViewRendererProps](client_internal_components_PropertyView.IPropertyViewRendererProps.md).[currentValue](client_internal_components_PropertyView.IPropertyViewRendererProps.md#currentvalue)

#### Defined in

[client/internal/components/PropertyView/index.tsx:43](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/index.tsx#L43)

___

### extension

• **extension**: `string`

The extension of that file

#### Defined in

[client/internal/components/PropertyView/PropertyViewFile.tsx:37](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/PropertyViewFile.tsx#L37)

___

### imageSrcSet

• **imageSrcSet**: `string`

If it's a supported image, the source set
that is attached to that image

#### Defined in

[client/internal/components/PropertyView/PropertyViewFile.tsx:29](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/PropertyViewFile.tsx#L29)

___

### isSupportedImage

• **isSupportedImage**: `boolean`

whether the file is a supported image

#### Defined in

[client/internal/components/PropertyView/PropertyViewFile.tsx:24](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/PropertyViewFile.tsx#L24)

___

### prettySize

• **prettySize**: `string`

The size of the file in a human readable form

#### Defined in

[client/internal/components/PropertyView/PropertyViewFile.tsx:33](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/PropertyViewFile.tsx#L33)

___

### rtl

• **rtl**: `boolean`

Whether it is in rtl mode for a rtl language

#### Inherited from

[IPropertyViewRendererProps](client_internal_components_PropertyView.IPropertyViewRendererProps.md).[rtl](client_internal_components_PropertyView.IPropertyViewRendererProps.md#rtl)

#### Defined in

[client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/f2f29986/client/internal/renderer.ts#L15)

## Methods

### openFile

▸ **openFile**(): `void`

open the current file

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyView/PropertyViewFile.tsx:41](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/PropertyViewFile.tsx#L41)
