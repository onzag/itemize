[](../README.md) / [Exports](../modules.md) / [client/fast-prototyping/components/slate](../modules/client_fast_prototyping_components_slate.md) / ITemplateArgsContext

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

- [label](client_fast_prototyping_components_slate.itemplateargscontext.md#label)
- [loopEmulation](client_fast_prototyping_components_slate.itemplateargscontext.md#loopemulation)
- [loopable](client_fast_prototyping_components_slate.itemplateargscontext.md#loopable)
- [properties](client_fast_prototyping_components_slate.itemplateargscontext.md#properties)
- [type](client_fast_prototyping_components_slate.itemplateargscontext.md#type)
- [wrapper](client_fast_prototyping_components_slate.itemplateargscontext.md#wrapper)

## Properties

### label

• **label**: ReactNode

A human readable label for this given context value
it should be in the given language

A react node can be given, used for passing the I18n component

Defined in: [client/fast-prototyping/components/slate/index.tsx:319](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/index.tsx#L319)

___

### loopEmulation

• `Optional` **loopEmulation**: *number*

Emulate render the element a couple of times in order to give the effect
of many views

Defined in: [client/fast-prototyping/components/slate/index.tsx:328](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/index.tsx#L328)

___

### loopable

• `Optional` **loopable**: *boolean*

If the context is an array or iterable, then mark it as such

Defined in: [client/fast-prototyping/components/slate/index.tsx:323](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/index.tsx#L323)

___

### properties

• **properties**: *object*

The properties that the context contains

#### Type declaration:

Defined in: [client/fast-prototyping/components/slate/index.tsx:332](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/index.tsx#L332)

___

### type

• **type**: *context*

The type which will always be "context"

Defined in: [client/fast-prototyping/components/slate/index.tsx:308](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/index.tsx#L308)

___

### wrapper

• `Optional` **wrapper**: (`n`: ReactNode, `emulatedIndex?`: *number*) => ReactNode

Allows to specify a wrapper to wrap based on the context

#### Type declaration:

▸ (`n`: ReactNode, `emulatedIndex?`: *number*): ReactNode

#### Parameters:

Name | Type |
:------ | :------ |
`n` | ReactNode |
`emulatedIndex?` | *number* |

**Returns:** ReactNode

Defined in: [client/fast-prototyping/components/slate/index.tsx:312](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/index.tsx#L312)

Defined in: [client/fast-prototyping/components/slate/index.tsx:312](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/slate/index.tsx#L312)
