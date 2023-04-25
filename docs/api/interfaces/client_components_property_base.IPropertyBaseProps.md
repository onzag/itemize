[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/property/base](../modules/client_components_property_base.md) / IPropertyBaseProps

# Interface: IPropertyBaseProps

[client/components/property/base](../modules/client_components_property_base.md).IPropertyBaseProps

The base interface, all entry, read, view, set contain these attributes

## Hierarchy

- [`IPropertyCoreProps`](client_components_property_base.IPropertyCoreProps.md)

  ↳ **`IPropertyBaseProps`**

  ↳↳ [`IPropertyBaseWithRendererProps`](client_components_property_base.IPropertyBaseWithRendererProps.md)

  ↳↳ [`IPropertySetterProps`](client_components_property_base.IPropertySetterProps.md)

  ↳↳ [`IPropertyReadPropsWOChildren`](client_components_property_base.IPropertyReadPropsWOChildren.md)

## Table of contents

### Properties

- [id](client_components_property_base.IPropertyBaseProps.md#id)
- [policyName](client_components_property_base.IPropertyBaseProps.md#policyname)
- [policyType](client_components_property_base.IPropertyBaseProps.md#policytype)
- [searchVariant](client_components_property_base.IPropertyBaseProps.md#searchvariant)

## Properties

### id

• **id**: `string`

the id of the property that must exist under the item definition
provider

#### Inherited from

[IPropertyCoreProps](client_components_property_base.IPropertyCoreProps.md).[id](client_components_property_base.IPropertyCoreProps.md#id)

#### Defined in

[client/components/property/base.tsx:28](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/base.tsx#L28)

___

### policyName

• `Optional` **policyName**: `string`

the policy name, should be provided with a policy type

#### Defined in

[client/components/property/base.tsx:47](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/base.tsx#L47)

___

### policyType

• `Optional` **policyType**: `string`

the policy type, should be provided with a policy name

#### Defined in

[client/components/property/base.tsx:43](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/base.tsx#L43)

___

### searchVariant

• `Optional` **searchVariant**: [`SearchVariants`](../modules/constants.md#searchvariants)

A search variant, exact, from, to, radius, etc...
only truly available in search mode

#### Inherited from

[IPropertyCoreProps](client_components_property_base.IPropertyCoreProps.md).[searchVariant](client_components_property_base.IPropertyCoreProps.md#searchvariant)

#### Defined in

[client/components/property/base.tsx:33](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/base.tsx#L33)
