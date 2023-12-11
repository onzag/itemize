[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/search/PagedSearchLoader](../modules/client_components_search_PagedSearchLoader.md) / IPagedSearchLoaderArg

# Interface: IPagedSearchLoaderArg

[client/components/search/PagedSearchLoader](../modules/client_components_search_PagedSearchLoader.md).IPagedSearchLoaderArg

The paged search loader argument contains info that is rather similar
to the generic loader, but simpler

## Hierarchy

- [`ISearchLoaderArg`](client_components_search_SearchLoader.ISearchLoaderArg.md)

  ↳ **`IPagedSearchLoaderArg`**

## Table of contents

### Properties

- [accessibleCount](client_components_search_PagedSearchLoader.IPagedSearchLoaderArg.md#accessiblecount)
- [currentPage](client_components_search_PagedSearchLoader.IPagedSearchLoaderArg.md#currentpage)
- [dismissError](client_components_search_PagedSearchLoader.IPagedSearchLoaderArg.md#dismisserror)
- [error](client_components_search_PagedSearchLoader.IPagedSearchLoaderArg.md#error)
- [goToNextPage](client_components_search_PagedSearchLoader.IPagedSearchLoaderArg.md#gotonextpage)
- [goToPage](client_components_search_PagedSearchLoader.IPagedSearchLoaderArg.md#gotopage)
- [goToPrevPage](client_components_search_PagedSearchLoader.IPagedSearchLoaderArg.md#gotoprevpage)
- [hasNextPage](client_components_search_PagedSearchLoader.IPagedSearchLoaderArg.md#hasnextpage)
- [hasPrevPage](client_components_search_PagedSearchLoader.IPagedSearchLoaderArg.md#hasprevpage)
- [isLoadingSearchResults](client_components_search_PagedSearchLoader.IPagedSearchLoaderArg.md#isloadingsearchresults)
- [limit](client_components_search_PagedSearchLoader.IPagedSearchLoaderArg.md#limit)
- [metadata](client_components_search_PagedSearchLoader.IPagedSearchLoaderArg.md#metadata)
- [offset](client_components_search_PagedSearchLoader.IPagedSearchLoaderArg.md#offset)
- [pageCount](client_components_search_PagedSearchLoader.IPagedSearchLoaderArg.md#pagecount)
- [refreshPage](client_components_search_PagedSearchLoader.IPagedSearchLoaderArg.md#refreshpage)
- [searchId](client_components_search_PagedSearchLoader.IPagedSearchLoaderArg.md#searchid)
- [searchRecords](client_components_search_PagedSearchLoader.IPagedSearchLoaderArg.md#searchrecords)
- [searching](client_components_search_PagedSearchLoader.IPagedSearchLoaderArg.md#searching)
- [totalCount](client_components_search_PagedSearchLoader.IPagedSearchLoaderArg.md#totalcount)

## Properties

### accessibleCount

• **accessibleCount**: `number`

The accessible count, the number of records we can actually access
and retrieve as search results; this is due to technical limitations
and security policies, anyway no person really goes further than page 4
better them to refine the search

#### Inherited from

[ISearchLoaderArg](client_components_search_SearchLoader.ISearchLoaderArg.md).[accessibleCount](client_components_search_SearchLoader.ISearchLoaderArg.md#accessiblecount)

#### Defined in

[client/components/search/SearchLoader.tsx:116](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L116)

___

### currentPage

• **currentPage**: `number`

Such as the current page which is the same, note that it's 0 indexed

#### Defined in

[client/components/search/PagedSearchLoader.tsx:20](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/PagedSearchLoader.tsx#L20)

___

### dismissError

• **dismissError**: () => `void`

#### Type declaration

▸ (): `void`

dismiss the errors

##### Returns

`void`

#### Inherited from

[ISearchLoaderArg](client_components_search_SearchLoader.ISearchLoaderArg.md).[dismissError](client_components_search_SearchLoader.ISearchLoaderArg.md#dismisserror)

#### Defined in

[client/components/search/SearchLoader.tsx:141](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L141)

___

### error

• **error**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

An error that occured during the get list execution to fetch
the search results of a given page

#### Inherited from

[ISearchLoaderArg](client_components_search_SearchLoader.ISearchLoaderArg.md).[error](client_components_search_SearchLoader.ISearchLoaderArg.md#error)

#### Defined in

[client/components/search/SearchLoader.tsx:137](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L137)

___

### goToNextPage

• **goToNextPage**: () => `void`

#### Type declaration

▸ (): `void`

A function to go to previous page

##### Returns

`void`

#### Defined in

[client/components/search/PagedSearchLoader.tsx:24](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/PagedSearchLoader.tsx#L24)

___

### goToPage

• **goToPage**: (`n`: `number`) => `void`

#### Type declaration

▸ (`n`): `void`

And another to go to a specific page number

##### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

##### Returns

`void`

#### Defined in

[client/components/search/PagedSearchLoader.tsx:32](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/PagedSearchLoader.tsx#L32)

___

### goToPrevPage

• **goToPrevPage**: () => `void`

#### Type declaration

▸ (): `void`

A function to go to next

##### Returns

`void`

#### Defined in

[client/components/search/PagedSearchLoader.tsx:28](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/PagedSearchLoader.tsx#L28)

___

### hasNextPage

• **hasNextPage**: `boolean`

whether there's a next page from the current selected

#### Inherited from

[ISearchLoaderArg](client_components_search_SearchLoader.ISearchLoaderArg.md).[hasNextPage](client_components_search_SearchLoader.ISearchLoaderArg.md#hasnextpage)

#### Defined in

[client/components/search/SearchLoader.tsx:120](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L120)

___

### hasPrevPage

• **hasPrevPage**: `boolean`

Whether there's a previous page from the current selected

#### Inherited from

[ISearchLoaderArg](client_components_search_SearchLoader.ISearchLoaderArg.md).[hasPrevPage](client_components_search_SearchLoader.ISearchLoaderArg.md#hasprevpage)

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

#### Inherited from

[ISearchLoaderArg](client_components_search_SearchLoader.ISearchLoaderArg.md).[isLoadingSearchResults](client_components_search_SearchLoader.ISearchLoaderArg.md#isloadingsearchresults)

#### Defined in

[client/components/search/SearchLoader.tsx:92](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L92)

___

### limit

• **limit**: `number`

the limit used during the search action

#### Inherited from

[ISearchLoaderArg](client_components_search_SearchLoader.ISearchLoaderArg.md).[limit](client_components_search_SearchLoader.ISearchLoaderArg.md#limit)

#### Defined in

[client/components/search/SearchLoader.tsx:128](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L128)

___

### metadata

• **metadata**: `string`

metadata that was given during the search operation for additional details

#### Inherited from

[ISearchLoaderArg](client_components_search_SearchLoader.ISearchLoaderArg.md).[metadata](client_components_search_SearchLoader.ISearchLoaderArg.md#metadata)

#### Defined in

[client/components/search/SearchLoader.tsx:150](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L150)

___

### offset

• **offset**: `number`

The offset used during the search action

#### Inherited from

[ISearchLoaderArg](client_components_search_SearchLoader.ISearchLoaderArg.md).[offset](client_components_search_SearchLoader.ISearchLoaderArg.md#offset)

#### Defined in

[client/components/search/SearchLoader.tsx:132](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L132)

___

### pageCount

• **pageCount**: `number`

The page count given the number of total pages, despite
this not being a pagination based mechanism, still
the search results are loaded in chunks or pages; note that
the page count is only has to do with the accessible count of matches

#### Inherited from

[ISearchLoaderArg](client_components_search_SearchLoader.ISearchLoaderArg.md).[pageCount](client_components_search_SearchLoader.ISearchLoaderArg.md#pagecount)

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

#### Inherited from

[ISearchLoaderArg](client_components_search_SearchLoader.ISearchLoaderArg.md).[refreshPage](client_components_search_SearchLoader.ISearchLoaderArg.md#refreshpage)

#### Defined in

[client/components/search/SearchLoader.tsx:146](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L146)

___

### searchId

• **searchId**: `string`

The search id is an unique identifier for this
search and this search only

#### Inherited from

[ISearchLoaderArg](client_components_search_SearchLoader.ISearchLoaderArg.md).[searchId](client_components_search_SearchLoader.ISearchLoaderArg.md#searchid)

#### Defined in

[client/components/search/SearchLoader.tsx:78](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L78)

___

### searchRecords

• **searchRecords**: `IRQSearchRecordWithPopulateData`[]

the search records are records that allow to be requested
as well as organized, partial information of a search result

#### Inherited from

[ISearchLoaderArg](client_components_search_SearchLoader.ISearchLoaderArg.md).[searchRecords](client_components_search_SearchLoader.ISearchLoaderArg.md#searchrecords)

#### Defined in

[client/components/search/SearchLoader.tsx:97](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L97)

___

### searching

• **searching**: `boolean`

Whether it is currently searching according to the search
parameters in order to retrieve records

#### Inherited from

[ISearchLoaderArg](client_components_search_SearchLoader.ISearchLoaderArg.md).[searching](client_components_search_SearchLoader.ISearchLoaderArg.md#searching)

#### Defined in

[client/components/search/SearchLoader.tsx:83](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L83)

___

### totalCount

• **totalCount**: `number`

The total count, the number of items that matched this search
in the server side

#### Inherited from

[ISearchLoaderArg](client_components_search_SearchLoader.ISearchLoaderArg.md).[totalCount](client_components_search_SearchLoader.ISearchLoaderArg.md#totalcount)

#### Defined in

[client/components/search/SearchLoader.tsx:109](https://github.com/onzag/itemize/blob/59702dd5/client/components/search/SearchLoader.tsx#L109)
