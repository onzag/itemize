[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/providers/ssr-provider](../modules/client_internal_providers_ssr_provider.md) / ISSRContextType

# Interface: ISSRContextType

[client/internal/providers/ssr-provider](../modules/client_internal_providers_ssr_provider.md).ISSRContextType

The SSR context itself on all its might

## Table of contents

### Properties

- [currencyFactors](client_internal_providers_ssr_provider.ISSRContextType.md#currencyfactors)
- [queries](client_internal_providers_ssr_provider.ISSRContextType.md#queries)
- [resources](client_internal_providers_ssr_provider.ISSRContextType.md#resources)
- [searches](client_internal_providers_ssr_provider.ISSRContextType.md#searches)
- [title](client_internal_providers_ssr_provider.ISSRContextType.md#title)
- [user](client_internal_providers_ssr_provider.ISSRContextType.md#user)

## Properties

### currencyFactors

• **currencyFactors**: `Object`

Currency factors as they are used in the SSR mode,
this will become the initial currency factors, if 
there's no SSR context then it should fetch

#### Index signature

▪ [code: `string`]: `number`

#### Defined in

[client/internal/providers/ssr-provider.tsx:77](https://github.com/onzag/itemize/blob/59702dd5/client/internal/providers/ssr-provider.tsx#L77)

___

### queries

• **queries**: [`ISSRCollectedQueryType`](client_internal_providers_ssr_provider.ISSRCollectedQueryType.md)[]

Collected queries

#### Defined in

[client/internal/providers/ssr-provider.tsx:83](https://github.com/onzag/itemize/blob/59702dd5/client/internal/providers/ssr-provider.tsx#L83)

___

### resources

• **resources**: [`ISSRCollectedResourcesType`](client_internal_providers_ssr_provider.ISSRCollectedResourcesType.md)

Collected resources map

#### Defined in

[client/internal/providers/ssr-provider.tsx:87](https://github.com/onzag/itemize/blob/59702dd5/client/internal/providers/ssr-provider.tsx#L87)

___

### searches

• **searches**: [`ISSRCollectedSearchType`](client_internal_providers_ssr_provider.ISSRCollectedSearchType.md)[]

Collected searches

#### Defined in

[client/internal/providers/ssr-provider.tsx:91](https://github.com/onzag/itemize/blob/59702dd5/client/internal/providers/ssr-provider.tsx#L91)

___

### title

• **title**: `string`

The title of the page, will be the same as the document.title in the client side
but the server has no access to the dom, so to keep things consistent it's here

#### Defined in

[client/internal/providers/ssr-provider.tsx:117](https://github.com/onzag/itemize/blob/59702dd5/client/internal/providers/ssr-provider.tsx#L117)

___

### user

• **user**: `Object`

The user we refer about

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | id of the user |
| `role` | `string` | Role of the user |
| `token` | `string` | Token of the user, now due to security considerations and since this is equal to the cookie, the cookie value IN_COOKIE will be used in the client side, different for what is used in the server side, however the output should be equal anyway, as anyone who consumes this should read the cookie value |

#### Defined in

[client/internal/providers/ssr-provider.tsx:95](https://github.com/onzag/itemize/blob/59702dd5/client/internal/providers/ssr-provider.tsx#L95)
