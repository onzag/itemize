[](../README.md) / [Exports](../modules.md) / [base/remote-protocol](../modules/base_remote_protocol.md) / IParentedSearchRecordsEvent

# Interface: IParentedSearchRecordsEvent

[base/remote-protocol](../modules/base_remote_protocol.md).IParentedSearchRecordsEvent

The interface adds the parent type (qualified path name) and parent id (slot id)
check [IParentedSearchRegisterRequest](base_remote_protocol.iparentedsearchregisterrequest.md)

## Hierarchy

* *IBaseSearchRecordsEvent*

  ↳ **IParentedSearchRecordsEvent**

  ↳↳ [*IParentedSearchRecordsAddedEventWithTime*](client_internal_testing.iparentedsearchrecordsaddedeventwithtime.md)

## Table of contents

### Properties

- [lostRecords](base_remote_protocol.iparentedsearchrecordsevent.md#lostrecords)
- [modifiedRecords](base_remote_protocol.iparentedsearchrecordsevent.md#modifiedrecords)
- [newLastModified](base_remote_protocol.iparentedsearchrecordsevent.md#newlastmodified)
- [newRecords](base_remote_protocol.iparentedsearchrecordsevent.md#newrecords)
- [parentId](base_remote_protocol.iparentedsearchrecordsevent.md#parentid)
- [parentType](base_remote_protocol.iparentedsearchrecordsevent.md#parenttype)
- [parentVersion](base_remote_protocol.iparentedsearchrecordsevent.md#parentversion)
- [qualifiedPathName](base_remote_protocol.iparentedsearchrecordsevent.md#qualifiedpathname)

## Properties

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

### parentId

• **parentId**: *string*

Defined in: [base/remote-protocol.ts:149](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L149)

___

### parentType

• **parentType**: *string*

Defined in: [base/remote-protocol.ts:148](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L148)

___

### parentVersion

• **parentVersion**: *string*

Defined in: [base/remote-protocol.ts:150](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L150)

___

### qualifiedPathName

• **qualifiedPathName**: *string*

the qualified path name or type of the either module or item definition

Defined in: [base/remote-protocol.ts:106](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L106)
