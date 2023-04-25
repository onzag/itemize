[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services/base/MailProvider](../modules/server_services_base_MailProvider.md) / ISendEmailData

# Interface: ISendEmailData

[server/services/base/MailProvider](../modules/server_services_base_MailProvider.md).ISendEmailData

The shape of an email that is being wanted to be sent

## Table of contents

### Properties

- [attachments](server_services_base_MailProvider.ISendEmailData.md#attachments)
- [contentIdMap](server_services_base_MailProvider.ISendEmailData.md#contentidmap)
- [from](server_services_base_MailProvider.ISendEmailData.md#from)
- [fromForwarded](server_services_base_MailProvider.ISendEmailData.md#fromforwarded)
- [html](server_services_base_MailProvider.ISendEmailData.md#html)
- [id](server_services_base_MailProvider.ISendEmailData.md#id)
- [replyOf](server_services_base_MailProvider.ISendEmailData.md#replyof)
- [subject](server_services_base_MailProvider.ISendEmailData.md#subject)
- [text](server_services_base_MailProvider.ISendEmailData.md#text)
- [to](server_services_base_MailProvider.ISendEmailData.md#to)
- [unsubscribeMailto](server_services_base_MailProvider.ISendEmailData.md#unsubscribemailto)
- [unsubscribeURLs](server_services_base_MailProvider.ISendEmailData.md#unsubscribeurls)

## Properties

### attachments

• `Optional` **attachments**: [`PropertyDefinitionSupportedFilesType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype)

Array of attachments to be added

These attachments must contain some form of read
stream in order for them to work properly

#### Defined in

[server/services/base/MailProvider.ts:119](https://github.com/onzag/itemize/blob/f2db74a5/server/services/base/MailProvider.ts#L119)

___

### contentIdMap

• `Optional` **contentIdMap**: `Object`

The content id map that maps the ids in the cid:xxxx form
to the id of the attachment id

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[server/services/base/MailProvider.ts:124](https://github.com/onzag/itemize/blob/f2db74a5/server/services/base/MailProvider.ts#L124)

___

### from

• **from**: `string`

This is the from line in the shape of
username <name@domain.com> that wants to specify
as the user

#### Defined in

[server/services/base/MailProvider.ts:85](https://github.com/onzag/itemize/blob/f2db74a5/server/services/base/MailProvider.ts#L85)

___

### fromForwarded

• `Optional` **fromForwarded**: `string`

The sender, original sender's email, if the email was forwarded

also comes in the form of username <name@domain.com>

you may use this field to set the reply-to header

#### Defined in

[server/services/base/MailProvider.ts:93](https://github.com/onzag/itemize/blob/f2db74a5/server/services/base/MailProvider.ts#L93)

___

### html

• `Optional` **html**: `string`

The html content

#### Defined in

[server/services/base/MailProvider.ts:112](https://github.com/onzag/itemize/blob/f2db74a5/server/services/base/MailProvider.ts#L112)

___

### id

• `Optional` **id**: `string`

the universal unique identifier for this email

allows for reply tracking

Please ensure that it is in the following format
somevaliduuid@yoursite.com

#### Defined in

[server/services/base/MailProvider.ts:78](https://github.com/onzag/itemize/blob/f2db74a5/server/services/base/MailProvider.ts#L78)

___

### replyOf

• `Optional` **replyOf**: [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

The message that it was a reply for

#### Defined in

[server/services/base/MailProvider.ts:143](https://github.com/onzag/itemize/blob/f2db74a5/server/services/base/MailProvider.ts#L143)

___

### subject

• **subject**: `string`

The subject attribute

#### Defined in

[server/services/base/MailProvider.ts:104](https://github.com/onzag/itemize/blob/f2db74a5/server/services/base/MailProvider.ts#L104)

___

### text

• `Optional` **text**: `string`

The plain text content

#### Defined in

[server/services/base/MailProvider.ts:108](https://github.com/onzag/itemize/blob/f2db74a5/server/services/base/MailProvider.ts#L108)

___

### to

• **to**: `string` \| `string`[]

A single email or a list of emails that are supposed
to be sent to

also allows the form username <name@domain.com>

#### Defined in

[server/services/base/MailProvider.ts:100](https://github.com/onzag/itemize/blob/f2db74a5/server/services/base/MailProvider.ts#L100)

___

### unsubscribeMailto

• `Optional` **unsubscribeMailto**: `string`

if provided this represents a mailto protocol
that can be used for the List-Unsubscribe header
and it is fairly generic

#### Defined in

[server/services/base/MailProvider.ts:130](https://github.com/onzag/itemize/blob/f2db74a5/server/services/base/MailProvider.ts#L130)

___

### unsubscribeURLs

• `Optional` **unsubscribeURLs**: `Object`

Unsubscribe urls are email specific and they can
also be used for the List-Unsubscribe header
however the mailto version should be preferred
over this one

#### Index signature

▪ [email: `string`]: [`IUnsubscribeURL`](server_services_base_MailProvider.IUnsubscribeURL.md)

#### Defined in

[server/services/base/MailProvider.ts:137](https://github.com/onzag/itemize/blob/f2db74a5/server/services/base/MailProvider.ts#L137)
