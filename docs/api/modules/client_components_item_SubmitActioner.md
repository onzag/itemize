[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/item/SubmitActioner

# Module: client/components/item/SubmitActioner

One of the most useful classes allows for submitting data to the server side
as well as do cleanup processes after the fact, most submit buttons will be built
upon this class, as it's meant to apply for a button, however it also allows
for displaying errors and trigger actions after success or failure

## Table of contents

### Interfaces

- [ISubmitActionerInfoArgType](../interfaces/client_components_item_SubmitActioner.ISubmitActionerInfoArgType.md)

### Functions

- [default](client_components_item_SubmitActioner.md#default)
- [useSubmitActioner](client_components_item_SubmitActioner.md#usesubmitactioner)

## Functions

### default

▸ **default**(`props`): `Element`

The submit actioner class allows for usage for triggering submits (add or update)
as well as to retrieve the status of such actions, use to create submit buttons as
well as to create error messages if such actions failed, the actioner is not stateful
and it belongs to the context, meaning all actioners within the same context
share the same state

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `ISubmitActionerProps` | the props |

#### Returns

`Element`

a react component

#### Defined in

[client/components/item/SubmitActioner.tsx:140](https://github.com/onzag/itemize/blob/f2db74a5/client/components/item/SubmitActioner.tsx#L140)

___

### useSubmitActioner

▸ **useSubmitActioner**(): [`ISubmitActionerInfoArgType`](../interfaces/client_components_item_SubmitActioner.ISubmitActionerInfoArgType.md)

Hook version for the submit actioner

#### Returns

[`ISubmitActionerInfoArgType`](../interfaces/client_components_item_SubmitActioner.ISubmitActionerInfoArgType.md)

the submit actioner information

#### Defined in

[client/components/item/SubmitActioner.tsx:154](https://github.com/onzag/itemize/blob/f2db74a5/client/components/item/SubmitActioner.tsx#L154)
