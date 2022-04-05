[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/providers/token-provider](../modules/client_internal_providers_token_provider.md) / IActualTokenProviderState

# Interface: IActualTokenProviderState

[client/internal/providers/token-provider](../modules/client_internal_providers_token_provider.md).IActualTokenProviderState

State for the actual token provider that actually
gets the job done

## Hierarchy

- **`IActualTokenProviderState`**

  ↳ [`ITokenContextType`](client_internal_providers_token_provider.ITokenContextType.md)

## Table of contents

### Properties

- [error](client_internal_providers_token_provider.IActualTokenProviderState.md#error)
- [id](client_internal_providers_token_provider.IActualTokenProviderState.md#id)
- [isLoggingIn](client_internal_providers_token_provider.IActualTokenProviderState.md#isloggingin)
- [isReady](client_internal_providers_token_provider.IActualTokenProviderState.md#isready)
- [role](client_internal_providers_token_provider.IActualTokenProviderState.md#role)
- [token](client_internal_providers_token_provider.IActualTokenProviderState.md#token)

## Properties

### error

• **error**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

An error that occured during login

#### Defined in

[client/internal/providers/token-provider.tsx:36](https://github.com/onzag/itemize/blob/f2f29986/client/internal/providers/token-provider.tsx#L36)

___

### id

• **id**: `string`

The user id

#### Defined in

[client/internal/providers/token-provider.tsx:28](https://github.com/onzag/itemize/blob/f2f29986/client/internal/providers/token-provider.tsx#L28)

___

### isLoggingIn

• **isLoggingIn**: `boolean`

Whether it's currently logging in

#### Defined in

[client/internal/providers/token-provider.tsx:40](https://github.com/onzag/itemize/blob/f2f29986/client/internal/providers/token-provider.tsx#L40)

___

### isReady

• **isReady**: `boolean`

Whether it's ready, the main component won't render
if is ready is false, because all query execution might mess up
say your token is invalid then you'll get a zillion errors and request
that will dissapear right away and interface flicker

is ready should be true in SSR mode as the server has "checked"
the token

#### Defined in

[client/internal/providers/token-provider.tsx:50](https://github.com/onzag/itemize/blob/f2f29986/client/internal/providers/token-provider.tsx#L50)

___

### role

• **role**: `string`

The user role

#### Defined in

[client/internal/providers/token-provider.tsx:32](https://github.com/onzag/itemize/blob/f2f29986/client/internal/providers/token-provider.tsx#L32)

___

### token

• **token**: `string`

The token we have got now

#### Defined in

[client/internal/providers/token-provider.tsx:24](https://github.com/onzag/itemize/blob/f2f29986/client/internal/providers/token-provider.tsx#L24)
