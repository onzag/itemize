[](../README.md) / [Exports](../modules.md) / [client/components/item/DeleteActioner](../modules/client_components_item_deleteactioner.md) / IDeleteActionerInfoArgType

# Interface: IDeleteActionerInfoArgType

[client/components/item/DeleteActioner](../modules/client_components_item_deleteactioner.md).IDeleteActionerInfoArgType

The actioner arg contains the properties that are useful
for doing the conditional logic for deleting

## Table of contents

### Properties

- [clean](client_components_item_deleteactioner.ideleteactionerinfoargtype.md#clean)
- [delete](client_components_item_deleteactioner.ideleteactionerinfoargtype.md#delete)
- [deleteError](client_components_item_deleteactioner.ideleteactionerinfoargtype.md#deleteerror)
- [deleted](client_components_item_deleteactioner.ideleteactionerinfoargtype.md#deleted)
- [deleting](client_components_item_deleteactioner.ideleteactionerinfoargtype.md#deleting)
- [dismissDeleted](client_components_item_deleteactioner.ideleteactionerinfoargtype.md#dismissdeleted)
- [dismissError](client_components_item_deleteactioner.ideleteactionerinfoargtype.md#dismisserror)

## Properties

### clean

• **clean**: (`options`: [*IActionCleanOptions*](client_providers_item.iactioncleanoptions.md), `state`: *success* \| *fail*, `avoidTriggeringUpdate?`: *boolean*) => *void*

clean function, also a mirror from the item definition one

#### Type declaration:

▸ (`options`: [*IActionCleanOptions*](client_providers_item.iactioncleanoptions.md), `state`: *success* \| *fail*, `avoidTriggeringUpdate?`: *boolean*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*IActionCleanOptions*](client_providers_item.iactioncleanoptions.md) |
`state` | *success* \| *fail* |
`avoidTriggeringUpdate?` | *boolean* |

**Returns:** *void*

Defined in: [client/components/item/DeleteActioner.tsx:55](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/DeleteActioner.tsx#L55)

Defined in: [client/components/item/DeleteActioner.tsx:55](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/DeleteActioner.tsx#L55)

___

### delete

• **delete**: (`options`: [*IActionDeleteOptions*](client_providers_item.iactiondeleteoptions.md)) => *Promise*<[*IBasicActionResponse*](client_providers_item.ibasicactionresponse.md)\>

actual performs the delete, this function is a mirror from the
item definition provider one

#### Type declaration:

▸ (`options`: [*IActionDeleteOptions*](client_providers_item.iactiondeleteoptions.md)): *Promise*<[*IBasicActionResponse*](client_providers_item.ibasicactionresponse.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*IActionDeleteOptions*](client_providers_item.iactiondeleteoptions.md) |

**Returns:** *Promise*<[*IBasicActionResponse*](client_providers_item.ibasicactionresponse.md)\>

Defined in: [client/components/item/DeleteActioner.tsx:51](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/DeleteActioner.tsx#L51)

Defined in: [client/components/item/DeleteActioner.tsx:51](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/DeleteActioner.tsx#L51)

___

### deleteError

• **deleteError**: [*EndpointErrorType*](../modules/base_errors.md#endpointerrortype)

A delete error that happened after the last delete in this same
item definition slot

Defined in: [client/components/item/DeleteActioner.tsx:29](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/DeleteActioner.tsx#L29)

___

### deleted

• **deleted**: *boolean*

Whether it deleted, sucesfully

Defined in: [client/components/item/DeleteActioner.tsx:38](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/DeleteActioner.tsx#L38)

___

### deleting

• **deleting**: *boolean*

Whether it is currently deleting, useful for showing a spinner or something
as you cannot really delete while deleting

Defined in: [client/components/item/DeleteActioner.tsx:34](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/DeleteActioner.tsx#L34)

___

### dismissDeleted

• **dismissDeleted**: () => *void*

dismiss the deleted state and make it clean

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/components/item/DeleteActioner.tsx:46](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/DeleteActioner.tsx#L46)

Defined in: [client/components/item/DeleteActioner.tsx:46](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/DeleteActioner.tsx#L46)

___

### dismissError

• **dismissError**: () => *void*

Dismiss the error state, and make it clean

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/components/item/DeleteActioner.tsx:42](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/DeleteActioner.tsx#L42)

Defined in: [client/components/item/DeleteActioner.tsx:42](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/DeleteActioner.tsx#L42)
