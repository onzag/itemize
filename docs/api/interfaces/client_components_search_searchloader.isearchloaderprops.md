[](../README.md) / [Exports](../modules.md) / [client/components/search/SearchLoader](../modules/client_components_search_searchloader.md) / ISearchLoaderProps

# Interface: ISearchLoaderProps

[client/components/search/SearchLoader](../modules/client_components_search_searchloader.md).ISearchLoaderProps

The loader props themselves

## Table of contents

### Properties

- [children](client_components_search_searchloader.isearchloaderprops.md#children)
- [cleanOnDismount](client_components_search_searchloader.isearchloaderprops.md#cleanondismount)
- [currentPage](client_components_search_searchloader.isearchloaderprops.md#currentpage)
- [disableExternalChecks](client_components_search_searchloader.isearchloaderprops.md#disableexternalchecks)
- [includePolicies](client_components_search_searchloader.isearchloaderprops.md#includepolicies)
- [onSearchDataChange](client_components_search_searchloader.isearchloaderprops.md#onsearchdatachange)
- [pageSize](client_components_search_searchloader.isearchloaderprops.md#pagesize)
- [static](client_components_search_searchloader.isearchloaderprops.md#static)

## Properties

### children

• **children**: (`arg`: [*ISearchLoaderArg*](client_components_search_searchloader.isearchloaderarg.md)) => *any*

The children function which specifies how to retrieve these results

#### Type declaration:

▸ (`arg`: [*ISearchLoaderArg*](client_components_search_searchloader.isearchloaderarg.md)): *any*

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | [*ISearchLoaderArg*](client_components_search_searchloader.isearchloaderarg.md) |

**Returns:** *any*

Defined in: [client/components/search/SearchLoader.tsx:149](https://github.com/onzag/itemize/blob/5fcde7cf/client/components/search/SearchLoader.tsx#L149)

Defined in: [client/components/search/SearchLoader.tsx:149](https://github.com/onzag/itemize/blob/5fcde7cf/client/components/search/SearchLoader.tsx#L149)

___

### cleanOnDismount

• `Optional` **cleanOnDismount**: *boolean*

Whether the resulting search results should clean on dismount

Defined in: [client/components/search/SearchLoader.tsx:158](https://github.com/onzag/itemize/blob/5fcde7cf/client/components/search/SearchLoader.tsx#L158)

___

### currentPage

• **currentPage**: *number*

The current page we are in

Defined in: [client/components/search/SearchLoader.tsx:145](https://github.com/onzag/itemize/blob/5fcde7cf/client/components/search/SearchLoader.tsx#L145)

___

### disableExternalChecks

• `Optional` **disableExternalChecks**: *boolean*

Whether to disable the external checks for the item definition
results provider props

Defined in: [client/components/search/SearchLoader.tsx:163](https://github.com/onzag/itemize/blob/5fcde7cf/client/components/search/SearchLoader.tsx#L163)

___

### includePolicies

• `Optional` **includePolicies**: *boolean*

whether to include the policies in the resulting
item definition loader props

Defined in: [client/components/search/SearchLoader.tsx:154](https://github.com/onzag/itemize/blob/5fcde7cf/client/components/search/SearchLoader.tsx#L154)

___

### onSearchDataChange

• `Optional` **onSearchDataChange**: (`searchId`: *string*, `wasRestored`: *boolean*) => *number* \| *void*

Triggers when the search data changes, as in a new search id

Your page might be in page 6 and then the user requests new data
which means you should go back to page 0, this allows to do just that
by returning a number you can ask for a different page than the one
specified by currentPage, remember to update the prop currentPage
after this fact, so avoid weirdness

#### Type declaration:

▸ (`searchId`: *string*, `wasRestored`: *boolean*): *number* \| *void*

#### Parameters:

Name | Type |
:------ | :------ |
`searchId` | *string* |
`wasRestored` | *boolean* |

**Returns:** *number* \| *void*

Defined in: [client/components/search/SearchLoader.tsx:179](https://github.com/onzag/itemize/blob/5fcde7cf/client/components/search/SearchLoader.tsx#L179)

Defined in: [client/components/search/SearchLoader.tsx:179](https://github.com/onzag/itemize/blob/5fcde7cf/client/components/search/SearchLoader.tsx#L179)

___

### pageSize

• **pageSize**: *number*

The page size, be careful on not making the page size too
large as this can be forbidden, depends on max search results
at once

Defined in: [client/components/search/SearchLoader.tsx:141](https://github.com/onzag/itemize/blob/5fcde7cf/client/components/search/SearchLoader.tsx#L141)

___

### static

• `Optional` **static**: *TOTAL* \| *NO_LISTENING*

The static state for the children item definition, TOTAL for
basically not even asking for feedback (useful when the search was traditional)
or NO_LISTENING for just not getting updates but asking for feedback

Defined in: [client/components/search/SearchLoader.tsx:169](https://github.com/onzag/itemize/blob/5fcde7cf/client/components/search/SearchLoader.tsx#L169)
