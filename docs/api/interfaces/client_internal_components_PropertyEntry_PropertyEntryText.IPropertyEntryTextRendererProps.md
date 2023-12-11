[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryText](../modules/client_internal_components_PropertyEntry_PropertyEntryText.md) / IPropertyEntryTextRendererProps

# Interface: IPropertyEntryTextRendererProps

[client/internal/components/PropertyEntry/PropertyEntryText](../modules/client_internal_components_PropertyEntry_PropertyEntryText.md).IPropertyEntryTextRendererProps

The entry text renderer props that every renderer is going to get
in order to render text

## Hierarchy

- [`IPropertyEntryRendererProps`](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md)\<[`IPropertyDefinitionSupportedTextType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md)\>

  ↳ **`IPropertyEntryTextRendererProps`**

## Table of contents

### Properties

- [args](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#args)
- [autoFocus](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#autofocus)
- [canRestore](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#canrestore)
- [currentAppliedValue](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#currentappliedvalue)
- [currentInternalValue](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#currentinternalvalue)
- [currentInvalidReason](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#currentinvalidreason)
- [currentValid](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#currentvalid)
- [currentValue](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#currentvalue)
- [currentValueLang](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#currentvaluelang)
- [currentValueText](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#currentvaluetext)
- [description](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#description)
- [disabled](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#disabled)
- [dismissLastLoadedFileError](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#dismisslastloadedfileerror)
- [enableUserSetErrors](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#enableuserseterrors)
- [features](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#features)
- [i18nGenericError](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#i18ngenericerror)
- [i18nOk](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#i18nok)
- [i18nRichInfo](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#i18nrichinfo)
- [i18nRoot](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#i18nroot)
- [isRichText](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#isrichtext)
- [label](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#label)
- [language](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#language)
- [languageOverride](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#languageoverride)
- [lastLoadedFileError](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#lastloadedfileerror)
- [onChange](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#onchange)
- [onCheckFileExists](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#oncheckfileexists)
- [onInsertFile](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#oninsertfile)
- [onInsertFileFromURL](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#oninsertfilefromurl)
- [onRestore](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#onrestore)
- [onRetrieveFile](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#onretrievefile)
- [onRetrieveImage](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#onretrieveimage)
- [placeholder](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#placeholder)
- [propertyId](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#propertyid)
- [rtl](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#rtl)
- [uniqueId](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#uniqueid)

## Properties

### args

• **args**: `Object`

The renderer args

#### Index signature

▪ [arg: `string`]: `any`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[args](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#args)

#### Defined in

[client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/59702dd5/client/internal/renderer.ts#L19)

___

### autoFocus

• **autoFocus**: `boolean`

Whether the entry should autofocus

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[autoFocus](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#autofocus)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:107](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L107)

___

### canRestore

• **canRestore**: `boolean`

A boolean, normally true if our current applied value differs from our
current value, this check is exceptional as it uses the local equal function

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[canRestore](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#canrestore)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:79](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L79)

___

### currentAppliedValue

• **currentAppliedValue**: [`IPropertyDefinitionSupportedTextType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md)

The currently applied value that is in sync with the server side

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentAppliedValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentappliedvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:74](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L74)

___

### currentInternalValue

• `Optional` **currentInternalValue**: `any`

The current internal value, if any given

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentInternalValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentinternalvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:102](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L102)

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

[client/internal/components/PropertyEntry/index.tsx:98](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L98)

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

[client/internal/components/PropertyEntry/index.tsx:90](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L90)

___

### currentValue

• **currentValue**: [`IPropertyDefinitionSupportedTextType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md)

The current value

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:83](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L83)

___

### currentValueLang

• **currentValueLang**: `string`

The language used, or null, if no language found

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:210](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L210)

___

### currentValueText

• **currentValueText**: `string`

A safe sanitized and processed value to use
with the text type

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:205](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L205)

___

### description

• `Optional` **description**: `string`

The description of the property, properties might or might not have descriptions
this is locale specific; the description might not be passed if specified by the UI

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[description](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#description)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:69](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L69)

___

### disabled

• **disabled**: `boolean`

The disabled flag is passed often when the value is somehow
enforced, this means that the field cannot truly be editted
and attempts are futile to modify

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[disabled](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#disabled)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:113](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L113)

___

### dismissLastLoadedFileError

• **dismissLastLoadedFileError**: () => `void`

#### Type declaration

▸ (): `void`

Dismiss the lastLoadedFileError

##### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:251](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L251)

___

### enableUserSetErrors

• **enableUserSetErrors**: () => `void`

#### Type declaration

▸ (): `void`

Allows for the display of user set error statuses, normally you
will call this function when your field has been blurred so that
currentInvalidReason gets populated even if the field is not poked

##### Returns

`void`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[enableUserSetErrors](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#enableuserseterrors)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:120](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L120)

___

### features

• **features**: [`IFeatureSupportOptions`](client_internal_text.IFeatureSupportOptions.md)

Rich text features

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:225](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L225)

___

### i18nGenericError

• **i18nGenericError**: `string`

A generic error that is included for building the interface
you can use to show a dialog for when the loading of file
has failed and show this error

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:237](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L237)

___

### i18nOk

• **i18nOk**: `string`

A localized version of ok

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:241](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L241)

___

### i18nRichInfo

• **i18nRichInfo**: [`IPropertyEntryI18nRichTextInfo`](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md)

For rich text contains the information about
building the standard toolbar that is expected

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:216](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L216)

___

### i18nRoot

• **i18nRoot**: `any`

The i18n root

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:220](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L220)

___

### isRichText

• **isRichText**: `boolean`

Whether it is rich text

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:230](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L230)

___

### label

• `Optional` **label**: `string`

label of the property, every property should have a label unless it's hidden
this is locale specific

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[label](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#label)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:59](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L59)

___

### language

• **language**: `string`

The current language being used by the client overall in the app

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[language](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#language)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:138](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L138)

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

[client/internal/components/PropertyEntry/index.tsx:147](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L147)

___

### lastLoadedFileError

• **lastLoadedFileError**: `string`

A localized version of an error for the last loaded file
that failed to load, try to dismiss it before attempting
to reset

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:247](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L247)

___

### onChange

• **onChange**: (`value`: [`IPropertyDefinitionSupportedTextType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md), `internalValue`: `any`) => `void`

