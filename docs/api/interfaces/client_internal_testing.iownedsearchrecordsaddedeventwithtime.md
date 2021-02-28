[](../README.md) / [Exports](../modules.md) / [client/internal/testing](../modules/client_internal_testing.md) / IOwnedSearchRecordsAddedEventWithTime

# Interface: IOwnedSearchRecordsAddedEventWithTime

[client/internal/testing](../modules/client_internal_testing.md).IOwnedSearchRecordsAddedEventWithTime

## Hierarchy

* [*IOwnedSearchRecordsEvent*](base_remote_protocol.iownedsearchrecordsevent.md)

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

Inherited from: [IOwnedSearchRecordsEvent](base_remote_protocol.iownedsearchrecordsevent.md).[createdBy](base_remote_protocol.iownedsearchrecordsevent.md#createdby)

Defined in: [base/remote-protocol.ts:135](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L135)

___

### lostRecords

• **lostRecords**: [*IGQLSearchRecord*](gql_querier.igqlsearchrecord.md)[]

the records that have been deleted

Inherited from: [IOwnedSearchRecordsEvent](base_remote_protocol.iownedsearchrecordsevent.md).[lostRecords](base_remote_protocol.iownedsearchrecordsevent.md#lostrecords)

Defined in: [base/remote-protocol.ts:114](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L114)

___

### modifiedRecords

• **modifiedRecords**: [*IGQLSearchRecord*](gql_querier.igqlsearchrecord.md)[]

the records that have been modified

Inherited from: [IOwnedSearchRecordsEvent](base_remote_protocol.iownedsearchrecordsevent.md).[modifiedRecords](base_remote_protocol.iownedsearchrecordsevent.md#modifiedrecords)

Defined in: [base/remote-protocol.ts:118](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L118)

___

### newLastModified

• **newLastModified**: *string*

the new last record search result

Inherited from: [IOwnedSearchRecordsEvent](base_remote_protocol.iownedsearchrecordsevent.md).[newLastModified](base_remote_protocol.iownedsearchrecordsevent.md#newlastmodified)

Defined in: [base/remote-protocol.ts:122](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L122)

___

### newRecords

• **newRecords**: [*IGQLSearchRecord*](gql_querier.igqlsearchrecord.md)[]

the new records that have been added

Inherited from: [IOwnedSearchRecordsEvent](base_remote_protocol.iownedsearchrecordsevent.md).[newRecords](base_remote_protocol.iownedsearchrecordsevent.md#newrecords)

Defined in: [base/remote-protocol.ts:110](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L110)

___

### qualifiedPathName

• **qualifiedPathName**: *string*

the qualified path name or type of the either module or item definition

Inherited from: [IOwnedSearchRecordsEvent](base_remote_protocol.iownedsearchrecordsevent.md).[qualifiedPathName](base_remote_protocol.iownedsearchrecordsevent.md#qualifiedpathname)

Defined in: [base/remote-protocol.ts:106](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L106)

___

### time

• **time**: *string*

Defined in: [client/internal/testing.ts:107](https://github.com/onzag/itemize/blob/11a98dec/client/internal/testing.ts#L107)
