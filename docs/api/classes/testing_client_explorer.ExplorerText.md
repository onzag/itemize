[@onzag/itemize](../README.md) / [Modules](../modules.md) / [testing/client/explorer](../modules/testing_client_explorer.md) / ExplorerText

# Class: ExplorerText

[testing/client/explorer](../modules/testing_client_explorer.md).ExplorerText

Defines a test, and it should be used as an entry
for all subtests

## Hierarchy

- [`Test`](testing.Test.md)

  ↳ **`ExplorerText`**

## Table of contents

### Constructors

- [constructor](testing_client_explorer.ExplorerText.md#constructor)

### Properties

- [currentTestingContext](testing_client_explorer.ExplorerText.md#currenttestingcontext)
- [currentTestingContextBuildNumber](testing_client_explorer.ExplorerText.md#currenttestingcontextbuildnumber)
- [currentTestingContextCookies](testing_client_explorer.ExplorerText.md#currenttestingcontextcookies)
- [currentTestingContextSSR](testing_client_explorer.ExplorerText.md#currenttestingcontextssr)
- [fullHost](testing_client_explorer.ExplorerText.md#fullhost)
- [host](testing_client_explorer.ExplorerText.md#host)
- [initialPath](testing_client_explorer.ExplorerText.md#initialpath)
- [page](testing_client_explorer.ExplorerText.md#page)
- [puppet](testing_client_explorer.ExplorerText.md#puppet)
- [testingInfo](testing_client_explorer.ExplorerText.md#testinginfo)

### Methods

- [after](testing_client_explorer.ExplorerText.md#after)
- [before](testing_client_explorer.ExplorerText.md#before)
- [construtor](testing_client_explorer.ExplorerText.md#construtor)
- [define](testing_client_explorer.ExplorerText.md#define)
- [describe](testing_client_explorer.ExplorerText.md#describe)
- [info](testing_client_explorer.ExplorerText.md#info)
- [it](testing_client_explorer.ExplorerText.md#it)
- [quit](testing_client_explorer.ExplorerText.md#quit)
- [retrieveTestingInfo](testing_client_explorer.ExplorerText.md#retrievetestinginfo)
- [skipAll](testing_client_explorer.ExplorerText.md#skipall)
- [skipLayer](testing_client_explorer.ExplorerText.md#skiplayer)
- [skipNext](testing_client_explorer.ExplorerText.md#skipnext)
- [step](testing_client_explorer.ExplorerText.md#step)
- [wait](testing_client_explorer.ExplorerText.md#wait)
- [warn](testing_client_explorer.ExplorerText.md#warn)

## Constructors

### constructor

• **new ExplorerText**(`host`, `fullHost`, `testingInfo`, `puppet`, `initialPath`): [`ExplorerText`](testing_client_explorer.ExplorerText.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `host` | `string` |
| `fullHost` | `string` |
| `testingInfo` | [`ITestingInfoType`](../interfaces/testing_itemize.ITestingInfoType.md) |
| `puppet` | `Browser` |
| `initialPath` | `string` |

#### Returns

[`ExplorerText`](testing_client_explorer.ExplorerText.md)

#### Overrides

[Test](testing.Test.md).[constructor](testing.Test.md#constructor)

#### Defined in

[testing/client/explorer.ts:21](https://github.com/onzag/itemize/blob/73e0c39e/testing/client/explorer.ts#L21)

## Properties

### currentTestingContext

• `Private` **currentTestingContext**: [`IGlobalTestingType`](../interfaces/client_internal_testing.IGlobalTestingType.md)

#### Defined in

[testing/client/explorer.ts:16](https://github.com/onzag/itemize/blob/73e0c39e/testing/client/explorer.ts#L16)

___

### currentTestingContextBuildNumber

• `Private` **currentTestingContextBuildNumber**: `string`

#### Defined in

[testing/client/explorer.ts:18](https://github.com/onzag/itemize/blob/73e0c39e/testing/client/explorer.ts#L18)

___

### currentTestingContextCookies

• `Private` **currentTestingContextCookies**: `Cookie`[]

#### Defined in

[testing/client/explorer.ts:17](https://github.com/onzag/itemize/blob/73e0c39e/testing/client/explorer.ts#L17)

___

### currentTestingContextSSR

• `Private` **currentTestingContextSSR**: [`ISSRContextType`](../interfaces/client_internal_providers_ssr_provider.ISSRContextType.md)

#### Defined in

[testing/client/explorer.ts:19](https://github.com/onzag/itemize/blob/73e0c39e/testing/client/explorer.ts#L19)

___

### fullHost

• `Private` **fullHost**: `string`

#### Defined in

[testing/client/explorer.ts:12](https://github.com/onzag/itemize/blob/73e0c39e/testing/client/explorer.ts#L12)

___

### host

• `Private` **host**: `string`

#### Defined in

[testing/client/explorer.ts:9](https://github.com/onzag/itemize/blob/73e0c39e/testing/client/explorer.ts#L9)

___

### initialPath

• `Private` **initialPath**: `string`

#### Defined in

[testing/client/explorer.ts:13](https://github.com/onzag/itemize/blob/73e0c39e/testing/client/explorer.ts#L13)

___

### page

• `Private` **page**: `Page`

#### Defined in

[testing/client/explorer.ts:15](https://github.com/onzag/itemize/blob/73e0c39e/testing/client/explorer.ts#L15)

___

### puppet

• `Private` **puppet**: `Browser`

#### Defined in

[testing/client/explorer.ts:11](https://github.com/onzag/itemize/blob/73e0c39e/testing/client/explorer.ts#L11)

___

### testingInfo

• `Private` **testingInfo**: [`ITestingInfoType`](../interfaces/testing_itemize.ITestingInfoType.md)

#### Defined in

[testing/client/explorer.ts:10](https://github.com/onzag/itemize/blob/73e0c39e/testing/client/explorer.ts#L10)

## Methods

### after

▸ **after**(): `Promise`\<`void`\>

Executes after everything is done
use for cleanup

#### Returns

`Promise`\<`void`\>

#### Overrides

[Test](testing.Test.md).[after](testing.Test.md#after)

#### Defined in

[testing/client/explorer.ts:164](https://github.com/onzag/itemize/blob/73e0c39e/testing/client/explorer.ts#L164)

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

[testing/client/explorer.ts:36](https://github.com/onzag/itemize/blob/73e0c39e/testing/client/explorer.ts#L36)

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

▸ **describe**(): `Promise`\<`void`\>

Executes during just after before has been executed

#### Returns

`Promise`\<`void`\>

#### Overrides

[Test](testing.Test.md).[describe](testing.Test.md#describe)

#### Defined in

[testing/client/explorer.ts:74](https://github.com/onzag/itemize/blob/73e0c39e/testing/client/explorer.ts#L74)

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

### retrieveTestingInfo

▸ **retrieveTestingInfo**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[testing/client/explorer.ts:63](https://github.com/onzag/itemize/blob/73e0c39e/testing/client/explorer.ts#L63)

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
