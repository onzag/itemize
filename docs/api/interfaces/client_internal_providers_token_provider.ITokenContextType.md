[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/providers/token-provider](../modules/client_internal_providers_token_provider.md) / ITokenContextType

# Interface: ITokenContextType

[client/internal/providers/token-provider](../modules/client_internal_providers_token_provider.md).ITokenContextType

The token context which actually extends its own internal state
but with a couple of functions

## Hierarchy

- [`IActualTokenProviderState`](client_internal_providers_token_provider.IActualTokenProviderState.md)

  ↳ **`ITokenContextType`**

## Table of contents

### Properties

- [dismissError](client_internal_providers_token_provider.ITokenContextType.md#dismisserror)
- [error](client_internal_providers_token_provider.ITokenContextType.md#error)
- [id](client_internal_providers_token_provider.ITokenContextType.md#id)
- [isLoggingIn](client_internal_providers_token_provider.ITokenContextType.md#isloggingin)
- [isReady](client_internal_providers_token_provider.ITokenContextType.md#isready)
- [login](client_internal_providers_token_provider.ITokenContextType.md#login)
- [logout](client_internal_providers_token_provider.ITokenContextType.md#logout)
- [role](client_internal_providers_token_provider.ITokenContextType.md#role)
- [token](client_internal_providers_token_provider.ITokenContextType.md#token)

## Properties

### dismissError

• **dismissError**: () => `void`

#### Type declaration

▸ (): `void`

Dismiss the current login error

##### Returns

`void`

#### Defined in

[client/internal/providers/token-provider.tsx:111](https://github.com/onzag/itemize/blob/59702dd5/client/internal/providers/token-provider.tsx#L111)

___

### error

• **error**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

An error that occured during login

#### Inherited from

[IActualTokenProviderState](client_internal_providers_token_provider.IActualTokenProviderState.md).[error](client_internal_providers_token_provider.IActualTokenProviderState.md#error)

#### Defined in

[client/internal/providers/token-provider.tsx:37](https://github.com/onzag/itemize/blob/59702dd5/client/internal/providers/token-provider.tsx#L37)

___

### id

• **id**: `string`

The user id

#### Inherited from

[IActualTokenProviderState](client_internal_providers_token_provider.IActualTokenProviderState.md).[id](client_internal_providers_token_provider.IActualTokenProviderState.md#id)

#### Defined in

[client/internal/providers/token-provider.tsx:29](https://github.com/onzag/itemize/blob/59702dd5/client/internal/providers/token-provider.tsx#L29)

___

### isLoggingIn

• **isLoggingIn**: `boolean`

Whether it's currently logging in

#### Inherited from

[IActualTokenProviderState](client_internal_providers_token_provider.IActualTokenProviderState.md).[isLoggingIn](client_internal_providers_token_provider.IActualTokenProviderState.md#isloggingin)

#### Defined in

[client/internal/providers/token-provider.tsx:41](https://github.com/onzag/itemize/blob/59702dd5/client/internal/providers/token-provider.tsx#L41)

___

### isReady

• **isReady**: `boolean`

Whether it's ready, the main component won't render
if is ready is false, because all query execution might mess up
say your token is invalid then you'll get a zillion errors and request
that will dissapear right away and interface flicker

is ready should be true in SSR mode as the server has "checked"
the token

#### Inherited from

[IActualTokenProviderState](client_internal_providers_token_provider.IActualTokenProviderState.md).[isReady](client_internal_providers_token_provider.IActualTokenProviderState.md#isready)

#### Defined in

[client/internal/providers/token-provider.tsx:51](https://github.com/onzag/itemize/blob/59702dd5/client/internal/providers/token-provider.tsx#L51)

___

### login

• **login**: (`username`: `string`, `password`: `string`, `token`: `string`) => `Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype) ; `id`: `string` ; `role`: `string`  }\>

#### Type declaration

▸ (`username`, `password`, `token`): `Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype) ; `id`: `string` ; `role`: `string`  }\>

the login function

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `username` | `string` | the username to login with (can also be an email) |
| `password` | `string` | the password to login with |
| `token` | `string` | you can leave username and passwor as null, and provide a token instead, so you are login in by token rather than by anything else, this is used in the initial login |

##### Returns

`Promise`\<\{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype) ; `id`: `string` ; `role`: `string`  }\>

a promise with the id, role and a possible error

#### Defined in

[client/internal/providers/token-provider.tsx:102](https://github.com/onzag/itemize/blob/59702dd5/client/internal/providers/token-provider.tsx#L102)

___

### logout

• **logout**: () => `void`

#### Type declaration

▸ (): `void`

logout function, for the logoutAll functionality check the LogActioner as it's a complex function
the token provider only manages simple functionality about the current app state

##### Returns

`void`

#### Defined in

[client/internal/providers/token-provider.tsx:107](https://github.com/onzag/itemize/blob/59702dd5/client/internal/providers/token-provider.tsx#L107)

___

### role

• **role**: `string`

The user role

#### Inherited from

[IActualTokenProviderState](client_internal_providers_token_provider.IActualTokenProviderState.md).[role](client_internal_providers_token_provider.IActualTokenProviderState.md#role)

#### Defined in

[client/internal/providers/token-provider.tsx:33](https://github.com/onzag/itemize/blob/59702dd5/client/internal/providers/token-provider.tsx#L33)

___

### token

• **token**: `string`

The token we have got now

#### Inherited from

[IActualTokenProviderState](client_internal_providers_token_provider.IActualTokenProviderState.md).[token](client_internal_providers_token_provider.IActualTokenProviderState.md#token)

#### Defined in

[client/internal/providers/token-provider.tsx:25](https://github.com/onzag/itemize/blob/59702dd5/client/internal/providers/token-provider.tsx#L25)
