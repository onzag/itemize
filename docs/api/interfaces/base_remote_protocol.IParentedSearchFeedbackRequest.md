[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/remote-protocol](../modules/base_remote_protocol.md) / IParentedSearchFeedbackRequest

# Interface: IParentedSearchFeedbackRequest

[base/remote-protocol](../modules/base_remote_protocol.md).IParentedSearchFeedbackRequest

The feedback version of [[IParentedSearchRegisterRequest]]

## Hierarchy

- `IBaseSearchFeedbackRequest`

  ↳ **`IParentedSearchFeedbackRequest`**

  ↳↳ [`IOwnedParentedSearchFeedbackRequest`](base_remote_protocol.IOwnedParentedSearchFeedbackRequest.md)

  ↳↳ [`IParentedSearchFeedbackRequestWithTime`](client_internal_testing.IParentedSearchFeedbackRequestWithTime.md)

## Table of contents

### Properties

- [lastModified](base_remote_protocol.IParentedSearchFeedbackRequest.md#lastmodified)
- [parentId](base_remote_protocol.IParentedSearchFeedbackRequest.md#parentid)
- [parentType](base_remote_protocol.IParentedSearchFeedbackRequest.md#parenttype)
- [parentVersion](base_remote_protocol.IParentedSearchFeedbackRequest.md#parentversion)
- [qualifiedPathName](base_remote_protocol.IParentedSearchFeedbackRequest.md#qualifiedpathname)

## Properties

### lastModified

• **lastModified**: `string`

This is the database id field
since they come in order it's easy to know if
something has been added

#### Inherited from

IBaseSearchFeedbackRequest.lastModified

#### Defined in

[base/remote-protocol.ts:628](https://github.com/onzag/itemize/blob/59702dd5/base/remote-protocol.ts#L628)

___

### parentId

• **parentId**: `string`

#### Defined in

[base/remote-protocol.ts:707](https://github.com/onzag/itemize/blob/59702dd5/base/remote-protocol.ts#L707)

___

### parentType

• **parentType**: `string`

#### Defined in

[base/remote-protocol.ts:706](https://github.com/onzag/itemize/blob/59702dd5/base/remote-protocol.ts#L706)

___

### parentVersion

• **parentVersion**: `string`

#### Defined in

[base/remote-protocol.ts:708](https://github.com/onzag/itemize/blob/59702dd5/base/remote-protocol.ts#L708)

___

### qualifiedPathName

• **qualifiedPathName**: `string`

The qualified path name either by module
or item definition

#### Inherited from

IBaseSearchFeedbackRequest.qualifiedPathName

#### Defined in

[base/remote-protocol.ts:622](https://github.com/onzag/itemize/blob/59702dd5/base/remote-protocol.ts#L622)
