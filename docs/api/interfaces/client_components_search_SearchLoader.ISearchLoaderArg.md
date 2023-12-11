[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/search/SearchLoader](../modules/client_components_search_SearchLoader.md) / ISearchLoaderArg

# Interface: ISearchLoaderArg

[client/components/search/SearchLoader](../modules/client_components_search_SearchLoader.md).ISearchLoaderArg

This is what the search loader recieves as argument
in its children prop

## Hierarchy

- **`ISearchLoaderArg`**

  ↳ [`IPagedSearchLoaderArg`](client_components_search_PagedSearchLoader.IPagedSearchLoaderArg.md)

## Table of contents

### Properties

- [accessibleCount](client_components_search_SearchLoader.ISearchLoaderArg.md#accessiblecount)
- [dismissError](client_components_search_SearchLoader.ISearchLoaderArg.md#dismisserror)
- [error](client_components_search_SearchLoader.ISearchLoaderArg.md#error)
- [hasNextPage](client_components_search_SearchLoader.ISearchLoaderArg.md#hasnextpage)
- [hasPrevPage](client_components_search_SearchLoader.ISearchLoaderArg.md#hasprevpage)
- [isLoadingSearchResults](client_components_search_SearchLoader.ISearchLoaderArg.md#isloadingsearchresults)
- [limit](client_components_search_SearchLoader.ISearchLoaderArg.md#limit)
- [metadata](client_components_search_SearchLoader.ISearchLoaderArg.md#metadata)
- [offset](client_components_search_SearchLoader.ISearchLoaderArg.md#offset)
- [pageCount](client_components_search_SearchLoader.ISearchLoaderArg.md#pagecount)
- [refreshPage](client_components_search_SearchLoader.ISearchLoaderArg.md#refreshpage)
- [searchId](client_components_search_SearchLoader.ISearchLoaderArg.md#searchid)
- [searchRecords](client_components_search_SearchLoader.ISearchLoaderArg.md#searchrecords)
- [searching](client_components_search_SearchLoader.ISearchLoaderArg.md#searching)
- [totalCount](client_components_search_SearchLoader.ISearchLoaderArg.md#totalcount)

## Properties

### accessibleCount

• **accessibleCount**: `number`

The accessible count, the number of records we can actually access
and retrieve as search results; this is due to technical limitations
and security policies, anyway no person really goes further than page 4
better them to refine the search

#### Defined in

[client/components/search/SearchLoader.tsx:116](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L116)

___

### dismissError

• **dismissError**: () => `void`

#### Type declaration

▸ (): `void`

dismiss the errors

##### Returns

`void`

#### Defined in

[client/components/search/SearchLoader.tsx:141](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L141)

___

### error

• **error**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

An error that occured during the get list execution to fetch
the search results of a given page

#### Defined in

[client/components/search/SearchLoader.tsx:137](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L137)

___

### hasNextPage

• **hasNextPage**: `boolean`

whether there's a next page from the current selected

#### Defined in

[client/components/search/SearchLoader.tsx:120](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L120)

___

### hasPrevPage

• **hasPrevPage**: `boolean`

Whether there's a previous page from the current selected

#### Defined in

[client/components/search/SearchLoader.tsx:124](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L124)

___

### isLoadingSearchResults

• **isLoadingSearchResults**: `boolean`

Whether it's currently searching for that given search id
this variable can be very useful to check for applied values
if you are doing your own custom logic and not using traditional search
once the isSearching variable is set to false, all the applied values
for the given page are ensured to be there, this is also true for
traditional search

#### Defined in

[client/components/search/SearchLoader.tsx:92](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L92)

___

### limit

• **limit**: `number`

the limit used during the search action

#### Defined in

[client/components/search/SearchLoader.tsx:128](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L128)

___

### metadata

• **metadata**: `string`

metadata that was given during the search operation for additional details

#### Defined in

[client/components/search/SearchLoader.tsx:150](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L150)

___

### offset

• **offset**: `number`

The offset used during the search action

#### Defined in

[client/components/search/SearchLoader.tsx:132](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L132)

___

### pageCount

• **pageCount**: `number`

The page count given the number of total pages, despite
this not being a pagination based mechanism, still
the search results are loaded in chunks or pages; note that
the page count is only has to do with the accessible count of matches

#### Defined in

[client/components/search/SearchLoader.tsx:104](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L104)

___

### refreshPage

• **refreshPage**: () => `void`

#### Type declaration

▸ (): `void`

refresh the page, while itemize content is fully dynamic, it's still possible, eg.
say you got an error, you can ask for a refresh

##### Returns

`void`

#### Defined in

[client/components/search/SearchLoader.tsx:146](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L146)

___

### searchId

• **searchId**: `string`

The search id is an unique identifier for this
search and this search only

#### Defined in

[client/components/search/SearchLoader.tsx:78](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L78)

___

### searchRecords

• **searchRecords**: `IRQSearchRecordWithPopulateData`[]

the search records are records that allow to be requested
as well as organized, partial information of a search result

#### Defined in

[client/components/search/SearchLoader.tsx:97](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L97)

___

### searching

• **searching**: `boolean`

Whether it is currently searching according to the search
parameters in order to retrieve records

#### Defined in

[client/components/search/SearchLoader.tsx:83](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L83)

___

### totalCount

• **totalCount**: `number`

The total count, the number of items that matched this search
in the server side

#### Defined in

[client/components/search/SearchLoader.tsx:109](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L109)
