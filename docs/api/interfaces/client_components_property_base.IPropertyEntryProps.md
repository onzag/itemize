[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/property/base](../modules/client_components_property_base.md) / IPropertyEntryProps

# Interface: IPropertyEntryProps<RendererPropsType\>

[client/components/property/base](../modules/client_components_property_base.md).IPropertyEntryProps

The entry props for all read, view, and entry

## Type parameters

| Name |
| :------ |
| `RendererPropsType` |

## Hierarchy

- [`IPropertyBaseWithRendererProps`](client_components_property_base.IPropertyBaseWithRendererProps.md)<`RendererPropsType`\>

  ↳ **`IPropertyEntryProps`**

## Table of contents

### Properties

- [altDescription](client_components_property_base.IPropertyEntryProps.md#altdescription)
- [altLabel](client_components_property_base.IPropertyEntryProps.md#altlabel)
- [altPlaceholder](client_components_property_base.IPropertyEntryProps.md#altplaceholder)
- [autoFocus](client_components_property_base.IPropertyEntryProps.md#autofocus)
- [cacheFiles](client_components_property_base.IPropertyEntryProps.md#cachefiles)
- [disabled](client_components_property_base.IPropertyEntryProps.md#disabled)
- [displayHidden](client_components_property_base.IPropertyEntryProps.md#displayhidden)
- [hideDescription](client_components_property_base.IPropertyEntryProps.md#hidedescription)
- [hideLabel](client_components_property_base.IPropertyEntryProps.md#hidelabel)
- [hidePlaceholder](client_components_property_base.IPropertyEntryProps.md#hideplaceholder)
- [id](client_components_property_base.IPropertyEntryProps.md#id)
- [ignoreErrors](client_components_property_base.IPropertyEntryProps.md#ignoreerrors)
- [languageOverride](client_components_property_base.IPropertyEntryProps.md#languageoverride)
- [policyName](client_components_property_base.IPropertyEntryProps.md#policyname)
- [policyType](client_components_property_base.IPropertyEntryProps.md#policytype)
- [prefillWith](client_components_property_base.IPropertyEntryProps.md#prefillwith)
- [renderer](client_components_property_base.IPropertyEntryProps.md#renderer)
- [rendererArgs](client_components_property_base.IPropertyEntryProps.md#rendererargs)
- [searchVariant](client_components_property_base.IPropertyEntryProps.md#searchvariant)
- [showAsInvalid](client_components_property_base.IPropertyEntryProps.md#showasinvalid)
- [suppressWarnings](client_components_property_base.IPropertyEntryProps.md#suppresswarnings)

### Methods

- [onEntryDrivenChange](client_components_property_base.IPropertyEntryProps.md#onentrydrivenchange)

## Properties

### altDescription

• `Optional` **altDescription**: `string`

An alternative description

#### Defined in

[client/components/property/base.tsx:85](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/base.tsx#L85)

___

### altLabel

• `Optional` **altLabel**: `string`

An alternative label

#### Defined in

[client/components/property/base.tsx:89](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/base.tsx#L89)

___

### altPlaceholder

• `Optional` **altPlaceholder**: `string`

An alternative placeholder

#### Defined in

[client/components/property/base.tsx:101](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/base.tsx#L101)

___

### autoFocus

• `Optional` **autoFocus**: `boolean`

Focus on mount

#### Defined in

[client/components/property/base.tsx:110](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/base.tsx#L110)

___

### cacheFiles

• `Optional` **cacheFiles**: `boolean`

whether to cache files when running the url absoluter

this uses the service worker mechanism, it will not affect
files that have been cached internally using long term
caching

#### Defined in

[client/components/property/base.tsx:122](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/base.tsx#L122)

___

### disabled

• `Optional` **disabled**: `boolean`

force to be disabled

#### Defined in

[client/components/property/base.tsx:126](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/base.tsx#L126)

___

### displayHidden

• `Optional` **displayHidden**: `boolean`

Will display even if it's hidden

#### Defined in

[client/components/property/base.tsx:130](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/base.tsx#L130)

___

### hideDescription

• `Optional` **hideDescription**: `boolean`

Whether to hide the description that is hidden in language data

#### Defined in

[client/components/property/base.tsx:81](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/base.tsx#L81)

___

### hideLabel

• `Optional` **hideLabel**: `boolean`

Hide the label

#### Defined in

[client/components/property/base.tsx:93](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/base.tsx#L93)

___

### hidePlaceholder

• `Optional` **hidePlaceholder**: `boolean`

Hide the placeholder

#### Defined in

[client/components/property/base.tsx:97](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/base.tsx#L97)

___

### id

• **id**: `string`

the id of the property that must exist under the item definition
provider

#### Inherited from

[IPropertyBaseWithRendererProps](client_components_property_base.IPropertyBaseWithRendererProps.md).[id](client_components_property_base.IPropertyBaseWithRendererProps.md#id)

#### Defined in

[client/components/property/base.tsx:28](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/base.tsx#L28)

___

### ignoreErrors

• `Optional` **ignoreErrors**: `boolean`

Whether to ignore the errors
that are given

#### Defined in

[client/components/property/base.tsx:106](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/base.tsx#L106)

___

### languageOverride

• `Optional` **languageOverride**: `string`

Used for the text type allows to override the language
of a property for a new value

#### Defined in

[client/components/property/base.tsx:136](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/base.tsx#L136)

___

### policyName

• `Optional` **policyName**: `string`

the policy name, should be provided with a policy type

#### Inherited from

[IPropertyBaseWithRendererProps](client_components_property_base.IPropertyBaseWithRendererProps.md).[policyName](client_components_property_base.IPropertyBaseWithRendererProps.md#policyname)

#### Defined in

[client/components/property/base.tsx:47](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/base.tsx#L47)

___

### policyType

• `Optional` **policyType**: `string`

the policy type, should be provided with a policy name

#### Inherited from

[IPropertyBaseWithRendererProps](client_components_property_base.IPropertyBaseWithRendererProps.md).[policyType](client_components_property_base.IPropertyBaseWithRendererProps.md#policytype)

#### Defined in

[client/components/property/base.tsx:43](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/base.tsx#L43)

___

### prefillWith

• `Optional` **prefillWith**: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)

The value to prefill with on mount

#### Defined in

[client/components/property/base.tsx:114](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/base.tsx#L114)

___

### renderer

• `Optional` **renderer**: `ComponentType`<`RendererPropsType`\>

the renderer in charge of rendering the output

#### Inherited from

[IPropertyBaseWithRendererProps](client_components_property_base.IPropertyBaseWithRendererProps.md).[renderer](client_components_property_base.IPropertyBaseWithRendererProps.md#renderer)

#### Defined in

[client/components/property/base.tsx:57](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/base.tsx#L57)

___

### rendererArgs

• `Optional` **rendererArgs**: `object`

Extra renderer args

#### Inherited from

[IPropertyBaseWithRendererProps](client_components_property_base.IPropertyBaseWithRendererProps.md).[rendererArgs](client_components_property_base.IPropertyBaseWithRendererProps.md#rendererargs)

#### Defined in

[client/components/property/base.tsx:61](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/base.tsx#L61)

___

### searchVariant

• `Optional` **searchVariant**: [`SearchVariants`](../modules/constants.md#searchvariants)

A search variant, exact, from, to, radius, etc...
only truly available in search mode

#### Inherited from

[IPropertyBaseWithRendererProps](client_components_property_base.IPropertyBaseWithRendererProps.md).[searchVariant](client_components_property_base.IPropertyBaseWithRendererProps.md#searchvariant)

#### Defined in

[client/components/property/base.tsx:33](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/base.tsx#L33)

___

### showAsInvalid

• `Optional` **showAsInvalid**: `boolean`

make it seem as invalid, allows displaying an entry property as invalid

#### Defined in

[client/components/property/base.tsx:77](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/base.tsx#L77)

___

### suppressWarnings

• `Optional` **suppressWarnings**: `boolean`

Suppress hidden warning

#### Defined in

[client/components/property/base.tsx:141](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/base.tsx#L141)

## Methods

### onEntryDrivenChange

▸ `Optional` **onEntryDrivenChange**(`value`): `void`

an optional function to get the value as the property changes
these changes are given by the entry and do not come when
the property change due to an external force

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) |

#### Returns

`void`

#### Defined in

[client/components/property/base.tsx:73](https://github.com/onzag/itemize/blob/f2db74a5/client/components/property/base.tsx#L73)
