[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/item/DeleteActioner](../modules/client_components_item_DeleteActioner.md) / IDeleteActionerInfoArgType

# Interface: IDeleteActionerInfoArgType

[client/components/item/DeleteActioner](../modules/client_components_item_DeleteActioner.md).IDeleteActionerInfoArgType

The actioner arg contains the properties that are useful
for doing the conditional logic for deleting

## Table of contents

### Properties

- [deleteError](client_components_item_DeleteActioner.IDeleteActionerInfoArgType.md#deleteerror)
- [deleted](client_components_item_DeleteActioner.IDeleteActionerInfoArgType.md#deleted)
- [deleting](client_components_item_DeleteActioner.IDeleteActionerInfoArgType.md#deleting)

### Methods

- [clean](client_components_item_DeleteActioner.IDeleteActionerInfoArgType.md#clean)
- [delete](client_components_item_DeleteActioner.IDeleteActionerInfoArgType.md#delete)
- [dismissDeleted](client_components_item_DeleteActioner.IDeleteActionerInfoArgType.md#dismissdeleted)
- [dismissError](client_components_item_DeleteActioner.IDeleteActionerInfoArgType.md#dismisserror)

## Properties

### deleteError

• **deleteError**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

A delete error that happened after the last delete in this same
item definition slot

#### Defined in

[client/components/item/DeleteActioner.tsx:29](https://github.com/onzag/itemize/blob/f2f29986/client/components/item/DeleteActioner.tsx#L29)

___

### deleted

• **deleted**: `boolean`

Whether it deleted, sucesfully

#### Defined in

[client/components/item/DeleteActioner.tsx:38](https://github.com/onzag/itemize/blob/f2f29986/client/components/item/DeleteActioner.tsx#L38)

___

### deleting

• **deleting**: `boolean`

Whether it is currently deleting, useful for showing a spinner or something
as you cannot really delete while deleting

#### Defined in

[client/components/item/DeleteActioner.tsx:34](https://github.com/onzag/itemize/blob/f2f29986/client/components/item/DeleteActioner.tsx#L34)

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

[client/components/item/DeleteActioner.tsx:55](https://github.com/onzag/itemize/blob/f2f29986/client/components/item/DeleteActioner.tsx#L55)

___

### delete

▸ **delete**(`options`): `Promise`<[`IBasicActionResponse`](client_providers_item.IBasicActionResponse.md)\>

actual performs the delete, this function is a mirror from the
item definition provider one

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IActionDeleteOptions`](client_providers_item.IActionDeleteOptions.md) |

#### Returns

`Promise`<[`IBasicActionResponse`](client_providers_item.IBasicActionResponse.md)\>

#### Defined in

[client/components/item/DeleteActioner.tsx:51](https://github.com/onzag/itemize/blob/f2f29986/client/components/item/DeleteActioner.tsx#L51)

___

### dismissDeleted

▸ **dismissDeleted**(): `void`

dismiss the deleted state and make it clean

#### Returns

`void`

#### Defined in

[client/components/item/DeleteActioner.tsx:46](https://github.com/onzag/itemize/blob/f2f29986/client/components/item/DeleteActioner.tsx#L46)

___

### dismissError

▸ **dismissError**(): `void`

Dismiss the error state, and make it clean

#### Returns

`void`

#### Defined in

[client/components/item/DeleteActioner.tsx:42](https://github.com/onzag/itemize/blob/f2f29986/client/components/item/DeleteActioner.tsx#L42)
