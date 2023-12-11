[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/item/PokeActioner](../modules/client_components_item_PokeActioner.md) / IPokeActionerInfoArgType

# Interface: IPokeActionerInfoArgType

[client/components/item/PokeActioner](../modules/client_components_item_PokeActioner.md).IPokeActionerInfoArgType

The poke actioner information that is passed to the children

## Table of contents

### Properties

- [clean](client_components_item_PokeActioner.IPokeActionerInfoArgType.md#clean)
- [elementsToPoke](client_components_item_PokeActioner.IPokeActionerInfoArgType.md#elementstopoke)
- [hasInvalidToPokeInclude](client_components_item_PokeActioner.IPokeActionerInfoArgType.md#hasinvalidtopokeinclude)
- [hasInvalidToPokePolicy](client_components_item_PokeActioner.IPokeActionerInfoArgType.md#hasinvalidtopokepolicy)
- [hasInvalidToPokeProperty](client_components_item_PokeActioner.IPokeActionerInfoArgType.md#hasinvalidtopokeproperty)
- [poke](client_components_item_PokeActioner.IPokeActionerInfoArgType.md#poke)
- [pokeElementsToPoke](client_components_item_PokeActioner.IPokeActionerInfoArgType.md#pokeelementstopoke)
- [pokedElements](client_components_item_PokeActioner.IPokeActionerInfoArgType.md#pokedelements)
- [unpoke](client_components_item_PokeActioner.IPokeActionerInfoArgType.md#unpoke)

## Properties

### clean

• **clean**: (`options`: [`IActionCleanOptions`](client_providers_item.IActionCleanOptions.md), `state`: ``"success"`` \| ``"fail"``, `avoidTriggeringUpdate?`: `boolean`) => `void`

#### Type declaration

▸ (`options`, `state`, `avoidTriggeringUpdate?`): `void`

Runs the clean function from the item definition provider

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionCleanOptions`](client_providers_item.IActionCleanOptions.md) |
| `state` | ``"success"`` \| ``"fail"`` |
| `avoidTriggeringUpdate?` | `boolean` |

##### Returns

`void`

#### Defined in

[client/components/item/PokeActioner.tsx:63](https://github.com/onzag/itemize/blob/59702dd5/client/components/item/PokeActioner.tsx#L63)

___

### elementsToPoke

• **elementsToPoke**: [`IPokeElementsType`](client_providers_item.IPokeElementsType.md)

The elements to be poked, this is basically the same as
the property

#### Defined in

[client/components/item/PokeActioner.tsx:47](https://github.com/onzag/itemize/blob/59702dd5/client/components/item/PokeActioner.tsx#L47)

___

### hasInvalidToPokeInclude

• **hasInvalidToPokeInclude**: `boolean`

Whether one of the includes in the elements to poke
is currently invalid

#### Defined in

[client/components/item/PokeActioner.tsx:32](https://github.com/onzag/itemize/blob/59702dd5/client/components/item/PokeActioner.tsx#L32)

___

### hasInvalidToPokePolicy

• **hasInvalidToPokePolicy**: `boolean`

Whether one of the policies in the elements to poke
is currently invalid

#### Defined in

[client/components/item/PokeActioner.tsx:37](https://github.com/onzag/itemize/blob/59702dd5/client/components/item/PokeActioner.tsx#L37)

___

### hasInvalidToPokeProperty

• **hasInvalidToPokeProperty**: `boolean`

Whether one of the properties in the elements to poke
is currently invalid

#### Defined in

[client/components/item/PokeActioner.tsx:27](https://github.com/onzag/itemize/blob/59702dd5/client/components/item/PokeActioner.tsx#L27)

___

### poke

• **poke**: (`elements`: [`IPokeElementsType`](client_providers_item.IPokeElementsType.md)) => `void`

#### Type declaration

▸ (`elements`): `void`

Standard poke functionality

##### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | [`IPokeElementsType`](client_providers_item.IPokeElementsType.md) |

##### Returns

`void`

#### Defined in

[client/components/item/PokeActioner.tsx:59](https://github.com/onzag/itemize/blob/59702dd5/client/components/item/PokeActioner.tsx#L59)

___

### pokeElementsToPoke

• **pokeElementsToPoke**: () => `void`

#### Type declaration

▸ (): `void`

Pokes the elements to poke

##### Returns

`void`

#### Defined in

[client/components/item/PokeActioner.tsx:55](https://github.com/onzag/itemize/blob/59702dd5/client/components/item/PokeActioner.tsx#L55)

___

### pokedElements

• **pokedElements**: [`IPokeElementsType`](client_providers_item.IPokeElementsType.md)

All poked elements currently in the item
definition

#### Defined in

[client/components/item/PokeActioner.tsx:42](https://github.com/onzag/itemize/blob/59702dd5/client/components/item/PokeActioner.tsx#L42)

___

### unpoke

• **unpoke**: () => `void`

#### Type declaration

▸ (): `void`

Unpokeseverything

##### Returns

`void`

#### Defined in

[client/components/item/PokeActioner.tsx:51](https://github.com/onzag/itemize/blob/59702dd5/client/components/item/PokeActioner.tsx#L51)
