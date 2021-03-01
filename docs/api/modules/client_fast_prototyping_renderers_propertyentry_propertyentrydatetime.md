[](../README.md) / [Exports](../modules.md) / client/fast-prototyping/renderers/PropertyEntry/PropertyEntryDateTime

# Module: client/fast-prototyping/renderers/PropertyEntry/PropertyEntryDateTime

The property entry date time for fast prototyping

## Table of contents

### Variables

- [default](client_fast_prototyping_renderers_propertyentry_propertyentrydatetime.md#default)
- [style](client_fast_prototyping_renderers_propertyentry_propertyentrydatetime.md#style)

## Variables

### default

• `Const` **default**: *ComponentType*<*Pick*<IPropertyEntryDateTimeRendererWithStylesProps, *type* \| *propertyId* \| *args* \| *rtl* \| *icon* \| *disabled* \| *label* \| *placeholder* \| *description* \| *currentAppliedValue* \| *canRestore* \| *currentValue* \| *currentValid* \| *currentInvalidReason* \| *currentInternalValue* \| *autoFocus* \| *enableUserSetErrors* \| *onChange* \| *onRestore* \| *i18nOk* \| *momentValue* \| *i18nCancel* \| *onChangeByMoment* \| *dateTimeFormat*\> & *StyledComponentProps*<*entry* \| *label* \| *description* \| *container* \| *errorMessage* \| *iconButton* \| *fieldInput*\> & [*IPropertyEntryDateTimeRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md)\>

The date time renderer, it uses material ui in order to create very nice pickers for the user
these pickers are smart and will make a difference on whether it's a mobile or a computer,
it supports the following renderer args

- descriptionAsAlert: shows the description as an alert rather than the default

**`param`** the entry props

**`returns`** a react element

Defined in: [client/fast-prototyping/renderers/PropertyEntry/PropertyEntryDateTime.tsx:108](https://github.com/onzag/itemize/blob/5fcde7cf/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryDateTime.tsx#L108)

___

### style

• `Const` **style**: *Record*<*entry* \| *label* \| *description* \| *container* \| *errorMessage* \| *iconButton* \| *fieldInput*, CSSProperties \| CreateCSSProperties<[*IPropertyEntryDateTimeRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md)\> \| PropsFunc<[*IPropertyEntryDateTimeRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md), CreateCSSProperties<[*IPropertyEntryDateTimeRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md)\>\>\>

The styles for the date time entry

Defined in: [client/fast-prototyping/renderers/PropertyEntry/PropertyEntryDateTime.tsx:31](https://github.com/onzag/itemize/blob/5fcde7cf/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryDateTime.tsx#L31)
