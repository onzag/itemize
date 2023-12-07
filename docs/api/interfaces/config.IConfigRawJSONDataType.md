[@onzag/itemize](../README.md) / [Modules](../modules.md) / [config](../modules/config.md) / IConfigRawJSONDataType

# Interface: IConfigRawJSONDataType

[config](../modules/config.md).IConfigRawJSONDataType

The standard basic configuration structure

## Table of contents

### Properties

- [appName](config.IConfigRawJSONDataType.md#appname)
- [cacheableExtHostnames](config.IConfigRawJSONDataType.md#cacheableexthostnames)
- [cachedExtUrls](config.IConfigRawJSONDataType.md#cachedexturls)
- [cachedResources](config.IConfigRawJSONDataType.md#cachedresources)
- [containersHostnamePrefixes](config.IConfigRawJSONDataType.md#containershostnameprefixes)
- [containersRegionMappers](config.IConfigRawJSONDataType.md#containersregionmappers)
- [custom](config.IConfigRawJSONDataType.md#custom)
- [developmentHostname](config.IConfigRawJSONDataType.md#developmenthostname)
- [entry](config.IConfigRawJSONDataType.md#entry)
- [fallbackCountryCode](config.IConfigRawJSONDataType.md#fallbackcountrycode)
- [fallbackCurrency](config.IConfigRawJSONDataType.md#fallbackcurrency)
- [fallbackLanguage](config.IConfigRawJSONDataType.md#fallbacklanguage)
- [fontName](config.IConfigRawJSONDataType.md#fontname)
- [fontUrl](config.IConfigRawJSONDataType.md#fonturl)
- [mailDomain](config.IConfigRawJSONDataType.md#maildomain)
- [mailStorage](config.IConfigRawJSONDataType.md#mailstorage)
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

[config.ts:48](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L48)

___

### cacheableExtHostnames

• **cacheableExtHostnames**: `string`[]

The cacheable external hostnames, add hostnames here eg. fonts.googleapis.com to tell the service worker
that these hostnames should be cached

#### Defined in

[config.ts:88](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L88)

___

### cachedExtUrls

• **cachedExtUrls**: `string`[]

For resources that are to be cached in the service worker
that are external

#### Defined in

[config.ts:79](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L79)

___

### cachedResources

• **cachedResources**: `string`[]

For resources that are to be cached in the service worker
in addition of the standard ones

#### Defined in

[config.ts:74](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L74)

___

### containersHostnamePrefixes

• **containersHostnamePrefixes**: `Object`

the hostname prefixes for a given container id, as where the information is stored
must not contain http or https protocol
eg. myopenstackprovider.com/mycontainer/AUTH_123/ or whatever custom domain you have got

#### Index signature

▪ [containerId: `string`]: `string`

#### Defined in

[config.ts:141](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L141)

___

### containersRegionMappers

• **containersRegionMappers**: `Object`

Uploads info, maps countries to containers id
"*" asterisk represents a special match that will match all the non-matching
the value should be container id

#### Index signature

▪ [countries: `string`]: `string`

#### Defined in

[config.ts:133](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L133)

___

### custom

• `Optional` **custom**: `Object`

Special custom configuration

#### Index signature

▪ [customKey: `string`]: `any`

#### Defined in

[config.ts:147](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L147)

___

### developmentHostname

• **developmentHostname**: `string`

The hostname used in development mode, used to avoid SEO hijaking

#### Defined in

[config.ts:111](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L111)

___

### entry

• **entry**: `string`

The schema entry, usually schema/root

#### Defined in

[config.ts:44](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L44)

___

### fallbackCountryCode

• **fallbackCountryCode**: `string`

The country code the app fallbacks to if some error happens
also the default for development

#### Defined in

[config.ts:95](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L95)

___

### fallbackCurrency

• **fallbackCurrency**: `string`

The currency the app fallbacks to if some error happens
also the default for development

#### Defined in

[config.ts:105](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L105)

___

### fallbackLanguage

• **fallbackLanguage**: `string`

The language the app fallbacks to if some error happens
also the default for development

#### Defined in

[config.ts:100](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L100)

___

### fontName

• **fontName**: `string`

The font name to use

#### Defined in

[config.ts:83](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L83)

___

### fontUrl

• **fontUrl**: `string`

The font url to use

#### Defined in

[config.ts:69](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L69)

___

### mailDomain

• **mailDomain**: `string`

The mail domain that is used when sending emails from

#### Defined in

[config.ts:120](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L120)

___

### mailStorage

• **mailStorage**: `string`

The mail storage item definition path
it must pass some criteria in order to be valid
as emails get added there

#### Defined in

[config.ts:126](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L126)

___

### manifest

• **manifest**: [`IConfigManifestType`](config.IConfigManifestType.md)

The web manifest configuration

#### Defined in

[config.ts:65](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L65)

___

### productionHostname

• **productionHostname**: `string`

The hostname used in production mode, used to avoid SEO hijacking

#### Defined in

[config.ts:115](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L115)

___

### roles

• **roles**: `string`[]

The supported user roles
ADMIN is an expected role for this

#### Defined in

[config.ts:61](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L61)

___

### rtlLanguages

• **rtlLanguages**: `string`[]

Of the supported languages, which ones are right to left

#### Defined in

[config.ts:56](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L56)

___

### shared

• `Optional` **shared**: `Object`

Shared custom information that is added to the standard config and sensitive config
but kept into the sensitive or standard file (eg. client side api keys)

#### Index signature

▪ [customKey: `string`]: `any`

#### Defined in

[config.ts:154](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L154)

___

### supportedLanguages

• **supportedLanguages**: `string`[]

The supported languages as an array of string

#### Defined in

[config.ts:52](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L52)
