[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/remote-protocol](../modules/base_remote_protocol.md) / IOwnedParentedSearchRecordsEvent

# Interface: IOwnedParentedSearchRecordsEvent

[base/remote-protocol](../modules/base_remote_protocol.md).IOwnedParentedSearchRecordsEvent

The interface adds the parent type (qualified path name) and parent id (slot id)
check [IParentedSearchRegisterRequest](base_remote_protocol.IParentedSearchRegisterRequest.md)

## Hierarchy

- [`IParentedSearchRecordsEvent`](base_remote_protocol.IParentedSearchRecordsEvent.md)

- [`IOwnedSearchRecordsEvent`](base_remote_protocol.IOwnedSearchRecordsEvent.md)

  ↳ **`IOwnedParentedSearchRecordsEvent`**

## Table of contents

### Properties

- [createdBy](base_remote_protocol.IOwnedParentedSearchRecordsEvent.md#createdby)
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

[base/remote-protocol.ts:136](https://github.com/onzag/itemize/blob/5c2808d3/base/remote-protocol.ts#L136)

___

### lostRecords

• **lostRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

the records that have been deleted

#### Inherited from

[IOwnedSearchRecordsEvent](base_remote_protocol.IOwnedSearchRecordsEvent.md).[lostRecords](base_remote_protocol.IOwnedSearchRecordsEvent.md#lostrecords)

#### Defined in

[base/remote-protocol.ts:115](https://github.com/onzag/itemize/blob/5c2808d3/base/remote-protocol.ts#L115)

___

### modifiedRecords

• **modifiedRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

the records that have been modified

#### Inherited from

[IOwnedSearchRecordsEvent](base_remote_protocol.IOwnedSearchRecordsEvent.md).[modifiedRecords](base_remote_protocol.IOwnedSearchRecordsEvent.md#modifiedrecords)

#### Defined in

[base/remote-protocol.ts:119](https://github.com/onzag/itemize/blob/5c2808d3/base/remote-protocol.ts#L119)

___

### newLastModified

• **newLastModified**: `string`

the new last record search result

#### Inherited from

[IOwnedSearchRecordsEvent](base_remote_protocol.IOwnedSearchRecordsEvent.md).[newLastModified](base_remote_protocol.IOwnedSearchRecordsEvent.md#newlastmodified)

#### Defined in

[base/remote-protocol.ts:123](https://github.com/onzag/itemize/blob/5c2808d3/base/remote-protocol.ts#L123)

___

### newRecords

• **newRecords**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

the new records that have been added

#### Inherited from

[IOwnedSearchRecordsEvent](base_remote_protocol.IOwnedSearchRecordsEvent.md).[newRecords](base_remote_protocol.IOwnedSearchRecordsEvent.md#newrecords)

#### Defined in

[base/remote-protocol.ts:111](https://github.com/onzag/itemize/blob/5c2808d3/base/remote-protocol.ts#L111)

___

### parentId

• **parentId**: `string`

#### Inherited from

[IParentedSearchRecordsEvent](base_remote_protocol.IParentedSearchRecordsEvent.md).[parentId](base_remote_protocol.IParentedSearchRecordsEvent.md#parentid)

#### Defined in

[base/remote-protocol.ts:150](https://github.com/onzag/itemize/blob/5c2808d3/base/remote-protocol.ts#L150)

___

### parentType

• **parentType**: `string`

#### Inherited from

[IParentedSearchRecordsEvent](base_remote_protocol.IParentedSearchRecordsEvent.md).[parentType](base_remote_protocol.IParentedSearchRecordsEvent.md#parenttype)

#### Defined in

[base/remote-protocol.ts:149](https://github.com/onzag/itemize/blob/5c2808d3/base/remote-protocol.ts#L149)

___

### parentVersion

• **parentVersion**: `string`

#### Inherited from

[IParentedSearchRecordsEvent](base_remote_protocol.IParentedSearchRecordsEvent.md).[parentVersion](base_remote_protocol.IParentedSearchRecordsEvent.md#parentversion)

#### Defined in

[base/remote-protocol.ts:151](https://github.com/onzag/itemize/blob/5c2808d3/base/remote-protocol.ts#L151)

___

### qualifiedPathName

• **qualifiedPathName**: `string`

the qualified path name or type of the either module or item definition

#### Inherited from

[IOwnedSearchRecordsEvent](base_remote_protocol.IOwnedSearchRecordsEvent.md).[qualifiedPathName](base_remote_protocol.IOwnedSearchRecordsEvent.md#qualifiedpathname)

#### Defined in

[base/remote-protocol.ts:107](https://github.com/onzag/itemize/blob/5c2808d3/base/remote-protocol.ts#L107)
