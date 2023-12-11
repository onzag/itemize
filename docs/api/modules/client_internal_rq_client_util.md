[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/internal/rq-client-util

# Module: client/internal/rq-client-util

Contains utilities for building a rq client to interact
with the server, this is meant only for the javascript context
itself as it performs a lot of storing, checking and so on

## Table of contents

### Interfaces

- [ICacheMetadataMismatchAction](../interfaces/client_internal_rq_client_util.ICacheMetadataMismatchAction.md)
- [ICacheMetadataMismatchCondition](../interfaces/client_internal_rq_client_util.ICacheMetadataMismatchCondition.md)
- [ICacheMetadataMismatchConditionRule](../interfaces/client_internal_rq_client_util.ICacheMetadataMismatchConditionRule.md)
- [IIncludeOverride](../interfaces/client_internal_rq_client_util.IIncludeOverride.md)
- [IPropertyOverride](../interfaces/client_internal_rq_client_util.IPropertyOverride.md)
- [ISearchCacheMetadataMismatchAction](../interfaces/client_internal_rq_client_util.ISearchCacheMetadataMismatchAction.md)

### Type Aliases

- [CacheMetadataMismatchActionFn](client_internal_rq_client_util.md#cachemetadatamismatchactionfn)
- [SearchCacheMetadataMismatchActionFn](client_internal_rq_client_util.md#searchcachemetadatamismatchactionfn)

### Functions

- [checkMismatchCondition](client_internal_rq_client_util.md#checkmismatchcondition)
- [getAddQueryFor](client_internal_rq_client_util.md#getaddqueryfor)
- [getEditQueryFor](client_internal_rq_client_util.md#geteditqueryfor)
- [getFieldsAndArgs](client_internal_rq_client_util.md#getfieldsandargs)
- [getPropertyListDefault](client_internal_rq_client_util.md#getpropertylistdefault)
- [getPropertyListForSearchMode](client_internal_rq_client_util.md#getpropertylistforsearchmode)
- [getSearchArgsFor](client_internal_rq_client_util.md#getsearchargsfor)
- [getSearchQueryFor](client_internal_rq_client_util.md#getsearchqueryfor)
- [reprocessFileArgument](client_internal_rq_client_util.md#reprocessfileargument)
- [reprocessQueryArgumentsForFiles](client_internal_rq_client_util.md#reprocessqueryargumentsforfiles)
- [runAddQueryFor](client_internal_rq_client_util.md#runaddqueryfor)
- [runDeleteQueryFor](client_internal_rq_client_util.md#rundeletequeryfor)
- [runEditQueryFor](client_internal_rq_client_util.md#runeditqueryfor)
- [runGetQueryFor](client_internal_rq_client_util.md#rungetqueryfor)
- [runSearchQueryFor](client_internal_rq_client_util.md#runsearchqueryfor)

## Type Aliases

### CacheMetadataMismatchActionFn

Ƭ **CacheMetadataMismatchActionFn**: (`oldMetadata`: `any`, `newMetadata`: `any`) => [`ICacheMetadataMismatchAction`](../interfaces/client_internal_rq_client_util.ICacheMetadataMismatchAction.md)

#### Type declaration

▸ (`oldMetadata`, `newMetadata`): [`ICacheMetadataMismatchAction`](../interfaces/client_internal_rq_client_util.ICacheMetadataMismatchAction.md)

A function to use for the mismatch action

##### Parameters

| Name | Type |
| :------ | :------ |
| `oldMetadata` | `any` |
| `newMetadata` | `any` |

##### Returns

[`ICacheMetadataMismatchAction`](../interfaces/client_internal_rq_client_util.ICacheMetadataMismatchAction.md)

#### Defined in

[client/internal/rq-client-util.ts:123](https://github.com/onzag/itemize/blob/59702dd5/client/internal/rq-client-util.ts#L123)

___

### SearchCacheMetadataMismatchActionFn

Ƭ **SearchCacheMetadataMismatchActionFn**: (`oldMetadata`: `any`, `newMetadata`: `any`) => [`ISearchCacheMetadataMismatchAction`](../interfaces/client_internal_rq_client_util.ISearchCacheMetadataMismatchAction.md)

#### Type declaration

▸ (`oldMetadata`, `newMetadata`): [`ISearchCacheMetadataMismatchAction`](../interfaces/client_internal_rq_client_util.ISearchCacheMetadataMismatchAction.md)

A function to use for the mismatch action

##### Parameters

| Name | Type |
| :------ | :------ |
| `oldMetadata` | `any` |
| `newMetadata` | `any` |

##### Returns

[`ISearchCacheMetadataMismatchAction`](../interfaces/client_internal_rq_client_util.ISearchCacheMetadataMismatchAction.md)

#### Defined in

[client/internal/rq-client-util.ts:128](https://github.com/onzag/itemize/blob/59702dd5/client/internal/rq-client-util.ts#L128)

## Functions

### checkMismatchCondition

▸ **checkMismatchCondition**(`condition`, `dbValue`, `oldMetadata`, `newMetadata`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `condition` | [`ICacheMetadataMismatchCondition`](../interfaces/client_internal_rq_client_util.ICacheMetadataMismatchCondition.md) |
| `dbValue` | [`ICacheMatchType`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheMatchType.md) |
| `oldMetadata` | `any` |
| `newMetadata` | `any` |

#### Returns

`boolean`

#### Defined in

[client/internal/rq-client-util.ts:130](https://github.com/onzag/itemize/blob/59702dd5/client/internal/rq-client-util.ts#L130)

___

### getAddQueryFor

▸ **getAddQueryFor**(`arg`): [`RQQueryBuilder`](../classes/rq_querier.RQQueryBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `Object` |
| `arg.args` | [`IRQArgs`](../interfaces/rq_querier.IRQArgs.md) |
| `arg.cacheStore` | `boolean` |
| `arg.containerId` | `string` |
| `arg.fields` | [`IRQRequestFields`](../interfaces/rq_querier.IRQRequestFields.md) |
| `arg.forId` | `string` |
| `arg.forVersion` | `string` |
| `arg.itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |
| `arg.language` | `string` |
| `arg.listenerUUID` | `string` |
| `arg.token` | `string` |
| `arg.waitAndMerge?` | `boolean` |

#### Returns

[`RQQueryBuilder`](../classes/rq_querier.RQQueryBuilder.md)

#### Defined in

[client/internal/rq-client-util.ts:1161](https://github.com/onzag/itemize/blob/59702dd5/client/internal/rq-client-util.ts#L1161)

___

### getEditQueryFor

▸ **getEditQueryFor**(`arg`): [`RQQueryBuilder`](../classes/rq_querier.RQQueryBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `Object` |
| `arg.args` | [`IRQArgs`](../interfaces/rq_querier.IRQArgs.md) |
| `arg.fields` | [`IRQRequestFields`](../interfaces/rq_querier.IRQRequestFields.md) |
| `arg.id` | `string` |
| `arg.itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |
| `arg.language` | `string` |
| `arg.listenerUUID` | `string` |
| `arg.token` | `string` |
| `arg.version` | `string` |

#### Returns

[`RQQueryBuilder`](../classes/rq_querier.RQQueryBuilder.md)

#### Defined in

[client/internal/rq-client-util.ts:1374](https://github.com/onzag/itemize/blob/59702dd5/client/internal/rq-client-util.ts#L1374)

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
| `options.includeOverrides?` | [`IIncludeOverride`](../interfaces/client_internal_rq_client_util.IIncludeOverride.md)[] | - |
| `options.includes?` | `Object` | what includes to include in the fields |
| `options.includesForArgs?` | `Object` | - |
| `options.itemDefinitionInstance` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | - |
| `options.policiesForArgs?` | [`string`, `string`, `string`][] | - |
| `options.properties?` | `string`[] | what properties to include in fields |
| `options.propertiesForArgs?` | `string`[] | - |
| `options.propertyOverrides?` | [`IPropertyOverride`](../interfaces/client_internal_rq_client_util.IPropertyOverride.md)[] | - |
| `options.stateOverride?` | [`IItemStateType`](../interfaces/base_Root_Module_ItemDefinition.IItemStateType.md) | - |
| `options.submitForId?` | `string` | When using unite fields with applied value where you are expected to be submitting for another target that is not this self, for example when copying id1 into id2 the forId will be id1 and the submitForId will be id2 otherwise it will use the same |
| `options.submitForVersion?` | `string` | - |
| `options.uniteFieldsWithAppliedValue?` | `boolean` | - |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `argumentsForQuery` | `any` |
| `argumentsFoundFilePaths` | `any` |
| `nothingToUpdate` | `boolean` |
| `requestFields` | `any` |

#### Defined in

[client/internal/rq-client-util.ts:253](https://github.com/onzag/itemize/blob/59702dd5/client/internal/rq-client-util.ts#L253)

___

### getPropertyListDefault

▸ **getPropertyListDefault**(`properties`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `properties` | (`string` \| [`IPropertyCoreProps`](../interfaces/client_components_property_base.IPropertyCoreProps.md))[] |

#### Returns

`string`[]

#### Defined in

[client/internal/rq-client-util.ts:216](https://github.com/onzag/itemize/blob/59702dd5/client/internal/rq-client-util.ts#L216)

___

### getPropertyListForSearchMode

▸ **getPropertyListForSearchMode**(`properties`, `standardCounterpart`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `properties` | (`string` \| [`IPropertyCoreProps`](../interfaces/client_components_property_base.IPropertyCoreProps.md))[] |
| `standardCounterpart` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |

#### Returns

`string`[]

#### Defined in

[client/internal/rq-client-util.ts:182](https://github.com/onzag/itemize/blob/59702dd5/client/internal/rq-client-util.ts#L182)

___

### getSearchArgsFor

▸ **getSearchArgsFor**(`arg`): [`IRQArgs`](../interfaces/rq_querier.IRQArgs.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `ISearchQueryArg` |

#### Returns

[`IRQArgs`](../interfaces/rq_querier.IRQArgs.md)

#### Defined in

[client/internal/rq-client-util.ts:1578](https://github.com/onzag/itemize/blob/59702dd5/client/internal/rq-client-util.ts#L1578)

___

### getSearchQueryFor

▸ **getSearchQueryFor**(`arg`): [`RQQueryBuilder`](../classes/rq_querier.RQQueryBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `ISearchQueryArg` |

#### Returns

[`RQQueryBuilder`](../classes/rq_querier.RQQueryBuilder.md)

#### Defined in

[client/internal/rq-client-util.ts:1665](https://github.com/onzag/itemize/blob/59702dd5/client/internal/rq-client-util.ts#L1665)

___

### reprocessFileArgument

▸ **reprocessFileArgument**(`files`, `options`): `Promise`\<[`IRQFile`](../interfaces/rq_querier.IRQFile.md) \| [`IRQFile`](../interfaces/rq_querier.IRQFile.md)[]\>

When creating a brand new item using the add action but somehow
we are using files and values from another item and submitting that
into the new ones, the new files will not have a source because they belong
to the old file, this will allow us to ensure that everything has a source
regarding these files

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `files` | [`IRQFile`](../interfaces/rq_querier.IRQFile.md) \| [`IRQFile`](../interfaces/rq_querier.IRQFile.md)[] | the file in question either an array or a file itself |
| `options` | `Object` | options for restoring the source |
| `options.config` | [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md) | - |
| `options.containerId` | `string` | - |
| `options.forId` | `string` | - |
| `options.forVersion` | `string` | - |
| `options.include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | - |
| `options.itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | - |
| `options.property` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | - |

#### Returns

`Promise`\<[`IRQFile`](../interfaces/rq_querier.IRQFile.md) \| [`IRQFile`](../interfaces/rq_querier.IRQFile.md)[]\>

#### Defined in

[client/internal/rq-client-util.ts:607](https://github.com/onzag/itemize/blob/59702dd5/client/internal/rq-client-util.ts#L607)

___

### reprocessQueryArgumentsForFiles

▸ **reprocessQueryArgumentsForFiles**(`argumentsForQuery`, `argumentsFoundFilePaths`, `originalContainerIdOfContent`, `itemDefinitionInstance`, `config`, `forId`, `forVersion`): `Promise`\<`void`\>

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

`Promise`\<`void`\>

#### Defined in

[client/internal/rq-client-util.ts:553](https://github.com/onzag/itemize/blob/59702dd5/client/internal/rq-client-util.ts#L553)

___

### runAddQueryFor

▸ **runAddQueryFor**(`arg`, `options`): `Promise`\<\{ `error`: [`EndpointErrorType`](base_errors.md#endpointerrortype) ; `getQueryFields`: [`IRQRequestFields`](../interfaces/rq_querier.IRQRequestFields.md) ; `value`: [`IRQValue`](../interfaces/rq_querier.IRQValue.md)  }\>

Runs an add query for a given item definition

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `Object` | the arg information |
| `arg.args` | [`IRQArgs`](../interfaces/rq_querier.IRQArgs.md) | the rq args for the add query that contains the information for the stuff we want to add, contains the values, as well as the policies |
| `arg.cacheStore` | `boolean` | whether to store the results of the addition process as a get query |
| `arg.containerId` | `string` | the container id to use for storage, should be calculated by the client as long as it's valid the server comply; the container id should depend on the location of the user |
| `arg.fields` | [`IRQRequestFields`](../interfaces/rq_querier.IRQRequestFields.md) | the fields we want to retrieve as a result of our addition |
| `arg.forId` | `string` | a for id is used along forVersion to create a new version for the given id |
| `arg.forVersion` | `string` | a for version is used to start versioning the query element |
| `arg.itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition we are adding for |
| `arg.language` | `string` | the langauge to use for dictionary purposes |
| `arg.listenerUUID` | `string` | the listener uuid to inform for changes |
| `arg.progresser?` | [`ProgresserFn`](rq_querier.md#progresserfn) | - |
| `arg.token` | `string` | the token we are using for the addition process |
| `arg.waitAndMerge?` | `boolean` | - |
| `options` | `IRunQueryOptions` | - |

#### Returns

`Promise`\<\{ `error`: [`EndpointErrorType`](base_errors.md#endpointerrortype) ; `getQueryFields`: [`IRQRequestFields`](../interfaces/rq_querier.IRQRequestFields.md) ; `value`: [`IRQValue`](../interfaces/rq_querier.IRQValue.md)  }\>

a promise with an error, the fields that can be used to retrieve the same value in a get
query, and the value that was retrieved

#### Defined in

[client/internal/rq-client-util.ts:1308](https://github.com/onzag/itemize/blob/59702dd5/client/internal/rq-client-util.ts#L1308)

___

### runDeleteQueryFor

▸ **runDeleteQueryFor**(`arg`): `Promise`\<\{ `error`: [`EndpointErrorType`](base_errors.md#endpointerrortype)  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `Object` | the information for the delete query |
| `arg.args` | [`IRQArgs`](../interfaces/rq_querier.IRQArgs.md) | the args for the delete query, might contain policy information |
| `arg.cacheStore` | `boolean` | whether to cache store the deleted information |
| `arg.id` | `string` | the id we want to delete for |
| `arg.itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition we want to run a delete query for |
| `arg.language` | `string` | the language to use, for dictionary purposes |
| `arg.listenerUUID` | `string` | the listener uuid to send with |
| `arg.progresser?` | [`ProgresserFn`](rq_querier.md#progresserfn) | - |
| `arg.token` | `string` | the token to use |
| `arg.version` | `string` | the version that we are deleting for (or null) |
| `arg.waitAndMerge?` | `boolean` | - |

#### Returns

`Promise`\<\{ `error`: [`EndpointErrorType`](base_errors.md#endpointerrortype)  }\>

a promise with an error on whether it succeed or not

#### Defined in

[client/internal/rq-client-util.ts:1093](https://github.com/onzag/itemize/blob/59702dd5/client/internal/rq-client-util.ts#L1093)

___

### runEditQueryFor

▸ **runEditQueryFor**(`arg`): `Promise`\<\{ `error`: [`EndpointErrorType`](base_errors.md#endpointerrortype) ; `getQueryFields`: [`IRQRequestFields`](../interfaces/rq_querier.IRQRequestFields.md) ; `value`: [`IRQValue`](../interfaces/rq_querier.IRQValue.md)  }\>

Runs an edit query for a given item definition

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `Object` | the arg with the get query information |
| `arg.args` | [`IRQArgs`](../interfaces/rq_querier.IRQArgs.md) | the arg to use the edition for, these contain the new property values as well as any policies that are deemed necessary |
| `arg.cacheStore` | `boolean` | whether to store the result of this edition in our cache |
| `arg.fields` | [`IRQRequestFields`](../interfaces/rq_querier.IRQRequestFields.md) | the fields to request from the edit query |
| `arg.id` | `string` | the id we are editing |
| `arg.itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition we are editing |
| `arg.language` | `string` | - |
| `arg.listenerUUID` | `string` | the listener uuid we are using |
| `arg.progresser?` | [`ProgresserFn`](rq_querier.md#progresserfn) | - |
| `arg.token` | `string` | the token for validation |
| `arg.version` | `string` | the version we are editing, or null |
| `arg.waitAndMerge?` | `boolean` | - |

#### Returns

`Promise`\<\{ `error`: [`EndpointErrorType`](base_errors.md#endpointerrortype) ; `getQueryFields`: [`IRQRequestFields`](../interfaces/rq_querier.IRQRequestFields.md) ; `value`: [`IRQValue`](../interfaces/rq_querier.IRQValue.md)  }\>

#### Defined in

[client/internal/rq-client-util.ts:1427](https://github.com/onzag/itemize/blob/59702dd5/client/internal/rq-client-util.ts#L1427)

___

### runGetQueryFor

▸ **runGetQueryFor**(`arg`, `options`): `Promise`\<\{ `cached`: `boolean` ; `error`: [`EndpointErrorType`](base_errors.md#endpointerrortype) ; `getQueryFields`: [`IRQRequestFields`](../interfaces/rq_querier.IRQRequestFields.md) ; `memoryCached`: `boolean` ; `value`: [`IRQValue`](../interfaces/rq_querier.IRQValue.md)  }\>

Runs a get query for a given item definition and its args

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `Object` | the arg to use |
| `arg.args` | [`IRQArgs`](../interfaces/rq_querier.IRQArgs.md) | the args to request the server with, normaly just {} |
| `arg.cacheStore` | `boolean` | whether to store the results in the cache |
| `arg.cacheStoreMetadata?` | `any` | - |
| `arg.cacheStoreMetadataMismatchAction?` | [`ICacheMetadataMismatchAction`](../interfaces/client_internal_rq_client_util.ICacheMetadataMismatchAction.md) \| [`CacheMetadataMismatchActionFn`](client_internal_rq_client_util.md#cachemetadatamismatchactionfn) | - |
| `arg.currentKnownMetadata?` | [`ICacheMetadataMatchType`](../interfaces/client_internal_workers_cache_cache_worker_class.ICacheMetadataMatchType.md) | - |
| `arg.fields` | [`IRQRequestFields`](../interfaces/rq_querier.IRQRequestFields.md) | the fields we are requesting |
| `arg.id` | `string` | the id we are requesting for |
| `arg.itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition we are requesting for |
| `arg.language` | `string` | the language we are using for it, used for dictionary purposes |
| `arg.progresser?` | [`ProgresserFn`](rq_querier.md#progresserfn) | - |
| `arg.returnMemoryCachedValues` | `boolean` | whether to return values that are cached in memory |
| `arg.returnWorkerCachedValues` | `boolean` | whether to return values that are in the cache worker |
| `arg.returnWorkerCachedValuesIfNoInternet?` | `boolean` | optimally it will request the internet but if it can't connect it will request the worker instead |
| `arg.token` | `string` | the token we are using |
| `arg.version` | `string` | the version we are requesting for |
| `arg.waitAndMerge?` | `boolean` | - |
| `options` | `IRunQueryOptions` | - |

#### Returns

`Promise`\<\{ `cached`: `boolean` ; `error`: [`EndpointErrorType`](base_errors.md#endpointerrortype) ; `getQueryFields`: [`IRQRequestFields`](../interfaces/rq_querier.IRQRequestFields.md) ; `memoryCached`: `boolean` ; `value`: [`IRQValue`](../interfaces/rq_querier.IRQValue.md)  }\>

a promise with a bunch of information

#### Defined in

[client/internal/rq-client-util.ts:820](https://github.com/onzag/itemize/blob/59702dd5/client/internal/rq-client-util.ts#L820)

___

### runSearchQueryFor

▸ **runSearchQueryFor**(`arg`, `searchOptions`): `Promise`\<`IRunSearchQueryResult`\>

Runs the surprisingly complex search query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `IRunSearchQueryArg` | the arg for the search operation |
| `searchOptions` | `IRunSearchQuerySearchOptions` | the search options used and required for cache based searches or listen based searches |

#### Returns

`Promise`\<`IRunSearchQueryResult`\>

a promise with the error, results (for traditional), the records, the count
which might me larger than the number of records, however the record length should
be equal to the limit, and the offset given

#### Defined in

[client/internal/rq-client-util.ts:1755](https://github.com/onzag/itemize/blob/59702dd5/client/internal/rq-client-util.ts#L1755)
