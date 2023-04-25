[@onzag/itemize](../README.md) / [Modules](../modules.md) / [gql-querier](../modules/gql_querier.md) / GQLQuery

# Class: GQLQuery

[gql-querier](../modules/gql_querier.md).GQLQuery

Graphql helper class in order to build proper form data
queries and mutations to the grapqhl api refer to
https://github.com/jaydenseric/graphql-multipart-request-spec

## Table of contents

### Constructors

- [constructor](gql_querier.GQLQuery.md#constructor)

### Properties

- [foundUnprocessedArgFiles](gql_querier.GQLQuery.md#foundunprocessedargfiles)
- [listeners](gql_querier.GQLQuery.md#listeners)
- [processedQueries](gql_querier.GQLQuery.md#processedqueries)
- [progressers](gql_querier.GQLQuery.md#progressers)
- [type](gql_querier.GQLQuery.md#type)
- [unprocessedQueries](gql_querier.GQLQuery.md#unprocessedqueries)

### Methods

- [addEventListenerOnReplyInformed](gql_querier.GQLQuery.md#addeventlisteneronreplyinformed)
- [addProgresserListener](gql_querier.GQLQuery.md#addprogresserlistener)
- [findFilesAndProcessArgs](gql_querier.GQLQuery.md#findfilesandprocessargs)
- [getAttachments](gql_querier.GQLQuery.md#getattachments)
- [getMainQueryArguments](gql_querier.GQLQuery.md#getmainqueryarguments)
- [getMap](gql_querier.GQLQuery.md#getmap)
- [getOperations](gql_querier.GQLQuery.md#getoperations)
- [getQueries](gql_querier.GQLQuery.md#getqueries)
- [getQueryByIndex](gql_querier.GQLQuery.md#getquerybyindex)
- [getServerSideQueryByIndex](gql_querier.GQLQuery.md#getserversidequerybyindex)
- [getVariables](gql_querier.GQLQuery.md#getvariables)
- [informProgress](gql_querier.GQLQuery.md#informprogress)
- [informReply](gql_querier.GQLQuery.md#informreply)
- [isMergableWith](gql_querier.GQLQuery.md#ismergablewith)
- [isNameMergableWith](gql_querier.GQLQuery.md#isnamemergablewith)
- [mergeWith](gql_querier.GQLQuery.md#mergewith)

## Constructors

### constructor

• **new GQLQuery**(`type`, `queries`)

Build a graphql query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | ``"query"`` \| ``"mutation"`` | query or mutation |
| `queries` | [`IGQLQueryObj`](../interfaces/gql_querier.IGQLQueryObj.md)[] | the queries that we want to execute |

#### Defined in

[gql-querier.ts:198](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L198)

## Properties

### foundUnprocessedArgFiles

• `Private` **foundUnprocessedArgFiles**: [`IGQLFile`](../interfaces/gql_querier.IGQLFile.md)[]

Files that have been found that are unprocessed

#### Defined in

[gql-querier.ts:183](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L183)

___

### listeners

• `Private` **listeners**: `IGQLQueryListenerType`[] = `[]`

list of listeners

#### Defined in

[gql-querier.ts:187](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L187)

___

### processedQueries

• `Private` **processedQueries**: [`IGQLQueryObj`](../interfaces/gql_querier.IGQLQueryObj.md)[]

All the processed queries from the query list

#### Defined in

[gql-querier.ts:174](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L174)

___

### progressers

• `Private` **progressers**: [`ProgresserFn`](../modules/gql_querier.md#progresserfn)[] = `[]`

list of progress listeners

#### Defined in

[gql-querier.ts:191](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L191)

___

### type

• `Private` **type**: ``"query"`` \| ``"mutation"``

The type of this query

#### Defined in

[gql-querier.ts:179](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L179)

___

### unprocessedQueries

• `Private` **unprocessedQueries**: [`IGQLQueryObj`](../interfaces/gql_querier.IGQLQueryObj.md)[]

#### Defined in

[gql-querier.ts:175](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L175)

## Methods

### addEventListenerOnReplyInformed

▸ **addEventListenerOnReplyInformed**(`listener`): `void`

add a listener for when a reply is informed

#### Parameters

| Name | Type |
| :------ | :------ |
| `listener` | `IGQLQueryListenerType` |

#### Returns

`void`

#### Defined in

[gql-querier.ts:370](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L370)

___

### addProgresserListener

▸ **addProgresserListener**(`prog`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prog` | (`arg`: [`IXMLHttpRequestProgressInfo`](../interfaces/gql_querier.IXMLHttpRequestProgressInfo.md)) => `void` |

#### Returns

`void`

#### Defined in

[gql-querier.ts:350](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L350)

___

### findFilesAndProcessArgs

▸ `Private` **findFilesAndProcessArgs**(`arg`): `any`

Finds files in the graphql query and processes
all the files as they are required in order to retrieve
their streams and file content

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the argument in question |

#### Returns

`any`

new processed args

#### Defined in

[gql-querier.ts:451](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L451)

___

### getAttachments

▸ **getAttachments**(): [`IGQLFile`](../interfaces/gql_querier.IGQLFile.md)[]

Provides all the attached files

#### Returns

[`IGQLFile`](../interfaces/gql_querier.IGQLFile.md)[]

#### Defined in

[gql-querier.ts:417](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L417)

___

### getMainQueryArguments

▸ `Private` **getMainQueryArguments**(): `Object`

Provides the arguments that will be passed to the main query as in
how the main query is expected to recieve those arguments

#### Returns

`Object`

#### Defined in

[gql-querier.ts:436](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L436)

___

### getMap

▸ **getMap**(): `Object`

Provides the map of the variables to files and/or streams that exists in the
file form that will map the variables to the form data

#### Returns

`Object`

#### Defined in

[gql-querier.ts:406](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L406)

___

### getOperations

▸ **getOperations**(): `Object`

Provides the operations part of the formdata field in json form

#### Returns

`Object`

the formdata for the operations

| Name | Type |
| :------ | :------ |
| `query` | `string` |
| `variables` | `Object` |

#### Defined in

[gql-querier.ts:395](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L395)

___

### getQueries

▸ **getQueries**(`unprocessed?`): [`IGQLQueryObj`](../interfaces/gql_querier.IGQLQueryObj.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `unprocessed?` | `boolean` |

#### Returns

[`IGQLQueryObj`](../interfaces/gql_querier.IGQLQueryObj.md)[]

#### Defined in

[gql-querier.ts:354](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L354)

___

### getQueryByIndex

▸ **getQueryByIndex**(`index`, `unprocessed?`): [`IGQLQueryObj`](../interfaces/gql_querier.IGQLQueryObj.md)

Provides a processed query given an index

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `unprocessed?` | `boolean` |

#### Returns

[`IGQLQueryObj`](../interfaces/gql_querier.IGQLQueryObj.md)

#### Defined in

[gql-querier.ts:363](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L363)

___

### getServerSideQueryByIndex

▸ **getServerSideQueryByIndex**(`index`): [`IGQLQueryObj`](../interfaces/gql_querier.IGQLQueryObj.md)

Unlike providing a standard query object this provides
a version of the query the server side would recieve once it is
parsed, rather than a client side version

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

[`IGQLQueryObj`](../interfaces/gql_querier.IGQLQueryObj.md)

#### Defined in

[gql-querier.ts:381](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L381)

___

### getVariables

▸ `Private` **getVariables**(): `Object`

Provides all the variables that are in use for the graphql formdata
spec that will map to the operations

#### Returns

`Object`

#### Defined in

[gql-querier.ts:425](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L425)

___

### informProgress

▸ **informProgress**(`arg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`IXMLHttpRequestProgressInfo`](../interfaces/gql_querier.IXMLHttpRequestProgressInfo.md) |

#### Returns

`void`

#### Defined in

[gql-querier.ts:346](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L346)

___

### informReply

▸ **informReply**(`reply`): `void`

inform a reply to the query in case this has event listeners to that

#### Parameters

| Name | Type |
| :------ | :------ |
| `reply` | [`IGQLEndpointValue`](../interfaces/gql_querier.IGQLEndpointValue.md) |

#### Returns

`void`

#### Defined in

[gql-querier.ts:342](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L342)

___

### isMergableWith

▸ **isMergableWith**(`query`): `boolean`

Check whether it's mergable

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`GQLQuery`](gql_querier.GQLQuery.md) |

#### Returns

`boolean`

#### Defined in

[gql-querier.ts:224](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L224)

___

### isNameMergableWith

▸ `Private` **isNameMergableWith**(`ourValue`, `theirValue`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ourValue` | [`IGQLQueryObj`](../interfaces/gql_querier.IGQLQueryObj.md) |
| `theirValue` | [`IGQLQueryObj`](../interfaces/gql_querier.IGQLQueryObj.md) |

#### Returns

`boolean`

#### Defined in

[gql-querier.ts:254](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L254)

___

### mergeWith

▸ **mergeWith**(`query`): [`string`, `string`][]

Merge with it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | [`GQLQuery`](gql_querier.GQLQuery.md) | the query to merge with |

#### Returns

[`string`, `string`][]

a list of aliases to remap the results from to the given name

#### Defined in

[gql-querier.ts:274](https://github.com/onzag/itemize/blob/f2db74a5/gql-querier.ts#L274)
