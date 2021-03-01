[](../README.md) / [Exports](../modules.md) / client/internal/providers/ssr-provider

# Module: client/internal/providers/ssr-provider

The ssr provider file

## Table of contents

### Interfaces

- [ISSRCollectedQueryType](../interfaces/client_internal_providers_ssr_provider.issrcollectedquerytype.md)
- [ISSRCollectedResourcesType](../interfaces/client_internal_providers_ssr_provider.issrcollectedresourcestype.md)
- [ISSRContextType](../interfaces/client_internal_providers_ssr_provider.issrcontexttype.md)
- [ISSRProviderProps](../interfaces/client_internal_providers_ssr_provider.issrproviderprops.md)

### Variables

- [SSRContext](client_internal_providers_ssr_provider.md#ssrcontext)

### Functions

- [SSRProvider](client_internal_providers_ssr_provider.md#ssrprovider)

## Variables

### SSRContext

• `Const` **SSRContext**: *Context*<[*ISSRContextType*](../interfaces/client_internal_providers_ssr_provider.issrcontexttype.md)\>

The ssr context passes the context value all the way to all the components

Defined in: [client/internal/providers/ssr-provider.tsx:96](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/providers/ssr-provider.tsx#L96)

## Functions

### SSRProvider

▸ **SSRProvider**(`props`: [*ISSRProviderProps*](../interfaces/client_internal_providers_ssr_provider.issrproviderprops.md)): *Element*

The SSR provider is a static provider that generates a context that is used
primarily for the initial render to access information, mainly about the user
for the setup of the token provider, the title and resources, since currency
factors become the initial currency factors and the queries become applied
values during initialization

This should sit on top of the itemize app

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`props` | [*ISSRProviderProps*](../interfaces/client_internal_providers_ssr_provider.issrproviderprops.md) | the provider props    |

**Returns:** *Element*

Defined in: [client/internal/providers/ssr-provider.tsx:117](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/providers/ssr-provider.tsx#L117)
