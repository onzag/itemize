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

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionCleanOptions`](client_providers_item.IActionCleanOptions.md) |
| `state` | ``"success"`` \| ``"fail"`` |
| `avoidTriggeringUpdate?` | `boolean` |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:450](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L450)

___

### delete

▸ **delete**(): `Promise`<[`IBasicActionResponse`](client_providers_item.IBasicActionResponse.md)\>

#### Returns

`Promise`<[`IBasicActionResponse`](client_providers_item.IBasicActionResponse.md)\>

#### Defined in

[client/providers/item.tsx:448](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L448)

___

### poke

▸ **poke**(`elements`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | [`IPokeElementsType`](client_providers_item.IPokeElementsType.md) |

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:438](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L438)

___

### reload

▸ **reload**(`denyCache?`): `Promise`<[`IActionResponseWithValue`](client_providers_item.IActionResponseWithValue.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `denyCache?` | `boolean` |

#### Returns

`Promise`<[`IActionResponseWithValue`](client_providers_item.IActionResponseWithValue.md)\>

#### Defined in

[client/providers/item.tsx:443](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L443)

___

### search

▸ **search**(`options`): `Promise`<[`IActionResponseWithSearchResults`](client_providers_item.IActionResponseWithSearchResults.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionSearchOptions`](client_providers_item.IActionSearchOptions.md) |

#### Returns

`Promise`<[`IActionResponseWithSearchResults`](client_providers_item.IActionResponseWithSearchResults.md)\>

#### Defined in

[client/providers/item.tsx:455](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L455)

___

### submit

▸ **submit**(`options`): `Promise`<[`IActionResponseWithId`](client_providers_item.IActionResponseWithId.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionSubmitOptions`](client_providers_item.IActionSubmitOptions.md) |

#### Returns

`Promise`<[`IActionResponseWithId`](client_providers_item.IActionResponseWithId.md)\>

#### Defined in

[client/providers/item.tsx:446](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L446)

___

### unpoke

▸ **unpoke**(): `void`

#### Returns

`void`

#### Defined in

[client/providers/item.tsx:439](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L439)
