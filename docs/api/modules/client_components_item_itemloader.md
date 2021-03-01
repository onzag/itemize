[](../README.md) / [Exports](../modules.md) / client/components/item/ItemLoader

# Module: client/components/item/ItemLoader

Provides an item definition loader component that allows for functionality
regarding notFound, blocked, data accessible, loading, loaded, etc... with
conditional rendering

## Table of contents

### Interfaces

- [IItemLoaderInfoArgType](../interfaces/client_components_item_itemloader.iitemloaderinfoargtype.md)

### Functions

- [default](client_components_item_itemloader.md#default)

## Functions

### default

▸ **default**(`props`: IItemLoaderProps): *Element*

The item definition loader component allows for conditional rendering depending on the
fact on the state of the item definition value itself, allows for many types of
rendering conditions depending on the loading state, should use mostly if a forId
is specified as that requires loading

#### Parameters:

Name | Type |
:------ | :------ |
`props` | IItemLoaderProps |

**Returns:** *Element*

Defined in: [client/components/item/ItemLoader.tsx:104](https://github.com/onzag/itemize/blob/0569bdf2/client/components/item/ItemLoader.tsx#L104)
