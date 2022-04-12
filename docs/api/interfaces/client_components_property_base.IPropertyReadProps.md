[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/property/base](../modules/client_components_property_base.md) / IPropertyReadProps

# Interface: IPropertyReadProps

[client/components/property/base](../modules/client_components_property_base.md).IPropertyReadProps

The reader props

## Hierarchy

- [`IPropertyBaseProps`](client_components_property_base.IPropertyBaseProps.md)

  ↳ **`IPropertyReadProps`**

## Table of contents

### Properties

- [cacheFiles](client_components_property_base.IPropertyReadProps.md#cachefiles)
- [id](client_components_property_base.IPropertyReadProps.md#id)
- [policyName](client_components_property_base.IPropertyReadProps.md#policyname)
- [policyType](client_components_property_base.IPropertyReadProps.md#policytype)
- [searchVariant](client_components_property_base.IPropertyReadProps.md#searchvariant)
- [useAppliedValue](client_components_property_base.IPropertyReadProps.md#useappliedvalue)

### Methods

- [children](client_components_property_base.IPropertyReadProps.md#children)

## Properties

### cacheFiles

• `Optional` **cacheFiles**: `boolean`

whether to cache files when running the url absoluter

#### Defined in

[client/components/property/base.tsx:163](https://github.com/onzag/itemize/blob/5c2808d3/client/components/property/base.tsx#L163)

___

### id

• **id**: `string`

the id of the property that must exist under the item definition
provider

#### Inherited from

[IPropertyBaseProps](client_components_property_base.IPropertyBaseProps.md).[id](client_components_property_base.IPropertyBaseProps.md#id)

#### Defined in

[client/components/property/base.tsx:28](https://github.com/onzag/itemize/blob/5c2808d3/client/components/property/base.tsx#L28)

___

### policyName

• `Optional` **policyName**: `string`

the policy name, should be provided with a policy type

#### Inherited from

[IPropertyBaseProps](client_components_property_base.IPropertyBaseProps.md).[policyName](client_components_property_base.IPropertyBaseProps.md#policyname)

#### Defined in

[client/components/property/base.tsx:47](https://github.com/onzag/itemize/blob/5c2808d3/client/components/property/base.tsx#L47)

___

### policyType

• `Optional` **policyType**: `string`

the policy type, should be provided with a policy name

#### Inherited from

[IPropertyBaseProps](client_components_property_base.IPropertyBaseProps.md).[policyType](client_components_property_base.IPropertyBaseProps.md#policytype)

#### Defined in

[client/components/property/base.tsx:43](https://github.com/onzag/itemize/blob/5c2808d3/client/components/property/base.tsx#L43)

___

### searchVariant

• `Optional` **searchVariant**: [`SearchVariants`](../modules/constants.md#searchvariants)

A search variant, exact, from, to, radius, etc...
only truly available in search mode

#### Inherited from

[IPropertyBaseProps](client_components_property_base.IPropertyBaseProps.md).[searchVariant](client_components_property_base.IPropertyBaseProps.md#searchvariant)

#### Defined in

[client/components/property/base.tsx:33](https://github.com/onzag/itemize/blob/5c2808d3/client/components/property/base.tsx#L33)

___

### useAppliedValue

• `Optional` **useAppliedValue**: `boolean`

whether to use the applied value rather than the
actual current value the applied value is synced
with the server

#### Defined in

[client/components/property/base.tsx:159](https://github.com/onzag/itemize/blob/5c2808d3/client/components/property/base.tsx#L159)

## Methods

### children

▸ `Optional` **children**(`value`, `state`): `ReactNode`

The reader callback

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) |
| `state` | [`IPropertyDefinitionState`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md) |

#### Returns

`ReactNode`

#### Defined in

[client/components/property/base.tsx:153](https://github.com/onzag/itemize/blob/5c2808d3/client/components/property/base.tsx#L153)