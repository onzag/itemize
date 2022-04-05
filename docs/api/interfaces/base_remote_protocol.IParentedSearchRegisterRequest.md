[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/remote-protocol](../modules/base_remote_protocol.md) / IParentedSearchRegisterRequest

# Interface: IParentedSearchRegisterRequest

[base/remote-protocol](../modules/base_remote_protocol.md).IParentedSearchRegisterRequest

The parented search register request adds the parent type and parent id
check [[IParentedSearchRecordsAddedEvent]]

## Hierarchy

- `IBaseSearchRegisterRequest`

  ↳ **`IParentedSearchRegisterRequest`**

  ↳↳ [`IOwnedParentedSearchRegisterRequest`](base_remote_protocol.IOwnedParentedSearchRegisterRequest.md)

  ↳↳ [`IParentedSearchRegisterRequestWithTime`](client_internal_testing.IParentedSearchRegisterRequestWithTime.md)

## Table of contents

### Properties

- [parentId](base_remote_protocol.IParentedSearchRegisterRequest.md#parentid)
- [parentType](base_remote_protocol.IParentedSearchRegisterRequest.md#parenttype)
- [parentVersion](base_remote_protocol.IParentedSearchRegisterRequest.md#parentversion)
- [qualifiedPathName](base_remote_protocol.IParentedSearchRegisterRequest.md#qualifiedpathname)

## Properties

### parentId

• **parentId**: `string`

#### Defined in

[base/remote-protocol.ts:361](https://github.com/onzag/itemize/blob/5c2808d3/base/remote-protocol.ts#L361)

___

### parentType

• **parentType**: `string`

#### Defined in

[base/remote-protocol.ts:360](https://github.com/onzag/itemize/blob/5c2808d3/base/remote-protocol.ts#L360)

___

### parentVersion

• **parentVersion**: `string`

#### Defined in

[base/remote-protocol.ts:362](https://github.com/onzag/itemize/blob/5c2808d3/base/remote-protocol.ts#L362)

___

### qualifiedPathName

• **qualifiedPathName**: `string`

#### Inherited from

IBaseSearchRegisterRequest.qualifiedPathName

#### Defined in

[base/remote-protocol.ts:311](https://github.com/onzag/itemize/blob/5c2808d3/base/remote-protocol.ts#L311)
