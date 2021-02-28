[](../README.md) / [Exports](../modules.md) / [base/remote-protocol](../modules/base_remote_protocol.md) / IParentedSearchFeedbackRequest

# Interface: IParentedSearchFeedbackRequest

[base/remote-protocol](../modules/base_remote_protocol.md).IParentedSearchFeedbackRequest

The feedback version of [IParentedSearchRegisterRequest](base_remote_protocol.iparentedsearchregisterrequest.md)

## Hierarchy

* *IBaseSearchFeedbackRequest*

  ↳ **IParentedSearchFeedbackRequest**

  ↳↳ [*IParentedSearchFeedbackRequestWithTime*](client_internal_testing.iparentedsearchfeedbackrequestwithtime.md)

## Table of contents

### Properties

- [lastModified](base_remote_protocol.iparentedsearchfeedbackrequest.md#lastmodified)
- [parentId](base_remote_protocol.iparentedsearchfeedbackrequest.md#parentid)
- [parentType](base_remote_protocol.iparentedsearchfeedbackrequest.md#parenttype)
- [parentVersion](base_remote_protocol.iparentedsearchfeedbackrequest.md#parentversion)
- [qualifiedPathName](base_remote_protocol.iparentedsearchfeedbackrequest.md#qualifiedpathname)

## Properties

### lastModified

• **lastModified**: *string*

This is the database id field
since they come in order it's easy to know if
something has been added

Defined in: [base/remote-protocol.ts:455](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L455)

___

### parentId

• **parentId**: *string*

Defined in: [base/remote-protocol.ts:498](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L498)

___

### parentType

• **parentType**: *string*

Defined in: [base/remote-protocol.ts:497](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L497)

___

### parentVersion

• **parentVersion**: *string*

Defined in: [base/remote-protocol.ts:499](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L499)

___

### qualifiedPathName

• **qualifiedPathName**: *string*

The qualified path name either by module
or item definition

Defined in: [base/remote-protocol.ts:449](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L449)
