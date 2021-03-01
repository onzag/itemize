[](../README.md) / [Exports](../modules.md) / [client/components/item/ItemLoader](../modules/client_components_item_itemloader.md) / IItemLoaderInfoArgType

# Interface: IItemLoaderInfoArgType

[client/components/item/ItemLoader](../modules/client_components_item_itemloader.md).IItemLoaderInfoArgType

The arg that is passed to the children, which allows
for the conditional rendering

## Table of contents

### Properties

- [blocked](client_components_item_itemloader.iitemloaderinfoargtype.md#blocked)
- [error](client_components_item_itemloader.iitemloaderinfoargtype.md#error)
- [hasBlockedAccess](client_components_item_itemloader.iitemloaderinfoargtype.md#hasblockedaccess)
- [loaded](client_components_item_itemloader.iitemloaderinfoargtype.md#loaded)
- [loading](client_components_item_itemloader.iitemloaderinfoargtype.md#loading)
- [notFound](client_components_item_itemloader.iitemloaderinfoargtype.md#notfound)
- [reload](client_components_item_itemloader.iitemloaderinfoargtype.md#reload)

## Properties

### blocked

• **blocked**: *boolean*

Whether the item is blocked

Defined in: [client/components/item/ItemLoader.tsx:37](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/ItemLoader.tsx#L37)

___

### error

• **error**: [*EndpointErrorType*](../modules/base_errors.md#endpointerrortype)

An error that occured during loading, not found does not count for this
as null is a valid value, this is more for forbidden, no network, and whatnot

Defined in: [client/components/item/ItemLoader.tsx:46](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/ItemLoader.tsx#L46)

___

### hasBlockedAccess

• **hasBlockedAccess**: *boolean*

Whether you have moderation access to the item despite it being blocked

Defined in: [client/components/item/ItemLoader.tsx:41](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/ItemLoader.tsx#L41)

___

### loaded

• **loaded**: *boolean*

Whether it is ready and loaded

Defined in: [client/components/item/ItemLoader.tsx:25](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/ItemLoader.tsx#L25)

___

### loading

• **loading**: *boolean*

Whether is currently loading, from memory, cache, etc...

Defined in: [client/components/item/ItemLoader.tsx:29](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/ItemLoader.tsx#L29)

___

### notFound

• **notFound**: *boolean*

Whether it is not found, as in the item definition did not exist

Defined in: [client/components/item/ItemLoader.tsx:33](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/ItemLoader.tsx#L33)

___

### reload

• **reload**: () => *Promise*<[*IBasicActionResponse*](client_providers_item.ibasicactionresponse.md)\>

A function that allows to try to reload the element

#### Type declaration:

▸ (): *Promise*<[*IBasicActionResponse*](client_providers_item.ibasicactionresponse.md)\>

**Returns:** *Promise*<[*IBasicActionResponse*](client_providers_item.ibasicactionresponse.md)\>

Defined in: [client/components/item/ItemLoader.tsx:50](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/ItemLoader.tsx#L50)

Defined in: [client/components/item/ItemLoader.tsx:50](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/ItemLoader.tsx#L50)
