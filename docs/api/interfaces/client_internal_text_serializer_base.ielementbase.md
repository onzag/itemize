[](../README.md) / [Exports](../modules.md) / [client/internal/text/serializer/base](../modules/client_internal_text_serializer_base.md) / IElementBase

# Interface: IElementBase

[client/internal/text/serializer/base](../modules/client_internal_text_serializer_base.md).IElementBase

Represents the base of every single element that is to
exist within the slate editor, these are the properties
that it might have regardless

## Hierarchy

* **IElementBase**

  ↳ [*IContainer*](client_internal_text_serializer_types_container.icontainer.md)

  ↳ [*ICustom*](client_internal_text_serializer_types_custom.icustom.md)

  ↳ [*IFile*](client_internal_text_serializer_types_file.ifile.md)

  ↳ [*IImage*](client_internal_text_serializer_types_image.iimage.md)

  ↳ [*IInline*](client_internal_text_serializer_types_inline.iinline.md)

  ↳ [*ILink*](client_internal_text_serializer_types_link.ilink.md)

  ↳ [*IListItem*](client_internal_text_serializer_types_list_item.ilistitem.md)

  ↳ [*IList*](client_internal_text_serializer_types_list.ilist.md)

  ↳ [*IParagraph*](client_internal_text_serializer_types_paragraph.iparagraph.md)

  ↳ [*IQuote*](client_internal_text_serializer_types_quote.iquote.md)

  ↳ [*ITitle*](client_internal_text_serializer_types_title.ititle.md)

  ↳ [*IVideo*](client_internal_text_serializer_types_video.ivideo.md)

## Table of contents

### Properties

