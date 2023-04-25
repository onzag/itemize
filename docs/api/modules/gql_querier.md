[@onzag/itemize](../README.md) / [Modules](../modules.md) / gql-querier

# Module: gql-querier

Contains functions to perform gql queries as well
as the product interfaces for these queries

## Table of contents

### Classes

- [GQLEnum](../classes/gql_querier.GQLEnum.md)
- [GQLQuery](../classes/gql_querier.GQLQuery.md)
- [GQLRaw](../classes/gql_querier.GQLRaw.md)
- [GQLVar](../classes/gql_querier.GQLVar.md)

### Interfaces

- [IGQLArgs](../interfaces/gql_querier.IGQLArgs.md)
- [IGQLEndpointValue](../interfaces/gql_querier.IGQLEndpointValue.md)
- [IGQLFile](../interfaces/gql_querier.IGQLFile.md)
- [IGQLQueryObj](../interfaces/gql_querier.IGQLQueryObj.md)
- [IGQLRequestFields](../interfaces/gql_querier.IGQLRequestFields.md)
- [IGQLSearchRecord](../interfaces/gql_querier.IGQLSearchRecord.md)
- [IGQLSearchRecordsContainer](../interfaces/gql_querier.IGQLSearchRecordsContainer.md)
- [IGQLSearchResultsContainer](../interfaces/gql_querier.IGQLSearchResultsContainer.md)
- [IGQLValue](../interfaces/gql_querier.IGQLValue.md)
- [IXMLHttpRequestProgressInfo](../interfaces/gql_querier.IXMLHttpRequestProgressInfo.md)

### Type aliases

- [ProgresserFn](gql_querier.md#progresserfn)

### Functions

- [buildGqlMutation](gql_querier.md#buildgqlmutation)
- [buildGqlQuery](gql_querier.md#buildgqlquery)
- [gqlQuery](gql_querier.md#gqlquery)
- [oldXMLHttpRequest](gql_querier.md#oldxmlhttprequest)

## Type aliases

### ProgresserFn

Ƭ **ProgresserFn**: (`arg`: [`IXMLHttpRequestProgressInfo`](../interfaces/gql_querier.IXMLHttpRequestProgressInfo.md)) => `void`

#### Type declaration

▸ (`arg`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`IXMLHttpRequestProgressInfo`](../interfaces/gql_querier.IXMLHttpRequestProgressInfo.md) |

##### Returns

`void`

#### Defined in

[gql-querier.ts:163](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L163)

## Functions

### buildGqlMutation

▸ **buildGqlMutation**(...`mutations`): [`GQLQuery`](../classes/gql_querier.GQLQuery.md)

Builds a graphql mutation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...mutations` | [`IGQLQueryObj`](../interfaces/gql_querier.IGQLQueryObj.md)[] | the mutations to run |

#### Returns

[`GQLQuery`](../classes/gql_querier.GQLQuery.md)

a grapqhl query class instance

#### Defined in

[gql-querier.ts:740](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L740)

___

### buildGqlQuery

▸ **buildGqlQuery**(...`queries`): [`GQLQuery`](../classes/gql_querier.GQLQuery.md)

Builds a graphql query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...queries` | [`IGQLQueryObj`](../interfaces/gql_querier.IGQLQueryObj.md)[] | the queries to run |

#### Returns

[`GQLQuery`](../classes/gql_querier.GQLQuery.md)

a grapqhl query class instance

#### Defined in

[gql-querier.ts:731](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L731)

___

### gqlQuery

▸ **gqlQuery**(`query`, `options?`): `Promise`<[`IGQLEndpointValue`](../interfaces/gql_querier.IGQLEndpointValue.md)\>

Executes a graphql query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | [`GQLQuery`](../classes/gql_querier.GQLQuery.md) | the query to run |
| `options?` | `Object` | - |
| `options.host?` | `string` | a host, required when running in NodeJS |
| `options.merge?` | `boolean` | whether to merge graphql queries in one, adds delay to the queries, might be unwanted |
| `options.mergeMS?` | `number` | how many ms of delay to add, default 70 |
| `options.progresser?` | (`arg`: [`IXMLHttpRequestProgressInfo`](../interfaces/gql_querier.IXMLHttpRequestProgressInfo.md)) => `void` | - |

#### Returns

`Promise`<[`IGQLEndpointValue`](../interfaces/gql_querier.IGQLEndpointValue.md)\>

a promise for a graphql endpoint value

#### Defined in

[gql-querier.ts:803](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L803)

___

### oldXMLHttpRequest

▸ **oldXMLHttpRequest**(`host`, `body`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `host` | `string` |
| `body` | `FormData` |
| `query` | [`GQLQuery`](../classes/gql_querier.GQLQuery.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[gql-querier.ts:757](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L757)
