[](../README.md) / [Exports](../modules.md) / client/fast-prototyping/renderers/PropertyEntry/PropertyEntrySelect

# Module: client/fast-prototyping/renderers/PropertyEntry/PropertyEntrySelect

Contains the select entry field renderer for fast prototyping

The select entry field renderer is used for types, number, integer and string when
they have defined values

## Table of contents

### Variables

- [default](client_fast_prototyping_renderers_propertyentry_propertyentryselect.md#default)
- [style](client_fast_prototyping_renderers_propertyentry_propertyentryselect.md#style)

## Variables

### default

• `Const` **default**: *ComponentType*<*Pick*<IPropertyEntrySelectRendererWithStylesProps, *propertyId* \| *args* \| *rtl* \| *icon* \| *disabled* \| *label* \| *placeholder* \| *description* \| *currentAppliedValue* \| *canRestore* \| *currentValue* \| *currentValid* \| *currentInvalidReason* \| *currentInternalValue* \| *autoFocus* \| *enableUserSetErrors* \| *onChange* \| *onRestore* \| *isNullable* \| *values* \| *nullValue* \| *isNumeric* \| *currentI18nValue*\> & *StyledComponentProps*<*entry* \| *icon* \| *label* \| *description* \| *container* \| *errorMessage* \| *fieldInput* \| *selectFieldIconWhenAddornmentIsActive*\> & [*IPropertyEntrySelectRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md)\>

The property entry select is the renderer used when the property has specific valid values
these valid values are only supported as either string or number, so only types string, text,
integer, year and number are truly supported for this

Supported renderer args:
- descriptionAsAlert: displays the description if exists as alert rather than the standard

Defined in: [client/fast-prototyping/renderers/PropertyEntry/PropertyEntrySelect.tsx:253](https://github.com/onzag/itemize/blob/0e9b128c/client/fast-prototyping/renderers/PropertyEntry/PropertyEntrySelect.tsx#L253)

___

### style

• `Const` **style**: *Record*<*entry* \| *icon* \| *label* \| *description* \| *container* \| *errorMessage* \| *fieldInput* \| *selectFieldIconWhenAddornmentIsActive*, CSSProperties \| CreateCSSProperties<[*IPropertyEntrySelectRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md)\> \| PropsFunc<[*IPropertyEntrySelectRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md), CreateCSSProperties<[*IPropertyEntrySelectRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md)\>\>\>

The styles for the select

Defined in: [client/fast-prototyping/renderers/PropertyEntry/PropertyEntrySelect.tsx:41](https://github.com/onzag/itemize/blob/0e9b128c/client/fast-prototyping/renderers/PropertyEntry/PropertyEntrySelect.tsx#L41)
