[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/remote-protocol](../modules/base_remote_protocol.md) / IPropertySearchRecordsEvent

# Interface: IPropertySearchRecordsEvent

[base/remote-protocol](../modules/base_remote_protocol.md).IPropertySearchRecordsEvent

Adds the property id and value from the event

## Hierarchy

- `IBaseSearchRecordsEvent`

  ↳ **`IPropertySearchRecordsEvent`**

## Table of contents

### Properties

- [createdRecords](base_remote_protocol.IPropertySearchRecordsEvent.md#createdrecords)
- [deletedRecords](base_remote_protocol.IPropertySearchRecordsEvent.md#deletedrecords)
- [lostRecords](base_remote_protocol.IPropertySearchRecordsEvent.md#lostrecords)
- [modifiedRecords](base_remote_protocol.IPropertySearchRecordsEvent.md#modifiedrecords)
- [newLastModified](base_remote_protocol.IPropertySearchRecordsEvent.md#newlastmodified)
- [newRecords](base_remote_protocol.IPropertySearchRecordsEvent.md#newrecords)
- [propertyId](base_remote_protocol.IPropertySearchRecordsEvent.md#propertyid)
- [propertyValue](base_remote_protocol.IPropertySearchRecordsEvent.md#propertyvalue)
- [qualifiedPathName](base_remote_protocol.IPropertySearchRecordsEvent.md#qualifiedpathname)

## Properties

### createdRecords

• **createdRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

#### Inherited from

IBaseSearchRecordsEvent.createdRecords

#### Defined in

[base/remote-protocol.ts:112](https://github.com/onzag/itemize/blob/f2db74a5/base/remote-protocol.ts#L112)

___

### deletedRecords

• **deletedRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

#### Inherited from

IBaseSearchRecordsEvent.deletedRecords

#### Defined in

[base/remote-protocol.ts:117](https://github.com/onzag/itemize/blob/f2db74a5/base/remote-protocol.ts#L117)

___

### lostRecords

• **lostRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

the records that have been deleted

#### Inherited from

IBaseSearchRecordsEvent.lostRecords

#### Defined in

[base/remote-protocol.ts:116](https://github.com/onzag/itemize/blob/f2db74a5/base/remote-protocol.ts#L116)

___

### modifiedRecords

• **modifiedRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

the records that have been modified

#### Inherited from

IBaseSearchRecordsEvent.modifiedRecords

#### Defined in

[base/remote-protocol.ts:121](https://github.com/onzag/itemize/blob/f2db74a5/base/remote-protocol.ts#L121)

___

### newLastModified

• **newLastModified**: `string`

the new last record search result

#### Inherited from

IBaseSearchRecordsEvent.newLastModified

#### Defined in

[base/remote-protocol.ts:125](https://github.com/onzag/itemize/blob/f2db74a5/base/remote-protocol.ts#L125)

___

### newRecords

• **newRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

the new records that have been added

#### Inherited from

IBaseSearchRecordsEvent.newRecords

#### Defined in

[base/remote-protocol.ts:111](https://github.com/onzag/itemize/blob/f2db74a5/base/remote-protocol.ts#L111)

___

### propertyId

• **propertyId**: `string`

#### Defined in

[base/remote-protocol.ts:177](https://github.com/onzag/itemize/blob/f2db74a5/base/remote-protocol.ts#L177)

___

### propertyValue

• **propertyValue**: `string`

#### Defined in

[base/remote-protocol.ts:178](https://github.com/onzag/itemize/blob/f2db74a5/base/remote-protocol.ts#L178)

___

### qualifiedPathName

• **qualifiedPathName**: `string`

the qualified path name or type of the either module or item definition

#### Inherited from

IBaseSearchRecordsEvent.qualifiedPathName

#### Defined in

[base/remote-protocol.ts:107](https://github.com/onzag/itemize/blob/f2db74a5/base/remote-protocol.ts#L107)
