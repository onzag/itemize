[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/remote-protocol](../modules/base_remote_protocol.md) / IOwnedSearchFeedbackRequest

# Interface: IOwnedSearchFeedbackRequest

[base/remote-protocol](../modules/base_remote_protocol.md).IOwnedSearchFeedbackRequest

The feedback version of [[IParentedSearchRegisterRequest]]

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

[base/remote-protocol.ts:639](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L639)

___

### lastModified

• **lastModified**: `string`

This is the database id field
since they come in order it's easy to know if
something has been added

#### Inherited from

IBaseSearchFeedbackRequest.lastModified

#### Defined in

[base/remote-protocol.ts:628](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L628)

___

### qualifiedPathName

• **qualifiedPathName**: `string`

The qualified path name either by module
or item definition

#### Inherited from

IBaseSearchFeedbackRequest.qualifiedPathName

#### Defined in

[base/remote-protocol.ts:622](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L622)
