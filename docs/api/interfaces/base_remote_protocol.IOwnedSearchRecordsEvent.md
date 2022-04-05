[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/remote-protocol](../modules/base_remote_protocol.md) / IOwnedSearchRecordsEvent

# Interface: IOwnedSearchRecordsEvent

[base/remote-protocol](../modules/base_remote_protocol.md).IOwnedSearchRecordsEvent

The interface adds the creator in its event
check [IOwnedSearchRegisterRequest](base_remote_protocol.IOwnedSearchRegisterRequest.md)

## Hierarchy

- `IBaseSearchRecordsEvent`

  ↳ **`IOwnedSearchRecordsEvent`**

  ↳↳ [`IOwnedParentedSearchRecordsEvent`](base_remote_protocol.IOwnedParentedSearchRecordsEvent.md)

  ↳↳ [`IOwnedSearchRecordsAddedEventWithTime`](client_internal_testing.IOwnedSearchRecordsAddedEventWithTime.md)

## Table of contents

### Properties

- [createdBy](base_remote_protocol.IOwnedSearchRecordsEvent.md#createdby)
- [lostRecords](base_remote_protocol.IOwnedSearchRecordsEvent.md#lostrecords)
- [modifiedRecords](base_remote_protocol.IOwnedSearchRecordsEvent.md#modifiedrecords)
- [newLastModified](base_remote_protocol.IOwnedSearchRecordsEvent.md#newlastmodified)
- [newRecords](base_remote_protocol.IOwnedSearchRecordsEvent.md#newrecords)
- [qualifiedPathName](base_remote_protocol.IOwnedSearchRecordsEvent.md#qualifiedpathname)

## Properties

### createdBy

• **createdBy**: `string`

#### Defined in

[base/remote-protocol.ts:136](https://github.com/onzag/itemize/blob/5c2808d3/base/remote-protocol.ts#L136)

___

### lostRecords

• **lostRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

the records that have been deleted

#### Inherited from

IBaseSearchRecordsEvent.lostRecords

#### Defined in

[base/remote-protocol.ts:115](https://github.com/onzag/itemize/blob/5c2808d3/base/remote-protocol.ts#L115)

___

### modifiedRecords

• **modifiedRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

the records that have been modified

#### Inherited from

IBaseSearchRecordsEvent.modifiedRecords

#### Defined in

[base/remote-protocol.ts:119](https://github.com/onzag/itemize/blob/5c2808d3/base/remote-protocol.ts#L119)

___

### newLastModified

• **newLastModified**: `string`

the new last record search result

#### Inherited from

IBaseSearchRecordsEvent.newLastModified

#### Defined in

[base/remote-protocol.ts:123](https://github.com/onzag/itemize/blob/5c2808d3/base/remote-protocol.ts#L123)

___

### newRecords

• **newRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

the new records that have been added

#### Inherited from

IBaseSearchRecordsEvent.newRecords

#### Defined in

[base/remote-protocol.ts:111](https://github.com/onzag/itemize/blob/5c2808d3/base/remote-protocol.ts#L111)

___

### qualifiedPathName

• **qualifiedPathName**: `string`

the qualified path name or type of the either module or item definition

#### Inherited from

IBaseSearchRecordsEvent.qualifiedPathName

#### Defined in

[base/remote-protocol.ts:107](https://github.com/onzag/itemize/blob/5c2808d3/base/remote-protocol.ts#L107)
