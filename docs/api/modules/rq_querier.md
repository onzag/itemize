[@onzag/itemize](../README.md) / [Modules](../modules.md) / rq-querier

# Module: rq-querier

Contains functions to perform rq queries as well
as the product interfaces for these queries

## Table of contents

### Classes

- [RQQueryBuilder](../classes/rq_querier.RQQueryBuilder.md)

### Interfaces

- [IRQArgs](../interfaces/rq_querier.IRQArgs.md)
- [IRQEndpointValue](../interfaces/rq_querier.IRQEndpointValue.md)
- [IRQFile](../interfaces/rq_querier.IRQFile.md)
- [IRQQueryObj](../interfaces/rq_querier.IRQQueryObj.md)
- [IRQRequestFields](../interfaces/rq_querier.IRQRequestFields.md)
- [IRQSearchRecord](../interfaces/rq_querier.IRQSearchRecord.md)
- [IRQSearchRecordsContainer](../interfaces/rq_querier.IRQSearchRecordsContainer.md)
- [IRQSearchResultsContainer](../interfaces/rq_querier.IRQSearchResultsContainer.md)
- [IRQValue](../interfaces/rq_querier.IRQValue.md)
- [IXMLHttpRequestProgressInfo](../interfaces/rq_querier.IXMLHttpRequestProgressInfo.md)

### Type Aliases

- [ProgresserFn](rq_querier.md#progresserfn)
- [RQArgsValue](rq_querier.md#rqargsvalue)

### Functions

- [buildRQMutation](rq_querier.md#buildrqmutation)
- [buildRQQuery](rq_querier.md#buildrqquery)
- [oldXMLHttpRequest](rq_querier.md#oldxmlhttprequest)
- [rqQuery](rq_querier.md#rqquery)

## Type Aliases

### ProgresserFn

Ƭ **ProgresserFn**: (`arg`: [`IXMLHttpRequestProgressInfo`](../interfaces/rq_querier.IXMLHttpRequestProgressInfo.md)) => `void`

#### Type declaration

▸ (`arg`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`IXMLHttpRequestProgressInfo`](../interfaces/rq_querier.IXMLHttpRequestProgressInfo.md) |

##### Returns

`void`

#### Defined in

[rq-querier.ts:170](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L170)

___

### RQArgsValue

Ƭ **RQArgsValue**: `boolean` \| `string` \| `number` \| ``null`` \| [`IRQFile`](../interfaces/rq_querier.IRQFile.md) \| [`IRQSearchRecord`](../interfaces/rq_querier.IRQSearchRecord.md) \| [`IRQArgs`](../interfaces/rq_querier.IRQArgs.md)

Single arg, can take many shapes

#### Defined in

[rq-querier.ts:128](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L128)

## Functions

### buildRQMutation

▸ **buildRQMutation**(`rqSchema`, `...mutations`): [`RQQueryBuilder`](../classes/rq_querier.RQQueryBuilder.md)

Builds a rq mutation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rqSchema` | [`RQRootSchema`](../interfaces/base_Root_rq.RQRootSchema.md) | - |
| `...mutations` | [`IRQQueryObj`](../interfaces/rq_querier.IRQQueryObj.md)[] | the mutations to run |

#### Returns

[`RQQueryBuilder`](../classes/rq_querier.RQQueryBuilder.md)

a rq query class instance

#### Defined in

[rq-querier.ts:702](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L702)

___

### buildRQQuery

▸ **buildRQQuery**(`rqSchema`, `...queries`): [`RQQueryBuilder`](../classes/rq_querier.RQQueryBuilder.md)

Builds a rq query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rqSchema` | [`RQRootSchema`](../interfaces/base_Root_rq.RQRootSchema.md) | - |
| `...queries` | [`IRQQueryObj`](../interfaces/rq_querier.IRQQueryObj.md)[] | the queries to run |

#### Returns

[`RQQueryBuilder`](../classes/rq_querier.RQQueryBuilder.md)

a rq query class instance

#### Defined in

[rq-querier.ts:693](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L693)

___

### oldXMLHttpRequest

▸ **oldXMLHttpRequest**(`host`, `body`, `query`, `headers?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `host` | `string` |
| `body` | `FormData` |
| `query` | [`RQQueryBuilder`](../classes/rq_querier.RQQueryBuilder.md) |
| `headers?` | `any` |

#### Returns

`Promise`\<`any`\>

#### Defined in

[rq-querier.ts:720](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L720)

___

### rqQuery

▸ **rqQuery**(`query`, `options?`): `Promise`\<[`IRQEndpointValue`](../interfaces/rq_querier.IRQEndpointValue.md)\>

Executes a rq query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | [`RQQueryBuilder`](../classes/rq_querier.RQQueryBuilder.md) | the query to run |
| `options?` | `Object` | - |
| `options.host?` | `string` | a host, required when running in NodeJS |
| `options.merge?` | `boolean` | whether to merge rq queries in one, adds delay to the queries, might be unwanted |
| `options.mergeMS?` | `number` | how many ms of delay to add, default 70 |
| `options.progresser?` | (`arg`: [`IXMLHttpRequestProgressInfo`](../interfaces/rq_querier.IXMLHttpRequestProgressInfo.md)) => `void` | to track progress |

#### Returns

`Promise`\<[`IRQEndpointValue`](../interfaces/rq_querier.IRQEndpointValue.md)\>

a promise for a rq endpoint value

#### Defined in

[rq-querier.ts:772](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L772)
