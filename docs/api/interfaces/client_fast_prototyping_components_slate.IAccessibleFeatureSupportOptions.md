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
- [availableTables](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#availabletables)
- [supportedContainers](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#supportedcontainers)
- [supportedCustoms](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#supportedcustoms)
- [supportedRichClasses](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#supportedrichclasses)
- [supportedTables](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#supportedtables)
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
- [supportsTables](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#supportstables)
- [supportsTemplating](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#supportstemplating)
- [supportsTitle](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#supportstitle)
- [supportsVideos](client_fast_prototyping_components_slate.IAccessibleFeatureSupportOptions.md#supportsvideos)

## Properties

### availableContainers

• **availableContainers**: `IAvailableElementCSSClassName`[]

The classes that are available for the containers

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:342](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/index.tsx#L342)

___

### availableCustoms

• **availableCustoms**: `IAvailableElementCSSClassName`[]

The customs that are available

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:338](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/index.tsx#L338)

___

### availableRichClasses

• **availableRichClasses**: `IAvailableElementCSSClassName`[]

The classes that are available by the rich text
non prefixed

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:334](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/index.tsx#L334)

___

### availableTables

• **availableTables**: `IAvailableElementCSSClassName`[]

The classes that are available for the containers

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:346](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/slate/index.tsx#L346)

___

### supportedContainers

• **supportedContainers**: `string`[]

The supported containers, might be null
if all supported, note that this will
not affect the base container

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportedContainers](client_internal_text.IFeatureSupportOptions.md#supportedcontainers)

#### Defined in

[client/internal/text/index.tsx:254](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L254)

___

### supportedCustoms

• **supportedCustoms**: `string`[]

the supported custom elements

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportedCustoms](client_internal_text.IFeatureSupportOptions.md#supportedcustoms)

#### Defined in

[client/internal/text/index.tsx:244](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L244)

___

### supportedRichClasses

• **supportedRichClasses**: `string`[]

The supported rich classes, might be null
if all supported

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportedRichClasses](client_internal_text.IFeatureSupportOptions.md#supportedrichclasses)

#### Defined in

[client/internal/text/index.tsx:271](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L271)

___

### supportedTables

• **supportedTables**: `string`[]

The list of supported tables

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportedTables](client_internal_text.IFeatureSupportOptions.md#supportedtables)

#### Defined in

[client/internal/text/index.tsx:262](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L262)

___

### supportsContainers

• **supportsContainers**: `boolean`

whether we support containers

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsContainers](client_internal_text.IFeatureSupportOptions.md#supportscontainers)

#### Defined in

[client/internal/text/index.tsx:248](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L248)

___

### supportsCustom

• **supportsCustom**: `boolean`

Whether we support customs

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsCustom](client_internal_text.IFeatureSupportOptions.md#supportscustom)

#### Defined in

[client/internal/text/index.tsx:240](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L240)

___

### supportsCustomStyles

• **supportsCustomStyles**: `boolean`

Whether custom styles using the style tag
are acceptable

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsCustomStyles](client_internal_text.IFeatureSupportOptions.md#supportscustomstyles)

#### Defined in

[client/internal/text/index.tsx:231](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L231)

___

### supportsExternalLinks

• **supportsExternalLinks**: `boolean`

Whether external links specifying an external
protocol outside the current page are acceptable

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsExternalLinks](client_internal_text.IFeatureSupportOptions.md#supportsexternallinks)

#### Defined in

[client/internal/text/index.tsx:214](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L214)

___

### supportsFiles

• **supportsFiles**: `boolean`

Whether files are supporeted

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsFiles](client_internal_text.IFeatureSupportOptions.md#supportsfiles)

#### Defined in

[client/internal/text/index.tsx:199](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L199)

___

### supportsFilesAccept

• **supportsFilesAccept**: `string`

The accept type that the input should accept
for filling the file type, it can be null, if
it doesn't support files, or when viewing

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsFilesAccept](client_internal_text.IFeatureSupportOptions.md#supportsfilesaccept)

#### Defined in

[client/internal/text/index.tsx:205](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L205)

___

### supportsImages

• **supportsImages**: `boolean`

Whether it supports images

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsImages](client_internal_text.IFeatureSupportOptions.md#supportsimages)

#### Defined in

[client/internal/text/index.tsx:185](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L185)

___

### supportsImagesAccept

• **supportsImagesAccept**: `string`

The accept type that the input should accept
for filling the image type, it can be null, if
it doesn't support images, or when viewing

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsImagesAccept](client_internal_text.IFeatureSupportOptions.md#supportsimagesaccept)

#### Defined in

[client/internal/text/index.tsx:191](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L191)

___

### supportsLinks

• **supportsLinks**: `boolean`

Whether links are acceptable

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsLinks](client_internal_text.IFeatureSupportOptions.md#supportslinks)

#### Defined in

[client/internal/text/index.tsx:209](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L209)

___

### supportsLists

• **supportsLists**: `boolean`

Whether lists are acceptable, ul, ol etc...

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsLists](client_internal_text.IFeatureSupportOptions.md#supportslists)

#### Defined in

[client/internal/text/index.tsx:218](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L218)

___

### supportsQuote

• **supportsQuote**: `boolean`

Whether quotes are acceptable

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsQuote](client_internal_text.IFeatureSupportOptions.md#supportsquote)

#### Defined in

[client/internal/text/index.tsx:222](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L222)

___

### supportsRichClasses

• **supportsRichClasses**: `boolean`

whether rich classes are supported

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsRichClasses](client_internal_text.IFeatureSupportOptions.md#supportsrichclasses)

#### Defined in

[client/internal/text/index.tsx:266](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L266)

___

### supportsTables

• **supportsTables**: `boolean`

Whether tables are supported

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsTables](client_internal_text.IFeatureSupportOptions.md#supportstables)

#### Defined in

[client/internal/text/index.tsx:258](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L258)

___

### supportsTemplating

• **supportsTemplating**: `boolean`

Whether templating is supported

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsTemplating](client_internal_text.IFeatureSupportOptions.md#supportstemplating)

#### Defined in

[client/internal/text/index.tsx:235](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L235)

___

### supportsTitle

• **supportsTitle**: `boolean`

Whether titles are acceptable

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsTitle](client_internal_text.IFeatureSupportOptions.md#supportstitle)

#### Defined in

[client/internal/text/index.tsx:226](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L226)

___

### supportsVideos

• **supportsVideos**: `boolean`

Whether it supports videos

#### Inherited from

[IFeatureSupportOptions](client_internal_text.IFeatureSupportOptions.md).[supportsVideos](client_internal_text.IFeatureSupportOptions.md#supportsvideos)

#### Defined in

[client/internal/text/index.tsx:195](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/index.tsx#L195)
