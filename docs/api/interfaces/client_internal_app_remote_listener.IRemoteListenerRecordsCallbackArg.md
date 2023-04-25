[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/app/remote-listener](../modules/client_internal_app_remote_listener.md) / IRemoteListenerRecordsCallbackArg

# Interface: IRemoteListenerRecordsCallbackArg

[client/internal/app/remote-listener](../modules/client_internal_app_remote_listener.md).IRemoteListenerRecordsCallbackArg

This is what the remote listener expects of an argument taken
by the callback

## Table of contents

### Properties

- [createdRecords](client_internal_app_remote_listener.IRemoteListenerRecordsCallbackArg.md#createdrecords)
- [deletedRecords](client_internal_app_remote_listener.IRemoteListenerRecordsCallbackArg.md#deletedrecords)
- [lostRecords](client_internal_app_remote_listener.IRemoteListenerRecordsCallbackArg.md#lostrecords)
- [modifiedRecords](client_internal_app_remote_listener.IRemoteListenerRecordsCallbackArg.md#modifiedrecords)
- [newRecords](client_internal_app_remote_listener.IRemoteListenerRecordsCallbackArg.md#newrecords)

## Properties

### createdRecords

• **createdRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

#### Defined in

[client/internal/app/remote-listener.ts:75](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L75)

___

### deletedRecords

• **deletedRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

#### Defined in

[client/internal/app/remote-listener.ts:76](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L76)

___

### lostRecords

• **lostRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

#### Defined in

[client/internal/app/remote-listener.ts:74](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L74)

___

### modifiedRecords

• **modifiedRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

#### Defined in

[client/internal/app/remote-listener.ts:73](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L73)

___

### newRecords

• **newRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

#### Defined in

[client/internal/app/remote-listener.ts:72](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/app/remote-listener.ts#L72)
