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
- [localContainer](config.ISensitiveConfigRawJSONDataType.md#localcontainer)
- [locationSearch](config.ISensitiveConfigRawJSONDataType.md#locationsearch)
- [logging](config.ISensitiveConfigRawJSONDataType.md#logging)
- [mail](config.ISensitiveConfigRawJSONDataType.md#mail)
- [payment](config.ISensitiveConfigRawJSONDataType.md#payment)
- [phone](config.ISensitiveConfigRawJSONDataType.md#phone)
- [shared](config.ISensitiveConfigRawJSONDataType.md#shared)
- [userLocalization](config.ISensitiveConfigRawJSONDataType.md#userlocalization)
- [ussd](config.ISensitiveConfigRawJSONDataType.md#ussd)

## Properties

### containers

• **containers**: `Object`

The containers, they should match the previously given
containers id

#### Index signature

▪ [containerId: `string`]: \{ `config`: `any` ; `type`: `string`  }

#### Defined in

[config.ts:266](https://github.com/onzag/itemize/blob/73e0c39e/config.ts#L266)

___

### currencyFactors

• **currencyFactors**: `any`

the currency layer access key,
can be null, currency type won't work

#### Defined in

[config.ts:237](https://github.com/onzag/itemize/blob/73e0c39e/config.ts#L237)

___

### custom

• `Optional` **custom**: `Object`

Custom information added to the sensitive config

#### Index signature

▪ [customKey: `string`]: `any`

#### Defined in

[config.ts:288](https://github.com/onzag/itemize/blob/73e0c39e/config.ts#L288)

___

### defaultContainerID

• **defaultContainerID**: `string`

The default container id used when required, eg. creating an admin

#### Defined in

[config.ts:279](https://github.com/onzag/itemize/blob/73e0c39e/config.ts#L279)

___

### devKey

• **devKey**: `string`

A development key, allows to use development files in its full form on the production
interface

#### Defined in

[config.ts:284](https://github.com/onzag/itemize/blob/73e0c39e/config.ts#L284)

___

### localContainer

• **localContainer**: `string`

A local container (if any)

#### Defined in

[config.ts:275](https://github.com/onzag/itemize/blob/73e0c39e/config.ts#L275)

___

### locationSearch

• **locationSearch**: `any`

The mapping search api key, can be null, address search won't work

#### Defined in

[config.ts:241](https://github.com/onzag/itemize/blob/73e0c39e/config.ts#L241)

___

### logging

• **logging**: `any`

The logging service information

#### Defined in

[config.ts:261](https://github.com/onzag/itemize/blob/73e0c39e/config.ts#L261)

___

### mail

• **mail**: `any`

The mail service information, api key what not

#### Defined in

[config.ts:249](https://github.com/onzag/itemize/blob/73e0c39e/config.ts#L249)

___

### payment

• **payment**: `any`

The payment configuration

#### Defined in

[config.ts:245](https://github.com/onzag/itemize/blob/73e0c39e/config.ts#L245)

___

### phone

• **phone**: `any`

The phone service information, api key what not

#### Defined in

[config.ts:253](https://github.com/onzag/itemize/blob/73e0c39e/config.ts#L253)

___

### shared

• `Optional` **shared**: `Object`

Shared custom information that is added to the standard config and sensitive config
but kept into the sensitive or standard file (eg. client side api keys)

#### Index signature

▪ [customKey: `string`]: `any`

#### Defined in

[config.ts:295](https://github.com/onzag/itemize/blob/73e0c39e/config.ts#L295)

___

### userLocalization

• **userLocalization**: `any`

Used for localization services to localize users

#### Defined in

[config.ts:232](https://github.com/onzag/itemize/blob/73e0c39e/config.ts#L232)

___

### ussd

• **ussd**: `any`

For ussd usage

#### Defined in

[config.ts:257](https://github.com/onzag/itemize/blob/73e0c39e/config.ts#L257)
