[](../README.md) / [Exports](../modules.md) / [base/remote-protocol](../modules/base_remote_protocol.md) / IOwnedSearchFeedbackRequest

# Interface: IOwnedSearchFeedbackRequest

[base/remote-protocol](../modules/base_remote_protocol.md).IOwnedSearchFeedbackRequest

The feedback version of [IParentedSearchRegisterRequest](base_remote_protocol.iparentedsearchregisterrequest.md)

## Hierarchy

* *IBaseSearchFeedbackRequest*

  ↳ **IOwnedSearchFeedbackRequest**

  ↳↳ [*IOwnedSearchFeedbackRequestWithTime*](client_internal_testing.iownedsearchfeedbackrequestwithtime.md)

## Table of contents

### Properties

- [createdBy](base_remote_protocol.iownedsearchfeedbackrequest.md#createdby)
- [lastModified](base_remote_protocol.iownedsearchfeedbackrequest.md#lastmodified)
- [qualifiedPathName](base_remote_protocol.iownedsearchfeedbackrequest.md#qualifiedpathname)

## Properties

### createdBy

• **createdBy**: *string*

Defined in: [base/remote-protocol.ts:466](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L466)

___

### lastModified

• **lastModified**: *string*

This is the database id field
since they come in order it's easy to know if
something has been added

Defined in: [base/remote-protocol.ts:455](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L455)

___

### qualifiedPathName

• **qualifiedPathName**: *string*

The qualified path name either by module
or item definition

Defined in: [base/remote-protocol.ts:449](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L449)
