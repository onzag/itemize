[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/property/base](../modules/client_components_property_base.md) / IPropertyReadPropsWOChildren

# Interface: IPropertyReadPropsWOChildren

[client/components/property/base](../modules/client_components_property_base.md).IPropertyReadPropsWOChildren

The reader props

## Hierarchy

- [`IPropertyBaseProps`](client_components_property_base.IPropertyBaseProps.md)

  ↳ **`IPropertyReadPropsWOChildren`**

  ↳↳ [`IPropertyReadProps`](client_components_property_base.IPropertyReadProps.md)

## Table of contents

### Properties

- [cacheFiles](client_components_property_base.IPropertyReadPropsWOChildren.md#cachefiles)
- [id](client_components_property_base.IPropertyReadPropsWOChildren.md#id)
- [policyName](client_components_property_base.IPropertyReadPropsWOChildren.md#policyname)
- [policyType](client_components_property_base.IPropertyReadPropsWOChildren.md#policytype)
- [searchVariant](client_components_property_base.IPropertyReadPropsWOChildren.md#searchvariant)
- [useAppliedValue](client_components_property_base.IPropertyReadPropsWOChildren.md#useappliedvalue)

## Properties

### cacheFiles

• `Optional` **cacheFiles**: `boolean`

whether to cache files when running the url absoluter

#### Defined in

[client/components/property/base.tsx:185](https://github.com/onzag/itemize/blob/59702dd5/client/components/property/base.tsx#L185)

___

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

### useAppliedValue

• `Optional` **useAppliedValue**: `boolean`

whether to use the applied value rather than the
actual current value the applied value is synced
with the server

#### Defined in

[client/components/property/base.tsx:181](https://github.com/onzag/itemize/blob/59702dd5/client/components/property/base.tsx#L181)
