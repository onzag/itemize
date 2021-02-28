[](../README.md) / [Exports](../modules.md) / [testing/itemize](../modules/testing_itemize.md) / ItemizeTest

# Class: ItemizeTest

[testing/itemize](../modules/testing_itemize.md).ItemizeTest

## Hierarchy

* [*Test*](testing.test.md)

  ↳ **ItemizeTest**

## Table of contents

### Constructors

- [constructor](testing_itemize.itemizetest.md#constructor)

### Properties

- [host](testing_itemize.itemizetest.md#host)
- [https](testing_itemize.itemizetest.md#https)
- [port](testing_itemize.itemizetest.md#port)
- [puppet](testing_itemize.itemizetest.md#puppet)
- [testingInfo](testing_itemize.itemizetest.md#testinginfo)

### Methods

- [after](testing_itemize.itemizetest.md#after)
- [before](testing_itemize.itemizetest.md#before)
- [construtor](testing_itemize.itemizetest.md#construtor)
- [define](testing_itemize.itemizetest.md#define)
- [describe](testing_itemize.itemizetest.md#describe)
- [info](testing_itemize.itemizetest.md#info)
- [it](testing_itemize.itemizetest.md#it)
- [quit](testing_itemize.itemizetest.md#quit)
- [skipAll](testing_itemize.itemizetest.md#skipall)
- [skipLayer](testing_itemize.itemizetest.md#skiplayer)
- [skipNext](testing_itemize.itemizetest.md#skipnext)
- [step](testing_itemize.itemizetest.md#step)
- [wait](testing_itemize.itemizetest.md#wait)
- [warn](testing_itemize.itemizetest.md#warn)

## Constructors

### constructor

\+ **new ItemizeTest**(`https`: *boolean*, `host`: *string*, `port`: *string* \| *number*, `puppet`: *Browser*): [*ItemizeTest*](testing_itemize.itemizetest.md)

#### Parameters:

Name | Type |
:------ | :------ |
`https` | *boolean* |
`host` | *string* |
`port` | *string* \| *number* |
`puppet` | *Browser* |

**Returns:** [*ItemizeTest*](testing_itemize.itemizetest.md)

Inherited from: [Test](testing.test.md)

Defined in: [testing/itemize.ts:29](https://github.com/onzag/itemize/blob/11a98dec/testing/itemize.ts#L29)

## Properties

### host

• `Private` **host**: *string*

Defined in: [testing/itemize.ts:26](https://github.com/onzag/itemize/blob/11a98dec/testing/itemize.ts#L26)

___

### https

• `Private` **https**: *boolean*

Defined in: [testing/itemize.ts:25](https://github.com/onzag/itemize/blob/11a98dec/testing/itemize.ts#L25)

___

### port

• `Private` **port**: *string* \| *number*

Defined in: [testing/itemize.ts:27](https://github.com/onzag/itemize/blob/11a98dec/testing/itemize.ts#L27)

___

### puppet

• `Private` **puppet**: *Browser*

Defined in: [testing/itemize.ts:29](https://github.com/onzag/itemize/blob/11a98dec/testing/itemize.ts#L29)

___

### testingInfo

• `Private` **testingInfo**: [*ITestingInfoType*](../interfaces/testing_itemize.itestinginfotype.md)

Defined in: [testing/itemize.ts:28](https://github.com/onzag/itemize/blob/11a98dec/testing/itemize.ts#L28)

## Methods

### after

▸ **after**(): *any*

Executes after everything is done
use for cleanup

**`override`** 

**Returns:** *any*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:105](https://github.com/onzag/itemize/blob/11a98dec/testing/index.ts#L105)

___

### before

▸ **before**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Overrides: [Test](testing.test.md)

Defined in: [testing/itemize.ts:40](https://github.com/onzag/itemize/blob/11a98dec/testing/itemize.ts#L40)

___

### construtor

▸ **construtor**(): *void*

Build a brand new instance

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:71](https://github.com/onzag/itemize/blob/11a98dec/testing/index.ts#L71)

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

Defined in: [testing/index.ts:114](https://github.com/onzag/itemize/blob/11a98dec/testing/index.ts#L114)

___

### describe

▸ **describe**(): *void*

**Returns:** *void*

Overrides: [Test](testing.test.md)

Defined in: [testing/itemize.ts:103](https://github.com/onzag/itemize/blob/11a98dec/testing/itemize.ts#L103)

___

### info

▸ **info**(`txt`: *string*): *WarnHandle*

#### Parameters:

Name | Type |
:------ | :------ |
`txt` | *string* |

**Returns:** *WarnHandle*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:162](https://github.com/onzag/itemize/blob/11a98dec/testing/index.ts#L162)

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

Defined in: [testing/index.ts:129](https://github.com/onzag/itemize/blob/11a98dec/testing/index.ts#L129)

___

### quit

▸ **quit**(): *void*

Quits this test

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:220](https://github.com/onzag/itemize/blob/11a98dec/testing/index.ts#L220)

___

### skipAll

▸ **skipAll**(): *void*

Skips all the following IT tests
and by all it means all of them

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:186](https://github.com/onzag/itemize/blob/11a98dec/testing/index.ts#L186)

___

### skipLayer

▸ **skipLayer**(): *void*

Skip all the tests that are
on the same layer following
this

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:201](https://github.com/onzag/itemize/blob/11a98dec/testing/index.ts#L201)

___

### skipNext

▸ **skipNext**(): *void*

Skip all the next IT tests
they should be on the same layer

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:172](https://github.com/onzag/itemize/blob/11a98dec/testing/index.ts#L172)

___

### step

▸ **step**(`fn?`: () => *void* \| *PromiseLike*<void\>): *ItHandle*

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`fn` | () => *void* \| *PromiseLike*<void\> | null |

**Returns:** *ItHandle*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:141](https://github.com/onzag/itemize/blob/11a98dec/testing/index.ts#L141)

___

### wait

▸ **wait**(`ms`: *number*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`ms` | *number* |

**Returns:** *Promise*<void\>

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:211](https://github.com/onzag/itemize/blob/11a98dec/testing/index.ts#L211)

___

### warn

▸ **warn**(`txt`: *string*): *WarnHandle*

#### Parameters:

Name | Type |
:------ | :------ |
`txt` | *string* |

**Returns:** *WarnHandle*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:152](https://github.com/onzag/itemize/blob/11a98dec/testing/index.ts#L152)
