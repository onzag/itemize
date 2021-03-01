[](../README.md) / [Exports](../modules.md) / client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation

# Module: client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation

Contains the entry for the location type

## Table of contents

### Variables

- [ZOOMS](client_fast_prototyping_renderers_propertyentry_propertyentrylocation.md#zooms)
- [default](client_fast_prototyping_renderers_propertyentry_propertyentrylocation.md#default)
- [style](client_fast_prototyping_renderers_propertyentry_propertyentrylocation.md#style)

## Variables

### ZOOMS

• `Const` **ZOOMS**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`LARGE` | *number* |
`MEDIUM` | *number* |
`SMALL` | *number* |

Defined in: [client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx:68](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx#L68)

___

### default

• `Const` **default**: *ComponentType*<*Pick*<IPropertyEntryLocationRendererWithStylesProps, *propertyId* \| *args* \| *rtl* \| *icon* \| *disabled* \| *label* \| *placeholder* \| *description* \| *currentAppliedValue* \| *canRestore* \| *currentValue* \| *currentValid* \| *currentInvalidReason* \| *currentInternalValue* \| *autoFocus* \| *enableUserSetErrors* \| *onChange* \| *onRestore* \| *onViewportChange* \| *onSearchQueryChange* \| *onSearch* \| *onChangeBySearchResult* \| *onChangeBySuggestion* \| *clearSuggestions* \| *clearSearchResults* \| *onManualPick* \| *noResultsLabel* \| *resultOutOfLabel* \| *viewport* \| *searchSuggestions* \| *activeSearchResults* \| *nextSearchResult* \| *nextSearchResultCircular* \| *prevSearchResult* \| *prevSearchResultCircular* \| *searchQuery*\> & *StyledComponentProps*<*entry* \| *icon* \| *label* \| *description* \| *container* \| *labelSingleLine* \| *errorMessage* \| *iconButton* \| *fieldInput* \| *textButton* \| *autosuggestContainer* \| *autosuggestContainerOpen* \| *autosuggestInput* \| *autosuggestInputOpen* \| *autosuggestSuggestionsContainer* \| *autosuggestSuggestionsContainerOpen* \| *autosuggestSuggestionsList* \| *autosuggestSuggestion* \| *autosuggestFirstSuggestion* \| *autosuggestSuggestionHighlighted* \| *autosuggestSectionContainer* \| *autosuggestFirstSectionContainer* \| *autosuggestSectionTitle* \| *autosuggestMenuItem* \| *autosuggestMenuItemMainText* \| *autosuggestMenuItemSubText* \| *locationAlternativeTextHeader* \| *locationPlaceholder* \| *locationMapContainer* \| *resultListLabel*\> & [*IPropertyEntryLocationRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md)\>

The property entry location renderer, which renders a map that allows to select a location

Supported args:

- descriptionAsAlert: displays the description if exists as alert rather than the standard

Defined in: [client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx:736](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx#L736)

___

### style

• `Const` **style**: *Record*<*entry* \| *icon* \| *label* \| *description* \| *container* \| *labelSingleLine* \| *errorMessage* \| *iconButton* \| *fieldInput* \| *textButton* \| *autosuggestContainer* \| *autosuggestContainerOpen* \| *autosuggestInput* \| *autosuggestInputOpen* \| *autosuggestSuggestionsContainer* \| *autosuggestSuggestionsContainerOpen* \| *autosuggestSuggestionsList* \| *autosuggestSuggestion* \| *autosuggestFirstSuggestion* \| *autosuggestSuggestionHighlighted* \| *autosuggestSectionContainer* \| *autosuggestFirstSectionContainer* \| *autosuggestSectionTitle* \| *autosuggestMenuItem* \| *autosuggestMenuItemMainText* \| *autosuggestMenuItemSubText* \| *locationAlternativeTextHeader* \| *locationPlaceholder* \| *locationMapContainer* \| *resultListLabel*, CSSProperties \| CreateCSSProperties<[*IPropertyEntryLocationRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md)\> \| PropsFunc<[*IPropertyEntryLocationRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md), CreateCSSProperties<[*IPropertyEntryLocationRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md)\>\>\>

The styles for the location entry

Defined in: [client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx:86](https://github.com/onzag/itemize/blob/0569bdf2/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryLocation.tsx#L86)
