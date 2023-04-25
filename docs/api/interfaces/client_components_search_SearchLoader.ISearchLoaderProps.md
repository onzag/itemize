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

[client/components/search/SearchLoader.tsx:186](https://github.com/onzag/itemize/blob/f2db74a5/client/components/search/SearchLoader.tsx#L186)

___

### cleanOnDismount

• `Optional` **cleanOnDismount**: `boolean`

Whether the resulting search results should clean on dismount

#### Defined in

[client/components/search/SearchLoader.tsx:175](https://github.com/onzag/itemize/blob/f2db74a5/client/components/search/SearchLoader.tsx#L175)

___

### currentPage

• **currentPage**: `number`

The current page we are in

#### Defined in

[client/components/search/SearchLoader.tsx:162](https://github.com/onzag/itemize/blob/f2db74a5/client/components/search/SearchLoader.tsx#L162)

___

### enableExternalChecks

• `Optional` **enableExternalChecks**: `boolean`

Whether to disable the external checks for the item definition
results provider props

#### Defined in

[client/components/search/SearchLoader.tsx:180](https://github.com/onzag/itemize/blob/f2db74a5/client/components/search/SearchLoader.tsx#L180)

___

### includePolicies

• `Optional` **includePolicies**: `boolean`

whether to include the policies in the resulting
item definition loader props

#### Defined in

[client/components/search/SearchLoader.tsx:171](https://github.com/onzag/itemize/blob/f2db74a5/client/components/search/SearchLoader.tsx#L171)

___

### pageSize

• **pageSize**: `number`

The page size, be careful on not making the page size too
large as this can be forbidden, depends on max search results
at once

#### Defined in

[client/components/search/SearchLoader.tsx:158](https://github.com/onzag/itemize/blob/f2db74a5/client/components/search/SearchLoader.tsx#L158)

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

[client/components/search/SearchLoader.tsx:198](https://github.com/onzag/itemize/blob/f2db74a5/client/components/search/SearchLoader.tsx#L198)

## Methods

### children

▸ **children**(`arg`): `any`

The children function which specifies how to retrieve these results

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISearchLoaderArg`](client_components_search_SearchLoader.ISearchLoaderArg.md) |

#### Returns

`any`

#### Defined in

[client/components/search/SearchLoader.tsx:166](https://github.com/onzag/itemize/blob/f2db74a5/client/components/search/SearchLoader.tsx#L166)

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

[client/components/search/SearchLoader.tsx:202](https://github.com/onzag/itemize/blob/f2db74a5/client/components/search/SearchLoader.tsx#L202)
