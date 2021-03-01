[](../README.md) / [Exports](../modules.md) / [remote-protocol](../modules/remote_protocol.md) / IOwnedSearchRecordsEvent

# Interface: IOwnedSearchRecordsEvent

[remote-protocol](../modules/remote_protocol.md).IOwnedSearchRecordsEvent

The interface adds the creator in its event
check [IOwnedSearchRegisterRequest](remote_protocol.iownedsearchregisterrequest.md)

## Hierarchy

* *IBaseSearchRecordsEvent*

  ↳ **IOwnedSearchRecordsEvent**

  ↳↳ [*IOwnedSearchRecordsAddedEventWithTime*](client_internal_testing.iownedsearchrecordsaddedeventwithtime.md)

## Table of contents

### Properties

- [createdBy](remote_protocol.iownedsearchrecordsevent.md#createdby)
- [lostRecords](remote_protocol.iownedsearchrecordsevent.md#lostrecords)
- [modifiedRecords](remote_protocol.iownedsearchrecordsevent.md#modifiedrecords)
- [newLastModified](remote_protocol.iownedsearchrecordsevent.md#newlastmodified)
- [newRecords](remote_protocol.iownedsearchrecordsevent.md#newrecords)
- [qualifiedPathName](remote_protocol.iownedsearchrecordsevent.md#qualifiedpathname)

## Properties

### createdBy

• **createdBy**: *string*

Defined in: [base/remote-protocol.ts:136](https://github.com/onzag/itemize/blob/0569bdf2/base/remote-protocol.ts#L136)

___

### lostRecords

• **lostRecords**: [*IGQLSearchRecord*](gql_querier.igqlsearchrecord.md)[]

the records that have been deleted

Defined in: [base/remote-protocol.ts:115](https://github.com/onzag/itemize/blob/0569bdf2/base/remote-protocol.ts#L115)

___

### modifiedRecords

• **modifiedRecords**: [*IGQLSearchRecord*](gql_querier.igqlsearchrecord.md)[]

the records that have been modified

Defined in: [base/remote-protocol.ts:119](https://github.com/onzag/itemize/blob/0569bdf2/base/remote-protocol.ts#L119)

___

### newLastModified

• **newLastModified**: *string*

the new last record search result

Defined in: [base/remote-protocol.ts:123](https://github.com/onzag/itemize/blob/0569bdf2/base/remote-protocol.ts#L123)

___

### newRecords

• **newRecords**: [*IGQLSearchRecord*](gql_querier.igqlsearchrecord.md)[]

the new records that have been added

Defined in: [base/remote-protocol.ts:111](https://github.com/onzag/itemize/blob/0569bdf2/base/remote-protocol.ts#L111)

___

### qualifiedPathName

• **qualifiedPathName**: *string*

the qualified path name or type of the either module or item definition

Defined in: [base/remote-protocol.ts:107](https://github.com/onzag/itemize/blob/0569bdf2/base/remote-protocol.ts#L107)
