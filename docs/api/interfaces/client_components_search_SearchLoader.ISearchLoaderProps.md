[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/search/SearchLoader](../modules/client_components_search_SearchLoader.md) / ISearchLoaderProps

# Interface: ISearchLoaderProps

[client/components/search/SearchLoader](../modules/client_components_search_SearchLoader.md).ISearchLoaderProps

The loader props themselves

## Table of contents

### Properties

- [avoidLoadingSearchResults](client_components_search_SearchLoader.ISearchLoaderProps.md#avoidloadingsearchresults)
- [cleanOnDismount](client_components_search_SearchLoader.ISearchLoaderProps.md#cleanondismount)
- [currentPage](client_components_search_SearchLoader.ISearchLoaderProps.md#currentpage)
- [disableExternalChecks](client_components_search_SearchLoader.ISearchLoaderProps.md#disableexternalchecks)
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

[client/components/search/SearchLoader.tsx:173](https://github.com/onzag/itemize/blob/5c2808d3/client/components/search/SearchLoader.tsx#L173)

___

### cleanOnDismount

• `Optional` **cleanOnDismount**: `boolean`

Whether the resulting search results should clean on dismount

#### Defined in

[client/components/search/SearchLoader.tsx:162](https://github.com/onzag/itemize/blob/5c2808d3/client/components/search/SearchLoader.tsx#L162)

___

### currentPage

• **currentPage**: `number`

The current page we are in

#### Defined in

[client/components/search/SearchLoader.tsx:149](https://github.com/onzag/itemize/blob/5c2808d3/client/components/search/SearchLoader.tsx#L149)

___

### disableExternalChecks

• `Optional` **disableExternalChecks**: `boolean`

Whether to disable the external checks for the item definition
results provider props

#### Defined in

[client/components/search/SearchLoader.tsx:167](https://github.com/onzag/itemize/blob/5c2808d3/client/components/search/SearchLoader.tsx#L167)

___

### includePolicies

• `Optional` **includePolicies**: `boolean`

whether to include the policies in the resulting
item definition loader props

#### Defined in

[client/components/search/SearchLoader.tsx:158](https://github.com/onzag/itemize/blob/5c2808d3/client/components/search/SearchLoader.tsx#L158)

___

### pageSize

• **pageSize**: `number`

The page size, be careful on not making the page size too
large as this can be forbidden, depends on max search results
at once

#### Defined in

[client/components/search/SearchLoader.tsx:145](https://github.com/onzag/itemize/blob/5c2808d3/client/components/search/SearchLoader.tsx#L145)

___

### static

• `Optional` **static**: ``"TOTAL"`` \| ``"NO_LISTENING"``

The static state for the children item definition, TOTAL for
basically not even asking for feedback (useful when the search was traditional)
or NO_LISTENING for just not getting updates but asking for feedback

#### Defined in

[client/components/search/SearchLoader.tsx:179](https://github.com/onzag/itemize/blob/5c2808d3/client/components/search/SearchLoader.tsx#L179)

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

[client/components/search/SearchLoader.tsx:153](https://github.com/onzag/itemize/blob/5c2808d3/client/components/search/SearchLoader.tsx#L153)

___

### onSearchDataChange

▸ `Optional` **onSearchDataChange**(`searchId`, `wasRestored`): `number` \| `void`

Triggers when the search data changes, as in a new search id

Your page might be in page 6 and then the user requests new data
which means you should go back to page 0, this allows to do just that
by returning a number you can ask for a different page than the one
specified by currentPage, remember to update the prop currentPage
after this fact, so avoid weirdness

#### Parameters

| Name | Type |
| :------ | :------ |
| `searchId` | `string` |
| `wasRestored` | `boolean` |

#### Returns

`number` \| `void`

#### Defined in

[client/components/search/SearchLoader.tsx:189](https://github.com/onzag/itemize/blob/5c2808d3/client/components/search/SearchLoader.tsx#L189)
