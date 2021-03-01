[](../README.md) / [Exports](../modules.md) / [client/components/search/SearchLoader](../modules/client_components_search_searchloader.md) / ISearchLoaderArg

# Interface: ISearchLoaderArg

[client/components/search/SearchLoader](../modules/client_components_search_searchloader.md).ISearchLoaderArg

This is what the search loader recieves as argument
in its children prop

## Hierarchy

* **ISearchLoaderArg**

  ↳ [*IPagedSearchLoaderArg*](client_components_search_pagedsearchloader.ipagedsearchloaderarg.md)

## Table of contents

### Properties

- [accessibleCount](client_components_search_searchloader.isearchloaderarg.md#accessiblecount)
- [dismissError](client_components_search_searchloader.isearchloaderarg.md#dismisserror)
- [error](client_components_search_searchloader.isearchloaderarg.md#error)
- [hasNextPage](client_components_search_searchloader.isearchloaderarg.md#hasnextpage)
- [hasPrevPage](client_components_search_searchloader.isearchloaderarg.md#hasprevpage)
- [isSearching](client_components_search_searchloader.isearchloaderarg.md#issearching)
- [pageCount](client_components_search_searchloader.isearchloaderarg.md#pagecount)
- [refreshPage](client_components_search_searchloader.isearchloaderarg.md#refreshpage)
- [searchId](client_components_search_searchloader.isearchloaderarg.md#searchid)
- [searchRecords](client_components_search_searchloader.isearchloaderarg.md#searchrecords)
- [totalCount](client_components_search_searchloader.isearchloaderarg.md#totalcount)

## Properties

### accessibleCount

• **accessibleCount**: *number*

The accessible count, the number of records we can actually access
and retrieve as search results; this is due to technical limitations
and security policies, anyway no person really goes further than page 4
better them to refine the search

Defined in: [client/components/search/SearchLoader.tsx:107](https://github.com/onzag/itemize/blob/5fcde7cf/client/components/search/SearchLoader.tsx#L107)

___

### dismissError

• **dismissError**: () => *void*

dismiss the errors

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/components/search/SearchLoader.tsx:124](https://github.com/onzag/itemize/blob/5fcde7cf/client/components/search/SearchLoader.tsx#L124)

Defined in: [client/components/search/SearchLoader.tsx:124](https://github.com/onzag/itemize/blob/5fcde7cf/client/components/search/SearchLoader.tsx#L124)

___

### error

• **error**: [*EndpointErrorType*](../modules/base_errors.md#endpointerrortype)

An error that occured during the get list execution to fetch
the search results of a given page

Defined in: [client/components/search/SearchLoader.tsx:120](https://github.com/onzag/itemize/blob/5fcde7cf/client/components/search/SearchLoader.tsx#L120)

___

### hasNextPage

• **hasNextPage**: *boolean*

whether there's a next page from the current selected

Defined in: [client/components/search/SearchLoader.tsx:111](https://github.com/onzag/itemize/blob/5fcde7cf/client/components/search/SearchLoader.tsx#L111)

___

### hasPrevPage

• **hasPrevPage**: *boolean*

Whether there's a previous page from the current selected

Defined in: [client/components/search/SearchLoader.tsx:115](https://github.com/onzag/itemize/blob/5fcde7cf/client/components/search/SearchLoader.tsx#L115)

___

### isSearching

• **isSearching**: *boolean*

Whether it's currently searching for that given search id
this variable can be very useful to check for applied values
if you are doing your own custom logic and not using traditional search
once the isSearching variable is set to false, all the applied values
for the given page are ensured to be there, this is also true for
traditional search

Defined in: [client/components/search/SearchLoader.tsx:83](https://github.com/onzag/itemize/blob/5fcde7cf/client/components/search/SearchLoader.tsx#L83)

___

### pageCount

• **pageCount**: *number*

The page count given the number of total pages, despite
this not being a pagination based mechanism, still
the search results are loaded in chunks or pages; note that
the page count is only has to do with the accessible count of matches

Defined in: [client/components/search/SearchLoader.tsx:95](https://github.com/onzag/itemize/blob/5fcde7cf/client/components/search/SearchLoader.tsx#L95)

___

### refreshPage

• **refreshPage**: () => *void*

refresh the page, while itemize content is fully dynamic, it's still possible, eg.
say you got an error, you can ask for a refresh

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/components/search/SearchLoader.tsx:129](https://github.com/onzag/itemize/blob/5fcde7cf/client/components/search/SearchLoader.tsx#L129)

Defined in: [client/components/search/SearchLoader.tsx:129](https://github.com/onzag/itemize/blob/5fcde7cf/client/components/search/SearchLoader.tsx#L129)

___

### searchId

• **searchId**: *string*

The search id is an unique identifier for this
search and this search only

Defined in: [client/components/search/SearchLoader.tsx:74](https://github.com/onzag/itemize/blob/5fcde7cf/client/components/search/SearchLoader.tsx#L74)

___

### searchRecords

• **searchRecords**: IGQLSearchRecordWithPopulateData[]

the search records are records that allow to be requested
as well as organized, partial information of a search result

Defined in: [client/components/search/SearchLoader.tsx:88](https://github.com/onzag/itemize/blob/5fcde7cf/client/components/search/SearchLoader.tsx#L88)

___

### totalCount

• **totalCount**: *number*

The total count, the number of items that matched this search
in the server side

Defined in: [client/components/search/SearchLoader.tsx:100](https://github.com/onzag/itemize/blob/5fcde7cf/client/components/search/SearchLoader.tsx#L100)
