[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryFile](../modules/client_internal_components_PropertyEntry_PropertyEntryFile.md) / IPropertyEntryFileRendererProps

# Interface: IPropertyEntryFileRendererProps

[client/internal/components/PropertyEntry/PropertyEntryFile](../modules/client_internal_components_PropertyEntry_PropertyEntryFile.md).IPropertyEntryFileRendererProps

This is the entry file renderer props that every renderer for a files type will recieve.
please do not use onChange with the file renderer, as it's odd, use onSetFile instead

You might want to check text-specs.md for consistency on displaying files, but it is not
required to display as text-specs.md specifies

## Hierarchy

- [`IPropertyEntryRendererProps`](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md)<[`PropertyDefinitionSupportedFileType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_file.md#propertydefinitionsupportedfiletype)\>

  ↳ **`IPropertyEntryFileRendererProps`**

## Table of contents

### Properties

- [accept](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#accept)
- [args](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#args)
- [autoFocus](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#autofocus)
- [canRestore](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#canrestore)
- [currentAppliedValue](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#currentappliedvalue)
- [currentInternalValue](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#currentinternalvalue)
- [currentInvalidReason](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#currentinvalidreason)
- [currentValid](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#currentvalid)
- [currentValue](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#currentvalue)
- [description](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#description)
- [disabled](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#disabled)
- [extension](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#extension)
- [extraMetadata](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#extrametadata)
- [genericActivePlaceholder](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#genericactiveplaceholder)
- [genericDeleteLabel](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#genericdeletelabel)
- [genericSelectLabel](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#genericselectlabel)
- [imageSizes](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#imagesizes)
- [imageSrcSet](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#imagesrcset)
- [isExpectingImages](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#isexpectingimages)
- [isRejectedSupportedImage](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#isrejectedsupportedimage)
- [isSupportedImage](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#issupportedimage)
- [label](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#label)
- [language](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#language)
- [languageOverride](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#languageoverride)
- [maxFileSize](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#maxfilesize)
- [placeholder](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#placeholder)
- [prettySize](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#prettysize)
- [propertyId](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#propertyid)
- [rejected](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#rejected)
- [rejectedExtension](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#rejectedextension)
- [rejectedPrettySize](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#rejectedprettysize)
- [rejectedReason](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#rejectedreason)
- [rejectedValue](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#rejectedvalue)
- [rtl](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#rtl)
- [uniqueId](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#uniqueid)

### Methods

- [enableUserSetErrors](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#enableuserseterrors)
- [onChange](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#onchange)
- [onRemoveFile](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#onremovefile)
- [onRestore](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#onrestore)
- [onSetFile](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#onsetfile)
- [onUpdateExtraMetadata](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#onupdateextrametadata)
- [openFile](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md#openfile)

## Properties

### accept

• **accept**: `string`

The accept string, use it in your input type

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:35](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L35)

___

### args

• **args**: `Object`

The renderer args

#### Index signature

▪ [arg: `string`]: `any`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[args](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#args)

#### Defined in

[client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/renderer.ts#L19)

___

### autoFocus

• **autoFocus**: `boolean`

Whether the entry should autofocus

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[autoFocus](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#autofocus)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:107](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L107)

___

### canRestore

• **canRestore**: `boolean`

A boolean, normally true if our current applied value differs from our
current value, this check is exceptional as it uses the local equal function

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[canRestore](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#canrestore)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:79](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L79)

___

### currentAppliedValue

• **currentAppliedValue**: [`IGQLFile`](gql_querier.IGQLFile.md)

The currently applied value that is in sync with the server side

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentAppliedValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentappliedvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:74](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L74)

___

### currentInternalValue

• `Optional` **currentInternalValue**: `any`

The current internal value, if any given

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentInternalValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentinternalvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:102](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L102)

___

### currentInvalidReason

• `Optional` **currentInvalidReason**: `string`

If current valid is false, then there might be a reason
attached to it, this invalid reason is locale specific;
if there's no currently invalid reason, this usually means
the item was forced into the invalid state by the passing
of a flag

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentInvalidReason](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentinvalidreason)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:98](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L98)

___

### currentValid

• **currentValid**: `boolean`

Whether this current value is currently seen as valid, this is a finicky
value that does not correlate directly to the actual property
state; things such as being poked, or the user having forced
a value for this play a role as well

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentValid](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentvalid)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:90](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L90)

___

### currentValue

• **currentValue**: [`IGQLFile`](gql_querier.IGQLFile.md)

The current value

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:83](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L83)

___

### description

• `Optional` **description**: `string`

The description of the property, properties might or might not have descriptions
this is locale specific; the description might not be passed if specified by the UI

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[description](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#description)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:69](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L69)

___

### disabled

• **disabled**: `boolean`

The disabled flag is passed often when the value is somehow
enforced, this means that the field cannot truly be editted
and attempts are futile to modify

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[disabled](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#disabled)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:113](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L113)

___

### extension

• **extension**: `string`

The extension for this file, it has nothing to do with the name; it's more
used for display purposes

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:109](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L109)

___

### extraMetadata

• **extraMetadata**: `string`

The extra metadata that is provided

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:113](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L113)

___

### genericActivePlaceholder

• **genericActivePlaceholder**: `string`

A placeholder to show when the file field is active, normally
it'll contains something on the drop files here

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:49](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L49)

___

### genericDeleteLabel

• **genericDeleteLabel**: `string`

A label to show for a button or the likes for the file to be
deleted

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:54](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L54)

___

### genericSelectLabel

• **genericSelectLabel**: `string`

A label to show for a button or the likes for the file to be
selected

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:59](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L59)

___

### imageSizes

• **imageSizes**: [`IImageSizes`](client_components_util.IImageSizes.md)

The image sizes that exist if isSupportedImage is true for the current value

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:100](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L100)

___

### imageSrcSet

• **imageSrcSet**: `string`

A source set for the image type that exists if isSupportedImage is true

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:96](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L96)

___

### isExpectingImages

• **isExpectingImages**: `boolean`

Whether we are expecting images and only images, this correlates
to accept

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:44](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L44)

___

### isRejectedSupportedImage

• **isRejectedSupportedImage**: `boolean`

Whether the rejected is a supported image

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:92](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L92)

___

### isSupportedImage

• **isSupportedImage**: `boolean`

Specifies whether the current value is of a supported image type, this
is independent of the isExpectingImages or accept; as a generic file
can be of the image type and the user might have specified an image for it
even if the file could have been any type

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:66](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L66)

___

### label

• `Optional` **label**: `string`

label of the property, every property should have a label unless it's hidden
this is locale specific

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[label](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#label)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:59](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L59)

___

### language

• **language**: `string`

The current language being used by the client overall in the app

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[language](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#language)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:138](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L138)

___

### languageOverride

• `Optional` **languageOverride**: `string`

An optional language used mainly for the text type to override
own language properties that currently only text supports that

It may be possible for the editor to set its own text language
value if it has its own

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[languageOverride](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#languageoverride)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:147](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L147)

___

### maxFileSize

• **maxFileSize**: `number`

The max file size

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:39](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L39)

___

### placeholder

• `Optional` **placeholder**: `string`

The placeholder of the property, every property should have a placeholder unless it's hidden
this is locale specific

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[placeholder](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#placeholder)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:64](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L64)

___

### prettySize

• **prettySize**: `string`

A human readable form of the current size of the file, or null if no file

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:104](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L104)

___

### propertyId

• **propertyId**: `string`

The property id in question

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[propertyId](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#propertyid)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:47](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L47)

___

### rejected

• **rejected**: `boolean`

A boolean that specifies whether the current value is actually a rejected
value that was not accepted by the filtering functions, either because of size
or whatnot, when rejected is true, the true property has a value of null

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:72](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L72)

___

### rejectedExtension

• **rejectedExtension**: `string`

The extension of the rejected value

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:84](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L84)

___

### rejectedPrettySize

• **rejectedPrettySize**: `string`

the pretty size of the rejected value

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:88](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L88)

___

### rejectedReason

• **rejectedReason**: `string`

A localized reason on why the rejected status is active

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:76](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L76)

___

### rejectedValue

• **rejectedValue**: [`IGQLFile`](gql_querier.IGQLFile.md)

The last value that was rejected

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:80](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L80)

___

### rtl

• **rtl**: `boolean`

Whether it is in rtl mode for a rtl language

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[rtl](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#rtl)

#### Defined in

[client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/renderer.ts#L15)

___

### uniqueId

• **uniqueId**: `string`

an unique id for this property
with the id and the version they are related to

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[uniqueId](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#uniqueid)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:53](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L53)

## Methods

### enableUserSetErrors

▸ **enableUserSetErrors**(): `void`

Allows for the display of user set error statuses, normally you
will call this function when your field has been blurred so that
currentInvalidReason gets populated even if the field is not poked

#### Returns

`void`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[enableUserSetErrors](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#enableuserseterrors)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:120](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L120)

___

### onChange

▸ **onChange**(`value`, `internalValue`): `void`

Standard on change function, every renderer will recieve this function
to trigger a change, however sometimes handlers will pass their own
change function that is supposed to be used instead of this one so
caution is advised which one to use

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `ValueType` |
| `internalValue` | `any` |

#### Returns

`void`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[onChange](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#onchange)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:128](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L128)

___

### onRemoveFile

▸ **onRemoveFile**(): `void`

A function to clear the file

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:130](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L130)

___

### onRestore

▸ **onRestore**(): `void`

Call in order to trigger restoration, ensure that canRestore is true
when doing this

#### Returns

`void`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[onRestore](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#onrestore)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:133](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/index.tsx#L133)

___

### onSetFile

▸ **onSetFile**(`file`, `info?`): `void`

Once you have got hold of a file use this function and pass it so
properties can be calculated, do not use onChange, use this function
instead

If the property is image uploader type, or if the file is on itself
an image it will ensure to give it metadata

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `File` |
| `info?` | `IOnSetDataInfo` |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:122](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L122)

___

### onUpdateExtraMetadata

▸ **onUpdateExtraMetadata**(`extraMetadata`): `void`

Allows to update and set the extra metadata that is contained within the file

#### Parameters

| Name | Type |
| :------ | :------ |
| `extraMetadata` | `string` |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:126](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L126)

___

### openFile

▸ **openFile**(): `void`

A function to open the current file

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryFile.tsx:134](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L134)
