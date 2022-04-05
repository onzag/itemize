[@onzag/itemize](../README.md) / [Modules](../modules.md) / util

# Module: util

Contains general utility functions to be used within the itemize app

## Table of contents

### Variables

- [DOMPurify](util.md#dompurify)
- [DOMWindow](util.md#domwindow)
- [JSDOM](util.md#jsdom)
- [Moment](util.md#moment)

### Functions

- [blobToTransferrable](util.md#blobtotransferrable)
- [capitalize](util.md#capitalize)
- [checkFileInAccepts](util.md#checkfileinaccepts)
- [checkIsPossiblePhoneNumber](util.md#checkispossiblephonenumber)
- [convertCurrencyValue](util.md#convertcurrencyvalue)
- [convertPhoneNumberToInternational](util.md#convertphonenumbertointernational)
- [createCurrencyValue](util.md#createcurrencyvalue)
- [createDateTimeValue](util.md#createdatetimevalue)
- [createDateValue](util.md#createdatevalue)
- [createFakeFileValue](util.md#createfakefilevalue)
- [createLocationValue](util.md#createlocationvalue)
- [createRealFileValue](util.md#createrealfilevalue)
- [createTimeValue](util.md#createtimevalue)
- [createUnitValue](util.md#createunitvalue)
- [delayedExecutionFn](util.md#delayedexecutionfn)
- [escapeStringRegexp](util.md#escapestringregexp)
- [extensionToMimeType](util.md#extensiontomimetype)
- [fileArrayURLAbsoluter](util.md#filearrayurlabsoluter)
- [fileURLAbsoluter](util.md#fileurlabsoluter)
- [formatDate](util.md#formatdate)
- [formatDateTime](util.md#formatdatetime)
- [formatTime](util.md#formattime)
- [getFileExtension](util.md#getfileextension)
- [getLocalizedDateFormat](util.md#getlocalizeddateformat)
- [getLocalizedDateTimeFormat](util.md#getlocalizeddatetimeformat)
- [getLocalizedTimeFormat](util.md#getlocalizedtimeformat)
- [getNow](util.md#getnow)
- [getTime](util.md#gettime)
- [getToday](util.md#gettoday)
- [isSupportedImage](util.md#issupportedimage)
- [localeReplacer](util.md#localereplacer)
- [localeReplacerToArray](util.md#localereplacertoarray)
- [mimeTypeToExtension](util.md#mimetypetoextension)
- [parseDate](util.md#parsedate)
- [parseDateTime](util.md#parsedatetime)
- [parseTime](util.md#parsetime)
- [prettySize](util.md#prettysize)
- [processAccepts](util.md#processaccepts)
- [transferrableToBlob](util.md#transferrabletoblob)

## Variables

### DOMPurify

• **DOMPurify**: `DOMPurifyI`

#### Defined in

[util.ts:803](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L803)

___

### DOMWindow

• **DOMWindow**: `Window` & typeof `globalThis` \| `DOMWindow`

#### Defined in

[util.ts:802](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L802)

___

### JSDOM

• **JSDOM**: typeof `JSDOM` = `JSDOMDef`

#### Defined in

[util.ts:25](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L25)

___

### Moment

• **Moment**: typeof `moment` = `MomentDef`

#### Defined in

[util.ts:24](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L24)

## Functions

### blobToTransferrable

▸ **blobToTransferrable**(`blob`): `Promise`<`any`\>

Converts a blob back into the json transferrable form

#### Parameters

| Name | Type |
| :------ | :------ |
| `blob` | `File` \| `Blob` |

#### Returns

`Promise`<`any`\>

#### Defined in

[util.ts:137](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L137)

___

### capitalize

▸ **capitalize**(`str`): `string`

capitalizes a string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | the string to capitalize |

#### Returns

`string`

#### Defined in

[util.ts:214](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L214)

___

### checkFileInAccepts

▸ **checkFileInAccepts**(`fileType`, `accept`): `boolean`

Checks whether the file type exists in the accept property

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileType` | `string` | the file.type |
| `accept` | `string` | the accept property |

#### Returns

`boolean`

#### Defined in

[util.ts:346](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L346)

___

### checkIsPossiblePhoneNumber

▸ **checkIsPossiblePhoneNumber**(`number`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `number` | `string` |

#### Returns

`boolean`

#### Defined in

[util.ts:749](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L749)

___

### convertCurrencyValue

▸ **convertCurrencyValue**(`value`, `code`, `appData`): [`IPropertyDefinitionSupportedCurrencyType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_currency.IPropertyDefinitionSupportedCurrencyType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`IPropertyDefinitionSupportedCurrencyType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_currency.IPropertyDefinitionSupportedCurrencyType.md) |
| `code` | `string` |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

[`IPropertyDefinitionSupportedCurrencyType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_currency.IPropertyDefinitionSupportedCurrencyType.md)

#### Defined in

[util.ts:774](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L774)

___

### convertPhoneNumberToInternational

▸ **convertPhoneNumberToInternational**(`number`, `countryCode`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `number` | `string` |
| `countryCode` | `string` |

#### Returns

`string`

#### Defined in

[util.ts:753](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L753)

___

### createCurrencyValue

▸ **createCurrencyValue**(`value`, `currency`): [`IPropertyDefinitionSupportedCurrencyType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_currency.IPropertyDefinitionSupportedCurrencyType.md)

Creates a currency value to use with prefills and setters

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | the currency numeric value |
| `currency` | `string` | the currency itself |

#### Returns

[`IPropertyDefinitionSupportedCurrencyType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_currency.IPropertyDefinitionSupportedCurrencyType.md)

#### Defined in

[util.ts:624](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L624)

___

### createDateTimeValue

▸ **createDateTimeValue**(`value`): `string`

Creates a datetime value to be used with prefills and setters

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `Date` |

#### Returns

`string`

#### Defined in

[util.ts:643](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L643)

___

### createDateValue

▸ **createDateValue**(`value`): `string`

Creates a date value to be used with prefills and setters

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `Date` |

#### Returns

`string`

#### Defined in

[util.ts:635](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L635)

___

### createFakeFileValue

▸ **createFakeFileValue**(`id`, `name`, `url`, `type?`, `size?`): [`PropertyDefinitionSupportedFileType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_file.md#propertydefinitionsupportedfiletype)

A fake file value that you should not submit as it's an invalid value
you can use this to setup a placeholder of sorts

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |
| `url` | `string` |
| `type?` | `string` |
| `size?` | `number` |

#### Returns

[`PropertyDefinitionSupportedFileType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_file.md#propertydefinitionsupportedfiletype)

#### Defined in

[util.ts:698](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L698)

___

### createLocationValue

▸ **createLocationValue**(`txt`, `atxt`, `lat?`, `lng?`, `id?`): [`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)

Creates an location value to be used with prefills and setters

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txt` | `string` |  |
| `atxt` | `string` |  |
| `lat?` | `number` |  |
| `lng?` | `number` |  |
| `id?` | `string` | non necessary if not planning to submit |

#### Returns

[`IPropertyDefinitionSupportedLocationType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)

#### Defined in

[util.ts:679](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L679)

___

### createRealFileValue

▸ **createRealFileValue**(`id`, `file`, `objectURL`, `imageMetadataGeneratorInfo?`): [`PropertyDefinitionSupportedFileType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_file.md#propertydefinitionsupportedfiletype)

Creates a real image value to prefill with that can be used to generate
values that can be submitted

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `file` | `File` |
| `objectURL` | `string` |
| `imageMetadataGeneratorInfo?` | `Object` |
| `imageMetadataGeneratorInfo.height` | `number` |
| `imageMetadataGeneratorInfo.property` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |
| `imageMetadataGeneratorInfo.width` | `number` |

#### Returns

[`PropertyDefinitionSupportedFileType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_file.md#propertydefinitionsupportedfiletype)

#### Defined in

[util.ts:717](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L717)

___

### createTimeValue

▸ **createTimeValue**(`value`): `string`

Creates a time value to be used with prefills and setters

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `Date` |

#### Returns

`string`

#### Defined in

[util.ts:651](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L651)

___

### createUnitValue

▸ **createUnitValue**(`value`, `unit`, `normalizedUnit`): [`IPropertyDefinitionSupportedUnitType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_unit.IPropertyDefinitionSupportedUnitType.md)

Creates an unit value to be used with prefills and setters

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |
| `unit` | `string` |
| `normalizedUnit` | `string` |

#### Returns

[`IPropertyDefinitionSupportedUnitType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_unit.IPropertyDefinitionSupportedUnitType.md)

#### Defined in

[util.ts:661](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L661)

___

### delayedExecutionFn

▸ **delayedExecutionFn**(`fn`, `id`, `ms`): `TimedExecutedFn`

Delays the execution of a function by given milliseconds
ensure these do not stack together

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | `any` | the function in question |
| `id` | `string` | the id to use |
| `ms` | `number` | the milliseconds delay before submitting |

#### Returns

`TimedExecutedFn`

a function without parameters

#### Defined in

[util.ts:197](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L197)

___

### escapeStringRegexp

▸ **escapeStringRegexp**(`str`): `string`

Escapes a string into a regex

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | the string to escape |

#### Returns

`string`

a string that is regex ready

#### Defined in

[util.ts:259](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L259)

___

### extensionToMimeType

▸ **extensionToMimeType**(`ext`): `string`

Gives the mime type based on a extension

#### Parameters

| Name | Type |
| :------ | :------ |
| `ext` | `string` |

#### Returns

`string`

#### Defined in

[util.ts:369](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L369)

___

### fileArrayURLAbsoluter

▸ **fileArrayURLAbsoluter**(`domain`, `containerHostnamePrefixes`, `files`, `itemDefinition`, `id`, `version`, `containerId`, `include`, `property`, `cacheable`): [`IGQLFile`](../interfaces/gql_querier.IGQLFile.md)[]

Converts an array of files to its absolute url counterpart

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `domain` | `string` | the domain that is being used according to the env |
| `containerHostnamePrefixes` | `Object` | the containers hostnames prefixes that allow to identify the url prefix to access a given container |
| `files` | [`IGQLFile`](../interfaces/gql_querier.IGQLFile.md)[] | the array of files to convert |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition this file is in and stored as, it is required even for prop extensions, because every stored value has an item definition attached to it |
| `id` | `string` | the id |
| `version` | `string` | the version |
| `containerId` | `string` | the container id this file was found to be in |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include (or null) |
| `property` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property it came from |
| `cacheable` | `boolean` | whether the resulting urls should be cacheable |

#### Returns

[`IGQLFile`](../interfaces/gql_querier.IGQLFile.md)[]

a new array of files

#### Defined in

[util.ts:596](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L596)

___

### fileURLAbsoluter

▸ **fileURLAbsoluter**(`domain`, `containerHostnamePrefixes`, `file`, `itemDefinition`, `id`, `version`, `containerId`, `include`, `property`, `cacheable`): [`IGQLFile`](../interfaces/gql_querier.IGQLFile.md)

Converts a file to its absolute URL counterpart

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `domain` | `string` | the domain that is being used according to the env |
| `containerHostnamePrefixes` | `Object` | the containers hostnames prefixes that allow to identify the url prefix to access a given container |
| `file` | [`IGQLFile`](../interfaces/gql_querier.IGQLFile.md) | the file to convert |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition this file is in and stored as, it is required even for prop extensions, because every stored value has an item definition attached to it |
| `id` | `string` | the id |
| `version` | `string` | the version |
| `containerId` | `string` | the container id this file was found to be in |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include (or null) |
| `property` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property it came from |
| `cacheable` | `boolean` | whether the resulting url should be cached |

#### Returns

[`IGQLFile`](../interfaces/gql_querier.IGQLFile.md)

a new IGQLFile but absolute

#### Defined in

[util.ts:522](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L522)

___

### formatDate

▸ **formatDate**(`locale`, `date`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `locale` | `string` |
| `date` | `string` |

#### Returns

`string`

#### Defined in

[util.ts:479](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L479)

___

### formatDateTime

▸ **formatDateTime**(`locale`, `datetime`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `locale` | `string` |
| `datetime` | `string` |

#### Returns

`string`

#### Defined in

[util.ts:489](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L489)

___

### formatTime

▸ **formatTime**(`locale`, `time`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `locale` | `string` |
| `time` | `string` |

#### Returns

`string`

#### Defined in

[util.ts:484](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L484)

___

### getFileExtension

▸ **getFileExtension**(`fileName`): `string`

Gets the extension from a given file name

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileName` | `string` |

#### Returns

`string`

#### Defined in

[util.ts:381](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L381)

___

### getLocalizedDateFormat

▸ **getLocalizedDateFormat**(`locale`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `locale` | `string` |

#### Returns

`any`

#### Defined in

[util.ts:469](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L469)

___

### getLocalizedDateTimeFormat

▸ **getLocalizedDateTimeFormat**(`locale`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `locale` | `string` |

#### Returns

`string`

#### Defined in

[util.ts:475](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L475)

___

### getLocalizedTimeFormat

▸ **getLocalizedTimeFormat**(`locale`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `locale` | `string` |

#### Returns

`any`

#### Defined in

[util.ts:463](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L463)

___

### getNow

▸ **getNow**(): `string`

Provides now

#### Returns

`string`

#### Defined in

[util.ts:239](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L239)

___

### getTime

▸ **getTime**(): `string`

Provides time

#### Returns

`string`

#### Defined in

[util.ts:246](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L246)

___

### getToday

▸ **getToday**(): `string`

Provides today

#### Returns

`string`

#### Defined in

[util.ts:232](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L232)

___

### isSupportedImage

▸ **isSupportedImage**(`mimeType`): `boolean`

Specifies whether the given mime type is of a supported image

#### Parameters

| Name | Type |
| :------ | :------ |
| `mimeType` | `string` |

#### Returns

`boolean`

#### Defined in

[util.ts:391](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L391)

___

### localeReplacer

▸ **localeReplacer**(`str`, ...`args`): `string`

Replaces a string to another for locale usage
eg. `"hello {0} world {1}"` with `["foo", "bar"]` become
`"hello foo world bar"`

TODO build cache here this is way too expensive to be running
all the time

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | the string |
| `...args` | `any`[] | the args to pass |

#### Returns

`string`

a string

#### Defined in

[util.ts:416](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L416)

___

### localeReplacerToArray

▸ **localeReplacerToArray**(`str`, ...`args`): `any`[]

Replaces a string to an array of whatever it was sent
for locale usage
eg. `"hello {0} world {1}"` with `[<span>foo</span>, <span>bar</span>]` become
`["hello ",<span>foo</span>," world ",<span>bar</span>]`

TODO build cache here this is way too expensive to be running
all the time

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | the string |
| `...args` | `any`[] | the args to pass |

#### Returns

`any`[]

a an array

#### Defined in

[util.ts:440](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L440)

___

### mimeTypeToExtension

▸ **mimeTypeToExtension**(`str`): `any`

Converts a mime type to an extension using a known extension list

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | the string that represents the mime type |

#### Returns

`any`

an extension or txt if it doesn't know

#### Defined in

[util.ts:356](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L356)

___

### parseDate

▸ **parseDate**(`date`): `Moment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `string` |

#### Returns

`Moment`

#### Defined in

[util.ts:494](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L494)

___

### parseDateTime

▸ **parseDateTime**(`datetime`): `Moment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `datetime` | `string` |

#### Returns

`Moment`

#### Defined in

[util.ts:502](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L502)

___

### parseTime

▸ **parseTime**(`time`): `Moment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `time` | `string` |

#### Returns

`Moment`

#### Defined in

[util.ts:498](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L498)

___

### prettySize

▸ **prettySize**(`size`): `string`

Basically an extension to pretty bytes

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number` |

#### Returns

`string`

#### Defined in

[util.ts:400](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L400)

___

### processAccepts

▸ **processAccepts**(`accept`, `isExpectingImages?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `accept` | `string` |
| `isExpectingImages?` | `boolean` |

#### Returns

`string`

#### Defined in

[util.ts:334](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L334)

___

### transferrableToBlob

▸ **transferrableToBlob**(`transferrable`): `Blob`

Converts a transferrable object, that contains blobs within its structure
to a simple blob that contains everything including these blobs

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transferrable` | `any` | the transferrable object |

#### Returns

`Blob`

a blob that contains everything

#### Defined in

[util.ts:109](https://github.com/onzag/itemize/blob/f2f29986/util.ts#L109)
