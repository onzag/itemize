[](../README.md) / [Exports](../modules.md) / [client/providers/renderer](../modules/client_providers_renderer.md) / IRendererContext

# Interface: IRendererContext

[client/providers/renderer](../modules/client_providers_renderer.md).IRendererContext

The renderer context we do expect for defining how are things to be renderered,
in order to build your own custom renderers you should define these, itemize ships with
its own fast prototyping renderers

## Table of contents

### Properties

- [IncludeCalloutWarning](client_providers_renderer.irenderercontext.md#includecalloutwarning)
- [PropertyEntryBoolean](client_providers_renderer.irenderercontext.md#propertyentryboolean)
- [PropertyEntryDateTime](client_providers_renderer.irenderercontext.md#propertyentrydatetime)
- [PropertyEntryField](client_providers_renderer.irenderercontext.md#propertyentryfield)
- [PropertyEntryFile](client_providers_renderer.irenderercontext.md#propertyentryfile)
- [PropertyEntryLocation](client_providers_renderer.irenderercontext.md#propertyentrylocation)
- [PropertyEntryReference](client_providers_renderer.irenderercontext.md#propertyentryreference)
- [PropertyEntrySelect](client_providers_renderer.irenderercontext.md#propertyentryselect)
- [PropertyEntryText](client_providers_renderer.irenderercontext.md#propertyentrytext)
- [PropertyViewBoolean](client_providers_renderer.irenderercontext.md#propertyviewboolean)
- [PropertyViewCurrency](client_providers_renderer.irenderercontext.md#propertyviewcurrency)
- [PropertyViewDateTime](client_providers_renderer.irenderercontext.md#propertyviewdatetime)
- [PropertyViewFile](client_providers_renderer.irenderercontext.md#propertyviewfile)
- [PropertyViewLocation](client_providers_renderer.irenderercontext.md#propertyviewlocation)
- [PropertyViewSimple](client_providers_renderer.irenderercontext.md#propertyviewsimple)
- [PropertyViewText](client_providers_renderer.irenderercontext.md#propertyviewtext)

## Properties

### IncludeCalloutWarning

• `Optional` **IncludeCalloutWarning**: *ComponentType*<[*IIncludeCalloutWarningRendererProps*](client_internal_components_includecalloutwarning.iincludecalloutwarningrendererprops.md)\>

The include callout warning represents the renderer that is used
when an include is missing, and the item is marked as callout, aka
marked as incomplete

Defined in: [client/providers/renderer.tsx:36](https://github.com/onzag/itemize/blob/0e9b128c/client/providers/renderer.tsx#L36)

___

### PropertyEntryBoolean

• `Optional` **PropertyEntryBoolean**: *ComponentType*<[*IPropertyEntryBooleanRendererProps*](client_internal_components_propertyentry_propertyentryboolean.ipropertyentrybooleanrendererprops.md)\>

The property entry boolean renderer, non-special

Defined in: [client/providers/renderer.tsx:76](https://github.com/onzag/itemize/blob/0e9b128c/client/providers/renderer.tsx#L76)

___

### PropertyEntryDateTime

• `Optional` **PropertyEntryDateTime**: *ComponentType*<[*IPropertyEntryDateTimeRendererProps*](client_internal_components_propertyentry_propertyentrydatetime.ipropertyentrydatetimerendererprops.md)\>

The datetime renderer, a mainly standard renderer that expects a date in
the given format

Defined in: [client/providers/renderer.tsx:115](https://github.com/onzag/itemize/blob/0e9b128c/client/providers/renderer.tsx#L115)

___

### PropertyEntryField

• `Optional` **PropertyEntryField**: *ComponentType*<[*IPropertyEntryFieldRendererProps*](client_internal_components_propertyentry_propertyentryfield.ipropertyentryfieldrendererprops.md)\>

The property entry field, one of the most dynamic renderers, renders
unsubtyped integers, year, unsubtyped text (aka no text/plain and no text/html), string as
well as password; it also renders unit and currency; basically anything that
represents a field in one single like and represents a simple
numeric or textual value

When creating a entry field renderer use onChangeByTextualValue and currentTextualValue
instead of currentValue and onChange, these will handle internals for you using
its own handler logic

Defined in: [client/providers/renderer.tsx:49](https://github.com/onzag/itemize/blob/0e9b128c/client/providers/renderer.tsx#L49)

___

### PropertyEntryFile

• `Optional` **PropertyEntryFile**: *ComponentType*<[*IPropertyEntryFileRendererProps*](client_internal_components_propertyentry_propertyentryfile.ipropertyentryfilerendererprops.md)\>

The file renderer is used only for files, as simple as that

Do not use the onChange function to update, use onSetFile instead

Defined in: [client/providers/renderer.tsx:72](https://github.com/onzag/itemize/blob/0e9b128c/client/providers/renderer.tsx#L72)

___

### PropertyEntryLocation

• `Optional` **PropertyEntryLocation**: *ComponentType*<[*IPropertyEntryLocationRendererProps*](client_internal_components_propertyentry_propertyentrylocation.ipropertyentrylocationrendererprops.md)\>

The property entry location renderer, one of the most complex types
as well, avoid using onChange on this one as well, it provides its own
onChangeBySuggestion and onChangeBySearchResult functionality that you should
use, otherwise you might render as normal; suggestions come from the server
using the default service as it is programmed in the server side

Defined in: [client/providers/renderer.tsx:84](https://github.com/onzag/itemize/blob/0e9b128c/client/providers/renderer.tsx#L84)

___

### PropertyEntryReference

• `Optional` **PropertyEntryReference**: *ComponentType*<[*IPropertyEntryReferenceRendererProps*](client_internal_components_propertyentry_propertyentryreference.ipropertyentryreferencerendererprops.md)\>

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

Defined in: [client/providers/renderer.tsx:66](https://github.com/onzag/itemize/blob/0e9b128c/client/providers/renderer.tsx#L66)

___

### PropertyEntrySelect

• `Optional` **PropertyEntrySelect**: *ComponentType*<[*IPropertyEntrySelectRendererProps*](client_internal_components_propertyentry_propertyentryselect.ipropertyentryselectrendererprops.md)\>

The select renderer is used when the type has valid values, regardless of the type
it is, supports both texual and numerical types, otherwise works as standard

Defined in: [client/providers/renderer.tsx:89](https://github.com/onzag/itemize/blob/0e9b128c/client/providers/renderer.tsx#L89)

___

### PropertyEntryText

• `Optional` **PropertyEntryText**: *ComponentType*<[*IPropertyEntryTextRendererProps*](client_internal_components_propertyentry_propertyentrytext.ipropertyentrytextrendererprops.md)\>

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

Defined in: [client/providers/renderer.tsx:110](https://github.com/onzag/itemize/blob/0e9b128c/client/providers/renderer.tsx#L110)

___

### PropertyViewBoolean

• `Optional` **PropertyViewBoolean**: *ComponentType*<[*IPropertyViewBooleanRendererProps*](client_internal_components_propertyview_propertyviewboolean.ipropertyviewbooleanrendererprops.md)\>

The boolean renderer used to render, well, booleans; since booleans are either
true or false, we expect a diverging rendering

Defined in: [client/providers/renderer.tsx:121](https://github.com/onzag/itemize/blob/0e9b128c/client/providers/renderer.tsx#L121)

___

### PropertyViewCurrency

• `Optional` **PropertyViewCurrency**: *ComponentType*<[*IPropertyViewCurrencyRendererProps*](client_internal_components_propertyview_propertyviewcurrency.ipropertyviewcurrencyrendererprops.md)\>

Renders currency, it uses a separated renderer because rendering view currencies
can be different from standard, say for showing the price of goods
you might want to show the value in another currency, so having support
for conversions is relevant

Defined in: [client/providers/renderer.tsx:154](https://github.com/onzag/itemize/blob/0e9b128c/client/providers/renderer.tsx#L154)

___

### PropertyViewDateTime

• `Optional` **PropertyViewDateTime**: *ComponentType*<[*IPropertyViewDateTimeRendererProps*](client_internal_components_propertyview_propertyviewdatetime.ipropertyviewdatetimerendererprops.md)\>

The date time renderer

Defined in: [client/providers/renderer.tsx:136](https://github.com/onzag/itemize/blob/0e9b128c/client/providers/renderer.tsx#L136)

___

### PropertyViewFile

• `Optional` **PropertyViewFile**: *ComponentType*<[*IPropertyViewFileRendererProps*](client_internal_components_propertyview_propertyviewfile.ipropertyviewfilerendererprops.md)\>

Allows to view files, it shouldn't be hard to implement a viewer for this
you might want to use the file standard for it, this one is also
used for files

Defined in: [client/providers/renderer.tsx:142](https://github.com/onzag/itemize/blob/0e9b128c/client/providers/renderer.tsx#L142)

___

### PropertyViewLocation

• `Optional` **PropertyViewLocation**: *ComponentType*<[*IPropertyViewLocationRendererProps*](client_internal_components_propertyview_propertyviewlocation.ipropertyviewlocationrendererprops.md)\>

Allows to view location, very useful and similar to the entry but simpler,
this renderer can be used as a realtime location renderer

Defined in: [client/providers/renderer.tsx:147](https://github.com/onzag/itemize/blob/0e9b128c/client/providers/renderer.tsx#L147)

___

### PropertyViewSimple

• `Optional` **PropertyViewSimple**: *ComponentType*<[*IPropertyViewSimpleRendererProps*](client_internal_components_propertyview_propertyviewsimple.ipropertyviewsimplerendererprops.md)\>

The simple renderer is one of the most dynamic types, similar to field, it only only
renders properties that are not part of a property definition, which means
these values can be null

Defined in: [client/providers/renderer.tsx:127](https://github.com/onzag/itemize/blob/0e9b128c/client/providers/renderer.tsx#L127)

___

### PropertyViewText

• `Optional` **PropertyViewText**: *ComponentType*<[*IPropertyViewTextRendererProps*](client_internal_components_propertyview_propertyviewtext.ipropertyviewtextrendererprops.md)\>

One of the most complex view renderers for viewing the text type which
on html rich text mode can be complex

Defined in: [client/providers/renderer.tsx:132](https://github.com/onzag/itemize/blob/0e9b128c/client/providers/renderer.tsx#L132)
