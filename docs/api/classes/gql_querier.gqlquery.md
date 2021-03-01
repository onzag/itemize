[](../README.md) / [Exports](../modules.md) / [gql-querier](../modules/gql_querier.md) / GQLQuery

# Class: GQLQuery

[gql-querier](../modules/gql_querier.md).GQLQuery

Graphql helper class in order to build proper form data
queries and mutations to the grapqhl api refer to
https://github.com/jaydenseric/graphql-multipart-request-spec

## Table of contents

### Constructors

- [constructor](gql_querier.gqlquery.md#constructor)

### Properties

- [foundUnprocessedArgFiles](gql_querier.gqlquery.md#foundunprocessedargfiles)
- [listeners](gql_querier.gqlquery.md#listeners)
- [processedQueries](gql_querier.gqlquery.md#processedqueries)
- [type](gql_querier.gqlquery.md#type)

### Methods

- [addEventListenerOnReplyInformed](gql_querier.gqlquery.md#addeventlisteneronreplyinformed)
- [findFilesAndProcessArgs](gql_querier.gqlquery.md#findfilesandprocessargs)
- [getAttachments](gql_querier.gqlquery.md#getattachments)
- [getMainQueryArguments](gql_querier.gqlquery.md#getmainqueryarguments)
- [getMap](gql_querier.gqlquery.md#getmap)
- [getOperations](gql_querier.gqlquery.md#getoperations)
- [getVariables](gql_querier.gqlquery.md#getvariables)
- [informReply](gql_querier.gqlquery.md#informreply)
- [isMergableWith](gql_querier.gqlquery.md#ismergablewith)
- [isNameMergableWith](gql_querier.gqlquery.md#isnamemergablewith)
- [mergeWith](gql_querier.gqlquery.md#mergewith)

## Constructors

### constructor

\+ **new GQLQuery**(`type`: *query* \| *mutation*, `queries`: [*IGQLQueryObj*](../interfaces/gql_querier.igqlqueryobj.md)[]): [*GQLQuery*](gql_querier.gqlquery.md)

Build a graphql query

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`type` | *query* \| *mutation* | query or mutation   |
`queries` | [*IGQLQueryObj*](../interfaces/gql_querier.igqlqueryobj.md)[] | the queries that we want to execute    |

**Returns:** [*GQLQuery*](gql_querier.gqlquery.md)

Defined in: [gql-querier.ts:179](https://github.com/onzag/itemize/blob/0569bdf2/gql-querier.ts#L179)

## Properties

### foundUnprocessedArgFiles

• `Private` **foundUnprocessedArgFiles**: [*IGQLFile*](../interfaces/gql_querier.igqlfile.md)[]

Files that have been found that are unprocessed

Defined in: [gql-querier.ts:175](https://github.com/onzag/itemize/blob/0569bdf2/gql-querier.ts#L175)

___

### listeners

• `Private` **listeners**: IGQLQueryListenerType[]

list of listeners

Defined in: [gql-querier.ts:179](https://github.com/onzag/itemize/blob/0569bdf2/gql-querier.ts#L179)

___

### processedQueries

• `Private` **processedQueries**: [*IGQLQueryObj*](../interfaces/gql_querier.igqlqueryobj.md)[]

All the processed queries from the query list

Defined in: [gql-querier.ts:167](https://github.com/onzag/itemize/blob/0569bdf2/gql-querier.ts#L167)

___

### type

• `Private` **type**: *query* \| *mutation*

The type of this query

Defined in: [gql-querier.ts:171](https://github.com/onzag/itemize/blob/0569bdf2/gql-querier.ts#L171)

## Methods

### addEventListenerOnReplyInformed

▸ **addEventListenerOnReplyInformed**(`listener`: IGQLQueryListenerType): *void*

add a listener for when a reply is informed

#### Parameters:

Name | Type |
:------ | :------ |
`listener` | IGQLQueryListenerType |

**Returns:** *void*

Defined in: [gql-querier.ts:327](https://github.com/onzag/itemize/blob/0569bdf2/gql-querier.ts#L327)

___

### findFilesAndProcessArgs

▸ `Private`**findFilesAndProcessArgs**(`arg`: [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md)): *any*

Finds files in the graphql query and processes
all the files as they are required in order to retrieve
their streams and file content

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) | the argument in question   |

**Returns:** *any*

new processed args

Defined in: [gql-querier.ts:391](https://github.com/onzag/itemize/blob/0569bdf2/gql-querier.ts#L391)

___

### getAttachments

▸ **getAttachments**(): [*IGQLFile*](../interfaces/gql_querier.igqlfile.md)[]

Provides all the attached files

**Returns:** [*IGQLFile*](../interfaces/gql_querier.igqlfile.md)[]

Defined in: [gql-querier.ts:357](https://github.com/onzag/itemize/blob/0569bdf2/gql-querier.ts#L357)

___

### getMainQueryArguments

▸ `Private`**getMainQueryArguments**(): *object*

Provides the arguments that will be passed to the main query as in
how the main query is expected to recieve those arguments

**Returns:** *object*

Defined in: [gql-querier.ts:376](https://github.com/onzag/itemize/blob/0569bdf2/gql-querier.ts#L376)

___

### getMap

▸ **getMap**(): *object*

Provides the map of the variables to files and/or streams that exists in the
file form that will map the variables to the form data

**Returns:** *object*

Defined in: [gql-querier.ts:346](https://github.com/onzag/itemize/blob/0569bdf2/gql-querier.ts#L346)

___

### getOperations

▸ **getOperations**(): *object*

Provides the operations part of the formdata field in json form

**Returns:** *object*

Name | Type |
:------ | :------ |
`query` | *string* |
`variables` | *object* |

the formdata for the operations

Defined in: [gql-querier.ts:335](https://github.com/onzag/itemize/blob/0569bdf2/gql-querier.ts#L335)

___

### getVariables

▸ `Private`**getVariables**(): *object*

Provides all the variables that are in use for the graphql formdata
spec that will map to the operations

**Returns:** *object*

Defined in: [gql-querier.ts:365](https://github.com/onzag/itemize/blob/0569bdf2/gql-querier.ts#L365)

___

### informReply

▸ **informReply**(`reply`: [*IGQLEndpointValue*](../interfaces/gql_querier.igqlendpointvalue.md)): *void*

inform a reply to the query in case this has event listeners to that

#### Parameters:

Name | Type |
:------ | :------ |
`reply` | [*IGQLEndpointValue*](../interfaces/gql_querier.igqlendpointvalue.md) |

**Returns:** *void*

Defined in: [gql-querier.ts:320](https://github.com/onzag/itemize/blob/0569bdf2/gql-querier.ts#L320)

___

### isMergableWith

▸ **isMergableWith**(`query`: [*GQLQuery*](gql_querier.gqlquery.md)): *boolean*

Check whether it's mergable

#### Parameters:

Name | Type |
:------ | :------ |
`query` | [*GQLQuery*](gql_querier.gqlquery.md) |

**Returns:** *boolean*

Defined in: [gql-querier.ts:211](https://github.com/onzag/itemize/blob/0569bdf2/gql-querier.ts#L211)

___

### isNameMergableWith

▸ `Private`**isNameMergableWith**(`ourValue`: [*IGQLQueryObj*](../interfaces/gql_querier.igqlqueryobj.md), `theirValue`: [*IGQLQueryObj*](../interfaces/gql_querier.igqlqueryobj.md)): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`ourValue` | [*IGQLQueryObj*](../interfaces/gql_querier.igqlqueryobj.md) |
`theirValue` | [*IGQLQueryObj*](../interfaces/gql_querier.igqlqueryobj.md) |

**Returns:** *boolean*

Defined in: [gql-querier.ts:241](https://github.com/onzag/itemize/blob/0569bdf2/gql-querier.ts#L241)

___

### mergeWith

▸ **mergeWith**(`query`: [*GQLQuery*](gql_querier.gqlquery.md)): [*string*, *string*][]

Merge with it

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | [*GQLQuery*](gql_querier.gqlquery.md) | the query to merge with   |

**Returns:** [*string*, *string*][]

a list of aliases to remap the results from to the given name

Defined in: [gql-querier.ts:261](https://github.com/onzag/itemize/blob/0569bdf2/gql-querier.ts#L261)
