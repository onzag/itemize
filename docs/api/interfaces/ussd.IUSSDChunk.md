[@onzag/itemize](../README.md) / [Modules](../modules.md) / [ussd](../modules/ussd.md) / IUSSDChunk

# Interface: IUSSDChunk

[ussd](../modules/ussd.md).IUSSDChunk

## Table of contents

### Properties

- [actions](ussd.IUSSDChunk.md#actions)
- [children](ussd.IUSSDChunk.md#children)
- [content](ussd.IUSSDChunk.md#content)
- [label](ussd.IUSSDChunk.md#label)

## Properties

### actions

• `Optional` **actions**: [`IUSSDAction`](ussd.IUSSDAction.md)[]

Represents actions that belong to this chunk

#### Defined in

[ussd/index.ts:63](https://github.com/onzag/itemize/blob/f2f29986/ussd/index.ts#L63)

___

### children

• `Optional` **children**: [`IUSSDChunk`](ussd.IUSSDChunk.md)[]

Represents children chunks

#### Defined in

[ussd/index.ts:58](https://github.com/onzag/itemize/blob/f2f29986/ussd/index.ts#L58)

___

### content

• **content**: `string`

The content of this chunk that should be split
into as many pages as it is necessary in order to be displayed

Once all the content of the chunk is displayed, or if there is no
content you should go to its children chunks

#### Defined in

[ussd/index.ts:53](https://github.com/onzag/itemize/blob/f2f29986/ussd/index.ts#L53)

___

### label

• **label**: `string`

Represents the label of the given chunk

#### Defined in

[ussd/index.ts:45](https://github.com/onzag/itemize/blob/f2f29986/ussd/index.ts#L45)
