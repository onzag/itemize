[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/remote-protocol](../modules/base_remote_protocol.md) / IOwnedSearchFeedbackRequest

# Interface: IOwnedSearchFeedbackRequest

[base/remote-protocol](../modules/base_remote_protocol.md).IOwnedSearchFeedbackRequest

The feedback version of [IParentedSearchRegisterRequest](base_remote_protocol.IParentedSearchRegisterRequest.md)

## Hierarchy

- `IBaseSearchFeedbackRequest`

  ↳ **`IOwnedSearchFeedbackRequest`**

  ↳↳ [`IOwnedParentedSearchFeedbackRequest`](base_remote_protocol.IOwnedParentedSearchFeedbackRequest.md)

  ↳↳ [`IOwnedSearchFeedbackRequestWithTime`](client_internal_testing.IOwnedSearchFeedbackRequestWithTime.md)

## Table of contents

### Properties

- [createdBy](base_remote_protocol.IOwnedSearchFeedbackRequest.md#createdby)
- [lastModified](base_remote_protocol.IOwnedSearchFeedbackRequest.md#lastmodified)
- [qualifiedPathName](base_remote_protocol.IOwnedSearchFeedbackRequest.md#qualifiedpathname)

## Properties

### createdBy

• **createdBy**: `string`

#### Defined in

[base/remote-protocol.ts:558](https://github.com/onzag/itemize/blob/5c2808d3/base/remote-protocol.ts#L558)

___

### lastModified

• **lastModified**: `string`

This is the database id field
since they come in order it's easy to know if
something has been added

#### Inherited from

IBaseSearchFeedbackRequest.lastModified

#### Defined in

[base/remote-protocol.ts:547](https://github.com/onzag/itemize/blob/5c2808d3/base/remote-protocol.ts#L547)

___

### qualifiedPathName

• **qualifiedPathName**: `string`

The qualified path name either by module
or item definition

#### Inherited from

IBaseSearchFeedbackRequest.qualifiedPathName

#### Defined in

[base/remote-protocol.ts:541](https://github.com/onzag/itemize/blob/5c2808d3/base/remote-protocol.ts#L541)
