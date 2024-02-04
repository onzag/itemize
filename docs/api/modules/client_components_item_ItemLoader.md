[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/item/ItemLoader

# Module: client/components/item/ItemLoader

Provides an item definition loader component that allows for functionality
regarding notFound, blocked, data accessible, loading, loaded, etc... with
conditional rendering

## Table of contents

### Interfaces

- [IItemLoaderInfoArgType](../interfaces/client_components_item_ItemLoader.IItemLoaderInfoArgType.md)

### Functions

- [default](client_components_item_ItemLoader.md#default)
- [useItemLoader](client_components_item_ItemLoader.md#useitemloader)

## Functions

### default

▸ **default**(`props`): `Element`

The item definition loader component allows for conditional rendering depending on the
fact on the state of the item definition value itself, allows for many types of
rendering conditions depending on the loading state, should use mostly if a forId
is specified as that requires loading

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IItemLoaderProps` |

#### Returns

`Element`

#### Defined in

[client/components/item/ItemLoader.tsx:149](https://github.com/onzag/itemize/blob/73e0c39e/client/components/item/ItemLoader.tsx#L149)

___

### useItemLoader

▸ **useItemLoader**(): [`IItemLoaderInfoArgType`](../interfaces/client_components_item_ItemLoader.IItemLoaderInfoArgType.md)

#### Returns

[`IItemLoaderInfoArgType`](../interfaces/client_components_item_ItemLoader.IItemLoaderInfoArgType.md)

#### Defined in

[client/components/item/ItemLoader.tsx:159](https://github.com/onzag/itemize/blob/73e0c39e/client/components/item/ItemLoader.tsx#L159)
