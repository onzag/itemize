[](../README.md) / [Exports](../modules.md) / client/fast-prototyping/renderers/PropertyEntry/PropertyEntryFile

# Module: client/fast-prototyping/renderers/PropertyEntry/PropertyEntryFile

Contains the fast prototyping element for renering a file entry

## Table of contents

### Variables

- [default](client_fast_prototyping_renderers_propertyentry_propertyentryfile.md#default)
- [style](client_fast_prototyping_renderers_propertyentry_propertyentryfile.md#style)

## Variables

### default

• `Const` **default**: *ComponentType*<*Pick*<IPropertyEntryFileRendererWithStylesProps, *propertyId* \| *args* \| *rtl* \| *icon* \| *disabled* \| *label* \| *accept* \| *isExpectingImages* \| *genericActivePlaceholder* \| *genericDeleteLabel* \| *genericSelectLabel* \| *isSupportedImage* \| *rejected* \| *rejectedReason* \| *imageSrcSet* \| *imageSizes* \| *prettySize* \| *extension* \| *onSetFile* \| *onRemoveFile* \| *openFile* \| *placeholder* \| *description* \| *currentAppliedValue* \| *canRestore* \| *currentValue* \| *currentValid* \| *currentInvalidReason* \| *currentInternalValue* \| *autoFocus* \| *enableUserSetErrors* \| *onChange* \| *onRestore*\> & *StyledComponentProps*<*entry* \| *button* \| *icon* \| *label* \| *description* \| *paper* \| *container* \| *errorMessage* \| *fileDeleteButton* \| *fileRejectedDescription* \| *paperPlaceholder* \| *paperPlaceholderAccepting* \| *paperPlaceholderRejecting* \| *paperIconAdd* \| *buttonContainer* \| *buttonIcon*\> & [*IPropertyEntryFileRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md)\>

The property entry file renderer, allows to set and upload a single file in its
form, support both images and standard files

**`param`** the entry props

**`returns`** a react element

Defined in: [client/fast-prototyping/renderers/PropertyEntry/PropertyEntryFile.tsx:166](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryFile.tsx#L166)

___

### style

• `Const` **style**: *Record*<*entry* \| *button* \| *icon* \| *label* \| *description* \| *paper* \| *container* \| *errorMessage* \| *fileDeleteButton* \| *fileRejectedDescription* \| *paperPlaceholder* \| *paperPlaceholderAccepting* \| *paperPlaceholderRejecting* \| *paperIconAdd* \| *buttonContainer* \| *buttonIcon*, CSSProperties \| CreateCSSProperties<[*IPropertyEntryFileRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md)\> \| PropsFunc<[*IPropertyEntryFileRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md), CreateCSSProperties<[*IPropertyEntryFileRendererProps*](../interfaces/client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md)\>\>\>

the styles for the file entry

Defined in: [client/fast-prototyping/renderers/PropertyEntry/PropertyEntryFile.tsx:29](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryFile.tsx#L29)
