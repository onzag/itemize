[](../README.md) / [Exports](../modules.md) / [testing/server/robots](../modules/testing_server_robots.md) / RobotsTest

# Class: RobotsTest

[testing/server/robots](../modules/testing_server_robots.md).RobotsTest

## Hierarchy

* [*Test*](testing.test.md)

  ↳ **RobotsTest**

## Table of contents

### Constructors

- [constructor](testing_server_robots.robotstest.md#constructor)

### Properties

- [fullHost](testing_server_robots.robotstest.md#fullhost)
- [host](testing_server_robots.robotstest.md#host)
- [https](testing_server_robots.robotstest.md#https)
- [parser](testing_server_robots.robotstest.md#parser)
- [port](testing_server_robots.robotstest.md#port)
- [testingInfo](testing_server_robots.robotstest.md#testinginfo)

### Methods

- [after](testing_server_robots.robotstest.md#after)
- [before](testing_server_robots.robotstest.md#before)
- [construtor](testing_server_robots.robotstest.md#construtor)
- [define](testing_server_robots.robotstest.md#define)
- [describe](testing_server_robots.robotstest.md#describe)
- [info](testing_server_robots.robotstest.md#info)
- [it](testing_server_robots.robotstest.md#it)
- [quit](testing_server_robots.robotstest.md#quit)
- [sitemapChecker](testing_server_robots.robotstest.md#sitemapchecker)
- [skipAll](testing_server_robots.robotstest.md#skipall)
- [skipLayer](testing_server_robots.robotstest.md#skiplayer)
- [skipNext](testing_server_robots.robotstest.md#skipnext)
- [step](testing_server_robots.robotstest.md#step)
- [urlChecker](testing_server_robots.robotstest.md#urlchecker)
- [wait](testing_server_robots.robotstest.md#wait)
- [warn](testing_server_robots.robotstest.md#warn)

## Constructors

### constructor

\+ **new RobotsTest**(`https`: *boolean*, `host`: *string*, `port`: *string* \| *number*, `fullHost`: *string*, `testingInfo`: [*ITestingInfoType*](../interfaces/testing_itemize.itestinginfotype.md)): [*RobotsTest*](testing_server_robots.robotstest.md)

#### Parameters:

Name | Type |
:------ | :------ |
`https` | *boolean* |
`host` | *string* |
`port` | *string* \| *number* |
`fullHost` | *string* |
`testingInfo` | [*ITestingInfoType*](../interfaces/testing_itemize.itestinginfotype.md) |

**Returns:** [*RobotsTest*](testing_server_robots.robotstest.md)

Inherited from: [Test](testing.test.md)

Defined in: [testing/server/robots.ts:13](https://github.com/onzag/itemize/blob/11a98dec/testing/server/robots.ts#L13)

## Properties

### fullHost

• `Private` **fullHost**: *string*

Defined in: [testing/server/robots.ts:8](https://github.com/onzag/itemize/blob/11a98dec/testing/server/robots.ts#L8)

___

### host

• `Private` **host**: *string*

Defined in: [testing/server/robots.ts:10](https://github.com/onzag/itemize/blob/11a98dec/testing/server/robots.ts#L10)

___

### https

• `Private` **https**: *boolean*

Defined in: [testing/server/robots.ts:12](https://github.com/onzag/itemize/blob/11a98dec/testing/server/robots.ts#L12)

___

### parser

• `Private` **parser**: DOMParser

Defined in: [testing/server/robots.ts:13](https://github.com/onzag/itemize/blob/11a98dec/testing/server/robots.ts#L13)

___

### port

• `Private` **port**: *string* \| *number*

Defined in: [testing/server/robots.ts:11](https://github.com/onzag/itemize/blob/11a98dec/testing/server/robots.ts#L11)

___

### testingInfo

• `Private` **testingInfo**: [*ITestingInfoType*](../interfaces/testing_itemize.itestinginfotype.md)

Defined in: [testing/server/robots.ts:9](https://github.com/onzag/itemize/blob/11a98dec/testing/server/robots.ts#L9)

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

▸ **before**(): *any*

Executes before, override this function
it allows you to dinamically add tests as
well

**`override`** 

**Returns:** *any*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:88](https://github.com/onzag/itemize/blob/11a98dec/testing/index.ts#L88)

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

Defined in: [testing/server/robots.ts:115](https://github.com/onzag/itemize/blob/11a98dec/testing/server/robots.ts#L115)

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

### sitemapChecker

▸ **sitemapChecker**(`sitemapURL`: *string*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`sitemapURL` | *string* |

**Returns:** *Promise*<void\>

Defined in: [testing/server/robots.ts:57](https://github.com/onzag/itemize/blob/11a98dec/testing/server/robots.ts#L57)

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

### urlChecker

▸ **urlChecker**(`url`: *string*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`url` | *string* |

**Returns:** *Promise*<void\>

Defined in: [testing/server/robots.ts:30](https://github.com/onzag/itemize/blob/11a98dec/testing/server/robots.ts#L30)

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
