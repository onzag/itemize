[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/testing](../modules/client_internal_testing.md) / IOwnedSearchRecordsAddedEventWithTime

# Interface: IOwnedSearchRecordsAddedEventWithTime

[client/internal/testing](../modules/client_internal_testing.md).IOwnedSearchRecordsAddedEventWithTime

## Hierarchy

- [`IOwnedSearchRecordsEvent`](base_remote_protocol.IOwnedSearchRecordsEvent.md)

  ↳ **`IOwnedSearchRecordsAddedEventWithTime`**

## Table of contents

### Properties

- [createdBy](client_internal_testing.IOwnedSearchRecordsAddedEventWithTime.md#createdby)
- [createdRecords](client_internal_testing.IOwnedSearchRecordsAddedEventWithTime.md#createdrecords)
- [deletedRecords](client_internal_testing.IOwnedSearchRecordsAddedEventWithTime.md#deletedrecords)
- [lostRecords](client_internal_testing.IOwnedSearchRecordsAddedEventWithTime.md#lostrecords)
- [modifiedRecords](client_internal_testing.IOwnedSearchRecordsAddedEventWithTime.md#modifiedrecords)
- [newLastModified](client_internal_testing.IOwnedSearchRecordsAddedEventWithTime.md#newlastmodified)
- [newRecords](client_internal_testing.IOwnedSearchRecordsAddedEventWithTime.md#newrecords)
- [qualifiedPathName](client_internal_testing.IOwnedSearchRecordsAddedEventWithTime.md#qualifiedpathname)
- [time](client_internal_testing.IOwnedSearchRecordsAddedEventWithTime.md#time)

## Properties

### createdBy

• **createdBy**: `string`

#### Inherited from

[IOwnedSearchRecordsEvent](base_remote_protocol.IOwnedSearchRecordsEvent.md).[createdBy](base_remote_protocol.IOwnedSearchRecordsEvent.md#createdby)

#### Defined in

[base/remote-protocol.ts:138](https://github.com/onzag/itemize/blob/f2db74a5/base/remote-protocol.ts#L138)

___

### createdRecords

• **createdRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

#### Inherited from

[IOwnedSearchRecordsEvent](base_remote_protocol.IOwnedSearchRecordsEvent.md).[createdRecords](base_remote_protocol.IOwnedSearchRecordsEvent.md#createdrecords)

#### Defined in

[base/remote-protocol.ts:112](https://github.com/onzag/itemize/blob/f2db74a5/base/remote-protocol.ts#L112)

___

### deletedRecords

• **deletedRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

#### Inherited from

[IOwnedSearchRecordsEvent](base_remote_protocol.IOwnedSearchRecordsEvent.md).[deletedRecords](base_remote_protocol.IOwnedSearchRecordsEvent.md#deletedrecords)

#### Defined in

[base/remote-protocol.ts:117](https://github.com/onzag/itemize/blob/f2db74a5/base/remote-protocol.ts#L117)

___

### lostRecords

• **lostRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

the records that have been deleted

#### Inherited from

[IOwnedSearchRecordsEvent](base_remote_protocol.IOwnedSearchRecordsEvent.md).[lostRecords](base_remote_protocol.IOwnedSearchRecordsEvent.md#lostrecords)

#### Defined in

[base/remote-protocol.ts:116](https://github.com/onzag/itemize/blob/f2db74a5/base/remote-protocol.ts#L116)

___

### modifiedRecords

• **modifiedRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

the records that have been modified

#### Inherited from

[IOwnedSearchRecordsEvent](base_remote_protocol.IOwnedSearchRecordsEvent.md).[modifiedRecords](base_remote_protocol.IOwnedSearchRecordsEvent.md#modifiedrecords)

#### Defined in

[base/remote-protocol.ts:121](https://github.com/onzag/itemize/blob/f2db74a5/base/remote-protocol.ts#L121)

___

### newLastModified

• **newLastModified**: `string`

the new last record search result

#### Inherited from

[IOwnedSearchRecordsEvent](base_remote_protocol.IOwnedSearchRecordsEvent.md).[newLastModified](base_remote_protocol.IOwnedSearchRecordsEvent.md#newlastmodified)

#### Defined in

[base/remote-protocol.ts:125](https://github.com/onzag/itemize/blob/f2db74a5/base/remote-protocol.ts#L125)

___

### newRecords

• **newRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

the new records that have been added

#### Inherited from

[IOwnedSearchRecordsEvent](base_remote_protocol.IOwnedSearchRecordsEvent.md).[newRecords](base_remote_protocol.IOwnedSearchRecordsEvent.md#newrecords)

#### Defined in

[base/remote-protocol.ts:111](https://github.com/onzag/itemize/blob/f2db74a5/base/remote-protocol.ts#L111)

___

### qualifiedPathName

• **qualifiedPathName**: `string`

the qualified path name or type of the either module or item definition

#### Inherited from

[IOwnedSearchRecordsEvent](base_remote_protocol.IOwnedSearchRecordsEvent.md).[qualifiedPathName](base_remote_protocol.IOwnedSearchRecordsEvent.md#qualifiedpathname)

#### Defined in

[base/remote-protocol.ts:107](https://github.com/onzag/itemize/blob/f2db74a5/base/remote-protocol.ts#L107)

___

### time

• **time**: `string`

#### Defined in

[client/internal/testing.ts:107](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/testing.ts#L107)
