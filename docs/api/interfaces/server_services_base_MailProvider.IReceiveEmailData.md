[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services/base/MailProvider](../modules/server_services_base_MailProvider.md) / IReceiveEmailData

# Interface: IReceiveEmailData

[server/services/base/MailProvider](../modules/server_services_base_MailProvider.md).IReceiveEmailData

This interface represents how an email is
received

## Table of contents

### Properties

- [attachments](server_services_base_MailProvider.IReceiveEmailData.md#attachments)
- [contentIdMap](server_services_base_MailProvider.IReceiveEmailData.md#contentidmap)
- [from](server_services_base_MailProvider.IReceiveEmailData.md#from)
- [html](server_services_base_MailProvider.IReceiveEmailData.md#html)
- [id](server_services_base_MailProvider.IReceiveEmailData.md#id)
- [language](server_services_base_MailProvider.IReceiveEmailData.md#language)
- [metadata](server_services_base_MailProvider.IReceiveEmailData.md#metadata)
- [references](server_services_base_MailProvider.IReceiveEmailData.md#references)
- [replyOf](server_services_base_MailProvider.IReceiveEmailData.md#replyof)
- [spam](server_services_base_MailProvider.IReceiveEmailData.md#spam)
- [subject](server_services_base_MailProvider.IReceiveEmailData.md#subject)
- [timestamp](server_services_base_MailProvider.IReceiveEmailData.md#timestamp)
- [to](server_services_base_MailProvider.IReceiveEmailData.md#to)

## Properties

### attachments

• **attachments**: [`PropertyDefinitionSupportedFilesType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype)

These attachments "MUST" contain some form
of read stream in the source in order for it to work
properly

#### Defined in

[server/services/base/MailProvider.ts:215](https://github.com/onzag/itemize/blob/f2db74a5/server/services/base/MailProvider.ts#L215)

___

### contentIdMap

• `Optional` **contentIdMap**: `Object`

The content id map that maps the ids in the cid:xxxx form
to the id of the attachment

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[server/services/base/MailProvider.ts:220](https://github.com/onzag/itemize/blob/f2db74a5/server/services/base/MailProvider.ts#L220)

___

### from

• **from**: `string`

Who sent the email

#### Defined in

[server/services/base/MailProvider.ts:182](https://github.com/onzag/itemize/blob/f2db74a5/server/services/base/MailProvider.ts#L182)

___

### html

• **html**: `string`

The html content

#### Defined in

[server/services/base/MailProvider.ts:197](https://github.com/onzag/itemize/blob/f2db74a5/server/services/base/MailProvider.ts#L197)

___

### id

• `Optional` **id**: `string`

A custom id for the email received that should be unique
for this email

if you don't provide one, a random one will be generated for you

Please ensure that it is in the following format
somevaliduuid@externalsite.com

#### Defined in

[server/services/base/MailProvider.ts:160](https://github.com/onzag/itemize/blob/f2db74a5/server/services/base/MailProvider.ts#L160)

___

### language

• `Optional` **language**: `string`

The language the email is written in, please provide one if known
as the emails need to be indexed in a specific supported language

#### Defined in

[server/services/base/MailProvider.ts:202](https://github.com/onzag/itemize/blob/f2db74a5/server/services/base/MailProvider.ts#L202)

___

### metadata

• `Optional` **metadata**: `any`

Arbitrary metadata

should be a parseble json object

#### Defined in

[server/services/base/MailProvider.ts:208](https://github.com/onzag/itemize/blob/f2db74a5/server/services/base/MailProvider.ts#L208)

___

### references

• `Optional` **references**: `string`[]

The mail references header, without any of the rfc stuff
for example <stuff@cat.com> and <stuff2@cat.com>
should be an array of
["stuff@cat.com", "stuff2.cat.com"]

#### Defined in

[server/services/base/MailProvider.ts:168](https://github.com/onzag/itemize/blob/f2db74a5/server/services/base/MailProvider.ts#L168)

___

### replyOf

• `Optional` **replyOf**: `string`

The In-Reply-To target that was used, without any of the
rfc stuff, for example, "mail@cat.com"

#### Defined in

[server/services/base/MailProvider.ts:231](https://github.com/onzag/itemize/blob/f2db74a5/server/services/base/MailProvider.ts#L231)

___

### spam

• `Optional` **spam**: `boolean`

Whether to consider the email spam

#### Defined in

[server/services/base/MailProvider.ts:225](https://github.com/onzag/itemize/blob/f2db74a5/server/services/base/MailProvider.ts#L225)

___

### subject

• **subject**: `string`

The subject of the email

#### Defined in

[server/services/base/MailProvider.ts:193](https://github.com/onzag/itemize/blob/f2db74a5/server/services/base/MailProvider.ts#L193)

___

### timestamp

• `Optional` **timestamp**: `string`

A timestamp to specify when it was
sent by the email client, note that this will not
affect ordering nor the created_at attribute as this
is considered a non-trusted attribute, it's there simply
for informative purposes

#### Defined in

[server/services/base/MailProvider.ts:177](https://github.com/onzag/itemize/blob/f2db74a5/server/services/base/MailProvider.ts#L177)

___

### to

• **to**: `string`[]

Who is expected to receive the email, these should be
abitrary emails, if the email is detected to be a local email
it will be resolved into that user given the user has external emails
enabled

#### Defined in

[server/services/base/MailProvider.ts:189](https://github.com/onzag/itemize/blob/f2db74a5/server/services/base/MailProvider.ts#L189)
