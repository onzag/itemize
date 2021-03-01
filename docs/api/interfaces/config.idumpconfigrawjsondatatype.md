[](../README.md) / [Exports](../modules.md) / [config](../modules/config.md) / IDumpConfigRawJSONDataType

# Interface: IDumpConfigRawJSONDataType

[config](../modules/config.md).IDumpConfigRawJSONDataType

A structure that specifies how files are to be dumped
and then reloaded

## Table of contents

### Properties

- [load](config.idumpconfigrawjsondatatype.md#load)
- [save](config.idumpconfigrawjsondatatype.md#save)

## Properties

### load

• **load**: *object*

Specifies how the dump is to be loaded

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`previousContainerIdMapper`? | *object* | Map previous containers that have been dumped to new containers, the previous container id mapper has priority over the version mapper, it will try to get one from the list in order of priority   |
`primaryContainerId` | *string* | If none of the version mappers nor the previous container id mappers match and the previous container id is not found in the current configuration this container will be used instead   |
`versionMapper`? | *object* | Specifies a container based on a version, it will try to get one from the list in order of priority   |

Defined in: [config.ts:178](https://github.com/onzag/itemize/blob/5fcde7cf/config.ts#L178)

___

### save

• **save**: *boolean* \| [*IDumpSpecificModInfoType*](config.idumpspecificmodinfotype.md)

Specifies the dump process
If it's a boolean, dump all, otherwse
we only dump specific modules

Defined in: [config.ts:173](https://github.com/onzag/itemize/blob/5fcde7cf/config.ts#L173)
