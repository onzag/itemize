[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/providers/item](../modules/client_providers_item.md) / IItemProviderProps

# Interface: IItemProviderProps

[client/providers/item](../modules/client_providers_item.md).IItemProviderProps

The props for the item provider

## Table of contents

### Properties

- [automaticSearch](client_providers_item.IItemProviderProps.md#automaticsearch)
- [automaticSearchDoNotAutoDismissDuringChanges](client_providers_item.IItemProviderProps.md#automaticsearchdonotautodismissduringchanges)
- [automaticSearchForce](client_providers_item.IItemProviderProps.md#automaticsearchforce)
- [automaticSearchInstant](client_providers_item.IItemProviderProps.md#automaticsearchinstant)
- [automaticSearchIsOnlyFallback](client_providers_item.IItemProviderProps.md#automaticsearchisonlyfallback)
- [automaticSearchIsOnlyInitial](client_providers_item.IItemProviderProps.md#automaticsearchisonlyinitial)
- [automaticSearchNoGraceTime](client_providers_item.IItemProviderProps.md#automaticsearchnogracetime)
- [avoidLoading](client_providers_item.IItemProviderProps.md#avoidloading)
- [children](client_providers_item.IItemProviderProps.md#children)
- [cleanOnDismount](client_providers_item.IItemProviderProps.md#cleanondismount)
- [doNotAutomaticReloadIfCantConnect](client_providers_item.IItemProviderProps.md#donotautomaticreloadifcantconnect)
- [doNotAutomaticReloadSearchIfCantConnect](client_providers_item.IItemProviderProps.md#donotautomaticreloadsearchifcantconnect)
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
- [markForDestructionOnUnmount](client_providers_item.IItemProviderProps.md#markfordestructiononunmount)
- [mountId](client_providers_item.IItemProviderProps.md#mountid)
- [prefills](client_providers_item.IItemProviderProps.md#prefills)
- [properties](client_providers_item.IItemProviderProps.md#properties)
- [queryStringSync](client_providers_item.IItemProviderProps.md#querystringsync)
- [queryStringSyncReplace](client_providers_item.IItemProviderProps.md#querystringsyncreplace)
- [searchCounterpart](client_providers_item.IItemProviderProps.md#searchcounterpart)
- [setters](client_providers_item.IItemProviderProps.md#setters)
- [slowPolling](client_providers_item.IItemProviderProps.md#slowpolling)
- [static](client_providers_item.IItemProviderProps.md#static)
- [storeStateOnChange](client_providers_item.IItemProviderProps.md#storestateonchange)
- [storeStateOnChangeApplyEnforced](client_providers_item.IItemProviderProps.md#storestateonchangeapplyenforced)
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

[client/providers/item.tsx:1573](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1573)

___

### automaticSearchDoNotAutoDismissDuringChanges

• `Optional` **automaticSearchDoNotAutoDismissDuringChanges**: `boolean`

Automatic search seeks for changes, sometimes what these changes
imply is that no search should be done, for example when having an automatic
search and then not having one, this will cause the search results to go away
and be dismissed, this may be unwanted behaviour for example if waiting for
some data to trigger an automatic search between automatic searches, you can prevent
it from being dismissed by using this option

#### Defined in

[client/providers/item.tsx:1613](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1613)

___

### automaticSearchForce

• `Optional` **automaticSearchForce**: `boolean`

Forces the automatic search to happen even if the search already holds
a state

#### Defined in

[client/providers/item.tsx:1578](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1578)

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

[client/providers/item.tsx:1604](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1604)

___

### automaticSearchIsOnlyFallback

• `Optional` **automaticSearchIsOnlyFallback**: `boolean`

Makes automatic search only happen if the object doesn't currently hold
a search state

#### Defined in

[client/providers/item.tsx:1594](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1594)

___

### automaticSearchIsOnlyInitial

• `Optional` **automaticSearchIsOnlyInitial**: `boolean`

Makes automatic search happen only on mount

#### Defined in

[client/providers/item.tsx:1589](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1589)

___

### automaticSearchNoGraceTime

• `Optional` **automaticSearchNoGraceTime**: `boolean`

For high accuracy realtime search, when search results are obtained during SSR
from a SSR search id, they may be considered true to what is currently in the database
however we are not certain because no listeners may have been installed (if the search has a listenPolicy)
disabling the grace time ensures that it is always checked against the database

#### Defined in

[client/providers/item.tsx:1585](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1585)

___

### avoidLoading

• `Optional` **avoidLoading**: `boolean`

avoids running loadValue

#### Defined in

[client/providers/item.tsx:1724](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1724)

___

### children

• `Optional` **children**: `ReactNode`

children that will be feed into the context

#### Defined in

[client/providers/item.tsx:1511](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1511)

___

### cleanOnDismount

• `Optional` **cleanOnDismount**: `boolean` \| [`IActionCleanOptions`](client_providers_item.IActionCleanOptions.md)

cleans or restores the value from the memory once the object dismounts
or the mount id changes; always remember to set a mountId property
for using this in order to be able to difference item definition
loaders between themselves

#### Defined in

[client/providers/item.tsx:1662](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1662)

___

### doNotAutomaticReloadIfCantConnect

• `Optional` **doNotAutomaticReloadIfCantConnect**: `boolean`

Normally items will be automatically reloaded when
their value couldn't be retrieved because it couldn't connect
the moment they are to connect, use this to disable that

#### Defined in

[client/providers/item.tsx:1544](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1544)

___

### doNotAutomaticReloadSearchIfCantConnect

• `Optional` **doNotAutomaticReloadSearchIfCantConnect**: `boolean`

Normally items will be automatically reloaded when
their value couldn't be retrieved because it couldn't connect
the moment they are to connect, use this to disable that

#### Defined in

[client/providers/item.tsx:1550](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1550)

___

### doNotUseCache

• `Optional` **doNotUseCache**: `boolean`

disables using indexed as cache

#### Defined in

[client/providers/item.tsx:1807](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1807)

___

### doNotUseMemoryCache

• `Optional` **doNotUseMemoryCache**: `boolean`

disables getting the state from the memory cache the state must
always be retrieved from the indexed cache or from network

#### Defined in

[client/providers/item.tsx:1802](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1802)

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

[client/providers/item.tsx:1566](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1566)

___

### forId

• `Optional` **forId**: `string`

the id, specifying an id makes a huge difference

#### Defined in

[client/providers/item.tsx:1528](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1528)

___

### forVersion

• `Optional` **forVersion**: `string`

the version

#### Defined in

[client/providers/item.tsx:1532](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1532)

___

### highlights

• `Optional` **highlights**: [`IElasticHighlightSingleRecordInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightSingleRecordInfo.md)

Mainly for internal use and set by the record on its own
set the highlights for this element

the highlights are passed by the search provider

#### Defined in

[client/providers/item.tsx:1796](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1796)

___

### includePolicies

• `Optional` **includePolicies**: `boolean`

excludes the policies from being part of the state

#### Defined in

[client/providers/item.tsx:1655](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1655)

___

### includes

• `Optional` **includes**: `Object`

only includes the items specified in the list in the state

#### Index signature

▪ [include: `string`]: `string`[]

#### Defined in

[client/providers/item.tsx:1651](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1651)

___

### injectParentContext

• `Optional` **injectParentContext**: `boolean`

allows insertion of the parent context within the children

**`deprecated`** please use ItemContextPhase and ItemContextRetrieve instead

#### Defined in

[client/providers/item.tsx:1734](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1734)

___

### itemDefinition

• `Optional` **itemDefinition**: `string` \| [`default`](../classes/base_Root_Module_ItemDefinition.default.md)

the item definition slash/separated/path
if you don't specify this, the context will be
based on the prop extensions emulated item definition

#### Defined in

[client/providers/item.tsx:1524](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1524)

___

### loadSearchFromNavigation

• `Optional` **loadSearchFromNavigation**: `string`

Load searches from the popstate event, use with the option for
storeResultsInNavigation and the same identifier

#### Defined in

[client/providers/item.tsx:1618](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1618)

___

### loadStoredState

• `Optional` **loadStoredState**: `string` \| `boolean` \| `IStoredStateLocation`

loads the state from the cache worker if a
stored value is found

This plays with
onStateLoadedFromStore from this same provider
onStateStored from this same provider
storeStateOnChange from this same provider
storeStateIfCantConnect from submit action
and clearStoredStateIfConnected from submit action

#### Defined in

[client/providers/item.tsx:1702](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1702)

___

### loadUnversionedFallback

• `Optional` **loadUnversionedFallback**: `boolean`

Loads the unversioned version if the version
given is not found since every value must have
an unversioned primary form

#### Defined in

[client/providers/item.tsx:1538](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1538)

___

### longTermCaching

• `Optional` **longTermCaching**: `boolean`

uses long term caching with the worker cache strategy

#### Defined in

[client/providers/item.tsx:1682](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1682)

___

### longTermCachingMetadata

• `Optional` **longTermCachingMetadata**: `any`

Cache metadata to push with the long term caching

#### Defined in

[client/providers/item.tsx:1686](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1686)

___

### longTermCachingMetadataMismatchAction

• `Optional` **longTermCachingMetadataMismatchAction**: [`ICacheMetadataMismatchAction`](client_internal_gql_client_util.ICacheMetadataMismatchAction.md)

Cache rules to resolve during a metadata mismatch

#### Defined in

[client/providers/item.tsx:1690](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1690)

___

### markForDestructionOnLogout

• `Optional` **markForDestructionOnLogout**: `boolean`

marks the item for destruction as the user logs out

#### Defined in

[client/providers/item.tsx:1716](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1716)

___

### markForDestructionOnUnmount

• `Optional` **markForDestructionOnUnmount**: `boolean`

marks the item for destruction as the component unmounts

#### Defined in

[client/providers/item.tsx:1720](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1720)

___

### mountId

• `Optional` **mountId**: `string`

mounting id, adding a mounting id ensures
that the on dismount functions are called
if this changes, otherwise they will only be called
on the literal componentWillUnmount alone

#### Defined in

[client/providers/item.tsx:1518](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1518)

___

### prefills

• `Optional` **prefills**: [`IPropertySetterProps`](client_components_property_base.IPropertySetterProps.md)<[`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)\>[]

Similar to setters but the values are just prefilled and as such are not
readonly, prefills only get executed during the initial mount
of the component

#### Defined in

[client/providers/item.tsx:1629](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1629)

___

### properties

• `Optional` **properties**: (`string` \| [`IPropertyCoreProps`](client_components_property_base.IPropertyCoreProps.md))[]

only downloads and includes the properties specified in the list
in the state

#### Defined in

[client/providers/item.tsx:1647](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1647)

___

### queryStringSync

• `Optional` **queryStringSync**: (`string` \| [`IPropertyCoreProps`](client_components_property_base.IPropertyCoreProps.md))[]

Synchronizes a property based on a query string it behaves like a prefill
(and overrides the prefill) if it finds a value in the query string
and it will keep it updated bsed on that

Some properties cannot be qs tracked, such as files, only
values representing serializable objects can be tracked

#### Defined in

[client/providers/item.tsx:1638](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1638)

___

### queryStringSyncReplace

• `Optional` **queryStringSyncReplace**: `boolean`

When using the query string sync it will replace the current history state

#### Defined in

[client/providers/item.tsx:1642](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1642)

___

### searchCounterpart

• `Optional` **searchCounterpart**: `boolean`

whether this is about the search counterpart for using
with searches, this opens a whole can of worms

#### Defined in

[client/providers/item.tsx:1555](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1555)

___

### setters

• `Optional` **setters**: [`IPropertySetterProps`](client_components_property_base.IPropertySetterProps.md)<[`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)\>[]

Setters for setting values for the properties within the item definition
itself, useful not to depend on mounting at time

#### Defined in

[client/providers/item.tsx:1623](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1623)

___

### slowPolling

• `Optional` **slowPolling**: `boolean`

uses polling to keep the value updated rather than
using the standard method, it's updated only sometimes
on a minute basis, but it doesn't use a listener in exchange

It's not recommended to use this

#### Defined in

[client/providers/item.tsx:1678](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1678)

___

### static

• `Optional` **static**: ``"TOTAL"`` \| ``"NO_LISTENING"``

static components do not update
A no listening static item definition will not update on
remote changes
a total static component does not even ask for feedback
it displays what it initially gets, wherever it comes from

#### Defined in

[client/providers/item.tsx:1670](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1670)

___

### storeStateOnChange

• `Optional` **storeStateOnChange**: `string` \| `boolean` \| `IStoredStateLocation`

stores the state whenever the state changes

#### Defined in

[client/providers/item.tsx:1706](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1706)

___

### storeStateOnChangeApplyEnforced

• `Optional` **storeStateOnChangeApplyEnforced**: `boolean`

When storing a state normally the value of the current state
does not include enforced values that have been set
with setters, or Setter or otherwise enforced

#### Defined in

[client/providers/item.tsx:1712](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1712)

___

### waitAndMerge

• `Optional` **waitAndMerge**: `boolean`

loads using the slow method but it can be more efficient
as it will load values with a timeout

#### Defined in

[client/providers/item.tsx:1729](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1729)

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

[client/providers/item.tsx:1769](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1769)

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

[client/providers/item.tsx:1765](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1765)

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

[client/providers/item.tsx:1742](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1742)

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

[client/providers/item.tsx:1748](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1748)

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

[client/providers/item.tsx:1753](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1753)

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

[client/providers/item.tsx:1775](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1775)

___

### onStateLoadedFromStore

▸ `Optional` **onStateLoadedFromStore**(`state`, `metadata`, `fns`): `void`

On state changes but from the store that is loaded
from a cache worker

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`IItemStateType`](base_Root_Module_ItemDefinition.IItemStateType.md) |
| `metadata` | [`ICacheStateMetadata`](client_internal_workers_cache_cache_worker_class.ICacheStateMetadata.md) |
| `fns` | [`IBasicFns`](client_providers_item.IBasicFns.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1780](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1780)

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

[client/providers/item.tsx:1788](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1788)

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

[client/providers/item.tsx:1784](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1784)

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

[client/providers/item.tsx:1757](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1757)

___

### onWillLoad

▸ `Optional` **onWillLoad**(): `void`

Triggers if it will load for whatever reason

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1761](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1761)

___

### onWillSearch

▸ `Optional` **onWillSearch**(): `void`

Triggers if it will search for whatever reason

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:1738](https://github.com/onzag/itemize/blob/a24376ed/client/providers/item.tsx#L1738)
