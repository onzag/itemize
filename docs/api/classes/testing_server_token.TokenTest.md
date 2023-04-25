[@onzag/itemize](../README.md) / [Modules](../modules.md) / [testing/server/token](../modules/testing_server_token.md) / TokenTest

# Class: TokenTest

[testing/server/token](../modules/testing_server_token.md).TokenTest

## Hierarchy

- [`Test`](testing.Test.md)

  ↳ **`TokenTest`**

## Table of contents

### Constructors

- [constructor](testing_server_token.TokenTest.md#constructor)

### Properties

- [fullHost](testing_server_token.TokenTest.md#fullhost)
- [testingUserInfo](testing_server_token.TokenTest.md#testinguserinfo)

### Methods

- [after](testing_server_token.TokenTest.md#after)
- [before](testing_server_token.TokenTest.md#before)
- [construtor](testing_server_token.TokenTest.md#construtor)
- [define](testing_server_token.TokenTest.md#define)
- [describe](testing_server_token.TokenTest.md#describe)
- [info](testing_server_token.TokenTest.md#info)
- [it](testing_server_token.TokenTest.md#it)
- [quit](testing_server_token.TokenTest.md#quit)
- [skipAll](testing_server_token.TokenTest.md#skipall)
- [skipLayer](testing_server_token.TokenTest.md#skiplayer)
- [skipNext](testing_server_token.TokenTest.md#skipnext)
- [step](testing_server_token.TokenTest.md#step)
- [wait](testing_server_token.TokenTest.md#wait)
- [warn](testing_server_token.TokenTest.md#warn)

## Constructors

### constructor

• **new TokenTest**(`fullHost`, `testingUserInfo`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fullHost` | `string` |
| `testingUserInfo` | [`IUserInfoAndTokensForTesting`](../interfaces/testing_server.IUserInfoAndTokensForTesting.md) |

#### Overrides

[Test](testing.Test.md).[constructor](testing.Test.md#constructor)

#### Defined in

[testing/server/token.ts:11](https://github.com/onzag/itemize/blob/f2db74a5/testing/server/token.ts#L11)

## Properties

### fullHost

• `Private` **fullHost**: `string`

#### Defined in

[testing/server/token.ts:9](https://github.com/onzag/itemize/blob/f2db74a5/testing/server/token.ts#L9)

___

### testingUserInfo

• `Private` **testingUserInfo**: [`IUserInfoAndTokensForTesting`](../interfaces/testing_server.IUserInfoAndTokensForTesting.md)

#### Defined in

[testing/server/token.ts:8](https://github.com/onzag/itemize/blob/f2db74a5/testing/server/token.ts#L8)

## Methods

### after

▸ **after**(): `any`

Executes after everything is done
use for cleanup

**`override`**

#### Returns

`any`

#### Inherited from

[Test](testing.Test.md).[after](testing.Test.md#after)

#### Defined in

[testing/index.ts:105](https://github.com/onzag/itemize/blob/f2db74a5/testing/index.ts#L105)

___

### before

▸ **before**(): `any`

Executes before, override this function
it allows you to dinamically add tests as
well

**`override`**

#### Returns

`any`

#### Inherited from

[Test](testing.Test.md).[before](testing.Test.md#before)

#### Defined in

[testing/index.ts:88](https://github.com/onzag/itemize/blob/f2db74a5/testing/index.ts#L88)

___

### construtor

▸ **construtor**(): `void`

Build a brand new instance

#### Returns

`void`

#### Inherited from

[Test](testing.Test.md).[construtor](testing.Test.md#construtor)

#### Defined in

[testing/index.ts:71](https://github.com/onzag/itemize/blob/f2db74a5/testing/index.ts#L71)

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

[testing/index.ts:114](https://github.com/onzag/itemize/blob/f2db74a5/testing/index.ts#L114)

___

### describe

▸ **describe**(): `void`

Executes during just after before has been executed

#### Returns

`void`

#### Overrides

[Test](testing.Test.md).[describe](testing.Test.md#describe)

#### Defined in

[testing/server/token.ts:17](https://github.com/onzag/itemize/blob/f2db74a5/testing/server/token.ts#L17)

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

[testing/index.ts:162](https://github.com/onzag/itemize/blob/f2db74a5/testing/index.ts#L162)

___

### it

▸ **it**(`label`, `fn?`): `ItHandle`

Define a new assertion

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `label` | `string` | `undefined` | the label for the assertion |
| `fn` | () => `void` \| `PromiseLike`<`void`\> | `null` | the assetion to execute |

#### Returns

`ItHandle`

#### Inherited from

[Test](testing.Test.md).[it](testing.Test.md#it)

#### Defined in

[testing/index.ts:129](https://github.com/onzag/itemize/blob/f2db74a5/testing/index.ts#L129)

___

### quit

▸ **quit**(): `void`

Quits this test

#### Returns

`void`

#### Inherited from

[Test](testing.Test.md).[quit](testing.Test.md#quit)

#### Defined in

[testing/index.ts:220](https://github.com/onzag/itemize/blob/f2db74a5/testing/index.ts#L220)

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

[testing/index.ts:186](https://github.com/onzag/itemize/blob/f2db74a5/testing/index.ts#L186)

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

[testing/index.ts:201](https://github.com/onzag/itemize/blob/f2db74a5/testing/index.ts#L201)

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

[testing/index.ts:172](https://github.com/onzag/itemize/blob/f2db74a5/testing/index.ts#L172)

___

### step

▸ **step**(`fn?`): `ItHandle`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `fn` | () => `void` \| `PromiseLike`<`void`\> | `null` |

#### Returns

`ItHandle`

#### Inherited from

[Test](testing.Test.md).[step](testing.Test.md#step)

#### Defined in

[testing/index.ts:141](https://github.com/onzag/itemize/blob/f2db74a5/testing/index.ts#L141)

___

### wait

▸ **wait**(`ms`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ms` | `number` |

#### Returns

`Promise`<`void`\>

#### Inherited from

[Test](testing.Test.md).[wait](testing.Test.md#wait)

#### Defined in

[testing/index.ts:211](https://github.com/onzag/itemize/blob/f2db74a5/testing/index.ts#L211)

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

[testing/index.ts:152](https://github.com/onzag/itemize/blob/f2db74a5/testing/index.ts#L152)
