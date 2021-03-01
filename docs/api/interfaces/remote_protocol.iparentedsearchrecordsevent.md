[](../README.md) / [Exports](../modules.md) / [remote-protocol](../modules/remote_protocol.md) / IParentedSearchRecordsEvent

# Interface: IParentedSearchRecordsEvent

[remote-protocol](../modules/remote_protocol.md).IParentedSearchRecordsEvent

The interface adds the parent type (qualified path name) and parent id (slot id)
check [IParentedSearchRegisterRequest](remote_protocol.iparentedsearchregisterrequest.md)

## Hierarchy

* *IBaseSearchRecordsEvent*

  ↳ **IParentedSearchRecordsEvent**

  ↳↳ [*IParentedSearchRecordsAddedEventWithTime*](client_internal_testing.iparentedsearchrecordsaddedeventwithtime.md)

## Table of contents

### Properties

- [lostRecords](remote_protocol.iparentedsearchrecordsevent.md#lostrecords)
- [modifiedRecords](remote_protocol.iparentedsearchrecordsevent.md#modifiedrecords)
- [newLastModified](remote_protocol.iparentedsearchrecordsevent.md#newlastmodified)
- [newRecords](remote_protocol.iparentedsearchrecordsevent.md#newrecords)
- [parentId](remote_protocol.iparentedsearchrecordsevent.md#parentid)
- [parentType](remote_protocol.iparentedsearchrecordsevent.md#parenttype)
- [parentVersion](remote_protocol.iparentedsearchrecordsevent.md#parentversion)
- [qualifiedPathName](remote_protocol.iparentedsearchrecordsevent.md#qualifiedpathname)

## Properties

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

### parentId

• **parentId**: *string*

Defined in: [base/remote-protocol.ts:150](https://github.com/onzag/itemize/blob/0569bdf2/base/remote-protocol.ts#L150)

___

### parentType

• **parentType**: *string*

Defined in: [base/remote-protocol.ts:149](https://github.com/onzag/itemize/blob/0569bdf2/base/remote-protocol.ts#L149)

___

### parentVersion

• **parentVersion**: *string*

Defined in: [base/remote-protocol.ts:151](https://github.com/onzag/itemize/blob/0569bdf2/base/remote-protocol.ts#L151)

___

### qualifiedPathName

• **qualifiedPathName**: *string*

the qualified path name or type of the either module or item definition

Defined in: [base/remote-protocol.ts:107](https://github.com/onzag/itemize/blob/0569bdf2/base/remote-protocol.ts#L107)
