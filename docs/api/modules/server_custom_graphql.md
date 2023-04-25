[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/custom-graphql

# Module: server/custom-graphql

This file provides the utility that builds custom graphql endpoints

## Table of contents

### Interfaces

- [ICustomTokenGQLQueryDefinition](../interfaces/server_custom_graphql.ICustomTokenGQLQueryDefinition.md)
- [ICustomTokensType](../interfaces/server_custom_graphql.ICustomTokensType.md)
- [IReferredTokenStructure](../interfaces/server_custom_graphql.IReferredTokenStructure.md)

### Functions

- [buildCustomTokenQueries](server_custom_graphql.md#buildcustomtokenqueries)

## Functions

### buildCustomTokenQueries

▸ **buildCustomTokenQueries**(`appData`, `customTokens`): [`IGQLQueryFieldsDefinitionType`](../interfaces/base_Root_gql.IGQLQueryFieldsDefinitionType.md)

This function contains a customs tokens type into a real
graphql definition

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | the application data |
| `customTokens` | [`ICustomTokensType`](../interfaces/server_custom_graphql.ICustomTokensType.md) | the customs token definition |

#### Returns

[`IGQLQueryFieldsDefinitionType`](../interfaces/base_Root_gql.IGQLQueryFieldsDefinitionType.md)

#### Defined in

[server/custom-graphql/index.ts:103](https://github.com/onzag/itemize/blob/f2db74a5/server/custom-graphql/index.ts#L103)
