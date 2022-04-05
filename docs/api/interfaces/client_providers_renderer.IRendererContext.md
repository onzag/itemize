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
- [PropertyEntryReference](client_providers_renderer.IRendererContext.md#propertyentryreference)
- [PropertyEntrySelect](client_providers_renderer.IRendererContext.md#propertyentryselect)
- [PropertyEntryText](client_providers_renderer.IRendererContext.md#propertyentrytext)
- [PropertyViewBoolean](client_providers_renderer.IRendererContext.md#propertyviewboolean)
- [PropertyViewCurrency](client_providers_renderer.IRendererContext.md#propertyviewcurrency)
- [PropertyViewDateTime](client_providers_renderer.IRendererContext.md#propertyviewdatetime)
- [PropertyViewFile](client_providers_renderer.IRendererContext.md#propertyviewfile)
- [PropertyViewLocation](client_providers_renderer.IRendererContext.md#propertyviewlocation)
- [PropertyViewSimple](client_providers_renderer.IRendererContext.md#propertyviewsimple)
- [PropertyViewText](client_providers_renderer.IRendererContext.md#propertyviewtext)

## Properties

### IncludeCalloutWarning

• `Optional` **IncludeCalloutWarning**: `ComponentType`<[`IIncludeCalloutWarningRendererProps`](client_internal_components_IncludeCalloutWarning.IIncludeCalloutWarningRendererProps.md)\>

The include callout warning represents the renderer that is used
when an include is missing, and the item is marked as callout, aka
marked as incomplete

#### Defined in

[client/providers/renderer.tsx:38](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/renderer.tsx#L38)

___

### PropertyEntryBoolean

• `Optional` **PropertyEntryBoolean**: `ComponentType`<[`IPropertyEntryBooleanRendererProps`](client_internal_components_PropertyEntry_PropertyEntryBoolean.IPropertyEntryBooleanRendererProps.md)\>

The property entry boolean renderer, non-special

#### Defined in

[client/providers/renderer.tsx:84](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/renderer.tsx#L84)

___

### PropertyEntryDateTime

• `Optional` **PropertyEntryDateTime**: `ComponentType`<[`IPropertyEntryDateTimeRendererProps`](client_internal_components_PropertyEntry_PropertyEntryDateTime.IPropertyEntryDateTimeRendererProps.md)\>

The datetime renderer, a mainly standard renderer that expects a date in
the given format

#### Defined in

[client/providers/renderer.tsx:123](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/renderer.tsx#L123)

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

[client/providers/renderer.tsx:51](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/renderer.tsx#L51)

___

### PropertyEntryFile

• `Optional` **PropertyEntryFile**: `ComponentType`<[`IPropertyEntryFileRendererProps`](client_internal_components_PropertyEntry_PropertyEntryFile.IPropertyEntryFileRendererProps.md)\>

The file renderer is used only for files, as simple as that

Do not use the onChange function to update, use onSetFile instead

#### Defined in

[client/providers/renderer.tsx:74](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/renderer.tsx#L74)

___

### PropertyEntryFiles

• `Optional` **PropertyEntryFiles**: `ComponentType`<[`IPropertyEntryFilesRendererProps`](client_internal_components_PropertyEntry_PropertyEntryFiles.IPropertyEntryFilesRendererProps.md)\>

The file renderer is used only for files, as simple as that

Do not use the onChange function to update, use onSetFile instead

#### Defined in

[client/providers/renderer.tsx:80](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/renderer.tsx#L80)

___

### PropertyEntryLocation

• `Optional` **PropertyEntryLocation**: `ComponentType`<[`IPropertyEntryLocationRendererProps`](client_internal_components_PropertyEntry_PropertyEntryLocation.IPropertyEntryLocationRendererProps.md)\>

The property entry location renderer, one of the most complex types
as well, avoid using onChange on this one as well, it provides its own
onChangeBySuggestion and onChangeBySearchResult functionality that you should
use, otherwise you might render as normal; suggestions come from the server
using the default service as it is programmed in the server side

#### Defined in

[client/providers/renderer.tsx:92](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/renderer.tsx#L92)

___

### PropertyEntryPayment

• `Optional` **PropertyEntryPayment**: `ComponentType`<[`IPropertyEntryPaymentRendererProps`](client_internal_components_PropertyEntry_PropertyEntryPayment.IPropertyEntryPaymentRendererProps.md)\>

The payment renderer which is used for rendering the payment entry, do not confuse
this with the payment processor related object, this is for manually editing payments
and what they are all about; basically to process cash payments by yourself, this allows
to set invoices to change status to paid, change the amount that has to be billed and
so forth

#### Defined in

[client/providers/renderer.tsx:131](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/renderer.tsx#L131)

___

### PropertyEntryReference

• `Optional` **PropertyEntryReference**: `ComponentType`<[`IPropertyEntryReferenceRendererProps`](client_internal_components_PropertyEntry_PropertyEntryReference.IPropertyEntryReferenceRendererProps.md)\>

The renderer that renders integer/reference, a reference shows itself as
a textual value that represents an id to an item definition, but only the id
where versions are expected to be locales, the reference renderer is used mainly
for autocomplete purposes, eg. user_id can be a reference that references an user id
of the module users, item definition user; and it uses name as display, references
while incredible complex show itself pretty humbly to the renderer, so a renderer
for this should be simpler to implement than a renderer to the Field or Location

When creating an entry reference renderer, do not use the onChange or currentValue
instead use currentTextualValue and onSelect via the options that are given, and when
changing the field used the onChangeSearch so you get options you can select,
you can use currentValue to check if anything is currently selected, should be a number
larger than 0

#### Defined in

[client/providers/renderer.tsx:68](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/renderer.tsx#L68)

___

### PropertyEntrySelect

• `Optional` **PropertyEntrySelect**: `ComponentType`<[`IPropertyEntrySelectRendererProps`](client_internal_components_PropertyEntry_PropertyEntrySelect.IPropertyEntrySelectRendererProps.md)\>

The select renderer is used when the type has valid values, regardless of the type
it is, supports both texual and numerical types, otherwise works as standard

#### Defined in

[client/providers/renderer.tsx:97](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/renderer.tsx#L97)

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

[client/providers/renderer.tsx:118](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/renderer.tsx#L118)

___

### PropertyViewBoolean

• `Optional` **PropertyViewBoolean**: `ComponentType`<[`IPropertyViewBooleanRendererProps`](client_internal_components_PropertyView_PropertyViewBoolean.IPropertyViewBooleanRendererProps.md)\>

The boolean renderer used to render, well, booleans; since booleans are either
true or false, we expect a diverging rendering

#### Defined in

[client/providers/renderer.tsx:137](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/renderer.tsx#L137)

___

### PropertyViewCurrency

• `Optional` **PropertyViewCurrency**: `ComponentType`<[`IPropertyViewCurrencyRendererProps`](client_internal_components_PropertyView_PropertyViewCurrency.IPropertyViewCurrencyRendererProps.md)\>

Renders currency, it uses a separated renderer because rendering view currencies
can be different from standard, say for showing the price of goods
you might want to show the value in another currency, so having support
for conversions is relevant

#### Defined in

[client/providers/renderer.tsx:170](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/renderer.tsx#L170)

___

### PropertyViewDateTime

• `Optional` **PropertyViewDateTime**: `ComponentType`<[`IPropertyViewDateTimeRendererProps`](client_internal_components_PropertyView_PropertyViewDateTime.IPropertyViewDateTimeRendererProps.md)\>

The date time renderer

#### Defined in

[client/providers/renderer.tsx:152](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/renderer.tsx#L152)

___

### PropertyViewFile

• `Optional` **PropertyViewFile**: `ComponentType`<[`IPropertyViewFileRendererProps`](client_internal_components_PropertyView_PropertyViewFile.IPropertyViewFileRendererProps.md)\>

Allows to view files, it shouldn't be hard to implement a viewer for this
you might want to use the file standard for it, this one is also
used for files

#### Defined in

[client/providers/renderer.tsx:158](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/renderer.tsx#L158)

___

### PropertyViewLocation

• `Optional` **PropertyViewLocation**: `ComponentType`<[`IPropertyViewLocationRendererProps`](client_internal_components_PropertyView_PropertyViewLocation.IPropertyViewLocationRendererProps.md)\>

Allows to view location, very useful and similar to the entry but simpler,
this renderer can be used as a realtime location renderer

#### Defined in

[client/providers/renderer.tsx:163](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/renderer.tsx#L163)

___

### PropertyViewSimple

• `Optional` **PropertyViewSimple**: `ComponentType`<[`IPropertyViewSimpleRendererProps`](client_internal_components_PropertyView_PropertyViewSimple.IPropertyViewSimpleRendererProps.md)\>

The simple renderer is one of the most dynamic types, similar to field, it only only
renders properties that are not part of a property definition, which means
these values can be null

#### Defined in

[client/providers/renderer.tsx:143](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/renderer.tsx#L143)

___

### PropertyViewText

• `Optional` **PropertyViewText**: `ComponentType`<[`IPropertyViewTextRendererProps`](client_internal_components_PropertyView_PropertyViewText.IPropertyViewTextRendererProps.md)\>

One of the most complex view renderers for viewing the text type which
on html rich text mode can be complex

#### Defined in

[client/providers/renderer.tsx:148](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/renderer.tsx#L148)
