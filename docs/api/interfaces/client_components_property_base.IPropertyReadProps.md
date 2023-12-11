[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/property/base](../modules/client_components_property_base.md) / IPropertyReadProps

# Interface: IPropertyReadProps\<T\>

[client/components/property/base](../modules/client_components_property_base.md).IPropertyReadProps

The reader props

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) |

## Hierarchy

- [`IPropertyReadPropsWOChildren`](client_components_property_base.IPropertyReadPropsWOChildren.md)

  ↳ **`IPropertyReadProps`**

## Table of contents

### Properties

- [cacheFiles](client_components_property_base.IPropertyReadProps.md#cachefiles)
- [children](client_components_property_base.IPropertyReadProps.md#children)
- [id](client_components_property_base.IPropertyReadProps.md#id)
- [policyName](client_components_property_base.IPropertyReadProps.md#policyname)
- [policyType](client_components_property_base.IPropertyReadProps.md#policytype)
- [searchVariant](client_components_property_base.IPropertyReadProps.md#searchvariant)
- [useAppliedValue](client_components_property_base.IPropertyReadProps.md#useappliedvalue)

## Properties

### cacheFiles

• `Optional` **cacheFiles**: `boolean`

whether to cache files when running the url absoluter

#### Inherited from

[IPropertyReadPropsWOChildren](client_components_property_base.IPropertyReadPropsWOChildren.md).[cacheFiles](client_components_property_base.IPropertyReadPropsWOChildren.md#cachefiles)

#### Defined in

[client/components/property/base.tsx:185](https://github.com/onzag/itemize/blob/59702dd5/client/components/property/base.tsx#L185)

___

### children

• `Optional` **children**: (`value`: `T`, `state`: [`IPropertyDefinitionState`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)\<`T`\>, `setter`: `ReadSetterCallback`\<`T`\>) => `ReactNode`

#### Type declaration

▸ (`value`, `state`, `setter`): `ReactNode`

The reader callback

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |
| `state` | [`IPropertyDefinitionState`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)\<`T`\> |
| `setter` | `ReadSetterCallback`\<`T`\> |

##### Returns

`ReactNode`

#### Defined in

[client/components/property/base.tsx:200](https://github.com/onzag/itemize/blob/59702dd5/client/components/property/base.tsx#L200)

___

### id

• **id**: `string`

the id of the property that must exist under the item definition
provider

#### Inherited from

[IPropertyReadPropsWOChildren](client_components_property_base.IPropertyReadPropsWOChildren.md).[id](client_components_property_base.IPropertyReadPropsWOChildren.md#id)

#### Defined in

[client/components/property/base.tsx:28](https://github.com/onzag/itemize/blob/59702dd5/client/components/property/base.tsx#L28)

___

### policyName

• `Optional` **policyName**: `string`

the policy name, should be provided with a policy type

#### Inherited from

[IPropertyReadPropsWOChildren](client_components_property_base.IPropertyReadPropsWOChildren.md).[policyName](client_components_property_base.IPropertyReadPropsWOChildren.md#policyname)

#### Defined in

[client/components/property/base.tsx:47](https://github.com/onzag/itemize/blob/59702dd5/client/components/property/base.tsx#L47)

___

### policyType

• `Optional` **policyType**: `string`

the policy type, should be provided with a policy name

#### Inherited from

[IPropertyReadPropsWOChildren](client_components_property_base.IPropertyReadPropsWOChildren.md).[policyType](client_components_property_base.IPropertyReadPropsWOChildren.md#policytype)

#### Defined in

[client/components/property/base.tsx:43](https://github.com/onzag/itemize/blob/59702dd5/client/components/property/base.tsx#L43)

___

### searchVariant

• `Optional` **searchVariant**: [`SearchVariants`](../modules/constants.md#searchvariants)

A search variant, exact, from, to, radius, etc...
only truly available in search mode

#### Inherited from

[IPropertyReadPropsWOChildren](client_components_property_base.IPropertyReadPropsWOChildren.md).[searchVariant](client_components_property_base.IPropertyReadPropsWOChildren.md#searchvariant)

#### Defined in

[client/components/property/base.tsx:33](https://github.com/onzag/itemize/blob/59702dd5/client/components/property/base.tsx#L33)

___

### useAppliedValue

• `Optional` **useAppliedValue**: `boolean`

whether to use the applied value rather than the
actual current value the applied value is synced
with the server

#### Inherited from

[IPropertyReadPropsWOChildren](client_components_property_base.IPropertyReadPropsWOChildren.md).[useAppliedValue](client_components_property_base.IPropertyReadPropsWOChildren.md#useappliedvalue)

#### Defined in

[client/components/property/base.tsx:181](https://github.com/onzag/itemize/blob/59702dd5/client/components/property/base.tsx#L181)
