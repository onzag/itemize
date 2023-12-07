[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/search/SearchLoader](../modules/client_components_search_SearchLoader.md) / ISearchLoaderProps

# Interface: ISearchLoaderProps

[client/components/search/SearchLoader](../modules/client_components_search_SearchLoader.md).ISearchLoaderProps

The loader props themselves

## Table of contents

### Properties

- [avoidLoadingSearchResults](client_components_search_SearchLoader.ISearchLoaderProps.md#avoidloadingsearchresults)
- [cleanOnDismount](client_components_search_SearchLoader.ISearchLoaderProps.md#cleanondismount)
- [currentPage](client_components_search_SearchLoader.ISearchLoaderProps.md#currentpage)
- [enableExternalChecks](client_components_search_SearchLoader.ISearchLoaderProps.md#enableexternalchecks)
- [includePolicies](client_components_search_SearchLoader.ISearchLoaderProps.md#includepolicies)
- [pageSize](client_components_search_SearchLoader.ISearchLoaderProps.md#pagesize)
- [startInSearchingState](client_components_search_SearchLoader.ISearchLoaderProps.md#startinsearchingstate)
- [static](client_components_search_SearchLoader.ISearchLoaderProps.md#static)

### Methods

- [children](client_components_search_SearchLoader.ISearchLoaderProps.md#children)
- [onSearchDataChange](client_components_search_SearchLoader.ISearchLoaderProps.md#onsearchdatachange)

## Properties

### avoidLoadingSearchResults

• `Optional` **avoidLoadingSearchResults**: `boolean`

Prevents the loading of the search results use this
if you have no data to load and just want the records
off a search

#### Defined in

[client/components/search/SearchLoader.tsx:192](https://github.com/onzag/itemize/blob/a24376ed/client/components/search/SearchLoader.tsx#L192)

___

### cleanOnDismount

• `Optional` **cleanOnDismount**: `boolean`

Whether the resulting search results should clean on dismount

#### Defined in

[client/components/search/SearchLoader.tsx:181](https://github.com/onzag/itemize/blob/a24376ed/client/components/search/SearchLoader.tsx#L181)

___

### currentPage

• **currentPage**: `number`

The current page we are in
if pageSize is ALL the current page should be 0
otherwise this will cause an error

#### Defined in

[client/components/search/SearchLoader.tsx:168](https://github.com/onzag/itemize/blob/a24376ed/client/components/search/SearchLoader.tsx#L168)

___

### enableExternalChecks

• `Optional` **enableExternalChecks**: `boolean`

Whether to disable the external checks for the item definition
results provider props

#### Defined in

[client/components/search/SearchLoader.tsx:186](https://github.com/onzag/itemize/blob/a24376ed/client/components/search/SearchLoader.tsx#L186)

___

### includePolicies

• `Optional` **includePolicies**: `boolean`

whether to include the policies in the resulting
item definition loader props

#### Defined in

[client/components/search/SearchLoader.tsx:177](https://github.com/onzag/itemize/blob/a24376ed/client/components/search/SearchLoader.tsx#L177)

___

### pageSize

• **pageSize**: `number` \| ``"ALL"``

The page size, be careful on not making the page size too
large as this can be forbidden, depends on max search results
at once

#### Defined in

[client/components/search/SearchLoader.tsx:162](https://github.com/onzag/itemize/blob/a24376ed/client/components/search/SearchLoader.tsx#L162)

___

### startInSearchingState

• `Optional` **startInSearchingState**: `boolean`

Searching will be set to true until at least
a first search is retrieved

mainly used for SSR purposes so that searching always
starts at true

#### Defined in

[client/components/search/SearchLoader.tsx:200](https://github.com/onzag/itemize/blob/a24376ed/client/components/search/SearchLoader.tsx#L200)

___

### static

• `Optional` **static**: ``"TOTAL"`` \| ``"NO_LISTENING"``

The static state for the children item definition, TOTAL for
basically not even asking for feedback (useful when the search was traditional)
or NO_LISTENING for just not getting updates but asking for feedback

by default searches do not listen and use total as they act like static
results

Note that if the search was done using a listen policy the item will update anyway
this is why total is the better option

#### Defined in

[client/components/search/SearchLoader.tsx:212](https://github.com/onzag/itemize/blob/a24376ed/client/components/search/SearchLoader.tsx#L212)

## Methods

### children

▸ `Optional` **children**(`arg`): `any`

The children function which specifies how to retrieve these results

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISearchLoaderArg`](client_components_search_SearchLoader.ISearchLoaderArg.md) |

#### Returns

`any`

#### Defined in

[client/components/search/SearchLoader.tsx:172](https://github.com/onzag/itemize/blob/a24376ed/client/components/search/SearchLoader.tsx#L172)

___

### onSearchDataChange

▸ `Optional` **onSearchDataChange**(`searchId`, `wasRestored`): `void`

Triggers when the search data changes, as in a new search id

#### Parameters

| Name | Type |
| :------ | :------ |
| `searchId` | `string` |
| `wasRestored` | ``"NO"`` \| ``"FROM_LOCATION"`` \| ``"FROM_STATE"`` |

#### Returns

`void`

#### Defined in

[client/components/search/SearchLoader.tsx:216](https://github.com/onzag/itemize/blob/a24376ed/client/components/search/SearchLoader.tsx#L216)
