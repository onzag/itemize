[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/redis](../modules/server_redis.md) / ItemizeRedisClient

# Class: ItemizeRedisClient

[server/redis](../modules/server_redis.md).ItemizeRedisClient

The itemize redis client is different from the standard client
for once it contains some quality get, set, etc... functions that are
already async, and secondly it fails more than the standard redis
eg. if it loses connection, so it avoids queueing

## Table of contents

### Constructors

- [constructor](server_redis.ItemizeRedisClient.md#constructor)

### Properties

- [del](server_redis.ItemizeRedisClient.md#del)
- [exists](server_redis.ItemizeRedisClient.md#exists)
- [expire](server_redis.ItemizeRedisClient.md#expire)
- [flushall](server_redis.ItemizeRedisClient.md#flushall)
- [get](server_redis.ItemizeRedisClient.md#get)
- [hdel](server_redis.ItemizeRedisClient.md#hdel)
- [hexists](server_redis.ItemizeRedisClient.md#hexists)
- [hget](server_redis.ItemizeRedisClient.md#hget)
- [hgetall](server_redis.ItemizeRedisClient.md#hgetall)
- [hset](server_redis.ItemizeRedisClient.md#hset)
- [isConnected](server_redis.ItemizeRedisClient.md#isconnected)
- [isReconnecting](server_redis.ItemizeRedisClient.md#isreconnecting)
- [name](server_redis.ItemizeRedisClient.md#name)
- [redisClient](server_redis.ItemizeRedisClient.md#redisclient)
- [set](server_redis.ItemizeRedisClient.md#set)

### Methods

- [callFn](server_redis.ItemizeRedisClient.md#callfn)
- [setup](server_redis.ItemizeRedisClient.md#setup)

## Constructors

### constructor

• **new ItemizeRedisClient**(`name`, `redisClient`): [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

Construct a new itemize redis client

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | a name, not very relevant, used for debugging |
| `redisClient` | `RedisClient` | the redis client in question |

#### Returns

[`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/redis.ts:42](https://github.com/onzag/itemize/blob/73e0c39e/server/redis.ts#L42)

## Properties

### del

• **del**: (`key`: `string`) => `Promise`\<`void`\>

#### Type declaration

▸ (`key`): `Promise`\<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

##### Returns

`Promise`\<`void`\>

#### Defined in

[server/redis.ts:30](https://github.com/onzag/itemize/blob/73e0c39e/server/redis.ts#L30)

___

### exists

• **exists**: (`key`: `string`) => `Promise`\<`number`\>

#### Type declaration

▸ (`key`): `Promise`\<`number`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

##### Returns

`Promise`\<`number`\>

#### Defined in

[server/redis.ts:34](https://github.com/onzag/itemize/blob/73e0c39e/server/redis.ts#L34)

___

### expire

• **expire**: (`key`: `string`, `seconds`: `number`) => `Promise`\<`void`\>

#### Type declaration

▸ (`key`, `seconds`): `Promise`\<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `seconds` | `number` |

##### Returns

`Promise`\<`void`\>

#### Defined in

[server/redis.ts:33](https://github.com/onzag/itemize/blob/73e0c39e/server/redis.ts#L33)

___

### flushall

• **flushall**: () => `Promise`\<`void`\>

#### Type declaration

▸ (): `Promise`\<`void`\>

##### Returns

`Promise`\<`void`\>

#### Defined in

[server/redis.ts:32](https://github.com/onzag/itemize/blob/73e0c39e/server/redis.ts#L32)

___

### get

• **get**: (`key`: `string`) => `Promise`\<`string`\>

#### Type declaration

▸ (`key`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

##### Returns

`Promise`\<`string`\>

#### Defined in

[server/redis.ts:25](https://github.com/onzag/itemize/blob/73e0c39e/server/redis.ts#L25)

___

### hdel

• **hdel**: (`tkey`: `string`, `key`: `string`) => `Promise`\<`void`\>

#### Type declaration

▸ (`tkey`, `key`): `Promise`\<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `tkey` | `string` |
| `key` | `string` |

##### Returns

`Promise`\<`void`\>

#### Defined in

[server/redis.ts:31](https://github.com/onzag/itemize/blob/73e0c39e/server/redis.ts#L31)

___

### hexists

• **hexists**: (`tkey`: `string`, `key`: `string`) => `Promise`\<`number`\>

#### Type declaration

▸ (`tkey`, `key`): `Promise`\<`number`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `tkey` | `string` |
| `key` | `string` |

##### Returns

`Promise`\<`number`\>

#### Defined in

[server/redis.ts:35](https://github.com/onzag/itemize/blob/73e0c39e/server/redis.ts#L35)

___

### hget

• **hget**: (`tkey`: `string`, `key`: `string`) => `Promise`\<`string`\>

#### Type declaration

▸ (`tkey`, `key`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `tkey` | `string` |
| `key` | `string` |

##### Returns

`Promise`\<`string`\>

#### Defined in

[server/redis.ts:26](https://github.com/onzag/itemize/blob/73e0c39e/server/redis.ts#L26)

___

### hgetall

• **hgetall**: (`tkey`: `string`) => `Promise`\<\{ `[k: string]`: `string`;  }\>

#### Type declaration

▸ (`tkey`): `Promise`\<\{ `[k: string]`: `string`;  }\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `tkey` | `string` |

##### Returns

`Promise`\<\{ `[k: string]`: `string`;  }\>

#### Defined in

[server/redis.ts:27](https://github.com/onzag/itemize/blob/73e0c39e/server/redis.ts#L27)

___

### hset

• **hset**: (`tkey`: `string`, `key`: `string`, `value`: `string`) => `Promise`\<`void`\>

#### Type declaration

▸ (`tkey`, `key`, `value`): `Promise`\<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `tkey` | `string` |
| `key` | `string` |
| `value` | `string` |

##### Returns

`Promise`\<`void`\>

#### Defined in

[server/redis.ts:29](https://github.com/onzag/itemize/blob/73e0c39e/server/redis.ts#L29)

___

### isConnected

• `Private` **isConnected**: `boolean` = `false`

#### Defined in

[server/redis.ts:21](https://github.com/onzag/itemize/blob/73e0c39e/server/redis.ts#L21)

___

### isReconnecting

• `Private` **isReconnecting**: `boolean` = `false`

#### Defined in

[server/redis.ts:20](https://github.com/onzag/itemize/blob/73e0c39e/server/redis.ts#L20)

___

### name

• **name**: `string`

#### Defined in

[server/redis.ts:23](https://github.com/onzag/itemize/blob/73e0c39e/server/redis.ts#L23)

___

### redisClient

• **redisClient**: `RedisClient`

#### Defined in

[server/redis.ts:24](https://github.com/onzag/itemize/blob/73e0c39e/server/redis.ts#L24)

___

### set

• **set**: (`key`: `string`, `value`: `string`) => `Promise`\<`void`\>

#### Type declaration

▸ (`key`, `value`): `Promise`\<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `string` |

##### Returns

`Promise`\<`void`\>

#### Defined in

[server/redis.ts:28](https://github.com/onzag/itemize/blob/73e0c39e/server/redis.ts#L28)

## Methods

### callFn

▸ **callFn**(`fn`): (...`args`: `any`[]) => `Promise`\<`any`\>

Just wrap the standard promise function so that it won't execute when redis is dead

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | (...`args`: `any`[]) => `Promise`\<`any`\> | the function to wrap |

#### Returns

`fn`

▸ (`...args`): `Promise`\<`any`\>

Just wrap the standard promise function so that it won't execute when redis is dead

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`Promise`\<`any`\>

#### Defined in

[server/redis.ts:154](https://github.com/onzag/itemize/blob/73e0c39e/server/redis.ts#L154)

___

### setup

▸ **setup**(`onConnect?`): `Promise`\<[`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)\>

Setup a client, should be called just right after construction

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `onConnect?` | (`client`: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md), `isReconnect`: `boolean`) => `Promise`\<`void`\> | a function to call after connecting happened |

#### Returns

`Promise`\<[`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)\>

the client itself, once it has been done and the connect function has ran, considering itself ready
to take on connections

#### Defined in

[server/redis.ts:68](https://github.com/onzag/itemize/blob/73e0c39e/server/redis.ts#L68)
