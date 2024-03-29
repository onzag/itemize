[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/search/SearchActioner](../modules/client_components_search_SearchActioner.md) / ISearchActionerInfoArgType

# Interface: ISearchActionerInfoArgType

[client/components/search/SearchActioner](../modules/client_components_search_SearchActioner.md).ISearchActionerInfoArgType

This is what the search actioner callback receives as argument
in order to execute

## Table of contents

### Properties

- [clean](client_components_search_SearchActioner.ISearchActionerInfoArgType.md#clean)
- [dismissSearchError](client_components_search_SearchActioner.ISearchActionerInfoArgType.md#dismisssearcherror)
- [dismissSearchResults](client_components_search_SearchActioner.ISearchActionerInfoArgType.md#dismisssearchresults)
- [search](client_components_search_SearchActioner.ISearchActionerInfoArgType.md#search)
- [searchError](client_components_search_SearchActioner.ISearchActionerInfoArgType.md#searcherror)
- [searchRecords](client_components_search_SearchActioner.ISearchActionerInfoArgType.md#searchrecords)
- [searching](client_components_search_SearchActioner.ISearchActionerInfoArgType.md#searching)

## Properties

### clean

• **clean**: (`options`: [`IActionCleanOptions`](client_providers_item.IActionCleanOptions.md), `state`: ``"success"`` \| ``"fail"``, `avoidTriggeringUpdate?`: `boolean`) => `void`

#### Type declaration

▸ (`options`, `state`, `avoidTriggeringUpdate?`): `void`

clean function from the context

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionCleanOptions`](client_providers_item.IActionCleanOptions.md) |
| `state` | ``"success"`` \| ``"fail"`` |
| `avoidTriggeringUpdate?` | `boolean` |

##### Returns

`void`

#### Defined in

[client/components/search/SearchActioner.tsx:52](https://github.com/onzag/itemize/blob/73e0c39e/client/components/search/SearchActioner.tsx#L52)

___

### dismissSearchError

• **dismissSearchError**: () => `void`

#### Type declaration

▸ (): `void`

Dismiss the search error

##### Returns

`void`

#### Defined in

[client/components/search/SearchActioner.tsx:36](https://github.com/onzag/itemize/blob/73e0c39e/client/components/search/SearchActioner.tsx#L36)

___

### dismissSearchResults

• **dismissSearchResults**: () => `void`

#### Type declaration

▸ (): `void`

Dissmiss the search results

##### Returns

`void`

#### Defined in

[client/components/search/SearchActioner.tsx:32](https://github.com/onzag/itemize/blob/73e0c39e/client/components/search/SearchActioner.tsx#L32)

___

### search

• **search**: (`options?`: [`IActionSearchOptions`](client_providers_item.IActionSearchOptions.md)) => `Promise`\<[`IActionResponseWithSearchResults`](client_providers_item.IActionResponseWithSearchResults.md)\>

#### Type declaration

▸ (`options?`): `Promise`\<[`IActionResponseWithSearchResults`](client_providers_item.IActionResponseWithSearchResults.md)\>

search frunction from the context

##### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`IActionSearchOptions`](client_providers_item.IActionSearchOptions.md) |

##### Returns

`Promise`\<[`IActionResponseWithSearchResults`](client_providers_item.IActionResponseWithSearchResults.md)\>

#### Defined in

[client/components/search/SearchActioner.tsx:48](https://github.com/onzag/itemize/blob/73e0c39e/client/components/search/SearchActioner.tsx#L48)

___

### searchError

• **searchError**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

An error that occured during the last search (whole context)

#### Defined in

[client/components/search/SearchActioner.tsx:28](https://github.com/onzag/itemize/blob/73e0c39e/client/components/search/SearchActioner.tsx#L28)

___

### searchRecords

• **searchRecords**: [`IRQSearchRecord`](rq_querier.IRQSearchRecord.md)[]

Search records (whole context)

#### Defined in

[client/components/search/SearchActioner.tsx:44](https://github.com/onzag/itemize/blob/73e0c39e/client/components/search/SearchActioner.tsx#L44)

___

### searching

• **searching**: `boolean`

Currently searching (this is true for the whole context)

#### Defined in

[client/components/search/SearchActioner.tsx:40](https://github.com/onzag/itemize/blob/73e0c39e/client/components/search/SearchActioner.tsx#L40)
