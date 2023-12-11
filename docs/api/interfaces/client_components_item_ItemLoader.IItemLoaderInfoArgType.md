[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/item/ItemLoader](../modules/client_components_item_ItemLoader.md) / IItemLoaderInfoArgType

# Interface: IItemLoaderInfoArgType

[client/components/item/ItemLoader](../modules/client_components_item_ItemLoader.md).IItemLoaderInfoArgType

The arg that is passed to the children, which allows
for the conditional rendering

## Table of contents

### Properties

- [blocked](client_components_item_ItemLoader.IItemLoaderInfoArgType.md#blocked)
- [downloadState](client_components_item_ItemLoader.IItemLoaderInfoArgType.md#downloadstate)
- [downloadStateAt](client_components_item_ItemLoader.IItemLoaderInfoArgType.md#downloadstateat)
- [error](client_components_item_ItemLoader.IItemLoaderInfoArgType.md#error)
- [hasBlockedAccess](client_components_item_ItemLoader.IItemLoaderInfoArgType.md#hasblockedaccess)
- [holdsRemoteState](client_components_item_ItemLoader.IItemLoaderInfoArgType.md#holdsremotestate)
- [loadStateFromFile](client_components_item_ItemLoader.IItemLoaderInfoArgType.md#loadstatefromfile)
- [loadStateFromFileAt](client_components_item_ItemLoader.IItemLoaderInfoArgType.md#loadstatefromfileat)
- [loaded](client_components_item_ItemLoader.IItemLoaderInfoArgType.md#loaded)
- [loading](client_components_item_ItemLoader.IItemLoaderInfoArgType.md#loading)
- [notFound](client_components_item_ItemLoader.IItemLoaderInfoArgType.md#notfound)
- [reload](client_components_item_ItemLoader.IItemLoaderInfoArgType.md#reload)

## Properties

### blocked

• **blocked**: `boolean`

Whether the item is blocked

#### Defined in

[client/components/item/ItemLoader.tsx:50](https://github.com/onzag/itemize/blob/59702dd5/client/components/item/ItemLoader.tsx#L50)

___

### downloadState

• **downloadState**: (`specificProperties?`: `string`[], `specificIncludes?`: \{ `[id: string]`: `string`[];  }) => `Promise`\<`Blob`\>

#### Type declaration

▸ (`specificProperties?`, `specificIncludes?`): `Promise`\<`Blob`\>

Allows to download the current state of the item, including
its files and download them

##### Parameters

| Name | Type |
| :------ | :------ |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

##### Returns

`Promise`\<`Blob`\>

#### Defined in

[client/components/item/ItemLoader.tsx:68](https://github.com/onzag/itemize/blob/59702dd5/client/components/item/ItemLoader.tsx#L68)

___

### downloadStateAt

• **downloadStateAt**: (`id`: `string`, `version?`: `string`, `specificProperties?`: `string`[], `specificIncludes?`: \{ `[id: string]`: `string`[];  }) => `Promise`\<`Blob`\>

#### Type declaration

▸ (`id`, `version?`, `specificProperties?`, `specificIncludes?`): `Promise`\<`Blob`\>

Allows to download the current state of the item, including
its files and download them

##### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `version?` | `string` |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

##### Returns

`Promise`\<`Blob`\>

#### Defined in

[client/components/item/ItemLoader.tsx:73](https://github.com/onzag/itemize/blob/59702dd5/client/components/item/ItemLoader.tsx#L73)

___

### error

• **error**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

An error that occured during loading, not found does not count for this
as null is a valid value, this is more for forbidden, no network, and whatnot

#### Defined in

[client/components/item/ItemLoader.tsx:59](https://github.com/onzag/itemize/blob/59702dd5/client/components/item/ItemLoader.tsx#L59)

___

### hasBlockedAccess

• **hasBlockedAccess**: `boolean`

Whether you have moderation access to the item despite it being blocked

#### Defined in

[client/components/item/ItemLoader.tsx:54](https://github.com/onzag/itemize/blob/59702dd5/client/components/item/ItemLoader.tsx#L54)

___

### holdsRemoteState

• **holdsRemoteState**: `boolean`

Whether it holds a remote state, whether up to date or not
this is the preferrable choice over "loading" when preparing
the UI if the value is required, as loading will be true even
as it is synchronizing whereas holdsRemoteState will only be false
if there is no useful information to populate with (even if it's outdated)

#### Defined in

[client/components/item/ItemLoader.tsx:38](https://github.com/onzag/itemize/blob/59702dd5/client/components/item/ItemLoader.tsx#L38)

___

### loadStateFromFile

• **loadStateFromFile**: (`f`: `File` \| `Blob`, `specificProperties?`: `string`[], `specificIncludes?`: \{ `[id: string]`: `string`[];  }) => `Promise`\<`void`\>

#### Type declaration

▸ (`f`, `specificProperties?`, `specificIncludes?`): `Promise`\<`void`\>

Allows to load the state from a file that has previously
been downloaded and packaged

##### Parameters

| Name | Type |
| :------ | :------ |
| `f` | `File` \| `Blob` |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

##### Returns

`Promise`\<`void`\>

#### Defined in

[client/components/item/ItemLoader.tsx:78](https://github.com/onzag/itemize/blob/59702dd5/client/components/item/ItemLoader.tsx#L78)

___

### loadStateFromFileAt

• **loadStateFromFileAt**: (`f`: `File` \| `Blob`, `id`: `string`, `version`: `string`, `specificProperties?`: `string`[], `specificIncludes?`: \{ `[id: string]`: `string`[];  }) => `Promise`\<`void`\>

#### Type declaration

▸ (`f`, `id`, `version`, `specificProperties?`, `specificIncludes?`): `Promise`\<`void`\>

Allows to load the state from a file that has previously
been downloaded and packaged
This function loads it at a specific id and version slot

##### Parameters

| Name | Type |
| :------ | :------ |
| `f` | `File` \| `Blob` |
| `id` | `string` |
| `version` | `string` |
| `specificProperties?` | `string`[] |
| `specificIncludes?` | `Object` |

##### Returns

`Promise`\<`void`\>

#### Defined in

[client/components/item/ItemLoader.tsx:84](https://github.com/onzag/itemize/blob/59702dd5/client/components/item/ItemLoader.tsx#L84)

___

### loaded

• **loaded**: `boolean`

Whether it is ready and loaded

Note that using this value for UI purposes may backfire
as loaded will turn into false whenever it attempts to load again (eg to synchronize)
it's better to check `holdsRemoteState` for that as that will be only false
if there is no useful data to display

#### Defined in

[client/components/item/ItemLoader.tsx:30](https://github.com/onzag/itemize/blob/59702dd5/client/components/item/ItemLoader.tsx#L30)

___

### loading

• **loading**: `boolean`

Whether is currently loading, from memory, cache, etc...

#### Defined in

[client/components/item/ItemLoader.tsx:42](https://github.com/onzag/itemize/blob/59702dd5/client/components/item/ItemLoader.tsx#L42)

___

### notFound

• **notFound**: `boolean`

Whether it is not found, as in the item definition did not exist

#### Defined in

[client/components/item/ItemLoader.tsx:46](https://github.com/onzag/itemize/blob/59702dd5/client/components/item/ItemLoader.tsx#L46)

___

### reload

• **reload**: () => `Promise`\<[`IBasicActionResponse`](client_providers_item.IBasicActionResponse.md)\>

#### Type declaration

▸ (): `Promise`\<[`IBasicActionResponse`](client_providers_item.IBasicActionResponse.md)\>

A function that allows to try to reload the element

##### Returns

`Promise`\<[`IBasicActionResponse`](client_providers_item.IBasicActionResponse.md)\>

#### Defined in

[client/components/item/ItemLoader.tsx:63](https://github.com/onzag/itemize/blob/59702dd5/client/components/item/ItemLoader.tsx#L63)
