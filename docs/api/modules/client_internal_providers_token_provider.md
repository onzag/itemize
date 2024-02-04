[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/internal/providers/token-provider

# Module: client/internal/providers/token-provider

The token provider component

## Table of contents

### Interfaces

- [IActualTokenProviderState](../interfaces/client_internal_providers_token_provider.IActualTokenProviderState.md)
- [ITokenContextType](../interfaces/client_internal_providers_token_provider.ITokenContextType.md)

### Variables

- [TokenContext](client_internal_providers_token_provider.md#tokencontext)

### Functions

- [TokenProvider](client_internal_providers_token_provider.md#tokenprovider)

## Variables

### TokenContext

• `Const` **TokenContext**: `Context`\<[`ITokenContextType`](../interfaces/client_internal_providers_token_provider.ITokenContextType.md)\>

The token context contains the current token state as well as several
functions, it should sit inside the application and over the main
component

#### Defined in

[client/internal/providers/token-provider.tsx:119](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/providers/token-provider.tsx#L119)

## Functions

### TokenProvider

▸ **TokenProvider**(`props`): `Element`

The token provider that creates the token context

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `ITokenProviderProps` | the props for the token provider |

#### Returns

`Element`

a react element

#### Defined in

[client/internal/providers/token-provider.tsx:126](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/providers/token-provider.tsx#L126)
