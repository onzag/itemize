[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/property/base](../modules/client_components_property_base.md) / IPropertySetterProps

# Interface: IPropertySetterProps\<T\>

[client/components/property/base](../modules/client_components_property_base.md).IPropertySetterProps

The setter props

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) |

## Hierarchy

- [`IPropertyBaseProps`](client_components_property_base.IPropertyBaseProps.md)

  ↳ **`IPropertySetterProps`**

## Table of contents

### Properties

- [id](client_components_property_base.IPropertySetterProps.md#id)
- [policyName](client_components_property_base.IPropertySetterProps.md#policyname)
- [policyType](client_components_property_base.IPropertySetterProps.md#policytype)
- [searchVariant](client_components_property_base.IPropertySetterProps.md#searchvariant)
- [value](client_components_property_base.IPropertySetterProps.md#value)

## Properties

### id

• **id**: `string`

the id of the property that must exist under the item definition
provider

#### Inherited from

[IPropertyBaseProps](client_components_property_base.IPropertyBaseProps.md).[id](client_components_property_base.IPropertyBaseProps.md#id)

#### Defined in

[client/components/property/base.tsx:28](https://github.com/onzag/itemize/blob/59702dd5/client/components/property/base.tsx#L28)

___

### policyName

• `Optional` **policyName**: `string`

the policy name, should be provided with a policy type

#### Inherited from

[IPropertyBaseProps](client_components_property_base.IPropertyBaseProps.md).[policyName](client_components_property_base.IPropertyBaseProps.md#policyname)

#### Defined in

[client/components/property/base.tsx:47](https://github.com/onzag/itemize/blob/59702dd5/client/components/property/base.tsx#L47)

___

### policyType

• `Optional` **policyType**: `string`

the policy type, should be provided with a policy name

#### Inherited from

[IPropertyBaseProps](client_components_property_base.IPropertyBaseProps.md).[policyType](client_components_property_base.IPropertyBaseProps.md#policytype)

#### Defined in

[client/components/property/base.tsx:43](https://github.com/onzag/itemize/blob/59702dd5/client/components/property/base.tsx#L43)

___

### searchVariant

• `Optional` **searchVariant**: [`SearchVariants`](../modules/constants.md#searchvariants)

A search variant, exact, from, to, radius, etc...
only truly available in search mode

#### Inherited from

[IPropertyBaseProps](client_components_property_base.IPropertyBaseProps.md).[searchVariant](client_components_property_base.IPropertyBaseProps.md#searchvariant)

#### Defined in

[client/components/property/base.tsx:33](https://github.com/onzag/itemize/blob/59702dd5/client/components/property/base.tsx#L33)

___

### value

• **value**: `T`

The value to provide to such property

#### Defined in

[client/components/property/base.tsx:168](https://github.com/onzag/itemize/blob/59702dd5/client/components/property/base.tsx#L168)
