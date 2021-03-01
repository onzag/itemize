[](../README.md) / [Exports](../modules.md) / [testing/server](../modules/testing_server.md) / ServerTest

# Class: ServerTest

[testing/server](../modules/testing_server.md).ServerTest

## Hierarchy

* [*Test*](testing.test.md)

  ↳ **ServerTest**

## Table of contents

### Constructors

- [constructor](testing_server.servertest.md#constructor)

### Properties

- [databaseConnection](testing_server.servertest.md#databaseconnection)
- [fullHost](testing_server.servertest.md#fullhost)
- [host](testing_server.servertest.md#host)
- [https](testing_server.servertest.md#https)
- [port](testing_server.servertest.md#port)
- [testingInfo](testing_server.servertest.md#testinginfo)
- [testingUserInfo](testing_server.servertest.md#testinguserinfo)

### Methods

- [after](testing_server.servertest.md#after)
- [before](testing_server.servertest.md#before)
- [construtor](testing_server.servertest.md#construtor)
- [define](testing_server.servertest.md#define)
- [describe](testing_server.servertest.md#describe)
- [info](testing_server.servertest.md#info)
- [it](testing_server.servertest.md#it)
- [quit](testing_server.servertest.md#quit)
- [skipAll](testing_server.servertest.md#skipall)
- [skipLayer](testing_server.servertest.md#skiplayer)
- [skipNext](testing_server.servertest.md#skipnext)
- [step](testing_server.servertest.md#step)
- [wait](testing_server.servertest.md#wait)
- [warn](testing_server.servertest.md#warn)

## Constructors

### constructor

\+ **new ServerTest**(`https`: *boolean*, `host`: *string*, `port`: *string* \| *number*, `testingInfo`: [*ITestingInfoType*](../interfaces/testing_itemize.itestinginfotype.md)): [*ServerTest*](testing_server.servertest.md)

#### Parameters:

Name | Type |
:------ | :------ |
`https` | *boolean* |
`host` | *string* |
`port` | *string* \| *number* |
`testingInfo` | [*ITestingInfoType*](../interfaces/testing_itemize.itestinginfotype.md) |

**Returns:** [*ServerTest*](testing_server.servertest.md)

Inherited from: [Test](testing.test.md)

Defined in: [testing/server/index.ts:36](https://github.com/onzag/itemize/blob/5fcde7cf/testing/server/index.ts#L36)

## Properties

### databaseConnection

• `Private` **databaseConnection**: [*DatabaseConnection*](database.databaseconnection.md)

Defined in: [testing/server/index.ts:33](https://github.com/onzag/itemize/blob/5fcde7cf/testing/server/index.ts#L33)

___

### fullHost

• `Private` **fullHost**: *string*

Defined in: [testing/server/index.ts:34](https://github.com/onzag/itemize/blob/5fcde7cf/testing/server/index.ts#L34)

___

### host

• `Private` **host**: *string*

Defined in: [testing/server/index.ts:29](https://github.com/onzag/itemize/blob/5fcde7cf/testing/server/index.ts#L29)

___

### https

• `Private` **https**: *boolean*

Defined in: [testing/server/index.ts:31](https://github.com/onzag/itemize/blob/5fcde7cf/testing/server/index.ts#L31)

___

### port

• `Private` **port**: *string* \| *number*

Defined in: [testing/server/index.ts:30](https://github.com/onzag/itemize/blob/5fcde7cf/testing/server/index.ts#L30)

___

### testingInfo

• `Private` **testingInfo**: [*ITestingInfoType*](../interfaces/testing_itemize.itestinginfotype.md)

Defined in: [testing/server/index.ts:28](https://github.com/onzag/itemize/blob/5fcde7cf/testing/server/index.ts#L28)

___

### testingUserInfo

• `Private` **testingUserInfo**: [*IUserInfoAndTokensForTesting*](../interfaces/testing_server.iuserinfoandtokensfortesting.md)

Defined in: [testing/server/index.ts:36](https://github.com/onzag/itemize/blob/5fcde7cf/testing/server/index.ts#L36)

## Methods

### after

▸ **after**(): *any*

Executes after everything is done
use for cleanup

**`override`** 

**Returns:** *any*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:105](https://github.com/onzag/itemize/blob/5fcde7cf/testing/index.ts#L105)

___

### before

▸ **before**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Overrides: [Test](testing.test.md)

Defined in: [testing/server/index.ts:46](https://github.com/onzag/itemize/blob/5fcde7cf/testing/server/index.ts#L46)

___

### construtor

▸ **construtor**(): *void*

Build a brand new instance

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:71](https://github.com/onzag/itemize/blob/5fcde7cf/testing/index.ts#L71)

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

Defined in: [testing/index.ts:114](https://github.com/onzag/itemize/blob/5fcde7cf/testing/index.ts#L114)

___

### describe

▸ **describe**(): *void*

**Returns:** *void*

Overrides: [Test](testing.test.md)

Defined in: [testing/server/index.ts:139](https://github.com/onzag/itemize/blob/5fcde7cf/testing/server/index.ts#L139)

___

### info

▸ **info**(`txt`: *string*): *WarnHandle*

#### Parameters:

Name | Type |
:------ | :------ |
`txt` | *string* |

**Returns:** *WarnHandle*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:162](https://github.com/onzag/itemize/blob/5fcde7cf/testing/index.ts#L162)

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

Defined in: [testing/index.ts:129](https://github.com/onzag/itemize/blob/5fcde7cf/testing/index.ts#L129)

___

### quit

▸ **quit**(): *void*

Quits this test

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:220](https://github.com/onzag/itemize/blob/5fcde7cf/testing/index.ts#L220)

___

### skipAll

▸ **skipAll**(): *void*

Skips all the following IT tests
and by all it means all of them

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:186](https://github.com/onzag/itemize/blob/5fcde7cf/testing/index.ts#L186)

___

### skipLayer

▸ **skipLayer**(): *void*

Skip all the tests that are
on the same layer following
this

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:201](https://github.com/onzag/itemize/blob/5fcde7cf/testing/index.ts#L201)

___

### skipNext

▸ **skipNext**(): *void*

Skip all the next IT tests
they should be on the same layer

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:172](https://github.com/onzag/itemize/blob/5fcde7cf/testing/index.ts#L172)

___

### step

▸ **step**(`fn?`: () => *void* \| *PromiseLike*<void\>): *ItHandle*

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`fn` | () => *void* \| *PromiseLike*<void\> | null |

**Returns:** *ItHandle*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:141](https://github.com/onzag/itemize/blob/5fcde7cf/testing/index.ts#L141)

___

### wait

▸ **wait**(`ms`: *number*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`ms` | *number* |

**Returns:** *Promise*<void\>

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:211](https://github.com/onzag/itemize/blob/5fcde7cf/testing/index.ts#L211)

___

### warn

▸ **warn**(`txt`: *string*): *WarnHandle*

#### Parameters:

Name | Type |
:------ | :------ |
`txt` | *string* |

**Returns:** *WarnHandle*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:152](https://github.com/onzag/itemize/blob/5fcde7cf/testing/index.ts#L152)
