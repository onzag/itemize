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

[server/ssr/collect.ts:101](https://github.com/onzag/itemize/blob/f2f29986/server/ssr/collect.ts#L101)

## Properties

### appData

• `Private` **appData**: [`IAppDataType`](../interfaces/server.IAppDataType.md)

The app data that is being used while rendering
this

#### Defined in

[server/ssr/collect.ts:84](https://github.com/onzag/itemize/blob/f2f29986/server/ssr/collect.ts#L84)

___

### appliedRule

• `Private` **appliedRule**: [`ISSRRule`](../interfaces/server_ssr.ISSRRule.md)

The SSR rule that is being used

#### Defined in

[server/ssr/collect.ts:88](https://github.com/onzag/itemize/blob/f2f29986/server/ssr/collect.ts#L88)

___

### collectionRequestsCbs

• `Private` **collectionRequestsCbs**: `Object` = `{}`

Collection requests callbacks of other
collection requests that are awaiting because
we might ask for collection and then ask again
for collection for the same item

#### Index signature

▪ [mergedID: `string`]: () => `void`[]

#### Defined in

[server/ssr/collect.ts:70](https://github.com/onzag/itemize/blob/f2f29986/server/ssr/collect.ts#L70)

___

### collectionRequestsRejectedCbs

• `Private` **collectionRequestsRejectedCbs**: `Object` = `{}`

Same but gives a rejected promise instead

#### Index signature

▪ [mergedID: `string`]: () => `void`[]

#### Defined in

[server/ssr/collect.ts:76](https://github.com/onzag/itemize/blob/f2f29986/server/ssr/collect.ts#L76)

___

### collectionStatuses

• `Private` **collectionStatuses**: `Object` = `{}`

All the collection statuses per result

#### Index signature

▪ [mergedID: `string`]: `boolean`

#### Defined in

[server/ssr/collect.ts:61](https://github.com/onzag/itemize/blob/f2f29986/server/ssr/collect.ts#L61)

___

### forbiddenSignature

• `Private` **forbiddenSignature**: `string`[] = `[]`

A signature for forbidden elements that did not
pass the security scrutiny, either by the default
rule or because of read triggers

#### Defined in

[server/ssr/collect.ts:94](https://github.com/onzag/itemize/blob/f2f29986/server/ssr/collect.ts#L94)

___

### results

• `Private` **results**: [`ICollectionResult`](../interfaces/server_ssr_collect.ICollectionResult.md)[] = `[]`

Represents all the collected results

#### Defined in

[server/ssr/collect.ts:57](https://github.com/onzag/itemize/blob/f2f29986/server/ssr/collect.ts#L57)

## Methods

### collect

▸ **collect**(`idef`, `id`, `version`): `Promise`<`void`\>

This is the actual collection function and it is what is called
by the beforeSSRRender function in the custom build on the server side

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idef` | [`default`](base_Root_Module_ItemDefinition.default.md) | the item definition in question |
| `id` | `string` | the id we want |
| `version` | `string` | the version we want |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/ssr/collect.ts:233](https://github.com/onzag/itemize/blob/f2f29986/server/ssr/collect.ts#L233)

___

### collectResource

▸ **collectResource**(`finalPath`, `customResolver`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `finalPath` | `string` |
| `customResolver` | (`appData`: [`IAppDataType`](../interfaces/server.IAppDataType.md)) => `Promise`<`string`\> |

#### Returns

`Promise`<`string`\>

#### Defined in

[server/ssr/collect.ts:180](https://github.com/onzag/itemize/blob/f2f29986/server/ssr/collect.ts#L180)

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

[server/ssr/collect.ts:196](https://github.com/onzag/itemize/blob/f2f29986/server/ssr/collect.ts#L196)

___

### getForbiddenSignature

▸ **getForbiddenSignature**(): `string`

Provides a forbidden signature for the bits that couldn't be accessed and
were denied absolute access, note that the primary signature already
constains this forbidden information

#### Returns

`string`

#### Defined in

[server/ssr/collect.ts:169](https://github.com/onzag/itemize/blob/f2f29986/server/ssr/collect.ts#L169)

___

### getLastModified

▸ **getLastModified**(): `Date`

Provides the last date of the last modified of the given
results, the most recent one, or the date that the application
was built at if nothing else is found

#### Returns

`Date`

#### Defined in

[server/ssr/collect.ts:115](https://github.com/onzag/itemize/blob/f2f29986/server/ssr/collect.ts#L115)

___

### getQueries

▸ **getQueries**(): [`ISSRCollectedQueryType`](../interfaces/client_internal_providers_ssr_provider.ISSRCollectedQueryType.md)[]

Provides all the resulting queries for use in the client side

#### Returns

[`ISSRCollectedQueryType`](../interfaces/client_internal_providers_ssr_provider.ISSRCollectedQueryType.md)[]

#### Defined in

[server/ssr/collect.ts:132](https://github.com/onzag/itemize/blob/f2f29986/server/ssr/collect.ts#L132)

___

### getResources

▸ **getResources**(): `void`

TODO

#### Returns

`void`

#### Defined in

[server/ssr/collect.ts:147](https://github.com/onzag/itemize/blob/f2f29986/server/ssr/collect.ts#L147)

___

### getSearches

▸ **getSearches**(): `void`

TODO

#### Returns

`void`

#### Defined in

[server/ssr/collect.ts:140](https://github.com/onzag/itemize/blob/f2f29986/server/ssr/collect.ts#L140)

___

### getSignature

▸ **getSignature**(): `string`

Provides the signature of all the collected results, this signature
can be used to create an etag, but remember to add the buildnumber and
the mode it was rendered at for it

#### Returns

`string`

#### Defined in

[server/ssr/collect.ts:156](https://github.com/onzag/itemize/blob/f2f29986/server/ssr/collect.ts#L156)

___

### hasForbiddenResources

▸ **hasForbiddenResources**(): `boolean`

Informs whether the collection caught up forbidden resources

#### Returns

`boolean`

#### Defined in

[server/ssr/collect.ts:176](https://github.com/onzag/itemize/blob/f2f29986/server/ssr/collect.ts#L176)
