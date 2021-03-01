[](../README.md) / [Exports](../modules.md) / [testing/client](../modules/testing_client.md) / ClientTest

# Class: ClientTest

[testing/client](../modules/testing_client.md).ClientTest

## Hierarchy

* [*Test*](testing.test.md)

  ↳ **ClientTest**

## Table of contents

### Constructors

- [constructor](testing_client.clienttest.md#constructor)

### Properties

- [fullHost](testing_client.clienttest.md#fullhost)
- [host](testing_client.clienttest.md#host)
- [https](testing_client.clienttest.md#https)
- [port](testing_client.clienttest.md#port)
- [puppet](testing_client.clienttest.md#puppet)
- [testingInfo](testing_client.clienttest.md#testinginfo)

### Methods

- [after](testing_client.clienttest.md#after)
- [before](testing_client.clienttest.md#before)
- [construtor](testing_client.clienttest.md#construtor)
- [define](testing_client.clienttest.md#define)
- [describe](testing_client.clienttest.md#describe)
- [info](testing_client.clienttest.md#info)
- [it](testing_client.clienttest.md#it)
- [quit](testing_client.clienttest.md#quit)
- [skipAll](testing_client.clienttest.md#skipall)
- [skipLayer](testing_client.clienttest.md#skiplayer)
- [skipNext](testing_client.clienttest.md#skipnext)
- [step](testing_client.clienttest.md#step)
- [wait](testing_client.clienttest.md#wait)
- [warn](testing_client.clienttest.md#warn)

## Constructors

### constructor

\+ **new ClientTest**(`https`: *boolean*, `host`: *string*, `port`: *string* \| *number*, `testingInfo`: [*ITestingInfoType*](../interfaces/testing_itemize.itestinginfotype.md), `puppet`: *Browser*): [*ClientTest*](testing_client.clienttest.md)

#### Parameters:

Name | Type |
:------ | :------ |
`https` | *boolean* |
`host` | *string* |
`port` | *string* \| *number* |
`testingInfo` | [*ITestingInfoType*](../interfaces/testing_itemize.itestinginfotype.md) |
`puppet` | *Browser* |

**Returns:** [*ClientTest*](testing_client.clienttest.md)

Inherited from: [Test](testing.test.md)

Defined in: [testing/client/index.ts:16](https://github.com/onzag/itemize/blob/0569bdf2/testing/client/index.ts#L16)

## Properties

### fullHost

• `Private` **fullHost**: *string*

Defined in: [testing/client/index.ts:16](https://github.com/onzag/itemize/blob/0569bdf2/testing/client/index.ts#L16)

___

### host

• `Private` **host**: *string*

Defined in: [testing/client/index.ts:11](https://github.com/onzag/itemize/blob/0569bdf2/testing/client/index.ts#L11)

___

### https

• `Private` **https**: *boolean*

Defined in: [testing/client/index.ts:13](https://github.com/onzag/itemize/blob/0569bdf2/testing/client/index.ts#L13)

___

### port

• `Private` **port**: *string* \| *number*

Defined in: [testing/client/index.ts:12](https://github.com/onzag/itemize/blob/0569bdf2/testing/client/index.ts#L12)

___

### puppet

• `Private` **puppet**: *Browser*

Defined in: [testing/client/index.ts:14](https://github.com/onzag/itemize/blob/0569bdf2/testing/client/index.ts#L14)

___

### testingInfo

• `Private` **testingInfo**: [*ITestingInfoType*](../interfaces/testing_itemize.itestinginfotype.md)

Defined in: [testing/client/index.ts:10](https://github.com/onzag/itemize/blob/0569bdf2/testing/client/index.ts#L10)

## Methods

### after

▸ **after**(): *void*

**Returns:** *void*

Overrides: [Test](testing.test.md)

Defined in: [testing/client/index.ts:52](https://github.com/onzag/itemize/blob/0569bdf2/testing/client/index.ts#L52)

___

### before

▸ **before**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Overrides: [Test](testing.test.md)

Defined in: [testing/client/index.ts:34](https://github.com/onzag/itemize/blob/0569bdf2/testing/client/index.ts#L34)

___

### construtor

▸ **construtor**(): *void*

Build a brand new instance

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:71](https://github.com/onzag/itemize/blob/0569bdf2/testing/index.ts#L71)

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

Defined in: [testing/index.ts:114](https://github.com/onzag/itemize/blob/0569bdf2/testing/index.ts#L114)

___

### describe

▸ **describe**(): *void*

**Returns:** *void*

Overrides: [Test](testing.test.md)

Defined in: [testing/client/index.ts:38](https://github.com/onzag/itemize/blob/0569bdf2/testing/client/index.ts#L38)

___

### info

▸ **info**(`txt`: *string*): *WarnHandle*

#### Parameters:

Name | Type |
:------ | :------ |
`txt` | *string* |

**Returns:** *WarnHandle*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:162](https://github.com/onzag/itemize/blob/0569bdf2/testing/index.ts#L162)

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

Defined in: [testing/index.ts:129](https://github.com/onzag/itemize/blob/0569bdf2/testing/index.ts#L129)

___

### quit

▸ **quit**(): *void*

Quits this test

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:220](https://github.com/onzag/itemize/blob/0569bdf2/testing/index.ts#L220)

___

### skipAll

▸ **skipAll**(): *void*

Skips all the following IT tests
and by all it means all of them

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:186](https://github.com/onzag/itemize/blob/0569bdf2/testing/index.ts#L186)

___

### skipLayer

▸ **skipLayer**(): *void*

Skip all the tests that are
on the same layer following
this

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:201](https://github.com/onzag/itemize/blob/0569bdf2/testing/index.ts#L201)

___

### skipNext

▸ **skipNext**(): *void*

Skip all the next IT tests
they should be on the same layer

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:172](https://github.com/onzag/itemize/blob/0569bdf2/testing/index.ts#L172)

___

### step

▸ **step**(`fn?`: () => *void* \| *PromiseLike*<void\>): *ItHandle*

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`fn` | () => *void* \| *PromiseLike*<void\> | null |

**Returns:** *ItHandle*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:141](https://github.com/onzag/itemize/blob/0569bdf2/testing/index.ts#L141)

___

### wait

▸ **wait**(`ms`: *number*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`ms` | *number* |

**Returns:** *Promise*<void\>

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:211](https://github.com/onzag/itemize/blob/0569bdf2/testing/index.ts#L211)

___

### warn

▸ **warn**(`txt`: *string*): *WarnHandle*

#### Parameters:

Name | Type |
:------ | :------ |
`txt` | *string* |

**Returns:** *WarnHandle*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:152](https://github.com/onzag/itemize/blob/0569bdf2/testing/index.ts#L152)
