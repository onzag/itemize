[](../README.md) / [Exports](../modules.md) / client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference

# Module: client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference

This file provides a fast prototyping renderer for the reference type, which is basically
an integer but acts differently

## Table of contents

### Variables

- [default](client_fast_prototyping_renderers_propertyentry_propertyentryreference.md#default)
- [style](client_fast_prototyping_renderers_propertyentry_propertyentryreference.md#style)

## Variables

### default

• `Const` **default**: *ComponentType*<*Pick*<IPropertyEntryReferenceRendererWithStylesProps, *propertyId* \| *args* \| *rtl* \| *icon* \| *disabled* \| *label* \| *placeholder* \| *description* \| *currentAppliedValue* \| *canRestore* \| *currentValue* \| *currentValid* \| *currentInvalidReason* \| *currentInternalValue* \| *autoFocus* \| *enableUserSetErrors* \| *onChange* \| *onRestore* \| *currentTextualValue* \| *isNullable* \| *i18nUnspecified* \| *currentValueIsFullfilled* \| *currentOptions* \| *currentFindError* \| *currentSearchError* \| *onChangeSearch* \| *loadAllPossibleValues* \| *refilterPossibleValues* \| *onSelect* \| *onCancel* \| *dismissSearchError* \| *dismissFindError*\> & *StyledComponentProps*<*entry* \| *label* \| *description* \| *container* \| *labelSingleLine* \| *errorMessage* \| *iconButton* \| *fieldInput* \| *standardAddornment* \| *smallAddornment* \| *iconButtonPassword* \| *iconButtonSmall* \| *textButton* \| *unitDialog* \| *unitDialogSubheader* \| *autosuggestContainer* \| *autosuggestContainerOpen* \| *autosuggestInput* \| *autosuggestInputOpen* \| *autosuggestSuggestionsContainer* \| *autosuggestSuggestionsContainerOpen* \| *autosuggestSuggestionsList* \| *autosuggestSuggestion* \| *autosuggestFirstSuggestion* \| *autosuggestSuggestionHighlighted* \| *autosuggestSectionContainer* \| *autosuggestFirstSectionContainer* \| *autosuggestSectionTitle* \| *autosuggestMenuItem* \| *autosuggestMenuItemMainText* \| *autosuggestMenuItemSubText*\> & [*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\>

The renderer for the reference type, which basically allows to select an integer
for a given reference that represents an item definition somewhere else, the reference
type is very powerful and can do tasks of autocomplete and linking

Supported args:

- descriptionAsAlert: displays the description if exists as alert rather than the standard
- onEnter: A function that triggers when the enter key is pressed

Defined in: [client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx:663](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx#L663)

___

### style

• `Const` **style**: *Record*<*entry* \| *label* \| *description* \| *container* \| *labelSingleLine* \| *errorMessage* \| *iconButton* \| *fieldInput* \| *standardAddornment* \| *smallAddornment* \| *iconButtonPassword* \| *iconButtonSmall* \| *textButton* \| *unitDialog* \| *unitDialogSubheader* \| *autosuggestContainer* \| *autosuggestContainerOpen* \| *autosuggestInput* \| *autosuggestInputOpen* \| *autosuggestSuggestionsContainer* \| *autosuggestSuggestionsContainerOpen* \| *autosuggestSuggestionsList* \| *autosuggestSuggestion* \| *autosuggestFirstSuggestion* \| *autosuggestSuggestionHighlighted* \| *autosuggestSectionContainer* \| *autosuggestFirstSectionContainer* \| *autosuggestSectionTitle* \| *autosuggestMenuItem* \| *autosuggestMenuItemMainText* \| *autosuggestMenuItemSubText*, CSSProperties \| CreateCSSProperties<[*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\> \| PropsFunc<[*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md), CreateCSSProperties<[*IPropertyEntryReferenceRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\>\>\>

The styles for the reference

Defined in: [client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx:42](https://github.com/onzag/itemize/blob/3efa2a4a/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryReference.tsx#L42)
