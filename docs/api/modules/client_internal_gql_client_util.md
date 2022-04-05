[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/internal/gql-client-util

# Module: client/internal/gql-client-util

Contains utilities for building a grapqhl client to interact
with the server, this is meant only for the javascript context
itself as it performs a lot of storing, checking and so on

## Table of contents

### Interfaces

- [ICacheMetadataMismatchAction](../interfaces/client_internal_gql_client_util.ICacheMetadataMismatchAction.md)
- [ICacheMetadataMismatchCondition](../interfaces/client_internal_gql_client_util.ICacheMetadataMismatchCondition.md)
- [ICacheMetadataMismatchConditionRule](../interfaces/client_internal_gql_client_util.ICacheMetadataMismatchConditionRule.md)
- [IIncludeOverride](../interfaces/client_internal_gql_client_util.IIncludeOverride.md)
- [IPropertyOverride](../interfaces/client_internal_gql_client_util.IPropertyOverride.md)
- [ISearchCacheMetadataMismatchAction](../interfaces/client_internal_gql_client_util.ISearchCacheMetadataMismatchAction.md)

### Functions

- [checkMismatchCondition](client_internal_gql_client_util.md#checkmismatchcondition)
- [getFieldsAndArgs](client_internal_gql_client_util.md#getfieldsandargs)
- [reprocessFileArgument](client_internal_gql_client_util.md#reprocessfileargument)
- [reprocessQueryArgumentsForFiles](client_internal_gql_client_util.md#reprocessqueryargumentsforfiles)
- [runAddQueryFor](client_internal_gql_client_util.md#runaddqueryfor)
- [runDeleteQueryFor](client_internal_gql_client_util.md#rundeletequeryfor)
- [runEditQueryFor](client_internal_gql_client_util.md#runeditqueryfor)
- [runGetQueryFor](client_internal_gql_client_util.md#rungetqueryfor)
- [runSearchQueryFor](client_internal_gql_client_util.md#runsearchqueryfor)

## Functions

### checkMismatchCondition

▸ **checkMismatchCondition**(`condition`, `dbValue`, `oldMetadata`, `newMetadata`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `condition` | [`ICacheMetadataMismatchCondition`](../interfaces/client_internal_gql_client_util.ICacheMetadataMismatchCondition.md) |
| `dbValue` | [`ICacheMatchType`](../interfaces/client_internal_workers_cache_cache_worker.ICacheMatchType.md) |
| `oldMetadata` | `any` |
| `newMetadata` | `any` |

#### Returns

`boolean`

#### Defined in

[client/internal/gql-client-util.ts:63](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/gql-client-util.ts#L63)

___

### getFieldsAndArgs

▸ **getFieldsAndArgs**(`options`): `Object`

Provides the fields and args for an item definition in order
to create a query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | - |
| `options.block?` | `Object` | - |
| `options.block.reason` | `string` | - |
| `options.block.status` | `boolean` | - |
| `options.block.until` | `string` | - |
| `options.differingIncludesOnlyForArgs?` | `boolean` | - |
| `options.differingPropertiesOnlyForArgs?` | `boolean` | - |
| `options.forId` | `string` | - |
| `options.forVersion` | `string` | - |
| `options.includeArgs` | `boolean` | whether to include the args at all |
| `options.includeFields` | `boolean` | whether to include fields at all |
| `options.includeOverrides?` | [`IIncludeOverride`](../interfaces/client_internal_gql_client_util.IIncludeOverride.md)[] | - |
| `options.includes?` | `Object` | what includes to include in the fields |
| `options.includesForArgs?` | `Object` | - |
| `options.itemDefinitionInstance` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | - |
| `options.policiesForArgs?` | [`string`, `string`, `string`][] | - |
| `options.properties?` | `string`[] | what properties to include in fields |
| `options.propertiesForArgs?` | `string`[] | - |
| `options.propertyOverrides?` | [`IPropertyOverride`](../interfaces/client_internal_gql_client_util.IPropertyOverride.md)[] | - |
| `options.uniteFieldsWithAppliedValue?` | `boolean` | - |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `argumentsForQuery` | `any` |
| `argumentsFoundFilePaths` | `any` |
| `requestFields` | `any` |

#### Defined in

[client/internal/gql-client-util.ts:131](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/gql-client-util.ts#L131)

___

### reprocessFileArgument

▸ **reprocessFileArgument**(`files`, `options`): `Promise`<[`IGQLFile`](../interfaces/gql_querier.IGQLFile.md) \| [`IGQLFile`](../interfaces/gql_querier.IGQLFile.md)[]\>

When creating a brand new item using the add action but somehow
we are using files and values from another item and submitting that
into the new ones, the new files will not have a source because they belong
to the old file, this will allow us to ensure that everything has a source
regarding these files

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `files` | [`IGQLFile`](../interfaces/gql_querier.IGQLFile.md) \| [`IGQLFile`](../interfaces/gql_querier.IGQLFile.md)[] | the file in question either an array or a file itself |
| `options` | `Object` | options for restoring the source |
| `options.config` | [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md) | - |
| `options.containerId` | `string` | - |
| `options.forId` | `string` | - |
| `options.forVersion` | `string` | - |
| `options.include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | - |
| `options.itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | - |
| `options.property` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | - |

#### Returns

`Promise`<[`IGQLFile`](../interfaces/gql_querier.IGQLFile.md) \| [`IGQLFile`](../interfaces/gql_querier.IGQLFile.md)[]\>

#### Defined in

[client/internal/gql-client-util.ts:424](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/gql-client-util.ts#L424)

___

### reprocessQueryArgumentsForFiles

▸ **reprocessQueryArgumentsForFiles**(`argumentsForQuery`, `argumentsFoundFilePaths`, `originalContainerIdOfContent`, `itemDefinitionInstance`, `config`, `forId`, `forVersion`): `Promise`<`void`\>

Given arguments that need their files reprocessed and fetched in order
to specify a blob this function will do such job

#### Parameters

| Name | Type |
| :------ | :------ |
| `argumentsForQuery` | `any` |
| `argumentsFoundFilePaths` | ([`string`, `string`] \| [`string`])[] |
| `originalContainerIdOfContent` | `string` |
| `itemDefinitionInstance` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |
| `config` | [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md) |
| `forId` | `string` |
| `forVersion` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/internal/gql-client-util.ts:370](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/gql-client-util.ts#L370)

___

### runAddQueryFor

▸ **runAddQueryFor**(`arg`): `Promise`<{ `error`: [`EndpointErrorType`](base_errors.md#endpointerrortype) ; `getQueryFields`: [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) ; `value`: [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md)  }\>

Runs an add query for a given item definition

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `Object` | the arg information |
| `arg.args` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the graphql args for the add query that contains the information for the stuff we want to add, contains the values, as well as the policies |
| `arg.cacheStore` | `boolean` | whether to store the results of the addition process as a get query |
| `arg.containerId` | `string` | the container id to use for storage, should be calculated by the client as long as it's valid the server comply; the container id should depend on the location of the user |
| `arg.fields` | [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) | the fields we want to retrieve as a result of our addition |
| `arg.forId` | `string` | a for id is used along forVersion to create a new version for the given id |
| `arg.forVersion` | `string` | a for version is used to start versioning the query element |
| `arg.itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition we are adding for |
| `arg.language` | `string` | the langauge to use for dictionary purposes |
| `arg.listenerUUID` | `string` | the listener uuid to inform for changes |
| `arg.progresser?` | [`ProgresserFn`](gql_querier.md#progresserfn) | - |
| `arg.token` | `string` | the token we are using for the addition process |
| `arg.waitAndMerge?` | `boolean` | - |

#### Returns

`Promise`<{ `error`: [`EndpointErrorType`](base_errors.md#endpointerrortype) ; `getQueryFields`: [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) ; `value`: [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md)  }\>

a promise with an error, the fields that can be used to retrieve the same value in a get
query, and the value that was retrieved

#### Defined in

[client/internal/gql-client-util.ts:956](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/gql-client-util.ts#L956)

___

### runDeleteQueryFor

▸ **runDeleteQueryFor**(`arg`): `Promise`<{ `error`: [`EndpointErrorType`](base_errors.md#endpointerrortype)  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `Object` | the information for the delete query |
| `arg.args` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the args for the delete query, might contain policy information |
| `arg.cacheStore` | `boolean` | whether to cache store the deleted information |
| `arg.id` | `string` | the id we want to delete for |
| `arg.itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition we want to run a delete query for |
| `arg.language` | `string` | the language to use, for dictionary purposes |
| `arg.listenerUUID` | `string` | the listener uuid to send with |
| `arg.progresser?` | [`ProgresserFn`](gql_querier.md#progresserfn) | - |
| `arg.token` | `string` | the token to use |
| `arg.version` | `string` | the version that we are deleting for (or null) |
| `arg.waitAndMerge?` | `boolean` | - |

#### Returns

`Promise`<{ `error`: [`EndpointErrorType`](base_errors.md#endpointerrortype)  }\>

a promise with an error on whether it succeed or not

#### Defined in

[client/internal/gql-client-util.ts:870](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/gql-client-util.ts#L870)

___

### runEditQueryFor

▸ **runEditQueryFor**(`arg`): `Promise`<{ `error`: [`EndpointErrorType`](base_errors.md#endpointerrortype) ; `getQueryFields`: [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) ; `value`: [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md)  }\>

Runs an edit query for a given item definition

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `Object` | the arg with the get query information |
| `arg.args` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the arg to use the edition for, these contain the new property values as well as any policies that are deemed necessary |
| `arg.cacheStore` | `boolean` | whether to store the result of this edition in our cache |
| `arg.fields` | [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) | the fields to request from the edit query |
| `arg.id` | `string` | the id we are editing |
| `arg.itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition we are editing |
| `arg.language` | `string` | - |
| `arg.listenerUUID` | `string` | the listener uuid we are using |
| `arg.progresser?` | [`ProgresserFn`](gql_querier.md#progresserfn) | - |
| `arg.token` | `string` | the token for validation |
| `arg.version` | `string` | the version we are editing, or null |
| `arg.waitAndMerge?` | `boolean` | - |

#### Returns

`Promise`<{ `error`: [`EndpointErrorType`](base_errors.md#endpointerrortype) ; `getQueryFields`: [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) ; `value`: [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md)  }\>

#### Defined in

[client/internal/gql-client-util.ts:1058](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/gql-client-util.ts#L1058)

___

### runGetQueryFor

▸ **runGetQueryFor**(`arg`): `Promise`<{ `cached`: `boolean` ; `error`: [`EndpointErrorType`](base_errors.md#endpointerrortype) ; `getQueryFields`: [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) ; `memoryCached`: `boolean` ; `value`: [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md)  }\>

Runs a get query for a given item definition and its args

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `Object` | the arg to use |
| `arg.args` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the args to request the server with, normaly just {} |
| `arg.cacheStore` | `boolean` | whether to store the results in the cache |
| `arg.cacheStoreMetadata?` | `any` | - |
| `arg.cacheStoreMetadataMismatchAction?` | [`ICacheMetadataMismatchAction`](../interfaces/client_internal_gql_client_util.ICacheMetadataMismatchAction.md) | - |
| `arg.currentKnownMetadata?` | [`ICacheMetadataMatchType`](../interfaces/client_internal_workers_cache_cache_worker.ICacheMetadataMatchType.md) | - |
| `arg.fields` | [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) | the fields we are requesting |
| `arg.id` | `string` | the id we are requesting for |
| `arg.itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition we are requesting for |
| `arg.language` | `string` | the language we are using for it, used for dictionary purposes |
| `arg.progresser?` | [`ProgresserFn`](gql_querier.md#progresserfn) | - |
| `arg.returnMemoryCachedValues` | `boolean` | whether to return values that are cached in memory |
| `arg.returnWorkerCachedValues` | `boolean` | whether to return values that are in the cache worker |
| `arg.returnWorkerCachedValuesIfNoInternet?` | `boolean` | optimally it will request the internet but if it can't connect it will request the worker instead |
| `arg.token` | `string` | the token we are using |
| `arg.version` | `string` | the version we are requesting for |
| `arg.waitAndMerge?` | `boolean` | - |

#### Returns

`Promise`<{ `cached`: `boolean` ; `error`: [`EndpointErrorType`](base_errors.md#endpointerrortype) ; `getQueryFields`: [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) ; `memoryCached`: `boolean` ; `value`: [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md)  }\>

a promise with a bunch of information

#### Defined in

[client/internal/gql-client-util.ts:635](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/gql-client-util.ts#L635)

___

### runSearchQueryFor

▸ **runSearchQueryFor**(`arg`, `searchOptions`): `Promise`<`IRunSearchQueryResult`\>

Runs the surprisingly complex search query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `IRunSearchQueryArg` | the arg for the search operation |
| `searchOptions` | `IRunSearchQuerySearchOptions` | the search options used and required for cache based searches or listen based searches |

#### Returns

`Promise`<`IRunSearchQueryResult`\>

a promise with the error, results (for traditional), the records, the count
which might me larger than the number of records, however the record length should
be equal to the limit, and the offset given

#### Defined in

[client/internal/gql-client-util.ts:1248](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/gql-client-util.ts#L1248)
