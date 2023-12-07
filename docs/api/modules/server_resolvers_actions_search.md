[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/resolvers/actions/search

# Module: server/resolvers/actions/search

## Table of contents

### Functions

- [findLastRecordDate](server_resolvers_actions_search.md#findlastrecorddate)
- [searchItemDefinition](server_resolvers_actions_search.md#searchitemdefinition)
- [searchItemDefinitionFn](server_resolvers_actions_search.md#searchitemdefinitionfn)
- [searchItemDefinitionFnRQ](server_resolvers_actions_search.md#searchitemdefinitionfnrq)
- [searchItemDefinitionTraditional](server_resolvers_actions_search.md#searchitemdefinitiontraditional)
- [searchItemDefinitionTraditionalFn](server_resolvers_actions_search.md#searchitemdefinitiontraditionalfn)
- [searchItemDefinitionTraditionalFnRQ](server_resolvers_actions_search.md#searchitemdefinitiontraditionalfnrq)
- [searchModule](server_resolvers_actions_search.md#searchmodule)
- [searchModuleFn](server_resolvers_actions_search.md#searchmodulefn)
- [searchModuleFnRQ](server_resolvers_actions_search.md#searchmodulefnrq)
- [searchModuleTraditional](server_resolvers_actions_search.md#searchmoduletraditional)
- [searchModuleTraditionalFn](server_resolvers_actions_search.md#searchmoduletraditionalfn)
- [searchModuleTraditionalFnRQ](server_resolvers_actions_search.md#searchmoduletraditionalfnrq)

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

[server/resolvers/actions/search.ts:47](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/search.ts#L47)

___

### searchItemDefinition

▸ **searchItemDefinition**(`appData`, `resolverArgs`, `resolverItemDefinition`, `opts?`): `Promise`<[`IGQLSearchRecordsContainer`](../interfaces/gql_querier.IGQLSearchRecordsContainer.md) \| [`IGQLSearchResultsContainer`](../interfaces/gql_querier.IGQLSearchResultsContainer.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `resolverArgs` | [`IGraphQLIdefResolverArgs`](../interfaces/base_Root_gql.IGraphQLIdefResolverArgs.md) |
| `resolverItemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |
| `opts` | `Object` |
| `opts.noLimitOffset?` | `boolean` |
| `opts.traditional?` | `boolean` |

#### Returns

`Promise`<[`IGQLSearchRecordsContainer`](../interfaces/gql_querier.IGQLSearchRecordsContainer.md) \| [`IGQLSearchResultsContainer`](../interfaces/gql_querier.IGQLSearchResultsContainer.md)\>

#### Defined in

[server/resolvers/actions/search.ts:1024](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/search.ts#L1024)

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

[server/resolvers/actions/search.ts:2014](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/search.ts#L2014)

___

### searchItemDefinitionFnRQ

▸ **searchItemDefinitionFnRQ**(`appData`): [`FRQIdefResolverType`](base_Root_rq.md#frqidefresolvertype)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

[`FRQIdefResolverType`](base_Root_rq.md#frqidefresolvertype)

#### Defined in

[server/resolvers/actions/search.ts:2030](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/search.ts#L2030)

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

[server/resolvers/actions/search.ts:1016](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/search.ts#L1016)

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

[server/resolvers/actions/search.ts:2022](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/search.ts#L2022)

___

### searchItemDefinitionTraditionalFnRQ

▸ **searchItemDefinitionTraditionalFnRQ**(`appData`): [`FRQIdefResolverType`](base_Root_rq.md#frqidefresolvertype)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

[`FRQIdefResolverType`](base_Root_rq.md#frqidefresolvertype)

#### Defined in

[server/resolvers/actions/search.ts:2038](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/search.ts#L2038)

___

### searchModule

▸ **searchModule**(`appData`, `resolverArgs`, `mod`, `opts?`): `Promise`<[`IGQLSearchRecordsContainer`](../interfaces/gql_querier.IGQLSearchRecordsContainer.md) \| [`IGQLSearchResultsContainer`](../interfaces/gql_querier.IGQLSearchResultsContainer.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `resolverArgs` | [`IGraphQLIdefResolverArgs`](../interfaces/base_Root_gql.IGraphQLIdefResolverArgs.md) |
| `mod` | [`default`](../classes/base_Root_Module.default.md) |
| `opts` | `Object` |
| `opts.noLimitOffset?` | `boolean` |
| `opts.traditional?` | `boolean` |

#### Returns

`Promise`<[`IGQLSearchRecordsContainer`](../interfaces/gql_querier.IGQLSearchRecordsContainer.md) \| [`IGQLSearchResultsContainer`](../interfaces/gql_querier.IGQLSearchResultsContainer.md)\>

#### Defined in

[server/resolvers/actions/search.ts:68](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/search.ts#L68)

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

[server/resolvers/actions/search.ts:2018](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/search.ts#L2018)

___

### searchModuleFnRQ

▸ **searchModuleFnRQ**(`appData`): [`FRQModResolverType`](base_Root_rq.md#frqmodresolvertype)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

[`FRQModResolverType`](base_Root_rq.md#frqmodresolvertype)

#### Defined in

[server/resolvers/actions/search.ts:2034](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/search.ts#L2034)

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

[server/resolvers/actions/search.ts:60](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/search.ts#L60)

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

[server/resolvers/actions/search.ts:2026](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/search.ts#L2026)

___

### searchModuleTraditionalFnRQ

▸ **searchModuleTraditionalFnRQ**(`appData`): [`FRQModResolverType`](base_Root_rq.md#frqmodresolvertype)

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

[`FRQModResolverType`](base_Root_rq.md#frqmodresolvertype)

#### Defined in

[server/resolvers/actions/search.ts:2042](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/actions/search.ts#L2042)
