[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/sql/image-conversions

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/sql/image-conversions

This file contains the utility functions that take images as input and
transform it into all the different sizes that have been specified by the property
this is the case for files when a image type is detected

## Table of contents

### Functions

- [runImageConversions](base_Root_Module_ItemDefinition_PropertyDefinition_sql_image_conversions.md#runimageconversions)

## Functions

### runImageConversions

▸ **runImageConversions**(`imageStream`, `filePath`, `fileName`, `fileMimeType`, `uploadsClient`, `domain`, `propDef`): `Promise`<`void`\>

Runs the image conversions and stores them in the specified location

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `imageStream` | `ReadStream` | the read stream that contains the image |
| `filePath` | `string` | entire path, idef id and all where the file is to be stored |
| `fileName` | `string` | the name of the file, curated as it is to be stored |
| `fileMimeType` | `string` | the mime type that has been retreived of the stream |
| `uploadsClient` | [`default`](../classes/server_services_base_StorageProvider.default.md)<`any`\> | - |
| `domain` | `string` | - |
| `propDef` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property definition that this refers to |

#### Returns

`Promise`<`void`\>

a void promise for when this is done

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/image-conversions.ts:114](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/PropertyDefinition/sql/image-conversions.ts#L114)
