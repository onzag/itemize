[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/property/base](../modules/client_components_property_base.md) / IPropertyViewProps

# Interface: IPropertyViewProps\<RendererPropsType\>

[client/components/property/base](../modules/client_components_property_base.md).IPropertyViewProps

The view props

## Type parameters

| Name |
| :------ |
| `RendererPropsType` |

## Hierarchy

- [`IPropertyBaseWithRendererProps`](client_components_property_base.IPropertyBaseWithRendererProps.md)\<`RendererPropsType`\>

  ↳ **`IPropertyViewProps`**

## Table of contents

### Properties

- [cacheFiles](client_components_property_base.IPropertyViewProps.md#cachefiles)
- [capitalize](client_components_property_base.IPropertyViewProps.md#capitalize)
- [displayHidden](client_components_property_base.IPropertyViewProps.md#displayhidden)
- [handleAs](client_components_property_base.IPropertyViewProps.md#handleas)
- [id](client_components_property_base.IPropertyViewProps.md#id)
- [policyName](client_components_property_base.IPropertyViewProps.md#policyname)
- [policyType](client_components_property_base.IPropertyViewProps.md#policytype)
- [renderer](client_components_property_base.IPropertyViewProps.md#renderer)
- [rendererArgs](client_components_property_base.IPropertyViewProps.md#rendererargs)
- [searchVariant](client_components_property_base.IPropertyViewProps.md#searchvariant)
- [useAppliedValue](client_components_property_base.IPropertyViewProps.md#useappliedvalue)

## Properties

### cacheFiles

• `Optional` **cacheFiles**: `boolean`

whether to cache files when running the url absoluter

#### Defined in

[client/components/property/base.tsx:220](https://github.com/onzag/itemize/blob/73e0c39e/client/components/property/base.tsx#L220)

___

### capitalize

• `Optional` **capitalize**: `boolean`

Whether to capitalize

#### Defined in

[client/components/property/base.tsx:210](https://github.com/onzag/itemize/blob/73e0c39e/client/components/property/base.tsx#L210)

___

### displayHidden

• `Optional` **displayHidden**: `boolean`

Will display even if it's hidden

#### Defined in

[client/components/property/base.tsx:224](https://github.com/onzag/itemize/blob/73e0c39e/client/components/property/base.tsx#L224)

___

### handleAs

• `Optional` **handleAs**: `Object`

Handle as the given type subtype rather than
the default

#### Type declaration

| Name | Type |
| :------ | :------ |
| `subtype?` | `string` |
| `type` | `string` |

#### Defined in

[client/components/property/base.tsx:229](https://github.com/onzag/itemize/blob/73e0c39e/client/components/property/base.tsx#L229)

___

### id

• **id**: `string`

the id of the property that must exist under the item definition
provider

#### Inherited from

[IPropertyBaseWithRendererProps](client_components_property_base.IPropertyBaseWithRendererProps.md).[id](client_components_property_base.IPropertyBaseWithRendererProps.md#id)

#### Defined in

[client/components/property/base.tsx:28](https://github.com/onzag/itemize/blob/73e0c39e/client/components/property/base.tsx#L28)

___

### policyName

• `Optional` **policyName**: `string`

the policy name, should be provided with a policy type

#### Inherited from

[IPropertyBaseWithRendererProps](client_components_property_base.IPropertyBaseWithRendererProps.md).[policyName](client_components_property_base.IPropertyBaseWithRendererProps.md#policyname)

#### Defined in

[client/components/property/base.tsx:47](https://github.com/onzag/itemize/blob/73e0c39e/client/components/property/base.tsx#L47)

___

### policyType

• `Optional` **policyType**: `string`

the policy type, should be provided with a policy name

#### Inherited from

[IPropertyBaseWithRendererProps](client_components_property_base.IPropertyBaseWithRendererProps.md).[policyType](client_components_property_base.IPropertyBaseWithRendererProps.md#policytype)

#### Defined in

[client/components/property/base.tsx:43](https://github.com/onzag/itemize/blob/73e0c39e/client/components/property/base.tsx#L43)

___

### renderer

• `Optional` **renderer**: `ComponentType`\<`RendererPropsType`\>

the renderer in charge of rendering the output

#### Inherited from

[IPropertyBaseWithRendererProps](client_components_property_base.IPropertyBaseWithRendererProps.md).[renderer](client_components_property_base.IPropertyBaseWithRendererProps.md#renderer)

#### Defined in

[client/components/property/base.tsx:57](https://github.com/onzag/itemize/blob/73e0c39e/client/components/property/base.tsx#L57)

___

### rendererArgs

• `Optional` **rendererArgs**: `object`

Extra renderer args

#### Inherited from

[IPropertyBaseWithRendererProps](client_components_property_base.IPropertyBaseWithRendererProps.md).[rendererArgs](client_components_property_base.IPropertyBaseWithRendererProps.md#rendererargs)

#### Defined in

[client/components/property/base.tsx:61](https://github.com/onzag/itemize/blob/73e0c39e/client/components/property/base.tsx#L61)

___

### searchVariant

• `Optional` **searchVariant**: [`SearchVariants`](../modules/constants.md#searchvariants)

A search variant, exact, from, to, radius, etc...
only truly available in search mode

#### Inherited from

[IPropertyBaseWithRendererProps](client_components_property_base.IPropertyBaseWithRendererProps.md).[searchVariant](client_components_property_base.IPropertyBaseWithRendererProps.md#searchvariant)

#### Defined in

[client/components/property/base.tsx:33](https://github.com/onzag/itemize/blob/73e0c39e/client/components/property/base.tsx#L33)

___

### useAppliedValue

• `Optional` **useAppliedValue**: `boolean`

whether to use the applied value rather than the
actual current value the applied value is synced
with the server

#### Defined in

[client/components/property/base.tsx:216](https://github.com/onzag/itemize/blob/73e0c39e/client/components/property/base.tsx#L216)
