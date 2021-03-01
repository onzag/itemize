[](../README.md) / [Exports](../modules.md) / [config](../modules/config.md) / ISensitiveConfigRawJSONDataType

# Interface: ISensitiveConfigRawJSONDataType

[config](../modules/config.md).ISensitiveConfigRawJSONDataType

The sensitive information

## Table of contents

### Properties

- [containers](config.isensitiveconfigrawjsondatatype.md#containers)
- [currencyFactors](config.isensitiveconfigrawjsondatatype.md#currencyfactors)
- [custom](config.isensitiveconfigrawjsondatatype.md#custom)
- [defaultContainerID](config.isensitiveconfigrawjsondatatype.md#defaultcontainerid)
- [devKey](config.isensitiveconfigrawjsondatatype.md#devkey)
- [jwtKey](config.isensitiveconfigrawjsondatatype.md#jwtkey)
- [localContainer](config.isensitiveconfigrawjsondatatype.md#localcontainer)
- [locationSearch](config.isensitiveconfigrawjsondatatype.md#locationsearch)
- [mail](config.isensitiveconfigrawjsondatatype.md#mail)
- [mailDomain](config.isensitiveconfigrawjsondatatype.md#maildomain)
- [mailStorage](config.isensitiveconfigrawjsondatatype.md#mailstorage)
- [secondaryJwtKey](config.isensitiveconfigrawjsondatatype.md#secondaryjwtkey)
- [seoContainerID](config.isensitiveconfigrawjsondatatype.md#seocontainerid)
- [userLocalization](config.isensitiveconfigrawjsondatatype.md#userlocalization)

## Properties

### containers

• **containers**: *object*

The containers, they should match the previously given
containers id

#### Type declaration:

Defined in: [config.ts:239](https://github.com/onzag/itemize/blob/28218320/config.ts#L239)

___

### currencyFactors

• **currencyFactors**: *any*

the currency layer access key,
can be null, currency type won't work

Defined in: [config.ts:216](https://github.com/onzag/itemize/blob/28218320/config.ts#L216)

___

### custom

• `Optional` **custom**: *object*

Custom information added to the sensitive config

#### Type declaration:

Defined in: [config.ts:276](https://github.com/onzag/itemize/blob/28218320/config.ts#L276)

___

### defaultContainerID

• **defaultContainerID**: *string*

The default container id used when required, eg. creating an admin

Defined in: [config.ts:252](https://github.com/onzag/itemize/blob/28218320/config.ts#L252)

___

### devKey

• **devKey**: *string*

A development key, allows to use development files in its full form on the production
interface

Defined in: [config.ts:272](https://github.com/onzag/itemize/blob/28218320/config.ts#L272)

___

### jwtKey

• **jwtKey**: *string*

a json web token key to use, itemize uses JWT and as such it can be trusted
to call other external APIs

Defined in: [config.ts:261](https://github.com/onzag/itemize/blob/28218320/config.ts#L261)

___

### localContainer

• **localContainer**: *string*

A local container (if any)

Defined in: [config.ts:248](https://github.com/onzag/itemize/blob/28218320/config.ts#L248)

___

### locationSearch

• **locationSearch**: *any*

The here maps api key, can be null, address search won't work

Defined in: [config.ts:220](https://github.com/onzag/itemize/blob/28218320/config.ts#L220)

___

### mail

• **mail**: *any*

The mail service information, api key what not

Defined in: [config.ts:224](https://github.com/onzag/itemize/blob/28218320/config.ts#L224)

___

### mailDomain

• **mailDomain**: *string*

The mail domain that is used when sending emails from

Defined in: [config.ts:228](https://github.com/onzag/itemize/blob/28218320/config.ts#L228)

___

### mailStorage

• **mailStorage**: *string*

The mail storage item definition path
it must pass some criteria in order to be valid
as emails get added there

Defined in: [config.ts:234](https://github.com/onzag/itemize/blob/28218320/config.ts#L234)

___

### secondaryJwtKey

• **secondaryJwtKey**: *string*

A secondary json web token key to use, for tasks where these tokens might be
used on less secure third party tasks and are not used in more critical tasks
eg. for email services

Defined in: [config.ts:267](https://github.com/onzag/itemize/blob/28218320/config.ts#L267)

___

### seoContainerID

• **seoContainerID**: *string*

The seo container id used when storing sitemaps

Defined in: [config.ts:256](https://github.com/onzag/itemize/blob/28218320/config.ts#L256)

___

### userLocalization

• **userLocalization**: *any*

Used for localization services to localize users

Defined in: [config.ts:211](https://github.com/onzag/itemize/blob/28218320/config.ts#L211)
