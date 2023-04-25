[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/providers/item](../modules/client_providers_item.md) / IBasicFns

# Interface: IBasicFns

[client/providers/item](../modules/client_providers_item.md).IBasicFns

## Hierarchy

- **`IBasicFns`**

  ↳ [`IItemContextType`](client_providers_item.IItemContextType.md)

## Table of contents

### Methods

- [clean](client_providers_item.IBasicFns.md#clean)
- [delete](client_providers_item.IBasicFns.md#delete)
- [poke](client_providers_item.IBasicFns.md#poke)
- [reload](client_providers_item.IBasicFns.md#reload)
- [search](client_providers_item.IBasicFns.md#search)
- [submit](client_providers_item.IBasicFns.md#submit)
- [unpoke](client_providers_item.IBasicFns.md#unpoke)

## Methods

### clean

▸ **clean**(`options`, `state`, `avoidTriggeringUpdate?`): `void`

cleans performs the cleanup of properties and policies

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionCleanOptions`](client_providers_item.IActionCleanOptions.md) |
| `state` | ``"success"`` \| ``"fail"`` |
| `avoidTriggeringUpdate?` | `boolean` |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:925](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L925)

___

### delete

▸ **delete**(): `Promise`<[`IBasicActionResponse`](client_providers_item.IBasicActionResponse.md)\>

Simply deletes

#### Returns

`Promise`<[`IBasicActionResponse`](client_providers_item.IBasicActionResponse.md)\>

a response with the status

#### Defined in

[client/providers/item.tsx:917](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L917)

___

### poke

▸ **poke**(`elements`): `void`

Poke elements

#### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | [`IPokeElementsType`](client_providers_item.IPokeElementsType.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:892](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L892)

___

### reload

▸ **reload**(`denyCache?`): `Promise`<[`IActionResponseWithValue`](client_providers_item.IActionResponseWithValue.md)\>

makes it so that it reloads the value, the loadValue function
usually is executed on componentDidMount, pass deny cache in order to
do a hard refresh and bypass the cache

#### Parameters

| Name | Type |
| :------ | :------ |
| `denyCache?` | `boolean` |

#### Returns

`Promise`<[`IActionResponseWithValue`](client_providers_item.IActionResponseWithValue.md)\>

#### Defined in

[client/providers/item.tsx:905](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L905)

___

### search

▸ **search**(`options`): `Promise`<[`IActionResponseWithSearchResults`](client_providers_item.IActionResponseWithSearchResults.md)\>

performs a search, note that you should be in the searchMode however
since all items are the same it's totally possible to launch a search
in which case you'll just get a searchError you should be in search
mode because there are no endpoints otherwise

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionSearchOptions`](client_providers_item.IActionSearchOptions.md) |

#### Returns

`Promise`<[`IActionResponseWithSearchResults`](client_providers_item.IActionResponseWithSearchResults.md)\>

#### Defined in

[client/providers/item.tsx:934](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L934)

___

### submit

▸ **submit**(`options`): `Promise`<[`IActionSubmitResponse`](client_providers_item.IActionSubmitResponse.md)\>

submits the current information, when there's no id, this triggers an
add action, with an id however this trigger edition

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionSubmitOptions`](client_providers_item.IActionSubmitOptions.md) |

#### Returns

`Promise`<[`IActionSubmitResponse`](client_providers_item.IActionSubmitResponse.md)\>

a response with the status

#### Defined in

[client/providers/item.tsx:912](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L912)

___

### unpoke

▸ **unpoke**(): `void`

unpokes all elements

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:897](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L897)
