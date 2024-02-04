[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/rq

# Module: server/rq

## Table of contents

### Functions

- [rqSystem](server_rq.md#rqsystem)

## Functions

### rqSystem

▸ **rqSystem**(`options`): `Router`

The rq system is used to be a simplified version
of a rq client with upload potential that doesn't need
a custom format and is optimized for simplicity

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.jsonSchema` | [`RQRootSchema`](../interfaces/base_Root_rq.RQRootSchema.md) |
| `options.maxFieldSize` | `number` |
| `options.maxFileSize` | `number` |
| `options.maxFiles` | `number` |
| `options.schema` | [`RQRootSchema`](../interfaces/base_Root_rq.RQRootSchema.md) |

#### Returns

`Router`

#### Defined in

[server/rq.ts:331](https://github.com/onzag/itemize/blob/73e0c39e/server/rq.ts#L331)
