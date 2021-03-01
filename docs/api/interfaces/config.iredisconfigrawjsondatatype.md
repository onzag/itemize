[](../README.md) / [Exports](../modules.md) / [config](../modules/config.md) / IRedisConfigRawJSONDataType

# Interface: IRedisConfigRawJSONDataType

[config](../modules/config.md).IRedisConfigRawJSONDataType

Redis configuration
All instances can literally be the same instance

## Table of contents

### Properties

- [cache](config.iredisconfigrawjsondatatype.md#cache)
- [global](config.iredisconfigrawjsondatatype.md#global)
- [pubSub](config.iredisconfigrawjsondatatype.md#pubsub)

## Properties

### cache

• **cache**: [*ISingleRedisConfigRawJSONDataType*](config.isingleredisconfigrawjsondatatype.md)

local cache, should be physically close to the cluster
or run alongside it

Defined in: [config.ts:322](https://github.com/onzag/itemize/blob/28218320/config.ts#L322)

___

### global

• **global**: [*ISingleRedisConfigRawJSONDataType*](config.isingleredisconfigrawjsondatatype.md)

The global cache, used to store server data
that is shared within instances

Defined in: [config.ts:312](https://github.com/onzag/itemize/blob/28218320/config.ts#L312)

___

### pubSub

• **pubSub**: [*ISingleRedisConfigRawJSONDataType*](config.isingleredisconfigrawjsondatatype.md)

The pubsub cache, also some form of global cache
but used to inform changes of data to instances

Defined in: [config.ts:317](https://github.com/onzag/itemize/blob/28218320/config.ts#L317)
