[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/util

# Module: client/components/util

Containst very useful utility functions that are used within
the itemize application for many purposes

## Table of contents

### Classes

- [DelayDisplay](../classes/client_components_util.DelayDisplay.md)

### Interfaces

- [IImageSizes](../interfaces/client_components_util.IImageSizes.md)

### Functions

- [cacheableQSLoader](client_components_util.md#cacheableqsloader)
- [imageSizeRetriever](client_components_util.md#imagesizeretriever)
- [imageSrcSetRetriever](client_components_util.md#imagesrcsetretriever)

## Functions

### cacheableQSLoader

▸ **cacheableQSLoader**(`url`, `recheck?`): `string`

Allows to load images that are remote, but yet uses the service worker logic in order to cache these
images and keep them up to date

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | the url to request where the image is and to cache from |
| `recheck?` | `boolean` | whether to constantly recheck this image for updates, mainly useless, unless loading from other sources |

#### Returns

`string`

a query string url with the service worker query string parameters

#### Defined in

[client/components/util/index.tsx:273](https://github.com/onzag/itemize/blob/73e0c39e/client/components/util/index.tsx#L273)

___

### imageSizeRetriever

▸ **imageSizeRetriever**(`fileData`): [`IImageSizes`](../interfaces/client_components_util.IImageSizes.md)

Gets all the available image sizes for a given file

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileData` | [`IRQFile`](../interfaces/rq_querier.IRQFile.md) | the file data |

#### Returns

[`IImageSizes`](../interfaces/client_components_util.IImageSizes.md)

#### Defined in

[client/components/util/index.tsx:197](https://github.com/onzag/itemize/blob/73e0c39e/client/components/util/index.tsx#L197)

___

### imageSrcSetRetriever

▸ **imageSrcSetRetriever**(`fileData`, `property`, `imageSizes?`): `string`

The image source set retriver allows to generate a srcset based on a property, the current file
data value, and optionally the image sizes (obtained via the imageSizeRetriever in this same file)
if image sizes are not provided they are calculated

Note that sometimes srcset is empty eg. image is a svg or it currently represents a local blob yes
local files are supported

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileData` | [`IRQFile`](../interfaces/rq_querier.IRQFile.md) | the file itself |
| `property` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property in question this file applies to |
| `imageSizes?` | [`IImageSizes`](../interfaces/client_components_util.IImageSizes.md) | an optional already calculated image sizes, via the imageSizeRetriever; if not provided it is calculated |

#### Returns

`string`

#### Defined in

[client/components/util/index.tsx:25](https://github.com/onzag/itemize/blob/73e0c39e/client/components/util/index.tsx#L25)
