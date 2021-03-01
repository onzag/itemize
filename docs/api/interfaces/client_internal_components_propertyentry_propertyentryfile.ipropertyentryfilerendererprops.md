[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryFile](../modules/client_internal_components_propertyentry_propertyentryfile.md) / IPropertyEntryFileRendererProps

# Interface: IPropertyEntryFileRendererProps

[client/internal/components/PropertyEntry/PropertyEntryFile](../modules/client_internal_components_propertyentry_propertyentryfile.md).IPropertyEntryFileRendererProps

This is the entry file renderer props that every renderer for a files type will recieve.
please do not use onChange with the file renderer, as it's odd, use onSetFile instead

You might want to check text-specs.md for consistency on displaying files, but it is not
required to display as text-specs.md specifies

## Hierarchy

* [*IPropertyEntryRendererProps*](client_internal_components_propertyentry.ipropertyentryrendererprops.md)<[*PropertyDefinitionSupportedFileType*](../modules/base_root_module_itemdefinition_propertydefinition_types_file.md#propertydefinitionsupportedfiletype)\>

  ↳ **IPropertyEntryFileRendererProps**

## Table of contents

### Properties

- [accept](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#accept)
- [args](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#args)
- [autoFocus](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#autofocus)
- [canRestore](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#canrestore)
- [currentAppliedValue](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#currentappliedvalue)
- [currentInternalValue](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#currentinternalvalue)
- [currentInvalidReason](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#currentinvalidreason)
- [currentValid](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#currentvalid)
- [currentValue](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#currentvalue)
- [description](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#description)
- [disabled](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#disabled)
- [enableUserSetErrors](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#enableuserseterrors)
- [extension](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#extension)
- [genericActivePlaceholder](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#genericactiveplaceholder)
- [genericDeleteLabel](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#genericdeletelabel)
- [genericSelectLabel](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#genericselectlabel)
- [icon](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#icon)
- [imageSizes](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#imagesizes)
- [imageSrcSet](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#imagesrcset)
- [isExpectingImages](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#isexpectingimages)
- [isSupportedImage](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#issupportedimage)
- [label](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#label)
- [onChange](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#onchange)
- [onRemoveFile](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#onremovefile)
- [onRestore](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#onrestore)
- [onSetFile](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#onsetfile)
- [openFile](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#openfile)
- [placeholder](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#placeholder)
- [prettySize](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#prettysize)
- [propertyId](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#propertyid)
- [rejected](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#rejected)
- [rejectedReason](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#rejectedreason)
- [rtl](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md#rtl)

## Properties

### accept

• **accept**: *string*

The accept string, use it in your input type

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:27](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L27)

___

### args

• **args**: *object*

The renderer args

#### Type declaration:

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[args](client_internal_components_propertyentry.ipropertyentryrendererprops.md#args)

Defined in: [client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/renderer.ts#L19)

___

### autoFocus

• **autoFocus**: *boolean*

Whether the entry should autofocus

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[autoFocus](client_internal_components_propertyentry.ipropertyentryrendererprops.md#autofocus)

Defined in: [client/internal/components/PropertyEntry/index.tsx:103](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/index.tsx#L103)

___

### canRestore

• **canRestore**: *boolean*

A boolean, normally true if our current applied value differs from our
current value, this check is exceptional as it uses the local equal function

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[canRestore](client_internal_components_propertyentry.ipropertyentryrendererprops.md#canrestore)

Defined in: [client/internal/components/PropertyEntry/index.tsx:75](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/index.tsx#L75)

___

### currentAppliedValue

• **currentAppliedValue**: [*IGQLFile*](gql_querier.igqlfile.md)

The currently applied value that is in sync with the server side

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentAppliedValue](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentappliedvalue)

Defined in: [client/internal/components/PropertyEntry/index.tsx:70](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/index.tsx#L70)

___

### currentInternalValue

• `Optional` **currentInternalValue**: *any*

The current internal value, if any given

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentInternalValue](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentinternalvalue)

Defined in: [client/internal/components/PropertyEntry/index.tsx:98](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/index.tsx#L98)

___

### currentInvalidReason

• `Optional` **currentInvalidReason**: *string*

If current valid is false, then there might be a reason
attached to it, this invalid reason is locale specific;
if there's no currently invalid reason, this usually means
the item was forced into the invalid state by the passing
of a flag

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentInvalidReason](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentinvalidreason)

Defined in: [client/internal/components/PropertyEntry/index.tsx:94](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/index.tsx#L94)

___

### currentValid

• **currentValid**: *boolean*

Whether this current value is currently seen as valid, this is a finicky
value that does not correlate directly to the actual property
state; things such as being poked, or the user having forced
a value for this play a role as well

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentValid](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentvalid)

Defined in: [client/internal/components/PropertyEntry/index.tsx:86](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/index.tsx#L86)

___

### currentValue

• **currentValue**: [*IGQLFile*](gql_querier.igqlfile.md)

The current value

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[currentValue](client_internal_components_propertyentry.ipropertyentryrendererprops.md#currentvalue)

Defined in: [client/internal/components/PropertyEntry/index.tsx:79](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/index.tsx#L79)

___

### description

• `Optional` **description**: *string*

The description of the property, properties might or might not have descriptions
this is locale specific; the description might not be passed if specified by the UI

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[description](client_internal_components_propertyentry.ipropertyentryrendererprops.md#description)

Defined in: [client/internal/components/PropertyEntry/index.tsx:61](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/index.tsx#L61)

___

### disabled

• **disabled**: *boolean*

The disabled flag is passed often when the value is somehow
enforced, this means that the field cannot truly be editted
and attempts are futile to modify

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[disabled](client_internal_components_propertyentry.ipropertyentryrendererprops.md#disabled)

Defined in: [client/internal/components/PropertyEntry/index.tsx:109](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/index.tsx#L109)

___

### enableUserSetErrors

• **enableUserSetErrors**: () => *void*

Allows for the display of user set error statuses, normally you
will call this function when your frield has been blurred so that
currentInvalidReason gets populated even if the field is not poked

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/index.tsx:116](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/index.tsx#L116)

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[enableUserSetErrors](client_internal_components_propertyentry.ipropertyentryrendererprops.md#enableuserseterrors)

Defined in: [client/internal/components/PropertyEntry/index.tsx:116](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/index.tsx#L116)

___

### extension

• **extension**: *string*

The extension for this file, it has nothing to do with the name; it's more
used for display purposes

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:81](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L81)

___

### genericActivePlaceholder

• **genericActivePlaceholder**: *string*

A placeholder to show when the file field is active, normally
it'll contains something on the drop files here

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:37](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L37)

___

### genericDeleteLabel

• **genericDeleteLabel**: *string*

A label to show for a button or the likes for the file to be
deleted

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:42](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L42)

___

### genericSelectLabel

• **genericSelectLabel**: *string*

A label to show for a button or the likes for the file to be
selected

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:47](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L47)

___

### icon

• `Optional` **icon**: ReactNode

Icon are an UI defined property for an icon to use during the view, handle as you wish

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[icon](client_internal_components_propertyentry.ipropertyentryrendererprops.md#icon)

Defined in: [client/internal/components/PropertyEntry/index.tsx:65](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/index.tsx#L65)

___

### imageSizes

• **imageSizes**: [*IImageSizes*](client_components_util.iimagesizes.md)

The image sizes that exist if isSupportedImage is true for the current value

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:72](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L72)

___

### imageSrcSet

• **imageSrcSet**: *string*

A source set for the image type that exists if isSupportedImage is true

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:68](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L68)

___

### isExpectingImages

• **isExpectingImages**: *boolean*

Whether we are expecting images and only images, this correlates
to accept

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:32](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L32)

___

### isSupportedImage

• **isSupportedImage**: *boolean*

Specifies whether the current value is of a supported image type, this
is independent of the isExpectingImages or accept; as a generic file
can be of the image type and the user might have specified an image for it
even if the file could have been any type

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:54](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L54)

___

### label

• `Optional` **label**: *string*

label of the property, every property should have a label unless it's hidden
this is locale specific

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[label](client_internal_components_propertyentry.ipropertyentryrendererprops.md#label)

Defined in: [client/internal/components/PropertyEntry/index.tsx:51](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/index.tsx#L51)

___

### onChange

• **onChange**: (`value`: [*IGQLFile*](gql_querier.igqlfile.md), `internalValue`: *any*) => *void*

Standard on change function, every renderer will recieve this function
to trigger a change, however sometimes handlers will pass their own
change function that is supposed to be used instead of this one so
caution is advised which one to use

#### Type declaration:

▸ (`value`: [*IGQLFile*](gql_querier.igqlfile.md), `internalValue`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*IGQLFile*](gql_querier.igqlfile.md) |
`internalValue` | *any* |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/index.tsx:124](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/index.tsx#L124)

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[onChange](client_internal_components_propertyentry.ipropertyentryrendererprops.md#onchange)

Defined in: [client/internal/components/PropertyEntry/index.tsx:124](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/index.tsx#L124)

___

### onRemoveFile

• **onRemoveFile**: () => *void*

A function to clear the file

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:94](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L94)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:94](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L94)

___

### onRestore

• **onRestore**: () => *void*

Call in order to trigger restoration, ensure that canRestore is true
when doing this

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/index.tsx:129](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/index.tsx#L129)

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[onRestore](client_internal_components_propertyentry.ipropertyentryrendererprops.md#onrestore)

Defined in: [client/internal/components/PropertyEntry/index.tsx:129](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/index.tsx#L129)

___

### onSetFile

• **onSetFile**: (`file`: File) => *void*

Once you have got hold of a file use this function and pass it so
properties can be calculated, do not use onChange, use this function
instead

If the property is image uploader type, or if the file is on itself
an image it will ensure to give it metadata

#### Type declaration:

▸ (`file`: File): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`file` | File |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:90](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L90)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:90](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L90)

___

### openFile

• **openFile**: () => *void*

A function to open the current file

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:98](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L98)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:98](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L98)

___

### placeholder

• `Optional` **placeholder**: *string*

The placeholder of the property, every property should have a placeholder unless it's hidden
this is locale specific

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[placeholder](client_internal_components_propertyentry.ipropertyentryrendererprops.md#placeholder)

Defined in: [client/internal/components/PropertyEntry/index.tsx:56](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/index.tsx#L56)

___

### prettySize

• **prettySize**: *string*

A human readable form of the current size of the file, or null if no file

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:76](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L76)

___

### propertyId

• **propertyId**: *string*

The property id in question

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[propertyId](client_internal_components_propertyentry.ipropertyentryrendererprops.md#propertyid)

Defined in: [client/internal/components/PropertyEntry/index.tsx:45](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/index.tsx#L45)

___

### rejected

• **rejected**: *boolean*

A boolean that specifies whether the current value is actually a rejected
value that was not accepted by the filtering functions, either because of size
or whatnot, when rejected is true, the true property has a value of null

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:60](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L60)

___

### rejectedReason

• **rejectedReason**: *string*

A localized reason on why the rejected status is active

Defined in: [client/internal/components/PropertyEntry/PropertyEntryFile.tsx:64](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryFile.tsx#L64)

___

### rtl

• **rtl**: *boolean*

Whether it is in rtl mode for a rtl language

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[rtl](client_internal_components_propertyentry.ipropertyentryrendererprops.md#rtl)

Defined in: [client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/renderer.ts#L15)
