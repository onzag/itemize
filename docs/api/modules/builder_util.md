[](../README.md) / [Exports](../modules.md) / builder/util

# Module: builder/util

Some utilities used during the building process, mostly for file
management

## Table of contents

### Functions

- [checkExists](builder_util.md#checkexists)
- [checkIsDirectory](builder_util.md#checkisdirectory)
- [getActualFileIdentifier](builder_util.md#getactualfileidentifier)
- [getActualFileLocation](builder_util.md#getactualfilelocation)

## Functions

### checkExists

▸ **checkExists**(`location`: *string*, `traceback?`: [*default*](../classes/builder_traceback.default.md)): *Promise*<boolean\>

Checks whether a file exists and throws an error if it doesn't
and it's specified to throw an error or otherwise returns false

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`location` | *string* | the file location   |
`traceback?` | [*default*](../classes/builder_traceback.default.md) | an optional traceback to trace   |

**Returns:** *Promise*<boolean\>

a boolean

Defined in: [builder/util.ts:24](https://github.com/onzag/itemize/blob/28218320/builder/util.ts#L24)

___

### checkIsDirectory

▸ **checkIsDirectory**(`location`: *string*, `traceback`: [*default*](../classes/builder_traceback.default.md)): *Promise*<boolean\>

Checks whether a location is a directory,
throws an error if it doesn't exist

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`location` | *string* | the location in question   |
`traceback` | [*default*](../classes/builder_traceback.default.md) | a traceback object   |

**Returns:** *Promise*<boolean\>

a boolean

Defined in: [builder/util.ts:49](https://github.com/onzag/itemize/blob/28218320/builder/util.ts#L49)

___

### getActualFileIdentifier

▸ **getActualFileIdentifier**(`location`: *string*, `traceback`: [*default*](../classes/builder_traceback.default.md)): *Promise*<string\>

gets the identifier of a location
for example an /this/module/index.json is identified as
module and the same is true for /this/module.json

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`location` | *string* | the file location in question   |
`traceback` | [*default*](../classes/builder_traceback.default.md) | - |

**Returns:** *Promise*<string\>

the name

Defined in: [builder/util.ts:169](https://github.com/onzag/itemize/blob/28218320/builder/util.ts#L169)

___

### getActualFileLocation

▸ **getActualFileLocation**(`partialUnjoinedLocation`: [*string*, *string*], `traceback`: [*default*](../classes/builder_traceback.default.md), `extension?`: *string*): *Promise*<string\>

Gets the actual file location of a related path
eg. /data/module can either be /data/module.json or
can be /data/module/index.json this function tells which
one it is

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`partialUnjoinedLocation` | [*string*, *string*] | - | - |
`traceback` | [*default*](../classes/builder_traceback.default.md) | - | a traceback object, this fn throws an error if it                          does not exist   |
`extension` | *string* | "json" | the extension it resolves to by default it's json   |

**Returns:** *Promise*<string\>

a string with the right location

Defined in: [builder/util.ts:70](https://github.com/onzag/itemize/blob/28218320/builder/util.ts#L70)
