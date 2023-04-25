[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/resolvers/actions/search

# Module: server/resolvers/actions/search

## Table of contents

### Functions

- [findLastRecordDate](server_resolvers_actions_search.md#findlastrecorddate)
- [searchItemDefinition](server_resolvers_actions_search.md#searchitemdefinition)
- [searchItemDefinitionFn](server_resolvers_actions_search.md#searchitemdefinitionfn)
- [searchItemDefinitionTraditional](server_resolvers_actions_search.md#searchitemdefinitiontraditional)
- [searchItemDefinitionTraditionalFn](server_resolvers_actions_search.md#searchitemdefinitiontraditionalfn)
- [searchModule](server_resolvers_actions_search.md#searchmodule)
- [searchModuleFn](server_resolvers_actions_search.md#searchmodulefn)
- [searchModuleTraditional](server_resolvers_actions_search.md#searchmoduletraditional)
- [searchModuleTraditionalFn](server_resolvers_actions_search.md#searchmoduletraditionalfn)

## Functions

### findLastRecordDate

▸ **findLastRecordDate**(`comp`, `p`, ...`records`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `comp` | ``"min"`` \| ``"max"`` |
| `p` | `string` |
| `...records` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[][] |

#### Returns

`string`

#### Defined in

[server/resolvers/actions/search.ts:45](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/actions/search.ts#L45)

___

### searchItemDefinition

▸ **searchItemDefinition**(`appData`, `resolverArgs`, `resolverItemDefinition`, `traditional?`): `Promise`<[`IGQLSearchRecordsContainer`](../interfaces/gql_querier.IGQLSearchRecordsContainer.md) \| [`IGQLSearchResultsContainer`](../interfaces/gql_querier.IGQLSearchResultsContainer.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `resolverArgs` | [`IGraphQLIdefResolverArgs`](../interfaces/base_Root_gql.IGraphQLIdefResolverArgs.md) |
| `resolverItemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |
| `traditional?` | `boolean` |

#### Returns

`Promise`<[`IGQLSearchRecordsContainer`](../interfaces/gql_querier.IGQLSearchRecordsContainer.md) \| [`IGQLSearchResultsContainer`](../interfaces/gql_querier.IGQLSearchResultsContainer.md)\>

#### Defined in

[server/resolvers/actions/search.ts:712](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/actions/search.ts#L712)

___

### searchItemDefinitionFn

▸ **searchItemDefinitionFn**(`appData`): [`FGraphQLIdefResolverType`](base_Root_gql.md#fgraphqlidefresolvertype)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

[`FGraphQLIdefResolverType`](base_Root_gql.md#fgraphqlidefresolvertype)

#### Defined in

[server/resolvers/actions/search.ts:1369](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/actions/search.ts#L1369)

___

### searchItemDefinitionTraditional

▸ **searchItemDefinitionTraditional**(`appData`, `resolverArgs`, `itemDefinition`): `Promise`<[`IGQLSearchRecordsContainer`](../interfaces/gql_querier.IGQLSearchRecordsContainer.md) \| [`IGQLSearchResultsContainer`](../interfaces/gql_querier.IGQLSearchResultsContainer.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `resolverArgs` | [`IGraphQLIdefResolverArgs`](../interfaces/base_Root_gql.IGraphQLIdefResolverArgs.md) |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |

#### Returns

`Promise`<[`IGQLSearchRecordsContainer`](../interfaces/gql_querier.IGQLSearchRecordsContainer.md) \| [`IGQLSearchResultsContainer`](../interfaces/gql_querier.IGQLSearchResultsContainer.md)\>

#### Defined in

[server/resolvers/actions/search.ts:704](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/actions/search.ts#L704)

___

### searchItemDefinitionTraditionalFn

▸ **searchItemDefinitionTraditionalFn**(`appData`): [`FGraphQLIdefResolverType`](base_Root_gql.md#fgraphqlidefresolvertype)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

[`FGraphQLIdefResolverType`](base_Root_gql.md#fgraphqlidefresolvertype)

#### Defined in

[server/resolvers/actions/search.ts:1377](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/actions/search.ts#L1377)

___

### searchModule

▸ **searchModule**(`appData`, `resolverArgs`, `mod`, `traditional?`): `Promise`<[`IGQLSearchRecordsContainer`](../interfaces/gql_querier.IGQLSearchRecordsContainer.md) \| [`IGQLSearchResultsContainer`](../interfaces/gql_querier.IGQLSearchResultsContainer.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `resolverArgs` | [`IGraphQLIdefResolverArgs`](../interfaces/base_Root_gql.IGraphQLIdefResolverArgs.md) |
| `mod` | [`default`](../classes/base_Root_Module.default.md) |
| `traditional?` | `boolean` |

#### Returns

`Promise`<[`IGQLSearchRecordsContainer`](../interfaces/gql_querier.IGQLSearchRecordsContainer.md) \| [`IGQLSearchResultsContainer`](../interfaces/gql_querier.IGQLSearchResultsContainer.md)\>

#### Defined in

[server/resolvers/actions/search.ts:66](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/actions/search.ts#L66)

___

### searchModuleFn

▸ **searchModuleFn**(`appData`): [`FGraphQLModResolverType`](base_Root_gql.md#fgraphqlmodresolvertype)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

[`FGraphQLModResolverType`](base_Root_gql.md#fgraphqlmodresolvertype)

#### Defined in

[server/resolvers/actions/search.ts:1373](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/actions/search.ts#L1373)

___

### searchModuleTraditional

▸ **searchModuleTraditional**(`appData`, `resolverArgs`, `mod`): `Promise`<[`IGQLSearchRecordsContainer`](../interfaces/gql_querier.IGQLSearchRecordsContainer.md) \| [`IGQLSearchResultsContainer`](../interfaces/gql_querier.IGQLSearchResultsContainer.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `resolverArgs` | [`IGraphQLIdefResolverArgs`](../interfaces/base_Root_gql.IGraphQLIdefResolverArgs.md) |
| `mod` | [`default`](../classes/base_Root_Module.default.md) |

#### Returns

`Promise`<[`IGQLSearchRecordsContainer`](../interfaces/gql_querier.IGQLSearchRecordsContainer.md) \| [`IGQLSearchResultsContainer`](../interfaces/gql_querier.IGQLSearchResultsContainer.md)\>

#### Defined in

[server/resolvers/actions/search.ts:58](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/actions/search.ts#L58)

___

### searchModuleTraditionalFn

▸ **searchModuleTraditionalFn**(`appData`): [`FGraphQLModResolverType`](base_Root_gql.md#fgraphqlmodresolvertype)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

[`FGraphQLModResolverType`](base_Root_gql.md#fgraphqlmodresolvertype)

#### Defined in

[server/resolvers/actions/search.ts:1381](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/actions/search.ts#L1381)
