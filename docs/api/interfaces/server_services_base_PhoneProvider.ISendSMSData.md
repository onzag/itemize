[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services/base/PhoneProvider](../modules/server_services_base_PhoneProvider.md) / ISendSMSData

# Interface: ISendSMSData

[server/services/base/PhoneProvider](../modules/server_services_base_PhoneProvider.md).ISendSMSData

The shape of an sms that is being wanted to be sent

## Table of contents

### Properties

- [text](server_services_base_PhoneProvider.ISendSMSData.md#text)
- [to](server_services_base_PhoneProvider.ISendSMSData.md#to)

## Properties

### text

• **text**: `string`

The plain text content

#### Defined in

[server/services/base/PhoneProvider.ts:31](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/PhoneProvider.ts#L31)

___

### to

• **to**: `string` \| `string`[]

A single phone or a list of phones that are supposed
to be sent to

#### Defined in

[server/services/base/PhoneProvider.ts:27](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/PhoneProvider.ts#L27)
