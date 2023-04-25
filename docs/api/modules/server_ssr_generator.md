[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/ssr/generator

# Module: server/ssr/generator

This file contains the all mighty SSR generator
that does a lot of the heavy lifting

## Table of contents

### Functions

- [ssrGenerator](server_ssr_generator.md#ssrgenerator)

## Functions

### ssrGenerator

▸ **ssrGenerator**(`appData`, `mode`, `info`): `Promise`<`void` \| [`IUSSDChunk`](../interfaces/ussd.IUSSDChunk.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `mode` | ``"production"`` \| ``"development"`` |
| `info` | `ISSRGeneratorHTMLResponse` \| `ISSRGeneratorUSSDResponse` |

#### Returns

`Promise`<`void` \| [`IUSSDChunk`](../interfaces/ussd.IUSSDChunk.md)\>

#### Defined in

[server/ssr/generator.tsx:49](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/generator.tsx#L49)
