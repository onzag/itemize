[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/localization/I18nRead](../modules/client_components_localization_I18nRead.md) / II18nReadProps

# Interface: II18nReadProps

[client/components/localization/I18nRead](../modules/client_components_localization_I18nRead.md).II18nReadProps

The read props which takes the following data

## Hierarchy

- [`I18nReadOptions`](client_components_localization_I18nRead.I18nReadOptions.md)

  ↳ **`II18nReadProps`**

## Table of contents

### Properties

- [args](client_components_localization_I18nRead.II18nReadProps.md#args)
- [argsContentBitsWrapper](client_components_localization_I18nRead.II18nReadProps.md#argscontentbitswrapper)
- [capitalize](client_components_localization_I18nRead.II18nReadProps.md#capitalize)
- [children](client_components_localization_I18nRead.II18nReadProps.md#children)
- [context](client_components_localization_I18nRead.II18nReadProps.md#context)
- [html](client_components_localization_I18nRead.II18nReadProps.md#html)
- [htmlWrappingTag](client_components_localization_I18nRead.II18nReadProps.md#htmlwrappingtag)
- [id](client_components_localization_I18nRead.II18nReadProps.md#id)
- [policyName](client_components_localization_I18nRead.II18nReadProps.md#policyname)
- [policyType](client_components_localization_I18nRead.II18nReadProps.md#policytype)
- [propertyId](client_components_localization_I18nRead.II18nReadProps.md#propertyid)
- [whiteSpace](client_components_localization_I18nRead.II18nReadProps.md#whitespace)

## Properties

### args

• `Optional` **args**: `any`[]

Arbitrary parameters to replace dynamic i18n strings
these can be plain string, for simple replacement or literal react
objects, using react objects will produce a react node as output
rather than a string

#### Inherited from

[I18nReadOptions](client_components_localization_I18nRead.I18nReadOptions.md).[args](client_components_localization_I18nRead.I18nReadOptions.md#args)

#### Defined in

[client/components/localization/I18nRead.tsx:85](https://github.com/onzag/itemize/blob/59702dd5/client/components/localization/I18nRead.tsx#L85)

___

### argsContentBitsWrapper

• `Optional` **argsContentBitsWrapper**: (`text`: `string`) => `ReactNode`

#### Type declaration

▸ (`text`): `ReactNode`

used to wrap the content bits that are not part of the args
since the args can be anything and they can be wrapped react components
or strings, this will affect anything that is not the args if set

##### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

##### Returns

`ReactNode`

#### Inherited from

[I18nReadOptions](client_components_localization_I18nRead.I18nReadOptions.md).[argsContentBitsWrapper](client_components_localization_I18nRead.I18nReadOptions.md#argscontentbitswrapper)

#### Defined in

[client/components/localization/I18nRead.tsx:91](https://github.com/onzag/itemize/blob/59702dd5/client/components/localization/I18nRead.tsx#L91)

___

### capitalize

• `Optional` **capitalize**: `boolean`

Whether to capitalize the output

#### Inherited from

[I18nReadOptions](client_components_localization_I18nRead.I18nReadOptions.md).[capitalize](client_components_localization_I18nRead.I18nReadOptions.md#capitalize)

#### Defined in

[client/components/localization/I18nRead.tsx:105](https://github.com/onzag/itemize/blob/59702dd5/client/components/localization/I18nRead.tsx#L105)

___

### children

• `Optional` **children**: (`value`: `ReactNode`) => `ReactNode`

#### Type declaration

▸ (`value`): `ReactNode`

The actually value is passed in this function, if required
otherwise it's just rendered

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `ReactNode` |

##### Returns

`ReactNode`

#### Defined in

[client/components/localization/I18nRead.tsx:121](https://github.com/onzag/itemize/blob/59702dd5/client/components/localization/I18nRead.tsx#L121)

___

### context

• `Optional` **context**: `string`

A context to override the current pass a registry key

#### Inherited from

[I18nReadOptions](client_components_localization_I18nRead.I18nReadOptions.md).[context](client_components_localization_I18nRead.I18nReadOptions.md#context)

#### Defined in

[client/components/localization/I18nRead.tsx:66](https://github.com/onzag/itemize/blob/59702dd5/client/components/localization/I18nRead.tsx#L66)

___

### html

• `Optional` **html**: `boolean`

Dangerous!... whether the content represents html instead of a plain string
does not mix well with args if the output generated is a react node that
does not serialize

#### Inherited from

[I18nReadOptions](client_components_localization_I18nRead.I18nReadOptions.md).[html](client_components_localization_I18nRead.I18nReadOptions.md#html)

#### Defined in

[client/components/localization/I18nRead.tsx:97](https://github.com/onzag/itemize/blob/59702dd5/client/components/localization/I18nRead.tsx#L97)

___

### htmlWrappingTag

• `Optional` **htmlWrappingTag**: `string`

The wrapping tag for using in the html mode, by default is a div

#### Inherited from

[I18nReadOptions](client_components_localization_I18nRead.I18nReadOptions.md).[htmlWrappingTag](client_components_localization_I18nRead.I18nReadOptions.md#htmlwrappingtag)

#### Defined in

[client/components/localization/I18nRead.tsx:101](https://github.com/onzag/itemize/blob/59702dd5/client/components/localization/I18nRead.tsx#L101)

___

### id

• **id**: `string`

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

#### Inherited from

[I18nReadOptions](client_components_localization_I18nRead.I18nReadOptions.md).[id](client_components_localization_I18nRead.I18nReadOptions.md#id)

#### Defined in

[client/components/localization/I18nRead.tsx:62](https://github.com/onzag/itemize/blob/59702dd5/client/components/localization/I18nRead.tsx#L62)

___

### policyName

• `Optional` **policyName**: `string`

A policy name to use as context, must go along policy type

#### Inherited from

[I18nReadOptions](client_components_localization_I18nRead.I18nReadOptions.md).[policyName](client_components_localization_I18nRead.I18nReadOptions.md#policyname)

#### Defined in

[client/components/localization/I18nRead.tsx:78](https://github.com/onzag/itemize/blob/59702dd5/client/components/localization/I18nRead.tsx#L78)

___

### policyType

• `Optional` **policyType**: `string`

A policy type to use as context, must go along policy name

#### Inherited from

[I18nReadOptions](client_components_localization_I18nRead.I18nReadOptions.md).[policyType](client_components_localization_I18nRead.I18nReadOptions.md#policytype)

#### Defined in

[client/components/localization/I18nRead.tsx:74](https://github.com/onzag/itemize/blob/59702dd5/client/components/localization/I18nRead.tsx#L74)

___

### propertyId

• `Optional` **propertyId**: `string`

A property id to use as context

#### Inherited from

[I18nReadOptions](client_components_localization_I18nRead.I18nReadOptions.md).[propertyId](client_components_localization_I18nRead.I18nReadOptions.md#propertyid)

#### Defined in

[client/components/localization/I18nRead.tsx:70](https://github.com/onzag/itemize/blob/59702dd5/client/components/localization/I18nRead.tsx#L70)

___

### whiteSpace

• `Optional` **whiteSpace**: `string`

Override for the whitespace style property

#### Inherited from

[I18nReadOptions](client_components_localization_I18nRead.I18nReadOptions.md).[whiteSpace](client_components_localization_I18nRead.I18nReadOptions.md#whitespace)

#### Defined in

[client/components/localization/I18nRead.tsx:110](https://github.com/onzag/itemize/blob/59702dd5/client/components/localization/I18nRead.tsx#L110)
