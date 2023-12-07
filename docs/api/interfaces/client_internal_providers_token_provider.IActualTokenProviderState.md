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

[client/internal/providers/token-provider.tsx:37](https://github.com/onzag/itemize/blob/a24376ed/client/internal/providers/token-provider.tsx#L37)

___

### id

• **id**: `string`

The user id

#### Defined in

[client/internal/providers/token-provider.tsx:29](https://github.com/onzag/itemize/blob/a24376ed/client/internal/providers/token-provider.tsx#L29)

___

### isLoggingIn

• **isLoggingIn**: `boolean`

Whether it's currently logging in

#### Defined in

[client/internal/providers/token-provider.tsx:41](https://github.com/onzag/itemize/blob/a24376ed/client/internal/providers/token-provider.tsx#L41)

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

[client/internal/providers/token-provider.tsx:51](https://github.com/onzag/itemize/blob/a24376ed/client/internal/providers/token-provider.tsx#L51)

___

### role

• **role**: `string`

The user role

#### Defined in

[client/internal/providers/token-provider.tsx:33](https://github.com/onzag/itemize/blob/a24376ed/client/internal/providers/token-provider.tsx#L33)

___

### token

• **token**: `string`

The token we have got now

#### Defined in

[client/internal/providers/token-provider.tsx:25](https://github.com/onzag/itemize/blob/a24376ed/client/internal/providers/token-provider.tsx#L25)
