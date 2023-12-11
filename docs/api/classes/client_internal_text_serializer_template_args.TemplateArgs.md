[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/text/serializer/template-args](../modules/client_internal_text_serializer_template_args.md) / TemplateArgs

# Class: TemplateArgs

[client/internal/text/serializer/template-args](../modules/client_internal_text_serializer_template_args.md).TemplateArgs

Allows to define a context wrapper argument for the standard context
that is given this can only be used during the render dynamic
it is not valid for the render static

## Table of contents

### Constructors

- [constructor](client_internal_text_serializer_template_args.TemplateArgs.md#constructor)

### Properties

- [properties](client_internal_text_serializer_template_args.TemplateArgs.md#properties)
- [wrapper](client_internal_text_serializer_template_args.TemplateArgs.md#wrapper)

### Methods

- [wrappedBy](client_internal_text_serializer_template_args.TemplateArgs.md#wrappedby)

## Constructors

### constructor

• **new TemplateArgs**(`properties`): [`TemplateArgs`](client_internal_text_serializer_template_args.TemplateArgs.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `properties` | [`ITemplateArgsProperties`](../interfaces/client_internal_text_serializer_template_args.ITemplateArgsProperties.md) |

#### Returns

[`TemplateArgs`](client_internal_text_serializer_template_args.TemplateArgs.md)

#### Defined in

[client/internal/text/serializer/template-args.ts:150](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/template-args.ts#L150)

## Properties

### properties

• **properties**: [`ITemplateArgsProperties`](../interfaces/client_internal_text_serializer_template_args.ITemplateArgsProperties.md)

#### Defined in

[client/internal/text/serializer/template-args.ts:147](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/template-args.ts#L147)

___

### wrapper

• **wrapper**: (`n`: `ReactNode`) => `ReactNode`

#### Type declaration

▸ (`n`): `ReactNode`

##### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `ReactNode` |

##### Returns

`ReactNode`

#### Defined in

[client/internal/text/serializer/template-args.ts:148](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/template-args.ts#L148)

## Methods

### wrappedBy

▸ **wrappedBy**(`w`): [`TemplateArgs`](client_internal_text_serializer_template_args.TemplateArgs.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `w` | (`n`: `ReactNode`) => `ReactNode` |

#### Returns

[`TemplateArgs`](client_internal_text_serializer_template_args.TemplateArgs.md)

#### Defined in

[client/internal/text/serializer/template-args.ts:154](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/serializer/template-args.ts#L154)
