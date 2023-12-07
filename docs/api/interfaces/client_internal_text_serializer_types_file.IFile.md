[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/text/serializer/types/file](../modules/client_internal_text_serializer_types_file.md) / IFile

# Interface: IFile

[client/internal/text/serializer/types/file](../modules/client_internal_text_serializer_types_file.md).IFile

Represents a file type

## Hierarchy

- [`IElementBase`](client_internal_text_serializer_base.IElementBase.md)

  ↳ **`IFile`**

## Table of contents

### Properties

- [blur](client_internal_text_serializer_types_file.IFile.md#blur)
- [children](client_internal_text_serializer_types_file.IFile.md#children)
- [click](client_internal_text_serializer_types_file.IFile.md#click)
- [context](client_internal_text_serializer_types_file.IFile.md#context)
- [extension](client_internal_text_serializer_types_file.IFile.md#extension)
- [fileName](client_internal_text_serializer_types_file.IFile.md#filename)
- [focus](client_internal_text_serializer_types_file.IFile.md#focus)
- [forEach](client_internal_text_serializer_types_file.IFile.md#foreach)
- [givenName](client_internal_text_serializer_types_file.IFile.md#givenname)
- [html](client_internal_text_serializer_types_file.IFile.md#html)
- [ifCondition](client_internal_text_serializer_types_file.IFile.md#ifcondition)
- [input](client_internal_text_serializer_types_file.IFile.md#input)
- [keydown](client_internal_text_serializer_types_file.IFile.md#keydown)
- [keypress](client_internal_text_serializer_types_file.IFile.md#keypress)
- [keyup](client_internal_text_serializer_types_file.IFile.md#keyup)
- [mousedown](client_internal_text_serializer_types_file.IFile.md#mousedown)
- [mouseenter](client_internal_text_serializer_types_file.IFile.md#mouseenter)
- [mouseleave](client_internal_text_serializer_types_file.IFile.md#mouseleave)
- [mousemove](client_internal_text_serializer_types_file.IFile.md#mousemove)
- [mouseout](client_internal_text_serializer_types_file.IFile.md#mouseout)
- [mouseover](client_internal_text_serializer_types_file.IFile.md#mouseover)
- [mouseup](client_internal_text_serializer_types_file.IFile.md#mouseup)
- [mousewheel](client_internal_text_serializer_types_file.IFile.md#mousewheel)
- [richClassList](client_internal_text_serializer_types_file.IFile.md#richclasslist)
- [size](client_internal_text_serializer_types_file.IFile.md#size)
- [src](client_internal_text_serializer_types_file.IFile.md#src)
- [srcId](client_internal_text_serializer_types_file.IFile.md#srcid)
- [style](client_internal_text_serializer_types_file.IFile.md#style)
- [styleActive](client_internal_text_serializer_types_file.IFile.md#styleactive)
- [styleHover](client_internal_text_serializer_types_file.IFile.md#stylehover)
- [textContent](client_internal_text_serializer_types_file.IFile.md#textcontent)
- [touchcancel](client_internal_text_serializer_types_file.IFile.md#touchcancel)
- [touchend](client_internal_text_serializer_types_file.IFile.md#touchend)
- [touchmove](client_internal_text_serializer_types_file.IFile.md#touchmove)
- [touchstart](client_internal_text_serializer_types_file.IFile.md#touchstart)
- [type](client_internal_text_serializer_types_file.IFile.md#type)
- [uiHandler](client_internal_text_serializer_types_file.IFile.md#uihandler)
- [uiHandlerArgs](client_internal_text_serializer_types_file.IFile.md#uihandlerargs)
- [wheel](client_internal_text_serializer_types_file.IFile.md#wheel)

## Properties

### blur

• `Optional` **blur**: `string`

For templating
Represents a variable for templating for the data-on-blur event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[blur](client_internal_text_serializer_base.IElementBase.md#blur)

#### Defined in

[client/internal/text/serializer/base.tsx:1034](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L1034)

___

### children

• **children**: [[`IText`](client_internal_text_serializer_types_text.IText.md)]

The children of the image is a text node
as defined by the specifications of slate
even when nothing is writable there

#### Defined in

[client/internal/text/serializer/types/file.tsx:184](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/types/file.tsx#L184)

___

### click

• `Optional` **click**: `string`

For templating
Represents a variable for templating for the data-on-click event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[click](client_internal_text_serializer_base.IElementBase.md#click)

#### Defined in

[client/internal/text/serializer/base.tsx:1029](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L1029)

___

### context

• `Optional` **context**: `string`

for templating
Represents a chosen context and it applies to the property
data-context

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[context](client_internal_text_serializer_base.IElementBase.md#context)

#### Defined in

[client/internal/text/serializer/base.tsx:1018](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L1018)

___

### extension

• **extension**: `string`

file extension

#### Defined in

[client/internal/text/serializer/types/file.tsx:169](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/types/file.tsx#L169)

___

### fileName

• **fileName**: `string`

file name

#### Defined in

[client/internal/text/serializer/types/file.tsx:161](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/types/file.tsx#L161)

___

### focus

• `Optional` **focus**: `string`

For templating
Represents a variable for templating for the data-on-focus event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[focus](client_internal_text_serializer_base.IElementBase.md#focus)

#### Defined in

[client/internal/text/serializer/base.tsx:1039](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L1039)

___

### forEach

• `Optional` **forEach**: `string`

for templating
Represents the chosen each context and it applies to the property
data-for-each

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[forEach](client_internal_text_serializer_base.IElementBase.md#foreach)

#### Defined in

[client/internal/text/serializer/base.tsx:1024](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L1024)

___

### givenName

• `Optional` **givenName**: `string`

An optional name, just used to be displayed in the tree

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[givenName](client_internal_text_serializer_base.IElementBase.md#givenname)

#### Defined in

[client/internal/text/serializer/base.tsx:958](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L958)

___

### html

• `Optional` **html**: `string`

For templating
Represents replacement html content for the inner HTML
of the given element

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[html](client_internal_text_serializer_base.IElementBase.md#html)

#### Defined in

[client/internal/text/serializer/base.tsx:994](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L994)

___

### ifCondition

• `Optional` **ifCondition**: `string`

For templating
and if condition for conditional rendering

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[ifCondition](client_internal_text_serializer_base.IElementBase.md#ifcondition)

#### Defined in

[client/internal/text/serializer/base.tsx:988](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L988)

___

### input

• `Optional` **input**: `string`

For templating
Represents a variable for templating for the data-on-input event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[input](client_internal_text_serializer_base.IElementBase.md#input)

#### Defined in

[client/internal/text/serializer/base.tsx:1044](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L1044)

___

### keydown

• `Optional` **keydown**: `string`

For templating
Represents a variable for templating for the data-on-keydown event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[keydown](client_internal_text_serializer_base.IElementBase.md#keydown)

#### Defined in

[client/internal/text/serializer/base.tsx:1049](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L1049)

___

### keypress

• `Optional` **keypress**: `string`

For templating
Represents a variable for templating for the data-on-keypress event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[keypress](client_internal_text_serializer_base.IElementBase.md#keypress)

#### Defined in

[client/internal/text/serializer/base.tsx:1054](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L1054)

___

### keyup

• `Optional` **keyup**: `string`

For templating
Represents a variable for templating for the data-on-keyup event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[keyup](client_internal_text_serializer_base.IElementBase.md#keyup)

#### Defined in

[client/internal/text/serializer/base.tsx:1059](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L1059)

___

### mousedown

• `Optional` **mousedown**: `string`

For templating
Represents a variable for templating for the data-on-mousedown event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[mousedown](client_internal_text_serializer_base.IElementBase.md#mousedown)

#### Defined in

[client/internal/text/serializer/base.tsx:1064](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L1064)

___

### mouseenter

• `Optional` **mouseenter**: `string`

For templating
Represents a variable for templating for the data-on-mouseenter event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[mouseenter](client_internal_text_serializer_base.IElementBase.md#mouseenter)

#### Defined in

[client/internal/text/serializer/base.tsx:1069](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L1069)

___

### mouseleave

• `Optional` **mouseleave**: `string`

For templating
Represents a variable for templating for the data-on-mouseleave event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[mouseleave](client_internal_text_serializer_base.IElementBase.md#mouseleave)

#### Defined in

[client/internal/text/serializer/base.tsx:1074](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L1074)

___

### mousemove

• `Optional` **mousemove**: `string`

For templating
Represents a variable for templating for the data-on-mousemove event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[mousemove](client_internal_text_serializer_base.IElementBase.md#mousemove)

#### Defined in

[client/internal/text/serializer/base.tsx:1079](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L1079)

___

### mouseout

• `Optional` **mouseout**: `string`

For templating
Represents a variable for templating for the data-on-mouseup event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[mouseout](client_internal_text_serializer_base.IElementBase.md#mouseout)

#### Defined in

[client/internal/text/serializer/base.tsx:1089](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L1089)

___

### mouseover

• `Optional` **mouseover**: `string`

For templating
Represents a variable for templating for the data-on-mouseover event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[mouseover](client_internal_text_serializer_base.IElementBase.md#mouseover)

#### Defined in

[client/internal/text/serializer/base.tsx:1084](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L1084)

___

### mouseup

• `Optional` **mouseup**: `string`

For templating
Represents a variable for templating for the data-on-mouseup event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[mouseup](client_internal_text_serializer_base.IElementBase.md#mouseup)

#### Defined in

[client/internal/text/serializer/base.tsx:1094](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L1094)

___

### mousewheel

• `Optional` **mousewheel**: `string`

For templating
Represents a variable for templating for the data-on-mousewheel event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[mousewheel](client_internal_text_serializer_base.IElementBase.md#mousewheel)

#### Defined in

[client/internal/text/serializer/base.tsx:1099](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L1099)

___

### richClassList

• `Optional` **richClassList**: `string`[]

The classes that this element has applied
these classes represent the extra classes and not the base
classes that are applied for the given type, so it's primarily
the rich-text-- classes types

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[richClassList](client_internal_text_serializer_base.IElementBase.md#richclasslist)

#### Defined in

[client/internal/text/serializer/base.tsx:981](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L981)

___

### size

• **size**: `string`

file size

#### Defined in

[client/internal/text/serializer/types/file.tsx:165](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/types/file.tsx#L165)

___

### src

• **src**: `string`

url of the file

#### Defined in

[client/internal/text/serializer/types/file.tsx:173](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/types/file.tsx#L173)

___

### srcId

• **srcId**: `string`

src id of the file
data-src-id

#### Defined in

[client/internal/text/serializer/types/file.tsx:178](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/types/file.tsx#L178)

___

### style

• `Optional` **style**: `string`

This is the standard style that translates to the style tag
following the text specifications only some properties are allowed
within it

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[style](client_internal_text_serializer_base.IElementBase.md#style)

#### Defined in

[client/internal/text/serializer/base.tsx:964](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L964)

___

### styleActive

• `Optional` **styleActive**: `string`

Same as the style tag with the same rules but represents data-style-active
and it's the style for when the item is in an active state

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[styleActive](client_internal_text_serializer_base.IElementBase.md#styleactive)

#### Defined in

[client/internal/text/serializer/base.tsx:974](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L974)

___

### styleHover

• `Optional` **styleHover**: `string`

This is similar to the style tag but represents the style tag as it
is applied during a hover event, represents data-style-hover

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[styleHover](client_internal_text_serializer_base.IElementBase.md#stylehover)

#### Defined in

[client/internal/text/serializer/base.tsx:969](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L969)

___

### textContent

• `Optional` **textContent**: `string`

For templating
Represents replacement for textual content
of the given element

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[textContent](client_internal_text_serializer_base.IElementBase.md#textcontent)

#### Defined in

[client/internal/text/serializer/base.tsx:1000](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L1000)

___

### touchcancel

• `Optional` **touchcancel**: `string`

For templating
Represents a variable for templating for the data-on-touchcancel event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[touchcancel](client_internal_text_serializer_base.IElementBase.md#touchcancel)

#### Defined in

[client/internal/text/serializer/base.tsx:1119](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L1119)

___

### touchend

• `Optional` **touchend**: `string`

For templating
Represents a variable for templating for the data-on-touchend event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[touchend](client_internal_text_serializer_base.IElementBase.md#touchend)

#### Defined in

[client/internal/text/serializer/base.tsx:1114](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L1114)

___

### touchmove

• `Optional` **touchmove**: `string`

For templating
Represents a variable for templating for the data-on-touchmove event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[touchmove](client_internal_text_serializer_base.IElementBase.md#touchmove)

#### Defined in

[client/internal/text/serializer/base.tsx:1109](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L1109)

___

### touchstart

• `Optional` **touchstart**: `string`

For templating
Represents a variable for templating for the data-on-touchstart event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[touchstart](client_internal_text_serializer_base.IElementBase.md#touchstart)

#### Defined in

[client/internal/text/serializer/base.tsx:1104](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L1104)

___

### type

• **type**: ``"file"``

The type

#### Defined in

[client/internal/text/serializer/types/file.tsx:157](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/types/file.tsx#L157)

___

### uiHandler

• `Optional` **uiHandler**: `string`

For templating
Represents a chosen ui handler and it applies to the property
data-ui-handler

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[uiHandler](client_internal_text_serializer_base.IElementBase.md#uihandler)

#### Defined in

[client/internal/text/serializer/base.tsx:1006](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L1006)

___

### uiHandlerArgs

• `Optional` **uiHandlerArgs**: `Object`

Arguments for the ui handler

#### Index signature

▪ [key: `string`]: `string`

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[uiHandlerArgs](client_internal_text_serializer_base.IElementBase.md#uihandlerargs)

#### Defined in

[client/internal/text/serializer/base.tsx:1010](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L1010)

___

### wheel

• `Optional` **wheel**: `string`

For templating
Represents a variable for templating for the data-on-wheel event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[wheel](client_internal_text_serializer_base.IElementBase.md#wheel)

#### Defined in

[client/internal/text/serializer/base.tsx:1124](https://github.com/onzag/itemize/blob/a24376ed/client/internal/text/serializer/base.tsx#L1124)
