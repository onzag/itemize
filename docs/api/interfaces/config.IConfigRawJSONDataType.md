[@onzag/itemize](../README.md) / [Modules](../modules.md) / [config](../modules/config.md) / IConfigRawJSONDataType

# Interface: IConfigRawJSONDataType

[config](../modules/config.md).IConfigRawJSONDataType

The standard basic configuration structure

## Table of contents

### Properties

- [appName](config.IConfigRawJSONDataType.md#appname)
- [cacheableExtHostnames](config.IConfigRawJSONDataType.md#cacheableexthostnames)
- [containersHostnamePrefixes](config.IConfigRawJSONDataType.md#containershostnameprefixes)
- [containersRegionMappers](config.IConfigRawJSONDataType.md#containersregionmappers)
- [custom](config.IConfigRawJSONDataType.md#custom)
- [developmentHostname](config.IConfigRawJSONDataType.md#developmenthostname)
- [dictionaries](config.IConfigRawJSONDataType.md#dictionaries)
- [entry](config.IConfigRawJSONDataType.md#entry)
- [fallbackCountryCode](config.IConfigRawJSONDataType.md#fallbackcountrycode)
- [fallbackCurrency](config.IConfigRawJSONDataType.md#fallbackcurrency)
- [fallbackLanguage](config.IConfigRawJSONDataType.md#fallbacklanguage)
- [fontName](config.IConfigRawJSONDataType.md#fontname)
- [fontUrl](config.IConfigRawJSONDataType.md#fonturl)
- [manifest](config.IConfigRawJSONDataType.md#manifest)
- [productionHostname](config.IConfigRawJSONDataType.md#productionhostname)
- [roles](config.IConfigRawJSONDataType.md#roles)
- [rtlLanguages](config.IConfigRawJSONDataType.md#rtllanguages)
- [shared](config.IConfigRawJSONDataType.md#shared)
- [supportedLanguages](config.IConfigRawJSONDataType.md#supportedlanguages)

## Properties

### appName

• **appName**: `string`

The application name

#### Defined in

[config.ts:48](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L48)

___

### cacheableExtHostnames

• **cacheableExtHostnames**: `string`[]

The cacheable external hostnames, add hostnames here eg. fonts.googleapis.com to tell the service worker
that these hostnames should be cached

#### Defined in

[config.ts:85](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L85)

___

### containersHostnamePrefixes

• **containersHostnamePrefixes**: `Object`

the hostname prefixes for a given container id, as where the information is stored
must not contain http or https protocol
eg. myopenstackprovider.com/mycontainer/AUTH_123/ or whatever custom domain you have got

#### Index signature

▪ [containerId: `string`]: `string`

#### Defined in

[config.ts:127](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L127)

___

### containersRegionMappers

• **containersRegionMappers**: `Object`

Uploads info, maps countries to containers id
"*" asterisk represents a special match that will match all the non-matching
the value should be container id

#### Index signature

▪ [countries: `string`]: `string`

#### Defined in

[config.ts:119](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L119)

___

### custom

• `Optional` **custom**: `Object`

Special custom configuration

#### Index signature

▪ [customKey: `string`]: `any`

#### Defined in

[config.ts:133](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L133)

___

### developmentHostname

• **developmentHostname**: `string`

The hostname used in development mode, used to avoid SEO hijaking

#### Defined in

[config.ts:108](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L108)

___

### dictionaries

• **dictionaries**: `Object`

The dictionaries assigned to the given supported languages
you might specify only unregionalized versions, eg instead of en-GB en-US only en for english

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[config.ts:61](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L61)

___

### entry

• **entry**: `string`

The schema entry, usually schema/root

#### Defined in

[config.ts:44](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L44)

___

### fallbackCountryCode

• **fallbackCountryCode**: `string`

The country code the app fallbacks to if some error happens
also the default for development

#### Defined in

[config.ts:92](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L92)

___

### fallbackCurrency

• **fallbackCurrency**: `string`

The currency the app fallbacks to if some error happens
also the default for development

#### Defined in

[config.ts:102](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L102)

___

### fallbackLanguage

• **fallbackLanguage**: `string`

The language the app fallbacks to if some error happens
also the default for development

#### Defined in

[config.ts:97](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L97)

___

### fontName

• **fontName**: `string`

The font name to use

#### Defined in

[config.ts:80](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L80)

___

### fontUrl

• **fontUrl**: `string`

The font url to use

#### Defined in

[config.ts:76](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L76)

___

### manifest

• **manifest**: [`IConfigManifestType`](config.IConfigManifestType.md)

The web manifest configuration

#### Defined in

[config.ts:72](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L72)

___

### productionHostname

• **productionHostname**: `string`

The hostname used in production mode, used to avoid SEO hijacking

#### Defined in

[config.ts:112](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L112)

___

### roles

• **roles**: `string`[]

The supported user roles
ADMIN is an expected role for this

#### Defined in

[config.ts:68](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L68)

___

### rtlLanguages

• **rtlLanguages**: `string`[]

Of the supported languages, which ones are right to left

#### Defined in

[config.ts:56](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L56)

___

### shared

• `Optional` **shared**: `Object`

Shared custom information that is added to the standard config and sensitive config
but kept into the sensitive or standard file (eg. client side api keys)

#### Index signature

▪ [customKey: `string`]: `any`

#### Defined in

[config.ts:140](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L140)

___

### supportedLanguages

• **supportedLanguages**: `string`[]

The supported languages as an array of string

#### Defined in

[config.ts:52](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L52)
