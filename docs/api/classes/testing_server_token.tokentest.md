[](../README.md) / [Exports](../modules.md) / [testing/server/token](../modules/testing_server_token.md) / TokenTest

# Class: TokenTest

[testing/server/token](../modules/testing_server_token.md).TokenTest

## Hierarchy

* [*Test*](testing.test.md)

  ↳ **TokenTest**

## Table of contents

### Constructors

- [constructor](testing_server_token.tokentest.md#constructor)

### Properties

- [fullHost](testing_server_token.tokentest.md#fullhost)
- [testingUserInfo](testing_server_token.tokentest.md#testinguserinfo)

### Methods

- [after](testing_server_token.tokentest.md#after)
- [before](testing_server_token.tokentest.md#before)
- [construtor](testing_server_token.tokentest.md#construtor)
- [define](testing_server_token.tokentest.md#define)
- [describe](testing_server_token.tokentest.md#describe)
- [info](testing_server_token.tokentest.md#info)
- [it](testing_server_token.tokentest.md#it)
- [quit](testing_server_token.tokentest.md#quit)
- [skipAll](testing_server_token.tokentest.md#skipall)
- [skipLayer](testing_server_token.tokentest.md#skiplayer)
- [skipNext](testing_server_token.tokentest.md#skipnext)
- [step](testing_server_token.tokentest.md#step)
- [wait](testing_server_token.tokentest.md#wait)
- [warn](testing_server_token.tokentest.md#warn)

## Constructors

### constructor

\+ **new TokenTest**(`fullHost`: *string*, `testingUserInfo`: [*IUserInfoAndTokensForTesting*](../interfaces/testing_server.iuserinfoandtokensfortesting.md)): [*TokenTest*](testing_server_token.tokentest.md)

#### Parameters:

Name | Type |
:------ | :------ |
`fullHost` | *string* |
`testingUserInfo` | [*IUserInfoAndTokensForTesting*](../interfaces/testing_server.iuserinfoandtokensfortesting.md) |

**Returns:** [*TokenTest*](testing_server_token.tokentest.md)

Inherited from: [Test](testing.test.md)

Defined in: [testing/server/token.ts:9](https://github.com/onzag/itemize/blob/5fcde7cf/testing/server/token.ts#L9)

## Properties

### fullHost

• `Private` **fullHost**: *string*

Defined in: [testing/server/token.ts:9](https://github.com/onzag/itemize/blob/5fcde7cf/testing/server/token.ts#L9)

___

### testingUserInfo

• `Private` **testingUserInfo**: [*IUserInfoAndTokensForTesting*](../interfaces/testing_server.iuserinfoandtokensfortesting.md)

Defined in: [testing/server/token.ts:8](https://github.com/onzag/itemize/blob/5fcde7cf/testing/server/token.ts#L8)

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

▸ **before**(): *any*

Executes before, override this function
it allows you to dinamically add tests as
well

**`override`** 

**Returns:** *any*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:88](https://github.com/onzag/itemize/blob/5fcde7cf/testing/index.ts#L88)

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

Defined in: [testing/server/token.ts:17](https://github.com/onzag/itemize/blob/5fcde7cf/testing/server/token.ts#L17)

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
