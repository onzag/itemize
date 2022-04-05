[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/text/serializer/base](../modules/client_internal_text_serializer_base.md) / IElementBase

# Interface: IElementBase

[client/internal/text/serializer/base](../modules/client_internal_text_serializer_base.md).IElementBase

Represents the base of every single element that is to
exist within the slate editor, these are the properties
that it might have regardless

## Hierarchy

- **`IElementBase`**

  ↳ [`IContainer`](client_internal_text_serializer_types_container.IContainer.md)

  ↳ [`ICustom`](client_internal_text_serializer_types_custom.ICustom.md)

  ↳ [`IFile`](client_internal_text_serializer_types_file.IFile.md)

  ↳ [`IImage`](client_internal_text_serializer_types_image.IImage.md)

  ↳ [`IInline`](client_internal_text_serializer_types_inline.IInline.md)

  ↳ [`ILink`](client_internal_text_serializer_types_link.ILink.md)

  ↳ [`IListItem`](client_internal_text_serializer_types_list_item.IListItem.md)

  ↳ [`IList`](client_internal_text_serializer_types_list.IList.md)

  ↳ [`IParagraph`](client_internal_text_serializer_types_paragraph.IParagraph.md)

  ↳ [`IQuote`](client_internal_text_serializer_types_quote.IQuote.md)

  ↳ [`ITableElement`](client_internal_text_serializer_types_table_element.ITableElement.md)

  ↳ [`ITitle`](client_internal_text_serializer_types_title.ITitle.md)

  ↳ [`IVideo`](client_internal_text_serializer_types_video.IVideo.md)

## Table of contents

### Properties

