[](../README.md) / [Exports](../modules.md) / [client/components/property/base](../modules/client_components_property_base.md) / IPropertyBaseWithRendererProps

# Interface: IPropertyBaseWithRendererProps<RendererPropsType\>

[client/components/property/base](../modules/client_components_property_base.md).IPropertyBaseWithRendererProps

The base interface with renderers this time

## Type parameters

Name |
:------ |
`RendererPropsType` |

## Hierarchy

* [*IPropertyBaseProps*](client_components_property_base.ipropertybaseprops.md)

  ↳ **IPropertyBaseWithRendererProps**

  ↳↳ [*IPropertyEntryProps*](client_components_property_base.ipropertyentryprops.md)

  ↳↳ [*IPropertyViewProps*](client_components_property_base.ipropertyviewprops.md)

## Table of contents

### Properties

- [id](client_components_property_base.ipropertybasewithrendererprops.md#id)
- [policyName](client_components_property_base.ipropertybasewithrendererprops.md#policyname)
- [policyType](client_components_property_base.ipropertybasewithrendererprops.md#policytype)
- [renderer](client_components_property_base.ipropertybasewithrendererprops.md#renderer)
- [rendererArgs](client_components_property_base.ipropertybasewithrendererprops.md#rendererargs)
- [searchVariant](client_components_property_base.ipropertybasewithrendererprops.md#searchvariant)

## Properties

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

### renderer

• `Optional` **renderer**: *ComponentType*<RendererPropsType\>

the renderer in charge of rendering the output

Defined in: [client/components/property/base.tsx:54](https://github.com/onzag/itemize/blob/3efa2a4a/client/components/property/base.tsx#L54)

___

### rendererArgs

• `Optional` **rendererArgs**: *object*

Extra renderer args

Defined in: [client/components/property/base.tsx:58](https://github.com/onzag/itemize/blob/3efa2a4a/client/components/property/base.tsx#L58)

___

### searchVariant

• `Optional` **searchVariant**: [*SearchVariants*](../modules/constants.md#searchvariants)

A search variant, exact, from, to, radius, etc...
only truly available in search mode

Inherited from: [IPropertyBaseProps](client_components_property_base.ipropertybaseprops.md).[searchVariant](client_components_property_base.ipropertybaseprops.md#searchvariant)

Defined in: [client/components/property/base.tsx:36](https://github.com/onzag/itemize/blob/3efa2a4a/client/components/property/base.tsx#L36)
