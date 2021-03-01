[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryText](../modules/client_internal_components_propertyentry_propertyentrytext.md) / IPropertyEntryTextRendererProps

# Interface: IPropertyEntryTextRendererProps

[client/internal/components/PropertyEntry/PropertyEntryText](../modules/client_internal_components_propertyentry_propertyentrytext.md).IPropertyEntryTextRendererProps

The entry text renderer props that every renderer is going to get
in order to render text

## Hierarchy

* [*IPropertyEntryRendererProps*](client_internal_components_propertyentry.ipropertyentryrendererprops.md)<string\>

  ↳ **IPropertyEntryTextRendererProps**

## Table of contents

### Properties

- [args](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#args)
- [autoFocus](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#autofocus)
- [canRestore](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#canrestore)
- [currentAppliedValue](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#currentappliedvalue)
- [currentInternalValue](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#currentinternalvalue)
- [currentInvalidReason](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#currentinvalidreason)
- [currentValid](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#currentvalid)
- [currentValue](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#currentvalue)
- [description](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#description)
- [disabled](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#disabled)
- [dismissLastLoadedFileError](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#dismisslastloadedfileerror)
- [enableUserSetErrors](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#enableuserseterrors)
- [features](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#features)
- [i18nGenericError](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#i18ngenericerror)
- [i18nOk](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#i18nok)
- [i18nRichInfo](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#i18nrichinfo)
- [i18nRoot](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#i18nroot)
- [icon](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#icon)
- [isRichText](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#isrichtext)
- [label](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#label)
- [lastLoadedFileError](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#lastloadedfileerror)
- [onChange](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#onchange)
- [onCheckFileExists](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#oncheckfileexists)
- [onInsertFile](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#oninsertfile)
- [onInsertFileFromURL](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#oninsertfilefromurl)
- [onRestore](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#onrestore)
- [onRetrieveDataURI](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#onretrievedatauri)
- [onRetrieveFile](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#onretrievefile)
- [placeholder](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#placeholder)
- [propertyId](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#propertyid)
- [rtl](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md#rtl)

## Properties

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

• **currentAppliedValue**: *string*

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

• **currentValue**: *string*

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

### dismissLastLoadedFileError

• **dismissLastLoadedFileError**: () => *void*

Dismiss the lastLoadedFileError

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:184](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L184)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:184](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L184)

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

### features

• **features**: [*IFeatureSupportOptions*](client_internal_text.ifeaturesupportoptions.md)

Rich text features

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:158](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L158)

___

### i18nGenericError

• **i18nGenericError**: *string*

A generic error that is included for building the interface
you can use to show a dialog for when the loading of file
has failed and show this error

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:170](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L170)

___

### i18nOk

• **i18nOk**: *string*

A localized version of ok

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:174](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L174)

___

### i18nRichInfo

• **i18nRichInfo**: [*IPropertyEntryI18nRichTextInfo*](client_internal_components_propertyentry_propertyentrytext.ipropertyentryi18nrichtextinfo.md)

For rich text contains the information about
building the standard toolbar that is expected

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:149](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L149)

___

### i18nRoot

• **i18nRoot**: *any*

The i18n root

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:153](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L153)

___

### icon

• `Optional` **icon**: ReactNode

Icon are an UI defined property for an icon to use during the view, handle as you wish

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[icon](client_internal_components_propertyentry.ipropertyentryrendererprops.md#icon)

Defined in: [client/internal/components/PropertyEntry/index.tsx:65](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/index.tsx#L65)

___

### isRichText

• **isRichText**: *boolean*

Whether it is rich text

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:163](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L163)

___

### label

• `Optional` **label**: *string*

label of the property, every property should have a label unless it's hidden
this is locale specific

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[label](client_internal_components_propertyentry.ipropertyentryrendererprops.md#label)

Defined in: [client/internal/components/PropertyEntry/index.tsx:51](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/index.tsx#L51)

___

### lastLoadedFileError

• **lastLoadedFileError**: *string*

A localized version of an error for the last loaded file
that failed to load, try to dismiss it before attempting
to reset

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:180](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L180)

___

### onChange

• **onChange**: (`value`: *string*, `internalValue`: *any*) => *void*

Standard on change function, every renderer will recieve this function
to trigger a change, however sometimes handlers will pass their own
change function that is supposed to be used instead of this one so
caution is advised which one to use

#### Type declaration:

▸ (`value`: *string*, `internalValue`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *string* |
`internalValue` | *any* |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/index.tsx:124](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/index.tsx#L124)

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[onChange](client_internal_components_propertyentry.ipropertyentryrendererprops.md#onchange)

Defined in: [client/internal/components/PropertyEntry/index.tsx:124](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/index.tsx#L124)

___

### onCheckFileExists

• **onCheckFileExists**: (`fileId`: *string*) => *boolean*

Specifies whether the file id exists within the current context

**`param`** the file id

**`returns`** a boolean

#### Type declaration:

▸ (`fileId`: *string*): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`fileId` | *string* |

**Returns:** *boolean*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:218](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L218)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:218](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L218)

___

### onInsertFile

• **onInsertFile**: (`file`: File, `isExpectingImage?`: *boolean*) => *Promise*<[*IInsertedFileInformationType*](client_internal_components_propertyentry_propertyentrytext.iinsertedfileinformationtype.md)\>

Insert a file, will insert a file into the media property
and will ensure that the file is valid as well

**`param`** the file we are passing

**`param`** whether the file should be an image
of the types we are expecting

**`returns`** a promise with information about the file, note
that even if you are not expecting just an image but
you pass an image you will get image information

#### Type declaration:

▸ (`file`: File, `isExpectingImage?`: *boolean*): *Promise*<[*IInsertedFileInformationType*](client_internal_components_propertyentry_propertyentrytext.iinsertedfileinformationtype.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`file` | File |
`isExpectingImage?` | *boolean* |

**Returns:** *Promise*<[*IInsertedFileInformationType*](client_internal_components_propertyentry_propertyentrytext.iinsertedfileinformationtype.md)\>

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:196](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L196)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:196](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L196)

___

### onInsertFileFromURL

• **onInsertFileFromURL**: (`url`: *string*, `name`: *string*, `isExpectingImage?`: *boolean*) => *Promise*<[*IInsertedFileInformationType*](client_internal_components_propertyentry_propertyentrytext.iinsertedfileinformationtype.md)\>

Insert a file, based on an url, this is very useful when doing
pastes where we need to retrieve the information based on an url

**`param`** the url we need to fetch data from

**`param`** the name of the file to give it

**`param`** whether the file should be an image
of the types we are expecting

**`returns`** a promise with information about the file, note
that even if you are not expecting just an image but
you pass an image you will get image information

#### Type declaration:

▸ (`url`: *string*, `name`: *string*, `isExpectingImage?`: *boolean*): *Promise*<[*IInsertedFileInformationType*](client_internal_components_propertyentry_propertyentrytext.iinsertedfileinformationtype.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`url` | *string* |
`name` | *string* |
`isExpectingImage?` | *boolean* |

**Returns:** *Promise*<[*IInsertedFileInformationType*](client_internal_components_propertyentry_propertyentrytext.iinsertedfileinformationtype.md)\>

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:210](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L210)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:210](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L210)

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

### onRetrieveDataURI

• **onRetrieveDataURI**: (`fileId`: *string*) => *string*

Given a blob URL that doesn't have a remote server located storage
provides a data URI for the file, this is used for copying; as you will
need DATA URIs for blob urls

**`param`** the file id

**`returns`** a data uri or null

#### Type declaration:

▸ (`fileId`: *string*): *string*

#### Parameters:

Name | Type |
:------ | :------ |
`fileId` | *string* |

**Returns:** *string*

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:234](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L234)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:234](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L234)

___

### onRetrieveFile

• **onRetrieveFile**: (`fileId`: *string*) => [*IPropertyDefinitionSupportedSingleFilesType*](base_root_module_itemdefinition_propertydefinition_types_files.ipropertydefinitionsupportedsinglefilestype.md)

Given an id returns the given file

**`param`** the file id

**`returns`** the single file

#### Type declaration:

▸ (`fileId`: *string*): [*IPropertyDefinitionSupportedSingleFilesType*](base_root_module_itemdefinition_propertydefinition_types_files.ipropertydefinitionsupportedsinglefilestype.md)

#### Parameters:

Name | Type |
:------ | :------ |
`fileId` | *string* |

**Returns:** [*IPropertyDefinitionSupportedSingleFilesType*](base_root_module_itemdefinition_propertydefinition_types_files.ipropertydefinitionsupportedsinglefilestype.md)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:225](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L225)

Defined in: [client/internal/components/PropertyEntry/PropertyEntryText.tsx:225](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L225)

___

### placeholder

• `Optional` **placeholder**: *string*

The placeholder of the property, every property should have a placeholder unless it's hidden
this is locale specific

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[placeholder](client_internal_components_propertyentry.ipropertyentryrendererprops.md#placeholder)

Defined in: [client/internal/components/PropertyEntry/index.tsx:56](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/index.tsx#L56)

___

### propertyId

• **propertyId**: *string*

The property id in question

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[propertyId](client_internal_components_propertyentry.ipropertyentryrendererprops.md#propertyid)

Defined in: [client/internal/components/PropertyEntry/index.tsx:45](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/components/PropertyEntry/index.tsx#L45)

___

### rtl

• **rtl**: *boolean*

Whether it is in rtl mode for a rtl language

Inherited from: [IPropertyEntryRendererProps](client_internal_components_propertyentry.ipropertyentryrendererprops.md).[rtl](client_internal_components_propertyentry.ipropertyentryrendererprops.md#rtl)

Defined in: [client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/renderer.ts#L15)
