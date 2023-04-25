[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/providers/item](../modules/client_providers_item.md) / ISearchItemValueContextType

# Interface: ISearchItemValueContextType

[client/providers/item](../modules/client_providers_item.md).ISearchItemValueContextType

Represents the search context that is injected above an item provider in order to block
it from loading itself so it's aware that elements are being searched

## Table of contents

### Properties

- [currentlySearching](client_providers_item.ISearchItemValueContextType.md#currentlysearching)
- [searchFields](client_providers_item.ISearchItemValueContextType.md#searchfields)
- [searchRecords](client_providers_item.ISearchItemValueContextType.md#searchrecords)

## Properties

### currentlySearching

• **currentlySearching**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

Records being searched that will eventually have an applied value

#### Defined in

[client/providers/item.tsx:1285](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1285)

___

### searchFields

• **searchFields**: [`IGQLRequestFields`](gql_querier.IGQLRequestFields.md)

Fields that are being searched

#### Defined in

[client/providers/item.tsx:1289](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1289)

___

### searchRecords

• **searchRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

Records that are overall in the search that is active avobe

#### Defined in

[client/providers/item.tsx:1293](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L1293)
