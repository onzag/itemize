[](../README.md) / [Exports](../modules.md) / [client/components/property/base](../modules/client_components_property_base.md) / IPropertyEntryProps

# Interface: IPropertyEntryProps<RendererPropsType\>

[client/components/property/base](../modules/client_components_property_base.md).IPropertyEntryProps

The entry props for all read, view, and entry

## Type parameters

Name |
:------ |
`RendererPropsType` |

## Hierarchy

* [*IPropertyBaseWithRendererProps*](client_components_property_base.ipropertybasewithrendererprops.md)<RendererPropsType\>

  ↳ **IPropertyEntryProps**

## Table of contents

### Properties

- [altDescription](client_components_property_base.ipropertyentryprops.md#altdescription)
- [altLabel](client_components_property_base.ipropertyentryprops.md#altlabel)
- [altPlaceholder](client_components_property_base.ipropertyentryprops.md#altplaceholder)
- [autoFocus](client_components_property_base.ipropertyentryprops.md#autofocus)
- [cacheFiles](client_components_property_base.ipropertyentryprops.md#cachefiles)
- [hideDescription](client_components_property_base.ipropertyentryprops.md#hidedescription)
- [icon](client_components_property_base.ipropertyentryprops.md#icon)
- [id](client_components_property_base.ipropertyentryprops.md#id)
- [ignoreErrors](client_components_property_base.ipropertyentryprops.md#ignoreerrors)
- [onEntryDrivenChange](client_components_property_base.ipropertyentryprops.md#onentrydrivenchange)
- [policyName](client_components_property_base.ipropertyentryprops.md#policyname)
- [policyType](client_components_property_base.ipropertyentryprops.md#policytype)
- [prefillWith](client_components_property_base.ipropertyentryprops.md#prefillwith)
- [referenceFilteringSet](client_components_property_base.ipropertyentryprops.md#referencefilteringset)
- [renderer](client_components_property_base.ipropertyentryprops.md#renderer)
- [rendererArgs](client_components_property_base.ipropertyentryprops.md#rendererargs)
- [searchVariant](client_components_property_base.ipropertyentryprops.md#searchvariant)
- [showAsInvalid](client_components_property_base.ipropertyentryprops.md#showasinvalid)

## Properties

### altDescription

• `Optional` **altDescription**: *string*

An alternative description

Defined in: [client/components/property/base.tsx:86](https://github.com/onzag/itemize/blob/0e9b128c/client/components/property/base.tsx#L86)

___

### altLabel

• `Optional` **altLabel**: *string*

An alternative label

Defined in: [client/components/property/base.tsx:90](https://github.com/onzag/itemize/blob/0e9b128c/client/components/property/base.tsx#L90)

___

### altPlaceholder

• `Optional` **altPlaceholder**: *string*

An alternative placeholder

Defined in: [client/components/property/base.tsx:94](https://github.com/onzag/itemize/blob/0e9b128c/client/components/property/base.tsx#L94)

___

### autoFocus

• `Optional` **autoFocus**: *boolean*

Focus on mount

Defined in: [client/components/property/base.tsx:103](https://github.com/onzag/itemize/blob/0e9b128c/client/components/property/base.tsx#L103)

___

### cacheFiles

• `Optional` **cacheFiles**: *boolean*

whether to cache files when running the url absoluter

Defined in: [client/components/property/base.tsx:118](https://github.com/onzag/itemize/blob/0e9b128c/client/components/property/base.tsx#L118)

___

### hideDescription

• `Optional` **hideDescription**: *boolean*

Whether to hide the description that is hidden in language data

Defined in: [client/components/property/base.tsx:82](https://github.com/onzag/itemize/blob/0e9b128c/client/components/property/base.tsx#L82)

___

### icon

• `Optional` **icon**: ReactNode

An icon to display alognside

Defined in: [client/components/property/base.tsx:78](https://github.com/onzag/itemize/blob/0e9b128c/client/components/property/base.tsx#L78)

___

### id

• **id**: *string*

the id of the property that must exist under the item definition
provider

Inherited from: [IPropertyBaseWithRendererProps](client_components_property_base.ipropertybasewithrendererprops.md).[id](client_components_property_base.ipropertybasewithrendererprops.md#id)

Defined in: [client/components/property/base.tsx:31](https://github.com/onzag/itemize/blob/0e9b128c/client/components/property/base.tsx#L31)

___

### ignoreErrors

• `Optional` **ignoreErrors**: *boolean*

Whether to ignore the errors
that are given

Defined in: [client/components/property/base.tsx:99](https://github.com/onzag/itemize/blob/0e9b128c/client/components/property/base.tsx#L99)

___

### onEntryDrivenChange

• `Optional` **onEntryDrivenChange**: (`value`: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)) => *void*

an optional function to get the value as the property changes
these changes are given by the entry and do not come when
the property change due to an external force

#### Type declaration:

▸ (`value`: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype) |

**Returns:** *void*

Defined in: [client/components/property/base.tsx:70](https://github.com/onzag/itemize/blob/0e9b128c/client/components/property/base.tsx#L70)

Defined in: [client/components/property/base.tsx:70](https://github.com/onzag/itemize/blob/0e9b128c/client/components/property/base.tsx#L70)

___

### policyName

• `Optional` **policyName**: *string*

the policy name, should be provided with a policy type

Inherited from: [IPropertyBaseWithRendererProps](client_components_property_base.ipropertybasewithrendererprops.md).[policyName](client_components_property_base.ipropertybasewithrendererprops.md#policyname)

Defined in: [client/components/property/base.tsx:44](https://github.com/onzag/itemize/blob/0e9b128c/client/components/property/base.tsx#L44)

___

### policyType

• `Optional` **policyType**: *string*

the policy type, should be provided with a policy name

Inherited from: [IPropertyBaseWithRendererProps](client_components_property_base.ipropertybasewithrendererprops.md).[policyType](client_components_property_base.ipropertybasewithrendererprops.md#policytype)

Defined in: [client/components/property/base.tsx:40](https://github.com/onzag/itemize/blob/0e9b128c/client/components/property/base.tsx#L40)

___

### prefillWith

• `Optional` **prefillWith**: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)

The value to prefill with on mount

Defined in: [client/components/property/base.tsx:107](https://github.com/onzag/itemize/blob/0e9b128c/client/components/property/base.tsx#L107)

___

### referenceFilteringSet

• `Optional` **referenceFilteringSet**: *object*

Used only for the referenced type, to add to
the reference filtering set options

#### Type declaration:

Defined in: [client/components/property/base.tsx:112](https://github.com/onzag/itemize/blob/0e9b128c/client/components/property/base.tsx#L112)

___

### renderer

• `Optional` **renderer**: *ComponentType*<RendererPropsType\>

the renderer in charge of rendering the output

Inherited from: [IPropertyBaseWithRendererProps](client_components_property_base.ipropertybasewithrendererprops.md).[renderer](client_components_property_base.ipropertybasewithrendererprops.md#renderer)

Defined in: [client/components/property/base.tsx:54](https://github.com/onzag/itemize/blob/0e9b128c/client/components/property/base.tsx#L54)

___

### rendererArgs

• `Optional` **rendererArgs**: *object*

Extra renderer args

Inherited from: [IPropertyBaseWithRendererProps](client_components_property_base.ipropertybasewithrendererprops.md).[rendererArgs](client_components_property_base.ipropertybasewithrendererprops.md#rendererargs)

Defined in: [client/components/property/base.tsx:58](https://github.com/onzag/itemize/blob/0e9b128c/client/components/property/base.tsx#L58)

___

### searchVariant

• `Optional` **searchVariant**: [*SearchVariants*](../modules/constants.md#searchvariants)

A search variant, exact, from, to, radius, etc...
only truly available in search mode

Inherited from: [IPropertyBaseWithRendererProps](client_components_property_base.ipropertybasewithrendererprops.md).[searchVariant](client_components_property_base.ipropertybasewithrendererprops.md#searchvariant)

Defined in: [client/components/property/base.tsx:36](https://github.com/onzag/itemize/blob/0e9b128c/client/components/property/base.tsx#L36)

___

### showAsInvalid

• `Optional` **showAsInvalid**: *boolean*

make it seem as invalid, allows displaying an entry property as invalid

Defined in: [client/components/property/base.tsx:74](https://github.com/onzag/itemize/blob/0e9b128c/client/components/property/base.tsx#L74)
