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

• **currentlySearching**: [`IRQSearchRecord`](rq_querier.IRQSearchRecord.md)[]

Records being searched that will eventually have an applied value

#### Defined in

[client/providers/item.tsx:1486](https://github.com/onzag/itemize/blob/73e0c39e/client/providers/item.tsx#L1486)

___

### searchFields

• **searchFields**: [`IRQRequestFields`](rq_querier.IRQRequestFields.md)

Fields that are being searched

#### Defined in

[client/providers/item.tsx:1490](https://github.com/onzag/itemize/blob/73e0c39e/client/providers/item.tsx#L1490)

___

### searchRecords

• **searchRecords**: [`IRQSearchRecord`](rq_querier.IRQSearchRecord.md)[]

Records that are overall in the search that is active avobe

#### Defined in

[client/providers/item.tsx:1494](https://github.com/onzag/itemize/blob/73e0c39e/client/providers/item.tsx#L1494)
