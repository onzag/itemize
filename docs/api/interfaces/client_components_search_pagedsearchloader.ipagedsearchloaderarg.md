[](../README.md) / [Exports](../modules.md) / [client/components/search/PagedSearchLoader](../modules/client_components_search_pagedsearchloader.md) / IPagedSearchLoaderArg

# Interface: IPagedSearchLoaderArg

[client/components/search/PagedSearchLoader](../modules/client_components_search_pagedsearchloader.md).IPagedSearchLoaderArg

The paged search loader argument contains info that is rather similar
to the generic loader, but simpler

## Hierarchy

* [*ISearchLoaderArg*](client_components_search_searchloader.isearchloaderarg.md)

  ↳ **IPagedSearchLoaderArg**

## Table of contents

### Properties

- [accessibleCount](client_components_search_pagedsearchloader.ipagedsearchloaderarg.md#accessiblecount)
- [currentPage](client_components_search_pagedsearchloader.ipagedsearchloaderarg.md#currentpage)
- [dismissError](client_components_search_pagedsearchloader.ipagedsearchloaderarg.md#dismisserror)
- [error](client_components_search_pagedsearchloader.ipagedsearchloaderarg.md#error)
- [goToNextPage](client_components_search_pagedsearchloader.ipagedsearchloaderarg.md#gotonextpage)
- [goToPage](client_components_search_pagedsearchloader.ipagedsearchloaderarg.md#gotopage)
- [goToPrevPage](client_components_search_pagedsearchloader.ipagedsearchloaderarg.md#gotoprevpage)
- [hasNextPage](client_components_search_pagedsearchloader.ipagedsearchloaderarg.md#hasnextpage)
- [hasPrevPage](client_components_search_pagedsearchloader.ipagedsearchloaderarg.md#hasprevpage)
- [isSearching](client_components_search_pagedsearchloader.ipagedsearchloaderarg.md#issearching)
- [pageCount](client_components_search_pagedsearchloader.ipagedsearchloaderarg.md#pagecount)
- [refreshPage](client_components_search_pagedsearchloader.ipagedsearchloaderarg.md#refreshpage)
- [searchId](client_components_search_pagedsearchloader.ipagedsearchloaderarg.md#searchid)
- [searchRecords](client_components_search_pagedsearchloader.ipagedsearchloaderarg.md#searchrecords)
- [totalCount](client_components_search_pagedsearchloader.ipagedsearchloaderarg.md#totalcount)

## Properties

### accessibleCount

• **accessibleCount**: *number*

The accessible count, the number of records we can actually access
and retrieve as search results; this is due to technical limitations
and security policies, anyway no person really goes further than page 4
better them to refine the search

Inherited from: [ISearchLoaderArg](client_components_search_searchloader.isearchloaderarg.md).[accessibleCount](client_components_search_searchloader.isearchloaderarg.md#accessiblecount)

Defined in: [client/components/search/SearchLoader.tsx:107](https://github.com/onzag/itemize/blob/11a98dec/client/components/search/SearchLoader.tsx#L107)

___

### currentPage

• **currentPage**: *number*

Such as the current page which is the same, note that it's 0 indexed

Defined in: [client/components/search/PagedSearchLoader.tsx:20](https://github.com/onzag/itemize/blob/11a98dec/client/components/search/PagedSearchLoader.tsx#L20)

___

### dismissError

• **dismissError**: () => *void*

dismiss the errors

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/components/search/SearchLoader.tsx:124](https://github.com/onzag/itemize/blob/11a98dec/client/components/search/SearchLoader.tsx#L124)

Inherited from: [ISearchLoaderArg](client_components_search_searchloader.isearchloaderarg.md).[dismissError](client_components_search_searchloader.isearchloaderarg.md#dismisserror)

Defined in: [client/components/search/SearchLoader.tsx:124](https://github.com/onzag/itemize/blob/11a98dec/client/components/search/SearchLoader.tsx#L124)

___

### error

• **error**: [*EndpointErrorType*](../modules/base_errors.md#endpointerrortype)

An error that occured during the get list execution to fetch
the search results of a given page

Inherited from: [ISearchLoaderArg](client_components_search_searchloader.isearchloaderarg.md).[error](client_components_search_searchloader.isearchloaderarg.md#error)

Defined in: [client/components/search/SearchLoader.tsx:120](https://github.com/onzag/itemize/blob/11a98dec/client/components/search/SearchLoader.tsx#L120)

___

### goToNextPage

• **goToNextPage**: () => *void*

A function to go to previous page

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/components/search/PagedSearchLoader.tsx:24](https://github.com/onzag/itemize/blob/11a98dec/client/components/search/PagedSearchLoader.tsx#L24)

Defined in: [client/components/search/PagedSearchLoader.tsx:24](https://github.com/onzag/itemize/blob/11a98dec/client/components/search/PagedSearchLoader.tsx#L24)

___

### goToPage

• **goToPage**: (`n`: *number*) => *void*

And another to go to a specific page number

#### Type declaration:

▸ (`n`: *number*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`n` | *number* |

**Returns:** *void*

Defined in: [client/components/search/PagedSearchLoader.tsx:32](https://github.com/onzag/itemize/blob/11a98dec/client/components/search/PagedSearchLoader.tsx#L32)

Defined in: [client/components/search/PagedSearchLoader.tsx:32](https://github.com/onzag/itemize/blob/11a98dec/client/components/search/PagedSearchLoader.tsx#L32)

___

### goToPrevPage

• **goToPrevPage**: () => *void*

A function to go to next

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/components/search/PagedSearchLoader.tsx:28](https://github.com/onzag/itemize/blob/11a98dec/client/components/search/PagedSearchLoader.tsx#L28)

Defined in: [client/components/search/PagedSearchLoader.tsx:28](https://github.com/onzag/itemize/blob/11a98dec/client/components/search/PagedSearchLoader.tsx#L28)

___

### hasNextPage

• **hasNextPage**: *boolean*

whether there's a next page from the current selected

Inherited from: [ISearchLoaderArg](client_components_search_searchloader.isearchloaderarg.md).[hasNextPage](client_components_search_searchloader.isearchloaderarg.md#hasnextpage)

Defined in: [client/components/search/SearchLoader.tsx:111](https://github.com/onzag/itemize/blob/11a98dec/client/components/search/SearchLoader.tsx#L111)

___

### hasPrevPage

• **hasPrevPage**: *boolean*

Whether there's a previous page from the current selected

Inherited from: [ISearchLoaderArg](client_components_search_searchloader.isearchloaderarg.md).[hasPrevPage](client_components_search_searchloader.isearchloaderarg.md#hasprevpage)

Defined in: [client/components/search/SearchLoader.tsx:115](https://github.com/onzag/itemize/blob/11a98dec/client/components/search/SearchLoader.tsx#L115)

___

### isSearching

• **isSearching**: *boolean*

Whether it's currently searching for that given search id
this variable can be very useful to check for applied values
if you are doing your own custom logic and not using traditional search
once the isSearching variable is set to false, all the applied values
for the given page are ensured to be there, this is also true for
traditional search

Inherited from: [ISearchLoaderArg](client_components_search_searchloader.isearchloaderarg.md).[isSearching](client_components_search_searchloader.isearchloaderarg.md#issearching)

Defined in: [client/components/search/SearchLoader.tsx:83](https://github.com/onzag/itemize/blob/11a98dec/client/components/search/SearchLoader.tsx#L83)

___

### pageCount

• **pageCount**: *number*

The page count given the number of total pages, despite
this not being a pagination based mechanism, still
the search results are loaded in chunks or pages; note that
the page count is only has to do with the accessible count of matches

Inherited from: [ISearchLoaderArg](client_components_search_searchloader.isearchloaderarg.md).[pageCount](client_components_search_searchloader.isearchloaderarg.md#pagecount)

Defined in: [client/components/search/SearchLoader.tsx:95](https://github.com/onzag/itemize/blob/11a98dec/client/components/search/SearchLoader.tsx#L95)

___

### refreshPage

• **refreshPage**: () => *void*

refresh the page, while itemize content is fully dynamic, it's still possible, eg.
say you got an error, you can ask for a refresh

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/components/search/SearchLoader.tsx:129](https://github.com/onzag/itemize/blob/11a98dec/client/components/search/SearchLoader.tsx#L129)

Inherited from: [ISearchLoaderArg](client_components_search_searchloader.isearchloaderarg.md).[refreshPage](client_components_search_searchloader.isearchloaderarg.md#refreshpage)

Defined in: [client/components/search/SearchLoader.tsx:129](https://github.com/onzag/itemize/blob/11a98dec/client/components/search/SearchLoader.tsx#L129)

___

### searchId

• **searchId**: *string*

The search id is an unique identifier for this
search and this search only

Inherited from: [ISearchLoaderArg](client_components_search_searchloader.isearchloaderarg.md).[searchId](client_components_search_searchloader.isearchloaderarg.md#searchid)

Defined in: [client/components/search/SearchLoader.tsx:74](https://github.com/onzag/itemize/blob/11a98dec/client/components/search/SearchLoader.tsx#L74)

___

### searchRecords

• **searchRecords**: IGQLSearchRecordWithPopulateData[]

the search records are records that allow to be requested
as well as organized, partial information of a search result

Inherited from: [ISearchLoaderArg](client_components_search_searchloader.isearchloaderarg.md).[searchRecords](client_components_search_searchloader.isearchloaderarg.md#searchrecords)

Defined in: [client/components/search/SearchLoader.tsx:88](https://github.com/onzag/itemize/blob/11a98dec/client/components/search/SearchLoader.tsx#L88)

___

### totalCount

• **totalCount**: *number*

The total count, the number of items that matched this search
in the server side

Inherited from: [ISearchLoaderArg](client_components_search_searchloader.isearchloaderarg.md).[totalCount](client_components_search_searchloader.isearchloaderarg.md#totalcount)

Defined in: [client/components/search/SearchLoader.tsx:100](https://github.com/onzag/itemize/blob/11a98dec/client/components/search/SearchLoader.tsx#L100)
