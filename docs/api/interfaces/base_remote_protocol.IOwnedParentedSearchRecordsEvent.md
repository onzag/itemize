[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/remote-protocol](../modules/base_remote_protocol.md) / IOwnedParentedSearchRecordsEvent

# Interface: IOwnedParentedSearchRecordsEvent

[base/remote-protocol](../modules/base_remote_protocol.md).IOwnedParentedSearchRecordsEvent

The interface adds the parent type (qualified path name) and parent id (slot id)
check [[IParentedSearchRegisterRequest]]

## Hierarchy

- [`IParentedSearchRecordsEvent`](base_remote_protocol.IParentedSearchRecordsEvent.md)

- [`IOwnedSearchRecordsEvent`](base_remote_protocol.IOwnedSearchRecordsEvent.md)

  ↳ **`IOwnedParentedSearchRecordsEvent`**

## Table of contents

### Properties

- [createdBy](base_remote_protocol.IOwnedParentedSearchRecordsEvent.md#createdby)
- [createdRecords](base_remote_protocol.IOwnedParentedSearchRecordsEvent.md#createdrecords)
- [deletedRecords](base_remote_protocol.IOwnedParentedSearchRecordsEvent.md#deletedrecords)
- [lostRecords](base_remote_protocol.IOwnedParentedSearchRecordsEvent.md#lostrecords)
- [modifiedRecords](base_remote_protocol.IOwnedParentedSearchRecordsEvent.md#modifiedrecords)
- [newLastModified](base_remote_protocol.IOwnedParentedSearchRecordsEvent.md#newlastmodified)
- [newRecords](base_remote_protocol.IOwnedParentedSearchRecordsEvent.md#newrecords)
- [parentId](base_remote_protocol.IOwnedParentedSearchRecordsEvent.md#parentid)
- [parentType](base_remote_protocol.IOwnedParentedSearchRecordsEvent.md#parenttype)
- [parentVersion](base_remote_protocol.IOwnedParentedSearchRecordsEvent.md#parentversion)
- [qualifiedPathName](base_remote_protocol.IOwnedParentedSearchRecordsEvent.md#qualifiedpathname)

## Properties

### createdBy

• **createdBy**: `string`

#### Inherited from

[IOwnedSearchRecordsEvent](base_remote_protocol.IOwnedSearchRecordsEvent.md).[createdBy](base_remote_protocol.IOwnedSearchRecordsEvent.md#createdby)

#### Defined in

[base/remote-protocol.ts:138](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L138)

___

### createdRecords

• **createdRecords**: [`IRQSearchRecord`](rq_querier.IRQSearchRecord.md)[]

#### Inherited from

[IOwnedSearchRecordsEvent](base_remote_protocol.IOwnedSearchRecordsEvent.md).[createdRecords](base_remote_protocol.IOwnedSearchRecordsEvent.md#createdrecords)

#### Defined in

[base/remote-protocol.ts:112](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L112)

___

### deletedRecords

• **deletedRecords**: [`IRQSearchRecord`](rq_querier.IRQSearchRecord.md)[]

#### Inherited from

[IOwnedSearchRecordsEvent](base_remote_protocol.IOwnedSearchRecordsEvent.md).[deletedRecords](base_remote_protocol.IOwnedSearchRecordsEvent.md#deletedrecords)

#### Defined in

[base/remote-protocol.ts:117](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L117)

___

### lostRecords

• **lostRecords**: [`IRQSearchRecord`](rq_querier.IRQSearchRecord.md)[]

the records that have been deleted

#### Inherited from

[IOwnedSearchRecordsEvent](base_remote_protocol.IOwnedSearchRecordsEvent.md).[lostRecords](base_remote_protocol.IOwnedSearchRecordsEvent.md#lostrecords)

#### Defined in

[base/remote-protocol.ts:116](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L116)

___

### modifiedRecords

• **modifiedRecords**: [`IRQSearchRecord`](rq_querier.IRQSearchRecord.md)[]

the records that have been modified

#### Inherited from

[IOwnedSearchRecordsEvent](base_remote_protocol.IOwnedSearchRecordsEvent.md).[modifiedRecords](base_remote_protocol.IOwnedSearchRecordsEvent.md#modifiedrecords)

#### Defined in

[base/remote-protocol.ts:121](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L121)

___

### newLastModified

• **newLastModified**: `string`

the new last record search result

#### Inherited from

[IOwnedSearchRecordsEvent](base_remote_protocol.IOwnedSearchRecordsEvent.md).[newLastModified](base_remote_protocol.IOwnedSearchRecordsEvent.md#newlastmodified)

#### Defined in

[base/remote-protocol.ts:125](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L125)

___

### newRecords

• **newRecords**: [`IRQSearchRecord`](rq_querier.IRQSearchRecord.md)[]

the new records that have been added

#### Inherited from

[IOwnedSearchRecordsEvent](base_remote_protocol.IOwnedSearchRecordsEvent.md).[newRecords](base_remote_protocol.IOwnedSearchRecordsEvent.md#newrecords)

#### Defined in

[base/remote-protocol.ts:111](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L111)

___

### parentId

• **parentId**: `string`

#### Inherited from

[IParentedSearchRecordsEvent](base_remote_protocol.IParentedSearchRecordsEvent.md).[parentId](base_remote_protocol.IParentedSearchRecordsEvent.md#parentid)

#### Defined in

[base/remote-protocol.ts:152](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L152)

___

### parentType

• **parentType**: `string`

#### Inherited from

[IParentedSearchRecordsEvent](base_remote_protocol.IParentedSearchRecordsEvent.md).[parentType](base_remote_protocol.IParentedSearchRecordsEvent.md#parenttype)

#### Defined in

[base/remote-protocol.ts:151](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L151)

___

### parentVersion

• **parentVersion**: `string`

#### Inherited from

[IParentedSearchRecordsEvent](base_remote_protocol.IParentedSearchRecordsEvent.md).[parentVersion](base_remote_protocol.IParentedSearchRecordsEvent.md#parentversion)

#### Defined in

[base/remote-protocol.ts:153](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L153)

___

### qualifiedPathName

• **qualifiedPathName**: `string`

the qualified path name or type of the either module or item definition

#### Inherited from

[IOwnedSearchRecordsEvent](base_remote_protocol.IOwnedSearchRecordsEvent.md).[qualifiedPathName](base_remote_protocol.IOwnedSearchRecordsEvent.md#qualifiedpathname)

#### Defined in

[base/remote-protocol.ts:107](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L107)
