[](../README.md) / [Exports](../modules.md) / server/custom-graphql

# Module: server/custom-graphql

This file provides the utility that builds custom graphql endpoints

## Table of contents

### Interfaces

- [ICustomTokenGQLQueryDefinition](../interfaces/server_custom_graphql.icustomtokengqlquerydefinition.md)
- [ICustomTokensType](../interfaces/server_custom_graphql.icustomtokenstype.md)
- [IReferredTokenStructure](../interfaces/server_custom_graphql.ireferredtokenstructure.md)

### Functions

- [buildCustomTokenQueries](server_custom_graphql.md#buildcustomtokenqueries)

## Functions

### buildCustomTokenQueries

▸ **buildCustomTokenQueries**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md), `customTokens`: [*ICustomTokensType*](../interfaces/server_custom_graphql.icustomtokenstype.md)): [*IGQLQueryFieldsDefinitionType*](../interfaces/base_root_gql.igqlqueryfieldsdefinitiontype.md)

This function contains a customs tokens type into a real
graphql definition

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) | the application data   |
`customTokens` | [*ICustomTokensType*](../interfaces/server_custom_graphql.icustomtokenstype.md) | the customs token definition    |

**Returns:** [*IGQLQueryFieldsDefinitionType*](../interfaces/base_root_gql.igqlqueryfieldsdefinitiontype.md)

Defined in: [server/custom-graphql/index.ts:103](https://github.com/onzag/itemize/blob/28218320/server/custom-graphql/index.ts#L103)
