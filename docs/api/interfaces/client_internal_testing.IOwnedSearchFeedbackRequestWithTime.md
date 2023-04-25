[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/testing](../modules/client_internal_testing.md) / IOwnedSearchFeedbackRequestWithTime

# Interface: IOwnedSearchFeedbackRequestWithTime

[client/internal/testing](../modules/client_internal_testing.md).IOwnedSearchFeedbackRequestWithTime

## Hierarchy

- [`IOwnedSearchFeedbackRequest`](base_remote_protocol.IOwnedSearchFeedbackRequest.md)

  ↳ **`IOwnedSearchFeedbackRequestWithTime`**

## Table of contents

### Properties

- [createdBy](client_internal_testing.IOwnedSearchFeedbackRequestWithTime.md#createdby)
- [lastModified](client_internal_testing.IOwnedSearchFeedbackRequestWithTime.md#lastmodified)
- [qualifiedPathName](client_internal_testing.IOwnedSearchFeedbackRequestWithTime.md#qualifiedpathname)
- [time](client_internal_testing.IOwnedSearchFeedbackRequestWithTime.md#time)

## Properties

### createdBy

• **createdBy**: `string`

#### Inherited from

[IOwnedSearchFeedbackRequest](base_remote_protocol.IOwnedSearchFeedbackRequest.md).[createdBy](base_remote_protocol.IOwnedSearchFeedbackRequest.md#createdby)

#### Defined in

[base/remote-protocol.ts:639](https://github.com/onzag/itemize/blob/f2db74a5/base/remote-protocol.ts#L639)

___

### lastModified

• **lastModified**: `string`

This is the database id field
since they come in order it's easy to know if
something has been added

#### Inherited from

[IOwnedSearchFeedbackRequest](base_remote_protocol.IOwnedSearchFeedbackRequest.md).[lastModified](base_remote_protocol.IOwnedSearchFeedbackRequest.md#lastmodified)

#### Defined in

[base/remote-protocol.ts:628](https://github.com/onzag/itemize/blob/f2db74a5/base/remote-protocol.ts#L628)

___

### qualifiedPathName

• **qualifiedPathName**: `string`

The qualified path name either by module
or item definition

#### Inherited from

[IOwnedSearchFeedbackRequest](base_remote_protocol.IOwnedSearchFeedbackRequest.md).[qualifiedPathName](base_remote_protocol.IOwnedSearchFeedbackRequest.md#qualifiedpathname)

#### Defined in

[base/remote-protocol.ts:622](https://github.com/onzag/itemize/blob/f2db74a5/base/remote-protocol.ts#L622)

___

### time

• **time**: `string`

#### Defined in

[client/internal/testing.ts:67](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/testing.ts#L67)
