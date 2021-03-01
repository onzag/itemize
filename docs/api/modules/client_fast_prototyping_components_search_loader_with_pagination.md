[](../README.md) / [Exports](../modules.md) / client/fast-prototyping/components/search-loader-with-pagination

# Module: client/fast-prototyping/components/search-loader-with-pagination

Contains the search loader with an already paginated component

## Table of contents

### Functions

- [SearchLoaderWithPagination](client_fast_prototyping_components_search_loader_with_pagination.md#searchloaderwithpagination)

## Functions

### SearchLoaderWithPagination

▸ **SearchLoaderWithPagination**(`props`: ISearchLoaderWithPaginationProps): *Element*

Has a search loader section and provides its own pagination component that is to be displayed with
already handlers to update the navigation page, it uses the LocationStateReader in order to keep its
page so it means that it builds history in it

TODO support searchId to keep navigation in sync

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`props` | ISearchLoaderWithPaginationProps | the search loader props    |

**Returns:** *Element*

Defined in: [client/fast-prototyping/components/search-loader-with-pagination.tsx:44](https://github.com/onzag/itemize/blob/5fcde7cf/client/fast-prototyping/components/search-loader-with-pagination.tsx#L44)
