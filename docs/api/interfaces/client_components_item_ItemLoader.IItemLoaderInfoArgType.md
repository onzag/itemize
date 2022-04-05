[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/item/ItemLoader](../modules/client_components_item_ItemLoader.md) / IItemLoaderInfoArgType

# Interface: IItemLoaderInfoArgType

[client/components/item/ItemLoader](../modules/client_components_item_ItemLoader.md).IItemLoaderInfoArgType

The arg that is passed to the children, which allows
for the conditional rendering

## Table of contents

### Properties

- [blocked](client_components_item_ItemLoader.IItemLoaderInfoArgType.md#blocked)
- [error](client_components_item_ItemLoader.IItemLoaderInfoArgType.md#error)
- [hasBlockedAccess](client_components_item_ItemLoader.IItemLoaderInfoArgType.md#hasblockedaccess)
- [loaded](client_components_item_ItemLoader.IItemLoaderInfoArgType.md#loaded)
- [loading](client_components_item_ItemLoader.IItemLoaderInfoArgType.md#loading)
- [notFound](client_components_item_ItemLoader.IItemLoaderInfoArgType.md#notfound)

### Methods

- [downloadState](client_components_item_ItemLoader.IItemLoaderInfoArgType.md#downloadstate)
- [loadStateFromFile](client_components_item_ItemLoader.IItemLoaderInfoArgType.md#loadstatefromfile)
- [reload](client_components_item_ItemLoader.IItemLoaderInfoArgType.md#reload)

## Properties

### blocked

• **blocked**: `boolean`

Whether the item is blocked

#### Defined in

[client/components/item/ItemLoader.tsx:37](https://github.com/onzag/itemize/blob/f2f29986/client/components/item/ItemLoader.tsx#L37)

___

### error

• **error**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

An error that occured during loading, not found does not count for this
as null is a valid value, this is more for forbidden, no network, and whatnot

#### Defined in

[client/components/item/ItemLoader.tsx:46](https://github.com/onzag/itemize/blob/f2f29986/client/components/item/ItemLoader.tsx#L46)

___

### hasBlockedAccess

• **hasBlockedAccess**: `boolean`

Whether you have moderation access to the item despite it being blocked

#### Defined in

[client/components/item/ItemLoader.tsx:41](https://github.com/onzag/itemize/blob/f2f29986/client/components/item/ItemLoader.tsx#L41)

___

### loaded

• **loaded**: `boolean`

Whether it is ready and loaded

#### Defined in

[client/components/item/ItemLoader.tsx:25](https://github.com/onzag/itemize/blob/f2f29986/client/components/item/ItemLoader.tsx#L25)

___

### loading

• **loading**: `boolean`

Whether is currently loading, from memory, cache, etc...

#### Defined in

[client/components/item/ItemLoader.tsx:29](https://github.com/onzag/itemize/blob/f2f29986/client/components/item/ItemLoader.tsx#L29)

___

### notFound

• **notFound**: `boolean`

Whether it is not found, as in the item definition did not exist

#### Defined in

[client/components/item/ItemLoader.tsx:33](https://github.com/onzag/itemize/blob/f2f29986/client/components/item/ItemLoader.tsx#L33)

## Methods

### downloadState

▸ **downloadState**(`specificProperties?`, `specificIncludes?`): `Promise`<`Blob`\>

Allows to download the current state of the item, including
its files and download them

#### Parameters

| Name | Type |
| :------ | :------ |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

#### Returns

`Promise`<`Blob`\>

#### Defined in

[client/components/item/ItemLoader.tsx:55](https://github.com/onzag/itemize/blob/f2f29986/client/components/item/ItemLoader.tsx#L55)

___

### loadStateFromFile

▸ **loadStateFromFile**(`f`, `specificProperties?`, `specificIncludes?`): `Promise`<`void`\>

Allows to load the state from a file that has previously
been downloaded and packaged

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | `File` \| `Blob` |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

#### Returns

`Promise`<`void`\>

#### Defined in

[client/components/item/ItemLoader.tsx:60](https://github.com/onzag/itemize/blob/f2f29986/client/components/item/ItemLoader.tsx#L60)

___

### reload

▸ **reload**(): `Promise`<[`IBasicActionResponse`](client_providers_item.IBasicActionResponse.md)\>

A function that allows to try to reload the element

#### Returns

`Promise`<[`IBasicActionResponse`](client_providers_item.IBasicActionResponse.md)\>

#### Defined in

[client/components/item/ItemLoader.tsx:50](https://github.com/onzag/itemize/blob/f2f29986/client/components/item/ItemLoader.tsx#L50)
