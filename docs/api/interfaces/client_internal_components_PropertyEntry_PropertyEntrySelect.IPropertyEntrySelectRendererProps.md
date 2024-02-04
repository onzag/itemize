[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntrySelect](../modules/client_internal_components_PropertyEntry_PropertyEntrySelect.md) / IPropertyEntrySelectRendererProps

# Interface: IPropertyEntrySelectRendererProps

[client/internal/components/PropertyEntry/PropertyEntrySelect](../modules/client_internal_components_PropertyEntry_PropertyEntrySelect.md).IPropertyEntrySelectRendererProps

The renderer props for implementing the select renderer that pops in
when a property has specific valid values

The select handler and renderer is one of the simplest of its kind

## Hierarchy

- [`IPropertyEntryRendererProps`](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md)\<`string` \| `number` \| `string`[] \| `number`[]\>

  ↳ **`IPropertyEntrySelectRendererProps`**

## Table of contents

### Properties

- [args](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md#args)
- [autoFocus](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md#autofocus)
- [canRestore](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md#canrestore)
- [currentAppliedValue](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md#currentappliedvalue)
- [currentI18nValue](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md#currenti18nvalue)
- [currentInternalValue](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md#currentinternalvalue)
- [currentInvalidReason](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md#currentinvalidreason)
- [currentValid](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md#currentvalid)
- [currentValue](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md#currentvalue)
- [description](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md#description)
- [disabled](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md#disabled)
- [enableUserSetErrors](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md#enableuserseterrors)
- [isList](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md#islist)
- [isNullable](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md#isnullable)
- [isNumeric](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md#isnumeric)
- [label](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md#label)
- [language](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md#language)
- [languageOverride](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md#languageoverride)
- [nullValue](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md#nullvalue)
- [onChange](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md#onchange)
- [onRestore](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md#onrestore)
- [placeholder](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md#placeholder)
- [propertyId](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md#propertyid)
- [rtl](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md#rtl)
- [uniqueId](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md#uniqueid)
- [values](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md#values)

## Properties

### args

• **args**: `Object`

The renderer args

#### Index signature

▪ [arg: `string`]: `any`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[args](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#args)

#### Defined in

[client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/renderer.ts#L19)

___

### autoFocus

• **autoFocus**: `boolean`

Whether the entry should autofocus

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[autoFocus](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#autofocus)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:107](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L107)

___

### canRestore

• **canRestore**: `boolean`

A boolean, normally true if our current applied value differs from our
current value, this check is exceptional as it uses the local equal function

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[canRestore](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#canrestore)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:79](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L79)

___

### currentAppliedValue

• **currentAppliedValue**: `string` \| `number` \| `string`[] \| `number`[]

The currently applied value that is in sync with the server side

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentAppliedValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentappliedvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:74](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L74)

___

### currentI18nValue

• **currentI18nValue**: `string`

The current value in its localized form

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntrySelect.tsx:49](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntrySelect.tsx#L49)

___

### currentInternalValue

• `Optional` **currentInternalValue**: `any`

The current internal value, if any given

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentInternalValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentinternalvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:102](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L102)

___

### currentInvalidReason

• `Optional` **currentInvalidReason**: `string`

If current valid is false, then there might be a reason
attached to it, this invalid reason is locale specific;
if there's no currently invalid reason, this usually means
the item was forced into the invalid state by the passing
of a flag

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentInvalidReason](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentinvalidreason)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:98](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L98)

___

### currentValid

• **currentValid**: `boolean`

Whether this current value is currently seen as valid, this is a finicky
value that does not correlate directly to the actual property
state; things such as being poked, or the user having forced
a value for this play a role as well

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentValid](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentvalid)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:90](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L90)

___

### currentValue

• **currentValue**: `string` \| `number` \| `string`[] \| `number`[]

The current value

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:83](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L83)

___

### description

• `Optional` **description**: `string`

The description of the property, properties might or might not have descriptions
this is locale specific; the description might not be passed if specified by the UI

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[description](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#description)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:69](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L69)

___

### disabled

• **disabled**: `boolean`

The disabled flag is passed often when the value is somehow
enforced, this means that the field cannot truly be editted
and attempts are futile to modify

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[disabled](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#disabled)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:113](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L113)

___

### enableUserSetErrors

• **enableUserSetErrors**: () => `void`

#### Type declaration

▸ (): `void`

Allows for the display of user set error statuses, normally you
will call this function when your field has been blurred so that
currentInvalidReason gets populated even if the field is not poked

##### Returns

`void`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[enableUserSetErrors](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#enableuserseterrors)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:120](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L120)

___

### isList

• **isList**: `boolean`

Whether it represents a list of values

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntrySelect.tsx:45](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntrySelect.tsx#L45)

___

### isNullable

• **isNullable**: `boolean`

Whether it is nullable, so null should be an option

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntrySelect.tsx:37](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntrySelect.tsx#L37)

___

### isNumeric

• **isNumeric**: `boolean`

Whether it represents a numeric value

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntrySelect.tsx:41](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntrySelect.tsx#L41)

___

### label

• `Optional` **label**: `string`

label of the property, every property should have a label unless it's hidden
this is locale specific

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[label](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#label)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:59](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L59)

___

### language

• **language**: `string`

The current language being used by the client overall in the app

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[language](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#language)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:138](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L138)

___

### languageOverride

• `Optional` **languageOverride**: `string`

An optional language used mainly for the text type to override
own language properties that currently only text supports that

It may be possible for the editor to set its own text language
value if it has its own

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[languageOverride](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#languageoverride)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:147](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L147)

___

### nullValue

• **nullValue**: `Object`

The null value

#### Type declaration

| Name | Type |
| :------ | :------ |
| `i18nValue` | `string` |
| `value` | ``null`` |

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntrySelect.tsx:29](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntrySelect.tsx#L29)

___

### onChange

• **onChange**: (`value`: `string` \| `number` \| `string`[] \| `number`[], `internalValue`: `any`) => `void`

#### Type declaration

▸ (`value`, `internalValue`): `void`

Standard on change function, every renderer will recieve this function
to trigger a change, however sometimes handlers will pass their own
change function that is supposed to be used instead of this one so
caution is advised which one to use

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `number` \| `string`[] \| `number`[] |
| `internalValue` | `any` |

##### Returns

`void`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[onChange](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#onchange)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:128](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L128)

___

### onRestore

• **onRestore**: () => `void`

#### Type declaration

▸ (): `void`

Call in order to trigger restoration, ensure that canRestore is true
when doing this

##### Returns

`void`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[onRestore](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#onrestore)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:133](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L133)

___

### placeholder

• `Optional` **placeholder**: `string`

The placeholder of the property, every property should have a placeholder unless it's hidden
this is locale specific

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[placeholder](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#placeholder)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:64](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L64)

___

### propertyId

• **propertyId**: `string`

The property id in question

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[propertyId](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#propertyid)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:47](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L47)

___

### rtl

• **rtl**: `boolean`

Whether it is in rtl mode for a rtl language

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[rtl](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#rtl)

#### Defined in

[client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/renderer.ts#L15)

___

### uniqueId

• **uniqueId**: `string`

an unique id for this property
with the id and the version they are related to

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[uniqueId](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#uniqueid)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:53](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/index.tsx#L53)

___

### values

• **values**: \{ `i18nValue`: `string` ; `value`: `string` \| `number`  }[]

The values we are working with, an array that contains
how they are going to be displayed in the user's language and the actual value

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntrySelect.tsx:22](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyEntry/PropertyEntrySelect.tsx#L22)
