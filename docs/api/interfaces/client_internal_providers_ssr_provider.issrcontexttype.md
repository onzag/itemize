[](../README.md) / [Exports](../modules.md) / [client/internal/providers/ssr-provider](../modules/client_internal_providers_ssr_provider.md) / ISSRContextType

# Interface: ISSRContextType

[client/internal/providers/ssr-provider](../modules/client_internal_providers_ssr_provider.md).ISSRContextType

The SSR context itself on all its might

## Table of contents

### Properties

- [currencyFactors](client_internal_providers_ssr_provider.issrcontexttype.md#currencyfactors)
- [queries](client_internal_providers_ssr_provider.issrcontexttype.md#queries)
- [resources](client_internal_providers_ssr_provider.issrcontexttype.md#resources)
- [title](client_internal_providers_ssr_provider.issrcontexttype.md#title)
- [user](client_internal_providers_ssr_provider.issrcontexttype.md#user)

## Properties

### currencyFactors

• **currencyFactors**: *object*

Currency factors as they are used in the SSR mode,
this will become the initial currency factors, if
there's no SSR context then it should fetch

#### Type declaration:

Defined in: [client/internal/providers/ssr-provider.tsx:54](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/providers/ssr-provider.tsx#L54)

___

### queries

• **queries**: [*ISSRCollectedQueryType*](client_internal_providers_ssr_provider.issrcollectedquerytype.md)[]

Collected queries

Defined in: [client/internal/providers/ssr-provider.tsx:60](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/providers/ssr-provider.tsx#L60)

___

### resources

• **resources**: [*ISSRCollectedResourcesType*](client_internal_providers_ssr_provider.issrcollectedresourcestype.md)

Collected resources map

Defined in: [client/internal/providers/ssr-provider.tsx:64](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/providers/ssr-provider.tsx#L64)

___

### title

• **title**: *string*

The title of the page, will be the same as the document.title in the client side
but the server has no access to the dom, so to keep things consistent it's here

Defined in: [client/internal/providers/ssr-provider.tsx:90](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/providers/ssr-provider.tsx#L90)

___

### user

• **user**: *object*

The user we refer about

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`id` | *string* | id of the user   |
`role` | *string* | Role of the user   |
`token` | *string* | Token of the user, now due to security considerations and since this is equal to the cookie, the cookie value IN_COOKIE will be used in the client side, different for what is used in the server side, however the output should be equal anyway, as anyone who consumes this should read the cookie value   |

Defined in: [client/internal/providers/ssr-provider.tsx:68](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/providers/ssr-provider.tsx#L68)
