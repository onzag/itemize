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

  ↳ [`ITable`](client_internal_text_serializer_types_table.ITable.md)

  ↳ [`IThead`](client_internal_text_serializer_types_table.IThead.md)

  ↳ [`ITbody`](client_internal_text_serializer_types_table.ITbody.md)

  ↳ [`ITfoot`](client_internal_text_serializer_types_table.ITfoot.md)

  ↳ [`ITr`](client_internal_text_serializer_types_table.ITr.md)

  ↳ [`ITd`](client_internal_text_serializer_types_table.ITd.md)

  ↳ [`ITh`](client_internal_text_serializer_types_table.ITh.md)

  ↳ [`ITitle`](client_internal_text_serializer_types_title.ITitle.md)

  ↳ [`IVideo`](client_internal_text_serializer_types_video.IVideo.md)

  ↳ [`IVoidBlock`](client_internal_text_serializer_types_void_block.IVoidBlock.md)

  ↳ [`IVoidInline`](client_internal_text_serializer_types_void_inline.IVoidInline.md)

  ↳ [`IVoidSuperBlock`](client_internal_text_serializer_types_void_superblock.IVoidSuperBlock.md)

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

[client/internal/text/serializer/base.tsx:1034](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L1034)

___

### click

• `Optional` **click**: `string`

For templating
Represents a variable for templating for the data-on-click event

#### Defined in

[client/internal/text/serializer/base.tsx:1029](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L1029)

___

### context

• `Optional` **context**: `string`

for templating
Represents a chosen context and it applies to the property
data-context

#### Defined in

[client/internal/text/serializer/base.tsx:1018](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L1018)

___

### focus

• `Optional` **focus**: `string`

For templating
Represents a variable for templating for the data-on-focus event

#### Defined in

[client/internal/text/serializer/base.tsx:1039](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L1039)

___

### forEach

• `Optional` **forEach**: `string`

for templating
Represents the chosen each context and it applies to the property
data-for-each

#### Defined in

[client/internal/text/serializer/base.tsx:1024](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L1024)

___

### givenName

• `Optional` **givenName**: `string`

An optional name, just used to be displayed in the tree

#### Defined in

[client/internal/text/serializer/base.tsx:958](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L958)

___

### html

• `Optional` **html**: `string`

For templating
Represents replacement html content for the inner HTML
of the given element

#### Defined in

[client/internal/text/serializer/base.tsx:994](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L994)

___

### ifCondition

• `Optional` **ifCondition**: `string`

For templating
and if condition for conditional rendering

#### Defined in

[client/internal/text/serializer/base.tsx:988](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L988)

___

### input

• `Optional` **input**: `string`

For templating
Represents a variable for templating for the data-on-input event

#### Defined in

[client/internal/text/serializer/base.tsx:1044](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L1044)

___

### keydown

• `Optional` **keydown**: `string`

For templating
Represents a variable for templating for the data-on-keydown event

#### Defined in

[client/internal/text/serializer/base.tsx:1049](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L1049)

___

### keypress

• `Optional` **keypress**: `string`

For templating
Represents a variable for templating for the data-on-keypress event

#### Defined in

[client/internal/text/serializer/base.tsx:1054](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L1054)

___

### keyup

• `Optional` **keyup**: `string`

For templating
Represents a variable for templating for the data-on-keyup event

#### Defined in

[client/internal/text/serializer/base.tsx:1059](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L1059)

___

### mousedown

• `Optional` **mousedown**: `string`

For templating
Represents a variable for templating for the data-on-mousedown event

#### Defined in

[client/internal/text/serializer/base.tsx:1064](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L1064)

___

### mouseenter

• `Optional` **mouseenter**: `string`

For templating
Represents a variable for templating for the data-on-mouseenter event

#### Defined in

[client/internal/text/serializer/base.tsx:1069](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L1069)

___

### mouseleave

• `Optional` **mouseleave**: `string`

