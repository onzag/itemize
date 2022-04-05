[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/item/SubmitActioner](../modules/client_components_item_SubmitActioner.md) / ISubmitActionerInfoArgType

# Interface: ISubmitActionerInfoArgType

[client/components/item/SubmitActioner](../modules/client_components_item_SubmitActioner.md).ISubmitActionerInfoArgType

The actioner arg contains the properties that are useful
for doing the conditional logic for submitting

## Table of contents

### Properties

- [submitError](client_components_item_SubmitActioner.ISubmitActionerInfoArgType.md#submiterror)
- [submitted](client_components_item_SubmitActioner.ISubmitActionerInfoArgType.md#submitted)
- [submitting](client_components_item_SubmitActioner.ISubmitActionerInfoArgType.md#submitting)

### Methods

- [clean](client_components_item_SubmitActioner.ISubmitActionerInfoArgType.md#clean)
- [dismissError](client_components_item_SubmitActioner.ISubmitActionerInfoArgType.md#dismisserror)
- [dismissSubmitted](client_components_item_SubmitActioner.ISubmitActionerInfoArgType.md#dismisssubmitted)
- [submit](client_components_item_SubmitActioner.ISubmitActionerInfoArgType.md#submit)

## Properties

### submitError

• **submitError**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

A submit error that happened after the last submit in this same
item definition slot

#### Defined in

[client/components/item/SubmitActioner.tsx:29](https://github.com/onzag/itemize/blob/f2f29986/client/components/item/SubmitActioner.tsx#L29)

___

### submitted

• **submitted**: `boolean`

Whether it submitted, sucesfully

#### Defined in

[client/components/item/SubmitActioner.tsx:38](https://github.com/onzag/itemize/blob/f2f29986/client/components/item/SubmitActioner.tsx#L38)

___

### submitting

• **submitting**: `boolean`

Whether it is currently submitting, useful for showing a spinner or something
as you cannot really submit while submitting

#### Defined in

[client/components/item/SubmitActioner.tsx:34](https://github.com/onzag/itemize/blob/f2f29986/client/components/item/SubmitActioner.tsx#L34)

## Methods

### clean

▸ **clean**(`options`, `state`, `avoidTriggeringUpdate?`): `void`

clean function, also a mirror from the item definition one

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionCleanOptions`](client_providers_item.IActionCleanOptions.md) |
| `state` | ``"success"`` \| ``"fail"`` |
| `avoidTriggeringUpdate?` | `boolean` |

#### Returns

`void`

#### Defined in

[client/components/item/SubmitActioner.tsx:55](https://github.com/onzag/itemize/blob/f2f29986/client/components/item/SubmitActioner.tsx#L55)

___

### dismissError

▸ **dismissError**(): `void`

Dismiss the error state, and make it clean

#### Returns

`void`

#### Defined in

[client/components/item/SubmitActioner.tsx:42](https://github.com/onzag/itemize/blob/f2f29986/client/components/item/SubmitActioner.tsx#L42)

___

### dismissSubmitted

▸ **dismissSubmitted**(): `void`

dismiss the submitted state and make it clean

#### Returns

`void`

#### Defined in

[client/components/item/SubmitActioner.tsx:46](https://github.com/onzag/itemize/blob/f2f29986/client/components/item/SubmitActioner.tsx#L46)

___

### submit

▸ **submit**(`options`): `Promise`<[`IActionResponseWithId`](client_providers_item.IActionResponseWithId.md)\>

actual performs the submit, this function is a mirror from the
item definition provider one

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionSubmitOptions`](client_providers_item.IActionSubmitOptions.md) |

#### Returns

`Promise`<[`IActionResponseWithId`](client_providers_item.IActionResponseWithId.md)\>

#### Defined in

[client/components/item/SubmitActioner.tsx:51](https://github.com/onzag/itemize/blob/f2f29986/client/components/item/SubmitActioner.tsx#L51)
