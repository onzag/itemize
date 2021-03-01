[](../README.md) / [Exports](../modules.md) / [testing/client/explorer](../modules/testing_client_explorer.md) / ExplorerText

# Class: ExplorerText

[testing/client/explorer](../modules/testing_client_explorer.md).ExplorerText

## Hierarchy

* [*Test*](testing.test.md)

  ↳ **ExplorerText**

## Table of contents

### Constructors

- [constructor](testing_client_explorer.explorertext.md#constructor)

### Properties

- [currentTestingContext](testing_client_explorer.explorertext.md#currenttestingcontext)
- [currentTestingContextBuildNumber](testing_client_explorer.explorertext.md#currenttestingcontextbuildnumber)
- [currentTestingContextCookies](testing_client_explorer.explorertext.md#currenttestingcontextcookies)
- [currentTestingContextSSR](testing_client_explorer.explorertext.md#currenttestingcontextssr)
- [fullHost](testing_client_explorer.explorertext.md#fullhost)
- [host](testing_client_explorer.explorertext.md#host)
- [initialPath](testing_client_explorer.explorertext.md#initialpath)
- [page](testing_client_explorer.explorertext.md#page)
- [puppet](testing_client_explorer.explorertext.md#puppet)
- [testingInfo](testing_client_explorer.explorertext.md#testinginfo)

### Methods

- [after](testing_client_explorer.explorertext.md#after)
- [before](testing_client_explorer.explorertext.md#before)
- [construtor](testing_client_explorer.explorertext.md#construtor)
- [define](testing_client_explorer.explorertext.md#define)
- [describe](testing_client_explorer.explorertext.md#describe)
- [info](testing_client_explorer.explorertext.md#info)
- [it](testing_client_explorer.explorertext.md#it)
- [quit](testing_client_explorer.explorertext.md#quit)
- [retrieveTestingInfo](testing_client_explorer.explorertext.md#retrievetestinginfo)
- [runStep](testing_client_explorer.explorertext.md#runstep)
- [skipAll](testing_client_explorer.explorertext.md#skipall)
- [skipLayer](testing_client_explorer.explorertext.md#skiplayer)
- [skipNext](testing_client_explorer.explorertext.md#skipnext)
- [step](testing_client_explorer.explorertext.md#step)
- [wait](testing_client_explorer.explorertext.md#wait)
- [warn](testing_client_explorer.explorertext.md#warn)

## Constructors

### constructor

\+ **new ExplorerText**(`host`: *string*, `fullHost`: *string*, `testingInfo`: [*ITestingInfoType*](../interfaces/testing_itemize.itestinginfotype.md), `puppet`: *Browser*, `initialPath`: *string*): [*ExplorerText*](testing_client_explorer.explorertext.md)

#### Parameters:

Name | Type |
:------ | :------ |
`host` | *string* |
`fullHost` | *string* |
`testingInfo` | [*ITestingInfoType*](../interfaces/testing_itemize.itestinginfotype.md) |
`puppet` | *Browser* |
`initialPath` | *string* |

**Returns:** [*ExplorerText*](testing_client_explorer.explorertext.md)

Inherited from: [Test](testing.test.md)

Defined in: [testing/client/explorer.ts:19](https://github.com/onzag/itemize/blob/0e9b128c/testing/client/explorer.ts#L19)

## Properties

### currentTestingContext

• `Private` **currentTestingContext**: [*IGlobalTestingType*](../interfaces/client_internal_testing.iglobaltestingtype.md)

Defined in: [testing/client/explorer.ts:16](https://github.com/onzag/itemize/blob/0e9b128c/testing/client/explorer.ts#L16)

___

### currentTestingContextBuildNumber

• `Private` **currentTestingContextBuildNumber**: *string*

Defined in: [testing/client/explorer.ts:18](https://github.com/onzag/itemize/blob/0e9b128c/testing/client/explorer.ts#L18)

___

### currentTestingContextCookies

• `Private` **currentTestingContextCookies**: Cookie[]

Defined in: [testing/client/explorer.ts:17](https://github.com/onzag/itemize/blob/0e9b128c/testing/client/explorer.ts#L17)

___

### currentTestingContextSSR

• `Private` **currentTestingContextSSR**: [*ISSRContextType*](../interfaces/client_internal_providers_ssr_provider.issrcontexttype.md)

Defined in: [testing/client/explorer.ts:19](https://github.com/onzag/itemize/blob/0e9b128c/testing/client/explorer.ts#L19)

___

### fullHost

• `Private` **fullHost**: *string*

Defined in: [testing/client/explorer.ts:12](https://github.com/onzag/itemize/blob/0e9b128c/testing/client/explorer.ts#L12)

___

### host

• `Private` **host**: *string*

Defined in: [testing/client/explorer.ts:9](https://github.com/onzag/itemize/blob/0e9b128c/testing/client/explorer.ts#L9)

___

### initialPath

• `Private` **initialPath**: *string*

Defined in: [testing/client/explorer.ts:13](https://github.com/onzag/itemize/blob/0e9b128c/testing/client/explorer.ts#L13)

___

### page

• `Private` **page**: *Page*

Defined in: [testing/client/explorer.ts:15](https://github.com/onzag/itemize/blob/0e9b128c/testing/client/explorer.ts#L15)

___

### puppet

• `Private` **puppet**: *Browser*

Defined in: [testing/client/explorer.ts:11](https://github.com/onzag/itemize/blob/0e9b128c/testing/client/explorer.ts#L11)

___

### testingInfo

• `Private` **testingInfo**: [*ITestingInfoType*](../interfaces/testing_itemize.itestinginfotype.md)

Defined in: [testing/client/explorer.ts:10](https://github.com/onzag/itemize/blob/0e9b128c/testing/client/explorer.ts#L10)

## Methods

### after

▸ **after**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Overrides: [Test](testing.test.md)

Defined in: [testing/client/explorer.ts:241](https://github.com/onzag/itemize/blob/0e9b128c/testing/client/explorer.ts#L241)

___

### before

▸ **before**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Overrides: [Test](testing.test.md)

Defined in: [testing/client/explorer.ts:36](https://github.com/onzag/itemize/blob/0e9b128c/testing/client/explorer.ts#L36)

___

### construtor

▸ **construtor**(): *void*

Build a brand new instance

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:71](https://github.com/onzag/itemize/blob/0e9b128c/testing/index.ts#L71)

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

Defined in: [testing/index.ts:114](https://github.com/onzag/itemize/blob/0e9b128c/testing/index.ts#L114)

___

### describe

▸ **describe**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Overrides: [Test](testing.test.md)

Defined in: [testing/client/explorer.ts:75](https://github.com/onzag/itemize/blob/0e9b128c/testing/client/explorer.ts#L75)

___

### info

▸ **info**(`txt`: *string*): *WarnHandle*

#### Parameters:

Name | Type |
:------ | :------ |
`txt` | *string* |

**Returns:** *WarnHandle*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:162](https://github.com/onzag/itemize/blob/0e9b128c/testing/index.ts#L162)

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

Defined in: [testing/index.ts:129](https://github.com/onzag/itemize/blob/0e9b128c/testing/index.ts#L129)

___

### quit

▸ **quit**(): *void*

Quits this test

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:220](https://github.com/onzag/itemize/blob/0e9b128c/testing/index.ts#L220)

___

### retrieveTestingInfo

▸ **retrieveTestingInfo**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [testing/client/explorer.ts:63](https://github.com/onzag/itemize/blob/0e9b128c/testing/client/explorer.ts#L63)

___

### runStep

▸ **runStep**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [testing/client/explorer.ts:70](https://github.com/onzag/itemize/blob/0e9b128c/testing/client/explorer.ts#L70)

___

### skipAll

▸ **skipAll**(): *void*

Skips all the following IT tests
and by all it means all of them

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:186](https://github.com/onzag/itemize/blob/0e9b128c/testing/index.ts#L186)

___

### skipLayer

▸ **skipLayer**(): *void*

Skip all the tests that are
on the same layer following
this

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:201](https://github.com/onzag/itemize/blob/0e9b128c/testing/index.ts#L201)

___

### skipNext

▸ **skipNext**(): *void*

Skip all the next IT tests
they should be on the same layer

**Returns:** *void*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:172](https://github.com/onzag/itemize/blob/0e9b128c/testing/index.ts#L172)

___

### step

▸ **step**(`fn?`: () => *void* \| *PromiseLike*<void\>): *ItHandle*

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`fn` | () => *void* \| *PromiseLike*<void\> | null |

**Returns:** *ItHandle*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:141](https://github.com/onzag/itemize/blob/0e9b128c/testing/index.ts#L141)

___

### wait

▸ **wait**(`ms`: *number*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`ms` | *number* |

**Returns:** *Promise*<void\>

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:211](https://github.com/onzag/itemize/blob/0e9b128c/testing/index.ts#L211)

___

### warn

▸ **warn**(`txt`: *string*): *WarnHandle*

#### Parameters:

Name | Type |
:------ | :------ |
`txt` | *string* |

**Returns:** *WarnHandle*

Inherited from: [Test](testing.test.md)

Defined in: [testing/index.ts:152](https://github.com/onzag/itemize/blob/0e9b128c/testing/index.ts#L152)
