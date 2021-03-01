[](../README.md) / [Exports](../modules.md) / [testing/server/database](../modules/testing_server_database.md) / DatabaseTest

# Class: DatabaseTest

[testing/server/database](../modules/testing_server_database.md).DatabaseTest

## Hierarchy

* [*Test*](testing.test.md)

  ↳ **DatabaseTest**

## Table of contents

### Constructors

- [constructor](testing_server_database.databasetest.md#constructor)

### Properties

- [allTables](testing_server_database.databasetest.md#alltables)
- [databaseConnection](testing_server_database.databasetest.md#databaseconnection)
- [testingInfo](testing_server_database.databasetest.md#testinginfo)

### Methods

- [after](testing_server_database.databasetest.md#after)
- [before](testing_server_database.databasetest.md#before)
- [construtor](testing_server_database.databasetest.md#construtor)
- [define](testing_server_database.databasetest.md#define)
- [describe](testing_server_database.databasetest.md#describe)
- [info](testing_server_database.databasetest.md#info)
- [it](testing_server_database.databasetest.md#it)
- [quit](testing_server_database.databasetest.md#quit)
- [skipAll](testing_server_database.databasetest.md#skipall)
- [skipLayer](testing_server_database.databasetest.md#skiplayer)
- [skipNext](testing_server_database.databasetest.md#skipnext)
- [step](testing_server_database.databasetest.md#step)
- [wait](testing_server_database.databasetest.md#wait)
- [warn](testing_server_database.databasetest.md#warn)

## Constructors

### constructor

\+ **new DatabaseTest**(`databaseConnection`: [*DatabaseConnection*](database.databaseconnection.md), `testingInfo`: [*ITestingInfoType*](../interfaces/testing_itemize.itestinginfotype.md)): [*DatabaseTest*](testing_server_database.databasetest.md)

#### Parameters:

Name | Type |
:------ | :------ |
`databaseConnection` | [*DatabaseConnection*](database.databaseconnection.md) |
`testingInfo` | [*ITestingInfoType*](../interfaces/testing_itemize.itestinginfotype.md) |

**Returns:** [*DatabaseTest*](testing_server_database.databasetest.md)

Inherited from: [Test](testing.test.md)

Defined in: [testing/server/database.ts:57](https://github.com/onzag/itemize/blob/28218320/testing/server/database.ts#L57)

## Properties

### allTables

• `Private` **allTables**: *any*[]

Defined in: [testing/server/database.ts:57](https://github.com/onzag/itemize/blob/28218320/testing/server/database.ts#L57)

___

### databaseConnection

• `Private` **databaseConnection**: [*DatabaseConnection*](database.databaseconnection.md)

Defined in: [testing/server/database.ts:56](https://github.com/onzag/itemize/blob/28218320/testing/server/database.ts#L56)

___

### testingInfo

• `Private` **testingInfo**: [*ITestingInfoType*](../interfaces/testing_itemize.itestinginfotype.md)

Defined in: [testing/server/database.ts:55](https://github.com/onzag/itemize/blob/28218320/testing/server/database.ts#L55)

## Methods

### after

▸ **after**(): *any*

Executes after everything is done
use for cleanup

**`override`** 

**Returns:** *any*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:105](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L105)

___

### before

▸ **before**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Overrides: [Test](testing.test.md)

Defined in: [testing/server/database.ts:65](https://github.com/onzag/itemize/blob/28218320/testing/server/database.ts#L65)

___

### construtor

▸ **construtor**(): *void*

Build a brand new instance

**Returns:** *void*

Inherited from: [Test](testing.test.md)

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

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:114](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L114)

___

### describe

▸ **describe**(): *void*

**Returns:** *void*

Overrides: [Test](testing.test.md)

Defined in: [testing/server/database.ts:71](https://github.com/onzag/itemize/blob/28218320/testing/server/database.ts#L71)

___

### info

▸ **info**(`txt`: *string*): *WarnHandle*

#### Parameters:

Name | Type |
:------ | :------ |
`txt` | *string* |

**Returns:** *WarnHandle*

Inherited from: [Test](testing.test.md)

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

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:129](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L129)

___

### quit

▸ **quit**(): *void*

Quits this test

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:220](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L220)

___

### skipAll

▸ **skipAll**(): *void*

Skips all the following IT tests
and by all it means all of them

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:186](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L186)

___

### skipLayer

▸ **skipLayer**(): *void*

Skip all the tests that are
on the same layer following
this

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:201](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L201)

___

### skipNext

▸ **skipNext**(): *void*

Skip all the next IT tests
they should be on the same layer

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:172](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L172)

___

### step

▸ **step**(`fn?`: () => *void* \| *PromiseLike*<void\>): *ItHandle*

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`fn` | () => *void* \| *PromiseLike*<void\> | null |

**Returns:** *ItHandle*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:141](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L141)

___

### wait

▸ **wait**(`ms`: *number*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`ms` | *number* |

**Returns:** *Promise*<void\>

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:211](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L211)

___

### warn

▸ **warn**(`txt`: *string*): *WarnHandle*

#### Parameters:

Name | Type |
:------ | :------ |
`txt` | *string* |

**Returns:** *WarnHandle*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:152](https://github.com/onzag/itemize/blob/28218320/testing/index.ts#L152)
