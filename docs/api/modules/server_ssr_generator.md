[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/ssr/generator

# Module: server/ssr/generator

This file contains the all mighty SSR generator
that does a lot of the heavy lifting

## Table of contents

### Functions

- [ssrGenerator](server_ssr_generator.md#ssrgenerator)

## Functions

### ssrGenerator

▸ **ssrGenerator**(`req`, `res`, `html`, `appData`, `mode`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |
| `res` | `Response`<`any`, `Record`<`string`, `any`\>\> |
| `html` | `string` |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `mode` | ``"development"`` \| ``"production"`` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/ssr/generator.tsx:34](https://github.com/onzag/itemize/blob/f2f29986/server/ssr/generator.tsx#L34)
