[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertySetter](../modules/client_internal_components_PropertySetter.md) / IPropertySetterBaseProps

# Interface: IPropertySetterBaseProps

[client/internal/components/PropertySetter](../modules/client_internal_components_PropertySetter.md).IPropertySetterBaseProps

Base props for the property setter, check base.tsx to check
how these properties are given

## Table of contents

### Properties

- [forId](client_internal_components_PropertySetter.IPropertySetterBaseProps.md#forid)
- [forVersion](client_internal_components_PropertySetter.IPropertySetterBaseProps.md#forversion)
- [onClearEnforcement](client_internal_components_PropertySetter.IPropertySetterBaseProps.md#onclearenforcement)
- [onEnforce](client_internal_components_PropertySetter.IPropertySetterBaseProps.md#onenforce)
- [property](client_internal_components_PropertySetter.IPropertySetterBaseProps.md#property)
- [value](client_internal_components_PropertySetter.IPropertySetterBaseProps.md#value)

## Properties

### forId

• **forId**: `string`

The slot id that is to be used, or null
retrieved from the item-definition.tsx context

#### Defined in

[client/internal/components/PropertySetter/index.tsx:25](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertySetter/index.tsx#L25)

___

### forVersion

• `Optional` **forVersion**: `string`

The slot version that is to be used, or null
retrieved from the item-definition.tsx context

#### Defined in

[client/internal/components/PropertySetter/index.tsx:30](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertySetter/index.tsx#L30)

___

### onClearEnforcement

• **onClearEnforcement**: (`property`: [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md), `forId`: `string`, `forVersion`: `string`) => `void`

#### Type declaration

▸ (`property`, `forId`, `forVersion`): `void`

The clear enforcement function
retrieved from the item-definition.tsx context

##### Parameters

| Name | Type |
| :------ | :------ |
| `property` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |
| `forId` | `string` |
| `forVersion` | `string` |

##### Returns

`void`

#### Defined in

[client/internal/components/PropertySetter/index.tsx:45](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertySetter/index.tsx#L45)

___

### onEnforce

• **onEnforce**: (`property`: [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md), `value`: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype), `forId`: `string`, `forVersion`: `string`) => `void`

#### Type declaration

▸ (`property`, `value`, `forId`, `forVersion`): `void`

The enforcement function
retrieved from the item-definition.tsx context

##### Parameters

| Name | Type |
| :------ | :------ |
| `property` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |
| `value` | [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) |
| `forId` | `string` |
| `forVersion` | `string` |

##### Returns

`void`

#### Defined in

[client/internal/components/PropertySetter/index.tsx:40](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertySetter/index.tsx#L40)

___

### property

• **property**: [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

The property that is to be set
retrieved from the item-definition.tsx context

#### Defined in

[client/internal/components/PropertySetter/index.tsx:20](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertySetter/index.tsx#L20)

___

### value

• **value**: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)

The value that is to be set
Provided by the user

#### Defined in

[client/internal/components/PropertySetter/index.tsx:35](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertySetter/index.tsx#L35)
