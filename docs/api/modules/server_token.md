[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/token

# Module: server/token

This file contains functions that are used for token validation
Itemize uses JWT for simplicity, itemize supports logout all anyway
because JWT tokens are sessioned, the reason JWT is used is because
tokens can be manufactured based on the jwtKey so other services
can be able to communicate with an itemize server easily

## Table of contents

### Functions

- [jwtDecode](server_token.md#jwtdecode)
- [jwtSign](server_token.md#jwtsign)
- [jwtVerify](server_token.md#jwtverify)
- [jwtVerifyRequest](server_token.md#jwtverifyrequest)
- [jwtVerifyWithAlt](server_token.md#jwtverifywithalt)

## Functions

### jwtDecode

▸ **jwtDecode**\<`T`\>(`token`, `options?`): `T`

Decode a JWT token and does not verify whether it's valid

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `string` | the token in question |
| `options?` | `DecodeOptions` | the options |

#### Returns

`T`

#### Defined in

[server/token.ts:101](https://github.com/onzag/itemize/blob/73e0c39e/server/token.ts#L101)

___

### jwtSign

▸ **jwtSign**(`payload`, `secretOrPrivateKey`, `options?`): `Promise`\<`string`\>

Sign a payload

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `string` \| `object` \| `Buffer` | the payload to sign |
| `secretOrPrivateKey` | `Secret` | the secret in question |
| `options?` | `SignOptions` | the options |

#### Returns

`Promise`\<`string`\>

#### Defined in

[server/token.ts:23](https://github.com/onzag/itemize/blob/73e0c39e/server/token.ts#L23)

___

### jwtVerify

▸ **jwtVerify**\<`T`\>(`token`, `secretOrPublicKey`, `options?`): `Promise`\<`T`\>

Verify and decode a key

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `string` | the token in question |
| `secretOrPublicKey` | `Secret` | the key |
| `options?` | `VerifyOptions` | verify options |

#### Returns

`Promise`\<`T`\>

#### Defined in

[server/token.ts:45](https://github.com/onzag/itemize/blob/73e0c39e/server/token.ts#L45)

___

### jwtVerifyRequest

▸ **jwtVerifyRequest**(`appData`, `req`): `Promise`\<\{ `err`: [`EndpointErrorType`](base_errors.md#endpointerrortype) ; `info`: [`IServerSideTokenDataType`](../interfaces/server_resolvers_basic.IServerSideTokenDataType.md) ; `verified`: `boolean`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |

#### Returns

`Promise`\<\{ `err`: [`EndpointErrorType`](base_errors.md#endpointerrortype) ; `info`: [`IServerSideTokenDataType`](../interfaces/server_resolvers_basic.IServerSideTokenDataType.md) ; `verified`: `boolean`  }\>

#### Defined in

[server/token.ts:108](https://github.com/onzag/itemize/blob/73e0c39e/server/token.ts#L108)

___

### jwtVerifyWithAlt

▸ **jwtVerifyWithAlt**\<`T`\>(`token`, `secretOrPublicKey`, `secretOrPublicKeyAlt`, `options?`): `Promise`\<`T`\>

Verify and decode a key using two keys

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `string` | the token in question |
| `secretOrPublicKey` | `Secret` | the key |
| `secretOrPublicKeyAlt` | `Secret` | the alternative key (or null) |
| `options?` | `VerifyOptions` | verify options |

#### Returns

`Promise`\<`T`\>

#### Defined in

[server/token.ts:68](https://github.com/onzag/itemize/blob/73e0c39e/server/token.ts#L68)
