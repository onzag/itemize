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

### Methods

- [addEventListenerOnReplyInformed](gql_querier.GQLQuery.md#addeventlisteneronreplyinformed)
- [addProgresserListener](gql_querier.GQLQuery.md#addprogresserlistener)
- [findFilesAndProcessArgs](gql_querier.GQLQuery.md#findfilesandprocessargs)
- [getAttachments](gql_querier.GQLQuery.md#getattachments)
- [getMainQueryArguments](gql_querier.GQLQuery.md#getmainqueryarguments)
- [getMap](gql_querier.GQLQuery.md#getmap)
- [getOperations](gql_querier.GQLQuery.md#getoperations)
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

[gql-querier.ts:192](https://github.com/onzag/itemize/blob/f2f29986/gql-querier.ts#L192)

## Properties

### foundUnprocessedArgFiles

• `Private` **foundUnprocessedArgFiles**: [`IGQLFile`](../interfaces/gql_querier.IGQLFile.md)[]

Files that have been found that are unprocessed

#### Defined in

[gql-querier.ts:177](https://github.com/onzag/itemize/blob/f2f29986/gql-querier.ts#L177)

___

### listeners

• `Private` **listeners**: `IGQLQueryListenerType`[] = `[]`

list of listeners

#### Defined in

[gql-querier.ts:181](https://github.com/onzag/itemize/blob/f2f29986/gql-querier.ts#L181)

___

### processedQueries

• `Private` **processedQueries**: [`IGQLQueryObj`](../interfaces/gql_querier.IGQLQueryObj.md)[]

All the processed queries from the query list

#### Defined in

[gql-querier.ts:169](https://github.com/onzag/itemize/blob/f2f29986/gql-querier.ts#L169)

___

### progressers

• `Private` **progressers**: [`ProgresserFn`](../modules/gql_querier.md#progresserfn)[] = `[]`

list of progress listeners

#### Defined in

[gql-querier.ts:185](https://github.com/onzag/itemize/blob/f2f29986/gql-querier.ts#L185)

___

### type

• `Private` **type**: ``"query"`` \| ``"mutation"``

The type of this query

#### Defined in

[gql-querier.ts:173](https://github.com/onzag/itemize/blob/f2f29986/gql-querier.ts#L173)

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

[gql-querier.ts:341](https://github.com/onzag/itemize/blob/f2f29986/gql-querier.ts#L341)

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

[gql-querier.ts:334](https://github.com/onzag/itemize/blob/f2f29986/gql-querier.ts#L334)

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

[gql-querier.ts:405](https://github.com/onzag/itemize/blob/f2f29986/gql-querier.ts#L405)

___

### getAttachments

▸ **getAttachments**(): [`IGQLFile`](../interfaces/gql_querier.IGQLFile.md)[]

Provides all the attached files

#### Returns

[`IGQLFile`](../interfaces/gql_querier.IGQLFile.md)[]

#### Defined in

[gql-querier.ts:371](https://github.com/onzag/itemize/blob/f2f29986/gql-querier.ts#L371)

___

### getMainQueryArguments

▸ `Private` **getMainQueryArguments**(): `Object`

Provides the arguments that will be passed to the main query as in
how the main query is expected to recieve those arguments

#### Returns

`Object`

#### Defined in

[gql-querier.ts:390](https://github.com/onzag/itemize/blob/f2f29986/gql-querier.ts#L390)

___

### getMap

▸ **getMap**(): `Object`

Provides the map of the variables to files and/or streams that exists in the
file form that will map the variables to the form data

#### Returns

`Object`

#### Defined in

[gql-querier.ts:360](https://github.com/onzag/itemize/blob/f2f29986/gql-querier.ts#L360)

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

[gql-querier.ts:349](https://github.com/onzag/itemize/blob/f2f29986/gql-querier.ts#L349)

___

### getVariables

▸ `Private` **getVariables**(): `Object`

Provides all the variables that are in use for the graphql formdata
spec that will map to the operations

#### Returns

`Object`

#### Defined in

[gql-querier.ts:379](https://github.com/onzag/itemize/blob/f2f29986/gql-querier.ts#L379)

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

[gql-querier.ts:330](https://github.com/onzag/itemize/blob/f2f29986/gql-querier.ts#L330)

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

[gql-querier.ts:326](https://github.com/onzag/itemize/blob/f2f29986/gql-querier.ts#L326)

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

[gql-querier.ts:217](https://github.com/onzag/itemize/blob/f2f29986/gql-querier.ts#L217)

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

[gql-querier.ts:247](https://github.com/onzag/itemize/blob/f2f29986/gql-querier.ts#L247)

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

[gql-querier.ts:267](https://github.com/onzag/itemize/blob/f2f29986/gql-querier.ts#L267)
