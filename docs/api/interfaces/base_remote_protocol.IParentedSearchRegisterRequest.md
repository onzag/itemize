[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/remote-protocol](../modules/base_remote_protocol.md) / IParentedSearchRegisterRequest

# Interface: IParentedSearchRegisterRequest

[base/remote-protocol](../modules/base_remote_protocol.md).IParentedSearchRegisterRequest

The parented search register request adds the parent type and parent id
check [[IParentedSearchRecordsEvent]]

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

[base/remote-protocol.ts:377](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L377)

___

### parentType

• **parentType**: `string`

#### Defined in

[base/remote-protocol.ts:376](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L376)

___

### parentVersion

• **parentVersion**: `string`

#### Defined in

[base/remote-protocol.ts:378](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L378)

___

### qualifiedPathName

• **qualifiedPathName**: `string`

#### Inherited from

IBaseSearchRegisterRequest.qualifiedPathName

#### Defined in

[base/remote-protocol.ts:327](https://github.com/onzag/itemize/blob/73e0c39e/base/remote-protocol.ts#L327)
