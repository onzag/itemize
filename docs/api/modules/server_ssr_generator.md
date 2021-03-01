[](../README.md) / [Exports](../modules.md) / server/ssr/generator

# Module: server/ssr/generator

This file contains the all mighty SSR generator
that does a lot of the heavy lifting

## Table of contents

### Functions

- [ssrGenerator](server_ssr_generator.md#ssrgenerator)

## Functions

### ssrGenerator

▸ **ssrGenerator**(`req`: express.Request, `res`: express.Response, `html`: *string*, `appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md), `mode`: *development* \| *production*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`req` | express.Request |
`res` | express.Response |
`html` | *string* |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |
`mode` | *development* \| *production* |

**Returns:** *Promise*<void\>

Defined in: [server/ssr/generator.tsx:30](https://github.com/onzag/itemize/blob/28218320/server/ssr/generator.tsx#L30)
