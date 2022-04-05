[@onzag/itemize](../README.md) / [Modules](../modules.md) / [config](../modules/config.md) / ISensitiveConfigRawJSONDataType

# Interface: ISensitiveConfigRawJSONDataType

[config](../modules/config.md).ISensitiveConfigRawJSONDataType

The sensitive information

## Table of contents

### Properties

- [containers](config.ISensitiveConfigRawJSONDataType.md#containers)
- [currencyFactors](config.ISensitiveConfigRawJSONDataType.md#currencyfactors)
- [custom](config.ISensitiveConfigRawJSONDataType.md#custom)
- [defaultContainerID](config.ISensitiveConfigRawJSONDataType.md#defaultcontainerid)
- [devKey](config.ISensitiveConfigRawJSONDataType.md#devkey)
- [jwtKey](config.ISensitiveConfigRawJSONDataType.md#jwtkey)
- [localContainer](config.ISensitiveConfigRawJSONDataType.md#localcontainer)
- [locationSearch](config.ISensitiveConfigRawJSONDataType.md#locationsearch)
- [mail](config.ISensitiveConfigRawJSONDataType.md#mail)
- [mailDomain](config.ISensitiveConfigRawJSONDataType.md#maildomain)
- [mailStorage](config.ISensitiveConfigRawJSONDataType.md#mailstorage)
- [payment](config.ISensitiveConfigRawJSONDataType.md#payment)
- [phone](config.ISensitiveConfigRawJSONDataType.md#phone)
- [secondaryJwtKey](config.ISensitiveConfigRawJSONDataType.md#secondaryjwtkey)
- [seoContainerID](config.ISensitiveConfigRawJSONDataType.md#seocontainerid)
- [shared](config.ISensitiveConfigRawJSONDataType.md#shared)
- [userLocalization](config.ISensitiveConfigRawJSONDataType.md#userlocalization)

## Properties

### containers

• **containers**: `Object`

The containers, they should match the previously given
containers id

#### Index signature

▪ [containerId: `string`]: { `config`: `any` ; `type`: `string`  }

#### Defined in

[config.ts:254](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L254)

___

### currencyFactors

• **currencyFactors**: `any`

the currency layer access key,
can be null, currency type won't work

#### Defined in

[config.ts:223](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L223)

___

### custom

• `Optional` **custom**: `Object`

Custom information added to the sensitive config

#### Index signature

▪ [customKey: `string`]: `any`

#### Defined in

[config.ts:291](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L291)

___

### defaultContainerID

• **defaultContainerID**: `string`

The default container id used when required, eg. creating an admin

#### Defined in

[config.ts:267](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L267)

___

### devKey

• **devKey**: `string`

A development key, allows to use development files in its full form on the production
interface

#### Defined in

[config.ts:287](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L287)

___

### jwtKey

• **jwtKey**: `string`

a json web token key to use, itemize uses JWT and as such it can be trusted
to call other external APIs

#### Defined in

[config.ts:276](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L276)

___

### localContainer

• **localContainer**: `string`

A local container (if any)

#### Defined in

[config.ts:263](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L263)

___

### locationSearch

• **locationSearch**: `any`

The mapping search api key, can be null, address search won't work

#### Defined in

[config.ts:227](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L227)

___

### mail

• **mail**: `any`

The mail service information, api key what not

#### Defined in

[config.ts:235](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L235)

___

### mailDomain

• **mailDomain**: `string`

The mail domain that is used when sending emails from

#### Defined in

[config.ts:243](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L243)

___

### mailStorage

• **mailStorage**: `string`

The mail storage item definition path
it must pass some criteria in order to be valid
as emails get added there

#### Defined in

[config.ts:249](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L249)

___

### payment

• **payment**: `any`

The payment configuration

#### Defined in

[config.ts:231](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L231)

___

### phone

• **phone**: `any`

The phone service information, api key what not

#### Defined in

[config.ts:239](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L239)

___

### secondaryJwtKey

• **secondaryJwtKey**: `string`

A secondary json web token key to use, for tasks where these tokens might be
used on less secure third party tasks and are not used in more critical tasks
eg. for email services

#### Defined in

[config.ts:282](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L282)

___

### seoContainerID

• **seoContainerID**: `string`

The seo container id used when storing sitemaps

#### Defined in

[config.ts:271](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L271)

___

### shared

• `Optional` **shared**: `Object`

Shared custom information that is added to the standard config and sensitive config
but kept into the sensitive or standard file (eg. client side api keys)

#### Index signature

▪ [customKey: `string`]: `any`

#### Defined in

[config.ts:298](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L298)

___

### userLocalization

• **userLocalization**: `any`

Used for localization services to localize users

#### Defined in

[config.ts:218](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L218)
