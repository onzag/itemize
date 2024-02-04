[@onzag/itemize](../README.md) / [Modules](../modules.md) / [testing/server/robots](../modules/testing_server_robots.md) / RobotsTest

# Class: RobotsTest

[testing/server/robots](../modules/testing_server_robots.md).RobotsTest

Defines a test, and it should be used as an entry
for all subtests

## Hierarchy

- [`Test`](testing.Test.md)

  ↳ **`RobotsTest`**

## Table of contents

### Constructors

- [constructor](testing_server_robots.RobotsTest.md#constructor)

### Properties

- [fullHost](testing_server_robots.RobotsTest.md#fullhost)
- [host](testing_server_robots.RobotsTest.md#host)
- [https](testing_server_robots.RobotsTest.md#https)
- [parser](testing_server_robots.RobotsTest.md#parser)
- [port](testing_server_robots.RobotsTest.md#port)
- [testingInfo](testing_server_robots.RobotsTest.md#testinginfo)

### Methods

- [after](testing_server_robots.RobotsTest.md#after)
- [before](testing_server_robots.RobotsTest.md#before)
- [construtor](testing_server_robots.RobotsTest.md#construtor)
- [define](testing_server_robots.RobotsTest.md#define)
- [describe](testing_server_robots.RobotsTest.md#describe)
- [info](testing_server_robots.RobotsTest.md#info)
- [it](testing_server_robots.RobotsTest.md#it)
- [quit](testing_server_robots.RobotsTest.md#quit)
- [sitemapChecker](testing_server_robots.RobotsTest.md#sitemapchecker)
- [skipAll](testing_server_robots.RobotsTest.md#skipall)
- [skipLayer](testing_server_robots.RobotsTest.md#skiplayer)
- [skipNext](testing_server_robots.RobotsTest.md#skipnext)
- [step](testing_server_robots.RobotsTest.md#step)
- [urlChecker](testing_server_robots.RobotsTest.md#urlchecker)
- [wait](testing_server_robots.RobotsTest.md#wait)
- [warn](testing_server_robots.RobotsTest.md#warn)

## Constructors

### constructor

• **new RobotsTest**(`https`, `host`, `port`, `fullHost`, `testingInfo`): [`RobotsTest`](testing_server_robots.RobotsTest.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `https` | `boolean` |
| `host` | `string` |
| `port` | `string` \| `number` |
| `fullHost` | `string` |
| `testingInfo` | [`ITestingInfoType`](../interfaces/testing_itemize.ITestingInfoType.md) |

#### Returns

[`RobotsTest`](testing_server_robots.RobotsTest.md)

#### Overrides

[Test](testing.Test.md).[constructor](testing.Test.md#constructor)

#### Defined in

[testing/server/robots.ts:15](https://github.com/onzag/itemize/blob/73e0c39e/testing/server/robots.ts#L15)

## Properties

### fullHost

• `Private` **fullHost**: `string`

#### Defined in

[testing/server/robots.ts:8](https://github.com/onzag/itemize/blob/73e0c39e/testing/server/robots.ts#L8)

___

### host

• `Private` **host**: `string`

#### Defined in

[testing/server/robots.ts:10](https://github.com/onzag/itemize/blob/73e0c39e/testing/server/robots.ts#L10)

___

### https

• `Private` **https**: `boolean`

#### Defined in

[testing/server/robots.ts:12](https://github.com/onzag/itemize/blob/73e0c39e/testing/server/robots.ts#L12)

___

### parser

• `Private` **parser**: `DOMParser`

#### Defined in

[testing/server/robots.ts:13](https://github.com/onzag/itemize/blob/73e0c39e/testing/server/robots.ts#L13)

___

### port

• `Private` **port**: `string` \| `number`

#### Defined in

[testing/server/robots.ts:11](https://github.com/onzag/itemize/blob/73e0c39e/testing/server/robots.ts#L11)

___

### testingInfo

• `Private` **testingInfo**: [`ITestingInfoType`](../interfaces/testing_itemize.ITestingInfoType.md)

#### Defined in

[testing/server/robots.ts:9](https://github.com/onzag/itemize/blob/73e0c39e/testing/server/robots.ts#L9)

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

▸ **before**(): `any`

Executes before, override this function
it allows you to dinamically add tests as
well

#### Returns

`any`

#### Inherited from

[Test](testing.Test.md).[before](testing.Test.md#before)

#### Defined in

[testing/index.ts:115](https://github.com/onzag/itemize/blob/73e0c39e/testing/index.ts#L115)

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

[testing/server/robots.ts:129](https://github.com/onzag/itemize/blob/73e0c39e/testing/server/robots.ts#L129)

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

### sitemapChecker

▸ **sitemapChecker**(`sitemapURL`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sitemapURL` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[testing/server/robots.ts:63](https://github.com/onzag/itemize/blob/73e0c39e/testing/server/robots.ts#L63)

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

### urlChecker

▸ **urlChecker**(`url`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[testing/server/robots.ts:30](https://github.com/onzag/itemize/blob/73e0c39e/testing/server/robots.ts#L30)

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
