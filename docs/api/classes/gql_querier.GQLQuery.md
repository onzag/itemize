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
- [reply](gql_querier.GQLQuery.md#reply)
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
- [getRQOperations](gql_querier.GQLQuery.md#getrqoperations)
- [getServerSideQueryByIndex](gql_querier.GQLQuery.md#getserversidequerybyindex)
- [getType](gql_querier.GQLQuery.md#gettype)
- [getVariables](gql_querier.GQLQuery.md#getvariables)
- [informProgress](gql_querier.GQLQuery.md#informprogress)
- [informReply](gql_querier.GQLQuery.md#informreply)
- [isContainedWithin](gql_querier.GQLQuery.md#iscontainedwithin)
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

[gql-querier.ts:220](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L220)

## Properties

### foundUnprocessedArgFiles

• `Private` **foundUnprocessedArgFiles**: [`IGQLFile`](../interfaces/gql_querier.IGQLFile.md)[]

Files that have been found that are unprocessed

#### Defined in

[gql-querier.ts:200](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L200)

___

### listeners

• `Private` **listeners**: `IGQLQueryListenerType`[] = `[]`

list of listeners

#### Defined in

[gql-querier.ts:204](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L204)

___

### processedQueries

• `Private` **processedQueries**: [`IGQLQueryObj`](../interfaces/gql_querier.IGQLQueryObj.md)[]

All the processed queries from the query list

#### Defined in

[gql-querier.ts:191](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L191)

___

### progressers

• `Private` **progressers**: [`ProgresserFn`](../modules/gql_querier.md#progresserfn)[] = `[]`

list of progress listeners

#### Defined in

[gql-querier.ts:208](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L208)

___

### reply

• **reply**: [`IGQLEndpointValue`](../interfaces/gql_querier.IGQLEndpointValue.md) = `null`

The current known reply for the query

#### Defined in

[gql-querier.ts:213](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L213)

___

### type

• `Private` **type**: ``"query"`` \| ``"mutation"``

The type of this query

#### Defined in

[gql-querier.ts:196](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L196)

___

### unprocessedQueries

• `Private` **unprocessedQueries**: [`IGQLQueryObj`](../interfaces/gql_querier.IGQLQueryObj.md)[]

#### Defined in

[gql-querier.ts:192](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L192)

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

[gql-querier.ts:417](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L417)

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

[gql-querier.ts:397](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L397)

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

[gql-querier.ts:506](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L506)

___

### getAttachments

▸ **getAttachments**(): [`IGQLFile`](../interfaces/gql_querier.IGQLFile.md)[]

Provides all the attached files

#### Returns

[`IGQLFile`](../interfaces/gql_querier.IGQLFile.md)[]

#### Defined in

[gql-querier.ts:472](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L472)

___

### getMainQueryArguments

▸ `Private` **getMainQueryArguments**(): `Object`

Provides the arguments that will be passed to the main query as in
how the main query is expected to recieve those arguments

#### Returns

`Object`

#### Defined in

[gql-querier.ts:491](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L491)

___

### getMap

▸ **getMap**(): `Object`

Provides the map of the variables to files and/or streams that exists in the
file form that will map the variables to the form data

#### Returns

`Object`

#### Defined in

[gql-querier.ts:461](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L461)

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

[gql-querier.ts:442](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L442)

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

[gql-querier.ts:401](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L401)

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

[gql-querier.ts:410](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L410)

___

### getRQOperations

▸ **getRQOperations**(): `any`

#### Returns

`any`

#### Defined in

[gql-querier.ts:449](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L449)

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

[gql-querier.ts:428](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L428)

___

### getType

▸ **getType**(): ``"query"`` \| ``"mutation"``

#### Returns

``"query"`` \| ``"mutation"``

#### Defined in

[gql-querier.ts:453](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L453)

___

### getVariables

▸ `Private` **getVariables**(): `Object`

Provides all the variables that are in use for the graphql formdata
spec that will map to the operations

#### Returns

`Object`

#### Defined in

[gql-querier.ts:480](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L480)

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

[gql-querier.ts:393](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L393)

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

[gql-querier.ts:388](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L388)

___

### isContainedWithin

▸ **isContainedWithin**(`query`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`GQLQuery`](gql_querier.GQLQuery.md) |

#### Returns

`boolean`

#### Defined in

[gql-querier.ts:276](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L276)

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

[gql-querier.ts:246](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L246)

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

[gql-querier.ts:300](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L300)

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

[gql-querier.ts:320](https://github.com/onzag/itemize/blob/a24376ed/gql-querier.ts#L320)
