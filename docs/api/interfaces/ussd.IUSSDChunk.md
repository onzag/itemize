[@onzag/itemize](../README.md) / [Modules](../modules.md) / [ussd](../modules/ussd.md) / IUSSDChunk

# Interface: IUSSDChunk

[ussd](../modules/ussd.md).IUSSDChunk

## Table of contents

### Properties

- [actions](ussd.IUSSDChunk.md#actions)
- [content](ussd.IUSSDChunk.md#content)

## Properties

### actions

• **actions**: [`IUSSDAction`](ussd.IUSSDAction.md)[]

Represents actions that belong to this chunk

#### Defined in

[ussd/index.ts:47](https://github.com/onzag/itemize/blob/59702dd5/ussd/index.ts#L47)

___

### content

• **content**: `string`

The content of this chunk that should be split
into as many pages as it is necessary in order to be displayed

Once all the content of the chunk is displayed, or if there is no
content you should go to its children chunks

#### Defined in

[ussd/index.ts:42](https://github.com/onzag/itemize/blob/59702dd5/ussd/index.ts#L42)
