[](../README.md) / [Exports](../modules.md) / client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText

# Module: client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText

The behemoth that the entry fast prototyping is for the text type since text
types can be fairly complex, this renderer uses quill, quill also doesn't support SSR
so it must be double passed

This renderer is used for text/plain and text/html, aka rich text, but not with
any other non-subtype text, it will use the field instead

## Table of contents

### Variables

- [default](client_fast_prototyping_renderers_propertyentry_propertyentrytext.md#default)
- [style](client_fast_prototyping_renderers_propertyentry_propertyentrytext.md#style)

## Variables

### default

• `Const` **default**: *ComponentType*<*Pick*<IPropertyEntryTextRendererWithStylesProps, *propertyId* \| *args* \| *rtl* \| *icon* \| *disabled* \| *label* \| *placeholder* \| *description* \| *currentAppliedValue* \| *canRestore* \| *currentValue* \| *currentValid* \| *currentInvalidReason* \| *currentInternalValue* \| *autoFocus* \| *enableUserSetErrors* \| *onChange* \| *onRestore* \| *i18nGenericError* \| *i18nOk* \| *i18nRichInfo* \| *features* \| *isRichText* \| *onInsertFile* \| *onInsertFileFromURL* \| *onCheckFileExists* \| *onRetrieveDataURI* \| *i18nRoot* \| *lastLoadedFileError* \| *dismissLastLoadedFileError* \| *onRetrieveFile*\> & *StyledComponentProps*<*entry* \| *icon* \| *label* \| *description* \| *container* \| *editor* \| *labelSingleLine* \| *errorMessage* \| *iconButton* \| *textButton* \| *labelNoToolbar* \| *rawTextArea*\> & [*IPropertyEntryTextRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md)\>

The property entry text renderer, note that this renderer isn't used only for rich text
but rather for any text type that is either plain or html, a text without a subtype
will use the same as field

Defined in: [client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx:303](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx#L303)

___

### style

• `Const` **style**: *Record*<*entry* \| *icon* \| *label* \| *description* \| *container* \| *editor* \| *labelSingleLine* \| *errorMessage* \| *iconButton* \| *textButton* \| *labelNoToolbar* \| *rawTextArea*, CSSProperties \| CreateCSSProperties<[*IPropertyEntryTextRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md)\> \| PropsFunc<[*IPropertyEntryTextRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md), CreateCSSProperties<[*IPropertyEntryTextRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md)\>\>\>

The styles for the text entry

Defined in: [client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx:34](https://github.com/onzag/itemize/blob/11a98dec/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryText.tsx#L34)
