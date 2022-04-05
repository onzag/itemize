[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/resolvers/actions/search

# Module: server/resolvers/actions/search

## Table of contents

### Functions

- [findLastRecordLastModifiedDate](server_resolvers_actions_search.md#findlastrecordlastmodifieddate)
- [searchItemDefinition](server_resolvers_actions_search.md#searchitemdefinition)
- [searchItemDefinitionFn](server_resolvers_actions_search.md#searchitemdefinitionfn)
- [searchItemDefinitionTraditional](server_resolvers_actions_search.md#searchitemdefinitiontraditional)
- [searchItemDefinitionTraditionalFn](server_resolvers_actions_search.md#searchitemdefinitiontraditionalfn)
- [searchModule](server_resolvers_actions_search.md#searchmodule)
- [searchModuleFn](server_resolvers_actions_search.md#searchmodulefn)
- [searchModuleTraditional](server_resolvers_actions_search.md#searchmoduletraditional)
- [searchModuleTraditionalFn](server_resolvers_actions_search.md#searchmoduletraditionalfn)

## Functions

### findLastRecordLastModifiedDate

▸ **findLastRecordLastModifiedDate**(...`records`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...records` | [`IGQLSearchRecord`](../interfaces/gql_querier.IGQLSearchRecord.md)[][] |

#### Returns

`string`

#### Defined in

[server/resolvers/actions/search.ts:46](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/actions/search.ts#L46)

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

[server/resolvers/actions/search.ts:487](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/actions/search.ts#L487)

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

[server/resolvers/actions/search.ts:947](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/actions/search.ts#L947)

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

[server/resolvers/actions/search.ts:479](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/actions/search.ts#L479)

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

[server/resolvers/actions/search.ts:955](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/actions/search.ts#L955)

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

[server/resolvers/actions/search.ts:65](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/actions/search.ts#L65)

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

[server/resolvers/actions/search.ts:951](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/actions/search.ts#L951)

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

[server/resolvers/actions/search.ts:57](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/actions/search.ts#L57)

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

[server/resolvers/actions/search.ts:959](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/actions/search.ts#L959)
