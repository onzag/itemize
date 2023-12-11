[@onzag/itemize](../README.md) / [Modules](../modules.md) / [testing/server/database](../modules/testing_server_database.md) / DatabaseTest

# Class: DatabaseTest

[testing/server/database](../modules/testing_server_database.md).DatabaseTest

Defines a test, and it should be used as an entry
for all subtests

## Hierarchy

- [`Test`](testing.Test.md)

  ↳ **`DatabaseTest`**

## Table of contents

### Constructors

- [constructor](testing_server_database.DatabaseTest.md#constructor)

### Properties

- [allTables](testing_server_database.DatabaseTest.md#alltables)
- [databaseConnection](testing_server_database.DatabaseTest.md#databaseconnection)
- [testingInfo](testing_server_database.DatabaseTest.md#testinginfo)

### Methods

- [after](testing_server_database.DatabaseTest.md#after)
- [before](testing_server_database.DatabaseTest.md#before)
- [construtor](testing_server_database.DatabaseTest.md#construtor)
- [define](testing_server_database.DatabaseTest.md#define)
- [describe](testing_server_database.DatabaseTest.md#describe)
- [info](testing_server_database.DatabaseTest.md#info)
- [it](testing_server_database.DatabaseTest.md#it)
- [quit](testing_server_database.DatabaseTest.md#quit)
- [skipAll](testing_server_database.DatabaseTest.md#skipall)
- [skipLayer](testing_server_database.DatabaseTest.md#skiplayer)
- [skipNext](testing_server_database.DatabaseTest.md#skipnext)
- [step](testing_server_database.DatabaseTest.md#step)
- [wait](testing_server_database.DatabaseTest.md#wait)
- [warn](testing_server_database.DatabaseTest.md#warn)

## Constructors

### constructor

• **new DatabaseTest**(`databaseConnection`, `testingInfo`): [`DatabaseTest`](testing_server_database.DatabaseTest.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `databaseConnection` | [`DatabaseConnection`](database.DatabaseConnection.md) |
| `testingInfo` | [`ITestingInfoType`](../interfaces/testing_itemize.ITestingInfoType.md) |

#### Returns

[`DatabaseTest`](testing_server_database.DatabaseTest.md)

#### Overrides

[Test](testing.Test.md).[constructor](testing.Test.md#constructor)

#### Defined in

[testing/server/database.ts:59](https://github.com/onzag/itemize/blob/59702dd5/testing/server/database.ts#L59)

## Properties

### allTables

• `Private` **allTables**: `any`[]

#### Defined in

[testing/server/database.ts:57](https://github.com/onzag/itemize/blob/59702dd5/testing/server/database.ts#L57)

___

### databaseConnection

• `Private` **databaseConnection**: [`DatabaseConnection`](database.DatabaseConnection.md)

#### Defined in

[testing/server/database.ts:56](https://github.com/onzag/itemize/blob/59702dd5/testing/server/database.ts#L56)

___

### testingInfo

• `Private` **testingInfo**: [`ITestingInfoType`](../interfaces/testing_itemize.ITestingInfoType.md)

#### Defined in

[testing/server/database.ts:55](https://github.com/onzag/itemize/blob/59702dd5/testing/server/database.ts#L55)

## Methods

### after

▸ **after**(): `any`

Executes after everything is done
use for cleanup

#### Returns

`any`

#### Inherited from

[Test](testing.Test.md).[after](testing.Test.md#after)

#### Defined in

[testing/index.ts:105](https://github.com/onzag/itemize/blob/59702dd5/testing/index.ts#L105)

___

### before

▸ **before**(): `Promise`\<`void`\>

Executes before, override this function
it allows you to dinamically add tests as
well

#### Returns

`Promise`\<`void`\>

#### Overrides

[Test](testing.Test.md).[before](testing.Test.md#before)

#### Defined in

[testing/server/database.ts:65](https://github.com/onzag/itemize/blob/59702dd5/testing/server/database.ts#L65)

___

### construtor

▸ **construtor**(): `void`

Build a brand new instance

#### Returns

`void`

#### Inherited from

[Test](testing.Test.md).[construtor](testing.Test.md#construtor)

#### Defined in

[testing/index.ts:71](https://github.com/onzag/itemize/blob/59702dd5/testing/index.ts#L71)

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

#### Inherited from

[Test](testing.Test.md).[define](testing.Test.md#define)

#### Defined in

[testing/index.ts:114](https://github.com/onzag/itemize/blob/59702dd5/testing/index.ts#L114)

___

### describe

▸ **describe**(): `void`

Executes during just after before has been executed

#### Returns

`void`

#### Overrides

[Test](testing.Test.md).[describe](testing.Test.md#describe)

#### Defined in

[testing/server/database.ts:71](https://github.com/onzag/itemize/blob/59702dd5/testing/server/database.ts#L71)

___

### info

▸ **info**(`txt`): `WarnHandle`

#### Parameters

| Name | Type |
| :------ | :------ |
| `txt` | `string` |

#### Returns

`WarnHandle`

#### Inherited from

[Test](testing.Test.md).[info](testing.Test.md#info)

#### Defined in

[testing/index.ts:162](https://github.com/onzag/itemize/blob/59702dd5/testing/index.ts#L162)

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

#### Inherited from

[Test](testing.Test.md).[it](testing.Test.md#it)

#### Defined in

[testing/index.ts:129](https://github.com/onzag/itemize/blob/59702dd5/testing/index.ts#L129)

___

### quit

▸ **quit**(): `void`

Quits this test

#### Returns

`void`

#### Inherited from

[Test](testing.Test.md).[quit](testing.Test.md#quit)

#### Defined in

[testing/index.ts:220](https://github.com/onzag/itemize/blob/59702dd5/testing/index.ts#L220)

___

### skipAll

▸ **skipAll**(): `void`

Skips all the following IT tests
and by all it means all of them

#### Returns

`void`

#### Inherited from

[Test](testing.Test.md).[skipAll](testing.Test.md#skipall)

#### Defined in

[testing/index.ts:186](https://github.com/onzag/itemize/blob/59702dd5/testing/index.ts#L186)

___

### skipLayer

▸ **skipLayer**(): `void`

Skip all the tests that are
on the same layer following
this

#### Returns

`void`

#### Inherited from

[Test](testing.Test.md).[skipLayer](testing.Test.md#skiplayer)

#### Defined in

[testing/index.ts:201](https://github.com/onzag/itemize/blob/59702dd5/testing/index.ts#L201)

___

### skipNext

▸ **skipNext**(): `void`

Skip all the next IT tests
they should be on the same layer

#### Returns

`void`

#### Inherited from

[Test](testing.Test.md).[skipNext](testing.Test.md#skipnext)

#### Defined in

[testing/index.ts:172](https://github.com/onzag/itemize/blob/59702dd5/testing/index.ts#L172)

___

### step

▸ **step**(`fn?`): `ItHandle`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `fn` | () => `void` \| `PromiseLike`\<`void`\> | `null` |

#### Returns

`ItHandle`

#### Inherited from

[Test](testing.Test.md).[step](testing.Test.md#step)

#### Defined in

[testing/index.ts:141](https://github.com/onzag/itemize/blob/59702dd5/testing/index.ts#L141)

___

### wait

▸ **wait**(`ms`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ms` | `number` |

#### Returns

`Promise`\<`void`\>

#### Inherited from

[Test](testing.Test.md).[wait](testing.Test.md#wait)

#### Defined in

[testing/index.ts:211](https://github.com/onzag/itemize/blob/59702dd5/testing/index.ts#L211)

___

### warn

▸ **warn**(`txt`): `WarnHandle`

#### Parameters

| Name | Type |
| :------ | :------ |
| `txt` | `string` |

#### Returns

`WarnHandle`

#### Inherited from

[Test](testing.Test.md).[warn](testing.Test.md#warn)

#### Defined in

[testing/index.ts:152](https://github.com/onzag/itemize/blob/59702dd5/testing/index.ts#L152)
