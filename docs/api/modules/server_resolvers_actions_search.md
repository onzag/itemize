[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/resolvers/actions/search

# Module: server/resolvers/actions/search

## Table of contents

### Functions

- [findLastRecordDate](server_resolvers_actions_search.md#findlastrecorddate)
- [searchItemDefinition](server_resolvers_actions_search.md#searchitemdefinition)
- [searchItemDefinitionFnRQ](server_resolvers_actions_search.md#searchitemdefinitionfnrq)
- [searchItemDefinitionTraditional](server_resolvers_actions_search.md#searchitemdefinitiontraditional)
- [searchItemDefinitionTraditionalFnRQ](server_resolvers_actions_search.md#searchitemdefinitiontraditionalfnrq)
- [searchModule](server_resolvers_actions_search.md#searchmodule)
- [searchModuleFnRQ](server_resolvers_actions_search.md#searchmodulefnrq)
- [searchModuleTraditional](server_resolvers_actions_search.md#searchmoduletraditional)
- [searchModuleTraditionalFnRQ](server_resolvers_actions_search.md#searchmoduletraditionalfnrq)

## Functions

### findLastRecordDate

▸ **findLastRecordDate**(`comp`, `p`, `...records`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `comp` | ``"min"`` \| ``"max"`` |
| `p` | `string` |
| `...records` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[][] |

#### Returns

`string`

#### Defined in

[server/resolvers/actions/search.ts:48](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/actions/search.ts#L48)

___

### searchItemDefinition

▸ **searchItemDefinition**(`appData`, `resolverItemDefinition`, `resolverArgs`, `opts?`): `Promise`\<[`IRQSearchResultsContainer`](../interfaces/rq_querier.IRQSearchResultsContainer.md) \| [`IRQSearchRecordsContainer`](../interfaces/rq_querier.IRQSearchRecordsContainer.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `resolverItemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |
| `resolverArgs` | [`IRQResolverArgs`](../interfaces/base_Root_rq.IRQResolverArgs.md) |
| `opts` | `Object` |
| `opts.noLimitOffset?` | `boolean` |
| `opts.traditional?` | `boolean` |

#### Returns

`Promise`\<[`IRQSearchResultsContainer`](../interfaces/rq_querier.IRQSearchResultsContainer.md) \| [`IRQSearchRecordsContainer`](../interfaces/rq_querier.IRQSearchRecordsContainer.md)\>

#### Defined in

[server/resolvers/actions/search.ts:1056](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/actions/search.ts#L1056)

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

[server/resolvers/actions/search.ts:2069](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/actions/search.ts#L2069)

___

### searchItemDefinitionTraditional

▸ **searchItemDefinitionTraditional**(`appData`, `itemDefinition`, `resolverArgs`): `Promise`\<[`IRQSearchResultsContainer`](../interfaces/rq_querier.IRQSearchResultsContainer.md) \| [`IRQSearchRecordsContainer`](../interfaces/rq_querier.IRQSearchRecordsContainer.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |
| `resolverArgs` | [`IRQResolverArgs`](../interfaces/base_Root_rq.IRQResolverArgs.md) |

#### Returns

`Promise`\<[`IRQSearchResultsContainer`](../interfaces/rq_querier.IRQSearchResultsContainer.md) \| [`IRQSearchRecordsContainer`](../interfaces/rq_querier.IRQSearchRecordsContainer.md)\>

#### Defined in

[server/resolvers/actions/search.ts:1048](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/actions/search.ts#L1048)

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

[server/resolvers/actions/search.ts:2077](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/actions/search.ts#L2077)

___

### searchModule

▸ **searchModule**(`appData`, `mod`, `resolverArgs`, `opts?`): `Promise`\<[`IRQSearchResultsContainer`](../interfaces/rq_querier.IRQSearchResultsContainer.md) \| [`IRQSearchRecordsContainer`](../interfaces/rq_querier.IRQSearchRecordsContainer.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `mod` | [`default`](../classes/base_Root_Module.default.md) |
| `resolverArgs` | [`IRQResolverArgs`](../interfaces/base_Root_rq.IRQResolverArgs.md) |
| `opts` | `Object` |
| `opts.noLimitOffset?` | `boolean` |
| `opts.traditional?` | `boolean` |

#### Returns

`Promise`\<[`IRQSearchResultsContainer`](../interfaces/rq_querier.IRQSearchResultsContainer.md) \| [`IRQSearchRecordsContainer`](../interfaces/rq_querier.IRQSearchRecordsContainer.md)\>

#### Defined in

[server/resolvers/actions/search.ts:69](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/actions/search.ts#L69)

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

[server/resolvers/actions/search.ts:2073](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/actions/search.ts#L2073)

___

### searchModuleTraditional

▸ **searchModuleTraditional**(`appData`, `mod`, `resolverArgs`): `Promise`\<[`IRQSearchResultsContainer`](../interfaces/rq_querier.IRQSearchResultsContainer.md) \| [`IRQSearchRecordsContainer`](../interfaces/rq_querier.IRQSearchRecordsContainer.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `mod` | [`default`](../classes/base_Root_Module.default.md) |
| `resolverArgs` | [`IRQResolverArgs`](../interfaces/base_Root_rq.IRQResolverArgs.md) |

#### Returns

`Promise`\<[`IRQSearchResultsContainer`](../interfaces/rq_querier.IRQSearchResultsContainer.md) \| [`IRQSearchRecordsContainer`](../interfaces/rq_querier.IRQSearchRecordsContainer.md)\>

#### Defined in

[server/resolvers/actions/search.ts:61](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/actions/search.ts#L61)

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

[server/resolvers/actions/search.ts:2081](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/actions/search.ts#L2081)
