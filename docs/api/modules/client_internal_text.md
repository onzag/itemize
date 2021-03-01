[](../README.md) / [Exports](../modules.md) / client/internal/text

# Module: client/internal/text

## Table of contents

### Interfaces

- [IFeatureSupportOptions](../interfaces/client_internal_text.ifeaturesupportoptions.md)

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

### Functions

- [countSize](client_internal_text.md#countsize)
- [deserialize](client_internal_text.md#deserialize)
- [postprocess](client_internal_text.md#postprocess)
- [renderTemplate](client_internal_text.md#rendertemplate)
- [renderTemplateDynamically](client_internal_text.md#rendertemplatedynamically)
- [sanitize](client_internal_text.md#sanitize)
- [serialize](client_internal_text.md#serialize)
- [serializeString](client_internal_text.md#serializestring)

## Variables

### ALLOWED\_CLASSES

• `Const` **ALLOWED\_CLASSES**: *string*[]

The list of allowed classes for text as defined by the text-specs
this will prevent users from class injection

Defined in: [client/internal/text/index.tsx:30](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/text/index.tsx#L30)

___

### ALLOWED\_CLASSES\_PREFIXES

• `Const` **ALLOWED\_CLASSES\_PREFIXES**: *string*[]

The list of allowed prefixes

Defined in: [client/internal/text/index.tsx:44](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/text/index.tsx#L44)

___

### CONTAINER\_CLASS

• `Const` **CONTAINER\_CLASS**: *container*= "container"

Defined in: [client/internal/text/index.tsx:37](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/text/index.tsx#L37)

___

### CONTAINER\_CLASS\_PREFIX

• `Const` **CONTAINER\_CLASS\_PREFIX**: *string*

Defined in: [client/internal/text/index.tsx:38](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/text/index.tsx#L38)

___

### CUSTOM\_CLASS\_PREFIX

• `Const` **CUSTOM\_CLASS\_PREFIX**: *custom-*= "custom-"

Defined in: [client/internal/text/index.tsx:39](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/text/index.tsx#L39)

___

### RICH\_TEXT\_CLASS\_PREFIX

• `Const` **RICH\_TEXT\_CLASS\_PREFIX**: *rich-text--*= "rich-text--"

Defined in: [client/internal/text/index.tsx:36](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/text/index.tsx#L36)

___

### SANITIZE\_CONFIG

• `Const` **SANITIZE\_CONFIG**: *object*

Sanitazation standard configuraton

#### Type declaration:

Name | Type |
:------ | :------ |
`ADD_ATTR` | *string*[] |
`ADD_TAGS` | *string*[] |
`ALLOW_UNKNOWN_PROTOCOLS` | *boolean* |

Defined in: [client/internal/text/index.tsx:17](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/text/index.tsx#L17)

___

### SUPPORTED\_CONTENT\_MODIFIERS

• `Const` **SUPPORTED\_CONTENT\_MODIFIERS**: *string*[]

Modify the content of the children based on
the template args

Defined in: [client/internal/text/index.tsx:88](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/text/index.tsx#L88)

___

### SUPPORTED\_HANDLERS

• `Const` **SUPPORTED\_HANDLERS**: *string*[]

Custom handlers to modify the information within the system
use args

Defined in: [client/internal/text/index.tsx:97](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/text/index.tsx#L97)

___

### SUPPORTED\_TEMPLATE\_EVENTS

• `Const` **SUPPORTED\_TEMPLATE\_EVENTS**: *string*[]

Template events that are supported these
exist as data-on-[event]="{{event}}"

Defined in: [client/internal/text/index.tsx:52](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/text/index.tsx#L52)

___

### SUPPORTED\_TEMPLATE\_STYLES

• `Const` **SUPPORTED\_TEMPLATE\_STYLES**: *string*[]

Styles that might pop in when using templates
exist as data-[supportedTemplateStyle]-style="position:absolute;"

Defined in: [client/internal/text/index.tsx:79](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/text/index.tsx#L79)

## Functions

### countSize

▸ **countSize**(`root`: [*IRootLevelDocument*](../interfaces/client_internal_text_serializer.irootleveldocument.md) \| [*RichElement*](client_internal_text_serializer.md#richelement) \| [*IText*](../interfaces/client_internal_text_serializer_types_text.itext.md)): *number*

Counts the size of the document

#### Parameters:

Name | Type |
:------ | :------ |
`root` | [*IRootLevelDocument*](../interfaces/client_internal_text_serializer.irootleveldocument.md) \| [*RichElement*](client_internal_text_serializer.md#richelement) \| [*IText*](../interfaces/client_internal_text_serializer_types_text.itext.md) |

**Returns:** *number*

Defined in: [client/internal/text/index.tsx:527](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/text/index.tsx#L527)

___

### deserialize

▸ **deserialize**(`html`: *string* \| Node[]): [*IRootLevelDocument*](../interfaces/client_internal_text_serializer.irootleveldocument.md)

Deserializes an HTML string or DOM element that should have been previously
sanitized into an internally used document itemize structure that can be used
for analysis or constructing rich text editors

Please ensure to have sanitized the content and
postprocessing it before deserializing it if you
don't trust it but also to setup urls for
the given content

#### Parameters:

Name | Type |
:------ | :------ |
`html` | *string* \| Node[] |

**Returns:** [*IRootLevelDocument*](../interfaces/client_internal_text_serializer.irootleveldocument.md)

Defined in: [client/internal/text/index.tsx:551](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/text/index.tsx#L551)

___

### postprocess

▸ **postprocess**(`context`: IPostProcessingContext, `options`: [*IFeatureSupportOptions*](../interfaces/client_internal_text.ifeaturesupportoptions.md), `node`: HTMLElement): HTMLElement

The postprocessing hook that cleans and sets the attributes
right for the rich text in order to follow the standards
given by the text-specs.md file

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | IPostProcessingContext | - |
`options` | [*IFeatureSupportOptions*](../interfaces/client_internal_text.ifeaturesupportoptions.md) | - |
`node` | HTMLElement | the given node in question we are currently processing, this is a recursive function after all   |

**Returns:** HTMLElement

a node

Defined in: [client/internal/text/index.tsx:275](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/text/index.tsx#L275)

___

### renderTemplate

▸ **renderTemplate**(`template`: *string*, `args`: *any*): *string*

Performs a simple template rendering
from a string based HTML template based on the text specs

Note that this method does not support UI Handlers
it is used for producing a string by doing a simple pass
on a template

It also does not support dynamic styles

If you want the template to render nicely you might want
to run it before over the sanitize function

eg. renderTemplate(sanitize(...), {...args})

for proper templates with full blown functionality you should
use the renderTemplateDynamically method

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`template` | *string* | the template in question   |
`args` | *any* | the arguments    |

**Returns:** *string*

Defined in: [client/internal/text/index.tsx:738](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/text/index.tsx#L738)

___

### renderTemplateDynamically

▸ **renderTemplateDynamically**(`document`: [*IRootLevelDocument*](../interfaces/client_internal_text_serializer.irootleveldocument.md), `args`: [*TemplateArgs*](../classes/client_internal_text_serializer_template_args.templateargs.md)): *object*

Compiles the template but it does as a react element in which
way it supports the whole range of the componentry, including
dynamic styles and UI handling

The property should be a template for this to be usable

eg. renderTemplateDynamically(deserialize(sanitize(...)), {...args})

note how this method differs from the renderTemplate method as it
takes a document instead

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`document` | [*IRootLevelDocument*](../interfaces/client_internal_text_serializer.irootleveldocument.md) | the root level document   |
`args` | [*TemplateArgs*](../classes/client_internal_text_serializer_template_args.templateargs.md) | the arguments to render the template with    |

**Returns:** *object*

Defined in: [client/internal/text/index.tsx:769](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/text/index.tsx#L769)

___

### sanitize

▸ **sanitize**(`context`: IPostProcessingContext, `options`: [*IFeatureSupportOptions*](../interfaces/client_internal_text.ifeaturesupportoptions.md), `value`: *string*): *string*

sanitizes and postprocesses a given
value for an item definition property
in a way that it makes it directly usable and can
then be passed to the serializer or displayed as it is

#### Parameters:

Name | Type |
:------ | :------ |
`context` | IPostProcessingContext |
`options` | [*IFeatureSupportOptions*](../interfaces/client_internal_text.ifeaturesupportoptions.md) |
`value` | *string* |

**Returns:** *string*

Defined in: [client/internal/text/index.tsx:250](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/text/index.tsx#L250)

___

### serialize

▸ **serialize**(`root`: [*IRootLevelDocument*](../interfaces/client_internal_text_serializer.irootleveldocument.md)): *string* \| HTMLElement[]

Serializes an internal itemize structure back into
HTML

#### Parameters:

Name | Type |
:------ | :------ |
`root` | [*IRootLevelDocument*](../interfaces/client_internal_text_serializer.irootleveldocument.md) |

**Returns:** *string* \| HTMLElement[]

Defined in: [client/internal/text/index.tsx:506](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/text/index.tsx#L506)

___

### serializeString

▸ **serializeString**(`root`: [*IRootLevelDocument*](../interfaces/client_internal_text_serializer.irootleveldocument.md)): *string*

Serializes but returns the string representation
rather than a bunch of nodes

#### Parameters:

Name | Type |
:------ | :------ |
`root` | [*IRootLevelDocument*](../interfaces/client_internal_text_serializer.irootleveldocument.md) |

**Returns:** *string*

Defined in: [client/internal/text/index.tsx:515](https://github.com/onzag/itemize/blob/0e9b128c/client/internal/text/index.tsx#L515)
