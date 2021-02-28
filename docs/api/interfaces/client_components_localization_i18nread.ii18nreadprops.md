[](../README.md) / [Exports](../modules.md) / [client/components/localization/I18nRead](../modules/client_components_localization_i18nread.md) / II18nReadProps

# Interface: II18nReadProps

[client/components/localization/I18nRead](../modules/client_components_localization_i18nread.md).II18nReadProps

The read props which takes the following data

## Table of contents

### Properties

- [args](client_components_localization_i18nread.ii18nreadprops.md#args)
- [capitalize](client_components_localization_i18nread.ii18nreadprops.md#capitalize)
- [children](client_components_localization_i18nread.ii18nreadprops.md#children)
- [html](client_components_localization_i18nread.ii18nreadprops.md#html)
- [htmlWrappingTag](client_components_localization_i18nread.ii18nreadprops.md#htmlwrappingtag)
- [id](client_components_localization_i18nread.ii18nreadprops.md#id)
- [policyName](client_components_localization_i18nread.ii18nreadprops.md#policyname)
- [policyType](client_components_localization_i18nread.ii18nreadprops.md#policytype)
- [propertyId](client_components_localization_i18nread.ii18nreadprops.md#propertyid)

## Properties

### args

• `Optional` **args**: *any*[]

Arbitrary parameters to replace dynamic i18n strings
these can be plain string, for simple replacement or literal react
objects, using react objects will produce a react node as output
rather than a string

Defined in: [client/components/localization/I18nRead.tsx:82](https://github.com/onzag/itemize/blob/11a98dec/client/components/localization/I18nRead.tsx#L82)

___

### capitalize

• `Optional` **capitalize**: *boolean*

Whether to capitalize the output

Defined in: [client/components/localization/I18nRead.tsx:101](https://github.com/onzag/itemize/blob/11a98dec/client/components/localization/I18nRead.tsx#L101)

___

### children

• `Optional` **children**: (`value`: ReactNode) => ReactNode

The actually value is passed in this function, if required
otherwise it's just rendered

#### Type declaration:

▸ (`value`: ReactNode): ReactNode

#### Parameters:

Name | Type |
:------ | :------ |
`value` | ReactNode |

**Returns:** ReactNode

Defined in: [client/components/localization/I18nRead.tsx:97](https://github.com/onzag/itemize/blob/11a98dec/client/components/localization/I18nRead.tsx#L97)

Defined in: [client/components/localization/I18nRead.tsx:97](https://github.com/onzag/itemize/blob/11a98dec/client/components/localization/I18nRead.tsx#L97)

___

### html

• `Optional` **html**: *boolean*

Dangerous!... whether the content represents html instead of a plain string
does not mix well with args if the output generated is a react node that
does not serialize

Defined in: [client/components/localization/I18nRead.tsx:88](https://github.com/onzag/itemize/blob/11a98dec/client/components/localization/I18nRead.tsx#L88)

___

### htmlWrappingTag

• `Optional` **htmlWrappingTag**: *string*

The wrapping tag for using in the html mode, by default is a div

Defined in: [client/components/localization/I18nRead.tsx:92](https://github.com/onzag/itemize/blob/11a98dec/client/components/localization/I18nRead.tsx#L92)

___

### id

• **id**: *string*

The id to read, very context dependent

if propertyId is specified it will use the "properties" context for that property first
if policy type and policy name specified it will use the context for such as well
if nothing found (or no propertyId or policy) it will go into the next context

if in an include context it will read from the include context itself for its standard
localized properties, if nothing found it will go into the next context

if in an item definition context (normal, extended, or search mode) it will read the item definition
from the base context, note that custom, properties do not need to be "custom.myid" they can
just be "myid" if nothing found (or no context) it will go to the next context

if in a module context it will rea from the module base context, same rule applies for custom
as item definition, if nothing found (or no module context) it will go to the next context

the root context is the last, and reads from the base root properties or the main i18n data properties
if nothing found in this last context, an error is thrown

Defined in: [client/components/localization/I18nRead.tsx:63](https://github.com/onzag/itemize/blob/11a98dec/client/components/localization/I18nRead.tsx#L63)

___

### policyName

• `Optional` **policyName**: *string*

A policy name to use as context, must go along policy type

Defined in: [client/components/localization/I18nRead.tsx:75](https://github.com/onzag/itemize/blob/11a98dec/client/components/localization/I18nRead.tsx#L75)

___

### policyType

• `Optional` **policyType**: *string*

A policy type to use as context, must go along policy name

Defined in: [client/components/localization/I18nRead.tsx:71](https://github.com/onzag/itemize/blob/11a98dec/client/components/localization/I18nRead.tsx#L71)

___

### propertyId

• `Optional` **propertyId**: *string*

A property id to use as context

Defined in: [client/components/localization/I18nRead.tsx:67](https://github.com/onzag/itemize/blob/11a98dec/client/components/localization/I18nRead.tsx#L67)
