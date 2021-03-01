[](../README.md) / [Exports](../modules.md) / [server/services/base/MailProvider](../modules/server_services_base_mailprovider.md) / ISendEmailData

# Interface: ISendEmailData

[server/services/base/MailProvider](../modules/server_services_base_mailprovider.md).ISendEmailData

The shape of an email that is being wanted to be sent
TODO attachments

## Table of contents

### Properties

- [from](server_services_base_mailprovider.isendemaildata.md#from)
- [html](server_services_base_mailprovider.isendemaildata.md#html)
- [subject](server_services_base_mailprovider.isendemaildata.md#subject)
- [text](server_services_base_mailprovider.isendemaildata.md#text)
- [to](server_services_base_mailprovider.isendemaildata.md#to)
- [unsubscribeMailto](server_services_base_mailprovider.isendemaildata.md#unsubscribemailto)
- [unsubscribeURLs](server_services_base_mailprovider.isendemaildata.md#unsubscribeurls)

## Properties

### from

• **from**: *string*

This is the from line in the shape of
username <name@domain.com> that wants to specify
as the user

Defined in: [server/services/base/MailProvider.ts:46](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/base/MailProvider.ts#L46)

___

### html

• `Optional` **html**: *string*

The html content

Defined in: [server/services/base/MailProvider.ts:63](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/base/MailProvider.ts#L63)

___

### subject

• **subject**: *string*

The subject attribute

Defined in: [server/services/base/MailProvider.ts:55](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/base/MailProvider.ts#L55)

___

### text

• `Optional` **text**: *string*

The plain text content

Defined in: [server/services/base/MailProvider.ts:59](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/base/MailProvider.ts#L59)

___

### to

• **to**: *string* \| *string*[]

A single email or a list of emails that are supposed
to be sent to

Defined in: [server/services/base/MailProvider.ts:51](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/base/MailProvider.ts#L51)

___

### unsubscribeMailto

• **unsubscribeMailto**: *string*

if provided this represents a mailto protocol
that can be used for the List-Unsubscribe header
and it is fairly generic

Defined in: [server/services/base/MailProvider.ts:69](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/base/MailProvider.ts#L69)

___

### unsubscribeURLs

• **unsubscribeURLs**: *object*

Unsubscribe urls are email specific and they can
also be used for the List-Unsubscribe header
however the mailto version should be preferred
over this one

#### Type declaration:

Defined in: [server/services/base/MailProvider.ts:76](https://github.com/onzag/itemize/blob/5fcde7cf/server/services/base/MailProvider.ts#L76)
