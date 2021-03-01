[](../README.md) / [Exports](../modules.md) / [client/internal/text/serializer/template-args](../modules/client_internal_text_serializer_template_args.md) / TemplateArgs

# Class: TemplateArgs

[client/internal/text/serializer/template-args](../modules/client_internal_text_serializer_template_args.md).TemplateArgs

Allows to define a context wrapper argument for the standard context
that is given this can only be used during the render dynamic
it is not valid for the render static

## Table of contents

### Constructors

- [constructor](client_internal_text_serializer_template_args.templateargs.md#constructor)

### Properties

- [properties](client_internal_text_serializer_template_args.templateargs.md#properties)
- [wrapper](client_internal_text_serializer_template_args.templateargs.md#wrapper)

### Methods

- [wrappedBy](client_internal_text_serializer_template_args.templateargs.md#wrappedby)

## Constructors

### constructor

\+ **new TemplateArgs**(`properties`: [*ITemplateArgsProperties*](../interfaces/client_internal_text_serializer_template_args.itemplateargsproperties.md)): [*TemplateArgs*](client_internal_text_serializer_template_args.templateargs.md)

#### Parameters:

Name | Type |
:------ | :------ |
`properties` | [*ITemplateArgsProperties*](../interfaces/client_internal_text_serializer_template_args.itemplateargsproperties.md) |

**Returns:** [*TemplateArgs*](client_internal_text_serializer_template_args.templateargs.md)

Defined in: [client/internal/text/serializer/template-args.ts:95](https://github.com/onzag/itemize/blob/28218320/client/internal/text/serializer/template-args.ts#L95)

## Properties

### properties

• **properties**: [*ITemplateArgsProperties*](../interfaces/client_internal_text_serializer_template_args.itemplateargsproperties.md)

Defined in: [client/internal/text/serializer/template-args.ts:94](https://github.com/onzag/itemize/blob/28218320/client/internal/text/serializer/template-args.ts#L94)

___

### wrapper

• **wrapper**: (`n`: ReactNode) => ReactNode

#### Type declaration:

▸ (`n`: ReactNode): ReactNode

#### Parameters:

Name | Type |
:------ | :------ |
`n` | ReactNode |

**Returns:** ReactNode

Defined in: [client/internal/text/serializer/template-args.ts:95](https://github.com/onzag/itemize/blob/28218320/client/internal/text/serializer/template-args.ts#L95)

Defined in: [client/internal/text/serializer/template-args.ts:95](https://github.com/onzag/itemize/blob/28218320/client/internal/text/serializer/template-args.ts#L95)

## Methods

### wrappedBy

▸ **wrappedBy**(`w`: (`n`: ReactNode) => ReactNode): [*TemplateArgs*](client_internal_text_serializer_template_args.templateargs.md)

#### Parameters:

Name | Type |
:------ | :------ |
`w` | (`n`: ReactNode) => ReactNode |

**Returns:** [*TemplateArgs*](client_internal_text_serializer_template_args.templateargs.md)

Defined in: [client/internal/text/serializer/template-args.ts:101](https://github.com/onzag/itemize/blob/28218320/client/internal/text/serializer/template-args.ts#L101)
