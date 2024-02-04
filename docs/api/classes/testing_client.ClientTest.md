[@onzag/itemize](../README.md) / [Modules](../modules.md) / [testing/client](../modules/testing_client.md) / ClientTest

# Class: ClientTest

[testing/client](../modules/testing_client.md).ClientTest

Defines a test, and it should be used as an entry
for all subtests

## Hierarchy

- [`Test`](testing.Test.md)

  ↳ **`ClientTest`**

## Table of contents

### Constructors

- [constructor](testing_client.ClientTest.md#constructor)

### Properties

- [fullHost](testing_client.ClientTest.md#fullhost)
- [host](testing_client.ClientTest.md#host)
- [https](testing_client.ClientTest.md#https)
- [port](testing_client.ClientTest.md#port)
- [puppet](testing_client.ClientTest.md#puppet)
- [testingInfo](testing_client.ClientTest.md#testinginfo)

### Methods

- [after](testing_client.ClientTest.md#after)
- [before](testing_client.ClientTest.md#before)
- [construtor](testing_client.ClientTest.md#construtor)
- [define](testing_client.ClientTest.md#define)
- [describe](testing_client.ClientTest.md#describe)
- [info](testing_client.ClientTest.md#info)
- [it](testing_client.ClientTest.md#it)
- [quit](testing_client.ClientTest.md#quit)
- [skipAll](testing_client.ClientTest.md#skipall)
- [skipLayer](testing_client.ClientTest.md#skiplayer)
- [skipNext](testing_client.ClientTest.md#skipnext)
- [step](testing_client.ClientTest.md#step)
- [wait](testing_client.ClientTest.md#wait)
- [warn](testing_client.ClientTest.md#warn)

## Constructors

### constructor

• **new ClientTest**(`https`, `host`, `port`, `testingInfo`, `puppet`): [`ClientTest`](testing_client.ClientTest.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `https` | `boolean` |
| `host` | `string` |
| `port` | `string` \| `number` |
| `testingInfo` | [`ITestingInfoType`](../interfaces/testing_itemize.ITestingInfoType.md) |
| `puppet` | `Browser` |

#### Returns

[`ClientTest`](testing_client.ClientTest.md)

#### Overrides

[Test](testing.Test.md).[constructor](testing.Test.md#constructor)

#### Defined in

[testing/client/index.ts:18](https://github.com/onzag/itemize/blob/73e0c39e/testing/client/index.ts#L18)

## Properties

### fullHost

• `Private` **fullHost**: `string`

#### Defined in

[testing/client/index.ts:16](https://github.com/onzag/itemize/blob/73e0c39e/testing/client/index.ts#L16)

___

### host

• `Private` **host**: `string`

#### Defined in

[testing/client/index.ts:11](https://github.com/onzag/itemize/blob/73e0c39e/testing/client/index.ts#L11)

___

### https

• `Private` **https**: `boolean`

#### Defined in

[testing/client/index.ts:13](https://github.com/onzag/itemize/blob/73e0c39e/testing/client/index.ts#L13)

___

### port

• `Private` **port**: `string` \| `number`

#### Defined in

[testing/client/index.ts:12](https://github.com/onzag/itemize/blob/73e0c39e/testing/client/index.ts#L12)

___

### puppet

• `Private` **puppet**: `Browser`

#### Defined in

[testing/client/index.ts:14](https://github.com/onzag/itemize/blob/73e0c39e/testing/client/index.ts#L14)

___

### testingInfo

• `Private` **testingInfo**: [`ITestingInfoType`](../interfaces/testing_itemize.ITestingInfoType.md)

#### Defined in

[testing/client/index.ts:10](https://github.com/onzag/itemize/blob/73e0c39e/testing/client/index.ts#L10)

## Methods

### after

▸ **after**(): `void`

Executes after everything is done
use for cleanup

#### Returns

`void`

#### Overrides

[Test](testing.Test.md).[after](testing.Test.md#after)

#### Defined in

[testing/client/index.ts:52](https://github.com/onzag/itemize/blob/73e0c39e/testing/client/index.ts#L52)

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

[testing/client/index.ts:34](https://github.com/onzag/itemize/blob/73e0c39e/testing/client/index.ts#L34)

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

[testing/client/index.ts:38](https://github.com/onzag/itemize/blob/73e0c39e/testing/client/index.ts#L38)

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
