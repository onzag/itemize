[](../README.md) / [Exports](../modules.md) / [remote-protocol](../modules/remote_protocol.md) / IOwnedSearchFeedbackRequest

# Interface: IOwnedSearchFeedbackRequest

[remote-protocol](../modules/remote_protocol.md).IOwnedSearchFeedbackRequest

The feedback version of [IParentedSearchRegisterRequest](remote_protocol.iparentedsearchregisterrequest.md)

## Hierarchy

* *IBaseSearchFeedbackRequest*

  ↳ **IOwnedSearchFeedbackRequest**

  ↳↳ [*IOwnedSearchFeedbackRequestWithTime*](client_internal_testing.iownedsearchfeedbackrequestwithtime.md)

## Table of contents

### Properties

- [createdBy](remote_protocol.iownedsearchfeedbackrequest.md#createdby)
- [lastModified](remote_protocol.iownedsearchfeedbackrequest.md#lastmodified)
- [qualifiedPathName](remote_protocol.iownedsearchfeedbackrequest.md#qualifiedpathname)

## Properties

### createdBy

• **createdBy**: *string*

Defined in: [base/remote-protocol.ts:467](https://github.com/onzag/itemize/blob/0569bdf2/base/remote-protocol.ts#L467)

___

### lastModified

• **lastModified**: *string*

This is the database id field
since they come in order it's easy to know if
something has been added

Defined in: [base/remote-protocol.ts:456](https://github.com/onzag/itemize/blob/0569bdf2/base/remote-protocol.ts#L456)

___

### qualifiedPathName

• **qualifiedPathName**: *string*

The qualified path name either by module
or item definition

Defined in: [base/remote-protocol.ts:450](https://github.com/onzag/itemize/blob/0569bdf2/base/remote-protocol.ts#L450)
