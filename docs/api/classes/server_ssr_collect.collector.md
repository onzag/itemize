[](../README.md) / [Exports](../modules.md) / [server/ssr/collect](../modules/server_ssr_collect.md) / Collector

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

- [constructor](server_ssr_collect.collector.md#constructor)

### Properties

- [appData](server_ssr_collect.collector.md#appdata)
- [appliedRule](server_ssr_collect.collector.md#appliedrule)
- [collectionRequestsCbs](server_ssr_collect.collector.md#collectionrequestscbs)
- [collectionRequestsRejectedCbs](server_ssr_collect.collector.md#collectionrequestsrejectedcbs)
- [collectionStatuses](server_ssr_collect.collector.md#collectionstatuses)
- [forbiddenSignature](server_ssr_collect.collector.md#forbiddensignature)
- [results](server_ssr_collect.collector.md#results)

### Methods

- [collect](server_ssr_collect.collector.md#collect)
- [getForbiddenSignature](server_ssr_collect.collector.md#getforbiddensignature)
- [getLastModified](server_ssr_collect.collector.md#getlastmodified)
- [getQueries](server_ssr_collect.collector.md#getqueries)
- [getSignature](server_ssr_collect.collector.md#getsignature)
- [hasForbiddenResources](server_ssr_collect.collector.md#hasforbiddenresources)

## Constructors

### constructor

\+ **new Collector**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md), `rule`: [*ISSRRule*](../interfaces/server_ssr.issrrule.md)): [*Collector*](server_ssr_collect.collector.md)

Builds a new collector

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) | the application data   |
`rule` | [*ISSRRule*](../interfaces/server_ssr.issrrule.md) | the SSR rule    |

**Returns:** [*Collector*](server_ssr_collect.collector.md)

Defined in: [server/ssr/collect.ts:92](https://github.com/onzag/itemize/blob/11a98dec/server/ssr/collect.ts#L92)

## Properties

### appData

• `Private` **appData**: [*IAppDataType*](../interfaces/server.iappdatatype.md)

The app data that is being used while rendering
this

Defined in: [server/ssr/collect.ts:82](https://github.com/onzag/itemize/blob/11a98dec/server/ssr/collect.ts#L82)

___

### appliedRule

• `Private` **appliedRule**: [*ISSRRule*](../interfaces/server_ssr.issrrule.md)

The SSR rule that is being used

Defined in: [server/ssr/collect.ts:86](https://github.com/onzag/itemize/blob/11a98dec/server/ssr/collect.ts#L86)

___

### collectionRequestsCbs

• `Private` **collectionRequestsCbs**: *object*

Collection requests callbacks of other
collection requests that are awaiting because
we might ask for collection and then ask again
for collection for the same item

#### Type declaration:

Defined in: [server/ssr/collect.ts:68](https://github.com/onzag/itemize/blob/11a98dec/server/ssr/collect.ts#L68)

___

### collectionRequestsRejectedCbs

• `Private` **collectionRequestsRejectedCbs**: *object*

Same but gives a rejected promise instead

#### Type declaration:

Defined in: [server/ssr/collect.ts:74](https://github.com/onzag/itemize/blob/11a98dec/server/ssr/collect.ts#L74)

___

### collectionStatuses

• `Private` **collectionStatuses**: *object*

All the collection statuses per result

#### Type declaration:

Defined in: [server/ssr/collect.ts:59](https://github.com/onzag/itemize/blob/11a98dec/server/ssr/collect.ts#L59)

___

### forbiddenSignature

• `Private` **forbiddenSignature**: *string*[]

A signature for forbidden elements that did not
pass the security scrutiny, either by the default
rule or because of read triggers

Defined in: [server/ssr/collect.ts:92](https://github.com/onzag/itemize/blob/11a98dec/server/ssr/collect.ts#L92)

___

### results

• `Private` **results**: [*ICollectionResult*](../interfaces/server_ssr_collect.icollectionresult.md)[]

Represents all the collected results

Defined in: [server/ssr/collect.ts:55](https://github.com/onzag/itemize/blob/11a98dec/server/ssr/collect.ts#L55)

## Methods

### collect

▸ **collect**(`idef`: [*default*](base_root_module_itemdefinition.default.md), `id`: *string*, `version`: *string*): *Promise*<void\>

This is the actual collection function and it is what is called
by the beforeSSRRender function in the custom build on the server side

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`idef` | [*default*](base_root_module_itemdefinition.default.md) | the item definition in question   |
`id` | *string* | the id we want   |
`version` | *string* | the version we want    |

**Returns:** *Promise*<void\>

Defined in: [server/ssr/collect.ts:167](https://github.com/onzag/itemize/blob/11a98dec/server/ssr/collect.ts#L167)

___

### getForbiddenSignature

▸ **getForbiddenSignature**(): *string*

Provides a forbidden signature for the bits that couldn't be accessed and
were denied absolute access, note that the primary signature already
constains this forbidden information

**Returns:** *string*

Defined in: [server/ssr/collect.ts:149](https://github.com/onzag/itemize/blob/11a98dec/server/ssr/collect.ts#L149)

___

### getLastModified

▸ **getLastModified**(): Date

Provides the last date of the last modified of the given
results, the most recent one, or the date that the application
was built at if nothing else is found

**Returns:** Date

Defined in: [server/ssr/collect.ts:111](https://github.com/onzag/itemize/blob/11a98dec/server/ssr/collect.ts#L111)

___

### getQueries

▸ **getQueries**(): [*ISSRCollectedQueryType*](../interfaces/client_internal_providers_ssr_provider.issrcollectedquerytype.md)[]

Provides all the resulting queries for use in the client side

**Returns:** [*ISSRCollectedQueryType*](../interfaces/client_internal_providers_ssr_provider.issrcollectedquerytype.md)[]

Defined in: [server/ssr/collect.ts:126](https://github.com/onzag/itemize/blob/11a98dec/server/ssr/collect.ts#L126)

___

### getSignature

▸ **getSignature**(): *string*

Provides the signature of all the collected results, this signature
can be used to create an etag, but remember to add the buildnumber and
the mode it was rendered at for it

**Returns:** *string*

Defined in: [server/ssr/collect.ts:136](https://github.com/onzag/itemize/blob/11a98dec/server/ssr/collect.ts#L136)

___

### hasForbiddenResources

▸ **hasForbiddenResources**(): *boolean*

Informs whether the collection caught up forbidden resources

**Returns:** *boolean*

Defined in: [server/ssr/collect.ts:156](https://github.com/onzag/itemize/blob/11a98dec/server/ssr/collect.ts#L156)
