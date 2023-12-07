[@onzag/itemize](../README.md) / [Modules](../modules.md) / [testing](../modules/testing.md) / Test

# Class: Test

[testing](../modules/testing.md).Test

Defines a test, and it should be used as an entry
for all subtests

## Hierarchy

- **`Test`**

  ↳ [`ExplorerText`](testing_client_explorer.ExplorerText.md)

  ↳ [`ClientTest`](testing_client.ClientTest.md)

  ↳ [`ItemizeTest`](testing_itemize.ItemizeTest.md)

  ↳ [`DatabaseTest`](testing_server_database.DatabaseTest.md)

  ↳ [`GraphqlTest`](testing_server_graphql.GraphqlTest.md)

  ↳ [`ServerTest`](testing_server.ServerTest.md)

  ↳ [`RedisTest`](testing_server_redis.RedisTest.md)

  ↳ [`RobotsTest`](testing_server_robots.RobotsTest.md)

  ↳ [`TokenTest`](testing_server_token.TokenTest.md)

## Table of contents

### Constructors

- [constructor](testing.Test.md#constructor)

### Properties

- [currentStep](testing.Test.md#currentstep)
- [describeQueue](testing.Test.md#describequeue)
- [doSkipAll](testing.Test.md#doskipall)
- [doSkipLayer](testing.Test.md#doskiplayer)
- [doSkipNext](testing.Test.md#doskipnext)
- [doStop](testing.Test.md#dostop)
- [itQueue](testing.Test.md#itqueue)
- [warningQueue](testing.Test.md#warningqueue)

### Methods

- [after](testing.Test.md#after)
- [before](testing.Test.md#before)
- [construtor](testing.Test.md#construtor)
- [define](testing.Test.md#define)
- [describe](testing.Test.md#describe)
- [execute](testing.Test.md#execute)
- [executeIts](testing.Test.md#executeits)
- [info](testing.Test.md#info)
- [it](testing.Test.md#it)
- [quit](testing.Test.md#quit)
- [skipAll](testing.Test.md#skipall)
- [skipLayer](testing.Test.md#skiplayer)
- [skipNext](testing.Test.md#skipnext)
- [step](testing.Test.md#step)
- [wait](testing.Test.md#wait)
- [warn](testing.Test.md#warn)

## Constructors

### constructor

• **new Test**()

## Properties

### currentStep

• `Private` **currentStep**: ``"it"`` \| ``"describe"`` \| ``"before"`` \| ``"after"`` = `null`

#### Defined in

[testing/index.ts:66](https://github.com/onzag/itemize/blob/a24376ed/testing/index.ts#L66)

___

### describeQueue

• `Private` **describeQueue**: { `label`: `string` ; `test`: [`Test`](testing.Test.md)  }[]

#### Defined in

[testing/index.ts:57](https://github.com/onzag/itemize/blob/a24376ed/testing/index.ts#L57)

___

### doSkipAll

• `Private` **doSkipAll**: `boolean` = `false`

#### Defined in

[testing/index.ts:63](https://github.com/onzag/itemize/blob/a24376ed/testing/index.ts#L63)

___

### doSkipLayer

• `Private` **doSkipLayer**: `boolean` = `false`

#### Defined in

[testing/index.ts:64](https://github.com/onzag/itemize/blob/a24376ed/testing/index.ts#L64)

___

### doSkipNext

• `Private` **doSkipNext**: `boolean` = `false`

#### Defined in

[testing/index.ts:62](https://github.com/onzag/itemize/blob/a24376ed/testing/index.ts#L62)

___

### doStop

• `Private` **doStop**: `boolean` = `false`

#### Defined in

[testing/index.ts:65](https://github.com/onzag/itemize/blob/a24376ed/testing/index.ts#L65)

___

### itQueue

• `Private` **itQueue**: `ItHandle`[]

#### Defined in

[testing/index.ts:56](https://github.com/onzag/itemize/blob/a24376ed/testing/index.ts#L56)

___

### warningQueue

• `Private` **warningQueue**: `WarnHandle`[]

#### Defined in

[testing/index.ts:61](https://github.com/onzag/itemize/blob/a24376ed/testing/index.ts#L61)

## Methods

### after

▸ **after**(): `any`

Executes after everything is done
use for cleanup

**`override`**

#### Returns

`any`

#### Defined in

[testing/index.ts:105](https://github.com/onzag/itemize/blob/a24376ed/testing/index.ts#L105)

___

### before

▸ **before**(): `any`

Executes before, override this function
it allows you to dinamically add tests as
well

**`override`**

#### Returns

`any`

#### Defined in

[testing/index.ts:88](https://github.com/onzag/itemize/blob/a24376ed/testing/index.ts#L88)

___

### construtor

▸ **construtor**(): `void`

Build a brand new instance

#### Returns

`void`

#### Defined in

[testing/index.ts:71](https://github.com/onzag/itemize/blob/a24376ed/testing/index.ts#L71)

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

#### Defined in

[testing/index.ts:114](https://github.com/onzag/itemize/blob/a24376ed/testing/index.ts#L114)

___

### describe

▸ **describe**(): `any`

Executes during just after before has been executed

**`override`**

#### Returns

`any`

#### Defined in

[testing/index.ts:96](https://github.com/onzag/itemize/blob/a24376ed/testing/index.ts#L96)

___

### execute

▸ `Private` **execute**(`level?`): `Promise`<{ `passed`: `number` ; `total`: `number` ; `warnings`: `number`  }\>

Executes the test

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `level` | `number` | `0` |

#### Returns

`Promise`<{ `passed`: `number` ; `total`: `number` ; `warnings`: `number`  }\>

#### Defined in

[testing/index.ts:340](https://github.com/onzag/itemize/blob/a24376ed/testing/index.ts#L340)

___

### executeIts

▸ `Private` **executeIts**(`level`): `Promise`<{ `passed`: `number` ; `total`: `number` ; `warnings`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `level` | `number` |

#### Returns

`Promise`<{ `passed`: `number` ; `total`: `number` ; `warnings`: `number`  }\>

#### Defined in

[testing/index.ts:224](https://github.com/onzag/itemize/blob/a24376ed/testing/index.ts#L224)

___

### info

▸ **info**(`txt`): `WarnHandle`

#### Parameters

| Name | Type |
| :------ | :------ |
| `txt` | `string` |

#### Returns

`WarnHandle`

#### Defined in

[testing/index.ts:162](https://github.com/onzag/itemize/blob/a24376ed/testing/index.ts#L162)

___

### it

▸ **it**(`label`, `fn?`): `ItHandle`

Define a new assertion

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `label` | `string` | `undefined` | the label for the assertion |
| `fn` | () => `void` \| `PromiseLike`<`void`\> | `null` | the assetion to execute |

#### Returns

`ItHandle`

#### Defined in

[testing/index.ts:129](https://github.com/onzag/itemize/blob/a24376ed/testing/index.ts#L129)

___

### quit

▸ **quit**(): `void`

Quits this test

#### Returns

`void`

#### Defined in

[testing/index.ts:220](https://github.com/onzag/itemize/blob/a24376ed/testing/index.ts#L220)

___

### skipAll

▸ **skipAll**(): `void`

Skips all the following IT tests
and by all it means all of them

#### Returns

`void`

#### Defined in

[testing/index.ts:186](https://github.com/onzag/itemize/blob/a24376ed/testing/index.ts#L186)

___

### skipLayer

▸ **skipLayer**(): `void`

Skip all the tests that are
on the same layer following
this

#### Returns

`void`

#### Defined in

[testing/index.ts:201](https://github.com/onzag/itemize/blob/a24376ed/testing/index.ts#L201)

___

### skipNext

▸ **skipNext**(): `void`

Skip all the next IT tests
they should be on the same layer

#### Returns

`void`

#### Defined in

[testing/index.ts:172](https://github.com/onzag/itemize/blob/a24376ed/testing/index.ts#L172)

___

### step

▸ **step**(`fn?`): `ItHandle`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `fn` | () => `void` \| `PromiseLike`<`void`\> | `null` |

#### Returns

`ItHandle`

#### Defined in

[testing/index.ts:141](https://github.com/onzag/itemize/blob/a24376ed/testing/index.ts#L141)

___

### wait

▸ **wait**(`ms`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ms` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[testing/index.ts:211](https://github.com/onzag/itemize/blob/a24376ed/testing/index.ts#L211)

___

### warn

▸ **warn**(`txt`): `WarnHandle`

#### Parameters

| Name | Type |
| :------ | :------ |
| `txt` | `string` |

#### Returns

`WarnHandle`

#### Defined in

[testing/index.ts:152](https://github.com/onzag/itemize/blob/a24376ed/testing/index.ts#L152)
