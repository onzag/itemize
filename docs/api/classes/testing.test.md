[](../README.md) / [Exports](../modules.md) / [testing](../modules/testing.md) / Test

# Class: Test

[testing](../modules/testing.md).Test

Defines a test, and it should be used as an entry
for all subtests

## Hierarchy

* **Test**

  ↳ [*ExplorerText*](testing_client_explorer.explorertext.md)

  ↳ [*ClientTest*](testing_client.clienttest.md)

  ↳ [*ItemizeTest*](testing_itemize.itemizetest.md)

  ↳ [*DatabaseTest*](testing_server_database.databasetest.md)

  ↳ [*GraphqlTest*](testing_server_graphql.graphqltest.md)

  ↳ [*ServerTest*](testing_server.servertest.md)

  ↳ [*RedisTest*](testing_server_redis.redistest.md)

  ↳ [*RobotsTest*](testing_server_robots.robotstest.md)

  ↳ [*TokenTest*](testing_server_token.tokentest.md)

## Table of contents

### Constructors

- [constructor](testing.test.md#constructor)

### Properties

- [currentStep](testing.test.md#currentstep)
- [describeQueue](testing.test.md#describequeue)
- [doSkipAll](testing.test.md#doskipall)
- [doSkipLayer](testing.test.md#doskiplayer)
- [doSkipNext](testing.test.md#doskipnext)
- [doStop](testing.test.md#dostop)
- [itQueue](testing.test.md#itqueue)
- [warningQueue](testing.test.md#warningqueue)

### Methods

- [after](testing.test.md#after)
- [before](testing.test.md#before)
- [construtor](testing.test.md#construtor)
- [define](testing.test.md#define)
- [describe](testing.test.md#describe)
- [execute](testing.test.md#execute)
- [executeIts](testing.test.md#executeits)
- [info](testing.test.md#info)
- [it](testing.test.md#it)
- [quit](testing.test.md#quit)
- [skipAll](testing.test.md#skipall)
- [skipLayer](testing.test.md#skiplayer)
- [skipNext](testing.test.md#skipnext)
- [step](testing.test.md#step)
- [wait](testing.test.md#wait)
- [warn](testing.test.md#warn)

## Constructors

### constructor

\+ **new Test**(): [*Test*](testing.test.md)

**Returns:** [*Test*](testing.test.md)

## Properties

### currentStep

• `Private` **currentStep**: *after* \| *it* \| *describe* \| *before*= null

Defined in: [testing/index.ts:66](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L66)

___

### describeQueue

• `Private` **describeQueue**: { `label`: *string* ; `test`: [*Test*](testing.test.md)  }[]

Defined in: [testing/index.ts:57](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L57)

___

### doSkipAll

• `Private` **doSkipAll**: *boolean*= false

Defined in: [testing/index.ts:63](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L63)

___

### doSkipLayer

• `Private` **doSkipLayer**: *boolean*= false

Defined in: [testing/index.ts:64](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L64)

___

### doSkipNext

• `Private` **doSkipNext**: *boolean*= false

Defined in: [testing/index.ts:62](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L62)

___

### doStop

• `Private` **doStop**: *boolean*= false

Defined in: [testing/index.ts:65](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L65)

___

### itQueue

• `Private` **itQueue**: *ItHandle*[]

Defined in: [testing/index.ts:56](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L56)

___

### warningQueue

• `Private` **warningQueue**: *WarnHandle*[]

Defined in: [testing/index.ts:61](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L61)

## Methods

### after

▸ **after**(): *any*

Executes after everything is done
use for cleanup

**`override`** 

**Returns:** *any*

Defined in: [testing/index.ts:105](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L105)

___

### before

▸ **before**(): *any*

Executes before, override this function
it allows you to dinamically add tests as
well

**`override`** 

**Returns:** *any*

Defined in: [testing/index.ts:88](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L88)

___

### construtor

▸ **construtor**(): *void*

Build a brand new instance

**Returns:** *void*

Defined in: [testing/index.ts:71](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L71)

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

Defined in: [testing/index.ts:114](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L114)

___

### describe

▸ **describe**(): *any*

Executes during just after before has been executed

**`override`** 

**Returns:** *any*

Defined in: [testing/index.ts:96](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L96)

___

### execute

▸ `Private`**execute**(`level?`: *number*): *Promise*<{ `passed`: *number* ; `total`: *number* ; `warnings`: *number*  }\>

Executes the test

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`level` | *number* | 0 |

**Returns:** *Promise*<{ `passed`: *number* ; `total`: *number* ; `warnings`: *number*  }\>

Defined in: [testing/index.ts:340](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L340)

___

### executeIts

▸ `Private`**executeIts**(`level`: *number*): *Promise*<{ `passed`: *number* ; `total`: *number* ; `warnings`: *number*  }\>

#### Parameters:

Name | Type |
:------ | :------ |
`level` | *number* |

**Returns:** *Promise*<{ `passed`: *number* ; `total`: *number* ; `warnings`: *number*  }\>

Defined in: [testing/index.ts:224](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L224)

___

### info

▸ **info**(`txt`: *string*): *WarnHandle*

#### Parameters:

Name | Type |
:------ | :------ |
`txt` | *string* |

**Returns:** *WarnHandle*

Defined in: [testing/index.ts:162](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L162)

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

Defined in: [testing/index.ts:129](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L129)

___

### quit

▸ **quit**(): *void*

Quits this test

**Returns:** *void*

Defined in: [testing/index.ts:220](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L220)

___

### skipAll

▸ **skipAll**(): *void*

Skips all the following IT tests
and by all it means all of them

**Returns:** *void*

Defined in: [testing/index.ts:186](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L186)

___

### skipLayer

▸ **skipLayer**(): *void*

Skip all the tests that are
on the same layer following
this

**Returns:** *void*

Defined in: [testing/index.ts:201](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L201)

___

### skipNext

▸ **skipNext**(): *void*

Skip all the next IT tests
they should be on the same layer

**Returns:** *void*

Defined in: [testing/index.ts:172](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L172)

___

### step

▸ **step**(`fn?`: () => *void* \| *PromiseLike*<void\>): *ItHandle*

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`fn` | () => *void* \| *PromiseLike*<void\> | null |

**Returns:** *ItHandle*

Defined in: [testing/index.ts:141](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L141)

___

### wait

▸ **wait**(`ms`: *number*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`ms` | *number* |

**Returns:** *Promise*<void\>

Defined in: [testing/index.ts:211](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L211)

___

### warn

▸ **warn**(`txt`: *string*): *WarnHandle*

#### Parameters:

Name | Type |
:------ | :------ |
`txt` | *string* |

**Returns:** *WarnHandle*

Defined in: [testing/index.ts:152](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L152)
