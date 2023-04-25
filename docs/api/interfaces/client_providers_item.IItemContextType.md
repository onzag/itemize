[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/providers/item](../modules/client_providers_item.md) / IItemContextType

# Interface: IItemContextType

[client/providers/item](../modules/client_providers_item.md).IItemContextType

The whole item definition context

## Hierarchy

- [`IBasicFns`](client_providers_item.IBasicFns.md)

  ↳ **`IItemContextType`**

## Table of contents

### Properties

- [blocked](client_providers_item.IItemContextType.md#blocked)
- [blockedButDataAccessible](client_providers_item.IItemContextType.md#blockedbutdataaccessible)
- [deleteError](client_providers_item.IItemContextType.md#deleteerror)
- [deleted](client_providers_item.IItemContextType.md#deleted)
- [deleting](client_providers_item.IItemContextType.md#deleting)
- [forId](client_providers_item.IItemContextType.md#forid)
- [forVersion](client_providers_item.IItemContextType.md#forversion)
- [highlights](client_providers_item.IItemContextType.md#highlights)
- [holdsRemoteState](client_providers_item.IItemContextType.md#holdsremotestate)
- [idef](client_providers_item.IItemContextType.md#idef)
- [injectedParentContext](client_providers_item.IItemContextType.md#injectedparentcontext)
- [loadError](client_providers_item.IItemContextType.md#loaderror)
- [loaded](client_providers_item.IItemContextType.md#loaded)
- [loading](client_providers_item.IItemContextType.md#loading)
- [notFound](client_providers_item.IItemContextType.md#notfound)
- [pokedElements](client_providers_item.IItemContextType.md#pokedelements)
- [remoteListener](client_providers_item.IItemContextType.md#remotelistener)
- [searchCount](client_providers_item.IItemContextType.md#searchcount)
- [searchEngineEnabled](client_providers_item.IItemContextType.md#searchengineenabled)
- [searchEngineEnabledLang](client_providers_item.IItemContextType.md#searchengineenabledlang)
- [searchEngineHighlightArgs](client_providers_item.IItemContextType.md#searchenginehighlightargs)
- [searchError](client_providers_item.IItemContextType.md#searcherror)
- [searchFields](client_providers_item.IItemContextType.md#searchfields)
- [searchHighlights](client_providers_item.IItemContextType.md#searchhighlights)
- [searchId](client_providers_item.IItemContextType.md#searchid)
- [searchLastModified](client_providers_item.IItemContextType.md#searchlastmodified)
- [searchLimit](client_providers_item.IItemContextType.md#searchlimit)
- [searchOffset](client_providers_item.IItemContextType.md#searchoffset)
- [searchOwner](client_providers_item.IItemContextType.md#searchowner)
- [searchRecords](client_providers_item.IItemContextType.md#searchrecords)
- [searchRequestedIncludes](client_providers_item.IItemContextType.md#searchrequestedincludes)
- [searchRequestedProperties](client_providers_item.IItemContextType.md#searchrequestedproperties)
- [searchResults](client_providers_item.IItemContextType.md#searchresults)
- [searchShouldCache](client_providers_item.IItemContextType.md#searchshouldcache)
- [searchWasRestored](client_providers_item.IItemContextType.md#searchwasrestored)
- [searching](client_providers_item.IItemContextType.md#searching)
- [state](client_providers_item.IItemContextType.md#state)
- [submitError](client_providers_item.IItemContextType.md#submiterror)
- [submitted](client_providers_item.IItemContextType.md#submitted)
- [submitting](client_providers_item.IItemContextType.md#submitting)

### Methods

- [clean](client_providers_item.IItemContextType.md#clean)
- [delete](client_providers_item.IItemContextType.md#delete)
- [dismissDeleteError](client_providers_item.IItemContextType.md#dismissdeleteerror)
- [dismissDeleted](client_providers_item.IItemContextType.md#dismissdeleted)
- [dismissLoadError](client_providers_item.IItemContextType.md#dismissloaderror)
- [dismissSearchError](client_providers_item.IItemContextType.md#dismisssearcherror)
- [dismissSearchResults](client_providers_item.IItemContextType.md#dismisssearchresults)
- [dismissSubmitError](client_providers_item.IItemContextType.md#dismisssubmiterror)
- [dismissSubmitted](client_providers_item.IItemContextType.md#dismisssubmitted)
- [downloadState](client_providers_item.IItemContextType.md#downloadstate)
- [downloadStateAt](client_providers_item.IItemContextType.md#downloadstateat)
- [injectSubmitBlockPromise](client_providers_item.IItemContextType.md#injectsubmitblockpromise)
- [loadStateFromFile](client_providers_item.IItemContextType.md#loadstatefromfile)
- [loadStateFromFileAt](client_providers_item.IItemContextType.md#loadstatefromfileat)
- [onIncludeSetExclusionState](client_providers_item.IItemContextType.md#onincludesetexclusionstate)
- [onPropertyChange](client_providers_item.IItemContextType.md#onpropertychange)
- [onPropertyClearEnforce](client_providers_item.IItemContextType.md#onpropertyclearenforce)
- [onPropertyEnforce](client_providers_item.IItemContextType.md#onpropertyenforce)
- [onPropertyRestore](client_providers_item.IItemContextType.md#onpropertyrestore)
- [poke](client_providers_item.IItemContextType.md#poke)
- [reload](client_providers_item.IItemContextType.md#reload)
- [search](client_providers_item.IItemContextType.md#search)
- [submit](client_providers_item.IItemContextType.md#submit)
- [unpoke](client_providers_item.IItemContextType.md#unpoke)

## Properties

### blocked

• **blocked**: `boolean`

with ids the item might be blocked as well so this
flag is raised

#### Defined in

[client/providers/item.tsx:968](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L968)

___

### blockedButDataAccessible

• **blockedButDataAccessible**: `boolean`

if you are a moderator, or have a role that permits it
data might still be available, this comes together with
blocked

#### Defined in

[client/providers/item.tsx:974](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L974)

___

### deleteError

• **deleteError**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

an error that came during deleting

#### Defined in

[client/providers/item.tsx:1009](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1009)

___

### deleted

• **deleted**: `boolean`

same as submitted, a success flag that says whether the element
was deleted

#### Defined in

[client/providers/item.tsx:1018](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1018)

___

### deleting

• **deleting**: `boolean`

whether it is currently deleting

#### Defined in

[client/providers/item.tsx:1013](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1013)

___

### forId

• **forId**: `string`

the id of which it was pulled from, this might be
null

#### Defined in

[client/providers/item.tsx:954](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L954)

___

### forVersion

• **forVersion**: `string`

the version of which it was pulled from

#### Defined in

[client/providers/item.tsx:958](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L958)

___

### highlights

• **highlights**: [`IElasticHighlightSingleRecordInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightSingleRecordInfo.md)

These are the specific highlights ot use within this value
and they will be passed to the renderer in order to show
the highlights

#### Defined in

[client/providers/item.tsx:1106](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1106)

___

### holdsRemoteState

• **holdsRemoteState**: `boolean`

whether it is currently holding a state that was loaded
of any kind

#### Defined in

[client/providers/item.tsx:991](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L991)

___

### idef

• **idef**: [`default`](../classes/base_Root_Module_ItemDefinition.default.md)

the item definition in question

#### Defined in

[client/providers/item.tsx:944](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L944)

___

### injectedParentContext

• **injectedParentContext**: [`IItemContextType`](client_providers_item.IItemContextType.md)

A parent context that has been injected

**`deprecated`**

#### Defined in

[client/providers/item.tsx:1266](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1266)

___

### loadError

• **loadError**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

an error that came during loading

#### Defined in

[client/providers/item.tsx:978](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L978)

___

### loaded

• **loaded**: `boolean`

whether it loaded, sucesfully

#### Defined in

[client/providers/item.tsx:986](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L986)

___

### loading

• **loading**: `boolean`

whether it is currently loading

#### Defined in

[client/providers/item.tsx:982](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L982)

___

### notFound

• **notFound**: `boolean`

with ids a not found flag might be set if the item
is not found 404

#### Defined in

[client/providers/item.tsx:963](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L963)

___

### pokedElements

• **pokedElements**: [`IPokeElementsType`](client_providers_item.IPokeElementsType.md)

poked is a flag that is raised to mean to ignore
anything regarding user set statuses and just mark
things as they are, for example, by default many fields
are empty (null) and they are invalid, but in UX wise
it makes no sense to show as invalid immediately
poked makes it so that every field shows its true state
they are poked

#### Defined in

[client/providers/item.tsx:1116](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1116)

___

### remoteListener

• **remoteListener**: [`RemoteListener`](../classes/client_internal_app_remote_listener.RemoteListener.md)

Simply the remote listener that this item is using to listen
it's always the same accross all items

#### Defined in

[client/providers/item.tsx:1260](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1260)

___

### searchCount

• **searchCount**: `number`

The counted results from the search

#### Defined in

[client/providers/item.tsx:1047](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1047)

___

### searchEngineEnabled

• **searchEngineEnabled**: `boolean`

Whether the search engine was used or not

#### Defined in

[client/providers/item.tsx:1087](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1087)

___

### searchEngineEnabledLang

• **searchEngineEnabledLang**: `string`

The language that was used for the search using the search engine

#### Defined in

[client/providers/item.tsx:1091](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1091)

___

### searchEngineHighlightArgs

• **searchEngineHighlightArgs**: [`IItemSearchStateHighlightArgsType`](base_Root_Module_ItemDefinition.IItemSearchStateHighlightArgsType.md)

The highlight args that were received when using a search engine

#### Defined in

[client/providers/item.tsx:1095](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1095)

___

### searchError

• **searchError**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

an error that occured during search

#### Defined in

[client/providers/item.tsx:1022](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1022)

___

### searchFields

• **searchFields**: `any`

the search fields that should be requested according
to the search function

#### Defined in

[client/providers/item.tsx:1075](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1075)

___

### searchHighlights

• **searchHighlights**: [`IElasticHighlightRecordInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightRecordInfo.md)

The highlights given by elasticsearch for the search that apply
to the entire search results

#### Defined in

[client/providers/item.tsx:1100](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1100)

___

### searchId

• **searchId**: `string`

every search gets an unique identifier

#### Defined in

[client/providers/item.tsx:1051](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1051)

___

### searchLastModified

• **searchLastModified**: `string`

Search last modified as it was retrieved from the server

#### Defined in

[client/providers/item.tsx:1064](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1064)

___

### searchLimit

• **searchLimit**: `number`

The limit used in the given search

#### Defined in

[client/providers/item.tsx:1039](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1039)

___

### searchOffset

• **searchOffset**: `number`

The offset used int he given search

#### Defined in

[client/providers/item.tsx:1043](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1043)

___

### searchOwner

• **searchOwner**: `string`

a search owner, or null, for the createdBy argument

#### Defined in

[client/providers/item.tsx:1060](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1060)

___

### searchRecords

• **searchRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

the obtained search results from the graphql endpoint
just as they come

#### Defined in

[client/providers/item.tsx:1031](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1031)

___

### searchRequestedIncludes

• **searchRequestedIncludes**: `Object`

The includes that were requested during the search

#### Index signature

▪ [include: `string`]: `string`[]

#### Defined in

[client/providers/item.tsx:1083](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1083)

___

### searchRequestedProperties

• **searchRequestedProperties**: `string`[]

The properties that were requested during the search

#### Defined in

[client/providers/item.tsx:1079](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1079)

___

### searchResults

• **searchResults**: [`IGQLValue`](gql_querier.IGQLValue.md)[]

The search results (only available if a traditional search was performed)

#### Defined in

[client/providers/item.tsx:1035](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1035)

___

### searchShouldCache

• **searchShouldCache**: `boolean`

passed onto the search to tell it if results that are retrieved
and then updated should be cached into the cache using the
long term strategy, this is usually true when cachePolicy is something

#### Defined in

[client/providers/item.tsx:1070](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1070)

___

### searchWasRestored

• **searchWasRestored**: ``"NO"`` \| ``"FROM_LOCATION"`` \| ``"FROM_STATE"``

Whether the search was not truly performed but was instead restored
for example, from the location, or from the state of the app

#### Defined in

[client/providers/item.tsx:1056](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1056)

___

### searching

• **searching**: `boolean`

whether it is currently searching

#### Defined in

[client/providers/item.tsx:1026](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1026)

___

### state

• **state**: [`IItemStateType`](base_Root_Module_ItemDefinition.IItemStateType.md)

the state of this item definition that has
been pulled and calculated from this item definition

#### Defined in

[client/providers/item.tsx:949](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L949)

___

### submitError

• **submitError**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

an error that came during submitting

#### Defined in

[client/providers/item.tsx:995](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L995)

___

### submitted

• **submitted**: `boolean`

whether it has submitted sucesfully, this is a transitory
flag, and should be removed, basically it means the item
is in a success state of submitted

#### Defined in

[client/providers/item.tsx:1005](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1005)

___

### submitting

• **submitting**: `boolean`

whether it is currently submitting

#### Defined in

[client/providers/item.tsx:999](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L999)

## Methods

### clean

▸ **clean**(`options`, `state`, `avoidTriggeringUpdate?`): `void`

cleans performs the cleanup of properties and policies

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionCleanOptions`](client_providers_item.IActionCleanOptions.md) |
| `state` | ``"success"`` \| ``"fail"`` |
| `avoidTriggeringUpdate?` | `boolean` |

#### Returns

`void`

#### Inherited from

[IBasicFns](client_providers_item.IBasicFns.md).[clean](client_providers_item.IBasicFns.md#clean)

#### Defined in

[client/providers/item.tsx:925](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L925)

___

### delete

▸ **delete**(): `Promise`<[`IBasicActionResponse`](client_providers_item.IBasicActionResponse.md)\>

Simply deletes

#### Returns

`Promise`<[`IBasicActionResponse`](client_providers_item.IBasicActionResponse.md)\>

a response with the status

#### Inherited from

[IBasicFns](client_providers_item.IBasicFns.md).[delete](client_providers_item.IBasicFns.md#delete)

#### Defined in

[client/providers/item.tsx:917](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L917)

___

### dismissDeleteError

▸ **dismissDeleteError**(): `void`

dismisses the delete error

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1199](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1199)

___

### dismissDeleted

▸ **dismissDeleted**(): `void`

dismisses the deleted state

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1204](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1204)

___

### dismissLoadError

▸ **dismissLoadError**(): `void`

dismisses the load error

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1184](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1184)

___

### dismissSearchError

▸ **dismissSearchError**(): `void`

dismisses the search error

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1209](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1209)

___

### dismissSearchResults

▸ **dismissSearchResults**(): `void`

dismisses the search results

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1214](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1214)

___

### dismissSubmitError

▸ **dismissSubmitError**(): `void`

dismisses the submit error

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1189](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1189)

___

### dismissSubmitted

▸ **dismissSubmitted**(): `void`

dismisses the submitted state

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1194](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1194)

___

### downloadState

▸ **downloadState**(`specificProperties?`, `specificIncludes?`): `Promise`<`Blob`\>

downloads the state as a blob (file) of the current item

#### Parameters

| Name | Type |
| :------ | :------ |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

#### Returns

`Promise`<`Blob`\>

#### Defined in

[client/providers/item.tsx:1221](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1221)

___

### downloadStateAt

▸ **downloadStateAt**(`id`, `version?`, `specificProperties?`, `specificIncludes?`): `Promise`<`Blob`\>

Downloads the state as a blob (file) of the current item but at a given id, version combo

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version?` | `string` |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

#### Returns

`Promise`<`Blob`\>

#### Defined in

[client/providers/item.tsx:1230](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1230)

___

### injectSubmitBlockPromise

▸ **injectSubmitBlockPromise**(`arg`): `void`

Injects a promise so that the submit cannot resolve until this promise
is resolved

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `Promise`<`any`\> |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1274](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1274)

___

### loadStateFromFile

▸ **loadStateFromFile**(`f`, `specificProperties?`, `specificIncludes?`): `Promise`<`void`\>

Loads the state from a given file

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | `Blob` \| `File` |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/providers/item.tsx:1238](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1238)

___

### loadStateFromFileAt

▸ **loadStateFromFileAt**(`f`, `id`, `version?`, `specificProperties?`, `specificIncludes?`): `Promise`<`void`\>

Loads the state for a given file in the current item location at a given slot id and version

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | `Blob` \| `File` |
| `id` | `string` |
| `version?` | `string` |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/providers/item.tsx:1248](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1248)

___

### onIncludeSetExclusionState

▸ **onIncludeSetExclusionState**(`include`, `state`): `void`

this is yet another passed function that does the same as properties
but with exclusion states

#### Parameters

| Name | Type |
| :------ | :------ |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) |
| `state` | [`IncludeExclusionState`](../enums/base_Root_Module_ItemDefinition_Include.IncludeExclusionState.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1147](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1147)

___

### onPropertyChange

▸ **onPropertyChange**(`property`, `value`, `internalValue`): `void`

this is a listener that basically takes a property, and a new value
and internal value, whatever is down the line is not expected to do
changes directly, but rather call this function, this function will
then update everything under the hood

#### Parameters

| Name | Type |
| :------ | :------ |
| `property` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |
| `value` | [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) |
| `internalValue` | `any` |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1127](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1127)

___

### onPropertyClearEnforce

▸ **onPropertyClearEnforce**(`property`, `givenForId`, `givenForVersion`): `void`

Clear the enforce that was previously set

#### Parameters

| Name | Type |
| :------ | :------ |
| `property` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |
| `givenForId` | `string` |
| `givenForVersion` | `string` |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1174](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1174)

___

### onPropertyEnforce

▸ **onPropertyEnforce**(`property`, `value`, `givenForId`, `givenForVersion`): `void`

now this would be used on enforcement, this is used for the setter
the reason it also needs to specify the id is because it might
go out of sync with the item definition

#### Parameters

| Name | Type |
| :------ | :------ |
| `property` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |
| `value` | [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) |
| `givenForId` | `string` |
| `givenForVersion` | `string` |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1161](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1161)

___

### onPropertyRestore

▸ **onPropertyRestore**(`property`): `void`

When the property shall be restored this listener shall be called

#### Parameters

| Name | Type |
| :------ | :------ |
| `property` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1137](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1137)

___

### poke

▸ **poke**(`elements`): `void`

Poke elements

#### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | [`IPokeElementsType`](client_providers_item.IPokeElementsType.md) |

#### Returns

`void`

#### Inherited from

[IBasicFns](client_providers_item.IBasicFns.md).[poke](client_providers_item.IBasicFns.md#poke)

#### Defined in

[client/providers/item.tsx:892](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L892)

___

### reload

▸ **reload**(`denyCache?`): `Promise`<[`IActionResponseWithValue`](client_providers_item.IActionResponseWithValue.md)\>

makes it so that it reloads the value, the loadValue function
usually is executed on componentDidMount, pass deny cache in order to
do a hard refresh and bypass the cache

#### Parameters

| Name | Type |
| :------ | :------ |
| `denyCache?` | `boolean` |

#### Returns

`Promise`<[`IActionResponseWithValue`](client_providers_item.IActionResponseWithValue.md)\>

#### Inherited from

[IBasicFns](client_providers_item.IBasicFns.md).[reload](client_providers_item.IBasicFns.md#reload)

#### Defined in

[client/providers/item.tsx:905](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L905)

___

### search

▸ **search**(`options`): `Promise`<[`IActionResponseWithSearchResults`](client_providers_item.IActionResponseWithSearchResults.md)\>

performs a search, note that you should be in the searchMode however
since all items are the same it's totally possible to launch a search
in which case you'll just get a searchError you should be in search
mode because there are no endpoints otherwise

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionSearchOptions`](client_providers_item.IActionSearchOptions.md) |

#### Returns

`Promise`<[`IActionResponseWithSearchResults`](client_providers_item.IActionResponseWithSearchResults.md)\>

#### Inherited from

[IBasicFns](client_providers_item.IBasicFns.md).[search](client_providers_item.IBasicFns.md#search)

#### Defined in

[client/providers/item.tsx:934](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L934)

___

### submit

▸ **submit**(`options`): `Promise`<[`IActionSubmitResponse`](client_providers_item.IActionSubmitResponse.md)\>

submits the current information, when there's no id, this triggers an
add action, with an id however this trigger edition

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionSubmitOptions`](client_providers_item.IActionSubmitOptions.md) |

#### Returns

`Promise`<[`IActionSubmitResponse`](client_providers_item.IActionSubmitResponse.md)\>

a response with the status

#### Inherited from

[IBasicFns](client_providers_item.IBasicFns.md).[submit](client_providers_item.IBasicFns.md#submit)

#### Defined in

[client/providers/item.tsx:912](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L912)

___

### unpoke

▸ **unpoke**(): `void`

unpokes all elements

#### Returns

`void`

#### Inherited from

[IBasicFns](client_providers_item.IBasicFns.md).[unpoke](client_providers_item.IBasicFns.md#unpoke)

#### Defined in

[client/providers/item.tsx:897](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L897)
