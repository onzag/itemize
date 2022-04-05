[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md) / IAccessibleFeatureSupportOptions

# Interface: IAccessibleFeatureSupportOptions

[client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md).IAccessibleFeatureSupportOptions

Represents an extended set of the features that the editor supports
with a lot more of contextual information on what it has in place
for such

## Hierarchy

- [`IFeatureSupportOptions`](client_internal_text.IFeatureSupportOptions.md)

  ↳ **`IAccessibleFeatureSupportOptions`**

## Table of contents

### Properties

- [availableContainers](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#availablecontainers)
- [availableCustoms](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#availablecustoms)
- [availableRichClasses](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#availablerichclasses)
- [canInsertAnyElement](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#caninsertanyelement)
- [canInsertContainer](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#caninsertcontainer)
- [canInsertCustom](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#caninsertcustom)
- [canInsertFile](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#caninsertfile)
- [canInsertImage](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#caninsertimage)
- [canInsertLink](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#caninsertlink)
- [canInsertList](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#caninsertlist)
- [canInsertQuote](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#caninsertquote)
- [canInsertRichClass](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#caninsertrichclass)
- [canInsertTitle](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#caninserttitle)
- [canInsertVideo](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#caninsertvideo)
- [canSetActionFunction](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#cansetactionfunction)
- [canSetActiveStyle](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#cansetactivestyle)
- [canSetDynamicHref](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#cansetdynamichref)
- [canSetHoverStyle](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#cansethoverstyle)
- [canSetLoop](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#cansetloop)
- [canSetStyle](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#cansetstyle)
- [canSetUIHandler](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#cansetuihandler)
- [supportedContainers](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#supportedcontainers)
- [supportedCustoms](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#supportedcustoms)
- [supportedRichClasses](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#supportedrichclasses)
- [supportsContainers](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#supportscontainers)
- [supportsCustom](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#supportscustom)
- [supportsCustomStyles](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#supportscustomstyles)
- [supportsExternalLinks](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#supportsexternallinks)
- [supportsFiles](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#supportsfiles)
- [supportsFilesAccept](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#supportsfilesaccept)
- [supportsImages](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#supportsimages)
- [supportsImagesAccept](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#supportsimagesaccept)
- [supportsLinks](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#supportslinks)
- [supportsLists](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#supportslists)
- [supportsQuote](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#supportsquote)
- [supportsRichClasses](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#supportsrichclasses)
- [supportsTemplating](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#supportstemplating)
- [supportsTitle](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#supportstitle)
- [supportsVideos](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#supportsvideos)

## Properties

### availableContainers

• **availableContainers**: `IAvailableElementCSSClassName`[]

The classes that are available for the containers

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:541](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L541)

___

### availableCustoms

• **availableCustoms**: `IAvailableElementCSSClassName`[]

The customs that are available

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:537](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L537)

___

### availableRichClasses

• **availableRichClasses**: `IAvailableElementCSSClassName`[]

The classes that are available by the rich text
non prefixed

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:533](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L533)

___

### canInsertAnyElement

• **canInsertAnyElement**: `boolean`

Able to insert any custom element from
custom toolbar

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:527](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L527)

___

### canInsertContainer

• **canInsertContainer**: `boolean`

Whether a container can be inserted at the given location

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:465](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L465)

___

### canInsertCustom

• **canInsertCustom**: `boolean`

Whether a custom element can be inserted at the given
location

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:474](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L474)

___

### canInsertFile

• **canInsertFile**: `boolean`

Whether a file can be inserted at the given location

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:457](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L457)

___

### canInsertImage

• **canInsertImage**: `boolean`

Whether an image can be inserted at the given location

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:449](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L449)

___

### canInsertLink

• **canInsertLink**: `boolean`

Whether a link can be inserted at the given location

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:461](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L461)

___

### canInsertList

• **canInsertList**: `boolean`

Whether a list can be inserted at the given location

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:469](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L469)

___

### canInsertQuote

• **canInsertQuote**: `boolean`

Whether a quote can be inserted at the given location

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:478](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L478)

___

### canInsertRichClass

• **canInsertRichClass**: `boolean`

Whether a rich class element can be inserted at the given location

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:486](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L486)

___

### canInsertTitle

• **canInsertTitle**: `boolean`

Whether a title element can be inserted at the given location

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:482](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L482)

___

### canInsertVideo

• **canInsertVideo**: `boolean`

Whether a video can be inserted at the given location

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:453](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L453)

___

### canSetActionFunction

• **canSetActionFunction**: `boolean`

Whether an action function can be set on the given element
normally true if templating is true

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:517](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L517)

___

### canSetActiveStyle

• **canSetActiveStyle**: `boolean`

Whether the active style can be set
normally true if templating is true

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:502](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L502)

___

### canSetDynamicHref

• **canSetDynamicHref**: `boolean`

Whether the dynamic href can be set for links
normally true if templating is true

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:507](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L507)

___

### canSetHoverStyle

• **canSetHoverStyle**: `boolean`

Whether we can set the hover style
normally true if templating is true

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:497](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L497)

___

### canSetLoop

• **canSetLoop**: `boolean`

Whether a loop can be established
normally true if templating is true

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:522](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L522)

___

### canSetStyle

• **canSetStyle**: `boolean`

Whether the style of the current element can be set

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:491](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L491)

___

### canSetUIHandler

• **canSetUIHandler**: `boolean`

Whether an UI handler can be set on the given element
normally true if templating is true

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:512](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/index.tsx#L512)

___

### supportedContainers

• **supportedContainers**: `string`[]

The supported containers, might be null
if all supported, note that this will
not affect the base container

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportedContainers](client_internal_text.IFeatureSupportOptions.md#supportedcontainers)

#### Defined in

[client/internal/text/index.tsx:231](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L231)

___

### supportedCustoms

• **supportedCustoms**: `string`[]

the supported custom elements

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportedCustoms](client_internal_text.IFeatureSupportOptions.md#supportedcustoms)

#### Defined in

[client/internal/text/index.tsx:221](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L221)

___

### supportedRichClasses

• **supportedRichClasses**: `string`[]

The supported rich classes, might be null
if all supported

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportedRichClasses](client_internal_text.IFeatureSupportOptions.md#supportedrichclasses)

#### Defined in

[client/internal/text/index.tsx:240](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L240)

___

### supportsContainers

• **supportsContainers**: `boolean`

whether we support containers

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsContainers](client_internal_text.IFeatureSupportOptions.md#supportscontainers)

#### Defined in

[client/internal/text/index.tsx:225](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L225)

___

### supportsCustom

• **supportsCustom**: `boolean`

Whether we support customs

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsCustom](client_internal_text.IFeatureSupportOptions.md#supportscustom)

#### Defined in

[client/internal/text/index.tsx:217](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L217)

___

### supportsCustomStyles

• **supportsCustomStyles**: `boolean`

Whether custom styles using the style tag
are acceptable

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsCustomStyles](client_internal_text.IFeatureSupportOptions.md#supportscustomstyles)

#### Defined in

[client/internal/text/index.tsx:208](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L208)

___

### supportsExternalLinks

• **supportsExternalLinks**: `boolean`

Whether external links specifying an external
protocol outside the current page are acceptable

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsExternalLinks](client_internal_text.IFeatureSupportOptions.md#supportsexternallinks)

#### Defined in

[client/internal/text/index.tsx:191](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L191)

___

### supportsFiles

• **supportsFiles**: `boolean`

Whether files are supporeted

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsFiles](client_internal_text.IFeatureSupportOptions.md#supportsfiles)

#### Defined in

[client/internal/text/index.tsx:176](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L176)

___

### supportsFilesAccept

• **supportsFilesAccept**: `string`

The accept type that the input should accept
for filling the file type, it can be null, if
it doesn't support files, or when viewing

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsFilesAccept](client_internal_text.IFeatureSupportOptions.md#supportsfilesaccept)

#### Defined in

[client/internal/text/index.tsx:182](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L182)

___

### supportsImages

• **supportsImages**: `boolean`

Whether it supports images

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsImages](client_internal_text.IFeatureSupportOptions.md#supportsimages)

#### Defined in

[client/internal/text/index.tsx:162](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L162)

___

### supportsImagesAccept

• **supportsImagesAccept**: `string`

The accept type that the input should accept
for filling the image type, it can be null, if
it doesn't support images, or when viewing

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsImagesAccept](client_internal_text.IFeatureSupportOptions.md#supportsimagesaccept)

#### Defined in

[client/internal/text/index.tsx:168](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L168)

___

### supportsLinks

• **supportsLinks**: `boolean`

Whether links are acceptable

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsLinks](client_internal_text.IFeatureSupportOptions.md#supportslinks)

#### Defined in

[client/internal/text/index.tsx:186](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L186)

___

### supportsLists

• **supportsLists**: `boolean`

Whether lists are acceptable, ul, ol etc...

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsLists](client_internal_text.IFeatureSupportOptions.md#supportslists)

#### Defined in

[client/internal/text/index.tsx:195](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L195)

___

### supportsQuote

• **supportsQuote**: `boolean`

Whether quotes are acceptable

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsQuote](client_internal_text.IFeatureSupportOptions.md#supportsquote)

#### Defined in

[client/internal/text/index.tsx:199](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L199)

___

### supportsRichClasses

• **supportsRichClasses**: `boolean`

whether rich classes are supported

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsRichClasses](client_internal_text.IFeatureSupportOptions.md#supportsrichclasses)

#### Defined in

[client/internal/text/index.tsx:235](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L235)

___

### supportsTemplating

• **supportsTemplating**: `boolean`

Whether templating is supported

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsTemplating](client_internal_text.IFeatureSupportOptions.md#supportstemplating)

#### Defined in

[client/internal/text/index.tsx:212](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L212)

___

### supportsTitle

• **supportsTitle**: `boolean`

Whether titles are acceptable

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsTitle](client_internal_text.IFeatureSupportOptions.md#supportstitle)

#### Defined in

[client/internal/text/index.tsx:203](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L203)

___

### supportsVideos

• **supportsVideos**: `boolean`

Whether it supports videos

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsVideos](client_internal_text.IFeatureSupportOptions.md#supportsvideos)

#### Defined in

[client/internal/text/index.tsx:172](https://github.com/onzag/itemize/blob/f2f29986/client/internal/text/index.tsx#L172)
