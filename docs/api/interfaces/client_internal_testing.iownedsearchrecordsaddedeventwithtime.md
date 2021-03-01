[](../README.md) / [Exports](../modules.md) / [client/internal/testing](../modules/client_internal_testing.md) / IOwnedSearchRecordsAddedEventWithTime

# Interface: IOwnedSearchRecordsAddedEventWithTime

[client/internal/testing](../modules/client_internal_testing.md).IOwnedSearchRecordsAddedEventWithTime

## Hierarchy

* [*IOwnedSearchRecordsEvent*](remote_protocol.iownedsearchrecordsevent.md)

  ↳ **IOwnedSearchRecordsAddedEventWithTime**

## Table of contents

### Properties

- [createdBy](client_internal_testing.iownedsearchrecordsaddedeventwithtime.md#createdby)
- [lostRecords](client_internal_testing.iownedsearchrecordsaddedeventwithtime.md#lostrecords)
- [modifiedRecords](client_internal_testing.iownedsearchrecordsaddedeventwithtime.md#modifiedrecords)
- [newLastModified](client_internal_testing.iownedsearchrecordsaddedeventwithtime.md#newlastmodified)
- [newRecords](client_internal_testing.iownedsearchrecordsaddedeventwithtime.md#newrecords)
- [qualifiedPathName](client_internal_testing.iownedsearchrecordsaddedeventwithtime.md#qualifiedpathname)
- [time](client_internal_testing.iownedsearchrecordsaddedeventwithtime.md#time)

## Properties

### createdBy

• **createdBy**: *string*

Inherited from: [IOwnedSearchRecordsEvent](remote_protocol.iownedsearchrecordsevent.md).[createdBy](remote_protocol.iownedsearchrecordsevent.md#createdby)

Defined in: [base/remote-protocol.ts:136](https://github.com/onzag/itemize/blob/0569bdf2/base/remote-protocol.ts#L136)

___

### lostRecords

• **lostRecords**: [*IGQLSearchRecord*](gql_querier.igqlsearchrecord.md)[]

the records that have been deleted

Inherited from: [IOwnedSearchRecordsEvent](remote_protocol.iownedsearchrecordsevent.md).[lostRecords](remote_protocol.iownedsearchrecordsevent.md#lostrecords)

Defined in: [base/remote-protocol.ts:115](https://github.com/onzag/itemize/blob/0569bdf2/base/remote-protocol.ts#L115)

___

### modifiedRecords

• **modifiedRecords**: [*IGQLSearchRecord*](gql_querier.igqlsearchrecord.md)[]

the records that have been modified

Inherited from: [IOwnedSearchRecordsEvent](remote_protocol.iownedsearchrecordsevent.md).[modifiedRecords](remote_protocol.iownedsearchrecordsevent.md#modifiedrecords)

Defined in: [base/remote-protocol.ts:119](https://github.com/onzag/itemize/blob/0569bdf2/base/remote-protocol.ts#L119)

___

### newLastModified

• **newLastModified**: *string*

the new last record search result

Inherited from: [IOwnedSearchRecordsEvent](remote_protocol.iownedsearchrecordsevent.md).[newLastModified](remote_protocol.iownedsearchrecordsevent.md#newlastmodified)

Defined in: [base/remote-protocol.ts:123](https://github.com/onzag/itemize/blob/0569bdf2/base/remote-protocol.ts#L123)

___

### newRecords

• **newRecords**: [*IGQLSearchRecord*](gql_querier.igqlsearchrecord.md)[]

the new records that have been added

Inherited from: [IOwnedSearchRecordsEvent](remote_protocol.iownedsearchrecordsevent.md).[newRecords](remote_protocol.iownedsearchrecordsevent.md#newrecords)

Defined in: [base/remote-protocol.ts:111](https://github.com/onzag/itemize/blob/0569bdf2/base/remote-protocol.ts#L111)

___

### qualifiedPathName

• **qualifiedPathName**: *string*

the qualified path name or type of the either module or item definition

Inherited from: [IOwnedSearchRecordsEvent](remote_protocol.iownedsearchrecordsevent.md).[qualifiedPathName](remote_protocol.iownedsearchrecordsevent.md#qualifiedpathname)

Defined in: [base/remote-protocol.ts:107](https://github.com/onzag/itemize/blob/0569bdf2/base/remote-protocol.ts#L107)

___

### time

• **time**: *string*

Defined in: [client/internal/testing.ts:107](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/testing.ts#L107)
