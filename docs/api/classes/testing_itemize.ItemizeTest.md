[@onzag/itemize](../README.md) / [Modules](../modules.md) / [testing/itemize](../modules/testing_itemize.md) / ItemizeTest

# Class: ItemizeTest

[testing/itemize](../modules/testing_itemize.md).ItemizeTest

Defines a test, and it should be used as an entry
for all subtests

## Hierarchy

- [`Test`](testing.Test.md)

  ↳ **`ItemizeTest`**

## Table of contents

### Constructors

- [constructor](testing_itemize.ItemizeTest.md#constructor)

### Properties

- [host](testing_itemize.ItemizeTest.md#host)
- [https](testing_itemize.ItemizeTest.md#https)
- [port](testing_itemize.ItemizeTest.md#port)
- [puppet](testing_itemize.ItemizeTest.md#puppet)
- [testingInfo](testing_itemize.ItemizeTest.md#testinginfo)

### Methods

- [after](testing_itemize.ItemizeTest.md#after)
- [before](testing_itemize.ItemizeTest.md#before)
- [construtor](testing_itemize.ItemizeTest.md#construtor)
- [define](testing_itemize.ItemizeTest.md#define)
- [describe](testing_itemize.ItemizeTest.md#describe)
- [info](testing_itemize.ItemizeTest.md#info)
- [it](testing_itemize.ItemizeTest.md#it)
- [quit](testing_itemize.ItemizeTest.md#quit)
- [skipAll](testing_itemize.ItemizeTest.md#skipall)
- [skipLayer](testing_itemize.ItemizeTest.md#skiplayer)
- [skipNext](testing_itemize.ItemizeTest.md#skipnext)
- [step](testing_itemize.ItemizeTest.md#step)
- [wait](testing_itemize.ItemizeTest.md#wait)
- [warn](testing_itemize.ItemizeTest.md#warn)

## Constructors

### constructor

• **new ItemizeTest**(`https`, `host`, `port`, `puppet`): [`ItemizeTest`](testing_itemize.ItemizeTest.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `https` | `boolean` |
| `host` | `string` |
| `port` | `string` \| `number` |
| `puppet` | `Browser` |

#### Returns

[`ItemizeTest`](testing_itemize.ItemizeTest.md)

#### Overrides

[Test](testing.Test.md).[constructor](testing.Test.md#constructor)

#### Defined in

[testing/itemize.ts:31](https://github.com/onzag/itemize/blob/73e0c39e/testing/itemize.ts#L31)

## Properties

### host

• `Private` **host**: `string`

#### Defined in

[testing/itemize.ts:26](https://github.com/onzag/itemize/blob/73e0c39e/testing/itemize.ts#L26)

___

### https

• `Private` **https**: `boolean`

#### Defined in

[testing/itemize.ts:25](https://github.com/onzag/itemize/blob/73e0c39e/testing/itemize.ts#L25)

___

### port

• `Private` **port**: `string` \| `number`

#### Defined in

[testing/itemize.ts:27](https://github.com/onzag/itemize/blob/73e0c39e/testing/itemize.ts#L27)

___

### puppet

• `Private` **puppet**: `Browser`

#### Defined in

[testing/itemize.ts:29](https://github.com/onzag/itemize/blob/73e0c39e/testing/itemize.ts#L29)

___

### testingInfo

• `Private` **testingInfo**: [`ITestingInfoType`](../interfaces/testing_itemize.ITestingInfoType.md)

#### Defined in

[testing/itemize.ts:28](https://github.com/onzag/itemize/blob/73e0c39e/testing/itemize.ts#L28)

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

[testing/index.ts:132](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L132)

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

[testing/itemize.ts:40](https://github.com/onzag/itemize/blob/73e0c39e/testing/itemize.ts#L40)

___

### construtor

▸ **construtor**(): `void`

Build a brand new instance

#### Returns

`void`

#### Inherited from

[Test](testing.Test.md).[construtor](testing.Test.md#construtor)

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

#### Inherited from

[Test](testing.Test.md).[define](testing.Test.md#define)

#### Defined in

[testing/index.ts:141](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L141)

___

### describe

▸ **describe**(): `void`

Executes during just after before has been executed

#### Returns

`void`

#### Overrides

[Test](testing.Test.md).[describe](testing.Test.md#describe)

#### Defined in

[testing/itemize.ts:103](https://github.com/onzag/itemize/blob/73e0c39e/testing/itemize.ts#L103)

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

#### Inherited from

[Test](testing.Test.md).[info](testing.Test.md#info)

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

#### Inherited from

[Test](testing.Test.md).[it](testing.Test.md#it)

#### Defined in

[testing/index.ts:157](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L157)

___

### quit

▸ **quit**(): `void`

Quits this test

#### Returns

`void`

#### Inherited from

[Test](testing.Test.md).[quit](testing.Test.md#quit)

#### Defined in

[testing/index.ts:278](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L278)

___

### skipAll

▸ **skipAll**(): `void`

Skips all the following IT tests
regardless of layer

#### Returns

`void`

#### Inherited from

[Test](testing.Test.md).[skipAll](testing.Test.md#skipall)

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

#### Inherited from

[Test](testing.Test.md).[skipLayer](testing.Test.md#skiplayer)

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

#### Inherited from

[Test](testing.Test.md).[skipNext](testing.Test.md#skipnext)

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

#### Inherited from

[Test](testing.Test.md).[step](testing.Test.md#step)

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

#### Inherited from

[Test](testing.Test.md).[wait](testing.Test.md#wait)

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

#### Inherited from

[Test](testing.Test.md).[warn](testing.Test.md#warn)

#### Defined in

[testing/index.ts:195](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L195)
