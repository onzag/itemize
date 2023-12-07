[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyEntry](../modules/client_internal_components_PropertyEntry.md) / IPropertyEntryRendererProps

# Interface: IPropertyEntryRendererProps<ValueType\>

[client/internal/components/PropertyEntry](../modules/client_internal_components_PropertyEntry.md).IPropertyEntryRendererProps

This is what every renderer gets regardless of type as long as it's an entry
type, it will get this instance as its props, the ValueType represents the property definition
type it epects as its current value

Expect these to be extended

## Type parameters

| Name |
| :------ |
| `ValueType` |

## Hierarchy

- [`IRendererProps`](client_internal_renderer.IRendererProps.md)

  ↳ **`IPropertyEntryRendererProps`**

  ↳↳ [`IPropertyEntryBooleanRendererProps`](client_internal_components_PropertyEntry_PropertyEntryBoolean.IPropertyEntryBooleanRendererProps.md)

  ↳↳ [`IPropertyEntryDateTimeRendererProps`](client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md)

  ↳↳ [`IPropertyEntryFieldRendererProps`](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)

  ↳↳ [`IPropertyEntryFileRendererProps`](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md)

  ↳↳ [`IPropertyEntryFilesRendererProps`](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md)

  ↳↳ [`IPropertyEntryLocationRendererProps`](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md)

  ↳↳ [`IPropertyEntryPaymentRendererProps`](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md)

  ↳↳ [`IPropertyEntrySelectRendererProps`](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md)

  ↳↳ [`IPropertyEntryTagListRendererProps`](client_internal_components_PropertyEntry_PropertyEntryTagList.IPropertyEntryTagListRendererProps.md)

  ↳↳ [`IPropertyEntryTextRendererProps`](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)

## Table of contents

### Properties

- [args](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#args)
- [autoFocus](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#autofocus)
- [canRestore](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#canrestore)
- [currentAppliedValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentappliedvalue)
- [currentInternalValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentinternalvalue)
- [currentInvalidReason](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentinvalidreason)
- [currentValid](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentvalid)
- [currentValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentvalue)
- [description](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#description)
- [disabled](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#disabled)
- [label](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#label)
- [language](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#language)
- [languageOverride](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#languageoverride)
- [placeholder](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#placeholder)
- [propertyId](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#propertyid)
- [rtl](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#rtl)
- [uniqueId](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#uniqueid)

### Methods

- [enableUserSetErrors](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#enableuserseterrors)
- [onChange](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#onchange)
- [onRestore](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#onrestore)

## Properties

### args

• **args**: `Object`

The renderer args

#### Index signature

▪ [arg: `string`]: `any`

#### Inherited from

[IRendererProps](client_internal_renderer.IRendererProps.md).[args](client_internal_renderer.IRendererProps.md#args)

#### Defined in

[client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/a24376ed/client/internal/renderer.ts#L19)

___

### autoFocus

• **autoFocus**: `boolean`

Whether the entry should autofocus

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:107](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L107)

___

### canRestore

• **canRestore**: `boolean`

A boolean, normally true if our current applied value differs from our
current value, this check is exceptional as it uses the local equal function

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:79](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L79)

___

### currentAppliedValue

• **currentAppliedValue**: `ValueType`

The currently applied value that is in sync with the server side

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:74](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L74)

___

### currentInternalValue

• `Optional` **currentInternalValue**: `any`

The current internal value, if any given

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:102](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L102)

___

### currentInvalidReason

• `Optional` **currentInvalidReason**: `string`

If current valid is false, then there might be a reason
attached to it, this invalid reason is locale specific;
if there's no currently invalid reason, this usually means
the item was forced into the invalid state by the passing
of a flag

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:98](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L98)

___

### currentValid

• **currentValid**: `boolean`

Whether this current value is currently seen as valid, this is a finicky
value that does not correlate directly to the actual property
state; things such as being poked, or the user having forced
a value for this play a role as well

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:90](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L90)

___

### currentValue

• **currentValue**: `ValueType`

The current value

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:83](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L83)

___

### description

• `Optional` **description**: `string`

The description of the property, properties might or might not have descriptions
this is locale specific; the description might not be passed if specified by the UI

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:69](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L69)

___

### disabled

• **disabled**: `boolean`

The disabled flag is passed often when the value is somehow
enforced, this means that the field cannot truly be editted
and attempts are futile to modify

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:113](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L113)

___

### label

• `Optional` **label**: `string`

label of the property, every property should have a label unless it's hidden
this is locale specific

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:59](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L59)

___

### language

• **language**: `string`

The current language being used by the client overall in the app

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:138](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L138)

___

### languageOverride

• `Optional` **languageOverride**: `string`

An optional language used mainly for the text type to override
own language properties that currently only text supports that

It may be possible for the editor to set its own text language
value if it has its own

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:147](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L147)

___

### placeholder

• `Optional` **placeholder**: `string`

The placeholder of the property, every property should have a placeholder unless it's hidden
this is locale specific

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:64](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L64)

___

### propertyId

• **propertyId**: `string`

The property id in question

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:47](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L47)

___

### rtl

• **rtl**: `boolean`

Whether it is in rtl mode for a rtl language

#### Inherited from

[IRendererProps](client_internal_renderer.IRendererProps.md).[rtl](client_internal_renderer.IRendererProps.md#rtl)

#### Defined in

[client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/a24376ed/client/internal/renderer.ts#L15)

___

### uniqueId

• **uniqueId**: `string`

an unique id for this property
with the id and the version they are related to

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:53](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L53)

## Methods

### enableUserSetErrors

▸ **enableUserSetErrors**(): `void`

Allows for the display of user set error statuses, normally you
will call this function when your field has been blurred so that
currentInvalidReason gets populated even if the field is not poked

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:120](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L120)

___

### onChange

▸ **onChange**(`value`, `internalValue`): `void`

Standard on change function, every renderer will recieve this function
to trigger a change, however sometimes handlers will pass their own
change function that is supposed to be used instead of this one so
caution is advised which one to use

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `ValueType` |
| `internalValue` | `any` |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:128](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L128)

___

### onRestore

▸ **onRestore**(): `void`

Call in order to trigger restoration, ensure that canRestore is true
when doing this

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:133](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/index.tsx#L133)
