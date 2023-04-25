[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/providers/item](../modules/client_providers_item.md) / IItemProviderProps

# Interface: IItemProviderProps

[client/providers/item](../modules/client_providers_item.md).IItemProviderProps

The props for the item provider

## Table of contents

### Properties

- [automaticSearch](client_providers_item.IItemProviderProps.md#automaticsearch)
- [automaticSearchForce](client_providers_item.IItemProviderProps.md#automaticsearchforce)
- [automaticSearchInstant](client_providers_item.IItemProviderProps.md#automaticsearchinstant)
- [automaticSearchIsOnlyFallback](client_providers_item.IItemProviderProps.md#automaticsearchisonlyfallback)
- [automaticSearchIsOnlyInitial](client_providers_item.IItemProviderProps.md#automaticsearchisonlyinitial)
- [automaticSearchNoGraceTime](client_providers_item.IItemProviderProps.md#automaticsearchnogracetime)
- [avoidLoading](client_providers_item.IItemProviderProps.md#avoidloading)
- [children](client_providers_item.IItemProviderProps.md#children)
- [cleanOnDismount](client_providers_item.IItemProviderProps.md#cleanondismount)
- [doNotUseCache](client_providers_item.IItemProviderProps.md#donotusecache)
- [doNotUseMemoryCache](client_providers_item.IItemProviderProps.md#donotusememorycache)
- [enableExternalChecks](client_providers_item.IItemProviderProps.md#enableexternalchecks)
- [forId](client_providers_item.IItemProviderProps.md#forid)
- [forVersion](client_providers_item.IItemProviderProps.md#forversion)
- [highlights](client_providers_item.IItemProviderProps.md#highlights)
- [includePolicies](client_providers_item.IItemProviderProps.md#includepolicies)
- [includes](client_providers_item.IItemProviderProps.md#includes)
- [injectParentContext](client_providers_item.IItemProviderProps.md#injectparentcontext)
- [itemDefinition](client_providers_item.IItemProviderProps.md#itemdefinition)
- [loadSearchFromNavigation](client_providers_item.IItemProviderProps.md#loadsearchfromnavigation)
- [loadStoredState](client_providers_item.IItemProviderProps.md#loadstoredstate)
- [loadUnversionedFallback](client_providers_item.IItemProviderProps.md#loadunversionedfallback)
- [longTermCaching](client_providers_item.IItemProviderProps.md#longtermcaching)
- [longTermCachingMetadata](client_providers_item.IItemProviderProps.md#longtermcachingmetadata)
- [longTermCachingMetadataMismatchAction](client_providers_item.IItemProviderProps.md#longtermcachingmetadatamismatchaction)
- [markForDestructionOnLogout](client_providers_item.IItemProviderProps.md#markfordestructiononlogout)
- [mountId](client_providers_item.IItemProviderProps.md#mountid)
- [prefills](client_providers_item.IItemProviderProps.md#prefills)
- [properties](client_providers_item.IItemProviderProps.md#properties)
- [searchCounterpart](client_providers_item.IItemProviderProps.md#searchcounterpart)
- [setters](client_providers_item.IItemProviderProps.md#setters)
- [static](client_providers_item.IItemProviderProps.md#static)
- [storeStateOnChange](client_providers_item.IItemProviderProps.md#storestateonchange)
- [waitAndMerge](client_providers_item.IItemProviderProps.md#waitandmerge)

### Methods

- [onDelete](client_providers_item.IItemProviderProps.md#ondelete)
- [onLoad](client_providers_item.IItemProviderProps.md#onload)
- [onSearch](client_providers_item.IItemProviderProps.md#onsearch)
- [onSearchStateChange](client_providers_item.IItemProviderProps.md#onsearchstatechange)
- [onSearchStateLoaded](client_providers_item.IItemProviderProps.md#onsearchstateloaded)
- [onStateChange](client_providers_item.IItemProviderProps.md#onstatechange)
- [onStateLoadedFromStore](client_providers_item.IItemProviderProps.md#onstateloadedfromstore)
- [onStateStoreFailed](client_providers_item.IItemProviderProps.md#onstatestorefailed)
- [onStateStored](client_providers_item.IItemProviderProps.md#onstatestored)
- [onSubmit](client_providers_item.IItemProviderProps.md#onsubmit)
- [onWillLoad](client_providers_item.IItemProviderProps.md#onwillload)
- [onWillSearch](client_providers_item.IItemProviderProps.md#onwillsearch)

## Properties

### automaticSearch

• `Optional` **automaticSearch**: [`IActionSearchOptions`](client_providers_item.IActionSearchOptions.md)

automatic search triggers an automatic search when the item mounts
or it detects a change in the properties, this basically triggers
the .search function with these arguments whenever it is detected
it should do so

#### Defined in

[client/providers/item.tsx:1371](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1371)

___

### automaticSearchForce

• `Optional` **automaticSearchForce**: `boolean`

Forces the automatic search to happen even if the search already holds
a state

#### Defined in

[client/providers/item.tsx:1376](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1376)

___

### automaticSearchInstant

• `Optional` **automaticSearchInstant**: `boolean`

Make the automatic search refresh immediately
not compatible with automaticSearchIsOnlyInitial
usually the automatic search will stack refreshes for 300ms
in order to allow keystrokes to stack and not update per keystroke
on your entry field but sometimes you would
rather get instant results, as eg. your filters are selects
rather than entries with text

#### Defined in

[client/providers/item.tsx:1402](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1402)

___

### automaticSearchIsOnlyFallback

• `Optional` **automaticSearchIsOnlyFallback**: `boolean`

Makes automatic search only happen if the object doesn't currently hold
a search state

#### Defined in

[client/providers/item.tsx:1392](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1392)

___

### automaticSearchIsOnlyInitial

• `Optional` **automaticSearchIsOnlyInitial**: `boolean`

Makes automatic search happen only on mount

#### Defined in

[client/providers/item.tsx:1387](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1387)

___

### automaticSearchNoGraceTime

• `Optional` **automaticSearchNoGraceTime**: `boolean`

For high accuracy realtime search, when search results are obtained during SSR
from a SSR search id, they may be considered true to what is currently in the database
however we are not certain because no listeners may have been installed (if the search has a listenPolicy)
disabling the grace time ensures that it is always checked against the database

#### Defined in

[client/providers/item.tsx:1383](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1383)

___

### avoidLoading

• `Optional` **avoidLoading**: `boolean`

avoids running loadValue

#### Defined in

[client/providers/item.tsx:1482](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1482)

___

### children

• `Optional` **children**: `ReactNode`

children that will be feed into the context

#### Defined in

[client/providers/item.tsx:1321](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1321)

___

### cleanOnDismount

• `Optional` **cleanOnDismount**: `boolean` \| [`IActionCleanOptions`](client_providers_item.IActionCleanOptions.md)

cleans or restores the value from the memory once the object dismounts
or the mount id changes; always remember to set a mountId property
for using this in order to be able to difference item definition
loaders between themselves

#### Defined in

[client/providers/item.tsx:1438](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1438)

___

### doNotUseCache

• `Optional` **doNotUseCache**: `boolean`

disables using indexed as cache

#### Defined in

[client/providers/item.tsx:1565](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1565)

___

### doNotUseMemoryCache

• `Optional` **doNotUseMemoryCache**: `boolean`

disables getting the state from the memory cache the state must
always be retrieved from the indexed cache or from network

#### Defined in

[client/providers/item.tsx:1560](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1560)

___

### enableExternalChecks

• `Optional` **enableExternalChecks**: `boolean`

some fields, eg. autocompleted ones and unique ones have rest
endpoints for them that will run checks, you might want to disable
these checks in two circumstances, 1. for efficiency if you don't need them
2. for an UX reason, for example during login, if the field is constantly checking
that the external check is unique, for an username, then you will have an annoying
error popping on, saying that the username is taken, but you are logging in so that
external check is unecessary; note that disabling external checks has no effect
if the item definition has no externally checked properties

#### Defined in

[client/providers/item.tsx:1364](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1364)

___

### forId

• `Optional` **forId**: `string`

the id, specifying an id makes a huge difference

#### Defined in

[client/providers/item.tsx:1338](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1338)

___

### forVersion

• `Optional` **forVersion**: `string`

the version

#### Defined in

[client/providers/item.tsx:1342](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1342)

___

### highlights

• `Optional` **highlights**: [`IElasticHighlightSingleRecordInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightSingleRecordInfo.md)

Mainly for internal use and set by the record on its own
set the highlights for this element

the highlights are passed by the search provider

#### Defined in

[client/providers/item.tsx:1554](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1554)

___

### includePolicies

• `Optional` **includePolicies**: `boolean`

excludes the policies from being part of the state

#### Defined in

[client/providers/item.tsx:1431](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1431)

___

### includes

• `Optional` **includes**: `Object`

only includes the items specified in the list in the state

#### Index signature

▪ [include: `string`]: `string`[]

#### Defined in

[client/providers/item.tsx:1427](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1427)

___

### injectParentContext

• `Optional` **injectParentContext**: `boolean`

allows insertion of the parent context within the children

**`deprecated`** please use ItemContextPhase and ItemContextRetrieve instead

#### Defined in

[client/providers/item.tsx:1492](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1492)

___

### itemDefinition

• `Optional` **itemDefinition**: `string` \| [`default`](../classes/base_Root_Module_ItemDefinition.default.md)

the item definition slash/separated/path
if you don't specify this, the context will be
based on the prop extensions emulated item definition

#### Defined in

[client/providers/item.tsx:1334](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1334)

___

### loadSearchFromNavigation

• `Optional` **loadSearchFromNavigation**: `string`

Load searches from the popstate event, use with the option for
storeResultsInNavigation and the same identifier

#### Defined in

[client/providers/item.tsx:1407](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1407)

___

### loadStoredState

• `Optional` **loadStoredState**: `boolean`

loads the state from the cache worker if a
stored value is found

This plays with
onStateLoadedFromStore from this same provider
onStateStored from this same provider
storeStateOnChange from this same provider
storeStateIfCantConnect from submit action
and clearStoredStateIfConnected from submit action

#### Defined in

[client/providers/item.tsx:1470](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1470)

___

### loadUnversionedFallback

• `Optional` **loadUnversionedFallback**: `boolean`

Loads the unversioned version if the version
given is not found since every value must have
an unversioned primary form

#### Defined in

[client/providers/item.tsx:1348](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1348)

___

### longTermCaching

• `Optional` **longTermCaching**: `boolean`

uses long term caching with the worker cache strategy

#### Defined in

[client/providers/item.tsx:1450](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1450)

___

### longTermCachingMetadata

• `Optional` **longTermCachingMetadata**: `any`

Cache metadata to push with the long term caching

#### Defined in

[client/providers/item.tsx:1454](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1454)

___

### longTermCachingMetadataMismatchAction

• `Optional` **longTermCachingMetadataMismatchAction**: [`ICacheMetadataMismatchAction`](client_internal_gql_client_util.ICacheMetadataMismatchAction.md)

Cache rules to resolve during a metadata mismatch

#### Defined in

[client/providers/item.tsx:1458](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1458)

___

### markForDestructionOnLogout

• `Optional` **markForDestructionOnLogout**: `boolean`

marks the item for destruction as the user logs out

#### Defined in

[client/providers/item.tsx:1478](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1478)

___

### mountId

• `Optional` **mountId**: `string`

mounting id, adding a mounting id ensures
that the on dismount functions are called
if this changes, otherwise they will only be called
on the literal componentWillUnmount alone

#### Defined in

[client/providers/item.tsx:1328](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1328)

___

### prefills

• `Optional` **prefills**: [`IPropertySetterProps`](client_components_property_base.IPropertySetterProps.md)<[`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)\>[]

Similar to setters but the values are just prefilled and as such are not
readonly, prefills only get executed during the initial mount
of the component

#### Defined in

[client/providers/item.tsx:1418](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1418)

___

### properties

• `Optional` **properties**: `string`[]

only downloads and includes the properties specified in the list
in the state

#### Defined in

[client/providers/item.tsx:1423](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1423)

___

### searchCounterpart

• `Optional` **searchCounterpart**: `boolean`

whether this is about the search counterpart for using
with searches, this opens a whole can of worms

#### Defined in

[client/providers/item.tsx:1353](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1353)

___

### setters

• `Optional` **setters**: [`IPropertySetterProps`](client_components_property_base.IPropertySetterProps.md)<[`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)\>[]

Setters for setting values for the properties within the item definition
itself, useful not to depend on mounting at time

#### Defined in

[client/providers/item.tsx:1412](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1412)

___

### static

• `Optional` **static**: ``"TOTAL"`` \| ``"NO_LISTENING"``

static components do not update
A no listening static item definition will not update on
remote changes
a total static component does not even ask for feedback
it displays what it initially gets, wherever it comes from

#### Defined in

[client/providers/item.tsx:1446](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1446)

___

### storeStateOnChange

• `Optional` **storeStateOnChange**: `boolean`

stores the state whenever the state changes

#### Defined in

[client/providers/item.tsx:1474](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1474)

___

### waitAndMerge

• `Optional` **waitAndMerge**: `boolean`

loads using the slow method but it can be more efficient
as it will load values with a timeout

#### Defined in

[client/providers/item.tsx:1487](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1487)

## Methods

### onDelete

▸ `Optional` **onDelete**(`data`): `void`

Callback triggers on delete

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IBasicActionResponse`](client_providers_item.IBasicActionResponse.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1527](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1527)

___

### onLoad

▸ `Optional` **onLoad**(`data`): `void`

Callback triggers on load

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IActionResponseWithValue`](client_providers_item.IActionResponseWithValue.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1523](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1523)

___

### onSearch

▸ `Optional` **onSearch**(`data`): `void`

callback triggers on search with the response

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IActionResponseWithSearchResults`](client_providers_item.IActionResponseWithSearchResults.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1500](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1500)

___

### onSearchStateChange

▸ `Optional` **onSearchStateChange**(`data`): `void`

callback triggers when new search data has been loaded into
the item state, not just when a new search has been executed but
also when memory data has been fetched or from location

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IItemSearchStateType`](base_Root_Module_ItemDefinition.IItemSearchStateType.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1506](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1506)

___

### onSearchStateLoaded

▸ `Optional` **onSearchStateLoaded**(`data`): `void`

Occurs when a search state is preloaded at mount time taken from the
memory rather than a search action

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IItemSearchStateType`](base_Root_Module_ItemDefinition.IItemSearchStateType.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1511](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1511)

___

### onStateChange

▸ `Optional` **onStateChange**(`state`, `prevState`): `void`

On state change, triggers when the item definition internal
state changes for whatever reason use with care as
it makes the execution slower

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`IItemStateType`](base_Root_Module_ItemDefinition.IItemStateType.md) |
| `prevState` | [`IItemStateType`](base_Root_Module_ItemDefinition.IItemStateType.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1533](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1533)

___

### onStateLoadedFromStore

▸ `Optional` **onStateLoadedFromStore**(`state`, `fns`): `void`

On state changes but from the store that is loaded
from a cache worker

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`IItemStateType`](base_Root_Module_ItemDefinition.IItemStateType.md) |
| `fns` | [`IBasicFns`](client_providers_item.IBasicFns.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1538](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1538)

___

### onStateStoreFailed

▸ `Optional` **onStateStoreFailed**(`state`): `void`

Runs when the state was attempted to store but failed to store

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`IItemStateType`](base_Root_Module_ItemDefinition.IItemStateType.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1546](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1546)

___

### onStateStored

▸ `Optional` **onStateStored**(`state`): `void`

Runs when the state was stored for whatever reason

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`IItemStateType`](base_Root_Module_ItemDefinition.IItemStateType.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1542](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1542)

___

### onSubmit

▸ `Optional` **onSubmit**(`data`): `void`

Callback triggers on submit

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IActionSubmitResponse`](client_providers_item.IActionSubmitResponse.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1515](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1515)

___

### onWillLoad

▸ `Optional` **onWillLoad**(): `void`

Triggers if it will load for whatever reason

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1519](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1519)

___

### onWillSearch

▸ `Optional` **onWillSearch**(): `void`

Triggers if it will search for whatever reason

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1496](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1496)
