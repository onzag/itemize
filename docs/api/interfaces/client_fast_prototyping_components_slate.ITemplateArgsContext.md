[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md) / ITemplateArgsContext

# Interface: ITemplateArgsContext

[client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md).ITemplateArgsContext

Represents the available args in the context, a context is a compound
of arguments that represent an object shape, that will be used to create
a template and render such

For example let's say a template consumes a context such as

{
  name: "kitten",
  score: "3",
  achievements: [
    {
      type: "bad-kitten"
    },
    {
      type: "angry-kitten"
    },
  ]
}

In order to create a context that specifies this structure

{
  type: "context",
  label: "root",
  properties: {
    name: {
      type: "text",
      label: "name",
    },
    score: {
      type: "text",
      label: "score",
    },
    achievements: {
      type: "context",
      label: "achievements",
      loopable: true,
      properties: {
        type: {
          type: "text",
          label: "type",
        }
      }
    }
  }
}

And that will enable the editor to understand the structure that it should
consume

## Table of contents

### Properties

- [label](client_fast_prototyping_components_slate.ITemplateArgsContext.md#label)
- [loopEmulation](client_fast_prototyping_components_slate.ITemplateArgsContext.md#loopemulation)
- [loopable](client_fast_prototyping_components_slate.ITemplateArgsContext.md#loopable)
- [properties](client_fast_prototyping_components_slate.ITemplateArgsContext.md#properties)
- [type](client_fast_prototyping_components_slate.ITemplateArgsContext.md#type)

### Methods

- [wrapper](client_fast_prototyping_components_slate.ITemplateArgsContext.md#wrapper)

## Properties

### label

• **label**: `ReactNode`

A human readable label for this given context value
it should be in the given language

A react node can be given, used for passing the I18n component

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:248](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L248)

___

### loopEmulation

• `Optional` **loopEmulation**: `number`

Emulate render the element a couple of times in order to give the effect
of many views

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:257](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L257)

___

### loopable

• `Optional` **loopable**: `boolean`

If the context is an array or iterable, then mark it as such

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:252](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L252)

___

### properties

• **properties**: `Object`

The properties that the context contains

#### Index signature

▪ [name: `string`]: [`ITemplateArg`](client_fast_prototyping_components_slate.ITemplateArg.md) \| [`ITemplateArgsContext`](client_fast_prototyping_components_slate.ITemplateArgsContext.md)

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:261](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L261)

___

### type

• **type**: ``"context"``

The type which will always be "context"

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:237](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L237)

## Methods

### wrapper

▸ `Optional` **wrapper**(`n`, `emulatedIndex?`): `ReactNode`

Allows to specify a wrapper to wrap based on the context

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `ReactNode` |
| `emulatedIndex?` | `number` |

#### Returns

`ReactNode`

#### Defined in

[client/fast-prototyping/components/slate/index.tsx:241](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/index.tsx#L241)
