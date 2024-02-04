[@onzag/itemize](../README.md) / [Modules](../modules.md) / [testing/server/redis](../modules/testing_server_redis.md) / RedisTest

# Class: RedisTest

[testing/server/redis](../modules/testing_server_redis.md).RedisTest

Defines a test, and it should be used as an entry
for all subtests

## Hierarchy

- [`Test`](testing.Test.md)

  ↳ **`RedisTest`**

## Table of contents

### Constructors

- [constructor](testing_server_redis.RedisTest.md#constructor)

### Properties

- [databaseConnection](testing_server_redis.RedisTest.md#databaseconnection)
- [fullHost](testing_server_redis.RedisTest.md#fullhost)
- [redisClient](testing_server_redis.RedisTest.md#redisclient)
- [redisGlobalClient](testing_server_redis.RedisTest.md#redisglobalclient)
- [redisLocalPub](testing_server_redis.RedisTest.md#redislocalpub)
- [redisLocalSub](testing_server_redis.RedisTest.md#redislocalsub)
- [redisPub](testing_server_redis.RedisTest.md#redispub)
- [redisSub](testing_server_redis.RedisTest.md#redissub)
- [testingInfo](testing_server_redis.RedisTest.md#testinginfo)
- [testingUserInfo](testing_server_redis.RedisTest.md#testinguserinfo)

### Methods

- [after](testing_server_redis.RedisTest.md#after)
- [before](testing_server_redis.RedisTest.md#before)
- [construtor](testing_server_redis.RedisTest.md#construtor)
- [define](testing_server_redis.RedisTest.md#define)
- [describe](testing_server_redis.RedisTest.md#describe)
- [info](testing_server_redis.RedisTest.md#info)
- [it](testing_server_redis.RedisTest.md#it)
- [quit](testing_server_redis.RedisTest.md#quit)
- [skipAll](testing_server_redis.RedisTest.md#skipall)
- [skipLayer](testing_server_redis.RedisTest.md#skiplayer)
- [skipNext](testing_server_redis.RedisTest.md#skipnext)
- [step](testing_server_redis.RedisTest.md#step)
- [wait](testing_server_redis.RedisTest.md#wait)
- [warn](testing_server_redis.RedisTest.md#warn)

## Constructors

### constructor

• **new RedisTest**(`databaseConnection`, `testingInfo`, `testingUserInfo`, `fullHost`): [`RedisTest`](testing_server_redis.RedisTest.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `databaseConnection` | [`DatabaseConnection`](database.DatabaseConnection.md) |
| `testingInfo` | [`ITestingInfoType`](../interfaces/testing_itemize.ITestingInfoType.md) |
| `testingUserInfo` | [`IUserInfoAndTokensForTesting`](../interfaces/testing_server.IUserInfoAndTokensForTesting.md) |
| `fullHost` | `string` |

#### Returns

[`RedisTest`](testing_server_redis.RedisTest.md)

#### Overrides

[Test](testing.Test.md).[constructor](testing.Test.md#constructor)

#### Defined in

[testing/server/redis.ts:24](https://github.com/onzag/itemize/blob/73e0c39e/testing/server/redis.ts#L24)

## Properties

### databaseConnection

• `Private` **databaseConnection**: [`DatabaseConnection`](database.DatabaseConnection.md)

#### Defined in

[testing/server/redis.ts:16](https://github.com/onzag/itemize/blob/73e0c39e/testing/server/redis.ts#L16)

___

### fullHost

• `Private` **fullHost**: `string`

#### Defined in

[testing/server/redis.ts:14](https://github.com/onzag/itemize/blob/73e0c39e/testing/server/redis.ts#L14)

___

### redisClient

• `Private` **redisClient**: `RedisClient`

#### Defined in

[testing/server/redis.ts:21](https://github.com/onzag/itemize/blob/73e0c39e/testing/server/redis.ts#L21)

___

### redisGlobalClient

• `Private` **redisGlobalClient**: `RedisClient`

#### Defined in

[testing/server/redis.ts:22](https://github.com/onzag/itemize/blob/73e0c39e/testing/server/redis.ts#L22)

___

### redisLocalPub

• `Private` **redisLocalPub**: `RedisClient`

#### Defined in

[testing/server/redis.ts:19](https://github.com/onzag/itemize/blob/73e0c39e/testing/server/redis.ts#L19)

___

### redisLocalSub

• `Private` **redisLocalSub**: `RedisClient`

#### Defined in

[testing/server/redis.ts:20](https://github.com/onzag/itemize/blob/73e0c39e/testing/server/redis.ts#L20)

___

### redisPub

• `Private` **redisPub**: `RedisClient`

#### Defined in

[testing/server/redis.ts:17](https://github.com/onzag/itemize/blob/73e0c39e/testing/server/redis.ts#L17)

___

### redisSub

• `Private` **redisSub**: `RedisClient`

#### Defined in

[testing/server/redis.ts:18](https://github.com/onzag/itemize/blob/73e0c39e/testing/server/redis.ts#L18)

___

### testingInfo

• `Private` **testingInfo**: [`ITestingInfoType`](../interfaces/testing_itemize.ITestingInfoType.md)

#### Defined in

[testing/server/redis.ts:12](https://github.com/onzag/itemize/blob/73e0c39e/testing/server/redis.ts#L12)

___

### testingUserInfo

• `Private` **testingUserInfo**: [`IUserInfoAndTokensForTesting`](../interfaces/testing_server.IUserInfoAndTokensForTesting.md)

#### Defined in

[testing/server/redis.ts:13](https://github.com/onzag/itemize/blob/73e0c39e/testing/server/redis.ts#L13)

## Methods

### after

▸ **after**(): `void`

Executes after everything is done
use for cleanup

#### Returns

`void`

#### Overrides

[Test](testing.Test.md).[after](testing.Test.md#after)

#### Defined in

[testing/server/redis.ts:222](https://github.com/onzag/itemize/blob/73e0c39e/testing/server/redis.ts#L222)

___

### before

▸ **before**(): `Promise`\<`void`\>

Executes before, override this function
it allows you to dinamically add tests as
well

#### Returns

`Promise`\<`void`\>

#### Overrides

[Test](testing.Test.md).[before](testing.Test.md#before)

#### Defined in

[testing/server/redis.ts:38](https://github.com/onzag/itemize/blob/73e0c39e/testing/server/redis.ts#L38)

___

### construtor

▸ **construtor**(): `void`

Build a brand new instance

#### Returns

`void`

#### Inherited from

[Test](testing.Test.md).[construtor](testing.Test.md#construtor)

#### Defined in

[testing/index.ts:98](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L98)

___

### define

▸ **define**(`label`, `test?`): `void`

Define a new test

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `label` | `string` | `undefined` | the label for the test |
| `test` | [`Test`](testing.Test.md) | `null` | the test instance |

#### Returns

`void`

#### Inherited from

[Test](testing.Test.md).[define](testing.Test.md#define)

#### Defined in

[testing/index.ts:141](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L141)

___

### describe

▸ **describe**(): `void`

Executes during just after before has been executed

#### Returns

`void`

#### Overrides

[Test](testing.Test.md).[describe](testing.Test.md#describe)

#### Defined in

[testing/server/redis.ts:47](https://github.com/onzag/itemize/blob/73e0c39e/testing/server/redis.ts#L47)

___

### info

▸ **info**(`txt`): `WarnHandle`

Provides information during the test

#### Parameters

| Name | Type |
| :------ | :------ |
| `txt` | `string` |

#### Returns

`WarnHandle`

#### Inherited from

[Test](testing.Test.md).[info](testing.Test.md#info)

#### Defined in

[testing/index.ts:211](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L211)

___

### it

▸ **it**(`label`, `fn?`): `ItHandle`

Define a new assertion

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `label` | `string` | `undefined` | the label for the assertion |
| `fn` | () => `void` \| `PromiseLike`\<`void`\> | `null` | the assetion to execute |

#### Returns

`ItHandle`

#### Inherited from

[Test](testing.Test.md).[it](testing.Test.md#it)

#### Defined in

[testing/index.ts:157](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L157)

___

### quit

▸ **quit**(): `void`

Quits this test

#### Returns

`void`

#### Inherited from

[Test](testing.Test.md).[quit](testing.Test.md#quit)

#### Defined in

[testing/index.ts:278](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L278)

___

### skipAll

▸ **skipAll**(): `void`

Skips all the following IT tests
regardless of layer

#### Returns

`void`

#### Inherited from

[Test](testing.Test.md).[skipAll](testing.Test.md#skipall)

#### Defined in

[testing/index.ts:236](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L236)

___

### skipLayer

▸ **skipLayer**(): `void`

Skip all the tests that are
on the same layer only

because .it and .step can be nested
inside others, and they count as their own child layer

#### Returns

`void`

#### Inherited from

[Test](testing.Test.md).[skipLayer](testing.Test.md#skiplayer)

#### Defined in

[testing/index.ts:253](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L253)

___

### skipNext

▸ **skipNext**(): `void`

Skip all the next IT tests
they should be on the same layer
it will not skip what's on a deeper layer

#### Returns

`void`

#### Inherited from

[Test](testing.Test.md).[skipNext](testing.Test.md#skipnext)

#### Defined in

[testing/index.ts:222](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L222)

___

### step

▸ **step**(`fn?`): `ItHandle`

Defines a new step, works similar
to defining an assertion but it has no label
and is just a singular hidden step

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `fn` | () => `void` \| `PromiseLike`\<`void`\> | `null` |

#### Returns

`ItHandle`

#### Inherited from

[Test](testing.Test.md).[step](testing.Test.md#step)

#### Defined in

[testing/index.ts:178](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L178)

___

### wait

▸ **wait**(`ms`): `Promise`\<`void`\>

Helper function to wait

#### Parameters

| Name | Type |
| :------ | :------ |
| `ms` | `number` |

#### Returns

`Promise`\<`void`\>

#### Inherited from

[Test](testing.Test.md).[wait](testing.Test.md#wait)

#### Defined in

[testing/index.ts:269](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L269)

___

### warn

▸ **warn**(`txt`): `WarnHandle`

Warns during the test

#### Parameters

| Name | Type |
| :------ | :------ |
| `txt` | `string` |

#### Returns

`WarnHandle`

#### Inherited from

[Test](testing.Test.md).[warn](testing.Test.md#warn)

#### Defined in

[testing/index.ts:195](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L195)
