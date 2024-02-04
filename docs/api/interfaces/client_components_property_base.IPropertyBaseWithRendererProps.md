[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/property/base](../modules/client_components_property_base.md) / IPropertyBaseWithRendererProps

# Interface: IPropertyBaseWithRendererProps\<RendererPropsType\>

[client/components/property/base](../modules/client_components_property_base.md).IPropertyBaseWithRendererProps

The base interface with renderers this time

## Type parameters

| Name |
| :------ |
| `RendererPropsType` |

## Hierarchy

- [`IPropertyBaseProps`](client_components_property_base.IPropertyBaseProps.md)

  ↳ **`IPropertyBaseWithRendererProps`**

  ↳↳ [`IPropertyEntryProps`](client_components_property_base.IPropertyEntryProps.md)

  ↳↳ [`IPropertyViewProps`](client_components_property_base.IPropertyViewProps.md)

## Table of contents

### Properties

- [id](client_components_property_base.IPropertyBaseWithRendererProps.md#id)
- [policyName](client_components_property_base.IPropertyBaseWithRendererProps.md#policyname)
- [policyType](client_components_property_base.IPropertyBaseWithRendererProps.md#policytype)
- [renderer](client_components_property_base.IPropertyBaseWithRendererProps.md#renderer)
- [rendererArgs](client_components_property_base.IPropertyBaseWithRendererProps.md#rendererargs)
- [searchVariant](client_components_property_base.IPropertyBaseWithRendererProps.md#searchvariant)

## Properties

### id

• **id**: `string`

the id of the property that must exist under the item definition
provider

#### Inherited from

[IPropertyBaseProps](client_components_property_base.IPropertyBaseProps.md).[id](client_components_property_base.IPropertyBaseProps.md#id)

#### Defined in

[client/components/property/base.tsx:28](https://github.com/onzag/itemize/blob/73e0c39e/client/components/property/base.tsx#L28)

___

### policyName

• `Optional` **policyName**: `string`

the policy name, should be provided with a policy type

#### Inherited from

[IPropertyBaseProps](client_components_property_base.IPropertyBaseProps.md).[policyName](client_components_property_base.IPropertyBaseProps.md#policyname)

#### Defined in

[client/components/property/base.tsx:47](https://github.com/onzag/itemize/blob/73e0c39e/client/components/property/base.tsx#L47)

___

### policyType

• `Optional` **policyType**: `string`

the policy type, should be provided with a policy name

#### Inherited from

[IPropertyBaseProps](client_components_property_base.IPropertyBaseProps.md).[policyType](client_components_property_base.IPropertyBaseProps.md#policytype)

#### Defined in

[client/components/property/base.tsx:43](https://github.com/onzag/itemize/blob/73e0c39e/client/components/property/base.tsx#L43)

___

### renderer

• `Optional` **renderer**: `ComponentType`\<`RendererPropsType`\>

the renderer in charge of rendering the output

#### Defined in

[client/components/property/base.tsx:57](https://github.com/onzag/itemize/blob/73e0c39e/client/components/property/base.tsx#L57)

___

### rendererArgs

• `Optional` **rendererArgs**: `object`

Extra renderer args

#### Defined in

[client/components/property/base.tsx:61](https://github.com/onzag/itemize/blob/73e0c39e/client/components/property/base.tsx#L61)

___

### searchVariant

• `Optional` **searchVariant**: [`SearchVariants`](../modules/constants.md#searchvariants)

A search variant, exact, from, to, radius, etc...
only truly available in search mode

#### Inherited from

[IPropertyBaseProps](client_components_property_base.IPropertyBaseProps.md).[searchVariant](client_components_property_base.IPropertyBaseProps.md#searchvariant)

#### Defined in

[client/components/property/base.tsx:33](https://github.com/onzag/itemize/blob/73e0c39e/client/components/property/base.tsx#L33)
