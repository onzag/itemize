[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/remote-protocol](../modules/base_remote_protocol.md) / IPropertySearchFeedbackRequest

# Interface: IPropertySearchFeedbackRequest

[base/remote-protocol](../modules/base_remote_protocol.md).IPropertySearchFeedbackRequest

The feedback version of [IParentedSearchRegisterRequest](base_remote_protocol.IParentedSearchRegisterRequest.md)

## Hierarchy

- `IBaseSearchFeedbackRequest`

  ↳ **`IPropertySearchFeedbackRequest`**

## Table of contents

### Properties

- [lastModified](base_remote_protocol.IPropertySearchFeedbackRequest.md#lastmodified)
- [propertyId](base_remote_protocol.IPropertySearchFeedbackRequest.md#propertyid)
- [propertyValue](base_remote_protocol.IPropertySearchFeedbackRequest.md#propertyvalue)
- [qualifiedPathName](base_remote_protocol.IPropertySearchFeedbackRequest.md#qualifiedpathname)

## Properties

### lastModified

• **lastModified**: `string`

This is the database id field
since they come in order it's easy to know if
something has been added

#### Inherited from

IBaseSearchFeedbackRequest.lastModified

#### Defined in

[base/remote-protocol.ts:628](https://github.com/onzag/itemize/blob/f2db74a5/base/remote-protocol.ts#L628)

___

### propertyId

• **propertyId**: `string`

#### Defined in

[base/remote-protocol.ts:670](https://github.com/onzag/itemize/blob/f2db74a5/base/remote-protocol.ts#L670)

___

### propertyValue

• **propertyValue**: `string`

#### Defined in

[base/remote-protocol.ts:671](https://github.com/onzag/itemize/blob/f2db74a5/base/remote-protocol.ts#L671)

___

### qualifiedPathName

• **qualifiedPathName**: `string`

The qualified path name either by module
or item definition

#### Inherited from

IBaseSearchFeedbackRequest.qualifiedPathName

#### Defined in

[base/remote-protocol.ts:622](https://github.com/onzag/itemize/blob/f2db74a5/base/remote-protocol.ts#L622)
