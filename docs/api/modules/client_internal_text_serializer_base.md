[](../README.md) / [Exports](../modules.md) / client/internal/text/serializer/base

# Module: client/internal/text/serializer/base

This file contains the base functionality to prepare serialization
and deserialization of every and each component, the base properties
are the properties that every node has

## Table of contents

### Interfaces

- [IAttrs](../interfaces/client_internal_text_serializer_base.iattrs.md)
- [IElementBase](../interfaces/client_internal_text_serializer_base.ielementbase.md)
- [IUIHandlerEvents](../interfaces/client_internal_text_serializer_base.iuihandlerevents.md)
- [IUIHandlerProps](../interfaces/client_internal_text_serializer_base.iuihandlerprops.md)

### Functions

- [convertStyleStringToReactObject](client_internal_text_serializer_base.md#convertstylestringtoreactobject)
- [copyElementBase](client_internal_text_serializer_base.md#copyelementbase)
- [deserializeElementBase](client_internal_text_serializer_base.md#deserializeelementbase)
- [reactifyElementBase](client_internal_text_serializer_base.md#reactifyelementbase)
- [recurseAndConsumeMutatingActions](client_internal_text_serializer_base.md#recurseandconsumemutatingactions)
- [retrieveElementActionsForReact](client_internal_text_serializer_base.md#retrieveelementactionsforreact)
- [serializeElementBase](client_internal_text_serializer_base.md#serializeelementbase)

## Functions

### convertStyleStringToReactObject

▸ **convertStyleStringToReactObject**(`str`: *string*): *object*

Converts a style string such a text-align:center;padding:0; into a
react style object

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`str` | *string* | the style string    |

**Returns:** *object*

Defined in: [client/internal/text/serializer/base.tsx:110](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/text/serializer/base.tsx#L110)

___

### copyElementBase

▸ **copyElementBase**(`src`: [*IElementBase*](../interfaces/client_internal_text_serializer_base.ielementbase.md)): [*IElementBase*](../interfaces/client_internal_text_serializer_base.ielementbase.md)

Clones the base of an element of all the properties in common
and leaves all the ones that are not in common

#### Parameters:

Name | Type |
:------ | :------ |
`src` | [*IElementBase*](../interfaces/client_internal_text_serializer_base.ielementbase.md) |

**Returns:** [*IElementBase*](../interfaces/client_internal_text_serializer_base.ielementbase.md)

Defined in: [client/internal/text/serializer/base.tsx:1041](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/text/serializer/base.tsx#L1041)

___

### deserializeElementBase

▸ **deserializeElementBase**(`node`: HTMLElement): [*IElementBase*](../interfaces/client_internal_text_serializer_base.ielementbase.md)

Deseriazes a element that is an HTML element into its RichElement
base form, so it extracts all the generic data-x properties and styles
and whatnot that are shared in between all the rich elements

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`node` | HTMLElement | the node in question    |

**Returns:** [*IElementBase*](../interfaces/client_internal_text_serializer_base.ielementbase.md)

Defined in: [client/internal/text/serializer/base.tsx:798](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/text/serializer/base.tsx#L798)

___

### reactifyElementBase

▸ **reactifyElementBase**(`registry`: [*ISerializationRegistryType*](../interfaces/client_internal_text_serializer.iserializationregistrytype.md), `Tag`: *string*, `baseClass`: *string*, `children`: ([*RichElement*](client_internal_text_serializer.md#richelement) \| [*IText*](../interfaces/client_internal_text_serializer_types_text.itext.md))[], `wrapChildren`: (`node`: React.ReactNode) => React.ReactNode, `arg`: [*IReactifyArg*](../interfaces/client_internal_text_serializer.ireactifyarg.md)<[*RichElement*](client_internal_text_serializer.md#richelement) \| [*IText*](../interfaces/client_internal_text_serializer_types_text.itext.md)\>): React.ReactNode

Reactifies an element so that it can be given its react
form, basically converts the element into a react one

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`registry` | [*ISerializationRegistryType*](../interfaces/client_internal_text_serializer.iserializationregistrytype.md) | the registry that is currently in use   |
`Tag` | *string* | the tag we are using for the component to render   |
`baseClass` | *string* | the base class that should have   |
`children` | ([*RichElement*](client_internal_text_serializer.md#richelement) \| [*IText*](../interfaces/client_internal_text_serializer_types_text.itext.md))[] | represents the children in the serialized form, as in RichElement or text nodes that it has as children and should be used, that is of course unless these children are overriden by other nodes   |
`wrapChildren` | (`node`: React.ReactNode) => React.ReactNode | a function that is given so that you can return new children to wrap the current children, basically define your own children wrappage, for example, images and videos provide their own custom children nested structure   |
`arg` | [*IReactifyArg*](../interfaces/client_internal_text_serializer.ireactifyarg.md)<[*RichElement*](client_internal_text_serializer.md#richelement) \| [*IText*](../interfaces/client_internal_text_serializer_types_text.itext.md)\> | the reactification argument that is passed originally to the reactification function and provides the fine customization details as well as custom children in case and whether it should be a template or not    |

**Returns:** React.ReactNode

Defined in: [client/internal/text/serializer/base.tsx:420](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/text/serializer/base.tsx#L420)

___

### recurseAndConsumeMutatingActions

▸ **recurseAndConsumeMutatingActions**(`basicActions`: [*IUIHandlerEvents*](../interfaces/client_internal_text_serializer_base.iuihandlerevents.md), `mutatingActions`: [*IUIHandlerEvents*](../interfaces/client_internal_text_serializer_base.iuihandlerevents.md), `children`: (`args`: [*IUIHandlerEvents*](../interfaces/client_internal_text_serializer_base.iuihandlerevents.md)) => React.ReactNode): React.ReactNode

Sets the contexts for the mutating actions that reside on top
of a component to give value to a function

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`basicActions` | [*IUIHandlerEvents*](../interfaces/client_internal_text_serializer_base.iuihandlerevents.md) | the basic actions that already got a defined value   |
`mutatingActions` | [*IUIHandlerEvents*](../interfaces/client_internal_text_serializer_base.iuihandlerevents.md) | the mutating actions that need a value from the context   |
`children` | (`args`: [*IUIHandlerEvents*](../interfaces/client_internal_text_serializer_base.iuihandlerevents.md)) => React.ReactNode | the children that will be fed all those values    |

**Returns:** React.ReactNode

Defined in: [client/internal/text/serializer/base.tsx:168](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/text/serializer/base.tsx#L168)

___

### retrieveElementActionsForReact

▸ **retrieveElementActionsForReact**(`base`: [*IElementBase*](../interfaces/client_internal_text_serializer_base.ielementbase.md), `context`: [*TemplateArgs*](../classes/client_internal_text_serializer_template_args.templateargs.md), `rootContext`: [*TemplateArgs*](../classes/client_internal_text_serializer_template_args.templateargs.md), `children`: (`args`: [*IUIHandlerEvents*](../interfaces/client_internal_text_serializer_base.iuihandlerevents.md)) => React.ReactNode): React.ReactNode

Provides all the actions that are specified for a given node
including those that are meant to be mutating

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`base` | [*IElementBase*](../interfaces/client_internal_text_serializer_base.ielementbase.md) | the base element that is to be fed properties   |
`context` | [*TemplateArgs*](../classes/client_internal_text_serializer_template_args.templateargs.md) | the context where we need to find the values of such   |
`rootContext` | [*TemplateArgs*](../classes/client_internal_text_serializer_template_args.templateargs.md) | - |
`children` | (`args`: [*IUIHandlerEvents*](../interfaces/client_internal_text_serializer_base.iuihandlerevents.md)) => React.ReactNode | this is the node itself where the args are fed to this way it allows to set contexts and wrappers on top of it    |

**Returns:** React.ReactNode

Defined in: [client/internal/text/serializer/base.tsx:211](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/text/serializer/base.tsx#L211)

___

### serializeElementBase

▸ **serializeElementBase**(`registry`: [*ISerializationRegistryType*](../interfaces/client_internal_text_serializer.iserializationregistrytype.md), `base`: [*IElementBase*](../interfaces/client_internal_text_serializer_base.ielementbase.md), `tag`: *string*, `baseClass`: *string*, `attrs`: [*IAttrs*](../interfaces/client_internal_text_serializer_base.iattrs.md), `children`: ([*RichElement*](client_internal_text_serializer.md#richelement) \| [*IText*](../interfaces/client_internal_text_serializer_types_text.itext.md))[]): HTMLElement

Serializes an element from its form
as a RichElement to a HTML element

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`registry` | [*ISerializationRegistryType*](../interfaces/client_internal_text_serializer.iserializationregistrytype.md) | the registry to use   |
`base` | [*IElementBase*](../interfaces/client_internal_text_serializer_base.ielementbase.md) | the base element   |
`tag` | *string* | the tag to use to build this element   |
`baseClass` | *string* | the base class to use, eg. image, container, etc...   |
`attrs` | [*IAttrs*](../interfaces/client_internal_text_serializer_base.iattrs.md) | the attributes to use   |
`children` | ([*RichElement*](client_internal_text_serializer.md#richelement) \| [*IText*](../interfaces/client_internal_text_serializer_types_text.itext.md))[] | the children that also need to be serialized under it note that they need to be explictly set even if they are in the base   |

**Returns:** HTMLElement

a html element

Defined in: [client/internal/text/serializer/base.tsx:332](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/text/serializer/base.tsx#L332)
