[](../README.md) / [Exports](../modules.md) / [client/internal/text](../modules/client_internal_text.md) / IFeatureSupportOptions

# Interface: IFeatureSupportOptions

[client/internal/text](../modules/client_internal_text.md).IFeatureSupportOptions

The feature set that is supported in a given
sanitization or other context

## Hierarchy

* **IFeatureSupportOptions**

  ↳ [*IAccessibleFeatureSupportOptions*](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md)

## Table of contents

### Properties

- [supportedContainers](client_internal_text.ifeaturesupportoptions.md#supportedcontainers)
- [supportedCustoms](client_internal_text.ifeaturesupportoptions.md#supportedcustoms)
- [supportedRichClasses](client_internal_text.ifeaturesupportoptions.md#supportedrichclasses)
- [supportsContainers](client_internal_text.ifeaturesupportoptions.md#supportscontainers)
- [supportsCustom](client_internal_text.ifeaturesupportoptions.md#supportscustom)
- [supportsCustomStyles](client_internal_text.ifeaturesupportoptions.md#supportscustomstyles)
- [supportsExternalLinks](client_internal_text.ifeaturesupportoptions.md#supportsexternallinks)
- [supportsFiles](client_internal_text.ifeaturesupportoptions.md#supportsfiles)
- [supportsFilesAccept](client_internal_text.ifeaturesupportoptions.md#supportsfilesaccept)
- [supportsImages](client_internal_text.ifeaturesupportoptions.md#supportsimages)
- [supportsImagesAccept](client_internal_text.ifeaturesupportoptions.md#supportsimagesaccept)
- [supportsLinks](client_internal_text.ifeaturesupportoptions.md#supportslinks)
- [supportsLists](client_internal_text.ifeaturesupportoptions.md#supportslists)
- [supportsQuote](client_internal_text.ifeaturesupportoptions.md#supportsquote)
- [supportsRichClasses](client_internal_text.ifeaturesupportoptions.md#supportsrichclasses)
- [supportsTemplating](client_internal_text.ifeaturesupportoptions.md#supportstemplating)
- [supportsTitle](client_internal_text.ifeaturesupportoptions.md#supportstitle)
- [supportsVideos](client_internal_text.ifeaturesupportoptions.md#supportsvideos)

## Properties

### supportedContainers

• **supportedContainers**: *string*[]

The supported containers, might be null
if all supported, note that this will
not affect the base container

Defined in: [client/internal/text/index.tsx:230](https://github.com/onzag/itemize/blob/28218320/client/internal/text/index.tsx#L230)

___

### supportedCustoms

• **supportedCustoms**: *string*[]

the supported custom elements

Defined in: [client/internal/text/index.tsx:220](https://github.com/onzag/itemize/blob/28218320/client/internal/text/index.tsx#L220)

___

### supportedRichClasses

• **supportedRichClasses**: *string*[]

The supported rich classes, might be null
if all supported

Defined in: [client/internal/text/index.tsx:239](https://github.com/onzag/itemize/blob/28218320/client/internal/text/index.tsx#L239)

___

### supportsContainers

• **supportsContainers**: *boolean*

whether we support containers

Defined in: [client/internal/text/index.tsx:224](https://github.com/onzag/itemize/blob/28218320/client/internal/text/index.tsx#L224)

___

### supportsCustom

• **supportsCustom**: *boolean*

Whether we support customs

Defined in: [client/internal/text/index.tsx:216](https://github.com/onzag/itemize/blob/28218320/client/internal/text/index.tsx#L216)

___

### supportsCustomStyles

• **supportsCustomStyles**: *boolean*

Whether custom styles using the style tag
are acceptable

Defined in: [client/internal/text/index.tsx:207](https://github.com/onzag/itemize/blob/28218320/client/internal/text/index.tsx#L207)

___

### supportsExternalLinks

• **supportsExternalLinks**: *boolean*

Whether external links specifying an external
protocol outside the current page are acceptable

Defined in: [client/internal/text/index.tsx:190](https://github.com/onzag/itemize/blob/28218320/client/internal/text/index.tsx#L190)

___

### supportsFiles

• **supportsFiles**: *boolean*

Whether files are supporeted

Defined in: [client/internal/text/index.tsx:175](https://github.com/onzag/itemize/blob/28218320/client/internal/text/index.tsx#L175)

___

### supportsFilesAccept

• **supportsFilesAccept**: *string*

The accept type that the input should accept
for filling the file type, it can be null, if
it doesn't support files, or when viewing

Defined in: [client/internal/text/index.tsx:181](https://github.com/onzag/itemize/blob/28218320/client/internal/text/index.tsx#L181)

___

### supportsImages

• **supportsImages**: *boolean*

Whether it supports images

Defined in: [client/internal/text/index.tsx:161](https://github.com/onzag/itemize/blob/28218320/client/internal/text/index.tsx#L161)

___

### supportsImagesAccept

• **supportsImagesAccept**: *string*

The accept type that the input should accept
for filling the image type, it can be null, if
it doesn't support images, or when viewing

Defined in: [client/internal/text/index.tsx:167](https://github.com/onzag/itemize/blob/28218320/client/internal/text/index.tsx#L167)

___

### supportsLinks

• **supportsLinks**: *boolean*

Whether links are acceptable

Defined in: [client/internal/text/index.tsx:185](https://github.com/onzag/itemize/blob/28218320/client/internal/text/index.tsx#L185)

___

### supportsLists

• **supportsLists**: *boolean*

Whether lists are acceptable, ul, ol etc...

Defined in: [client/internal/text/index.tsx:194](https://github.com/onzag/itemize/blob/28218320/client/internal/text/index.tsx#L194)

___

### supportsQuote

• **supportsQuote**: *boolean*

Whether quotes are acceptable

Defined in: [client/internal/text/index.tsx:198](https://github.com/onzag/itemize/blob/28218320/client/internal/text/index.tsx#L198)

___

### supportsRichClasses

• **supportsRichClasses**: *boolean*

whether rich classes are supported

Defined in: [client/internal/text/index.tsx:234](https://github.com/onzag/itemize/blob/28218320/client/internal/text/index.tsx#L234)

___

### supportsTemplating

• **supportsTemplating**: *boolean*

Whether templating is supported

Defined in: [client/internal/text/index.tsx:211](https://github.com/onzag/itemize/blob/28218320/client/internal/text/index.tsx#L211)

___

### supportsTitle

• **supportsTitle**: *boolean*

Whether titles are acceptable

Defined in: [client/internal/text/index.tsx:202](https://github.com/onzag/itemize/blob/28218320/client/internal/text/index.tsx#L202)

___

### supportsVideos

• **supportsVideos**: *boolean*

Whether it supports videos

Defined in: [client/internal/text/index.tsx:171](https://github.com/onzag/itemize/blob/28218320/client/internal/text/index.tsx#L171)
