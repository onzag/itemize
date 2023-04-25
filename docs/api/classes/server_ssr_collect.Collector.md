[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/ssr/collect](../modules/server_ssr_collect.md) / Collector

# Class: Collector

[server/ssr/collect](../modules/server_ssr_collect.md).Collector

This is the collector class that actually does
the collection for the SSR, it is attached to the
react rendering

The collector binds it collect function to the request manager of the root
the item-provider (for example) calls this function during the beforeSSRRender
that is used during SSR, which delays the execution of render until the collection
is done

The collector is then able to retrieve all the collection requests given by the
rendering of the app

## Table of contents

### Constructors

- [constructor](server_ssr_collect.Collector.md#constructor)

### Properties

- [appData](server_ssr_collect.Collector.md#appdata)
- [appliedRule](server_ssr_collect.Collector.md#appliedrule)
- [collectionData](server_ssr_collect.Collector.md#collectiondata)
- [collectionRequestsCbs](server_ssr_collect.Collector.md#collectionrequestscbs)
- [collectionRequestsRejectedCbs](server_ssr_collect.Collector.md#collectionrequestsrejectedcbs)
- [collectionStatuses](server_ssr_collect.Collector.md#collectionstatuses)
- [forbiddenSignature](server_ssr_collect.Collector.md#forbiddensignature)
- [results](server_ssr_collect.Collector.md#results)

### Methods

- [collect](server_ssr_collect.Collector.md#collect)
- [collectResource](server_ssr_collect.Collector.md#collectresource)
- [collectSearch](server_ssr_collect.Collector.md#collectsearch)
- [getForbiddenSignature](server_ssr_collect.Collector.md#getforbiddensignature)
- [getLastModified](server_ssr_collect.Collector.md#getlastmodified)
- [getQueries](server_ssr_collect.Collector.md#getqueries)
- [getResources](server_ssr_collect.Collector.md#getresources)
- [getSearches](server_ssr_collect.Collector.md#getsearches)
- [getSignature](server_ssr_collect.Collector.md#getsignature)
- [hasForbiddenResources](server_ssr_collect.Collector.md#hasforbiddenresources)

## Constructors

### constructor

• **new Collector**(`appData`, `rule`)

Builds a new collector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | the application data |
| `rule` | [`ISSRRule`](../interfaces/server_ssr.ISSRRule.md) | the SSR rule |

#### Defined in

[server/ssr/collect.ts:150](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/collect.ts#L150)

## Properties

### appData

• `Private` **appData**: [`IAppDataType`](../interfaces/server.IAppDataType.md)

The app data that is being used while rendering
this

#### Defined in

[server/ssr/collect.ts:133](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/collect.ts#L133)

___

### appliedRule

• `Private` **appliedRule**: [`ISSRRule`](../interfaces/server_ssr.ISSRRule.md)

The SSR rule that is being used

#### Defined in

[server/ssr/collect.ts:137](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/collect.ts#L137)

___

### collectionData

• `Private` **collectionData**: `Object` = `{}`

All the collection statuses per result

#### Index signature

▪ [mergedID: `string`]: `any`

#### Defined in

[server/ssr/collect.ts:110](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/collect.ts#L110)

___

### collectionRequestsCbs

• `Private` **collectionRequestsCbs**: `Object` = `{}`

Collection requests callbacks of other
collection requests that are awaiting because
we might ask for collection and then ask again
for collection for the same item

#### Index signature

▪ [mergedID: `string`]: (`data?`: `any`) => `void`[]

#### Defined in

[server/ssr/collect.ts:119](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/collect.ts#L119)

___

### collectionRequestsRejectedCbs

• `Private` **collectionRequestsRejectedCbs**: `Object` = `{}`

Same but gives a rejected promise instead

#### Index signature

▪ [mergedID: `string`]: (`data?`: `any`) => `void`[]

#### Defined in

[server/ssr/collect.ts:125](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/collect.ts#L125)

___

### collectionStatuses

• `Private` **collectionStatuses**: `Object` = `{}`

All the collection statuses per result

#### Index signature

▪ [mergedID: `string`]: `boolean`

#### Defined in

[server/ssr/collect.ts:104](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/collect.ts#L104)

___

### forbiddenSignature

• `Private` **forbiddenSignature**: `string`[] = `[]`

A signature for forbidden elements that did not
pass the security scrutiny, either by the default
rule or because of read triggers

#### Defined in

[server/ssr/collect.ts:143](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/collect.ts#L143)

___

### results

• `Private` **results**: ([`IQueryCollectionResult`](../interfaces/server_ssr_collect.IQueryCollectionResult.md) \| [`ISearchCollectionResult`](../interfaces/server_ssr_collect.ISearchCollectionResult.md) \| `IInternalResourceCollectionResult`)[] = `[]`

Represents all the collected results

#### Defined in

[server/ssr/collect.ts:100](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/collect.ts#L100)

## Methods

### collect

▸ **collect**(`idef`, `id`, `version`, `requestFields`): `Promise`<`void`\>

This is the actual collection function and it is what is called
by the beforeSSRRender function in the custom build on the server side

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idef` | [`default`](base_Root_Module_ItemDefinition.default.md) | the item definition in question |
| `id` | `string` | the id we want |
| `version` | `string` | the version we want |
| `requestFields` | [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) | - |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/ssr/collect.ts:615](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/collect.ts#L615)

___

### collectResource

▸ **collectResource**(`finalPath`, `customResolver`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `finalPath` | `string` |
| `customResolver` | (`appData`: [`IAppDataType`](../interfaces/server.IAppDataType.md)) => `Promise`<[`IResourceCollectionResult`](../interfaces/server_ssr_collect.IResourceCollectionResult.md)\> |

#### Returns

`Promise`<`string`\>

#### Defined in

[server/ssr/collect.ts:234](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/collect.ts#L234)

___

### collectSearch

▸ **collectSearch**(`idef`, `id`, `version`, `args`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `idef` | [`default`](base_Root_Module_ItemDefinition.default.md) |
| `id` | `string` |
| `version` | `string` |
| `args` | [`IActionSearchOptions`](../interfaces/client_providers_item.IActionSearchOptions.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/ssr/collect.ts:355](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/collect.ts#L355)

___

### getForbiddenSignature

▸ **getForbiddenSignature**(): `string`

Provides a forbidden signature for the bits that couldn't be accessed and
were denied absolute access, note that the primary signature already
constains this forbidden information

#### Returns

`string`

#### Defined in

[server/ssr/collect.ts:223](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/collect.ts#L223)

___

### getLastModified

▸ **getLastModified**(): `Date`

Provides the last date of the last modified of the given
results, the most recent one, or the date that the application
was built at if nothing else is found

#### Returns

`Date`

#### Defined in

[server/ssr/collect.ts:164](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/collect.ts#L164)

___

### getQueries

▸ **getQueries**(): [`ISSRCollectedQueryType`](../interfaces/client_internal_providers_ssr_provider.ISSRCollectedQueryType.md)[]

Provides all the resulting queries for use in the client side

#### Returns

[`ISSRCollectedQueryType`](../interfaces/client_internal_providers_ssr_provider.ISSRCollectedQueryType.md)[]

#### Defined in

[server/ssr/collect.ts:179](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/collect.ts#L179)

___

### getResources

▸ **getResources**(): [`ISSRCollectedResourcesType`](../interfaces/client_internal_providers_ssr_provider.ISSRCollectedResourcesType.md)

Provides the map of all the resulting resources that were fetched

#### Returns

[`ISSRCollectedResourcesType`](../interfaces/client_internal_providers_ssr_provider.ISSRCollectedResourcesType.md)

#### Defined in

[server/ssr/collect.ts:197](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/collect.ts#L197)

___

### getSearches

▸ **getSearches**(): [`ISSRCollectedSearchType`](../interfaces/client_internal_providers_ssr_provider.ISSRCollectedSearchType.md)[]

Provides all the resulting searches for use in the client side

#### Returns

[`ISSRCollectedSearchType`](../interfaces/client_internal_providers_ssr_provider.ISSRCollectedSearchType.md)[]

#### Defined in

[server/ssr/collect.ts:190](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/collect.ts#L190)

___

### getSignature

▸ **getSignature**(): `string`

Provides the signature of all the collected results, this signature
can be used to create an etag, but remember to add the buildnumber and
the mode it was rendered at for it

#### Returns

`string`

#### Defined in

[server/ssr/collect.ts:210](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/collect.ts#L210)

___

### hasForbiddenResources

▸ **hasForbiddenResources**(): `boolean`

Informs whether the collection caught up forbidden resources

#### Returns

`boolean`

#### Defined in

[server/ssr/collect.ts:230](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/collect.ts#L230)
