[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/rest

# Module: server/rest

This provides the rest endpoints for the itemize app

## Table of contents

### Functions

- [default](server_rest.md#default)
- [secureEndpointRouter](server_rest.md#secureendpointrouter)

## Functions

### default

▸ **default**(`appData`): `Object`

this function contains and build all the rest services
by returning a router that holds them inside the
/rest/ endpoint

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | the app data that it passes |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `reprocessedCache` | {} |
| `router` | `Router` |

#### Defined in

[server/rest.ts:74](https://github.com/onzag/itemize/blob/73e0c39e/server/rest.ts#L74)

___

### secureEndpointRouter

▸ **secureEndpointRouter**(`appData`, `req`, `res`, `next`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |
| `res` | `Response`\<`any`, `Record`\<`string`, `any`\>\> |
| `next` | () => `void` |

#### Returns

`void`

#### Defined in

[server/rest.ts:21](https://github.com/onzag/itemize/blob/73e0c39e/server/rest.ts#L21)
