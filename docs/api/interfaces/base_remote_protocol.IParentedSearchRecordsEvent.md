[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/remote-protocol](../modules/base_remote_protocol.md) / IParentedSearchRecordsEvent

# Interface: IParentedSearchRecordsEvent

[base/remote-protocol](../modules/base_remote_protocol.md).IParentedSearchRecordsEvent

The interface adds the parent type (qualified path name) and parent id (slot id)
check [[IParentedSearchRegisterRequest]]

## Hierarchy

- `IBaseSearchRecordsEvent`

  ↳ **`IParentedSearchRecordsEvent`**

  ↳↳ [`IOwnedParentedSearchRecordsEvent`](base_remote_protocol.IOwnedParentedSearchRecordsEvent.md)

  ↳↳ [`IParentedSearchRecordsAddedEventWithTime`](client_internal_testing.IParentedSearchRecordsAddedEventWithTime.md)

## Table of contents

### Properties

- [createdRecords](base_remote_protocol.IParentedSearchRecordsEvent.md#createdrecords)
- [deletedRecords](base_remote_protocol.IParentedSearchRecordsEvent.md#deletedrecords)
- [lostRecords](base_remote_protocol.IParentedSearchRecordsEvent.md#lostrecords)
- [modifiedRecords](base_remote_protocol.IParentedSearchRecordsEvent.md#modifiedrecords)
- [newLastModified](base_remote_protocol.IParentedSearchRecordsEvent.md#newlastmodified)
- [newRecords](base_remote_protocol.IParentedSearchRecordsEvent.md#newrecords)
- [parentId](base_remote_protocol.IParentedSearchRecordsEvent.md#parentid)
- [parentType](base_remote_protocol.IParentedSearchRecordsEvent.md#parenttype)
- [parentVersion](base_remote_protocol.IParentedSearchRecordsEvent.md#parentversion)
- [qualifiedPathName](base_remote_protocol.IParentedSearchRecordsEvent.md#qualifiedpathname)

## Properties

### createdRecords

• **createdRecords**: [`IRQSearchRecord`](rq_querier.IRQSearchRecord.md)[]

#### Inherited from

IBaseSearchRecordsEvent.createdRecords

#### Defined in

[base/remote-protocol.ts:112](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L112)

___

### deletedRecords

• **deletedRecords**: [`IRQSearchRecord`](rq_querier.IRQSearchRecord.md)[]

#### Inherited from

IBaseSearchRecordsEvent.deletedRecords

#### Defined in

[base/remote-protocol.ts:117](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L117)

___

### lostRecords

• **lostRecords**: [`IRQSearchRecord`](rq_querier.IRQSearchRecord.md)[]

the records that have been deleted

#### Inherited from

IBaseSearchRecordsEvent.lostRecords

#### Defined in

[base/remote-protocol.ts:116](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L116)

___

### modifiedRecords

• **modifiedRecords**: [`IRQSearchRecord`](rq_querier.IRQSearchRecord.md)[]

the records that have been modified

#### Inherited from

IBaseSearchRecordsEvent.modifiedRecords

#### Defined in

[base/remote-protocol.ts:121](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L121)

___

### newLastModified

• **newLastModified**: `string`

the new last record search result

#### Inherited from

IBaseSearchRecordsEvent.newLastModified

#### Defined in

[base/remote-protocol.ts:125](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L125)

___

### newRecords

• **newRecords**: [`IRQSearchRecord`](rq_querier.IRQSearchRecord.md)[]

the new records that have been added

#### Inherited from

IBaseSearchRecordsEvent.newRecords

#### Defined in

[base/remote-protocol.ts:111](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L111)

___

### parentId

• **parentId**: `string`

#### Defined in

[base/remote-protocol.ts:152](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L152)

___

### parentType

• **parentType**: `string`

#### Defined in

[base/remote-protocol.ts:151](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L151)

___

### parentVersion

• **parentVersion**: `string`

#### Defined in

[base/remote-protocol.ts:153](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L153)

___

### qualifiedPathName

• **qualifiedPathName**: `string`

the qualified path name or type of the either module or item definition

#### Inherited from

IBaseSearchRecordsEvent.qualifiedPathName

#### Defined in

[base/remote-protocol.ts:107](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L107)
