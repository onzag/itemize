[](../README.md) / [Exports](../modules.md) / [server/redis](../modules/server_redis.md) / ItemizeRedisClient

# Class: ItemizeRedisClient

[server/redis](../modules/server_redis.md).ItemizeRedisClient

The itemize redis client is different from the standard client
for once it contains some quality get, set, etc... functions that are
already async, and secondly it fails more than the standard redis
eg. if it loses connection, so it avoids queueing

## Table of contents

### Constructors

- [constructor](server_redis.itemizeredisclient.md#constructor)

### Properties

- [del](server_redis.itemizeredisclient.md#del)
- [exists](server_redis.itemizeredisclient.md#exists)
- [expire](server_redis.itemizeredisclient.md#expire)
- [flushall](server_redis.itemizeredisclient.md#flushall)
- [get](server_redis.itemizeredisclient.md#get)
- [isReconnecting](server_redis.itemizeredisclient.md#isreconnecting)
- [name](server_redis.itemizeredisclient.md#name)
- [redisClient](server_redis.itemizeredisclient.md#redisclient)
- [set](server_redis.itemizeredisclient.md#set)

### Methods

- [callFn](server_redis.itemizeredisclient.md#callfn)
- [setup](server_redis.itemizeredisclient.md#setup)

## Constructors

### constructor

\+ **new ItemizeRedisClient**(`name`: *string*, `redisClient`: *RedisClient*): [*ItemizeRedisClient*](server_redis.itemizeredisclient.md)

Construct a new itemize redis client

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | a name, not very relevant, used for debugging   |
`redisClient` | *RedisClient* | the redis client in question    |

**Returns:** [*ItemizeRedisClient*](server_redis.itemizeredisclient.md)

Defined in: [server/redis.ts:28](https://github.com/onzag/itemize/blob/0569bdf2/server/redis.ts#L28)

## Properties

### del

• **del**: (`key`: *string*) => *Promise*<void\>

#### Type declaration:

▸ (`key`: *string*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`key` | *string* |

**Returns:** *Promise*<void\>

Defined in: [server/redis.ts:25](https://github.com/onzag/itemize/blob/0569bdf2/server/redis.ts#L25)

Defined in: [server/redis.ts:25](https://github.com/onzag/itemize/blob/0569bdf2/server/redis.ts#L25)

___

### exists

• **exists**: (`key`: *string*) => *Promise*<number\>

#### Type declaration:

▸ (`key`: *string*): *Promise*<number\>

#### Parameters:

Name | Type |
:------ | :------ |
`key` | *string* |

**Returns:** *Promise*<number\>

Defined in: [server/redis.ts:28](https://github.com/onzag/itemize/blob/0569bdf2/server/redis.ts#L28)

Defined in: [server/redis.ts:28](https://github.com/onzag/itemize/blob/0569bdf2/server/redis.ts#L28)

___

### expire

• **expire**: (`key`: *string*, `seconds`: *number*) => *Promise*<void\>

#### Type declaration:

▸ (`key`: *string*, `seconds`: *number*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`key` | *string* |
`seconds` | *number* |

**Returns:** *Promise*<void\>

Defined in: [server/redis.ts:27](https://github.com/onzag/itemize/blob/0569bdf2/server/redis.ts#L27)

Defined in: [server/redis.ts:27](https://github.com/onzag/itemize/blob/0569bdf2/server/redis.ts#L27)

___

### flushall

• **flushall**: () => *Promise*<void\>

#### Type declaration:

▸ (): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [server/redis.ts:26](https://github.com/onzag/itemize/blob/0569bdf2/server/redis.ts#L26)

Defined in: [server/redis.ts:26](https://github.com/onzag/itemize/blob/0569bdf2/server/redis.ts#L26)

___

### get

• **get**: (`key`: *string*) => *Promise*<string\>

#### Type declaration:

▸ (`key`: *string*): *Promise*<string\>

#### Parameters:

Name | Type |
:------ | :------ |
`key` | *string* |

**Returns:** *Promise*<string\>

Defined in: [server/redis.ts:23](https://github.com/onzag/itemize/blob/0569bdf2/server/redis.ts#L23)

Defined in: [server/redis.ts:23](https://github.com/onzag/itemize/blob/0569bdf2/server/redis.ts#L23)

___

### isReconnecting

• `Private` **isReconnecting**: *boolean*= false

Defined in: [server/redis.ts:19](https://github.com/onzag/itemize/blob/0569bdf2/server/redis.ts#L19)

___

### name

• **name**: *string*

Defined in: [server/redis.ts:21](https://github.com/onzag/itemize/blob/0569bdf2/server/redis.ts#L21)

___

### redisClient

• **redisClient**: *RedisClient*

Defined in: [server/redis.ts:22](https://github.com/onzag/itemize/blob/0569bdf2/server/redis.ts#L22)

___

### set

• **set**: (`key`: *string*, `value`: *string*) => *Promise*<void\>

#### Type declaration:

▸ (`key`: *string*, `value`: *string*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`key` | *string* |
`value` | *string* |

**Returns:** *Promise*<void\>

Defined in: [server/redis.ts:24](https://github.com/onzag/itemize/blob/0569bdf2/server/redis.ts#L24)

Defined in: [server/redis.ts:24](https://github.com/onzag/itemize/blob/0569bdf2/server/redis.ts#L24)

## Methods

### callFn

▸ `Private`**callFn**(`fn`: (...`args`: *any*[]) => *Promise*<any\>): *function*

Just wrap the standard promise function so that it won't execute when redis is dead

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`fn` | (...`args`: *any*[]) => *Promise*<any\> | the function to wrap    |

**Returns:** (...`args`: *any*[]) => *Promise*<any\>

Defined in: [server/redis.ts:124](https://github.com/onzag/itemize/blob/0569bdf2/server/redis.ts#L124)

___

### setup

▸ **setup**(`onConnect?`: (`client`: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md), `isReconnect`: *boolean*) => *Promise*<void\>): *Promise*<[*ItemizeRedisClient*](server_redis.itemizeredisclient.md)\>

Setup a client, should be called just right after construction

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`onConnect?` | (`client`: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md), `isReconnect`: *boolean*) => *Promise*<void\> | a function to call after connecting happened   |

**Returns:** *Promise*<[*ItemizeRedisClient*](server_redis.itemizeredisclient.md)\>

the client itself, once it has been done and the connect function has ran, considering itself ready
to take on connections

Defined in: [server/redis.ts:56](https://github.com/onzag/itemize/blob/0569bdf2/server/redis.ts#L56)