For templating
Represents a variable for templating for the data-on-mouseleave event

#### Defined in

[client/internal/text/serializer/base.tsx:1074](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L1074)

___

### mousemove

• `Optional` **mousemove**: `string`

For templating
Represents a variable for templating for the data-on-mousemove event

#### Defined in

[client/internal/text/serializer/base.tsx:1079](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L1079)

___

### mouseout

• `Optional` **mouseout**: `string`

For templating
Represents a variable for templating for the data-on-mouseup event

#### Defined in

[client/internal/text/serializer/base.tsx:1089](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L1089)

___

### mouseover

• `Optional` **mouseover**: `string`

For templating
Represents a variable for templating for the data-on-mouseover event

#### Defined in

[client/internal/text/serializer/base.tsx:1084](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L1084)

___

### mouseup

• `Optional` **mouseup**: `string`

For templating
Represents a variable for templating for the data-on-mouseup event

#### Defined in

[client/internal/text/serializer/base.tsx:1094](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L1094)

___

### mousewheel

• `Optional` **mousewheel**: `string`

For templating
Represents a variable for templating for the data-on-mousewheel event

#### Defined in

[client/internal/text/serializer/base.tsx:1099](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L1099)

___

### richClassList

• `Optional` **richClassList**: `string`[]

The classes that this element has applied
these classes represent the extra classes and not the base
classes that are applied for the given type, so it's primarily
the rich-text-- classes types

#### Defined in

[client/internal/text/serializer/base.tsx:981](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L981)

___

### style

• `Optional` **style**: `string`

This is the standard style that translates to the style tag
following the text specifications only some properties are allowed
within it

#### Defined in

[client/internal/text/serializer/base.tsx:964](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L964)

___

### styleActive

• `Optional` **styleActive**: `string`

Same as the style tag with the same rules but represents data-style-active
and it's the style for when the item is in an active state

#### Defined in

[client/internal/text/serializer/base.tsx:974](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L974)

___

### styleHover

• `Optional` **styleHover**: `string`

This is similar to the style tag but represents the style tag as it
is applied during a hover event, represents data-style-hover

#### Defined in

[client/internal/text/serializer/base.tsx:969](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L969)

___

### textContent

• `Optional` **textContent**: `string`

For templating
Represents replacement for textual content
of the given element

#### Defined in

[client/internal/text/serializer/base.tsx:1000](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L1000)

___

### touchcancel

• `Optional` **touchcancel**: `string`

For templating
Represents a variable for templating for the data-on-touchcancel event

#### Defined in

[client/internal/text/serializer/base.tsx:1119](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L1119)

___

### touchend

• `Optional` **touchend**: `string`

For templating
Represents a variable for templating for the data-on-touchend event

#### Defined in

[client/internal/text/serializer/base.tsx:1114](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L1114)

___

### touchmove

• `Optional` **touchmove**: `string`

For templating
Represents a variable for templating for the data-on-touchmove event

#### Defined in

[client/internal/text/serializer/base.tsx:1109](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L1109)

___

### touchstart

• `Optional` **touchstart**: `string`

For templating
Represents a variable for templating for the data-on-touchstart event

#### Defined in

[client/internal/text/serializer/base.tsx:1104](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L1104)

___

### uiHandler

• `Optional` **uiHandler**: `string`

For templating
Represents a chosen ui handler and it applies to the property
data-ui-handler

#### Defined in

[client/internal/text/serializer/base.tsx:1006](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L1006)

___

### uiHandlerArgs

• `Optional` **uiHandlerArgs**: `Object`

Arguments for the ui handler

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[client/internal/text/serializer/base.tsx:1010](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L1010)

___

### wheel

• `Optional` **wheel**: `string`

For templating
Represents a variable for templating for the data-on-wheel event

#### Defined in

[client/internal/text/serializer/base.tsx:1124](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/base.tsx#L1124)
