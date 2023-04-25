[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/util/BaseSyncer](../modules/client_components_util_BaseSyncer.md) / IBaseSyncerHandle

# Interface: IBaseSyncerHandle

[client/components/util/BaseSyncer](../modules/client_components_util_BaseSyncer.md).IBaseSyncerHandle

## Table of contents

### Methods

- [onDismount](client_components_util_BaseSyncer.IBaseSyncerHandle.md#ondismount)
- [onFailedSync](client_components_util_BaseSyncer.IBaseSyncerHandle.md#onfailedsync)
- [setSync](client_components_util_BaseSyncer.IBaseSyncerHandle.md#setsync)

## Methods

### onDismount

▸ **onDismount**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`void`

#### Defined in

[client/components/util/BaseSyncer.tsx:9](https://github.com/onzag/itemize/blob/f2db74a5/client/components/util/BaseSyncer.tsx#L9)

___

### onFailedSync

▸ **onFailedSync**(`err?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype) |

#### Returns

`void`

#### Defined in

[client/components/util/BaseSyncer.tsx:10](https://github.com/onzag/itemize/blob/f2db74a5/client/components/util/BaseSyncer.tsx#L10)

___

### setSync

▸ **setSync**(`id`, `state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `state` | `boolean` |

#### Returns

`void`

#### Defined in

[client/components/util/BaseSyncer.tsx:11](https://github.com/onzag/itemize/blob/f2db74a5/client/components/util/BaseSyncer.tsx#L11)
