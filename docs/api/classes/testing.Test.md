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

  ↳ [`ServerTest`](testing_server.ServerTest.md)

  ↳ [`RedisTest`](testing_server_redis.RedisTest.md)

  ↳ [`RobotsTest`](testing_server_robots.RobotsTest.md)

  ↳ [`RQTest`](testing_server_rq.RQTest.md)

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

• **new Test**(): [`Test`](testing.Test.md)

#### Returns

[`Test`](testing.Test.md)

## Properties

### currentStep

• `Private` **currentStep**: ``"it"`` \| ``"after"`` \| ``"before"`` \| ``"describe"`` = `null`

#### Defined in

[testing/index.ts:93](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L93)

___

### describeQueue

• `Private` **describeQueue**: \{ `label`: `string` ; `test`: [`Test`](testing.Test.md)  }[]

This queue contains the description of subtests
that are added to the test

#### Defined in

[testing/index.ts:67](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L67)

___

### doSkipAll

• `Private` **doSkipAll**: `boolean` = `false`

Specifies that all subsequent step from the itQueue
should be cancelled

#### Defined in

[testing/index.ts:90](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L90)

___

### doSkipLayer

• `Private` **doSkipLayer**: `boolean` = `false`

#### Defined in

[testing/index.ts:91](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L91)

___

### doSkipNext

• `Private` **doSkipNext**: `boolean` = `false`

Specifies that the next step from the itQueue
should be cancelled

#### Defined in

[testing/index.ts:84](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L84)

___

### doStop

• `Private` **doStop**: `boolean` = `false`

#### Defined in

[testing/index.ts:92](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L92)

___

### itQueue

• `Private` **itQueue**: `ItHandle`[]

This queue contains in order
all the it definitions as well as steps
to execute during the test

#### Defined in

[testing/index.ts:61](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L61)

___

### warningQueue

• `Private` **warningQueue**: `WarnHandle`[]

This queue contains the list of warnings added
during the execution of the test, the warnings
are reset each time a new step from the
itQueue is executed

#### Defined in

[testing/index.ts:78](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L78)

## Methods

### after

▸ **after**(): `any`

Executes after everything is done
use for cleanup

#### Returns

`any`

#### Defined in

[testing/index.ts:132](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L132)

___

### before

▸ **before**(): `any`

Executes before, override this function
it allows you to dinamically add tests as
well

#### Returns

`any`

#### Defined in

[testing/index.ts:115](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L115)

___

### construtor

▸ **construtor**(): `void`

Build a brand new instance

#### Returns

`void`

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

#### Defined in

[testing/index.ts:141](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L141)

___

### describe

▸ **describe**(): `any`

Executes during just after before has been executed

#### Returns

`any`

#### Defined in

[testing/index.ts:123](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L123)

___

### execute

▸ **execute**(`level?`): `Promise`\<\{ `passed`: `number` ; `total`: `number` ; `warnings`: `number`  }\>

Executes the test

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `level` | `number` | `0` |

#### Returns

`Promise`\<\{ `passed`: `number` ; `total`: `number` ; `warnings`: `number`  }\>

#### Defined in

[testing/index.ts:433](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L433)

___

### executeIts

▸ **executeIts**(`level`): `Promise`\<\{ `passed`: `number` ; `total`: `number` ; `warnings`: `number`  }\>

Executes all the it available from
the it queue

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `level` | `number` | basically the number of tabs to use |

#### Returns

`Promise`\<\{ `passed`: `number` ; `total`: `number` ; `warnings`: `number`  }\>

#### Defined in

[testing/index.ts:289](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L289)

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

#### Defined in

[testing/index.ts:157](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L157)

___

### quit

▸ **quit**(): `void`

Quits this test

#### Returns

`void`

#### Defined in

[testing/index.ts:278](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L278)

___

### skipAll

▸ **skipAll**(): `void`

Skips all the following IT tests
regardless of layer

#### Returns

`void`

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

#### Defined in

[testing/index.ts:195](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L195)
