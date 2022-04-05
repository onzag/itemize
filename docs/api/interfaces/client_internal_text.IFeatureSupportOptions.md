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

[client/internal/text/index.tsx:231](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/index.tsx#L231)

___

### supportedCustoms

• **supportedCustoms**: `string`[]

the supported custom elements

#### Defined in

[client/internal/text/index.tsx:221](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/index.tsx#L221)

___

### supportedRichClasses

• **supportedRichClasses**: `string`[]

The supported rich classes, might be null
if all supported

#### Defined in

[client/internal/text/index.tsx:240](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/index.tsx#L240)

___

### supportsContainers

• **supportsContainers**: `boolean`

whether we support containers

#### Defined in

[client/internal/text/index.tsx:225](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/index.tsx#L225)

___

### supportsCustom

• **supportsCustom**: `boolean`

Whether we support customs

#### Defined in

[client/internal/text/index.tsx:217](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/index.tsx#L217)

___

### supportsCustomStyles

• **supportsCustomStyles**: `boolean`

Whether custom styles using the style tag
are acceptable

#### Defined in

[client/internal/text/index.tsx:208](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/index.tsx#L208)

___

### supportsExternalLinks

• **supportsExternalLinks**: `boolean`

Whether external links specifying an external
protocol outside the current page are acceptable

#### Defined in

[client/internal/text/index.tsx:191](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/index.tsx#L191)

___

### supportsFiles

• **supportsFiles**: `boolean`

Whether files are supporeted

#### Defined in

[client/internal/text/index.tsx:176](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/index.tsx#L176)

___

### supportsFilesAccept

• **supportsFilesAccept**: `string`

The accept type that the input should accept
for filling the file type, it can be null, if
it doesn't support files, or when viewing

#### Defined in

[client/internal/text/index.tsx:182](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/index.tsx#L182)

___

### supportsImages

• **supportsImages**: `boolean`

Whether it supports images

#### Defined in

[client/internal/text/index.tsx:162](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/index.tsx#L162)

___

### supportsImagesAccept

• **supportsImagesAccept**: `string`

The accept type that the input should accept
for filling the image type, it can be null, if
it doesn't support images, or when viewing

#### Defined in

[client/internal/text/index.tsx:168](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/index.tsx#L168)

___

### supportsLinks

• **supportsLinks**: `boolean`

Whether links are acceptable

#### Defined in

[client/internal/text/index.tsx:186](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/index.tsx#L186)

___

### supportsLists

• **supportsLists**: `boolean`

Whether lists are acceptable, ul, ol etc...

#### Defined in

[client/internal/text/index.tsx:195](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/index.tsx#L195)

___

### supportsQuote

• **supportsQuote**: `boolean`

Whether quotes are acceptable

#### Defined in

[client/internal/text/index.tsx:199](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/index.tsx#L199)

___

### supportsRichClasses

• **supportsRichClasses**: `boolean`

whether rich classes are supported

#### Defined in

[client/internal/text/index.tsx:235](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/index.tsx#L235)

___

### supportsTemplating

• **supportsTemplating**: `boolean`

Whether templating is supported

#### Defined in

[client/internal/text/index.tsx:212](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/index.tsx#L212)

___

### supportsTitle

• **supportsTitle**: `boolean`

Whether titles are acceptable

#### Defined in

[client/internal/text/index.tsx:203](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/index.tsx#L203)

___

### supportsVideos

• **supportsVideos**: `boolean`

Whether it supports videos

#### Defined in

[client/internal/text/index.tsx:172](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/index.tsx#L172)
