[@onzag/itemize](../README.md) / [Modules](../modules.md) / [config](../modules/config.md) / IRedisConfigRawJSONDataType

# Interface: IRedisConfigRawJSONDataType

[config](../modules/config.md).IRedisConfigRawJSONDataType

Redis configuration
All instances can literally be the same instance

## Table of contents

### Properties

- [cache](config.IRedisConfigRawJSONDataType.md#cache)
- [global](config.IRedisConfigRawJSONDataType.md#global)
- [pubSub](config.IRedisConfigRawJSONDataType.md#pubsub)

## Properties

### cache

• **cache**: [`ISingleRedisConfigRawJSONDataType`](config.ISingleRedisConfigRawJSONDataType.md)

local cache, should be physically close to the cluster
or run alongside it

#### Defined in

[config.ts:344](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L344)

___

### global

• **global**: [`ISingleRedisConfigRawJSONDataType`](config.ISingleRedisConfigRawJSONDataType.md)

The global cache, used to store server data
that is shared within instances

#### Defined in

[config.ts:334](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L334)

___

### pubSub

• **pubSub**: [`ISingleRedisConfigRawJSONDataType`](config.ISingleRedisConfigRawJSONDataType.md)

The pubsub cache, also some form of global cache
but used to inform changes of data to instances

#### Defined in

[config.ts:339](https://github.com/onzag/itemize/blob/5c2808d3/config.ts#L339)
