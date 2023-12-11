[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/util/BaseSyncer](../modules/client_components_util_BaseSyncer.md) / IBaseSyncerHandleMechanism

# Interface: IBaseSyncerHandleMechanism

[client/components/util/BaseSyncer](../modules/client_components_util_BaseSyncer.md).IBaseSyncerHandleMechanism

## Table of contents

### Properties

- [failedSync](client_components_util_BaseSyncer.IBaseSyncerHandleMechanism.md#failedsync)
- [failedSyncErr](client_components_util_BaseSyncer.IBaseSyncerHandleMechanism.md#failedsyncerr)
- [gracefulSelfHasSynced](client_components_util_BaseSyncer.IBaseSyncerHandleMechanism.md#gracefulselfhassynced)
- [gracefulSelfSynced](client_components_util_BaseSyncer.IBaseSyncerHandleMechanism.md#gracefulselfsynced)
- [gracefulTreeHasSynced](client_components_util_BaseSyncer.IBaseSyncerHandleMechanism.md#gracefultreehassynced)
- [gracefulTreeSynced](client_components_util_BaseSyncer.IBaseSyncerHandleMechanism.md#gracefultreesynced)
- [handle](client_components_util_BaseSyncer.IBaseSyncerHandleMechanism.md#handle)
- [ready](client_components_util_BaseSyncer.IBaseSyncerHandleMechanism.md#ready)
- [selfSynced](client_components_util_BaseSyncer.IBaseSyncerHandleMechanism.md#selfsynced)
- [treeSynced](client_components_util_BaseSyncer.IBaseSyncerHandleMechanism.md#treesynced)
- [unmountRef](client_components_util_BaseSyncer.IBaseSyncerHandleMechanism.md#unmountref)

## Properties

### failedSync

• **failedSync**: `boolean`

Whether it has failed to synchronize, whether itself or at any children level

#### Defined in

[client/components/util/BaseSyncer.tsx:65](https://github.com/onzag/itemize/blob/59702dd5/client/components/util/BaseSyncer.tsx#L65)

___

### failedSyncErr

• `Optional` **failedSyncErr**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

The error of why it failed to sync, potentially there may be no error, for example
if no cache worker is present, it just can't sync

#### Defined in

[client/components/util/BaseSyncer.tsx:71](https://github.com/onzag/itemize/blob/59702dd5/client/components/util/BaseSyncer.tsx#L71)

___

### gracefulSelfHasSynced

• **gracefulSelfHasSynced**: `boolean`

Similarly to gracefulSelfSynced but once it syncs for the first time it never goes
to an unsynced state, basically specifies whether it has synced at least once

#### Defined in

[client/components/util/BaseSyncer.tsx:60](https://github.com/onzag/itemize/blob/59702dd5/client/components/util/BaseSyncer.tsx#L60)

___

### gracefulSelfSynced

• **gracefulSelfSynced**: `boolean`

Whether this layer and this layer alone is currently synced and prevents value flickering by adding
a delay

#### Defined in

[client/components/util/BaseSyncer.tsx:54](https://github.com/onzag/itemize/blob/59702dd5/client/components/util/BaseSyncer.tsx#L54)

___

### gracefulTreeHasSynced

• **gracefulTreeHasSynced**: `boolean`

Similarly to gracefulTreeSynced but once it syncs for the first time it never goes
to an unsynced state, basically specifies whether it has synced at least once

#### Defined in

[client/components/util/BaseSyncer.tsx:42](https://github.com/onzag/itemize/blob/59702dd5/client/components/util/BaseSyncer.tsx#L42)

___

### gracefulTreeSynced

• **gracefulTreeSynced**: `boolean`

whether it is currently synced except it prevents value flickering by adding a delay
the value always starts in a false state

#### Defined in

[client/components/util/BaseSyncer.tsx:36](https://github.com/onzag/itemize/blob/59702dd5/client/components/util/BaseSyncer.tsx#L36)

___

### handle

• **handle**: [`IBaseSyncerHandle`](client_components_util_BaseSyncer.IBaseSyncerHandle.md)

A handle that can be passed to other children
syncers

#### Defined in

[client/components/util/BaseSyncer.tsx:16](https://github.com/onzag/itemize/blob/59702dd5/client/components/util/BaseSyncer.tsx#L16)

___

### ready

• **ready**: `boolean`

Whether it is ready to begin syncing

#### Defined in

[client/components/util/BaseSyncer.tsx:21](https://github.com/onzag/itemize/blob/59702dd5/client/components/util/BaseSyncer.tsx#L21)

___

### selfSynced

• **selfSynced**: `boolean`

Whether it is synced up to this level and this level alone, for example in an ItemSyncer
this means that all the item data is loaded, in an search syncer that the search has been done

#### Defined in

[client/components/util/BaseSyncer.tsx:48](https://github.com/onzag/itemize/blob/59702dd5/client/components/util/BaseSyncer.tsx#L48)

___

### treeSynced

• **treeSynced**: `boolean`

whether it (self) and the children are already
synced, note that this variable may change values quickly and dramatically for example
say a syncer managed to sync but with the data retrieved new elements are added to add
to the syncing queue, in this sense, it will change drastically and it's not recommended
to use this value, use gracefulTreeSynced instead which will try to make up for these

#### Defined in

[client/components/util/BaseSyncer.tsx:30](https://github.com/onzag/itemize/blob/59702dd5/client/components/util/BaseSyncer.tsx#L30)

___

### unmountRef

• **unmountRef**: `RefObject`\<`boolean`\>

A reference to being unmounted

#### Defined in

[client/components/util/BaseSyncer.tsx:75](https://github.com/onzag/itemize/blob/59702dd5/client/components/util/BaseSyncer.tsx#L75)
