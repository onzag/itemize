[](../README.md) / [Exports](../modules.md) / util

# Module: util

Contains general utility functions to be used within the itemize app

## Table of contents

### Variables

- [DOMPurify](util.md#dompurify)
- [DOMWindow](util.md#domwindow)
- [JSDOM](util.md#jsdom)
- [Moment](util.md#moment)

### Functions

- [capitalize](util.md#capitalize)
- [checkFileInAccepts](util.md#checkfileinaccepts)
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
- [fileArrayURLAbsoluter](util.md#filearrayurlabsoluter)
- [fileURLAbsoluter](util.md#fileurlabsoluter)
- [formatDate](util.md#formatdate)
- [formatDateTime](util.md#formatdatetime)
- [formatTime](util.md#formattime)
- [getLocalizedDateFormat](util.md#getlocalizeddateformat)
- [getLocalizedDateTimeFormat](util.md#getlocalizeddatetimeformat)
- [getLocalizedTimeFormat](util.md#getlocalizedtimeformat)
- [getNow](util.md#getnow)
- [getTime](util.md#gettime)
- [getToday](util.md#gettoday)
- [localeReplacer](util.md#localereplacer)
- [localeReplacerToArray](util.md#localereplacertoarray)
- [mimeTypeToExtension](util.md#mimetypetoextension)
- [parseDate](util.md#parsedate)
- [parseDateTime](util.md#parsedatetime)
- [parseTime](util.md#parsetime)
- [processAccepts](util.md#processaccepts)

## Variables

### DOMPurify

• `Const` **DOMPurify**: DOMPurifyI

Defined in: [util.ts:543](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L543)

___

### DOMWindow

• `Const` **DOMWindow**: Window & *typeof* globalThis \| DOMWindow

Defined in: [util.ts:542](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L542)

___

### JSDOM

• `Const` **JSDOM**: *typeof* JSDOM

Defined in: [util.ts:22](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L22)

___

### Moment

• `Const` **Moment**: *typeof* moment

Defined in: [util.ts:21](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L21)

## Functions

### capitalize

▸ **capitalize**(`str`: *string*): *string*

capitalizes a string

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`str` | *string* | the string to capitalize    |

**Returns:** *string*

Defined in: [util.ts:58](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L58)

___

### checkFileInAccepts

▸ **checkFileInAccepts**(`fileType`: *string*, `accept`: *string*): *boolean*

Checks whether the file type exists in the accept property

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`fileType` | *string* | the file.type   |
`accept` | *string* | the accept property    |

**Returns:** *boolean*

Defined in: [util.ts:190](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L190)

___

### createCurrencyValue

▸ **createCurrencyValue**(`value`: *number*, `currency`: *string*): [*IPropertyDefinitionSupportedCurrencyType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_currency.ipropertydefinitionsupportedcurrencytype.md)

Creates a currency value to use with prefills and setters

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`value` | *number* | the currency numeric value   |
`currency` | *string* | the currency itself    |

**Returns:** [*IPropertyDefinitionSupportedCurrencyType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_currency.ipropertydefinitionsupportedcurrencytype.md)

Defined in: [util.ts:420](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L420)

___

### createDateTimeValue

▸ **createDateTimeValue**(`value`: Date \| *string*): *string*

Creates a datetime value to be used with prefills and setters

#### Parameters:

Name | Type |
:------ | :------ |
`value` | Date \| *string* |

**Returns:** *string*

Defined in: [util.ts:439](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L439)

___

### createDateValue

▸ **createDateValue**(`value`: Date \| *string*): *string*

Creates a date value to be used with prefills and setters

#### Parameters:

Name | Type |
:------ | :------ |
`value` | Date \| *string* |

**Returns:** *string*

Defined in: [util.ts:431](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L431)

___

### createFakeFileValue

▸ **createFakeFileValue**(`id`: *string*, `name`: *string*, `url`: *string*, `type?`: *string*, `size?`: *number*): [*PropertyDefinitionSupportedFileType*](base_root_module_itemdefinition_propertydefinition_types_file.md#propertydefinitionsupportedfiletype)

A fake file value that you should not submit as it's an invalid value
you can use this to setup a placeholder of sorts

#### Parameters:

Name | Type |
:------ | :------ |
`id` | *string* |
`name` | *string* |
`url` | *string* |
`type?` | *string* |
`size?` | *number* |

**Returns:** [*PropertyDefinitionSupportedFileType*](base_root_module_itemdefinition_propertydefinition_types_file.md#propertydefinitionsupportedfiletype)

Defined in: [util.ts:494](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L494)

___

### createLocationValue

▸ **createLocationValue**(`txt`: *string*, `atxt`: *string*, `lat?`: *number*, `lng?`: *number*, `id?`: *string*): [*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)

Creates an location value to be used with prefills and setters

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`txt` | *string* |  |
`atxt` | *string* |  |
`lat?` | *number* |  |
`lng?` | *number* |  |
`id?` | *string* | non necessary if not planning to submit    |

**Returns:** [*IPropertyDefinitionSupportedLocationType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)

Defined in: [util.ts:475](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L475)

___

### createRealFileValue

▸ **createRealFileValue**(`id`: *string*, `file`: File, `objectURL`: *string*, `imageMetadataGeneratorInfo?`: { `height`: *number* ; `property`: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md) ; `width`: *number*  }): [*PropertyDefinitionSupportedFileType*](base_root_module_itemdefinition_propertydefinition_types_file.md#propertydefinitionsupportedfiletype)

Creates a real image value to prefill with that can be used to generate
values that can be submitted

#### Parameters:

Name | Type |
:------ | :------ |
`id` | *string* |
`file` | File |
`objectURL` | *string* |
`imageMetadataGeneratorInfo?` | *object* |
`imageMetadataGeneratorInfo.height` | *number* |
`imageMetadataGeneratorInfo.property` | [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md) |
`imageMetadataGeneratorInfo.width` | *number* |

**Returns:** [*PropertyDefinitionSupportedFileType*](base_root_module_itemdefinition_propertydefinition_types_file.md#propertydefinitionsupportedfiletype)

Defined in: [util.ts:513](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L513)

___

### createTimeValue

▸ **createTimeValue**(`value`: Date \| *string*): *string*

Creates a time value to be used with prefills and setters

#### Parameters:

Name | Type |
:------ | :------ |
`value` | Date \| *string* |

**Returns:** *string*

Defined in: [util.ts:447](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L447)

___

### createUnitValue

▸ **createUnitValue**(`value`: *number*, `unit`: *string*, `normalizedUnit`: *string*): [*IPropertyDefinitionSupportedUnitType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_unit.ipropertydefinitionsupportedunittype.md)

Creates an unit value to be used with prefills and setters

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *number* |
`unit` | *string* |
`normalizedUnit` | *string* |

**Returns:** [*IPropertyDefinitionSupportedUnitType*](../interfaces/base_root_module_itemdefinition_propertydefinition_types_unit.ipropertydefinitionsupportedunittype.md)

Defined in: [util.ts:457](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L457)

___

### delayedExecutionFn

▸ **delayedExecutionFn**(`fn`: *any*, `id`: *string*, `ms`: *number*): TimedExecutedFn

Delays the execution of a function by given milliseconds
ensure these do not stack together

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`fn` | *any* | the function in question   |
`id` | *string* | the id to use   |
`ms` | *number* | the milliseconds delay before submitting   |

**Returns:** TimedExecutedFn

a function without parameters

Defined in: [util.ts:41](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L41)

___

### escapeStringRegexp

▸ **escapeStringRegexp**(`str`: *string*): *string*

Escapes a string into a regex

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`str` | *string* | the string to escape   |

**Returns:** *string*

a string that is regex ready

Defined in: [util.ts:103](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L103)

___

### fileArrayURLAbsoluter

▸ **fileArrayURLAbsoluter**(`domain`: *string*, `containerHostnamePrefixes`: { [key: string]: *string*;  }, `files`: [*IGQLFile*](../interfaces/gql_querier.igqlfile.md)[], `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md), `id`: *string*, `version`: *string*, `containerId`: *string*, `include`: [*default*](../classes/base_root_module_itemdefinition_include.default.md), `property`: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md), `cacheable`: *boolean*): [*IGQLFile*](../interfaces/gql_querier.igqlfile.md)[]

Converts an array of files to its absolute url counterpart

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`domain` | *string* | the domain that is being used according to the env   |
`containerHostnamePrefixes` | *object* | the containers hostnames prefixes that allow to identify the url prefix to access a given container   |
`files` | [*IGQLFile*](../interfaces/gql_querier.igqlfile.md)[] | the array of files to convert   |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition this file is in and stored as, it is required even for prop extensions, because every stored value has an item definition attached to it   |
`id` | *string* | the id   |
`version` | *string* | the version   |
`containerId` | *string* | the container id this file was found to be in   |
`include` | [*default*](../classes/base_root_module_itemdefinition_include.default.md) | the include (or null)   |
`property` | [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md) | the property it came from   |
`cacheable` | *boolean* | whether the resulting urls should be cacheable   |

**Returns:** [*IGQLFile*](../interfaces/gql_querier.igqlfile.md)[]

a new array of files

Defined in: [util.ts:392](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L392)

___

### fileURLAbsoluter

▸ **fileURLAbsoluter**(`domain`: *string*, `containerHostnamePrefixes`: { [key: string]: *string*;  }, `file`: [*IGQLFile*](../interfaces/gql_querier.igqlfile.md), `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md), `id`: *string*, `version`: *string*, `containerId`: *string*, `include`: [*default*](../classes/base_root_module_itemdefinition_include.default.md), `property`: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md), `cacheable`: *boolean*): [*IGQLFile*](../interfaces/gql_querier.igqlfile.md)

Converts a file to its absolute URL counterpart

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`domain` | *string* | the domain that is being used according to the env   |
`containerHostnamePrefixes` | *object* | the containers hostnames prefixes that allow to identify the url prefix to access a given container   |
`file` | [*IGQLFile*](../interfaces/gql_querier.igqlfile.md) | the file to convert   |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition this file is in and stored as, it is required even for prop extensions, because every stored value has an item definition attached to it   |
`id` | *string* | the id   |
`version` | *string* | the version   |
`containerId` | *string* | the container id this file was found to be in   |
`include` | [*default*](../classes/base_root_module_itemdefinition_include.default.md) | the include (or null)   |
`property` | [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md) | the property it came from   |
`cacheable` | *boolean* | whether the resulting url should be cached   |

**Returns:** [*IGQLFile*](../interfaces/gql_querier.igqlfile.md)

a new IGQLFile but absolute

Defined in: [util.ts:318](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L318)

___

### formatDate

▸ **formatDate**(`locale`: *string*, `date`: *string*): *string*

#### Parameters:

Name | Type |
:------ | :------ |
`locale` | *string* |
`date` | *string* |

**Returns:** *string*

Defined in: [util.ts:275](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L275)

___

### formatDateTime

▸ **formatDateTime**(`locale`: *string*, `datetime`: *string*): *string*

#### Parameters:

Name | Type |
:------ | :------ |
`locale` | *string* |
`datetime` | *string* |

**Returns:** *string*

Defined in: [util.ts:285](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L285)

___

### formatTime

▸ **formatTime**(`locale`: *string*, `time`: *string*): *string*

#### Parameters:

Name | Type |
:------ | :------ |
`locale` | *string* |
`time` | *string* |

**Returns:** *string*

Defined in: [util.ts:280](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L280)

___

### getLocalizedDateFormat

▸ **getLocalizedDateFormat**(`locale`: *string*): *any*

#### Parameters:

Name | Type |
:------ | :------ |
`locale` | *string* |

**Returns:** *any*

Defined in: [util.ts:265](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L265)

___

### getLocalizedDateTimeFormat

▸ **getLocalizedDateTimeFormat**(`locale`: *string*): *string*

#### Parameters:

Name | Type |
:------ | :------ |
`locale` | *string* |

**Returns:** *string*

Defined in: [util.ts:271](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L271)

___

### getLocalizedTimeFormat

▸ **getLocalizedTimeFormat**(`locale`: *string*): *any*

#### Parameters:

Name | Type |
:------ | :------ |
`locale` | *string* |

**Returns:** *any*

Defined in: [util.ts:259](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L259)

___

### getNow

▸ **getNow**(): *string*

Provides now

**Returns:** *string*

Defined in: [util.ts:83](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L83)

___

### getTime

▸ **getTime**(): *string*

Provides time

**Returns:** *string*

Defined in: [util.ts:90](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L90)

___

### getToday

▸ **getToday**(): *string*

Provides today

**Returns:** *string*

Defined in: [util.ts:76](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L76)

___

### localeReplacer

▸ **localeReplacer**(`str`: *string*, ...`args`: *any*[]): *string*

Replaces a string to another for locale usage
eg. `"hello {0} world {1}"` with `["foo", "bar"]` become
`"hello foo world bar"`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`str` | *string* | the string   |
`...args` | *any*[] | the args to pass   |

**Returns:** *string*

a string

Defined in: [util.ts:216](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L216)

___

### localeReplacerToArray

▸ **localeReplacerToArray**(`str`: *string*, ...`args`: *any*[]): *any*[]

Replaces a string to an array of whatever it was sent
for locale usage
eg. `"hello {0} world {1}"` with `[<span>foo</span>, <span>bar</span>]` become
`["hello ",<span>foo</span>," world ",<span>bar</span>]`

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`str` | *string* | the string   |
`...args` | *any*[] | the args to pass   |

**Returns:** *any*[]

a an array

Defined in: [util.ts:236](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L236)

___

### mimeTypeToExtension

▸ **mimeTypeToExtension**(`str`: *string*): *any*

Converts a mime type to an extension using a known extension list

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`str` | *string* | the string that represents the mime type   |

**Returns:** *any*

an extension or txt if it doesn't know

Defined in: [util.ts:200](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L200)

___

### parseDate

▸ **parseDate**(`date`: *string*): Moment

#### Parameters:

Name | Type |
:------ | :------ |
`date` | *string* |

**Returns:** Moment

Defined in: [util.ts:290](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L290)

___

### parseDateTime

▸ **parseDateTime**(`datetime`: *string*): Moment

#### Parameters:

Name | Type |
:------ | :------ |
`datetime` | *string* |

**Returns:** Moment

Defined in: [util.ts:298](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L298)

___

### parseTime

▸ **parseTime**(`time`: *string*): Moment

#### Parameters:

Name | Type |
:------ | :------ |
`time` | *string* |

**Returns:** Moment

Defined in: [util.ts:294](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L294)

___

### processAccepts

▸ **processAccepts**(`accept`: *string*, `isExpectingImages?`: *boolean*): *string*

#### Parameters:

Name | Type |
:------ | :------ |
`accept` | *string* |
`isExpectingImages?` | *boolean* |

**Returns:** *string*

Defined in: [util.ts:178](https://github.com/onzag/itemize/blob/11a98dec/util.ts#L178)
