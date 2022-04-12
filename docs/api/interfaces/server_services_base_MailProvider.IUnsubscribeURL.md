[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services/base/MailProvider](../modules/server_services_base_MailProvider.md) / IUnsubscribeURL

# Interface: IUnsubscribeURL

[server/services/base/MailProvider](../modules/server_services_base_MailProvider.md).IUnsubscribeURL

The unsubscribe url form

## Table of contents

### Properties

- [noRedirected](server_services_base_MailProvider.IUnsubscribeURL.md#noredirected)
- [redirected](server_services_base_MailProvider.IUnsubscribeURL.md#redirected)

## Properties

### noRedirected

• **noRedirected**: `string`

A non-redirected url, that simply will give a status
of 200 if succeeded

#### Defined in

[server/services/base/MailProvider.ts:33](https://github.com/onzag/itemize/blob/5c2808d3/server/services/base/MailProvider.ts#L33)

___

### redirected

• **redirected**: `string`

A redirected url that redirects to the APP to show
a human readable message

#### Defined in

[server/services/base/MailProvider.ts:28](https://github.com/onzag/itemize/blob/5c2808d3/server/services/base/MailProvider.ts#L28)