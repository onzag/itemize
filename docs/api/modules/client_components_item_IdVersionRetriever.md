[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/item/IdVersionRetriever

# Module: client/components/item/IdVersionRetriever

Allows to retrieve the actual id and version of the item that is currently in the context
this is very useful when using unversioned loaded values in order to know if it's the unversioned
that is loaded

## Table of contents

### Interfaces

- [IIdVersionRetrieverArg](../interfaces/client_components_item_IdVersionRetriever.IIdVersionRetrieverArg.md)

### Functions

- [default](client_components_item_IdVersionRetriever.md#default)

## Functions

### default

▸ **default**(`props`): `Element`

The id version retrieves provides the actually loaded id and version item
in the current context, this is useful to know what we actually loaded
when allowing unversioned fallbacks to load

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `IIdVersionRetrieverProps` | the props |

#### Returns

`Element`

a react component

#### Defined in

[client/components/item/IdVersionRetriever.tsx:65](https://github.com/onzag/itemize/blob/5c2808d3/client/components/item/IdVersionRetriever.tsx#L65)