- [blur](client_internal_text_serializer_base.ielementbase.md#blur)
- [click](client_internal_text_serializer_base.ielementbase.md#click)
- [context](client_internal_text_serializer_base.ielementbase.md#context)
- [focus](client_internal_text_serializer_base.ielementbase.md#focus)
- [forEach](client_internal_text_serializer_base.ielementbase.md#foreach)
- [givenName](client_internal_text_serializer_base.ielementbase.md#givenname)
- [html](client_internal_text_serializer_base.ielementbase.md#html)
- [ifCondition](client_internal_text_serializer_base.ielementbase.md#ifcondition)
- [input](client_internal_text_serializer_base.ielementbase.md#input)
- [keydown](client_internal_text_serializer_base.ielementbase.md#keydown)
- [keypress](client_internal_text_serializer_base.ielementbase.md#keypress)
- [keyup](client_internal_text_serializer_base.ielementbase.md#keyup)
- [mousedown](client_internal_text_serializer_base.ielementbase.md#mousedown)
- [mouseenter](client_internal_text_serializer_base.ielementbase.md#mouseenter)
- [mouseleave](client_internal_text_serializer_base.ielementbase.md#mouseleave)
- [mousemove](client_internal_text_serializer_base.ielementbase.md#mousemove)
- [mouseout](client_internal_text_serializer_base.ielementbase.md#mouseout)
- [mouseover](client_internal_text_serializer_base.ielementbase.md#mouseover)
- [mouseup](client_internal_text_serializer_base.ielementbase.md#mouseup)
- [mousewheel](client_internal_text_serializer_base.ielementbase.md#mousewheel)
- [richClassList](client_internal_text_serializer_base.ielementbase.md#richclasslist)
- [style](client_internal_text_serializer_base.ielementbase.md#style)
- [styleActive](client_internal_text_serializer_base.ielementbase.md#styleactive)
- [styleHover](client_internal_text_serializer_base.ielementbase.md#stylehover)
- [textContent](client_internal_text_serializer_base.ielementbase.md#textcontent)
- [touchcancel](client_internal_text_serializer_base.ielementbase.md#touchcancel)
- [touchend](client_internal_text_serializer_base.ielementbase.md#touchend)
- [touchmove](client_internal_text_serializer_base.ielementbase.md#touchmove)
- [touchstart](client_internal_text_serializer_base.ielementbase.md#touchstart)
- [uiHandler](client_internal_text_serializer_base.ielementbase.md#uihandler)
- [uiHandlerArgs](client_internal_text_serializer_base.ielementbase.md#uihandlerargs)
- [wheel](client_internal_text_serializer_base.ielementbase.md#wheel)

## Properties

### blur

• `Optional` **blur**: *string*

For templating
Represents a variable for templating for the data-on-blur event

Defined in: [client/internal/text/serializer/base.tsx:929](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L929)

___

### click

• `Optional` **click**: *string*

For templating
Represents a variable for templating for the data-on-click event

Defined in: [client/internal/text/serializer/base.tsx:924](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L924)

___

### context

• `Optional` **context**: *string*

for templating
Represents a chosen context and it applies to the property
data-context

Defined in: [client/internal/text/serializer/base.tsx:913](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L913)

___

### focus

• `Optional` **focus**: *string*

For templating
Represents a variable for templating for the data-on-focus event

Defined in: [client/internal/text/serializer/base.tsx:934](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L934)

___

### forEach

• `Optional` **forEach**: *string*

for templating
Represents the chosen each context and it applies to the property
data-for-each

Defined in: [client/internal/text/serializer/base.tsx:919](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L919)

___

### givenName

• `Optional` **givenName**: *string*

An optional name, just used to be displayed in the tree

Defined in: [client/internal/text/serializer/base.tsx:853](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L853)

___

### html

• `Optional` **html**: *string*

For templating
Represents replacement html content for the inner HTML
of the given element

Defined in: [client/internal/text/serializer/base.tsx:889](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L889)

___

### ifCondition

• `Optional` **ifCondition**: *string*

For templating
and if condition for conditional rendering

Defined in: [client/internal/text/serializer/base.tsx:883](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L883)

___

### input

• `Optional` **input**: *string*

For templating
Represents a variable for templating for the data-on-input event

Defined in: [client/internal/text/serializer/base.tsx:939](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L939)

___

### keydown

• `Optional` **keydown**: *string*

For templating
Represents a variable for templating for the data-on-keydown event

Defined in: [client/internal/text/serializer/base.tsx:944](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L944)

___

### keypress

• `Optional` **keypress**: *string*

For templating
Represents a variable for templating for the data-on-keypress event

Defined in: [client/internal/text/serializer/base.tsx:949](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L949)

___

### keyup

• `Optional` **keyup**: *string*

For templating
Represents a variable for templating for the data-on-keyup event

Defined in: [client/internal/text/serializer/base.tsx:954](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L954)

___

### mousedown

• `Optional` **mousedown**: *string*

For templating
Represents a variable for templating for the data-on-mousedown event

Defined in: [client/internal/text/serializer/base.tsx:959](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L959)

___

### mouseenter

• `Optional` **mouseenter**: *string*

For templating
Represents a variable for templating for the data-on-mouseenter event

Defined in: [client/internal/text/serializer/base.tsx:964](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L964)

___

### mouseleave

• `Optional` **mouseleave**: *string*

For templating
Represents a variable for templating for the data-on-mouseleave event

Defined in: [client/internal/text/serializer/base.tsx:969](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L969)

___

### mousemove

• `Optional` **mousemove**: *string*

For templating
Represents a variable for templating for the data-on-mousemove event

Defined in: [client/internal/text/serializer/base.tsx:974](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L974)

___

### mouseout

• `Optional` **mouseout**: *string*

For templating
Represents a variable for templating for the data-on-mouseup event

Defined in: [client/internal/text/serializer/base.tsx:984](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L984)

___

### mouseover

• `Optional` **mouseover**: *string*

For templating
Represents a variable for templating for the data-on-mouseover event

Defined in: [client/internal/text/serializer/base.tsx:979](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L979)

___

### mouseup

• `Optional` **mouseup**: *string*

For templating
Represents a variable for templating for the data-on-mouseup event

Defined in: [client/internal/text/serializer/base.tsx:989](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L989)

___

### mousewheel

• `Optional` **mousewheel**: *string*

For templating
Represents a variable for templating for the data-on-mousewheel event

Defined in: [client/internal/text/serializer/base.tsx:994](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L994)

___

### richClassList

• `Optional` **richClassList**: *string*[]

The classes that this element has applied
these classes represent the extra classes and not the base
classes that are applied for the given type, so it's primarily
the rich-text-- classes types

Defined in: [client/internal/text/serializer/base.tsx:876](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L876)

___

### style

• `Optional` **style**: *string*

This is the standard style that translates to the style tag
following the text specifications only some properties are allowed
within it

Defined in: [client/internal/text/serializer/base.tsx:859](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L859)

___

### styleActive

• `Optional` **styleActive**: *string*

Same as the style tag with the same rules but represents data-style-active
and it's the style for when the item is in an active state

Defined in: [client/internal/text/serializer/base.tsx:869](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L869)

___

### styleHover

• `Optional` **styleHover**: *string*

This is similar to the style tag but represents the style tag as it
is applied during a hover event, represents data-style-hover

Defined in: [client/internal/text/serializer/base.tsx:864](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L864)

___

### textContent

• `Optional` **textContent**: *string*

For templating
Represents replacement for textual content
of the given element

Defined in: [client/internal/text/serializer/base.tsx:895](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L895)

___

### touchcancel

• `Optional` **touchcancel**: *string*

For templating
Represents a variable for templating for the data-on-touchcancel event

Defined in: [client/internal/text/serializer/base.tsx:1014](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L1014)

___

### touchend

• `Optional` **touchend**: *string*

For templating
Represents a variable for templating for the data-on-touchend event

Defined in: [client/internal/text/serializer/base.tsx:1009](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L1009)

___

### touchmove

• `Optional` **touchmove**: *string*

For templating
Represents a variable for templating for the data-on-touchmove event

Defined in: [client/internal/text/serializer/base.tsx:1004](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L1004)

___

### touchstart

• `Optional` **touchstart**: *string*

For templating
Represents a variable for templating for the data-on-touchstart event

Defined in: [client/internal/text/serializer/base.tsx:999](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L999)

___

### uiHandler

• `Optional` **uiHandler**: *string*

For templating
Represents a chosen ui handler and it applies to the property
data-ui-handler

Defined in: [client/internal/text/serializer/base.tsx:901](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L901)

___

### uiHandlerArgs

• `Optional` **uiHandlerArgs**: *object*

Arguments for the ui handler

#### Type declaration:

Defined in: [client/internal/text/serializer/base.tsx:905](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L905)

___

### wheel

• `Optional` **wheel**: *string*

For templating
Represents a variable for templating for the data-on-wheel event

Defined in: [client/internal/text/serializer/base.tsx:1019](https://github.com/onzag/itemize/blob/0569bdf2/client/internal/text/serializer/base.tsx#L1019)
