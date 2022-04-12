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
- [containment](client_internal_text_serializer_types_file.IFile.md#containment)
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

[client/internal/text/serializer/base.tsx:933](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L933)

___

### children

• **children**: [[`IText`](client_internal_text_serializer_types_text.IText.md)]

The children of the image is a text node
as defined by the specifications of slate
even when nothing is writable there

#### Defined in

[client/internal/text/serializer/types/file.tsx:185](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/types/file.tsx#L185)

___

### click

• `Optional` **click**: `string`

For templating
Represents a variable for templating for the data-on-click event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[click](client_internal_text_serializer_base.IElementBase.md#click)

#### Defined in

[client/internal/text/serializer/base.tsx:928](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L928)

___

### containment

• **containment**: ``"void-inline"``

cannot contain anything

#### Defined in

[client/internal/text/serializer/types/file.tsx:158](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/types/file.tsx#L158)

___

### context

• `Optional` **context**: `string`

for templating
Represents a chosen context and it applies to the property
data-context

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[context](client_internal_text_serializer_base.IElementBase.md#context)

#### Defined in

[client/internal/text/serializer/base.tsx:917](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L917)

___

### extension

• **extension**: `string`

file extension

#### Defined in

[client/internal/text/serializer/types/file.tsx:170](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/types/file.tsx#L170)

___

### fileName

• **fileName**: `string`

file name

#### Defined in

[client/internal/text/serializer/types/file.tsx:162](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/types/file.tsx#L162)

___

### focus

• `Optional` **focus**: `string`

For templating
Represents a variable for templating for the data-on-focus event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[focus](client_internal_text_serializer_base.IElementBase.md#focus)

#### Defined in

[client/internal/text/serializer/base.tsx:938](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L938)

___

### forEach

• `Optional` **forEach**: `string`

for templating
Represents the chosen each context and it applies to the property
data-for-each

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[forEach](client_internal_text_serializer_base.IElementBase.md#foreach)

#### Defined in

[client/internal/text/serializer/base.tsx:923](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L923)

___

### givenName

• `Optional` **givenName**: `string`

An optional name, just used to be displayed in the tree

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[givenName](client_internal_text_serializer_base.IElementBase.md#givenname)

#### Defined in

[client/internal/text/serializer/base.tsx:857](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L857)

___

### html

• `Optional` **html**: `string`

For templating
Represents replacement html content for the inner HTML
of the given element

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[html](client_internal_text_serializer_base.IElementBase.md#html)

#### Defined in

[client/internal/text/serializer/base.tsx:893](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L893)

___

### ifCondition

• `Optional` **ifCondition**: `string`

For templating
and if condition for conditional rendering

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[ifCondition](client_internal_text_serializer_base.IElementBase.md#ifcondition)

#### Defined in

[client/internal/text/serializer/base.tsx:887](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L887)

___

### input

• `Optional` **input**: `string`

For templating
Represents a variable for templating for the data-on-input event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[input](client_internal_text_serializer_base.IElementBase.md#input)

#### Defined in

[client/internal/text/serializer/base.tsx:943](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L943)

___

### keydown

• `Optional` **keydown**: `string`

For templating
Represents a variable for templating for the data-on-keydown event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[keydown](client_internal_text_serializer_base.IElementBase.md#keydown)

#### Defined in

[client/internal/text/serializer/base.tsx:948](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L948)

___

### keypress

• `Optional` **keypress**: `string`

For templating
Represents a variable for templating for the data-on-keypress event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[keypress](client_internal_text_serializer_base.IElementBase.md#keypress)

#### Defined in

[client/internal/text/serializer/base.tsx:953](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L953)

___

### keyup

• `Optional` **keyup**: `string`

For templating
Represents a variable for templating for the data-on-keyup event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[keyup](client_internal_text_serializer_base.IElementBase.md#keyup)

#### Defined in

[client/internal/text/serializer/base.tsx:958](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L958)

___

### mousedown

• `Optional` **mousedown**: `string`

For templating
Represents a variable for templating for the data-on-mousedown event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[mousedown](client_internal_text_serializer_base.IElementBase.md#mousedown)

#### Defined in

[client/internal/text/serializer/base.tsx:963](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L963)

___

### mouseenter

• `Optional` **mouseenter**: `string`

For templating
Represents a variable for templating for the data-on-mouseenter event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[mouseenter](client_internal_text_serializer_base.IElementBase.md#mouseenter)

#### Defined in

[client/internal/text/serializer/base.tsx:968](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L968)

___

### mouseleave

• `Optional` **mouseleave**: `string`

For templating
Represents a variable for templating for the data-on-mouseleave event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[mouseleave](client_internal_text_serializer_base.IElementBase.md#mouseleave)

#### Defined in

[client/internal/text/serializer/base.tsx:973](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L973)

___

### mousemove

• `Optional` **mousemove**: `string`

For templating
Represents a variable for templating for the data-on-mousemove event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[mousemove](client_internal_text_serializer_base.IElementBase.md#mousemove)

#### Defined in

[client/internal/text/serializer/base.tsx:978](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L978)

___

### mouseout

• `Optional` **mouseout**: `string`

For templating
Represents a variable for templating for the data-on-mouseup event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[mouseout](client_internal_text_serializer_base.IElementBase.md#mouseout)

#### Defined in

[client/internal/text/serializer/base.tsx:988](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L988)

___

### mouseover

• `Optional` **mouseover**: `string`

For templating
Represents a variable for templating for the data-on-mouseover event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[mouseover](client_internal_text_serializer_base.IElementBase.md#mouseover)

#### Defined in

[client/internal/text/serializer/base.tsx:983](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L983)

___

### mouseup

• `Optional` **mouseup**: `string`

For templating
Represents a variable for templating for the data-on-mouseup event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[mouseup](client_internal_text_serializer_base.IElementBase.md#mouseup)

#### Defined in

[client/internal/text/serializer/base.tsx:993](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L993)

___

### mousewheel

• `Optional` **mousewheel**: `string`

For templating
Represents a variable for templating for the data-on-mousewheel event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[mousewheel](client_internal_text_serializer_base.IElementBase.md#mousewheel)

#### Defined in

[client/internal/text/serializer/base.tsx:998](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L998)

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

[client/internal/text/serializer/base.tsx:880](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L880)

___

### size

• **size**: `string`

file size

#### Defined in

[client/internal/text/serializer/types/file.tsx:166](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/types/file.tsx#L166)

___

### src

• **src**: `string`

url of the file

#### Defined in

[client/internal/text/serializer/types/file.tsx:174](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/types/file.tsx#L174)

___

### srcId

• **srcId**: `string`

src id of the file
data-src-id

#### Defined in

[client/internal/text/serializer/types/file.tsx:179](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/types/file.tsx#L179)

___

### style

• `Optional` **style**: `string`

This is the standard style that translates to the style tag
following the text specifications only some properties are allowed
within it

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[style](client_internal_text_serializer_base.IElementBase.md#style)

#### Defined in

[client/internal/text/serializer/base.tsx:863](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L863)

___

### styleActive

• `Optional` **styleActive**: `string`

Same as the style tag with the same rules but represents data-style-active
and it's the style for when the item is in an active state

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[styleActive](client_internal_text_serializer_base.IElementBase.md#styleactive)

#### Defined in

[client/internal/text/serializer/base.tsx:873](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L873)

___

### styleHover

• `Optional` **styleHover**: `string`

This is similar to the style tag but represents the style tag as it
is applied during a hover event, represents data-style-hover

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[styleHover](client_internal_text_serializer_base.IElementBase.md#stylehover)

#### Defined in

[client/internal/text/serializer/base.tsx:868](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L868)

___

### textContent

• `Optional` **textContent**: `string`

For templating
Represents replacement for textual content
of the given element

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[textContent](client_internal_text_serializer_base.IElementBase.md#textcontent)

#### Defined in

[client/internal/text/serializer/base.tsx:899](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L899)

___

### touchcancel

• `Optional` **touchcancel**: `string`

For templating
Represents a variable for templating for the data-on-touchcancel event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[touchcancel](client_internal_text_serializer_base.IElementBase.md#touchcancel)

#### Defined in

[client/internal/text/serializer/base.tsx:1018](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L1018)

___

### touchend

• `Optional` **touchend**: `string`

For templating
Represents a variable for templating for the data-on-touchend event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[touchend](client_internal_text_serializer_base.IElementBase.md#touchend)

#### Defined in

[client/internal/text/serializer/base.tsx:1013](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L1013)

___

### touchmove

• `Optional` **touchmove**: `string`

For templating
Represents a variable for templating for the data-on-touchmove event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[touchmove](client_internal_text_serializer_base.IElementBase.md#touchmove)

#### Defined in

[client/internal/text/serializer/base.tsx:1008](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L1008)

___

### touchstart

• `Optional` **touchstart**: `string`

For templating
Represents a variable for templating for the data-on-touchstart event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[touchstart](client_internal_text_serializer_base.IElementBase.md#touchstart)

#### Defined in

[client/internal/text/serializer/base.tsx:1003](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L1003)

___

### type

• **type**: ``"file"``

The type

#### Defined in

[client/internal/text/serializer/types/file.tsx:154](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/types/file.tsx#L154)

___

### uiHandler

• `Optional` **uiHandler**: `string`

For templating
Represents a chosen ui handler and it applies to the property
data-ui-handler

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[uiHandler](client_internal_text_serializer_base.IElementBase.md#uihandler)

#### Defined in

[client/internal/text/serializer/base.tsx:905](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L905)

___

### uiHandlerArgs

• `Optional` **uiHandlerArgs**: `Object`

Arguments for the ui handler

#### Index signature

▪ [key: `string`]: `string`

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[uiHandlerArgs](client_internal_text_serializer_base.IElementBase.md#uihandlerargs)

#### Defined in

[client/internal/text/serializer/base.tsx:909](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L909)

___

### wheel

• `Optional` **wheel**: `string`

For templating
Represents a variable for templating for the data-on-wheel event

#### Inherited from

[IElementBase](client_internal_text_serializer_base.IElementBase.md).[wheel](client_internal_text_serializer_base.IElementBase.md#wheel)

#### Defined in

[client/internal/text/serializer/base.tsx:1023](https://github.com/onzag/itemize/blob/5c2808d3/client/internal/text/serializer/base.tsx#L1023)