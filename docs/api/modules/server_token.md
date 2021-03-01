[](../README.md) / [Exports](../modules.md) / server/token

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

## Functions

### jwtDecode

▸ **jwtDecode**<T\>(`token`: *string*, `options?`: jwt.DecodeOptions): T

Decode a JWT token and does not verify whether it's valid

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`token` | *string* | the token in question   |
`options?` | jwt.DecodeOptions | the options    |

**Returns:** T

Defined in: [server/token.ts:61](https://github.com/onzag/itemize/blob/0569bdf2/server/token.ts#L61)

___

### jwtSign

▸ **jwtSign**(`payload`: *string* \| *object* \| Buffer, `secretOrPrivateKey`: jwt.Secret, `options?`: jwt.SignOptions): *Promise*<string\>

Sign a payload

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`payload` | *string* \| *object* \| Buffer | the payload to sign   |
`secretOrPrivateKey` | jwt.Secret | the secret in question   |
`options?` | jwt.SignOptions | the options    |

**Returns:** *Promise*<string\>

Defined in: [server/token.ts:18](https://github.com/onzag/itemize/blob/0569bdf2/server/token.ts#L18)

___

### jwtVerify

▸ **jwtVerify**<T\>(`token`: *string*, `secretOrPublicKey`: jwt.Secret, `options?`: jwt.VerifyOptions): *Promise*<T\>

Verify and decode a key

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`token` | *string* | the token in question   |
`secretOrPublicKey` | jwt.Secret | the key   |
`options?` | jwt.VerifyOptions | verify options    |

**Returns:** *Promise*<T\>

Defined in: [server/token.ts:40](https://github.com/onzag/itemize/blob/0569bdf2/server/token.ts#L40)
