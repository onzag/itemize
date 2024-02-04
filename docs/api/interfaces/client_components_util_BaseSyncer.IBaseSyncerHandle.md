[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/util/BaseSyncer](../modules/client_components_util_BaseSyncer.md) / IBaseSyncerHandle

# Interface: IBaseSyncerHandle

[client/components/util/BaseSyncer](../modules/client_components_util_BaseSyncer.md).IBaseSyncerHandle

## Table of contents

### Properties

- [onDismount](client_components_util_BaseSyncer.IBaseSyncerHandle.md#ondismount)
- [onFailedSync](client_components_util_BaseSyncer.IBaseSyncerHandle.md#onfailedsync)
- [setSync](client_components_util_BaseSyncer.IBaseSyncerHandle.md#setsync)

## Properties

### onDismount

• **onDismount**: (`id`: `string`) => `void`

#### Type declaration

▸ (`id`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

##### Returns

`void`

#### Defined in

[client/components/util/BaseSyncer.tsx:6](https://github.com/onzag/itemize/blob/73e0c39e/client/components/util/BaseSyncer.tsx#L6)

___

### onFailedSync

• **onFailedSync**: (`err?`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)) => `void`

#### Type declaration

▸ (`err?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype) |

##### Returns

`void`

#### Defined in

[client/components/util/BaseSyncer.tsx:7](https://github.com/onzag/itemize/blob/73e0c39e/client/components/util/BaseSyncer.tsx#L7)

___

### setSync

• **setSync**: (`id`: `string`, `state`: `boolean`) => `void`

#### Type declaration

▸ (`id`, `state`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `boolean` |

##### Returns

`void`

#### Defined in

[client/components/util/BaseSyncer.tsx:8](https://github.com/onzag/itemize/blob/73e0c39e/client/components/util/BaseSyncer.tsx#L8)
