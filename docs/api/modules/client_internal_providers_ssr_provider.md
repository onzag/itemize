[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/internal/providers/ssr-provider

# Module: client/internal/providers/ssr-provider

The ssr provider file

## Table of contents

### Interfaces

- [ISSRCollectedQueryType](../interfaces/client_internal_providers_ssr_provider.ISSRCollectedQueryType.md)
- [ISSRCollectedResourcesType](../interfaces/client_internal_providers_ssr_provider.ISSRCollectedResourcesType.md)
- [ISSRCollectedSearchType](../interfaces/client_internal_providers_ssr_provider.ISSRCollectedSearchType.md)
- [ISSRContextType](../interfaces/client_internal_providers_ssr_provider.ISSRContextType.md)
- [ISSRProviderProps](../interfaces/client_internal_providers_ssr_provider.ISSRProviderProps.md)

### Variables

- [SSRContext](client_internal_providers_ssr_provider.md#ssrcontext)

### Functions

- [SSRProvider](client_internal_providers_ssr_provider.md#ssrprovider)

## Variables

### SSRContext

• `Const` **SSRContext**: `Context`\<[`ISSRContextType`](../interfaces/client_internal_providers_ssr_provider.ISSRContextType.md)\>

The ssr context passes the context value all the way to all the components

#### Defined in

[client/internal/providers/ssr-provider.tsx:123](https://github.com/onzag/itemize/blob/59702dd5/client/internal/providers/ssr-provider.tsx#L123)

## Functions

### SSRProvider

▸ **SSRProvider**(`props`): `Element`

The SSR provider is a static provider that generates a context that is used
primarily for the initial render to access information, mainly about the user
for the setup of the token provider, the title and resources, since currency
factors become the initial currency factors and the queries become applied
values during initialization

This should sit on top of the itemize app

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`ISSRProviderProps`](../interfaces/client_internal_providers_ssr_provider.ISSRProviderProps.md) | the provider props |

#### Returns

`Element`

#### Defined in

[client/internal/providers/ssr-provider.tsx:144](https://github.com/onzag/itemize/blob/59702dd5/client/internal/providers/ssr-provider.tsx#L144)
