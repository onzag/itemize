[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/remote-protocol](../modules/base_remote_protocol.md) / IOwnedParentedSearchFeedbackRequest

# Interface: IOwnedParentedSearchFeedbackRequest

[base/remote-protocol](../modules/base_remote_protocol.md).IOwnedParentedSearchFeedbackRequest

The feedback version of [[IOwnedParentedSearchRegisterRequest]]

## Hierarchy

- [`IParentedSearchFeedbackRequest`](base_remote_protocol.IParentedSearchFeedbackRequest.md)

- [`IOwnedSearchFeedbackRequest`](base_remote_protocol.IOwnedSearchFeedbackRequest.md)

  ↳ **`IOwnedParentedSearchFeedbackRequest`**

## Table of contents

### Properties

- [createdBy](base_remote_protocol.IOwnedParentedSearchFeedbackRequest.md#createdby)
- [lastModified](base_remote_protocol.IOwnedParentedSearchFeedbackRequest.md#lastmodified)
- [parentId](base_remote_protocol.IOwnedParentedSearchFeedbackRequest.md#parentid)
- [parentType](base_remote_protocol.IOwnedParentedSearchFeedbackRequest.md#parenttype)
- [parentVersion](base_remote_protocol.IOwnedParentedSearchFeedbackRequest.md#parentversion)
- [qualifiedPathName](base_remote_protocol.IOwnedParentedSearchFeedbackRequest.md#qualifiedpathname)

## Properties

### createdBy

• **createdBy**: `string`

#### Inherited from

[IOwnedSearchFeedbackRequest](base_remote_protocol.IOwnedSearchFeedbackRequest.md).[createdBy](base_remote_protocol.IOwnedSearchFeedbackRequest.md#createdby)

#### Defined in

[base/remote-protocol.ts:639](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L639)

___

### lastModified

• **lastModified**: `string`

This is the database id field
since they come in order it's easy to know if
something has been added

#### Inherited from

[IOwnedSearchFeedbackRequest](base_remote_protocol.IOwnedSearchFeedbackRequest.md).[lastModified](base_remote_protocol.IOwnedSearchFeedbackRequest.md#lastmodified)

#### Defined in

[base/remote-protocol.ts:628](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L628)

___

### parentId

• **parentId**: `string`

#### Inherited from

[IParentedSearchFeedbackRequest](base_remote_protocol.IParentedSearchFeedbackRequest.md).[parentId](base_remote_protocol.IParentedSearchFeedbackRequest.md#parentid)

#### Defined in

[base/remote-protocol.ts:707](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L707)

___

### parentType

• **parentType**: `string`

#### Inherited from

[IParentedSearchFeedbackRequest](base_remote_protocol.IParentedSearchFeedbackRequest.md).[parentType](base_remote_protocol.IParentedSearchFeedbackRequest.md#parenttype)

#### Defined in

[base/remote-protocol.ts:706](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L706)

___

### parentVersion

• **parentVersion**: `string`

#### Inherited from

[IParentedSearchFeedbackRequest](base_remote_protocol.IParentedSearchFeedbackRequest.md).[parentVersion](base_remote_protocol.IParentedSearchFeedbackRequest.md#parentversion)

#### Defined in

[base/remote-protocol.ts:708](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L708)

___

### qualifiedPathName

• **qualifiedPathName**: `string`

The qualified path name either by module
or item definition

#### Inherited from

[IOwnedSearchFeedbackRequest](base_remote_protocol.IOwnedSearchFeedbackRequest.md).[qualifiedPathName](base_remote_protocol.IOwnedSearchFeedbackRequest.md#qualifiedpathname)

#### Defined in

[base/remote-protocol.ts:622](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L622)
