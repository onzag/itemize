[](../README.md) / [Exports](../modules.md) / [client/components/search/SearchActioner](../modules/client_components_search_searchactioner.md) / ISearchActionerInfoArgType

# Interface: ISearchActionerInfoArgType

[client/components/search/SearchActioner](../modules/client_components_search_searchactioner.md).ISearchActionerInfoArgType

This is what the search actioner callback receives as argument
in order to execute

## Table of contents

### Properties

- [clean](client_components_search_searchactioner.isearchactionerinfoargtype.md#clean)
- [dismissSearchError](client_components_search_searchactioner.isearchactionerinfoargtype.md#dismisssearcherror)
- [dismissSearchResults](client_components_search_searchactioner.isearchactionerinfoargtype.md#dismisssearchresults)
- [search](client_components_search_searchactioner.isearchactionerinfoargtype.md#search)
- [searchError](client_components_search_searchactioner.isearchactionerinfoargtype.md#searcherror)
- [searchRecords](client_components_search_searchactioner.isearchactionerinfoargtype.md#searchrecords)
- [searching](client_components_search_searchactioner.isearchactionerinfoargtype.md#searching)

## Properties

### clean

• **clean**: (`options`: [*IActionCleanOptions*](client_providers_item.iactioncleanoptions.md), `state`: *success* \| *fail*, `avoidTriggeringUpdate?`: *boolean*) => *void*

clean function from the context

#### Type declaration:

▸ (`options`: [*IActionCleanOptions*](client_providers_item.iactioncleanoptions.md), `state`: *success* \| *fail*, `avoidTriggeringUpdate?`: *boolean*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*IActionCleanOptions*](client_providers_item.iactioncleanoptions.md) |
`state` | *success* \| *fail* |
`avoidTriggeringUpdate?` | *boolean* |

**Returns:** *void*

Defined in: [client/components/search/SearchActioner.tsx:52](https://github.com/onzag/itemize/blob/28218320/client/components/search/SearchActioner.tsx#L52)

Defined in: [client/components/search/SearchActioner.tsx:52](https://github.com/onzag/itemize/blob/28218320/client/components/search/SearchActioner.tsx#L52)

___

### dismissSearchError

• **dismissSearchError**: () => *void*

Dismiss the search error

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/components/search/SearchActioner.tsx:36](https://github.com/onzag/itemize/blob/28218320/client/components/search/SearchActioner.tsx#L36)

Defined in: [client/components/search/SearchActioner.tsx:36](https://github.com/onzag/itemize/blob/28218320/client/components/search/SearchActioner.tsx#L36)

___

### dismissSearchResults

• **dismissSearchResults**: () => *void*

Dissmiss the search results

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/components/search/SearchActioner.tsx:32](https://github.com/onzag/itemize/blob/28218320/client/components/search/SearchActioner.tsx#L32)

Defined in: [client/components/search/SearchActioner.tsx:32](https://github.com/onzag/itemize/blob/28218320/client/components/search/SearchActioner.tsx#L32)

___

### search

• **search**: (`options?`: [*IActionSearchOptions*](client_providers_item.iactionsearchoptions.md)) => *Promise*<[*IActionResponseWithSearchResults*](client_providers_item.iactionresponsewithsearchresults.md)\>

search frunction from the context

#### Type declaration:

▸ (`options?`: [*IActionSearchOptions*](client_providers_item.iactionsearchoptions.md)): *Promise*<[*IActionResponseWithSearchResults*](client_providers_item.iactionresponsewithsearchresults.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`options?` | [*IActionSearchOptions*](client_providers_item.iactionsearchoptions.md) |

**Returns:** *Promise*<[*IActionResponseWithSearchResults*](client_providers_item.iactionresponsewithsearchresults.md)\>

Defined in: [client/components/search/SearchActioner.tsx:48](https://github.com/onzag/itemize/blob/28218320/client/components/search/SearchActioner.tsx#L48)

Defined in: [client/components/search/SearchActioner.tsx:48](https://github.com/onzag/itemize/blob/28218320/client/components/search/SearchActioner.tsx#L48)

___

### searchError

• **searchError**: [*EndpointErrorType*](../modules/base_errors.md#endpointerrortype)

An error that occured during the last search (whole context)

Defined in: [client/components/search/SearchActioner.tsx:28](https://github.com/onzag/itemize/blob/28218320/client/components/search/SearchActioner.tsx#L28)

___

### searchRecords

• **searchRecords**: [*IGQLSearchRecord*](gql_querier.igqlsearchrecord.md)[]

Search records (whole context)

Defined in: [client/components/search/SearchActioner.tsx:44](https://github.com/onzag/itemize/blob/28218320/client/components/search/SearchActioner.tsx#L44)

___

### searching

• **searching**: *boolean*

Currently searching (this is true for the whole context)

Defined in: [client/components/search/SearchActioner.tsx:40](https://github.com/onzag/itemize/blob/28218320/client/components/search/SearchActioner.tsx#L40)
