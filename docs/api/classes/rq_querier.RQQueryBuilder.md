[@onzag/itemize](../README.md) / [Modules](../modules.md) / [rq-querier](../modules/rq_querier.md) / RQQueryBuilder

# Class: RQQueryBuilder

[rq-querier](../modules/rq_querier.md).RQQueryBuilder

Rq helper class in order to build proper form data
queries

## Table of contents

### Constructors

- [constructor](rq_querier.RQQueryBuilder.md#constructor)

### Properties

- [foundUnprocessedArgFiles](rq_querier.RQQueryBuilder.md#foundunprocessedargfiles)
- [listeners](rq_querier.RQQueryBuilder.md#listeners)
- [processedQueries](rq_querier.RQQueryBuilder.md#processedqueries)
- [progressers](rq_querier.RQQueryBuilder.md#progressers)
- [reply](rq_querier.RQQueryBuilder.md#reply)
- [rqSchema](rq_querier.RQQueryBuilder.md#rqschema)
- [type](rq_querier.RQQueryBuilder.md#type)
- [unprocessedQueries](rq_querier.RQQueryBuilder.md#unprocessedqueries)

### Methods

- [addEventListenerOnReplyInformed](rq_querier.RQQueryBuilder.md#addeventlisteneronreplyinformed)
- [addProgresserListener](rq_querier.RQQueryBuilder.md#addprogresserlistener)
- [findFilesAndProcessArgs](rq_querier.RQQueryBuilder.md#findfilesandprocessargs)
- [getAttachments](rq_querier.RQQueryBuilder.md#getattachments)
- [getQueries](rq_querier.RQQueryBuilder.md#getqueries)
- [getQueryByIndex](rq_querier.RQQueryBuilder.md#getquerybyindex)
- [getRQOperations](rq_querier.RQQueryBuilder.md#getrqoperations)
- [getServerSideQueryByIndex](rq_querier.RQQueryBuilder.md#getserversidequerybyindex)
- [getType](rq_querier.RQQueryBuilder.md#gettype)
- [informProgress](rq_querier.RQQueryBuilder.md#informprogress)
- [informReply](rq_querier.RQQueryBuilder.md#informreply)
- [isContainedWithin](rq_querier.RQQueryBuilder.md#iscontainedwithin)
- [isMergableWith](rq_querier.RQQueryBuilder.md#ismergablewith)
- [isNameMergableWith](rq_querier.RQQueryBuilder.md#isnamemergablewith)
- [mergeWith](rq_querier.RQQueryBuilder.md#mergewith)

## Constructors

### constructor

• **new RQQueryBuilder**(`type`, `queries`, `rqSchema`): [`RQQueryBuilder`](rq_querier.RQQueryBuilder.md)

Build a rq query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | ``"query"`` \| ``"mutation"`` | query or mutation |
| `queries` | [`IRQQueryObj`](../interfaces/rq_querier.IRQQueryObj.md)[] | the queries that we want to execute |
| `rqSchema` | [`RQRootSchema`](../interfaces/base_Root_rq.RQRootSchema.md) | - |

#### Returns

[`RQQueryBuilder`](rq_querier.RQQueryBuilder.md)

#### Defined in

[rq-querier.ts:214](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L214)

## Properties

### foundUnprocessedArgFiles

• `Private` **foundUnprocessedArgFiles**: [`IRQFile`](../interfaces/rq_querier.IRQFile.md)[]

Files that have been found that are unprocessed

#### Defined in

[rq-querier.ts:189](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L189)

___

### listeners

• `Private` **listeners**: `IRQQueryListenerType`[] = `[]`

list of listeners

#### Defined in

[rq-querier.ts:193](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L193)

___

### processedQueries

• `Private` **processedQueries**: [`IRQQueryObj`](../interfaces/rq_querier.IRQQueryObj.md)[]

All the processed queries from the query list

#### Defined in

[rq-querier.ts:180](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L180)

___

### progressers

• `Private` **progressers**: [`ProgresserFn`](../modules/rq_querier.md#progresserfn)[] = `[]`

list of progress listeners

#### Defined in

[rq-querier.ts:197](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L197)

___

### reply

• **reply**: [`IRQEndpointValue`](../interfaces/rq_querier.IRQEndpointValue.md) = `null`

The current known reply for the query

#### Defined in

[rq-querier.ts:202](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L202)

___

### rqSchema

• `Private` **rqSchema**: [`RQRootSchema`](../interfaces/base_Root_rq.RQRootSchema.md)

The rq schema used

#### Defined in

[rq-querier.ts:207](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L207)

___

### type

• `Private` **type**: ``"query"`` \| ``"mutation"``

The type of this query

#### Defined in

[rq-querier.ts:185](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L185)

___

### unprocessedQueries

• `Private` **unprocessedQueries**: [`IRQQueryObj`](../interfaces/rq_querier.IRQQueryObj.md)[]

#### Defined in

[rq-querier.ts:181](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L181)

## Methods

### addEventListenerOnReplyInformed

▸ **addEventListenerOnReplyInformed**(`listener`): `void`

add a listener for when a reply is informed

#### Parameters

| Name | Type |
| :------ | :------ |
| `listener` | `IRQQueryListenerType` |

#### Returns

`void`

#### Defined in

[rq-querier.ts:413](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L413)

___

### addProgresserListener

▸ **addProgresserListener**(`prog`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prog` | (`arg`: [`IXMLHttpRequestProgressInfo`](../interfaces/rq_querier.IXMLHttpRequestProgressInfo.md)) => `void` |

#### Returns

`void`

#### Defined in

[rq-querier.ts:393](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L393)

___

### findFilesAndProcessArgs

▸ **findFilesAndProcessArgs**(`arg`): `any`

Finds files in the rq query and processes
all the files as they are required in order to retrieve
their streams and file content

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`IRQArgs`](../interfaces/rq_querier.IRQArgs.md) | the argument in question |

#### Returns

`any`

new processed args

#### Defined in

[rq-querier.ts:453](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L453)

___

### getAttachments

▸ **getAttachments**(): [`IRQFile`](../interfaces/rq_querier.IRQFile.md)[]

Provides all the attached files

#### Returns

[`IRQFile`](../interfaces/rq_querier.IRQFile.md)[]

#### Defined in

[rq-querier.ts:442](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L442)

___

### getQueries

▸ **getQueries**(`unprocessed?`): [`IRQQueryObj`](../interfaces/rq_querier.IRQQueryObj.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `unprocessed?` | `boolean` |

#### Returns

[`IRQQueryObj`](../interfaces/rq_querier.IRQQueryObj.md)[]

#### Defined in

[rq-querier.ts:397](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L397)

___

### getQueryByIndex

▸ **getQueryByIndex**(`index`, `unprocessed?`): [`IRQQueryObj`](../interfaces/rq_querier.IRQQueryObj.md)

Provides a processed query given an index

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `unprocessed?` | `boolean` |

#### Returns

[`IRQQueryObj`](../interfaces/rq_querier.IRQQueryObj.md)

#### Defined in

[rq-querier.ts:406](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L406)

___

### getRQOperations

▸ **getRQOperations**(): `any`[]

#### Returns

`any`[]

#### Defined in

[rq-querier.ts:431](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L431)

___

### getServerSideQueryByIndex

▸ **getServerSideQueryByIndex**(`index`): [`IRQQueryObj`](../interfaces/rq_querier.IRQQueryObj.md)

Unlike providing a standard query object this provides
a version of the query the server side would recieve once it is
parsed, rather than a client side version

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

[`IRQQueryObj`](../interfaces/rq_querier.IRQQueryObj.md)

#### Defined in

[rq-querier.ts:424](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L424)

___

### getType

▸ **getType**(): ``"query"`` \| ``"mutation"``

#### Returns

``"query"`` \| ``"mutation"``

#### Defined in

[rq-querier.ts:435](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L435)

___

### informProgress

▸ **informProgress**(`arg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`IXMLHttpRequestProgressInfo`](../interfaces/rq_querier.IXMLHttpRequestProgressInfo.md) |

#### Returns

`void`

#### Defined in

[rq-querier.ts:389](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L389)

___

### informReply

▸ **informReply**(`reply`): `void`

inform a reply to the query in case this has event listeners to that

#### Parameters

| Name | Type |
| :------ | :------ |
| `reply` | [`IRQEndpointValue`](../interfaces/rq_querier.IRQEndpointValue.md) |

#### Returns

`void`

#### Defined in

[rq-querier.ts:384](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L384)

___

### isContainedWithin

▸ **isContainedWithin**(`query`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`RQQueryBuilder`](rq_querier.RQQueryBuilder.md) |

#### Returns

`boolean`

#### Defined in

[rq-querier.ts:272](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L272)

___

### isMergableWith

▸ **isMergableWith**(`query`): `boolean`

Check whether it's mergable

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`RQQueryBuilder`](rq_querier.RQQueryBuilder.md) |

#### Returns

`boolean`

#### Defined in

[rq-querier.ts:242](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L242)

___

### isNameMergableWith

▸ **isNameMergableWith**(`ourValue`, `theirValue`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ourValue` | [`IRQQueryObj`](../interfaces/rq_querier.IRQQueryObj.md) |
| `theirValue` | [`IRQQueryObj`](../interfaces/rq_querier.IRQQueryObj.md) |

#### Returns

`boolean`

#### Defined in

[rq-querier.ts:296](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L296)

___

### mergeWith

▸ **mergeWith**(`query`): [`string`, `string`][]

Merge with it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | [`RQQueryBuilder`](rq_querier.RQQueryBuilder.md) | the query to merge with |

#### Returns

[`string`, `string`][]

a list of aliases to remap the results from to the given name

#### Defined in

[rq-querier.ts:316](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L316)
