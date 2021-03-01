[](../README.md) / [Exports](../modules.md) / server/rootpool

# Module: server/rootpool

Contains a pool of root, we need a pool of root because
we are unable to render an itemize app being used at once
as the root registires are modified during SSR rendering

## Table of contents

### Functions

- [retrieveRootPool](server_rootpool.md#retrieverootpool)

## Functions

### retrieveRootPool

▸ **retrieveRootPool**(`rawData`: [*IRootRawJSONDataType*](../interfaces/base_root.irootrawjsondatatype.md)): *Pool*<[*default*](../classes/base_root.default.md)\>

Provides a pool of root

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawData` | [*IRootRawJSONDataType*](../interfaces/base_root.irootrawjsondatatype.md) | the root raw data    |

**Returns:** *Pool*<[*default*](../classes/base_root.default.md)\>

Defined in: [server/rootpool.ts:21](https://github.com/onzag/itemize/blob/0e9b128c/server/rootpool.ts#L21)
