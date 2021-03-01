[](../README.md) / [Exports](../modules.md) / [client/components/property/base](../modules/client_components_property_base.md) / IPropertyReadProps

# Interface: IPropertyReadProps

[client/components/property/base](../modules/client_components_property_base.md).IPropertyReadProps

The reader props

## Hierarchy

* [*IPropertyBaseProps*](client_components_property_base.ipropertybaseprops.md)

  ↳ **IPropertyReadProps**

## Table of contents

### Properties

- [cacheFiles](client_components_property_base.ipropertyreadprops.md#cachefiles)
- [children](client_components_property_base.ipropertyreadprops.md#children)
- [id](client_components_property_base.ipropertyreadprops.md#id)
- [policyName](client_components_property_base.ipropertyreadprops.md#policyname)
- [policyType](client_components_property_base.ipropertyreadprops.md#policytype)
- [searchVariant](client_components_property_base.ipropertyreadprops.md#searchvariant)
- [useAppliedValue](client_components_property_base.ipropertyreadprops.md#useappliedvalue)

## Properties

### cacheFiles

• `Optional` **cacheFiles**: *boolean*

whether to cache files when running the url absoluter

Defined in: [client/components/property/base.tsx:148](https://github.com/onzag/itemize/blob/3efa2a4a/client/components/property/base.tsx#L148)

___

### children

• `Optional` **children**: (`value`: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype), `state`: [*IPropertyDefinitionState*](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionstate.md)) => ReactNode

The reader callback

#### Type declaration:

▸ (`value`: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype), `state`: [*IPropertyDefinitionState*](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionstate.md)): ReactNode

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype) |
`state` | [*IPropertyDefinitionState*](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionstate.md) |

**Returns:** ReactNode

Defined in: [client/components/property/base.tsx:138](https://github.com/onzag/itemize/blob/3efa2a4a/client/components/property/base.tsx#L138)

Defined in: [client/components/property/base.tsx:138](https://github.com/onzag/itemize/blob/3efa2a4a/client/components/property/base.tsx#L138)

___

### id

• **id**: *string*

the id of the property that must exist under the item definition
provider

Inherited from: [IPropertyBaseProps](client_components_property_base.ipropertybaseprops.md).[id](client_components_property_base.ipropertybaseprops.md#id)

Defined in: [client/components/property/base.tsx:31](https://github.com/onzag/itemize/blob/3efa2a4a/client/components/property/base.tsx#L31)

___

### policyName

• `Optional` **policyName**: *string*

the policy name, should be provided with a policy type

Inherited from: [IPropertyBaseProps](client_components_property_base.ipropertybaseprops.md).[policyName](client_components_property_base.ipropertybaseprops.md#policyname)

Defined in: [client/components/property/base.tsx:44](https://github.com/onzag/itemize/blob/3efa2a4a/client/components/property/base.tsx#L44)

___

### policyType

• `Optional` **policyType**: *string*

the policy type, should be provided with a policy name

Inherited from: [IPropertyBaseProps](client_components_property_base.ipropertybaseprops.md).[policyType](client_components_property_base.ipropertybaseprops.md#policytype)

Defined in: [client/components/property/base.tsx:40](https://github.com/onzag/itemize/blob/3efa2a4a/client/components/property/base.tsx#L40)

___

### searchVariant

• `Optional` **searchVariant**: [*SearchVariants*](../modules/constants.md#searchvariants)

A search variant, exact, from, to, radius, etc...
only truly available in search mode

Inherited from: [IPropertyBaseProps](client_components_property_base.ipropertybaseprops.md).[searchVariant](client_components_property_base.ipropertybaseprops.md#searchvariant)

Defined in: [client/components/property/base.tsx:36](https://github.com/onzag/itemize/blob/3efa2a4a/client/components/property/base.tsx#L36)

___

### useAppliedValue

• `Optional` **useAppliedValue**: *boolean*

whether to use the applied value rather than the
actual current value the applied value is synced
with the server

Defined in: [client/components/property/base.tsx:144](https://github.com/onzag/itemize/blob/3efa2a4a/client/components/property/base.tsx#L144)
