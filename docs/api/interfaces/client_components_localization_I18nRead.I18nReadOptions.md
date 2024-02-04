[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/localization/I18nRead](../modules/client_components_localization_I18nRead.md) / I18nReadOptions

# Interface: I18nReadOptions

[client/components/localization/I18nRead](../modules/client_components_localization_I18nRead.md).I18nReadOptions

## Hierarchy

- **`I18nReadOptions`**

  ↳ [`II18nReadProps`](client_components_localization_I18nRead.II18nReadProps.md)

## Table of contents

### Properties

- [args](client_components_localization_I18nRead.I18nReadOptions.md#args)
- [argsContentBitsWrapper](client_components_localization_I18nRead.I18nReadOptions.md#argscontentbitswrapper)
- [capitalize](client_components_localization_I18nRead.I18nReadOptions.md#capitalize)
- [context](client_components_localization_I18nRead.I18nReadOptions.md#context)
- [html](client_components_localization_I18nRead.I18nReadOptions.md#html)
- [htmlWrappingTag](client_components_localization_I18nRead.I18nReadOptions.md#htmlwrappingtag)
- [id](client_components_localization_I18nRead.I18nReadOptions.md#id)
- [policyName](client_components_localization_I18nRead.I18nReadOptions.md#policyname)
- [policyType](client_components_localization_I18nRead.I18nReadOptions.md#policytype)
- [propertyId](client_components_localization_I18nRead.I18nReadOptions.md#propertyid)
- [whiteSpace](client_components_localization_I18nRead.I18nReadOptions.md#whitespace)

## Properties

### args

• `Optional` **args**: `any`[]

Arbitrary parameters to replace dynamic i18n strings
these can be plain string, for simple replacement or literal react
objects, using react objects will produce a react node as output
rather than a string

#### Defined in

[client/components/localization/I18nRead.tsx:85](https://github.com/onzag/itemize/blob/73e0c39e/client/components/localization/I18nRead.tsx#L85)

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

#### Defined in

[client/components/localization/I18nRead.tsx:91](https://github.com/onzag/itemize/blob/73e0c39e/client/components/localization/I18nRead.tsx#L91)

___

### capitalize

• `Optional` **capitalize**: `boolean`

Whether to capitalize the output

#### Defined in

[client/components/localization/I18nRead.tsx:105](https://github.com/onzag/itemize/blob/73e0c39e/client/components/localization/I18nRead.tsx#L105)

___

### context

• `Optional` **context**: `string`

A context to override the current pass a registry key

#### Defined in

[client/components/localization/I18nRead.tsx:66](https://github.com/onzag/itemize/blob/73e0c39e/client/components/localization/I18nRead.tsx#L66)

___

### html

• `Optional` **html**: `boolean`

Dangerous!... whether the content represents html instead of a plain string
does not mix well with args if the output generated is a react node that
does not serialize

#### Defined in

[client/components/localization/I18nRead.tsx:97](https://github.com/onzag/itemize/blob/73e0c39e/client/components/localization/I18nRead.tsx#L97)

___

### htmlWrappingTag

• `Optional` **htmlWrappingTag**: `string`

The wrapping tag for using in the html mode, by default is a div

#### Defined in

[client/components/localization/I18nRead.tsx:101](https://github.com/onzag/itemize/blob/73e0c39e/client/components/localization/I18nRead.tsx#L101)

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

#### Defined in

[client/components/localization/I18nRead.tsx:62](https://github.com/onzag/itemize/blob/73e0c39e/client/components/localization/I18nRead.tsx#L62)

___

### policyName

• `Optional` **policyName**: `string`

A policy name to use as context, must go along policy type

#### Defined in

[client/components/localization/I18nRead.tsx:78](https://github.com/onzag/itemize/blob/73e0c39e/client/components/localization/I18nRead.tsx#L78)

___

### policyType

• `Optional` **policyType**: `string`

A policy type to use as context, must go along policy name

#### Defined in

[client/components/localization/I18nRead.tsx:74](https://github.com/onzag/itemize/blob/73e0c39e/client/components/localization/I18nRead.tsx#L74)

___

### propertyId

• `Optional` **propertyId**: `string`

A property id to use as context

#### Defined in

[client/components/localization/I18nRead.tsx:70](https://github.com/onzag/itemize/blob/73e0c39e/client/components/localization/I18nRead.tsx#L70)

___

### whiteSpace

• `Optional` **whiteSpace**: `string`

Override for the whitespace style property

#### Defined in

[client/components/localization/I18nRead.tsx:110](https://github.com/onzag/itemize/blob/73e0c39e/client/components/localization/I18nRead.tsx#L110)
