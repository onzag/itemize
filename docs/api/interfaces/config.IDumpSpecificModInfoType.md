[@onzag/itemize](../README.md) / [Modules](../modules.md) / [config](../modules/config.md) / IDumpSpecificModInfoType

# Interface: IDumpSpecificModInfoType

[config](../modules/config.md).IDumpSpecificModInfoType

Specification to dump specific modules

## Indexable

▪ [modPath: `string`]: `boolean` \| ``"all"`` \| ``"only-unversioned"`` \| (`string` \| [`string`, `string`])[] \| [`IDumpSpecificIdefInfoType`](config.IDumpSpecificIdefInfoType.md)

The module path as module/submodule
if it's a boolean dump all
if it's an array with string, or string string, dump the specific id, version combo
otherwise dump only specific item definition types
