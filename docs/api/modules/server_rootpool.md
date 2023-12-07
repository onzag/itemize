[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/rootpool

# Module: server/rootpool

Contains a pool of root, we need a pool of root because
we are unable to render an itemize app being used at once
as the root registires are modified during SSR rendering

## Table of contents

### Functions

- [retrieveRootPool](server_rootpool.md#retrieverootpool)

## Functions

### retrieveRootPool

▸ **retrieveRootPool**(`rawData`): `Pool`<[`default`](../classes/base_Root.default.md)\>

Provides a pool of root

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rawData` | [`IRootRawJSONDataType`](../interfaces/base_Root.IRootRawJSONDataType.md) | the root raw data |

#### Returns

`Pool`<[`default`](../classes/base_Root.default.md)\>

#### Defined in

[server/rootpool.ts:19](https://github.com/onzag/itemize/blob/a24376ed/server/rootpool.ts#L19)
