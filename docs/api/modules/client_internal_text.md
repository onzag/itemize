[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/internal/text

# Module: client/internal/text

## Table of contents

### Interfaces

- [IFeatureSupportOptions](../interfaces/client_internal_text.IFeatureSupportOptions.md)

### Variables

- [ALLOWED\_CLASSES](client_internal_text.md#allowed_classes)
- [ALLOWED\_CLASSES\_PREFIXES](client_internal_text.md#allowed_classes_prefixes)
- [CONTAINER\_CLASS](client_internal_text.md#container_class)
- [CONTAINER\_CLASS\_PREFIX](client_internal_text.md#container_class_prefix)
- [CUSTOM\_CLASS\_PREFIX](client_internal_text.md#custom_class_prefix)
- [RICH\_TEXT\_CLASS\_PREFIX](client_internal_text.md#rich_text_class_prefix)
- [SANITIZE\_CONFIG](client_internal_text.md#sanitize_config)
- [SUPPORTED\_CONTENT\_MODIFIERS](client_internal_text.md#supported_content_modifiers)
- [SUPPORTED\_HANDLERS](client_internal_text.md#supported_handlers)
- [SUPPORTED\_TEMPLATE\_EVENTS](client_internal_text.md#supported_template_events)
- [SUPPORTED\_TEMPLATE\_STYLES](client_internal_text.md#supported_template_styles)
- [TABLE\_CLASS\_PREFIX](client_internal_text.md#table_class_prefix)
- [nodesThatRepresentLines](client_internal_text.md#nodesthatrepresentlines)

### Functions

- [checkEquality](client_internal_text.md#checkequality)
- [checkEqualityPlain](client_internal_text.md#checkequalityplain)
- [convertNodeToText](client_internal_text.md#convertnodetotext)
- [countSize](client_internal_text.md#countsize)
- [countSizeAndWords](client_internal_text.md#countsizeandwords)
- [countWords](client_internal_text.md#countwords)
- [deserialize](client_internal_text.md#deserialize)
- [postprocess](client_internal_text.md#postprocess)
- [renderTemplate](client_internal_text.md#rendertemplate)
- [renderTemplateAsNode](client_internal_text.md#rendertemplateasnode)
- [renderTemplateDynamically](client_internal_text.md#rendertemplatedynamically)
- [sanitize](client_internal_text.md#sanitize)
- [serialize](client_internal_text.md#serialize)
- [serializeString](client_internal_text.md#serializestring)

## Variables

### ALLOWED\_CLASSES

• `Const` **ALLOWED\_CLASSES**: `string`[]

The list of allowed classes for text as defined by the text-specs
this will prevent users from class injection

#### Defined in

[client/internal/text/index.tsx:31](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/index.tsx#L31)

___

### ALLOWED\_CLASSES\_PREFIXES

• `Const` **ALLOWED\_CLASSES\_PREFIXES**: `string`[]

The list of allowed prefixes

#### Defined in

[client/internal/text/index.tsx:46](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/index.tsx#L46)

___

### CONTAINER\_CLASS

• `Const` **CONTAINER\_CLASS**: ``"container"``

#### Defined in

[client/internal/text/index.tsx:38](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/index.tsx#L38)

___

### CONTAINER\_CLASS\_PREFIX

• `Const` **CONTAINER\_CLASS\_PREFIX**: `string`

#### Defined in

[client/internal/text/index.tsx:39](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/index.tsx#L39)

___

### CUSTOM\_CLASS\_PREFIX

• `Const` **CUSTOM\_CLASS\_PREFIX**: ``"custom-"``

#### Defined in

[client/internal/text/index.tsx:40](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/index.tsx#L40)

___

### RICH\_TEXT\_CLASS\_PREFIX

• `Const` **RICH\_TEXT\_CLASS\_PREFIX**: ``"rich-text--"``

#### Defined in

[client/internal/text/index.tsx:37](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/index.tsx#L37)

___

### SANITIZE\_CONFIG

• `Const` **SANITIZE\_CONFIG**: `Object`

Sanitazation standard configuraton

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ADD_ATTR` | `string`[] |
| `ADD_TAGS` | `string`[] |
| `ALLOW_UNKNOWN_PROTOCOLS` | `boolean` |

#### Defined in

[client/internal/text/index.tsx:18](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/index.tsx#L18)

___

### SUPPORTED\_CONTENT\_MODIFIERS

• `Const` **SUPPORTED\_CONTENT\_MODIFIERS**: `string`[]

Modify the content of the children based on
the template args

#### Defined in

[client/internal/text/index.tsx:90](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/index.tsx#L90)

___

### SUPPORTED\_HANDLERS

• `Const` **SUPPORTED\_HANDLERS**: `string`[]

Custom handlers to modify the information within the system
use args

#### Defined in

[client/internal/text/index.tsx:99](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/index.tsx#L99)

___

### SUPPORTED\_TEMPLATE\_EVENTS

• `Const` **SUPPORTED\_TEMPLATE\_EVENTS**: `string`[]

Template events that are supported these
exist as data-on-[event]="{{event}}"

#### Defined in

[client/internal/text/index.tsx:54](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/index.tsx#L54)

___

### SUPPORTED\_TEMPLATE\_STYLES

• `Const` **SUPPORTED\_TEMPLATE\_STYLES**: `string`[]

Styles that might pop in when using templates
exist as data-[supportedTemplateStyle]-style="position:absolute;"

#### Defined in

[client/internal/text/index.tsx:81](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/index.tsx#L81)

___

### TABLE\_CLASS\_PREFIX

• `Const` **TABLE\_CLASS\_PREFIX**: ``"table-"``

#### Defined in

[client/internal/text/index.tsx:41](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/index.tsx#L41)

___

### nodesThatRepresentLines

• `Const` **nodesThatRepresentLines**: `string`[]

#### Defined in

[client/internal/text/index.tsx:1119](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/index.tsx#L1119)

## Functions

### checkEquality

▸ **checkEquality**(`text1`, `text2`): `boolean`

compares two text for equivalence

#### Parameters

| Name | Type |
| :------ | :------ |
| `text1` | `string` \| `Node`[] |
| `text2` | `string` \| `Node`[] |

#### Returns

`boolean`

#### Defined in

[client/internal/text/index.tsx:1094](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/index.tsx#L1094)

___

### checkEqualityPlain

▸ **checkEqualityPlain**(`text1`, `text2`): `boolean`

compares two plain text for equivalence

#### Parameters

| Name | Type |
| :------ | :------ |
| `text1` | `string` |
| `text2` | `string` |

#### Returns

`boolean`

#### Defined in

[client/internal/text/index.tsx:1114](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/index.tsx#L1114)

___

### convertNodeToText

▸ **convertNodeToText**(`node`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |

#### Returns

`string`

#### Defined in

[client/internal/text/index.tsx:1145](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/index.tsx#L1145)

___

### countSize

▸ **countSize**(`root`): `number`

Counts the size of the document

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md) \| [`RichElement`](client_internal_text_serializer.md#richelement) \| [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) |

#### Returns

`number`

#### Defined in

[client/internal/text/index.tsx:732](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/index.tsx#L732)

___

### countSizeAndWords

▸ **countSizeAndWords**(`root`): [`number`, `number`]

Counts the size and words of the document

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md) \| [`RichElement`](client_internal_text_serializer.md#richelement) \| [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) |

#### Returns

[`number`, `number`]

#### Defined in

[client/internal/text/index.tsx:769](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/index.tsx#L769)

___

### countWords

▸ **countWords**(`root`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`IText`](../interfaces/client_internal_text_serializer_types_text.IText.md) \| [`RichElement`](client_internal_text_serializer.md#richelement) \| [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) |

#### Returns

`number`

#### Defined in

[client/internal/text/index.tsx:751](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/index.tsx#L751)

___

### deserialize

▸ **deserialize**(`html`): [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md)

Deserializes an HTML string or DOM element that should have been previously
sanitized into an internally used document itemize structure that can be used
for analysis or constructing rich text editors

Please ensure to have sanitized the content and
postprocessing it before deserializing it if you
don't trust it but also to setup urls for
the given content

#### Parameters

| Name | Type |
| :------ | :------ |
| `html` | `string` \| `Node`[] |

#### Returns

[`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md)

#### Defined in

[client/internal/text/index.tsx:798](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/index.tsx#L798)

___

### postprocess

▸ **postprocess**(`context`, `options`, `node`): `HTMLElement`

The postprocessing hook that cleans and sets the attributes
right for the rich text in order to follow the standards
given by the text-specs.md file

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `IPostProcessingContext` | - |
| `options` | [`IFeatureSupportOptions`](../interfaces/client_internal_text.IFeatureSupportOptions.md) | - |
| `node` | `HTMLElement` | the given node in question we are currently processing, this is a recursive function after all |

#### Returns

`HTMLElement`

a node

#### Defined in

[client/internal/text/index.tsx:338](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/index.tsx#L338)

___

### renderTemplate

▸ **renderTemplate**(`context`, `featureSupport`, `template`, `args`): `string`

Performs a simple template rendering
from a string based HTML template based on the text specs

Note that this method does not support UI Handlers
it is used for producing a string by doing a simple pass
on a template

It also does not support dynamic styles

for proper templates with full blown functionality you should
use the renderTemplateDynamically method

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `IPostProcessingContext` | - |
| `featureSupport` | [`IFeatureSupportOptions`](../interfaces/client_internal_text.IFeatureSupportOptions.md) | - |
| `template` | `string` | the template in question |
| `args` | `any` | the arguments |

#### Returns

`string`

#### Defined in

[client/internal/text/index.tsx:1006](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/index.tsx#L1006)

___

### renderTemplateAsNode

▸ **renderTemplateAsNode**(`template`, `args`): `HTMLDivElement`

Same as render template but will provide
the div as a raw HTML result

this function does not sanitize!!!

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `template` | `string` | the template in question |
| `args` | `any` | the arguments |

#### Returns

`HTMLDivElement`

#### Defined in

[client/internal/text/index.tsx:973](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/index.tsx#L973)

___

### renderTemplateDynamically

▸ **renderTemplateDynamically**(`document`, `args`, `options`): `ReactNode`

Compiles the template but it does as a react element in which
way it supports the whole range of the componentry, including
dynamic styles and UI handling

The property should be a template for this to be usable

eg. renderTemplateDynamically(deserialize(sanitize(...)), {...args})

note how this method differs from the renderTemplate method as it
takes a document instead

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `document` | [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) | the root level document |
| `args` | [`TemplateArgs`](../classes/client_internal_text_serializer_template_args.TemplateArgs.md) | the arguments to render the template with |
| `options` | [`IReactifyExtraOptions`](../interfaces/client_internal_text_serializer.IReactifyExtraOptions.md) | - |

#### Returns

`ReactNode`

#### Defined in

[client/internal/text/index.tsx:1032](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/index.tsx#L1032)

___

### sanitize

▸ **sanitize**(`context`, `options`, `value`): `string`

sanitizes and postprocesses a given
value for an item definition property
in a way that it makes it directly usable and can
then be passed to the serializer or displayed as it is

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `IPostProcessingContext` |
| `options` | [`IFeatureSupportOptions`](../interfaces/client_internal_text.IFeatureSupportOptions.md) |
| `value` | `string` |

#### Returns

`string`

#### Defined in

[client/internal/text/index.tsx:282](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/index.tsx#L282)

___

### serialize

▸ **serialize**(`root`): `string` \| `HTMLElement`[]

Serializes an internal itemize structure back into
HTML

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) |

#### Returns

`string` \| `HTMLElement`[]

#### Defined in

[client/internal/text/index.tsx:677](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/index.tsx#L677)

___

### serializeString

▸ **serializeString**(`root`): `string`

Serializes but returns the string representation
rather than a bunch of nodes

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`IRootLevelDocument`](../interfaces/client_internal_text_serializer.IRootLevelDocument.md) |

#### Returns

`string`

#### Defined in

[client/internal/text/index.tsx:692](https://github.com/onzag/itemize/blob/59702dd5/client/internal/text/index.tsx#L692)
