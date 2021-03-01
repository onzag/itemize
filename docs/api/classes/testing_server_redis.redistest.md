[](../README.md) / [Exports](../modules.md) / [testing/server/redis](../modules/testing_server_redis.md) / RedisTest

# Class: RedisTest

[testing/server/redis](../modules/testing_server_redis.md).RedisTest

## Hierarchy

* [*Test*](testing.test.md)

  ↳ **RedisTest**

## Table of contents

### Constructors

- [constructor](testing_server_redis.redistest.md#constructor)

### Properties

- [databaseConnection](testing_server_redis.redistest.md#databaseconnection)
- [fullHost](testing_server_redis.redistest.md#fullhost)
- [redisClient](testing_server_redis.redistest.md#redisclient)
- [redisGlobalClient](testing_server_redis.redistest.md#redisglobalclient)
- [redisLocalPub](testing_server_redis.redistest.md#redislocalpub)
- [redisLocalSub](testing_server_redis.redistest.md#redislocalsub)
- [redisPub](testing_server_redis.redistest.md#redispub)
- [redisSub](testing_server_redis.redistest.md#redissub)
- [testingInfo](testing_server_redis.redistest.md#testinginfo)
- [testingUserInfo](testing_server_redis.redistest.md#testinguserinfo)

### Methods

- [after](testing_server_redis.redistest.md#after)
- [before](testing_server_redis.redistest.md#before)
- [construtor](testing_server_redis.redistest.md#construtor)
- [define](testing_server_redis.redistest.md#define)
- [describe](testing_server_redis.redistest.md#describe)
- [info](testing_server_redis.redistest.md#info)
- [it](testing_server_redis.redistest.md#it)
- [quit](testing_server_redis.redistest.md#quit)
- [skipAll](testing_server_redis.redistest.md#skipall)
- [skipLayer](testing_server_redis.redistest.md#skiplayer)
- [skipNext](testing_server_redis.redistest.md#skipnext)
- [step](testing_server_redis.redistest.md#step)
- [wait](testing_server_redis.redistest.md#wait)
- [warn](testing_server_redis.redistest.md#warn)

## Constructors

### constructor

\+ **new RedisTest**(`databaseConnection`: [*DatabaseConnection*](database.databaseconnection.md), `testingInfo`: [*ITestingInfoType*](../interfaces/testing_itemize.itestinginfotype.md), `testingUserInfo`: [*IUserInfoAndTokensForTesting*](../interfaces/testing_server.iuserinfoandtokensfortesting.md), `fullHost`: *string*): [*RedisTest*](testing_server_redis.redistest.md)

#### Parameters:

Name | Type |
:------ | :------ |
`databaseConnection` | [*DatabaseConnection*](database.databaseconnection.md) |
`testingInfo` | [*ITestingInfoType*](../interfaces/testing_itemize.itestinginfotype.md) |
`testingUserInfo` | [*IUserInfoAndTokensForTesting*](../interfaces/testing_server.iuserinfoandtokensfortesting.md) |
`fullHost` | *string* |

**Returns:** [*RedisTest*](testing_server_redis.redistest.md)

Inherited from: [Test](testing.test.md)

Defined in: [testing/server/redis.ts:23](https://github.com/onzag/itemize/blob/0e9b128c/testing/server/redis.ts#L23)

## Properties

### databaseConnection

• `Private` **databaseConnection**: [*DatabaseConnection*](database.databaseconnection.md)

Defined in: [testing/server/redis.ts:17](https://github.com/onzag/itemize/blob/0e9b128c/testing/server/redis.ts#L17)

___

### fullHost

• `Private` **fullHost**: *string*

Defined in: [testing/server/redis.ts:15](https://github.com/onzag/itemize/blob/0e9b128c/testing/server/redis.ts#L15)

___

### redisClient

• `Private` **redisClient**: *RedisClient*

Defined in: [testing/server/redis.ts:22](https://github.com/onzag/itemize/blob/0e9b128c/testing/server/redis.ts#L22)

___

### redisGlobalClient

• `Private` **redisGlobalClient**: *RedisClient*

Defined in: [testing/server/redis.ts:23](https://github.com/onzag/itemize/blob/0e9b128c/testing/server/redis.ts#L23)

___

### redisLocalPub

• `Private` **redisLocalPub**: *RedisClient*

Defined in: [testing/server/redis.ts:20](https://github.com/onzag/itemize/blob/0e9b128c/testing/server/redis.ts#L20)

___

### redisLocalSub

• `Private` **redisLocalSub**: *RedisClient*

Defined in: [testing/server/redis.ts:21](https://github.com/onzag/itemize/blob/0e9b128c/testing/server/redis.ts#L21)

___

### redisPub

• `Private` **redisPub**: *RedisClient*

Defined in: [testing/server/redis.ts:18](https://github.com/onzag/itemize/blob/0e9b128c/testing/server/redis.ts#L18)

___

### redisSub

• `Private` **redisSub**: *RedisClient*

Defined in: [testing/server/redis.ts:19](https://github.com/onzag/itemize/blob/0e9b128c/testing/server/redis.ts#L19)

___

### testingInfo

• `Private` **testingInfo**: [*ITestingInfoType*](../interfaces/testing_itemize.itestinginfotype.md)

Defined in: [testing/server/redis.ts:13](https://github.com/onzag/itemize/blob/0e9b128c/testing/server/redis.ts#L13)

___

### testingUserInfo

• `Private` **testingUserInfo**: [*IUserInfoAndTokensForTesting*](../interfaces/testing_server.iuserinfoandtokensfortesting.md)

Defined in: [testing/server/redis.ts:14](https://github.com/onzag/itemize/blob/0e9b128c/testing/server/redis.ts#L14)

## Methods

### after

▸ **after**(): *void*

**Returns:** *void*

Overrides: [Test](testing.test.md)

Defined in: [testing/server/redis.ts:223](https://github.com/onzag/itemize/blob/0e9b128c/testing/server/redis.ts#L223)

___

### before

▸ **before**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Overrides: [Test](testing.test.md)

Defined in: [testing/server/redis.ts:39](https://github.com/onzag/itemize/blob/0e9b128c/testing/server/redis.ts#L39)

___

### construtor

▸ **construtor**(): *void*

Build a brand new instance

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:71](https://github.com/onzag/itemize/blob/0e9b128c/testing/index.ts#L71)

___

### define

▸ **define**(`label`: *string*, `test?`: [*Test*](testing.test.md)): *void*

Define a new test

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`label` | *string* | - | the label for the test   |
`test` | [*Test*](testing.test.md) | null | the test instance    |

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:114](https://github.com/onzag/itemize/blob/0e9b128c/testing/index.ts#L114)

___

### describe

▸ **describe**(): *void*

**Returns:** *void*

Overrides: [Test](testing.test.md)

Defined in: [testing/server/redis.ts:48](https://github.com/onzag/itemize/blob/0e9b128c/testing/server/redis.ts#L48)

___

### info

▸ **info**(`txt`: *string*): *WarnHandle*

#### Parameters:

Name | Type |
:------ | :------ |
`txt` | *string* |

**Returns:** *WarnHandle*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:162](https://github.com/onzag/itemize/blob/0e9b128c/testing/index.ts#L162)

___

### it

▸ **it**(`label`: *string*, `fn?`: () => *void* \| *PromiseLike*<void\>): *ItHandle*

Define a new assertion

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`label` | *string* | - | the label for the assertion   |
`fn` | () => *void* \| *PromiseLike*<void\> | null | the assetion to execute    |

**Returns:** *ItHandle*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:129](https://github.com/onzag/itemize/blob/0e9b128c/testing/index.ts#L129)

___

### quit

▸ **quit**(): *void*

Quits this test

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:220](https://github.com/onzag/itemize/blob/0e9b128c/testing/index.ts#L220)

___

### skipAll

▸ **skipAll**(): *void*

Skips all the following IT tests
and by all it means all of them

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:186](https://github.com/onzag/itemize/blob/0e9b128c/testing/index.ts#L186)

___

### skipLayer

▸ **skipLayer**(): *void*

Skip all the tests that are
on the same layer following
this

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:201](https://github.com/onzag/itemize/blob/0e9b128c/testing/index.ts#L201)

___

### skipNext

▸ **skipNext**(): *void*

Skip all the next IT tests
they should be on the same layer

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:172](https://github.com/onzag/itemize/blob/0e9b128c/testing/index.ts#L172)

___

### step

▸ **step**(`fn?`: () => *void* \| *PromiseLike*<void\>): *ItHandle*

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`fn` | () => *void* \| *PromiseLike*<void\> | null |

**Returns:** *ItHandle*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:141](https://github.com/onzag/itemize/blob/0e9b128c/testing/index.ts#L141)

___

### wait

▸ **wait**(`ms`: *number*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`ms` | *number* |

**Returns:** *Promise*<void\>

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:211](https://github.com/onzag/itemize/blob/0e9b128c/testing/index.ts#L211)

___

### warn

▸ **warn**(`txt`: *string*): *WarnHandle*

#### Parameters:

Name | Type |
:------ | :------ |
`txt` | *string* |

**Returns:** *WarnHandle*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:152](https://github.com/onzag/itemize/blob/0e9b128c/testing/index.ts#L152)
