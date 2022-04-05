[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryText](../modules/client_internal_components_PropertyEntry_PropertyEntryText.md) / IPropertyEntryTextRendererProps

# Interface: IPropertyEntryTextRendererProps

[client/internal/components/PropertyEntry/PropertyEntryText](../modules/client_internal_components_PropertyEntry_PropertyEntryText.md).IPropertyEntryTextRendererProps

The entry text renderer props that every renderer is going to get
in order to render text

## Hierarchy

- [`IPropertyEntryRendererProps`](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md)<`string`\>

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
- [description](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#description)
- [disabled](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#disabled)
- [features](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#features)
- [i18nGenericError](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#i18ngenericerror)
- [i18nOk](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#i18nok)
- [i18nRichInfo](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#i18nrichinfo)
- [i18nRoot](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#i18nroot)
- [icon](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#icon)
- [isRichText](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#isrichtext)
- [label](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#label)
- [lastLoadedFileError](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#lastloadedfileerror)
- [placeholder](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#placeholder)
- [propertyId](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#propertyid)
- [rtl](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#rtl)

### Methods

- [dismissLastLoadedFileError](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#dismisslastloadedfileerror)
- [enableUserSetErrors](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#enableuserseterrors)
- [onChange](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#onchange)
- [onCheckFileExists](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#oncheckfileexists)
- [onInsertFile](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#oninsertfile)
- [onInsertFileFromURL](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#oninsertfilefromurl)
- [onRestore](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#onrestore)
- [onRetrieveDataURI](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#onretrievedatauri)
- [onRetrieveFile](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md#onretrievefile)

## Properties

### args

• **args**: `Object`

The renderer args

#### Index signature

▪ [arg: `string`]: `any`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[args](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#args)

#### Defined in

[client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/renderer.ts#L19)

___

### autoFocus

• **autoFocus**: `boolean`

Whether the entry should autofocus

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[autoFocus](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#autofocus)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:105](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L105)

___

### canRestore

• **canRestore**: `boolean`

A boolean, normally true if our current applied value differs from our
current value, this check is exceptional as it uses the local equal function

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[canRestore](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#canrestore)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:77](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L77)

___

### currentAppliedValue

• **currentAppliedValue**: `string`

The currently applied value that is in sync with the server side

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentAppliedValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentappliedvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:72](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L72)

___

### currentInternalValue

• `Optional` **currentInternalValue**: `any`

The current internal value, if any given

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentInternalValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentinternalvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:100](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L100)

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

[client/internal/components/PropertyEntry/index.tsx:96](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L96)

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

[client/internal/components/PropertyEntry/index.tsx:88](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L88)

___

### currentValue

• **currentValue**: `string`

The current value

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:81](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L81)

___

### description

• `Optional` **description**: `string`

The description of the property, properties might or might not have descriptions
this is locale specific; the description might not be passed if specified by the UI

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[description](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#description)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:63](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L63)

___

### disabled

• **disabled**: `boolean`

The disabled flag is passed often when the value is somehow
enforced, this means that the field cannot truly be editted
and attempts are futile to modify

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[disabled](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#disabled)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:111](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L111)

___

### features

• **features**: [`IFeatureSupportOptions`](client_internal_text.IFeatureSupportOptions.md)

Rich text features

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:163](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L163)

___

### i18nGenericError

• **i18nGenericError**: `string`

A generic error that is included for building the interface
you can use to show a dialog for when the loading of file
has failed and show this error

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:175](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L175)

___

### i18nOk

• **i18nOk**: `string`

A localized version of ok

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:179](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L179)

___

### i18nRichInfo

• **i18nRichInfo**: [`IPropertyEntryI18nRichTextInfo`](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryI18nRichTextInfo.md)

For rich text contains the information about
building the standard toolbar that is expected

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:154](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L154)

___

### i18nRoot

• **i18nRoot**: `any`

The i18n root

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:158](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L158)

___

### icon

• `Optional` **icon**: `ReactNode`

Icon are an UI defined property for an icon to use during the view, handle as you wish

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[icon](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#icon)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:67](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L67)

___

### isRichText

• **isRichText**: `boolean`

Whether it is rich text

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:168](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L168)

___

### label

• `Optional` **label**: `string`

label of the property, every property should have a label unless it's hidden
this is locale specific

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[label](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#label)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:53](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L53)

___

### lastLoadedFileError

• **lastLoadedFileError**: `string`

A localized version of an error for the last loaded file
that failed to load, try to dismiss it before attempting
to reset

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:185](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L185)

___

### placeholder

• `Optional` **placeholder**: `string`

The placeholder of the property, every property should have a placeholder unless it's hidden
this is locale specific

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[placeholder](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#placeholder)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:58](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L58)

___

### propertyId

• **propertyId**: `string`

The property id in question

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[propertyId](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#propertyid)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:47](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L47)

___

### rtl

• **rtl**: `boolean`

Whether it is in rtl mode for a rtl language

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[rtl](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#rtl)

#### Defined in

[client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/renderer.ts#L15)

## Methods

### dismissLastLoadedFileError

▸ **dismissLastLoadedFileError**(): `void`

Dismiss the lastLoadedFileError

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:189](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L189)

___

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

[client/internal/components/PropertyEntry/index.tsx:118](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L118)

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

[client/internal/components/PropertyEntry/index.tsx:126](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L126)

___

### onCheckFileExists

▸ **onCheckFileExists**(`fileId`): `boolean`

Specifies whether the file id exists within the current context

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileId` | `string` | the file id |

#### Returns

`boolean`

a boolean

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:223](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L223)

___

### onInsertFile

▸ **onInsertFile**(`file`, `isExpectingImage?`): `Promise`<[`IInsertedFileInformationType`](client_internal_components_PropertyEntry_PropertyEntryText.IInsertedFileInformationType.md)\>

Insert a file, will insert a file into the media property
and will ensure that the file is valid as well

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `File` | the file we are passing |
| `isExpectingImage?` | `boolean` | whether the file should be an image of the types we are expecting |

#### Returns

`Promise`<[`IInsertedFileInformationType`](client_internal_components_PropertyEntry_PropertyEntryText.IInsertedFileInformationType.md)\>

a promise with information about the file, note
that even if you are not expecting just an image but
you pass an image you will get image information

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:201](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L201)

___

### onInsertFileFromURL

▸ **onInsertFileFromURL**(`url`, `name`, `isExpectingImage?`): `Promise`<[`IInsertedFileInformationType`](client_internal_components_PropertyEntry_PropertyEntryText.IInsertedFileInformationType.md)\>

Insert a file, based on an url, this is very useful when doing
pastes where we need to retrieve the information based on an url

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | the url we need to fetch data from |
| `name` | `string` | the name of the file to give it |
| `isExpectingImage?` | `boolean` | whether the file should be an image of the types we are expecting |

#### Returns

`Promise`<[`IInsertedFileInformationType`](client_internal_components_PropertyEntry_PropertyEntryText.IInsertedFileInformationType.md)\>

a promise with information about the file, note
that even if you are not expecting just an image but
you pass an image you will get image information

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:215](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L215)

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

[client/internal/components/PropertyEntry/index.tsx:131](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L131)

___

### onRetrieveDataURI

▸ **onRetrieveDataURI**(`fileId`): `string`

Given a blob URL that doesn't have a remote server located storage
provides a data URI for the file, this is used for copying; as you will
need DATA URIs for blob urls

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileId` | `string` | the file id |

#### Returns

`string`

a data uri or null

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:239](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L239)

___

### onRetrieveFile

▸ **onRetrieveFile**(`fileId`): [`IPropertyDefinitionSupportedSingleFilesType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md)

Given an id returns the given file

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileId` | `string` | the file id |

#### Returns

[`IPropertyDefinitionSupportedSingleFilesType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md)

the single file

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryText.tsx:230](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryText.tsx#L230)
