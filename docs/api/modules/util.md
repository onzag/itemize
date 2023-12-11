[@onzag/itemize](../README.md) / [Modules](../modules.md) / util

# Module: util

Contains general utility functions to be used within the itemize app

## Table of contents

### Namespaces

- [Moment](util.Moment.md)

### Variables

- [DOMPurify](util.md#dompurify)
- [DOMWindow](util.md#domwindow)
- [JSDOM](util.md#jsdom)

### Functions

- [Moment](util.md#moment)
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
- [escapeHtml](util.md#escapehtml)
- [escapeStringRegexp](util.md#escapestringregexp)
- [extensionToMimeType](util.md#extensiontomimetype)
- [fileArrayURLAbsoluter](util.md#filearrayurlabsoluter)
- [fileURLAbsoluter](util.md#fileurlabsoluter)
- [formatDate](util.md#formatdate)
- [formatDateTime](util.md#formatdatetime)
- [formatTime](util.md#formattime)
- [getContainerIdFromMappers](util.md#getcontaineridfrommappers)
- [getFileExtension](util.md#getfileextension)
- [getLocalizedDateFormat](util.md#getlocalizeddateformat)
- [getLocalizedDateTimeFormat](util.md#getlocalizeddatetimeformat)
- [getLocalizedTimeFormat](util.md#getlocalizedtimeformat)
- [getNow](util.md#getnow)
- [getTime](util.md#gettime)
- [getToday](util.md#gettoday)
- [isLibReady](util.md#islibready)
- [isSupportedImage](util.md#issupportedimage)
- [loadCSS](util.md#loadcss)
- [loadLib](util.md#loadlib)
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

• `Const` **DOMPurify**: `DOMPurifyI`

#### Defined in

[util.ts:933](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L933)

___

### DOMWindow

• `Const` **DOMWindow**: `Window` & typeof `globalThis` \| `DOMWindow`

#### Defined in

[util.ts:932](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L932)

___

### JSDOM

• `Const` **JSDOM**: typeof `JSDOM` = `JSDOMDef`

#### Defined in

[util.ts:26](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L26)

## Functions

### Moment

▸ **Moment**(`inp?`, `strict?`): `moment.Moment`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `inp?` | `MomentInput` | - |
| `strict?` | `boolean` | Strict parsing disables the deprecated fallback to the native Date constructor when parsing a string. |

#### Returns

`moment.Moment`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:5

▸ **Moment**(`inp?`, `format?`, `strict?`): `moment.Moment`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `inp?` | `MomentInput` | - |
| `format?` | `MomentFormatSpecification` | - |
| `strict?` | `boolean` | Strict parsing requires that the format and input match exactly, including delimiters. Strict parsing is frequently the best parsing option. For more information about choosing strict vs forgiving parsing, see the [parsing guide](https://momentjs.com/guides/#/parsing/). |

#### Returns

`moment.Moment`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:11

▸ **Moment**(`inp?`, `format?`, `language?`, `strict?`): `moment.Moment`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `inp?` | `MomentInput` | - |
| `format?` | `MomentFormatSpecification` | - |
| `language?` | `string` | - |
| `strict?` | `boolean` | Strict parsing requires that the format and input match exactly, including delimiters. Strict parsing is frequently the best parsing option. For more information about choosing strict vs forgiving parsing, see the [parsing guide](https://momentjs.com/guides/#/parsing/). |

#### Returns

`moment.Moment`

#### Defined in

node_modules/moment/ts3.1-typings/moment.d.ts:17

___

### blobToTransferrable

▸ **blobToTransferrable**(`blob`): `Promise`\<`any`\>

Converts a blob back into the json transferrable form

#### Parameters

| Name | Type |
| :------ | :------ |
| `blob` | `File` \| `Blob` |

#### Returns

`Promise`\<`any`\>

#### Defined in

[util.ts:138](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L138)

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

[util.ts:215](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L215)

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

[util.ts:359](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L359)

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

[util.ts:800](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L800)

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

[util.ts:825](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L825)

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

[util.ts:804](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L804)

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

[util.ts:655](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L655)

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

[util.ts:674](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L674)

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

[util.ts:666](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L666)

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

[util.ts:729](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L729)

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

[util.ts:710](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L710)

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

[util.ts:748](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L748)

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

[util.ts:682](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L682)

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

[util.ts:692](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L692)

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

[util.ts:198](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L198)

___

### escapeHtml

▸ **escapeHtml**(`str`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[util.ts:264](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L264)

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

[util.ts:260](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L260)

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

[util.ts:382](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L382)

___

### fileArrayURLAbsoluter

▸ **fileArrayURLAbsoluter**(`domain`, `containerHostnamePrefixes`, `files`, `itemDefinition`, `id`, `version`, `containerId`, `include`, `property`, `cacheable`): [`IRQFile`](../interfaces/rq_querier.IRQFile.md)[]

Converts an array of files to its absolute url counterpart

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `domain` | `string` | the domain that is being used according to the env |
| `containerHostnamePrefixes` | `Object` | the containers hostnames prefixes that allow to identify the url prefix to access a given container |
| `files` | [`IRQFile`](../interfaces/rq_querier.IRQFile.md)[] | the array of files to convert |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition this file is in and stored as, it is required even for prop extensions, because every stored value has an item definition attached to it |
| `id` | `string` | the id |
| `version` | `string` | the version |
| `containerId` | `string` | the container id this file was found to be in |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include (or null) |
| `property` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property it came from |
| `cacheable` | `boolean` | whether the resulting urls should be cacheable |

#### Returns

[`IRQFile`](../interfaces/rq_querier.IRQFile.md)[]

a new array of files

#### Defined in

[util.ts:627](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L627)

___

### fileURLAbsoluter

▸ **fileURLAbsoluter**(`domain`, `containerHostnamePrefixes`, `file`, `itemDefinition`, `id`, `version`, `containerId`, `include`, `property`, `cacheable`, `forceFullURLs?`): [`IRQFile`](../interfaces/rq_querier.IRQFile.md)

Converts a file to its absolute URL counterpart

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `domain` | `string` | the domain that is being used according to the env |
| `containerHostnamePrefixes` | `Object` | the containers hostnames prefixes that allow to identify the url prefix to access a given container |
| `file` | [`IRQFile`](../interfaces/rq_querier.IRQFile.md) | the file to convert |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition this file is in and stored as, it is required even for prop extensions, because every stored value has an item definition attached to it |
| `id` | `string` | the id |
| `version` | `string` | the version |
| `containerId` | `string` | the container id this file was found to be in |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include (or null) |
| `property` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property it came from |
| `cacheable` | `boolean` | whether the resulting url should be cached |
| `forceFullURLs?` | `boolean` | - |

#### Returns

[`IRQFile`](../interfaces/rq_querier.IRQFile.md)

a new IRQFile but absolute

#### Defined in

[util.ts:535](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L535)

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

[util.ts:492](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L492)

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

[util.ts:502](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L502)

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

[util.ts:497](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L497)

___

### getContainerIdFromMappers

▸ **getContainerIdFromMappers**(`config`, `country`): `string`

Provides the container id for a given matching region

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md) |
| `country` | `string` |

#### Returns

`string`

#### Defined in

[util.ts:783](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L783)

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

[util.ts:394](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L394)

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

[util.ts:482](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L482)

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

[util.ts:488](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L488)

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

[util.ts:476](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L476)

___

### getNow

▸ **getNow**(): `string`

Provides now

#### Returns

`string`

#### Defined in

[util.ts:240](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L240)

___

### getTime

▸ **getTime**(): `string`

Provides time

#### Returns

`string`

#### Defined in

[util.ts:247](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L247)

___

### getToday

▸ **getToday**(): `string`

Provides today

#### Returns

`string`

#### Defined in

[util.ts:233](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L233)

___

### isLibReady

▸ **isLibReady**(`id`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`boolean`

#### Defined in

[util.ts:924](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L924)

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

[util.ts:404](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L404)

___

### loadCSS

▸ **loadCSS**(`id`, `url`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `url` | `string` |

#### Returns

`void`

#### Defined in

[util.ts:911](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L911)

___

### loadLib

▸ **loadLib**(`id`, `url`, `checker?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `url` | `string` |
| `checker?` | () => `boolean` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[util.ts:869](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L869)

___

### localeReplacer

▸ **localeReplacer**(`str`, `...args`): `string`

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

[util.ts:429](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L429)

___

### localeReplacerToArray

▸ **localeReplacerToArray**(`str`, `...args`): `any`[]

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

[util.ts:453](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L453)

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

[util.ts:369](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L369)

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

[util.ts:507](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L507)

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

[util.ts:515](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L515)

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

[util.ts:511](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L511)

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

[util.ts:413](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L413)

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

[util.ts:347](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L347)

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

[util.ts:110](https://github.com/onzag/itemize/blob/59702dd5/util.ts#L110)
