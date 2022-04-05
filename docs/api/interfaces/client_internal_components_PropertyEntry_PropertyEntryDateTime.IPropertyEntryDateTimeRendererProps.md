[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryDateTime](../modules/client_internal_components_PropertyEntry_PropertyEntryDateTime.md) / IPropertyEntryDateTimeRendererProps

# Interface: IPropertyEntryDateTimeRendererProps

[client/internal/components/PropertyEntry/PropertyEntryDateTime](../modules/client_internal_components_PropertyEntry_PropertyEntryDateTime.md).IPropertyEntryDateTimeRendererProps

## Hierarchy

- [`IPropertyEntryRendererProps`](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md)<[`PropertyDefinitionSupportedDateType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_date.md#propertydefinitionsupporteddatetype)\>

  ↳ **`IPropertyEntryDateTimeRendererProps`**

## Table of contents

### Properties

- [args](client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md#args)
- [autoFocus](client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md#autofocus)
- [canRestore](client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md#canrestore)
- [currentAppliedValue](client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md#currentappliedvalue)
- [currentInternalValue](client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md#currentinternalvalue)
- [currentInvalidReason](client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md#currentinvalidreason)
- [currentValid](client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md#currentvalid)
- [currentValue](client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md#currentvalue)
- [dateTimeFormat](client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md#datetimeformat)
- [description](client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md#description)
- [disabled](client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md#disabled)
- [i18nCancel](client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md#i18ncancel)
- [i18nOk](client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md#i18nok)
- [icon](client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md#icon)
- [label](client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md#label)
- [momentValue](client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md#momentvalue)
- [placeholder](client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md#placeholder)
- [propertyId](client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md#propertyid)
- [rtl](client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md#rtl)
- [type](client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md#type)

### Methods

- [enableUserSetErrors](client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md#enableuserseterrors)
- [onChange](client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md#onchange)
- [onChangeByMoment](client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md#onchangebymoment)
- [onRestore](client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md#onrestore)

## Properties

### args

• **args**: `Object`

The renderer args

#### Index signature

▪ [arg: `string`]: `any`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[args](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#args)

#### Defined in

[client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/renderer.ts#L19)

___

### autoFocus

• **autoFocus**: `boolean`

Whether the entry should autofocus

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[autoFocus](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#autofocus)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:105](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L105)

___

### canRestore

• **canRestore**: `boolean`

A boolean, normally true if our current applied value differs from our
current value, this check is exceptional as it uses the local equal function

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[canRestore](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#canrestore)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:77](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L77)

___

### currentAppliedValue

• **currentAppliedValue**: `string`

The currently applied value that is in sync with the server side

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentAppliedValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentappliedvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:72](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L72)

___

### currentInternalValue

• `Optional` **currentInternalValue**: `any`

The current internal value, if any given

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentInternalValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentinternalvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:100](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L100)

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

[client/internal/components/PropertyEntry/index.tsx:96](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L96)

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

[client/internal/components/PropertyEntry/index.tsx:88](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L88)

___

### currentValue

• **currentValue**: `string`

The current value

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[currentValue](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#currentvalue)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:81](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L81)

___

### dateTimeFormat

• **dateTimeFormat**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx:51](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx#L51)

___

### description

• `Optional` **description**: `string`

The description of the property, properties might or might not have descriptions
this is locale specific; the description might not be passed if specified by the UI

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[description](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#description)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:63](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L63)

___

### disabled

• **disabled**: `boolean`

The disabled flag is passed often when the value is somehow
enforced, this means that the field cannot truly be editted
and attempts are futile to modify

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[disabled](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#disabled)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:111](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L111)

___

### i18nCancel

• **i18nCancel**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx:48](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx#L48)

___

### i18nOk

• **i18nOk**: `string`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx:49](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx#L49)

___

### icon

• `Optional` **icon**: `ReactNode`

Icon are an UI defined property for an icon to use during the view, handle as you wish

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[icon](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#icon)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:67](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L67)

___

### label

• `Optional` **label**: `string`

label of the property, every property should have a label unless it's hidden
this is locale specific

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[label](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#label)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:53](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L53)

___

### momentValue

• **momentValue**: `any`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx:47](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx#L47)

___

### placeholder

• `Optional` **placeholder**: `string`

The placeholder of the property, every property should have a placeholder unless it's hidden
this is locale specific

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[placeholder](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#placeholder)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:58](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L58)

___

### propertyId

• **propertyId**: `string`

The property id in question

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[propertyId](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#propertyid)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:47](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L47)

___

### rtl

• **rtl**: `boolean`

Whether it is in rtl mode for a rtl language

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[rtl](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#rtl)

#### Defined in

[client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/renderer.ts#L15)

___

### type

• **type**: ``"date"`` \| ``"datetime"`` \| ``"time"``

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx:46](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx#L46)

## Methods

### enableUserSetErrors

▸ **enableUserSetErrors**(): `void`

Allows for the display of user set error statuses, normally you
will call this function when your field has been blurred so that
currentInvalidReason gets populated even if the field is not poked

#### Returns

`void`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[enableUserSetErrors](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#enableuserseterrors)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:118](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L118)

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

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[onChange](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#onchange)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:126](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L126)

___

### onChangeByMoment

▸ **onChangeByMoment**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx:50](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/PropertyEntryDateTime.tsx#L50)

___

### onRestore

▸ **onRestore**(): `void`

Call in order to trigger restoration, ensure that canRestore is true
when doing this

#### Returns

`void`

#### Inherited from

[IPropertyEntryRendererProps](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md).[onRestore](client_internal_components_PropertyEntry.IPropertyEntryRendererProps.md#onrestore)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:131](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/components/PropertyEntry/index.tsx#L131)
