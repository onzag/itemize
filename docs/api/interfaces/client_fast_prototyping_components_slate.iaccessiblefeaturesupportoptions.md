[](../README.md) / [Exports](../modules.md) / [client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md) / IAccessibleFeatureSupportOptions

# Interface: IAccessibleFeatureSupportOptions

[client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md).IAccessibleFeatureSupportOptions

Represents an extended set of the features that the editor supports
with a lot more of contextual information on what it has in place
for such

## Hierarchy

* [*IFeatureSupportOptions*](client_internal_text.ifeaturesupportoptions.md)

  ↳ **IAccessibleFeatureSupportOptions**

## Table of contents

### Properties

- [availableContainers](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#availablecontainers)
- [availableCustoms](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#availablecustoms)
- [availableRichClasses](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#availablerichclasses)
- [canInsertAnyElement](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#caninsertanyelement)
- [canInsertContainer](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#caninsertcontainer)
- [canInsertCustom](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#caninsertcustom)
- [canInsertFile](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#caninsertfile)
- [canInsertImage](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#caninsertimage)
- [canInsertLink](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#caninsertlink)
- [canInsertList](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#caninsertlist)
- [canInsertQuote](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#caninsertquote)
- [canInsertRichClass](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#caninsertrichclass)
- [canInsertTitle](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#caninserttitle)
- [canInsertVideo](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#caninsertvideo)
- [canSetActionFunction](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#cansetactionfunction)
- [canSetActiveStyle](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#cansetactivestyle)
- [canSetDynamicHref](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#cansetdynamichref)
- [canSetHoverStyle](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#cansethoverstyle)
- [canSetLoop](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#cansetloop)
- [canSetStyle](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#cansetstyle)
- [canSetUIHandler](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#cansetuihandler)
- [supportedContainers](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#supportedcontainers)
- [supportedCustoms](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#supportedcustoms)
- [supportedRichClasses](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#supportedrichclasses)
- [supportsContainers](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#supportscontainers)
- [supportsCustom](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#supportscustom)
- [supportsCustomStyles](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#supportscustomstyles)
- [supportsExternalLinks](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#supportsexternallinks)
- [supportsFiles](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#supportsfiles)
- [supportsFilesAccept](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#supportsfilesaccept)
- [supportsImages](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#supportsimages)
- [supportsImagesAccept](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#supportsimagesaccept)
- [supportsLinks](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#supportslinks)
- [supportsLists](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#supportslists)
- [supportsQuote](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#supportsquote)
- [supportsRichClasses](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#supportsrichclasses)
- [supportsTemplating](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#supportstemplating)
- [supportsTitle](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#supportstitle)
- [supportsVideos](client_fast_prototyping_components_slate.iaccessiblefeaturesupportoptions.md#supportsvideos)

## Properties

### availableContainers

• **availableContainers**: IAvailableElementCSSClassName[]

The classes that are available for the containers

Defined in: [client/fast-prototyping/components/slate/index.tsx:597](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/components/slate/index.tsx#L597)

___

### availableCustoms

• **availableCustoms**: IAvailableElementCSSClassName[]

The customs that are available

Defined in: [client/fast-prototyping/components/slate/index.tsx:593](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/components/slate/index.tsx#L593)

___

### availableRichClasses

• **availableRichClasses**: IAvailableElementCSSClassName[]

The classes that are available by the rich text
non prefixed

Defined in: [client/fast-prototyping/components/slate/index.tsx:589](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/components/slate/index.tsx#L589)

___

### canInsertAnyElement

• **canInsertAnyElement**: *boolean*

Able to insert any custom element from
custom toolbar

Defined in: [client/fast-prototyping/components/slate/index.tsx:583](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/components/slate/index.tsx#L583)

___

### canInsertContainer

• **canInsertContainer**: *boolean*

Whether a container can be inserted at the given location

Defined in: [client/fast-prototyping/components/slate/index.tsx:521](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/components/slate/index.tsx#L521)

___

### canInsertCustom

• **canInsertCustom**: *boolean*

Whether a custom element can be inserted at the given
location

Defined in: [client/fast-prototyping/components/slate/index.tsx:530](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/components/slate/index.tsx#L530)

___

### canInsertFile

• **canInsertFile**: *boolean*

Whether a file can be inserted at the given location

Defined in: [client/fast-prototyping/components/slate/index.tsx:513](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/components/slate/index.tsx#L513)

___

### canInsertImage

• **canInsertImage**: *boolean*

Whether an image can be inserted at the given location

Defined in: [client/fast-prototyping/components/slate/index.tsx:505](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/components/slate/index.tsx#L505)

___

### canInsertLink

• **canInsertLink**: *boolean*

Whether a link can be inserted at the given location

Defined in: [client/fast-prototyping/components/slate/index.tsx:517](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/components/slate/index.tsx#L517)

___

### canInsertList

• **canInsertList**: *boolean*

Whether a list can be inserted at the given location

Defined in: [client/fast-prototyping/components/slate/index.tsx:525](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/components/slate/index.tsx#L525)

___

### canInsertQuote

• **canInsertQuote**: *boolean*

Whether a quote can be inserted at the given location

Defined in: [client/fast-prototyping/components/slate/index.tsx:534](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/components/slate/index.tsx#L534)

___

### canInsertRichClass

• **canInsertRichClass**: *boolean*

Whether a rich class element can be inserted at the given location

Defined in: [client/fast-prototyping/components/slate/index.tsx:542](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/components/slate/index.tsx#L542)

___

### canInsertTitle

• **canInsertTitle**: *boolean*

Whether a title element can be inserted at the given location

Defined in: [client/fast-prototyping/components/slate/index.tsx:538](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/components/slate/index.tsx#L538)

___

### canInsertVideo

• **canInsertVideo**: *boolean*

Whether a video can be inserted at the given location

Defined in: [client/fast-prototyping/components/slate/index.tsx:509](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/components/slate/index.tsx#L509)

___

### canSetActionFunction

• **canSetActionFunction**: *boolean*

Whether an action function can be set on the given element
normally true if templating is true

Defined in: [client/fast-prototyping/components/slate/index.tsx:573](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/components/slate/index.tsx#L573)

___

### canSetActiveStyle

• **canSetActiveStyle**: *boolean*

Whether the active style can be set
normally true if templating is true

Defined in: [client/fast-prototyping/components/slate/index.tsx:558](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/components/slate/index.tsx#L558)

___

### canSetDynamicHref

• **canSetDynamicHref**: *boolean*

Whether the dynamic href can be set for links
normally true if templating is true

Defined in: [client/fast-prototyping/components/slate/index.tsx:563](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/components/slate/index.tsx#L563)

___

### canSetHoverStyle

• **canSetHoverStyle**: *boolean*

Whether we can set the hover style
normally true if templating is true

Defined in: [client/fast-prototyping/components/slate/index.tsx:553](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/components/slate/index.tsx#L553)

___

### canSetLoop

• **canSetLoop**: *boolean*

Whether a loop can be established
normally true if templating is true

Defined in: [client/fast-prototyping/components/slate/index.tsx:578](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/components/slate/index.tsx#L578)

___

### canSetStyle

• **canSetStyle**: *boolean*

Whether the style of the current element can be set

Defined in: [client/fast-prototyping/components/slate/index.tsx:547](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/components/slate/index.tsx#L547)

___

### canSetUIHandler

• **canSetUIHandler**: *boolean*

Whether an UI handler can be set on the given element
normally true if templating is true

Defined in: [client/fast-prototyping/components/slate/index.tsx:568](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/components/slate/index.tsx#L568)

___

### supportedContainers

• **supportedContainers**: *string*[]

The supported containers, might be null
if all supported, note that this will
not affect the base container

Inherited from: [IFeatureSupportOptions](client_internal_text.ifeaturesupportoptions.md).[supportedContainers](client_internal_text.ifeaturesupportoptions.md#supportedcontainers)

Defined in: [client/internal/text/index.tsx:230](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/index.tsx#L230)

___

### supportedCustoms

• **supportedCustoms**: *string*[]

the supported custom elements

Inherited from: [IFeatureSupportOptions](client_internal_text.ifeaturesupportoptions.md).[supportedCustoms](client_internal_text.ifeaturesupportoptions.md#supportedcustoms)

Defined in: [client/internal/text/index.tsx:220](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/index.tsx#L220)

___

### supportedRichClasses

• **supportedRichClasses**: *string*[]

The supported rich classes, might be null
if all supported

Inherited from: [IFeatureSupportOptions](client_internal_text.ifeaturesupportoptions.md).[supportedRichClasses](client_internal_text.ifeaturesupportoptions.md#supportedrichclasses)

Defined in: [client/internal/text/index.tsx:239](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/index.tsx#L239)

___

### supportsContainers

• **supportsContainers**: *boolean*

whether we support containers

Inherited from: [IFeatureSupportOptions](client_internal_text.ifeaturesupportoptions.md).[supportsContainers](client_internal_text.ifeaturesupportoptions.md#supportscontainers)

Defined in: [client/internal/text/index.tsx:224](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/index.tsx#L224)

___

### supportsCustom

• **supportsCustom**: *boolean*

Whether we support customs

Inherited from: [IFeatureSupportOptions](client_internal_text.ifeaturesupportoptions.md).[supportsCustom](client_internal_text.ifeaturesupportoptions.md#supportscustom)

Defined in: [client/internal/text/index.tsx:216](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/index.tsx#L216)

___

### supportsCustomStyles

• **supportsCustomStyles**: *boolean*

Whether custom styles using the style tag
are acceptable

Inherited from: [IFeatureSupportOptions](client_internal_text.ifeaturesupportoptions.md).[supportsCustomStyles](client_internal_text.ifeaturesupportoptions.md#supportscustomstyles)

Defined in: [client/internal/text/index.tsx:207](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/index.tsx#L207)

___

### supportsExternalLinks

• **supportsExternalLinks**: *boolean*

Whether external links specifying an external
protocol outside the current page are acceptable

Inherited from: [IFeatureSupportOptions](client_internal_text.ifeaturesupportoptions.md).[supportsExternalLinks](client_internal_text.ifeaturesupportoptions.md#supportsexternallinks)

Defined in: [client/internal/text/index.tsx:190](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/index.tsx#L190)

___

### supportsFiles

• **supportsFiles**: *boolean*

Whether files are supporeted

Inherited from: [IFeatureSupportOptions](client_internal_text.ifeaturesupportoptions.md).[supportsFiles](client_internal_text.ifeaturesupportoptions.md#supportsfiles)

Defined in: [client/internal/text/index.tsx:175](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/index.tsx#L175)

___

### supportsFilesAccept

• **supportsFilesAccept**: *string*

The accept type that the input should accept
for filling the file type, it can be null, if
it doesn't support files, or when viewing

Inherited from: [IFeatureSupportOptions](client_internal_text.ifeaturesupportoptions.md).[supportsFilesAccept](client_internal_text.ifeaturesupportoptions.md#supportsfilesaccept)

Defined in: [client/internal/text/index.tsx:181](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/index.tsx#L181)

___

### supportsImages

• **supportsImages**: *boolean*

Whether it supports images

Inherited from: [IFeatureSupportOptions](client_internal_text.ifeaturesupportoptions.md).[supportsImages](client_internal_text.ifeaturesupportoptions.md#supportsimages)

Defined in: [client/internal/text/index.tsx:161](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/index.tsx#L161)

___

### supportsImagesAccept

• **supportsImagesAccept**: *string*

The accept type that the input should accept
for filling the image type, it can be null, if
it doesn't support images, or when viewing

Inherited from: [IFeatureSupportOptions](client_internal_text.ifeaturesupportoptions.md).[supportsImagesAccept](client_internal_text.ifeaturesupportoptions.md#supportsimagesaccept)

Defined in: [client/internal/text/index.tsx:167](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/index.tsx#L167)

___

### supportsLinks

• **supportsLinks**: *boolean*

Whether links are acceptable

Inherited from: [IFeatureSupportOptions](client_internal_text.ifeaturesupportoptions.md).[supportsLinks](client_internal_text.ifeaturesupportoptions.md#supportslinks)

Defined in: [client/internal/text/index.tsx:185](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/index.tsx#L185)

___

### supportsLists

• **supportsLists**: *boolean*

Whether lists are acceptable, ul, ol etc...

Inherited from: [IFeatureSupportOptions](client_internal_text.ifeaturesupportoptions.md).[supportsLists](client_internal_text.ifeaturesupportoptions.md#supportslists)

Defined in: [client/internal/text/index.tsx:194](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/index.tsx#L194)

___

### supportsQuote

• **supportsQuote**: *boolean*

Whether quotes are acceptable

Inherited from: [IFeatureSupportOptions](client_internal_text.ifeaturesupportoptions.md).[supportsQuote](client_internal_text.ifeaturesupportoptions.md#supportsquote)

Defined in: [client/internal/text/index.tsx:198](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/index.tsx#L198)

___

### supportsRichClasses

• **supportsRichClasses**: *boolean*

whether rich classes are supported

Inherited from: [IFeatureSupportOptions](client_internal_text.ifeaturesupportoptions.md).[supportsRichClasses](client_internal_text.ifeaturesupportoptions.md#supportsrichclasses)

Defined in: [client/internal/text/index.tsx:234](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/index.tsx#L234)

___

### supportsTemplating

• **supportsTemplating**: *boolean*

Whether templating is supported

Inherited from: [IFeatureSupportOptions](client_internal_text.ifeaturesupportoptions.md).[supportsTemplating](client_internal_text.ifeaturesupportoptions.md#supportstemplating)

Defined in: [client/internal/text/index.tsx:211](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/index.tsx#L211)

___

### supportsTitle

• **supportsTitle**: *boolean*

Whether titles are acceptable

Inherited from: [IFeatureSupportOptions](client_internal_text.ifeaturesupportoptions.md).[supportsTitle](client_internal_text.ifeaturesupportoptions.md#supportstitle)

Defined in: [client/internal/text/index.tsx:202](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/index.tsx#L202)

___

### supportsVideos

• **supportsVideos**: *boolean*

Whether it supports videos

Inherited from: [IFeatureSupportOptions](client_internal_text.ifeaturesupportoptions.md).[supportsVideos](client_internal_text.ifeaturesupportoptions.md#supportsvideos)

Defined in: [client/internal/text/index.tsx:171](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/index.tsx#L171)
