[](../README.md) / [Exports](../modules.md) / [server/services/base/MailProvider](../modules/server_services_base_mailprovider.md) / IUnsubscribeURL

# Interface: IUnsubscribeURL

[server/services/base/MailProvider](../modules/server_services_base_mailprovider.md).IUnsubscribeURL

The unsubscribe url form

## Table of contents

### Properties

- [noRedirected](server_services_base_mailprovider.iunsubscribeurl.md#noredirected)
- [redirected](server_services_base_mailprovider.iunsubscribeurl.md#redirected)

## Properties

### noRedirected

• **noRedirected**: *string*

A non-redirected url, that simply will give a status
of 200 if succeeded

Defined in: [server/services/base/MailProvider.ts:33](https://github.com/onzag/itemize/blob/0569bdf2/server/services/base/MailProvider.ts#L33)

___

### redirected

• **redirected**: *string*

A redirected url that redirects to the APP to show
a human readable message

Defined in: [server/services/base/MailProvider.ts:28](https://github.com/onzag/itemize/blob/0569bdf2/server/services/base/MailProvider.ts#L28)
