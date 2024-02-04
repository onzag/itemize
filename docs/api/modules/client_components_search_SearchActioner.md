[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/search/SearchActioner

# Module: client/components/search/SearchActioner

This file contains the search actioner which is capable of triggering searches
in the item definition context

## Table of contents

### Interfaces

- [ISearchActionerInfoArgType](../interfaces/client_components_search_SearchActioner.ISearchActionerInfoArgType.md)

### Functions

- [default](client_components_search_SearchActioner.md#default)

## Functions

### default

▸ **default**(`props`): `Element`

The search actioner allows to run contextual searches in the current item definition
please ensure that such context is in search mode as failure to do so will result
in an error once a search is attempted

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `ISearchActionerProps` | the props |

#### Returns

`Element`

a react element

#### Defined in

[client/components/search/SearchActioner.tsx:102](https://github.com/onzag/itemize/blob/73e0c39e/client/components/search/SearchActioner.tsx#L102)
