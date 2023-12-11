[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/offline/OfflineCacheStatesLoader

# Module: client/components/offline/OfflineCacheStatesLoader

## Table of contents

### Interfaces

- [ICacheRecord](../interfaces/client_components_offline_OfflineCacheStatesLoader.ICacheRecord.md)
- [IOfflineCacheStatesLoaderArg](../interfaces/client_components_offline_OfflineCacheStatesLoader.IOfflineCacheStatesLoaderArg.md)
- [IOfflineCacheStatesLoaderOptions](../interfaces/client_components_offline_OfflineCacheStatesLoader.IOfflineCacheStatesLoaderOptions.md)
- [IOfflineCacheStatesLoaderProps](../interfaces/client_components_offline_OfflineCacheStatesLoader.IOfflineCacheStatesLoaderProps.md)

### Functions

- [default](client_components_offline_OfflineCacheStatesLoader.md#default)
- [useOfflineCacheStatesLoader](client_components_offline_OfflineCacheStatesLoader.md#useofflinecachestatesloader)

## Functions

### default

▸ **default**(`props`): `ReactNode`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IOfflineCacheStatesLoaderProps`](../interfaces/client_components_offline_OfflineCacheStatesLoader.IOfflineCacheStatesLoaderProps.md) |

#### Returns

`ReactNode`

#### Defined in

[client/components/offline/OfflineCacheStatesLoader.tsx:114](https://github.com/onzag/itemize/blob/59702dd5/client/components/offline/OfflineCacheStatesLoader.tsx#L114)

___

### useOfflineCacheStatesLoader

▸ **useOfflineCacheStatesLoader**(`options`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IOfflineCacheStatesLoaderOptions`](../interfaces/client_components_offline_OfflineCacheStatesLoader.IOfflineCacheStatesLoaderOptions.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `loading` | `boolean` |
| `records` | [`ICacheRecord`](../interfaces/client_components_offline_OfflineCacheStatesLoader.ICacheRecord.md)[] |
| `unsupported` | `boolean` |

#### Defined in

[client/components/offline/OfflineCacheStatesLoader.tsx:25](https://github.com/onzag/itemize/blob/59702dd5/client/components/offline/OfflineCacheStatesLoader.tsx#L25)
