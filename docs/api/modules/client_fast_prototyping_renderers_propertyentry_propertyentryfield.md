[](../README.md) / [Exports](../modules.md) / client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField

# Module: client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField

The entry for field based (text/number) types

## Table of contents

### Variables

- [default](client_fast_prototyping_renderers_propertyentry_propertyentryfield.md#default)
- [style](client_fast_prototyping_renderers_propertyentry_propertyentryfield.md#style)

## Variables

### default

• `Const` **default**: *ComponentType*<*Pick*<IPropertyEntryFieldRendererWithStylesProps, *currency* \| *unit* \| *type* \| *propertyId* \| *args* \| *rtl* \| *icon* \| *disabled* \| *label* \| *placeholder* \| *description* \| *currentAppliedValue* \| *canRestore* \| *currentValue* \| *currentValid* \| *currentInvalidReason* \| *currentInternalValue* \| *autoFocus* \| *enableUserSetErrors* \| *onChange* \| *onRestore* \| *subtype* \| *htmlAutocomplete* \| *isNumericType* \| *currentTextualValue* \| *onChangeByTextualValue* \| *currencyFormat* \| *currencyAvailable* \| *currencyI18n* \| *onChangeCurrency* \| *unitPrimary* \| *unitPrimaryImperial* \| *unitOptions* \| *unitImperialOptions* \| *unitPrefersImperial* \| *unitIsLockedToPrimaries* \| *unitI18n* \| *unitToNode* \| *onChangeUnit*\> & *StyledComponentProps*<*entry* \| *label* \| *description* \| *container* \| *labelSingleLine* \| *errorMessage* \| *iconButton* \| *fieldInput* \| *standardAddornment* \| *smallAddornment* \| *iconButtonPassword* \| *iconButtonSmall* \| *textButton* \| *unitDialog* \| *unitDialogSubheader*\> & [*IPropertyEntryFieldRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md)\>

The entry field renderer, as a class, because it's fairly complicated, this renderer handles basic
types that are displayed as a single line text, this includes some numeric types, and even some complex types
such as unit and currency, this is because unlike other types their primary use is just writting something

Supported args
- descriptionAsAlert: the description as alert rather than the standard
- onEnter: A function that triggers when the enter key is pressed

Defined in: [client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx:650](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx#L650)

___

### style

• `Const` **style**: *Record*<*entry* \| *label* \| *description* \| *container* \| *labelSingleLine* \| *errorMessage* \| *iconButton* \| *fieldInput* \| *standardAddornment* \| *smallAddornment* \| *iconButtonPassword* \| *iconButtonSmall* \| *textButton* \| *unitDialog* \| *unitDialogSubheader*, CSSProperties \| CreateCSSProperties<[*IPropertyEntryFieldRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md)\> \| PropsFunc<[*IPropertyEntryFieldRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md), CreateCSSProperties<[*IPropertyEntryFieldRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md)\>\>\>

The styles for the field

Defined in: [client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx:43](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryField.tsx#L43)
