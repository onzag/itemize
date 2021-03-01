[](../README.md) / [Exports](../modules.md) / [client/components/property/base](../modules/client_components_property_base.md) / IPropertySetterProps

# Interface: IPropertySetterProps

[client/components/property/base](../modules/client_components_property_base.md).IPropertySetterProps

The setter props

## Hierarchy

* [*IPropertyBaseProps*](client_components_property_base.ipropertybaseprops.md)

  ↳ **IPropertySetterProps**

## Table of contents

### Properties

- [id](client_components_property_base.ipropertysetterprops.md#id)
- [policyName](client_components_property_base.ipropertysetterprops.md#policyname)
- [policyType](client_components_property_base.ipropertysetterprops.md#policytype)
- [searchVariant](client_components_property_base.ipropertysetterprops.md#searchvariant)
- [value](client_components_property_base.ipropertysetterprops.md#value)

## Properties

### id

• **id**: *string*

the id of the property that must exist under the item definition
provider

Inherited from: [IPropertyBaseProps](client_components_property_base.ipropertybaseprops.md).[id](client_components_property_base.ipropertybaseprops.md#id)

Defined in: [client/components/property/base.tsx:31](https://github.com/onzag/itemize/blob/0e9b128c/client/components/property/base.tsx#L31)

___

### policyName

• `Optional` **policyName**: *string*

the policy name, should be provided with a policy type

Inherited from: [IPropertyBaseProps](client_components_property_base.ipropertybaseprops.md).[policyName](client_components_property_base.ipropertybaseprops.md#policyname)

Defined in: [client/components/property/base.tsx:44](https://github.com/onzag/itemize/blob/0e9b128c/client/components/property/base.tsx#L44)

___

### policyType

• `Optional` **policyType**: *string*

the policy type, should be provided with a policy name

Inherited from: [IPropertyBaseProps](client_components_property_base.ipropertybaseprops.md).[policyType](client_components_property_base.ipropertybaseprops.md#policytype)

Defined in: [client/components/property/base.tsx:40](https://github.com/onzag/itemize/blob/0e9b128c/client/components/property/base.tsx#L40)

___

### searchVariant

• `Optional` **searchVariant**: [*SearchVariants*](../modules/constants.md#searchvariants)

A search variant, exact, from, to, radius, etc...
only truly available in search mode

Inherited from: [IPropertyBaseProps](client_components_property_base.ipropertybaseprops.md).[searchVariant](client_components_property_base.ipropertybaseprops.md#searchvariant)

Defined in: [client/components/property/base.tsx:36](https://github.com/onzag/itemize/blob/0e9b128c/client/components/property/base.tsx#L36)

___

### value

• **value**: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)

The value to provide to such property

Defined in: [client/components/property/base.tsx:128](https://github.com/onzag/itemize/blob/0e9b128c/client/components/property/base.tsx#L128)
