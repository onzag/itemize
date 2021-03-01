[](../README.md) / [Exports](../modules.md) / server/redis

# Module: server/redis

Provides the itemize redis client class
the itemize redis client differs a little bit from the standard client

## Table of contents

### Classes

- [ItemizeRedisClient](../classes/server_redis.itemizeredisclient.md)

### Functions

- [setupRedisClient](server_redis.md#setupredisclient)

## Functions

### setupRedisClient

▸ **setupRedisClient**(`name`: *string*, `config`: [*ISingleRedisConfigRawJSONDataType*](../interfaces/config.isingleredisconfigrawjsondatatype.md), `onConnect?`: (`client`: [*ItemizeRedisClient*](../classes/server_redis.itemizeredisclient.md), `isReconnect`: *boolean*) => *Promise*<void\>): *Promise*<[*ItemizeRedisClient*](../classes/server_redis.itemizeredisclient.md)\>

Setups a redis client to be an itemize redis client

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | the name we want to give it   |
`config` | [*ISingleRedisConfigRawJSONDataType*](../interfaces/config.isingleredisconfigrawjsondatatype.md) | the configuration for redis client   |
`onConnect?` | (`client`: [*ItemizeRedisClient*](../classes/server_redis.itemizeredisclient.md), `isReconnect`: *boolean*) => *Promise*<void\> | a function to run on connect    |

**Returns:** *Promise*<[*ItemizeRedisClient*](../classes/server_redis.itemizeredisclient.md)\>

Defined in: [server/redis.ts:142](https://github.com/onzag/itemize/blob/0569bdf2/server/redis.ts#L142)
