[](../README.md) / [Exports](../modules.md) / [client/components/property/base](../modules/client_components_property_base.md) / IPropertyViewProps

# Interface: IPropertyViewProps<RendererPropsType\>

[client/components/property/base](../modules/client_components_property_base.md).IPropertyViewProps

The view props

## Type parameters

Name |
:------ |
`RendererPropsType` |

## Hierarchy

* [*IPropertyBaseWithRendererProps*](client_components_property_base.ipropertybasewithrendererprops.md)<RendererPropsType\>

  ↳ **IPropertyViewProps**

## Table of contents

### Properties

- [cacheFiles](client_components_property_base.ipropertyviewprops.md#cachefiles)
- [capitalize](client_components_property_base.ipropertyviewprops.md#capitalize)
- [id](client_components_property_base.ipropertyviewprops.md#id)
- [policyName](client_components_property_base.ipropertyviewprops.md#policyname)
- [policyType](client_components_property_base.ipropertyviewprops.md#policytype)
- [renderer](client_components_property_base.ipropertyviewprops.md#renderer)
- [rendererArgs](client_components_property_base.ipropertyviewprops.md#rendererargs)
- [searchVariant](client_components_property_base.ipropertyviewprops.md#searchvariant)
- [useAppliedValue](client_components_property_base.ipropertyviewprops.md#useappliedvalue)

## Properties

### cacheFiles

• `Optional` **cacheFiles**: *boolean*

whether to cache files when running the url absoluter

Defined in: [client/components/property/base.tsx:168](https://github.com/onzag/itemize/blob/28218320/client/components/property/base.tsx#L168)

___

### capitalize

• `Optional` **capitalize**: *boolean*

Whether to capitalize

Defined in: [client/components/property/base.tsx:158](https://github.com/onzag/itemize/blob/28218320/client/components/property/base.tsx#L158)

___

### id

• **id**: *string*

the id of the property that must exist under the item definition
provider

Inherited from: [IPropertyBaseWithRendererProps](client_components_property_base.ipropertybasewithrendererprops.md).[id](client_components_property_base.ipropertybasewithrendererprops.md#id)

Defined in: [client/components/property/base.tsx:31](https://github.com/onzag/itemize/blob/28218320/client/components/property/base.tsx#L31)

___

### policyName

• `Optional` **policyName**: *string*

the policy name, should be provided with a policy type

Inherited from: [IPropertyBaseWithRendererProps](client_components_property_base.ipropertybasewithrendererprops.md).[policyName](client_components_property_base.ipropertybasewithrendererprops.md#policyname)

Defined in: [client/components/property/base.tsx:44](https://github.com/onzag/itemize/blob/28218320/client/components/property/base.tsx#L44)

___

### policyType

• `Optional` **policyType**: *string*

the policy type, should be provided with a policy name

Inherited from: [IPropertyBaseWithRendererProps](client_components_property_base.ipropertybasewithrendererprops.md).[policyType](client_components_property_base.ipropertybasewithrendererprops.md#policytype)

Defined in: [client/components/property/base.tsx:40](https://github.com/onzag/itemize/blob/28218320/client/components/property/base.tsx#L40)

___

### renderer

• `Optional` **renderer**: *ComponentType*<RendererPropsType\>

the renderer in charge of rendering the output

Inherited from: [IPropertyBaseWithRendererProps](client_components_property_base.ipropertybasewithrendererprops.md).[renderer](client_components_property_base.ipropertybasewithrendererprops.md#renderer)

Defined in: [client/components/property/base.tsx:54](https://github.com/onzag/itemize/blob/28218320/client/components/property/base.tsx#L54)

___

### rendererArgs

• `Optional` **rendererArgs**: *object*

Extra renderer args

Inherited from: [IPropertyBaseWithRendererProps](client_components_property_base.ipropertybasewithrendererprops.md).[rendererArgs](client_components_property_base.ipropertybasewithrendererprops.md#rendererargs)

Defined in: [client/components/property/base.tsx:58](https://github.com/onzag/itemize/blob/28218320/client/components/property/base.tsx#L58)

___

### searchVariant

• `Optional` **searchVariant**: [*SearchVariants*](../modules/constants.md#searchvariants)

A search variant, exact, from, to, radius, etc...
only truly available in search mode

Inherited from: [IPropertyBaseWithRendererProps](client_components_property_base.ipropertybasewithrendererprops.md).[searchVariant](client_components_property_base.ipropertybasewithrendererprops.md#searchvariant)

Defined in: [client/components/property/base.tsx:36](https://github.com/onzag/itemize/blob/28218320/client/components/property/base.tsx#L36)

___

### useAppliedValue

• `Optional` **useAppliedValue**: *boolean*

whether to use the applied value rather than the
actual current value the applied value is synced
with the server

Defined in: [client/components/property/base.tsx:164](https://github.com/onzag/itemize/blob/28218320/client/components/property/base.tsx#L164)
