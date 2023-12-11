[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/redis

# Module: server/redis

Provides the itemize redis client class
the itemize redis client differs a little bit from the standard client

## Table of contents

### Classes

- [ItemizeRedisClient](../classes/server_redis.ItemizeRedisClient.md)

### Functions

- [setupRedisClient](server_redis.md#setupredisclient)

## Functions

### setupRedisClient

▸ **setupRedisClient**(`name`, `config`, `onConnect?`): `Promise`\<[`ItemizeRedisClient`](../classes/server_redis.ItemizeRedisClient.md)\>

Setups a redis client to be an itemize redis client

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the name we want to give it |
| `config` | [`ISingleRedisConfigRawJSONDataType`](../interfaces/config.ISingleRedisConfigRawJSONDataType.md) | the configuration for redis client |
| `onConnect?` | (`client`: [`ItemizeRedisClient`](../classes/server_redis.ItemizeRedisClient.md), `isReconnect`: `boolean`) => `Promise`\<`void`\> | a function to run on connect |

#### Returns

`Promise`\<[`ItemizeRedisClient`](../classes/server_redis.ItemizeRedisClient.md)\>

#### Defined in

[server/redis.ts:174](https://github.com/onzag/itemize/blob/59702dd5/server/redis.ts#L174)
