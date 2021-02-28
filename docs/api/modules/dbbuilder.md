[](../README.md) / [Exports](../modules.md) / dbbuilder

# Module: dbbuilder

Contains the builder that builds the database based on the schema
that is generated during the compiltation process

## Table of contents

### Functions

- [default](dbbuilder.md#default)
- [showErrorStackAndLogMessage](dbbuilder.md#showerrorstackandlogmessage)
- [yesno](dbbuilder.md#yesno)

## Functions

### default

▸ **default**(`version`: *string*, `action?`: *build* \| *dump* \| *load-dump*): *Promise*<void\>

Actually runs the build

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`version` | *string* | - |
`action` | *build* \| *dump* \| *load-dump* | "build" |

**Returns:** *Promise*<void\>

Defined in: [dbbuilder/index.ts:42](https://github.com/onzag/itemize/blob/11a98dec/dbbuilder/index.ts#L42)

___

### showErrorStackAndLogMessage

▸ **showErrorStackAndLogMessage**(`err`: Error): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`err` | Error |

**Returns:** *void*

Defined in: [dbbuilder/index.ts:198](https://github.com/onzag/itemize/blob/11a98dec/dbbuilder/index.ts#L198)

___

### yesno

▸ **yesno**(`question`: *string*): *any*

Simple function to ask for a question

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`question` | *string* | the question to ask   |

**Returns:** *any*

a boolean on the answer

Defined in: [dbbuilder/index.ts:35](https://github.com/onzag/itemize/blob/11a98dec/dbbuilder/index.ts#L35)
