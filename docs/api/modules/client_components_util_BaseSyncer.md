[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/util/BaseSyncer

# Module: client/components/util/BaseSyncer

## Table of contents

### Interfaces

- [IBaseSyncerHandle](../interfaces/client_components_util_BaseSyncer.IBaseSyncerHandle.md)
- [IBaseSyncerHandleMechanism](../interfaces/client_components_util_BaseSyncer.IBaseSyncerHandleMechanism.md)

### Functions

- [default](client_components_util_BaseSyncer.md#default)
- [useHandleMechanism](client_components_util_BaseSyncer.md#usehandlemechanism)

## Functions

### default

▸ **default**(`props`): `any`

A base syncer that loads nothing but it can be used to group other
syncers

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IBaseSyncerProps` |

#### Returns

`any`

#### Defined in

[client/components/util/BaseSyncer.tsx:365](https://github.com/onzag/itemize/blob/a24376ed/client/components/util/BaseSyncer.tsx#L365)

___

### useHandleMechanism

▸ **useHandleMechanism**(`id`, `handle`, `allowFallback`, `synced`, `failed`, `err`): [`IBaseSyncerHandleMechanism`](../interfaces/client_components_util_BaseSyncer.IBaseSyncerHandleMechanism.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `handle` | [`IBaseSyncerHandle`](../interfaces/client_components_util_BaseSyncer.IBaseSyncerHandle.md) |
| `allowFallback` | `boolean` |
| `synced` | `boolean` |
| `failed` | `boolean` |
| `err` | [`EndpointErrorType`](base_errors.md#endpointerrortype) |

#### Returns

[`IBaseSyncerHandleMechanism`](../interfaces/client_components_util_BaseSyncer.IBaseSyncerHandleMechanism.md)

#### Defined in

[client/components/util/BaseSyncer.tsx:82](https://github.com/onzag/itemize/blob/a24376ed/client/components/util/BaseSyncer.tsx#L82)
