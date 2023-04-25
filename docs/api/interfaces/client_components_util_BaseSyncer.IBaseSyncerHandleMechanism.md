[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/util/BaseSyncer](../modules/client_components_util_BaseSyncer.md) / IBaseSyncerHandleMechanism

# Interface: IBaseSyncerHandleMechanism

[client/components/util/BaseSyncer](../modules/client_components_util_BaseSyncer.md).IBaseSyncerHandleMechanism

## Table of contents

### Properties

- [failedSync](client_components_util_BaseSyncer.IBaseSyncerHandleMechanism.md#failedsync)
- [failedSyncErr](client_components_util_BaseSyncer.IBaseSyncerHandleMechanism.md#failedsyncerr)
- [handle](client_components_util_BaseSyncer.IBaseSyncerHandleMechanism.md#handle)
- [ready](client_components_util_BaseSyncer.IBaseSyncerHandleMechanism.md#ready)
- [selfSynced](client_components_util_BaseSyncer.IBaseSyncerHandleMechanism.md#selfsynced)
- [synced](client_components_util_BaseSyncer.IBaseSyncerHandleMechanism.md#synced)
- [syncedDelayed](client_components_util_BaseSyncer.IBaseSyncerHandleMechanism.md#synceddelayed)

## Properties

### failedSync

• **failedSync**: `boolean`

Whether it has failed to synchronize, whether itself or at any children level

#### Defined in

[client/components/util/BaseSyncer.tsx:49](https://github.com/onzag/itemize/blob/f2db74a5/client/components/util/BaseSyncer.tsx#L49)

___

### failedSyncErr

• `Optional` **failedSyncErr**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

The error of why it failed to sync, potentially there may be no error, for example
if no cache worker is present, it just can't sync

#### Defined in

[client/components/util/BaseSyncer.tsx:55](https://github.com/onzag/itemize/blob/f2db74a5/client/components/util/BaseSyncer.tsx#L55)

___

### handle

• **handle**: [`IBaseSyncerHandle`](client_components_util_BaseSyncer.IBaseSyncerHandle.md)

A handle that can be passed to other children
syncers

#### Defined in

[client/components/util/BaseSyncer.tsx:19](https://github.com/onzag/itemize/blob/f2db74a5/client/components/util/BaseSyncer.tsx#L19)

___

### ready

• **ready**: `boolean`

Whether it is ready to begin syncing

#### Defined in

[client/components/util/BaseSyncer.tsx:24](https://github.com/onzag/itemize/blob/f2db74a5/client/components/util/BaseSyncer.tsx#L24)

___

### selfSynced

• **selfSynced**: `boolean`

Whether it is synced up to this level and this level alone, for example in an ItemSyncer
this means that all the item data is loaded, in an search syncer that the search has been done

#### Defined in

[client/components/util/BaseSyncer.tsx:44](https://github.com/onzag/itemize/blob/f2db74a5/client/components/util/BaseSyncer.tsx#L44)

___

### synced

• **synced**: `boolean`

whether it (self) and the children are already
synced, note that this variable may change values quickly and dramatically for example
say a syncer managed to sync but with the data retrieved new elements are added to add
to the syncing queue, in this sense, it will change drastically and it's not recommended
to use this value, use syncedDelayed instead which will try to make up for these

#### Defined in

[client/components/util/BaseSyncer.tsx:33](https://github.com/onzag/itemize/blob/f2db74a5/client/components/util/BaseSyncer.tsx#L33)

___

### syncedDelayed

• **syncedDelayed**: `boolean`

whether it is currently synced except it prevents value flickering by adding a delay

#### Defined in

[client/components/util/BaseSyncer.tsx:38](https://github.com/onzag/itemize/blob/f2db74a5/client/components/util/BaseSyncer.tsx#L38)
