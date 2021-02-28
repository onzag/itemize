[](../README.md) / [Exports](../modules.md) / [client/internal/testing](../modules/client_internal_testing.md) / IParentedSearchRecordsAddedEventWithTime

# Interface: IParentedSearchRecordsAddedEventWithTime

[client/internal/testing](../modules/client_internal_testing.md).IParentedSearchRecordsAddedEventWithTime

## Hierarchy

* [*IParentedSearchRecordsEvent*](base_remote_protocol.iparentedsearchrecordsevent.md)

  ↳ **IParentedSearchRecordsAddedEventWithTime**

## Table of contents

### Properties

- [lostRecords](client_internal_testing.iparentedsearchrecordsaddedeventwithtime.md#lostrecords)
- [modifiedRecords](client_internal_testing.iparentedsearchrecordsaddedeventwithtime.md#modifiedrecords)
- [newLastModified](client_internal_testing.iparentedsearchrecordsaddedeventwithtime.md#newlastmodified)
- [newRecords](client_internal_testing.iparentedsearchrecordsaddedeventwithtime.md#newrecords)
- [parentId](client_internal_testing.iparentedsearchrecordsaddedeventwithtime.md#parentid)
- [parentType](client_internal_testing.iparentedsearchrecordsaddedeventwithtime.md#parenttype)
- [parentVersion](client_internal_testing.iparentedsearchrecordsaddedeventwithtime.md#parentversion)
- [qualifiedPathName](client_internal_testing.iparentedsearchrecordsaddedeventwithtime.md#qualifiedpathname)
- [time](client_internal_testing.iparentedsearchrecordsaddedeventwithtime.md#time)

## Properties

### lostRecords

• **lostRecords**: [*IGQLSearchRecord*](gql_querier.igqlsearchrecord.md)[]

the records that have been deleted

Inherited from: [IParentedSearchRecordsEvent](base_remote_protocol.iparentedsearchrecordsevent.md).[lostRecords](base_remote_protocol.iparentedsearchrecordsevent.md#lostrecords)

Defined in: [base/remote-protocol.ts:114](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L114)

___

### modifiedRecords

• **modifiedRecords**: [*IGQLSearchRecord*](gql_querier.igqlsearchrecord.md)[]

the records that have been modified

Inherited from: [IParentedSearchRecordsEvent](base_remote_protocol.iparentedsearchrecordsevent.md).[modifiedRecords](base_remote_protocol.iparentedsearchrecordsevent.md#modifiedrecords)

Defined in: [base/remote-protocol.ts:118](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L118)

___

### newLastModified

• **newLastModified**: *string*

the new last record search result

Inherited from: [IParentedSearchRecordsEvent](base_remote_protocol.iparentedsearchrecordsevent.md).[newLastModified](base_remote_protocol.iparentedsearchrecordsevent.md#newlastmodified)

Defined in: [base/remote-protocol.ts:122](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L122)

___

### newRecords

• **newRecords**: [*IGQLSearchRecord*](gql_querier.igqlsearchrecord.md)[]

the new records that have been added

Inherited from: [IParentedSearchRecordsEvent](base_remote_protocol.iparentedsearchrecordsevent.md).[newRecords](base_remote_protocol.iparentedsearchrecordsevent.md#newrecords)

Defined in: [base/remote-protocol.ts:110](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L110)

___

### parentId

• **parentId**: *string*

Inherited from: [IParentedSearchRecordsEvent](base_remote_protocol.iparentedsearchrecordsevent.md).[parentId](base_remote_protocol.iparentedsearchrecordsevent.md#parentid)

Defined in: [base/remote-protocol.ts:149](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L149)

___

### parentType

• **parentType**: *string*

Inherited from: [IParentedSearchRecordsEvent](base_remote_protocol.iparentedsearchrecordsevent.md).[parentType](base_remote_protocol.iparentedsearchrecordsevent.md#parenttype)

Defined in: [base/remote-protocol.ts:148](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L148)

___

### parentVersion

• **parentVersion**: *string*

Inherited from: [IParentedSearchRecordsEvent](base_remote_protocol.iparentedsearchrecordsevent.md).[parentVersion](base_remote_protocol.iparentedsearchrecordsevent.md#parentversion)

Defined in: [base/remote-protocol.ts:150](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L150)

___

### qualifiedPathName

• **qualifiedPathName**: *string*

the qualified path name or type of the either module or item definition

Inherited from: [IParentedSearchRecordsEvent](base_remote_protocol.iparentedsearchrecordsevent.md).[qualifiedPathName](base_remote_protocol.iparentedsearchrecordsevent.md#qualifiedpathname)

Defined in: [base/remote-protocol.ts:106](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L106)

___

### time

• **time**: *string*

Defined in: [client/internal/testing.ts:111](https://github.com/onzag/itemize/blob/11a98dec/client/internal/testing.ts#L111)
