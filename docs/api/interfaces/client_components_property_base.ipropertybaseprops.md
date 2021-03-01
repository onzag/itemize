[](../README.md) / [Exports](../modules.md) / [client/components/property/base](../modules/client_components_property_base.md) / IPropertyBaseProps

# Interface: IPropertyBaseProps

[client/components/property/base](../modules/client_components_property_base.md).IPropertyBaseProps

The base interface, all entry, read, view, set contain these attributes

## Hierarchy

* **IPropertyBaseProps**

  ↳ [*IPropertyBaseWithRendererProps*](client_components_property_base.ipropertybasewithrendererprops.md)

  ↳ [*IPropertySetterProps*](client_components_property_base.ipropertysetterprops.md)

  ↳ [*IPropertyReadProps*](client_components_property_base.ipropertyreadprops.md)

## Table of contents

### Properties

- [id](client_components_property_base.ipropertybaseprops.md#id)
- [policyName](client_components_property_base.ipropertybaseprops.md#policyname)
- [policyType](client_components_property_base.ipropertybaseprops.md#policytype)
- [searchVariant](client_components_property_base.ipropertybaseprops.md#searchvariant)

## Properties

### id

• **id**: *string*

the id of the property that must exist under the item definition
provider

Defined in: [client/components/property/base.tsx:31](https://github.com/onzag/itemize/blob/28218320/client/components/property/base.tsx#L31)

___

### policyName

• `Optional` **policyName**: *string*

the policy name, should be provided with a policy type

Defined in: [client/components/property/base.tsx:44](https://github.com/onzag/itemize/blob/28218320/client/components/property/base.tsx#L44)

___

### policyType

• `Optional` **policyType**: *string*

the policy type, should be provided with a policy name

Defined in: [client/components/property/base.tsx:40](https://github.com/onzag/itemize/blob/28218320/client/components/property/base.tsx#L40)

___

### searchVariant

• `Optional` **searchVariant**: [*SearchVariants*](../modules/constants.md#searchvariants)

A search variant, exact, from, to, radius, etc...
only truly available in search mode

Defined in: [client/components/property/base.tsx:36](https://github.com/onzag/itemize/blob/28218320/client/components/property/base.tsx#L36)
