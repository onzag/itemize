[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/providers/item](../modules/client_providers_item.md) / IItemProviderProps

# Interface: IItemProviderProps

[client/providers/item](../modules/client_providers_item.md).IItemProviderProps

## Table of contents

### Properties

- [automaticSearch](client_providers_item.IItemProviderProps.md#automaticsearch)
- [automaticSearchForce](client_providers_item.IItemProviderProps.md#automaticsearchforce)
- [automaticSearchInstant](client_providers_item.IItemProviderProps.md#automaticsearchinstant)
- [automaticSearchIsOnlyInitial](client_providers_item.IItemProviderProps.md#automaticsearchisonlyinitial)
- [avoidLoading](client_providers_item.IItemProviderProps.md#avoidloading)
- [children](client_providers_item.IItemProviderProps.md#children)
- [cleanOnDismount](client_providers_item.IItemProviderProps.md#cleanondismount)
- [disableExternalChecks](client_providers_item.IItemProviderProps.md#disableexternalchecks)
- [forId](client_providers_item.IItemProviderProps.md#forid)
- [forVersion](client_providers_item.IItemProviderProps.md#forversion)
- [includePolicies](client_providers_item.IItemProviderProps.md#includepolicies)
- [includes](client_providers_item.IItemProviderProps.md#includes)
- [injectParentContext](client_providers_item.IItemProviderProps.md#injectparentcontext)
- [itemDefinition](client_providers_item.IItemProviderProps.md#itemdefinition)
- [loadSearchFromNavigation](client_providers_item.IItemProviderProps.md#loadsearchfromnavigation)
- [loadStateFromCache](client_providers_item.IItemProviderProps.md#loadstatefromcache)
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
- [waitAndMerge](client_providers_item.IItemProviderProps.md#waitandmerge)

### Methods

- [onDelete](client_providers_item.IItemProviderProps.md#ondelete)
- [onLoad](client_providers_item.IItemProviderProps.md#onload)
- [onSearch](client_providers_item.IItemProviderProps.md#onsearch)
- [onSearchStateChange](client_providers_item.IItemProviderProps.md#onsearchstatechange)
- [onSearchStateLoaded](client_providers_item.IItemProviderProps.md#onsearchstateloaded)
- [onStateChange](client_providers_item.IItemProviderProps.md#onstatechange)
- [onStateLoadedFromStore](client_providers_item.IItemProviderProps.md#onstateloadedfromstore)
- [onSubmit](client_providers_item.IItemProviderProps.md#onsubmit)

## Properties

### automaticSearch

• `Optional` **automaticSearch**: [`IActionSearchOptions`](client_providers_item.IActionSearchOptions.md)

automatic search triggers an automatic search when the item mounts
or it detects a change in the properties, this basically triggers
the .search function with these arguments whenever it is detected
it should do so

#### Defined in

[client/providers/item.tsx:661](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L661)

___

### automaticSearchForce

• `Optional` **automaticSearchForce**: `boolean`

Forces the automatic search to happen even if the search already holds
a state

#### Defined in

[client/providers/item.tsx:666](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L666)

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

[client/providers/item.tsx:680](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L680)

___

### automaticSearchIsOnlyInitial

• `Optional` **automaticSearchIsOnlyInitial**: `boolean`

Makes automatic search happen only on mount

#### Defined in

[client/providers/item.tsx:670](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L670)

___

### avoidLoading

• `Optional` **avoidLoading**: `boolean`

avoids running loadValue

#### Defined in

[client/providers/item.tsx:749](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L749)

___

### children

• `Optional` **children**: `ReactNode`

children that will be feed into the context

#### Defined in

[client/providers/item.tsx:611](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L611)

___

### cleanOnDismount

• `Optional` **cleanOnDismount**: `boolean` \| [`IActionCleanOptions`](client_providers_item.IActionCleanOptions.md)

cleans or restores the value from the memory once the object dismounts
or the mount id changes; always remember to set a mountId property
for using this in order to be able to difference item definition
loaders between themselves

#### Defined in

[client/providers/item.tsx:716](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L716)

___

### disableExternalChecks

• `Optional` **disableExternalChecks**: `boolean`

some fields, eg. autocompleted ones and unique ones have rest
endpoints for them that will run checks, you might want to disable
these checks in two circumstances, 1. for efficiency if you don't need them
2. for an UX reason, for example during login, if the field is constantly checking
that the external check is unique, for an username, then you will have an annoying
error popping on, saying that the username is taken, but you are logging in so that
external check is unecessary; note that disabling external checks has no effect
if the item definition has no externally checked properties

#### Defined in

[client/providers/item.tsx:654](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L654)

___

### forId

• `Optional` **forId**: `string`

the id, specifying an id makes a huge difference

#### Defined in

[client/providers/item.tsx:628](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L628)

___

### forVersion

• `Optional` **forVersion**: `string`

the version

#### Defined in

[client/providers/item.tsx:632](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L632)

___

### includePolicies

• `Optional` **includePolicies**: `boolean`

excludes the policies from being part of the state

#### Defined in

[client/providers/item.tsx:709](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L709)

___

### includes

• `Optional` **includes**: `Object`

only includes the items specified in the list in the state

#### Index signature

▪ [include: `string`]: `string`[]

#### Defined in

[client/providers/item.tsx:705](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L705)

___

### injectParentContext

• `Optional` **injectParentContext**: `boolean`

allows insertion of the parent context within the children

**`deprecated`** please use ItemContextPhase and ItemContextRetrieve instead

#### Defined in

[client/providers/item.tsx:759](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L759)

___

### itemDefinition

• `Optional` **itemDefinition**: `string` \| [`default`](../classes/base_Root_Module_ItemDefinition.default.md)

the item definition slash/separated/path
if you don't specify this, the context will be
based on the prop extensions emulated item definition

#### Defined in

[client/providers/item.tsx:624](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L624)

___

### loadSearchFromNavigation

• `Optional` **loadSearchFromNavigation**: `string`

Load searches from the popstate event, use with the option for
storeResultsInNavigation and the same identifier

#### Defined in

[client/providers/item.tsx:685](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L685)

___

### loadStateFromCache

• `Optional` **loadStateFromCache**: `boolean`

loads the state from the cache worker if a
stored value is found

#### Defined in

[client/providers/item.tsx:741](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L741)

___

### loadUnversionedFallback

• `Optional` **loadUnversionedFallback**: `boolean`

Loads the unversioned version if the version
given is not found since every value must have
an unversioned primary form

#### Defined in

[client/providers/item.tsx:638](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L638)

___

### longTermCaching

• `Optional` **longTermCaching**: `boolean`

uses long term caching with the worker cache strategy

#### Defined in

[client/providers/item.tsx:728](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L728)

___

### longTermCachingMetadata

• `Optional` **longTermCachingMetadata**: `any`

Cache metadata to push with the long term caching

#### Defined in

[client/providers/item.tsx:732](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L732)

___

### longTermCachingMetadataMismatchAction

• `Optional` **longTermCachingMetadataMismatchAction**: [`ICacheMetadataMismatchAction`](client_internal_gql_client_util.ICacheMetadataMismatchAction.md)

Cache rules to resolve during a metadata mismatch

#### Defined in

[client/providers/item.tsx:736](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L736)

___

### markForDestructionOnLogout

• `Optional` **markForDestructionOnLogout**: `boolean`

marks the item for destruction as the user logs out

#### Defined in

[client/providers/item.tsx:745](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L745)

___

### mountId

• `Optional` **mountId**: `string`

mounting id, adding a mounting id ensures
that the on dismount functions are called
if this changes, otherwise they will only be called
on the literal componentWillUnmount alone

#### Defined in

[client/providers/item.tsx:618](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L618)

___

### prefills

• `Optional` **prefills**: [`IPropertySetterProps`](client_components_property_base.IPropertySetterProps.md)[]

Similar to setters but the values are just prefilled and as such are not
readonly, prefills only get executed during the initial mount
of the component

#### Defined in

[client/providers/item.tsx:696](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L696)

___

### properties

• `Optional` **properties**: `string`[]

only downloads and includes the properties specified in the list
in the state

#### Defined in

[client/providers/item.tsx:701](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L701)

___

### searchCounterpart

• `Optional` **searchCounterpart**: `boolean`

whether this is about the search counterpart for using
with searches, this opens a whole can of worms

#### Defined in

[client/providers/item.tsx:643](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L643)

___

### setters

• `Optional` **setters**: [`IPropertySetterProps`](client_components_property_base.IPropertySetterProps.md)[]

Setters for setting values for the properties within the item definition
itself, useful not to depend on mounting at time

#### Defined in

[client/providers/item.tsx:690](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L690)

___

### static

• `Optional` **static**: ``"TOTAL"`` \| ``"NO_LISTENING"``

static components do not update
A no listening static item definition will not update on
remote changes
a total static component does not even ask for feedback
it displays what it initially gets, wherever it comes from

#### Defined in

[client/providers/item.tsx:724](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L724)

___

### waitAndMerge

• `Optional` **waitAndMerge**: `boolean`

loads using the slow method but it can be more efficient
as it will load values with a timeout

#### Defined in

[client/providers/item.tsx:754](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L754)

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

[client/providers/item.tsx:786](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L786)

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

[client/providers/item.tsx:782](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L782)

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

[client/providers/item.tsx:763](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L763)

___

### onSearchStateChange

▸ `Optional` **onSearchStateChange**(`data`): `void`

callback triggers when new search data has been loaded into
the item state, not just when a new search has been executed but
also when memory data has been fetched or from location

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IActualItemProviderSearchState`](client_providers_item.IActualItemProviderSearchState.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:769](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L769)

___

### onSearchStateLoaded

▸ `Optional` **onSearchStateLoaded**(`data`): `void`

Occurs when a search state is preloaded at mount time taken from the
memory rather than a search action

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IActualItemProviderSearchState`](client_providers_item.IActualItemProviderSearchState.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:774](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L774)

___

### onStateChange

▸ `Optional` **onStateChange**(`state`): `void`

On state change, triggers when the item definition internal
state changes for whatever reason use with care as
it makes the execution slower

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`IItemStateType`](base_Root_Module_ItemDefinition.IItemStateType.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:792](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L792)

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

[client/providers/item.tsx:797](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L797)

___

### onSubmit

▸ `Optional` **onSubmit**(`data`): `void`

Callback triggers on submit

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IActionResponseWithId`](client_providers_item.IActionResponseWithId.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:778](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L778)