- [blur](client_internal_text_serializer_base.IElementBase.md#blur)
- [click](client_internal_text_serializer_base.IElementBase.md#click)
- [context](client_internal_text_serializer_base.IElementBase.md#context)
- [focus](client_internal_text_serializer_base.IElementBase.md#focus)
- [forEach](client_internal_text_serializer_base.IElementBase.md#foreach)
- [givenName](client_internal_text_serializer_base.IElementBase.md#givenname)
- [html](client_internal_text_serializer_base.IElementBase.md#html)
- [ifCondition](client_internal_text_serializer_base.IElementBase.md#ifcondition)
- [input](client_internal_text_serializer_base.IElementBase.md#input)
- [keydown](client_internal_text_serializer_base.IElementBase.md#keydown)
- [keypress](client_internal_text_serializer_base.IElementBase.md#keypress)
- [keyup](client_internal_text_serializer_base.IElementBase.md#keyup)
- [mousedown](client_internal_text_serializer_base.IElementBase.md#mousedown)
- [mouseenter](client_internal_text_serializer_base.IElementBase.md#mouseenter)
- [mouseleave](client_internal_text_serializer_base.IElementBase.md#mouseleave)
- [mousemove](client_internal_text_serializer_base.IElementBase.md#mousemove)
- [mouseout](client_internal_text_serializer_base.IElementBase.md#mouseout)
- [mouseover](client_internal_text_serializer_base.IElementBase.md#mouseover)
- [mouseup](client_internal_text_serializer_base.IElementBase.md#mouseup)
- [mousewheel](client_internal_text_serializer_base.IElementBase.md#mousewheel)
- [richClassList](client_internal_text_serializer_base.IElementBase.md#richclasslist)
- [style](client_internal_text_serializer_base.IElementBase.md#style)
- [styleActive](client_internal_text_serializer_base.IElementBase.md#styleactive)
- [styleHover](client_internal_text_serializer_base.IElementBase.md#stylehover)
- [textContent](client_internal_text_serializer_base.IElementBase.md#textcontent)
- [touchcancel](client_internal_text_serializer_base.IElementBase.md#touchcancel)
- [touchend](client_internal_text_serializer_base.IElementBase.md#touchend)
- [touchmove](client_internal_text_serializer_base.IElementBase.md#touchmove)
- [touchstart](client_internal_text_serializer_base.IElementBase.md#touchstart)
- [uiHandler](client_internal_text_serializer_base.IElementBase.md#uihandler)
- [uiHandlerArgs](client_internal_text_serializer_base.IElementBase.md#uihandlerargs)
- [wheel](client_internal_text_serializer_base.IElementBase.md#wheel)

## Properties

### blur

• `Optional` **blur**: `string`

For templating
Represents a variable for templating for the data-on-blur event

#### Defined in

[client/internal/text/serializer/base.tsx:933](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L933)

___

### click

• `Optional` **click**: `string`

For templating
Represents a variable for templating for the data-on-click event

#### Defined in

[client/internal/text/serializer/base.tsx:928](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L928)

___

### context

• `Optional` **context**: `string`

for templating
Represents a chosen context and it applies to the property
data-context

#### Defined in

[client/internal/text/serializer/base.tsx:917](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L917)

___

### focus

• `Optional` **focus**: `string`

For templating
Represents a variable for templating for the data-on-focus event

#### Defined in

[client/internal/text/serializer/base.tsx:938](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L938)

___

### forEach

• `Optional` **forEach**: `string`

for templating
Represents the chosen each context and it applies to the property
data-for-each

#### Defined in

[client/internal/text/serializer/base.tsx:923](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L923)

___

### givenName

• `Optional` **givenName**: `string`

An optional name, just used to be displayed in the tree

#### Defined in

[client/internal/text/serializer/base.tsx:857](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L857)

___

### html

• `Optional` **html**: `string`

For templating
Represents replacement html content for the inner HTML
of the given element

#### Defined in

[client/internal/text/serializer/base.tsx:893](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L893)

___

### ifCondition

• `Optional` **ifCondition**: `string`

For templating
and if condition for conditional rendering

#### Defined in

[client/internal/text/serializer/base.tsx:887](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L887)

___

### input

• `Optional` **input**: `string`

For templating
Represents a variable for templating for the data-on-input event

#### Defined in

[client/internal/text/serializer/base.tsx:943](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L943)

___

### keydown

• `Optional` **keydown**: `string`

For templating
Represents a variable for templating for the data-on-keydown event

#### Defined in

[client/internal/text/serializer/base.tsx:948](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L948)

___

### keypress

• `Optional` **keypress**: `string`

For templating
Represents a variable for templating for the data-on-keypress event

#### Defined in

[client/internal/text/serializer/base.tsx:953](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L953)

___

### keyup

• `Optional` **keyup**: `string`

For templating
Represents a variable for templating for the data-on-keyup event

#### Defined in

[client/internal/text/serializer/base.tsx:958](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L958)

___

### mousedown

• `Optional` **mousedown**: `string`

For templating
Represents a variable for templating for the data-on-mousedown event

#### Defined in

[client/internal/text/serializer/base.tsx:963](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L963)

___

### mouseenter

• `Optional` **mouseenter**: `string`

For templating
Represents a variable for templating for the data-on-mouseenter event

#### Defined in

[client/internal/text/serializer/base.tsx:968](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L968)

___

### mouseleave

• `Optional` **mouseleave**: `string`

For templating
Represents a variable for templating for the data-on-mouseleave event

#### Defined in

[client/internal/text/serializer/base.tsx:973](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L973)

___

### mousemove

• `Optional` **mousemove**: `string`

For templating
Represents a variable for templating for the data-on-mousemove event

#### Defined in

[client/internal/text/serializer/base.tsx:978](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L978)

___

### mouseout

• `Optional` **mouseout**: `string`

For templating
Represents a variable for templating for the data-on-mouseup event

#### Defined in

[client/internal/text/serializer/base.tsx:988](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L988)

___

### mouseover

• `Optional` **mouseover**: `string`

For templating
Represents a variable for templating for the data-on-mouseover event

#### Defined in

[client/internal/text/serializer/base.tsx:983](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L983)

___

### mouseup

• `Optional` **mouseup**: `string`

For templating
Represents a variable for templating for the data-on-mouseup event

#### Defined in

[client/internal/text/serializer/base.tsx:993](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L993)

___

### mousewheel

• `Optional` **mousewheel**: `string`

For templating
Represents a variable for templating for the data-on-mousewheel event

#### Defined in

[client/internal/text/serializer/base.tsx:998](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L998)

___

### richClassList

• `Optional` **richClassList**: `string`[]

The classes that this element has applied
these classes represent the extra classes and not the base
classes that are applied for the given type, so it's primarily
the rich-text-- classes types

#### Defined in

[client/internal/text/serializer/base.tsx:880](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L880)

___

### style

• `Optional` **style**: `string`

This is the standard style that translates to the style tag
following the text specifications only some properties are allowed
within it

#### Defined in

[client/internal/text/serializer/base.tsx:863](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L863)

___

### styleActive

• `Optional` **styleActive**: `string`

Same as the style tag with the same rules but represents data-style-active
and it's the style for when the item is in an active state

#### Defined in

[client/internal/text/serializer/base.tsx:873](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L873)

___

### styleHover

• `Optional` **styleHover**: `string`

This is similar to the style tag but represents the style tag as it
is applied during a hover event, represents data-style-hover

#### Defined in

[client/internal/text/serializer/base.tsx:868](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L868)

___

### textContent

• `Optional` **textContent**: `string`

For templating
Represents replacement for textual content
of the given element

#### Defined in

[client/internal/text/serializer/base.tsx:899](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L899)

___

### touchcancel

• `Optional` **touchcancel**: `string`

For templating
Represents a variable for templating for the data-on-touchcancel event

#### Defined in

[client/internal/text/serializer/base.tsx:1018](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L1018)

___

### touchend

• `Optional` **touchend**: `string`

For templating
Represents a variable for templating for the data-on-touchend event

#### Defined in

[client/internal/text/serializer/base.tsx:1013](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L1013)

___

### touchmove

• `Optional` **touchmove**: `string`

For templating
Represents a variable for templating for the data-on-touchmove event

#### Defined in

[client/internal/text/serializer/base.tsx:1008](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L1008)

___

### touchstart

• `Optional` **touchstart**: `string`

For templating
Represents a variable for templating for the data-on-touchstart event

#### Defined in

[client/internal/text/serializer/base.tsx:1003](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L1003)

___

### uiHandler

• `Optional` **uiHandler**: `string`

For templating
Represents a chosen ui handler and it applies to the property
data-ui-handler

#### Defined in

[client/internal/text/serializer/base.tsx:905](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L905)

___

### uiHandlerArgs

• `Optional` **uiHandlerArgs**: `Object`

Arguments for the ui handler

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[client/internal/text/serializer/base.tsx:909](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L909)

___

### wheel

• `Optional` **wheel**: `string`

For templating
Represents a variable for templating for the data-on-wheel event

#### Defined in

[client/internal/text/serializer/base.tsx:1023](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L1023)
