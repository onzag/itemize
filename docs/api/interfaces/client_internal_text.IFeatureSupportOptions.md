[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/text](../modules/client_internal_text.md) / IFeatureSupportOptions

# Interface: IFeatureSupportOptions

[client/internal/text](../modules/client_internal_text.md).IFeatureSupportOptions

The feature set that is supported in a given
sanitization or other context

## Hierarchy

- **`IFeatureSupportOptions`**

  ↳ [`IAccessibleFeatureSupportOptions`](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md)

## Table of contents

### Properties

- [supportedContainers](client_internal_text.IFeatureSupportOptions.md#supportedcontainers)
- [supportedCustoms](client_internal_text.IFeatureSupportOptions.md#supportedcustoms)
- [supportedRichClasses](client_internal_text.IFeatureSupportOptions.md#supportedrichclasses)
- [supportedTables](client_internal_text.IFeatureSupportOptions.md#supportedtables)
- [supportsContainers](client_internal_text.IFeatureSupportOptions.md#supportscontainers)
- [supportsCustom](client_internal_text.IFeatureSupportOptions.md#supportscustom)
- [supportsCustomStyles](client_internal_text.IFeatureSupportOptions.md#supportscustomstyles)
- [supportsExternalLinks](client_internal_text.IFeatureSupportOptions.md#supportsexternallinks)
- [supportsFiles](client_internal_text.IFeatureSupportOptions.md#supportsfiles)
- [supportsFilesAccept](client_internal_text.IFeatureSupportOptions.md#supportsfilesaccept)
- [supportsImages](client_internal_text.IFeatureSupportOptions.md#supportsimages)
- [supportsImagesAccept](client_internal_text.IFeatureSupportOptions.md#supportsimagesaccept)
- [supportsLinks](client_internal_text.IFeatureSupportOptions.md#supportslinks)
- [supportsLists](client_internal_text.IFeatureSupportOptions.md#supportslists)
- [supportsQuote](client_internal_text.IFeatureSupportOptions.md#supportsquote)
- [supportsRichClasses](client_internal_text.IFeatureSupportOptions.md#supportsrichclasses)
- [supportsTables](client_internal_text.IFeatureSupportOptions.md#supportstables)
- [supportsTemplating](client_internal_text.IFeatureSupportOptions.md#supportstemplating)
- [supportsTitle](client_internal_text.IFeatureSupportOptions.md#supportstitle)
- [supportsVideos](client_internal_text.IFeatureSupportOptions.md#supportsvideos)

## Properties

### supportedContainers

• **supportedContainers**: `string`[]

The supported containers, might be null
if all supported, note that this will
not affect the base container

#### Defined in

[client/internal/text/index.tsx:254](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L254)

___

### supportedCustoms

• **supportedCustoms**: `string`[]

the supported custom elements

#### Defined in

[client/internal/text/index.tsx:244](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L244)

___

### supportedRichClasses

• **supportedRichClasses**: `string`[]

The supported rich classes, might be null
if all supported

#### Defined in

[client/internal/text/index.tsx:271](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L271)

___

### supportedTables

• **supportedTables**: `string`[]

The list of supported tables

#### Defined in

[client/internal/text/index.tsx:262](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L262)

___

### supportsContainers

• **supportsContainers**: `boolean`

whether we support containers

#### Defined in

[client/internal/text/index.tsx:248](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L248)

___

### supportsCustom

• **supportsCustom**: `boolean`

Whether we support customs

#### Defined in

[client/internal/text/index.tsx:240](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L240)

___

### supportsCustomStyles

• **supportsCustomStyles**: `boolean`

Whether custom styles using the style tag
are acceptable

#### Defined in

[client/internal/text/index.tsx:231](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L231)

___

### supportsExternalLinks

• **supportsExternalLinks**: `boolean`

Whether external links specifying an external
protocol outside the current page are acceptable

#### Defined in

[client/internal/text/index.tsx:214](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L214)

___

### supportsFiles

• **supportsFiles**: `boolean`

Whether files are supporeted

#### Defined in

[client/internal/text/index.tsx:199](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L199)

___

### supportsFilesAccept

• **supportsFilesAccept**: `string`

The accept type that the input should accept
for filling the file type, it can be null, if
it doesn't support files, or when viewing

#### Defined in

[client/internal/text/index.tsx:205](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L205)

___

### supportsImages

• **supportsImages**: `boolean`

Whether it supports images

#### Defined in

[client/internal/text/index.tsx:185](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L185)

___

### supportsImagesAccept

• **supportsImagesAccept**: `string`

The accept type that the input should accept
for filling the image type, it can be null, if
it doesn't support images, or when viewing

#### Defined in

[client/internal/text/index.tsx:191](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L191)

___

### supportsLinks

• **supportsLinks**: `boolean`

Whether links are acceptable

#### Defined in

[client/internal/text/index.tsx:209](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L209)

___

### supportsLists

• **supportsLists**: `boolean`

Whether lists are acceptable, ul, ol etc...

#### Defined in

[client/internal/text/index.tsx:218](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L218)

___

### supportsQuote

• **supportsQuote**: `boolean`

Whether quotes are acceptable

#### Defined in

[client/internal/text/index.tsx:222](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L222)

___

### supportsRichClasses

• **supportsRichClasses**: `boolean`

whether rich classes are supported

#### Defined in

[client/internal/text/index.tsx:266](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L266)

___

### supportsTables

• **supportsTables**: `boolean`

Whether tables are supported

#### Defined in

[client/internal/text/index.tsx:258](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L258)

___

### supportsTemplating

• **supportsTemplating**: `boolean`

Whether templating is supported

#### Defined in

[client/internal/text/index.tsx:235](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L235)

___

### supportsTitle

• **supportsTitle**: `boolean`

Whether titles are acceptable

#### Defined in

[client/internal/text/index.tsx:226](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L226)

___

### supportsVideos

• **supportsVideos**: `boolean`

Whether it supports videos

#### Defined in

[client/internal/text/index.tsx:195](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L195)