#### Type declaration

▸ (`value`, `internalValue`): `void`

Standard on change function, every renderer will recieve this function
to trigger a change, however sometimes handlers will pass their own
change function that is supposed to be used instead of this one so
caution is advised which one to use

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`IPropertyDefinitionSupportedTextType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md) |
| `internalValue` | `any` |

##### Returns

`void`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[onChange](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#onchange)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:128](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L128)

___

### onCheckFileExists

• **onCheckFileExists**: (`fileId`: `string`) => `boolean`

#### Type declaration

▸ (`fileId`): `boolean`

Specifies whether the file id exists within the current context

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileId` | `string` | the file id |

##### Returns

`boolean`

a boolean

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:285](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L285)

___

### onInsertFile

• **onInsertFile**: (`file`: `File`, `isExpectingImage?`: `boolean`) => `Promise`\<[`IInsertedFileInformationType`](client_internal_components_PropertyEntry_PropertyEntryText.IInsertedFileInformationType.md)\>

#### Type declaration

▸ (`file`, `isExpectingImage?`): `Promise`\<[`IInsertedFileInformationType`](client_internal_components_PropertyEntry_PropertyEntryText.IInsertedFileInformationType.md)\>

Insert a file, will insert a file into the media property
and will ensure that the file is valid as well

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `File` | the file we are passing |
| `isExpectingImage?` | `boolean` | whether the file should be an image of the types we are expecting |

##### Returns

`Promise`\<[`IInsertedFileInformationType`](client_internal_components_PropertyEntry_PropertyEntryText.IInsertedFileInformationType.md)\>

a promise with information about the file, note
that even if you are not expecting just an image but
you pass an image you will get image information

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:263](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L263)

___

### onInsertFileFromURL

• **onInsertFileFromURL**: (`url`: `string`, `name`: `string`, `isExpectingImage?`: `boolean`) => `Promise`\<[`IInsertedFileInformationType`](client_internal_components_PropertyEntry_PropertyEntryText.IInsertedFileInformationType.md)\>

#### Type declaration

▸ (`url`, `name`, `isExpectingImage?`): `Promise`\<[`IInsertedFileInformationType`](client_internal_components_PropertyEntry_PropertyEntryText.IInsertedFileInformationType.md)\>

Insert a file, based on an url, this is very useful when doing
pastes where we need to retrieve the information based on an url

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | the url we need to fetch data from |
| `name` | `string` | the name of the file to give it |
| `isExpectingImage?` | `boolean` | whether the file should be an image of the types we are expecting |

##### Returns

`Promise`\<[`IInsertedFileInformationType`](client_internal_components_PropertyEntry_PropertyEntryText.IInsertedFileInformationType.md)\>

a promise with information about the file, note
that even if you are not expecting just an image but
you pass an image you will get image information

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:277](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L277)

___

### onRestore

• **onRestore**: () => `void`

#### Type declaration

▸ (): `void`

Call in order to trigger restoration, ensure that canRestore is true
when doing this

##### Returns

`void`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[onRestore](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#onrestore)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:133](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L133)

___

### onRetrieveFile

• **onRetrieveFile**: (`fileId`: `string`) => [`IPropertyDefinitionSupportedSingleFilesType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md)

#### Type declaration

▸ (`fileId`): [`IPropertyDefinitionSupportedSingleFilesType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md)

Given an id returns the given file

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileId` | `string` | the file id |

##### Returns

[`IPropertyDefinitionSupportedSingleFilesType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md)

the single file

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:292](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L292)

___

### onRetrieveImage

• **onRetrieveImage**: (`fileId`: `String`) => \{ `file`: [`IPropertyDefinitionSupportedSingleFilesType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md) ; `srcset`: `string`  }

#### Type declaration

▸ (`fileId`): `Object`

Given an id returns the given file as an image with its given source set

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileId` | `String` | the file id |

##### Returns

`Object`

the single file

| Name | Type |
| :------ | :------ |
| `file` | [`IPropertyDefinitionSupportedSingleFilesType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md) |
| `srcset` | `string` |

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:299](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L299)

___

### placeholder

• `Optional` **placeholder**: `string`

The placeholder of the property, every property should have a placeholder unless it's hidden
this is locale specific

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[placeholder](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#placeholder)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:64](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L64)

___

### propertyId

• **propertyId**: `string`

The property id in question

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[propertyId](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#propertyid)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:47](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L47)

___

### rtl

• **rtl**: `boolean`

Whether it is in rtl mode for a rtl language

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[rtl](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#rtl)

#### Defined in

[client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/59702dd5/client/internal/renderer.ts#L15)

___

### uniqueId

• **uniqueId**: `string`

an unique id for this property
with the id and the version they are related to

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[uniqueId](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#uniqueid)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:53](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyEntry/index.tsx#L53)
