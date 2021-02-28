[](../README.md) / [Exports](../modules.md) / [base/remote-protocol](../modules/base_remote_protocol.md) / IOwnedSearchRecordsEvent

# Interface: IOwnedSearchRecordsEvent

[base/remote-protocol](../modules/base_remote_protocol.md).IOwnedSearchRecordsEvent

The interface adds the creator in its event
check [IOwnedSearchRegisterRequest](base_remote_protocol.iownedsearchregisterrequest.md)

## Hierarchy

* *IBaseSearchRecordsEvent*

  ↳ **IOwnedSearchRecordsEvent**

  ↳↳ [*IOwnedSearchRecordsAddedEventWithTime*](client_internal_testing.iownedsearchrecordsaddedeventwithtime.md)

## Table of contents

### Properties

- [createdBy](base_remote_protocol.iownedsearchrecordsevent.md#createdby)
- [lostRecords](base_remote_protocol.iownedsearchrecordsevent.md#lostrecords)
- [modifiedRecords](base_remote_protocol.iownedsearchrecordsevent.md#modifiedrecords)
- [newLastModified](base_remote_protocol.iownedsearchrecordsevent.md#newlastmodified)
- [newRecords](base_remote_protocol.iownedsearchrecordsevent.md#newrecords)
- [qualifiedPathName](base_remote_protocol.iownedsearchrecordsevent.md#qualifiedpathname)

## Properties

### createdBy

• **createdBy**: *string*

Defined in: [base/remote-protocol.ts:135](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L135)

___

### lostRecords

• **lostRecords**: [*IGQLSearchRecord*](gql_querier.igqlsearchrecord.md)[]

the records that have been deleted

Defined in: [base/remote-protocol.ts:114](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L114)

___

### modifiedRecords

• **modifiedRecords**: [*IGQLSearchRecord*](gql_querier.igqlsearchrecord.md)[]

the records that have been modified

Defined in: [base/remote-protocol.ts:118](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L118)

___

### newLastModified

• **newLastModified**: *string*

the new last record search result

Defined in: [base/remote-protocol.ts:122](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L122)

___

### newRecords

• **newRecords**: [*IGQLSearchRecord*](gql_querier.igqlsearchrecord.md)[]

the new records that have been added

Defined in: [base/remote-protocol.ts:110](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L110)

___

### qualifiedPathName

• **qualifiedPathName**: *string*

the qualified path name or type of the either module or item definition

Defined in: [base/remote-protocol.ts:106](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L106)
