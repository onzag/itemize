[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/remote-protocol](../modules/base_remote_protocol.md) / IParentedSearchFeedbackRequest

# Interface: IParentedSearchFeedbackRequest

[base/remote-protocol](../modules/base_remote_protocol.md).IParentedSearchFeedbackRequest

The feedback version of [IParentedSearchRegisterRequest](base_remote_protocol.IParentedSearchRegisterRequest.md)

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

[base/remote-protocol.ts:547](https://github.com/onzag/itemize/blob/5c2808d3/base/remote-protocol.ts#L547)

___

### parentId

• **parentId**: `string`

#### Defined in

[base/remote-protocol.ts:590](https://github.com/onzag/itemize/blob/5c2808d3/base/remote-protocol.ts#L590)

___

### parentType

• **parentType**: `string`

#### Defined in

[base/remote-protocol.ts:589](https://github.com/onzag/itemize/blob/5c2808d3/base/remote-protocol.ts#L589)

___

### parentVersion

• **parentVersion**: `string`

#### Defined in

[base/remote-protocol.ts:591](https://github.com/onzag/itemize/blob/5c2808d3/base/remote-protocol.ts#L591)

___

### qualifiedPathName

• **qualifiedPathName**: `string`

The qualified path name either by module
or item definition

#### Inherited from

IBaseSearchFeedbackRequest.qualifiedPathName

#### Defined in

[base/remote-protocol.ts:541](https://github.com/onzag/itemize/blob/5c2808d3/base/remote-protocol.ts#L541)
