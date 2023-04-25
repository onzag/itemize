[@onzag/itemize](../README.md) / [Modules](../modules.md) / [config](../modules/config.md) / IDumpConfigRawJSONDataType

# Interface: IDumpConfigRawJSONDataType

[config](../modules/config.md).IDumpConfigRawJSONDataType

A structure that specifies how files are to be dumped
and then reloaded

## Table of contents

### Properties

- [load](config.IDumpConfigRawJSONDataType.md#load)
- [save](config.IDumpConfigRawJSONDataType.md#save)

## Properties

### load

• **load**: `Object`

Specifies how the dump is to be loaded

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `previousContainerIdMapper?` | `Object` | Map previous containers that have been dumped to new containers, the previous container id mapper has priority over the version mapper, it will try to get one from the list in order of priority |
| `primaryContainerId` | `string` | If none of the version mappers nor the previous container id mappers match and the previous container id is not found in the current configuration this container will be used instead |
| `versionMapper?` | `Object` | Specifies a container based on a version, it will try to get one from the list in order of priority |

#### Defined in

[config.ts:199](https://github.com/onzag/itemize/blob/f2db74a5/config.ts#L199)

___

### save

• **save**: `boolean` \| [`IDumpSpecificModInfoType`](config.IDumpSpecificModInfoType.md)

Specifies the dump process
If it's a boolean, dump all, otherwse
we only dump specific modules

#### Defined in

[config.ts:194](https://github.com/onzag/itemize/blob/f2db74a5/config.ts#L194)
