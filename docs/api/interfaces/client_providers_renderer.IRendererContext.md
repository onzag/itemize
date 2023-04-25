[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/providers/renderer](../modules/client_providers_renderer.md) / IRendererContext

# Interface: IRendererContext

[client/providers/renderer](../modules/client_providers_renderer.md).IRendererContext

The renderer context we do expect for defining how are things to be renderered,
in order to build your own custom renderers you should define these, itemize ships with
its own fast prototyping renderers

## Table of contents

### Properties

- [IncludeCalloutWarning](client_providers_renderer.IRendererContext.md#includecalloutwarning)
- [PropertyEntryBoolean](client_providers_renderer.IRendererContext.md#propertyentryboolean)
- [PropertyEntryDateTime](client_providers_renderer.IRendererContext.md#propertyentrydatetime)
- [PropertyEntryField](client_providers_renderer.IRendererContext.md#propertyentryfield)
- [PropertyEntryFile](client_providers_renderer.IRendererContext.md#propertyentryfile)
- [PropertyEntryFiles](client_providers_renderer.IRendererContext.md#propertyentryfiles)
- [PropertyEntryLocation](client_providers_renderer.IRendererContext.md#propertyentrylocation)
- [PropertyEntryPayment](client_providers_renderer.IRendererContext.md#propertyentrypayment)
- [PropertyEntrySelect](client_providers_renderer.IRendererContext.md#propertyentryselect)
- [PropertyEntryTagList](client_providers_renderer.IRendererContext.md#propertyentrytaglist)
- [PropertyEntryText](client_providers_renderer.IRendererContext.md#propertyentrytext)
- [PropertyViewBoolean](client_providers_renderer.IRendererContext.md#propertyviewboolean)
- [PropertyViewCurrency](client_providers_renderer.IRendererContext.md#propertyviewcurrency)
- [PropertyViewDateTime](client_providers_renderer.IRendererContext.md#propertyviewdatetime)
- [PropertyViewFile](client_providers_renderer.IRendererContext.md#propertyviewfile)
- [PropertyViewFiles](client_providers_renderer.IRendererContext.md#propertyviewfiles)
- [PropertyViewLocation](client_providers_renderer.IRendererContext.md#propertyviewlocation)
- [PropertyViewPayment](client_providers_renderer.IRendererContext.md#propertyviewpayment)
- [PropertyViewSimple](client_providers_renderer.IRendererContext.md#propertyviewsimple)
- [PropertyViewText](client_providers_renderer.IRendererContext.md#propertyviewtext)

## Properties

### IncludeCalloutWarning

• `Optional` **IncludeCalloutWarning**: `ComponentType`<[`IIncludeCalloutWarningRendererProps`](client_internal_components_IncludeCalloutWarning.IIncludeCalloutWarningRendererProps.md)\>

The include callout warning represents the renderer that is used
when an include is missing, and the item is marked as callout, aka
marked as incomplete

#### Defined in

[client/providers/renderer.tsx:40](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/renderer.tsx#L40)

___

### PropertyEntryBoolean

• `Optional` **PropertyEntryBoolean**: `ComponentType`<[`IPropertyEntryBooleanRendererProps`](client_internal_components_PropertyEntry_PropertyEntryBoolean.IPropertyEntryBooleanRendererProps.md)\>

The property entry boolean renderer, non-special

#### Defined in

[client/providers/renderer.tsx:70](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/renderer.tsx#L70)

___

### PropertyEntryDateTime

• `Optional` **PropertyEntryDateTime**: `ComponentType`<[`IPropertyEntryDateTimeRendererProps`](client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md)\>

The datetime renderer, a mainly standard renderer that expects a date in
the given format

#### Defined in

[client/providers/renderer.tsx:109](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/renderer.tsx#L109)

___

### PropertyEntryField

• `Optional` **PropertyEntryField**: `ComponentType`<[`IPropertyEntryFieldRendererProps`](client_internal_components_PropertyEntry_PropertyEntryField.IPropertyEntryFieldRendererProps.md)\>

The property entry field, one of the most dynamic renderers, renders
unsubtyped integers, year, unsubtyped text (aka no text/plain and no text/html), string as
well as password; it also renders unit and currency; basically anything that
represents a field in one single like and represents a simple
numeric or textual value

When creating a entry field renderer use onChangeByTextualValue and currentTextualValue
instead of currentValue and onChange, these will handle internals for you using
its own handler logic

#### Defined in

[client/providers/renderer.tsx:53](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/renderer.tsx#L53)

___

### PropertyEntryFile

• `Optional` **PropertyEntryFile**: `ComponentType`<[`IPropertyEntryFileRendererProps`](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md)\>

The file renderer is used only for files, as simple as that

Do not use the onChange function to update, use onSetFile instead

#### Defined in

[client/providers/renderer.tsx:60](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/renderer.tsx#L60)

___

### PropertyEntryFiles

• `Optional` **PropertyEntryFiles**: `ComponentType`<[`IPropertyEntryFilesRendererProps`](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md)\>

The file renderer is used only for files, as simple as that

Do not use the onChange function to update, use onSetFile instead

#### Defined in

[client/providers/renderer.tsx:66](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/renderer.tsx#L66)

___

### PropertyEntryLocation

• `Optional` **PropertyEntryLocation**: `ComponentType`<[`IPropertyEntryLocationRendererProps`](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md)\>

The property entry location renderer, one of the most complex types
as well, avoid using onChange on this one as well, it provides its own
onChangeBySuggestion and onChangeBySearchResult functionality that you should
use, otherwise you might render as normal; suggestions come from the server
using the default service as it is programmed in the server side

#### Defined in

[client/providers/renderer.tsx:78](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/renderer.tsx#L78)

___

### PropertyEntryPayment

• `Optional` **PropertyEntryPayment**: `ComponentType`<[`IPropertyEntryPaymentRendererProps`](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md)\>

The payment renderer which is used for rendering the payment entry, do not confuse
this with the payment processor related object, this is for manually editing payments
and what they are all about; basically to process cash payments by yourself, this allows
to set invoices to change status to paid, change the amount that has to be billed and
so forth

#### Defined in

[client/providers/renderer.tsx:117](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/renderer.tsx#L117)

___

### PropertyEntrySelect

• `Optional` **PropertyEntrySelect**: `ComponentType`<[`IPropertyEntrySelectRendererProps`](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md)\>

The select renderer is used when the type has valid values, regardless of the type
it is, supports both texual and numerical types, otherwise works as standard

#### Defined in

[client/providers/renderer.tsx:83](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/renderer.tsx#L83)

___

### PropertyEntryTagList

• `Optional` **PropertyEntryTagList**: `ComponentType`<[`IPropertyEntryTagListRendererProps`](client_internal_components_PropertyEntry_PropertyEntryTagList.IPropertyEntryTagListRendererProps.md)\>

The taglist renderer which is used to render arbitrary tags, unlike
the property entry select which is used for standard tags which specific values
this one is arbitrary

#### Defined in

[client/providers/renderer.tsx:123](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/renderer.tsx#L123)

___

### PropertyEntryText

• `Optional` **PropertyEntryText**: `ComponentType`<[`IPropertyEntryTextRendererProps`](client_internal_components_PropertyEntry_PropertyEntryText.IPropertyEntryTextRendererProps.md)\>

The property entry text renderer for text/plain and text/html, this
is a very complex renderer, if you need to implement your own it's recommended
you read text-specs.md in the source, and use the fast prototyping renderer
as a template and reference, it's simply very complex

The LAST_RICH_TEXT_CHANGE_LENGTH global in the window allows you to set the size
of the text in characters for next validation caching in order to avoid constant
parsing of the raw text, use it for optimization, it's important

Note that the lenght of the html text while is used in validation MAX_RAW_TEXT_LENGTH
will be used and most likely is a larger value, otherwise MAX_FIELD_SIZE will
cause an error if the fields total is more than 1MB as that's the maximum, this
is some tight security

Avoid using the internalValue if possible, however if you rich text editor
of choice does not support HTML you might want to pass whatever it's using, note
that the internal value is NOT GUARANTEED, so you must be able to recreate from just
HTML in the render function of your renderer

#### Defined in

[client/providers/renderer.tsx:104](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/renderer.tsx#L104)

___

### PropertyViewBoolean

• `Optional` **PropertyViewBoolean**: `ComponentType`<[`IPropertyViewBooleanRendererProps`](client_internal_components_PropertyView_PropertyViewBoolean.IPropertyViewBooleanRendererProps.md)\>

The boolean renderer used to render, well, booleans; since booleans are either
true or false, we expect a diverging rendering

#### Defined in

[client/providers/renderer.tsx:129](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/renderer.tsx#L129)

___

### PropertyViewCurrency

• `Optional` **PropertyViewCurrency**: `ComponentType`<[`IPropertyViewCurrencyRendererProps`](client_internal_components_PropertyView_PropertyViewCurrency.IPropertyViewCurrencyRendererProps.md)\>

Renders currency, it uses a separated renderer because rendering view currencies
can be different from standard, say for showing the price of goods
you might want to show the value in another currency, so having support
for conversions is relevant

#### Defined in

[client/providers/renderer.tsx:168](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/renderer.tsx#L168)

___

### PropertyViewDateTime

• `Optional` **PropertyViewDateTime**: `ComponentType`<[`IPropertyViewDateTimeRendererProps`](client_internal_components_PropertyView_PropertyViewDateTime.IPropertyViewDateTimeRendererProps.md)\>

The date time renderer

#### Defined in

[client/providers/renderer.tsx:144](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/renderer.tsx#L144)

___

### PropertyViewFile

• `Optional` **PropertyViewFile**: `ComponentType`<[`IPropertyViewFileRendererProps`](client_internal_components_PropertyView_PropertyViewFile.IPropertyViewFileRendererProps.md)\>

Allows to view files, it shouldn't be hard to implement a viewer for this
you might want to use the file standard for it, this one is also
used for files

#### Defined in

[client/providers/renderer.tsx:150](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/renderer.tsx#L150)

___

### PropertyViewFiles

• `Optional` **PropertyViewFiles**: `ComponentType`<[`IPropertyViewFilesRendererProps`](client_internal_components_PropertyView_PropertyViewFiles.IPropertyViewFilesRendererProps.md)\>

The file renderer is used only for files, as simple as that

Do not use the onChange function to update, use onSetFile instead

#### Defined in

[client/providers/renderer.tsx:156](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/renderer.tsx#L156)

___

### PropertyViewLocation

• `Optional` **PropertyViewLocation**: `ComponentType`<[`IPropertyViewLocationRendererProps`](client_internal_components_PropertyView_PropertyViewLocation.IPropertyViewLocationRendererProps.md)\>

Allows to view location, very useful and similar to the entry but simpler,
this renderer can be used as a realtime location renderer

#### Defined in

[client/providers/renderer.tsx:161](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/renderer.tsx#L161)

___

### PropertyViewPayment

• `Optional` **PropertyViewPayment**: `ComponentType`<[`IPropertyViewPaymentRendererProps`](client_internal_components_PropertyView_PropertyViewPayment.IPropertyViewPaymentRendererProps.md)\>

Renders a payment element, a payment element is a complex element so the renderer
may offer variation via its args

#### Defined in

[client/providers/renderer.tsx:173](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/renderer.tsx#L173)

___

### PropertyViewSimple

• `Optional` **PropertyViewSimple**: `ComponentType`<[`IPropertyViewSimpleRendererProps`](client_internal_components_PropertyView_PropertyViewSimple.IPropertyViewSimpleRendererProps.md)\>

The simple renderer is one of the most dynamic types, similar to field, it only only
renders properties that are not part of a property definition, which means
these values can be null

#### Defined in

[client/providers/renderer.tsx:135](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/renderer.tsx#L135)

___

### PropertyViewText

• `Optional` **PropertyViewText**: `ComponentType`<[`IPropertyViewTextRendererProps`](client_internal_components_PropertyView_PropertyViewText.IPropertyViewTextRendererProps.md)\>

One of the most complex view renderers for viewing the text type which
on html rich text mode can be complex

#### Defined in

[client/providers/renderer.tsx:140](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/renderer.tsx#L140)
