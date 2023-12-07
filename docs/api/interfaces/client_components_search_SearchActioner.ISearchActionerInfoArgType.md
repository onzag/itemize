[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/search/SearchActioner](../modules/client_components_search_SearchActioner.md) / ISearchActionerInfoArgType

# Interface: ISearchActionerInfoArgType

[client/components/search/SearchActioner](../modules/client_components_search_SearchActioner.md).ISearchActionerInfoArgType

This is what the search actioner callback receives as argument
in order to execute

## Table of contents

### Properties

- [searchError](client_components_search_SearchActioner.ISearchActionerInfoArgType.md#searcherror)
- [searchRecords](client_components_search_SearchActioner.ISearchActionerInfoArgType.md#searchrecords)
- [searching](client_components_search_SearchActioner.ISearchActionerInfoArgType.md#searching)

### Methods

- [clean](client_components_search_SearchActioner.ISearchActionerInfoArgType.md#clean)
- [dismissSearchError](client_components_search_SearchActioner.ISearchActionerInfoArgType.md#dismisssearcherror)
- [dismissSearchResults](client_components_search_SearchActioner.ISearchActionerInfoArgType.md#dismisssearchresults)
- [search](client_components_search_SearchActioner.ISearchActionerInfoArgType.md#search)

## Properties

### searchError

• **searchError**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

An error that occured during the last search (whole context)

#### Defined in

[client/components/search/SearchActioner.tsx:28](https://github.com/onzag/itemize/blob/a24376ed/client/components/search/SearchActioner.tsx#L28)

___

### searchRecords

• **searchRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

Search records (whole context)

#### Defined in

[client/components/search/SearchActioner.tsx:44](https://github.com/onzag/itemize/blob/a24376ed/client/components/search/SearchActioner.tsx#L44)

___

### searching

• **searching**: `boolean`

Currently searching (this is true for the whole context)

#### Defined in

[client/components/search/SearchActioner.tsx:40](https://github.com/onzag/itemize/blob/a24376ed/client/components/search/SearchActioner.tsx#L40)

## Methods

### clean

▸ **clean**(`options`, `state`, `avoidTriggeringUpdate?`): `void`

clean function from the context

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionCleanOptions`](client_providers_item.IActionCleanOptions.md) |
| `state` | ``"success"`` \| ``"fail"`` |
| `avoidTriggeringUpdate?` | `boolean` |

#### Returns

`void`

#### Defined in

[client/components/search/SearchActioner.tsx:52](https://github.com/onzag/itemize/blob/a24376ed/client/components/search/SearchActioner.tsx#L52)

___

### dismissSearchError

▸ **dismissSearchError**(): `void`

Dismiss the search error

#### Returns

`void`

#### Defined in

[client/components/search/SearchActioner.tsx:36](https://github.com/onzag/itemize/blob/a24376ed/client/components/search/SearchActioner.tsx#L36)

___

### dismissSearchResults

▸ **dismissSearchResults**(): `void`

Dissmiss the search results

#### Returns

`void`

#### Defined in

[client/components/search/SearchActioner.tsx:32](https://github.com/onzag/itemize/blob/a24376ed/client/components/search/SearchActioner.tsx#L32)

___

### search

▸ **search**(`options?`): `Promise`<[`IActionResponseWithSearchResults`](client_providers_item.IActionResponseWithSearchResults.md)\>

search frunction from the context

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`IActionSearchOptions`](client_providers_item.IActionSearchOptions.md) |

#### Returns

`Promise`<[`IActionResponseWithSearchResults`](client_providers_item.IActionResponseWithSearchResults.md)\>

#### Defined in

[client/components/search/SearchActioner.tsx:48](https://github.com/onzag/itemize/blob/a24376ed/client/components/search/SearchActioner.tsx#L48)
