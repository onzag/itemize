[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/offline/OfflineCacheStateLoader

# Module: client/components/offline/OfflineCacheStateLoader

## Table of contents

### Interfaces

- [ICacheRecord](../interfaces/client_components_offline_OfflineCacheStateLoader.ICacheRecord.md)
- [IOfflineCacheStateLoaderArg](../interfaces/client_components_offline_OfflineCacheStateLoader.IOfflineCacheStateLoaderArg.md)
- [IOfflineCacheStateLoaderOptions](../interfaces/client_components_offline_OfflineCacheStateLoader.IOfflineCacheStateLoaderOptions.md)
- [IOfflineCacheStateLoaderProps](../interfaces/client_components_offline_OfflineCacheStateLoader.IOfflineCacheStateLoaderProps.md)

### Functions

- [default](client_components_offline_OfflineCacheStateLoader.md#default)
- [useOfflineCacheStateLoader](client_components_offline_OfflineCacheStateLoader.md#useofflinecachestateloader)

## Functions

### default

▸ **default**(`props`): `ReactNode`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IOfflineCacheStateLoaderProps`](../interfaces/client_components_offline_OfflineCacheStateLoader.IOfflineCacheStateLoaderProps.md) |

#### Returns

`ReactNode`

#### Defined in

[client/components/offline/OfflineCacheStateLoader.tsx:86](https://github.com/onzag/itemize/blob/73e0c39e/client/components/offline/OfflineCacheStateLoader.tsx#L86)

___

### useOfflineCacheStateLoader

▸ **useOfflineCacheStateLoader**(`options`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IOfflineCacheStateLoaderOptions`](../interfaces/client_components_offline_OfflineCacheStateLoader.IOfflineCacheStateLoaderOptions.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `loading` | `boolean` |
| `record` | [`ICacheRecord`](../interfaces/client_components_offline_OfflineCacheStateLoader.ICacheRecord.md) |
| `unsupported` | `boolean` |

#### Defined in

[client/components/offline/OfflineCacheStateLoader.tsx:26](https://github.com/onzag/itemize/blob/73e0c39e/client/components/offline/OfflineCacheStateLoader.tsx#L26)
