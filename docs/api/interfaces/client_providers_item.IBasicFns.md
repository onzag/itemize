[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/providers/item](../modules/client_providers_item.md) / IBasicFns

# Interface: IBasicFns

[client/providers/item](../modules/client_providers_item.md).IBasicFns

## Hierarchy

- **`IBasicFns`**

  ↳ [`IItemContextType`](client_providers_item.IItemContextType.md)

## Table of contents

### Properties

- [clean](client_providers_item.IBasicFns.md#clean)
- [delete](client_providers_item.IBasicFns.md#delete)
- [poke](client_providers_item.IBasicFns.md#poke)
- [reload](client_providers_item.IBasicFns.md#reload)
- [search](client_providers_item.IBasicFns.md#search)
- [submit](client_providers_item.IBasicFns.md#submit)
- [unpoke](client_providers_item.IBasicFns.md#unpoke)

## Properties

### clean

• **clean**: (`options`: [`IActionCleanOptions`](client_providers_item.IActionCleanOptions.md), `state`: ``"success"`` \| ``"fail"``, `avoidTriggeringUpdate?`: `boolean`) => `void`

#### Type declaration

▸ (`options`, `state`, `avoidTriggeringUpdate?`): `void`

cleans performs the cleanup of properties and policies

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionCleanOptions`](client_providers_item.IActionCleanOptions.md) |
| `state` | ``"success"`` \| ``"fail"`` |
| `avoidTriggeringUpdate?` | `boolean` |

##### Returns

`void`

#### Defined in

[client/providers/item.tsx:1111](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1111)

___

### delete

• **delete**: () => `Promise`\<[`IBasicActionResponse`](client_providers_item.IBasicActionResponse.md)\>

#### Type declaration

▸ (): `Promise`\<[`IBasicActionResponse`](client_providers_item.IBasicActionResponse.md)\>

Simply deletes

##### Returns

`Promise`\<[`IBasicActionResponse`](client_providers_item.IBasicActionResponse.md)\>

a response with the status

#### Defined in

[client/providers/item.tsx:1103](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1103)

___

### poke

• **poke**: (`elements`: [`IPokeElementsType`](client_providers_item.IPokeElementsType.md)) => `void`

#### Type declaration

▸ (`elements`): `void`

Poke elements

##### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | [`IPokeElementsType`](client_providers_item.IPokeElementsType.md) |

##### Returns

`void`

#### Defined in

[client/providers/item.tsx:1078](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1078)

___

### reload

• **reload**: (`denyCache?`: `boolean`) => `Promise`\<[`IActionResponseWithValue`](client_providers_item.IActionResponseWithValue.md)\>

#### Type declaration

▸ (`denyCache?`): `Promise`\<[`IActionResponseWithValue`](client_providers_item.IActionResponseWithValue.md)\>

makes it so that it reloads the value, the loadValue function
usually is executed on componentDidMount, pass deny cache in order to
do a hard refresh and bypass the cache

##### Parameters

| Name | Type |
| :------ | :------ |
| `denyCache?` | `boolean` |

##### Returns

`Promise`\<[`IActionResponseWithValue`](client_providers_item.IActionResponseWithValue.md)\>

#### Defined in

[client/providers/item.tsx:1091](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1091)

___

### search

• **search**: (`options`: [`IActionSearchOptions`](client_providers_item.IActionSearchOptions.md)) => `Promise`\<[`IActionResponseWithSearchResults`](client_providers_item.IActionResponseWithSearchResults.md)\>

#### Type declaration

▸ (`options`): `Promise`\<[`IActionResponseWithSearchResults`](client_providers_item.IActionResponseWithSearchResults.md)\>

performs a search, note that you should be in the searchMode however
since all items are the same it's totally possible to launch a search
in which case you'll just get a searchError you should be in search
mode because there are no endpoints otherwise

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionSearchOptions`](client_providers_item.IActionSearchOptions.md) |

##### Returns

`Promise`\<[`IActionResponseWithSearchResults`](client_providers_item.IActionResponseWithSearchResults.md)\>

#### Defined in

[client/providers/item.tsx:1120](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1120)

___

### submit

• **submit**: (`options`: [`IActionSubmitOptions`](client_providers_item.IActionSubmitOptions.md)) => `Promise`\<[`IActionSubmitResponse`](client_providers_item.IActionSubmitResponse.md)\>

#### Type declaration

▸ (`options`): `Promise`\<[`IActionSubmitResponse`](client_providers_item.IActionSubmitResponse.md)\>

submits the current information, when there's no id, this triggers an
add action, with an id however this trigger edition

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionSubmitOptions`](client_providers_item.IActionSubmitOptions.md) |

##### Returns

`Promise`\<[`IActionSubmitResponse`](client_providers_item.IActionSubmitResponse.md)\>

a response with the status

#### Defined in

[client/providers/item.tsx:1098](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1098)

___

### unpoke

• **unpoke**: () => `void`

#### Type declaration

▸ (): `void`

unpokes all elements

##### Returns

`void`

#### Defined in

[client/providers/item.tsx:1083](https://github.com/onzag/itemize/blob/59702dd5/client/providers/item.tsx#L1083)
