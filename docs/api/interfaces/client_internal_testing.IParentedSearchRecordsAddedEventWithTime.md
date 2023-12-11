[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/testing](../modules/client_internal_testing.md) / IParentedSearchRecordsAddedEventWithTime

# Interface: IParentedSearchRecordsAddedEventWithTime

[client/internal/testing](../modules/client_internal_testing.md).IParentedSearchRecordsAddedEventWithTime

The interface adds the parent type (qualified path name) and parent id (slot id)
check [[IParentedSearchRegisterRequest]]

## Hierarchy

- [`IParentedSearchRecordsEvent`](base_remote_protocol.IParentedSearchRecordsEvent.md)

  ↳ **`IParentedSearchRecordsAddedEventWithTime`**

## Table of contents

### Properties

- [createdRecords](client_internal_testing.IParentedSearchRecordsAddedEventWithTime.md#createdrecords)
- [deletedRecords](client_internal_testing.IParentedSearchRecordsAddedEventWithTime.md#deletedrecords)
- [lostRecords](client_internal_testing.IParentedSearchRecordsAddedEventWithTime.md#lostrecords)
- [modifiedRecords](client_internal_testing.IParentedSearchRecordsAddedEventWithTime.md#modifiedrecords)
- [newLastModified](client_internal_testing.IParentedSearchRecordsAddedEventWithTime.md#newlastmodified)
- [newRecords](client_internal_testing.IParentedSearchRecordsAddedEventWithTime.md#newrecords)
- [parentId](client_internal_testing.IParentedSearchRecordsAddedEventWithTime.md#parentid)
- [parentType](client_internal_testing.IParentedSearchRecordsAddedEventWithTime.md#parenttype)
- [parentVersion](client_internal_testing.IParentedSearchRecordsAddedEventWithTime.md#parentversion)
- [qualifiedPathName](client_internal_testing.IParentedSearchRecordsAddedEventWithTime.md#qualifiedpathname)
- [time](client_internal_testing.IParentedSearchRecordsAddedEventWithTime.md#time)

## Properties

### createdRecords

• **createdRecords**: [`IRQSearchRecord`](rq_querier.IRQSearchRecord.md)[]

#### Inherited from

[IParentedSearchRecordsEvent](base_remote_protocol.IParentedSearchRecordsEvent.md).[createdRecords](base_remote_protocol.IParentedSearchRecordsEvent.md#createdrecords)

#### Defined in

[base/remote-protocol.ts:112](https://github.com/onzag/itemize/blob/59702dd5/base/remote-protocol.ts#L112)

___

### deletedRecords

• **deletedRecords**: [`IRQSearchRecord`](rq_querier.IRQSearchRecord.md)[]

#### Inherited from

[IParentedSearchRecordsEvent](base_remote_protocol.IParentedSearchRecordsEvent.md).[deletedRecords](base_remote_protocol.IParentedSearchRecordsEvent.md#deletedrecords)

#### Defined in

[base/remote-protocol.ts:117](https://github.com/onzag/itemize/blob/59702dd5/base/remote-protocol.ts#L117)

___

### lostRecords

• **lostRecords**: [`IRQSearchRecord`](rq_querier.IRQSearchRecord.md)[]

the records that have been deleted

#### Inherited from

[IParentedSearchRecordsEvent](base_remote_protocol.IParentedSearchRecordsEvent.md).[lostRecords](base_remote_protocol.IParentedSearchRecordsEvent.md#lostrecords)

#### Defined in

[base/remote-protocol.ts:116](https://github.com/onzag/itemize/blob/59702dd5/base/remote-protocol.ts#L116)

___

### modifiedRecords

• **modifiedRecords**: [`IRQSearchRecord`](rq_querier.IRQSearchRecord.md)[]

the records that have been modified

#### Inherited from

[IParentedSearchRecordsEvent](base_remote_protocol.IParentedSearchRecordsEvent.md).[modifiedRecords](base_remote_protocol.IParentedSearchRecordsEvent.md#modifiedrecords)

#### Defined in

[base/remote-protocol.ts:121](https://github.com/onzag/itemize/blob/59702dd5/base/remote-protocol.ts#L121)

___

### newLastModified

• **newLastModified**: `string`

the new last record search result

#### Inherited from

[IParentedSearchRecordsEvent](base_remote_protocol.IParentedSearchRecordsEvent.md).[newLastModified](base_remote_protocol.IParentedSearchRecordsEvent.md#newlastmodified)

#### Defined in

[base/remote-protocol.ts:125](https://github.com/onzag/itemize/blob/59702dd5/base/remote-protocol.ts#L125)

___

### newRecords

• **newRecords**: [`IRQSearchRecord`](rq_querier.IRQSearchRecord.md)[]

the new records that have been added

#### Inherited from

[IParentedSearchRecordsEvent](base_remote_protocol.IParentedSearchRecordsEvent.md).[newRecords](base_remote_protocol.IParentedSearchRecordsEvent.md#newrecords)

#### Defined in

[base/remote-protocol.ts:111](https://github.com/onzag/itemize/blob/59702dd5/base/remote-protocol.ts#L111)

___

### parentId

• **parentId**: `string`

#### Inherited from

[IParentedSearchRecordsEvent](base_remote_protocol.IParentedSearchRecordsEvent.md).[parentId](base_remote_protocol.IParentedSearchRecordsEvent.md#parentid)

#### Defined in

[base/remote-protocol.ts:152](https://github.com/onzag/itemize/blob/59702dd5/base/remote-protocol.ts#L152)

___

### parentType

• **parentType**: `string`

#### Inherited from

[IParentedSearchRecordsEvent](base_remote_protocol.IParentedSearchRecordsEvent.md).[parentType](base_remote_protocol.IParentedSearchRecordsEvent.md#parenttype)

#### Defined in

[base/remote-protocol.ts:151](https://github.com/onzag/itemize/blob/59702dd5/base/remote-protocol.ts#L151)

___

### parentVersion

• **parentVersion**: `string`

#### Inherited from

[IParentedSearchRecordsEvent](base_remote_protocol.IParentedSearchRecordsEvent.md).[parentVersion](base_remote_protocol.IParentedSearchRecordsEvent.md#parentversion)

#### Defined in

[base/remote-protocol.ts:153](https://github.com/onzag/itemize/blob/59702dd5/base/remote-protocol.ts#L153)

___

### qualifiedPathName

• **qualifiedPathName**: `string`

the qualified path name or type of the either module or item definition

#### Inherited from

[IParentedSearchRecordsEvent](base_remote_protocol.IParentedSearchRecordsEvent.md).[qualifiedPathName](base_remote_protocol.IParentedSearchRecordsEvent.md#qualifiedpathname)

#### Defined in

[base/remote-protocol.ts:107](https://github.com/onzag/itemize/blob/59702dd5/base/remote-protocol.ts#L107)

___

### time

• **time**: `string`

#### Defined in

[client/internal/testing.ts:111](https://github.com/onzag/itemize/blob/59702dd5/client/internal/testing.ts#L111)
