[](../README.md) / [Exports](../modules.md) / client/fast-prototyping/renderers/PropertyEntry/PropertyEntryBoolean

# Module: client/fast-prototyping/renderers/PropertyEntry/PropertyEntryBoolean

The property entry boolean fast prototyping renderer uses material ui to render
an entry for a boolean value

## Table of contents

### Variables

- [default](client_fast_prototyping_renderers_propertyentry_propertyentryboolean.md#default)
- [style](client_fast_prototyping_renderers_propertyentry_propertyentryboolean.md#style)

## Variables

### default

• `Const` **default**: *ComponentType*<*Pick*<IPropertyEntryBooleanRendererWithStylesProps, *propertyId* \| *args* \| *rtl* \| *icon* \| *disabled* \| *label* \| *placeholder* \| *description* \| *currentAppliedValue* \| *canRestore* \| *currentValue* \| *currentValid* \| *currentInvalidReason* \| *currentInternalValue* \| *autoFocus* \| *enableUserSetErrors* \| *onChange* \| *onRestore* \| *isTernary* \| *trueLabel* \| *falseLabel* \| *nullLabel*\> & *StyledComponentProps*<*entry* \| *icon* \| *label* \| *description* \| *container* \| *labelSingleLine*\>\>

This is the fast prototyping boolean renderer and uses material ui in order to render a slick
boolean entry for it, supports the following args

- descriptionAsAlert: displays the description as an alert rather than its normal form

**`param`** the entry boolean props

**`returns`** a react element

Defined in: [client/fast-prototyping/renderers/PropertyEntry/PropertyEntryBoolean.tsx:92](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryBoolean.tsx#L92)

___

### style

• `Const` **style**: *Record*<*entry* \| *icon* \| *label* \| *description* \| *container* \| *labelSingleLine*, CSSProperties \| CreateCSSProperties<{}\> \| PropsFunc<{}, CreateCSSProperties<{}\>\>\>

The styles of the renderer

Defined in: [client/fast-prototyping/renderers/PropertyEntry/PropertyEntryBoolean.tsx:18](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryBoolean.tsx#L18)
