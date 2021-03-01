[](../README.md) / [Exports](../modules.md) / gql-querier

# Module: gql-querier

Contains functions to perform gql queries as well
as the product interfaces for these queries

## Table of contents

### Classes

- [GQLEnum](../classes/gql_querier.gqlenum.md)
- [GQLQuery](../classes/gql_querier.gqlquery.md)
- [GQLRaw](../classes/gql_querier.gqlraw.md)
- [GQLVar](../classes/gql_querier.gqlvar.md)

### Interfaces

- [IGQLArgs](../interfaces/gql_querier.igqlargs.md)
- [IGQLEndpointValue](../interfaces/gql_querier.igqlendpointvalue.md)
- [IGQLFile](../interfaces/gql_querier.igqlfile.md)
- [IGQLQueryObj](../interfaces/gql_querier.igqlqueryobj.md)
- [IGQLRequestFields](../interfaces/gql_querier.igqlrequestfields.md)
- [IGQLSearchRecord](../interfaces/gql_querier.igqlsearchrecord.md)
- [IGQLSearchRecordsContainer](../interfaces/gql_querier.igqlsearchrecordscontainer.md)
- [IGQLSearchResultsContainer](../interfaces/gql_querier.igqlsearchresultscontainer.md)
- [IGQLValue](../interfaces/gql_querier.igqlvalue.md)

### Functions

- [buildGqlMutation](gql_querier.md#buildgqlmutation)
- [buildGqlQuery](gql_querier.md#buildgqlquery)
- [gqlQuery](gql_querier.md#gqlquery)

## Functions

### buildGqlMutation

▸ **buildGqlMutation**(...`mutations`: [*IGQLQueryObj*](../interfaces/gql_querier.igqlqueryobj.md)[]): [*GQLQuery*](../classes/gql_querier.gqlquery.md)

Builds a graphql mutation

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`...mutations` | [*IGQLQueryObj*](../interfaces/gql_querier.igqlqueryobj.md)[] | the mutations to run   |

**Returns:** [*GQLQuery*](../classes/gql_querier.gqlquery.md)

a grapqhl query class instance

Defined in: [gql-querier.ts:645](https://github.com/onzag/itemize/blob/55e63f2c/gql-querier.ts#L645)

___

### buildGqlQuery

▸ **buildGqlQuery**(...`queries`: [*IGQLQueryObj*](../interfaces/gql_querier.igqlqueryobj.md)[]): [*GQLQuery*](../classes/gql_querier.gqlquery.md)

Builds a graphql query

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`...queries` | [*IGQLQueryObj*](../interfaces/gql_querier.igqlqueryobj.md)[] | the queries to run   |

**Returns:** [*GQLQuery*](../classes/gql_querier.gqlquery.md)

a grapqhl query class instance

Defined in: [gql-querier.ts:636](https://github.com/onzag/itemize/blob/55e63f2c/gql-querier.ts#L636)

___

### gqlQuery

▸ **gqlQuery**(`query`: [*GQLQuery*](../classes/gql_querier.gqlquery.md), `options?`: { `host?`: *string* ; `merge?`: *boolean* ; `mergeMS?`: *number*  }): *Promise*<[*IGQLEndpointValue*](../interfaces/gql_querier.igqlendpointvalue.md)\>

Executes a graphql query

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`query` | [*GQLQuery*](../classes/gql_querier.gqlquery.md) | the query to run   |
`options?` | *object* | - |
`options.host?` | *string* | a host, required when running in NodeJS   |
`options.merge?` | *boolean* | whether to merge graphql queries in one, adds delay to the queries, might be unwanted   |
`options.mergeMS?` | *number* | how many ms of delay to add, default 70   |

**Returns:** *Promise*<[*IGQLEndpointValue*](../interfaces/gql_querier.igqlendpointvalue.md)\>

a promise for a graphql endpoint value

Defined in: [gql-querier.ts:665](https://github.com/onzag/itemize/blob/55e63f2c/gql-querier.ts#L665)
