[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/cache

# Module: server/cache

This is a very important class that contains the whole redis
wrapping that basically keeps everything synchronized, all the servers
and tells the clients that are connected to this specific instance, it provides
functionality to update, create and delete item definition values

## Table of contents

### Classes

- [Cache](../classes/server_cache.Cache.md)

### Interfaces

- [IBasicOptions](../interfaces/server_cache.IBasicOptions.md)
- [ICopyOptions](../interfaces/server_cache.ICopyOptions.md)
- [ICreationOptions](../interfaces/server_cache.ICreationOptions.md)
- [IDeleteOptions](../interfaces/server_cache.IDeleteOptions.md)
- [IUpdateOptions](../interfaces/server_cache.IUpdateOptions.md)
- [IWritingOptions](../interfaces/server_cache.IWritingOptions.md)

### Functions

- [analyzeIdefForPossibleParent](server_cache.md#analyzeidefforpossibleparent)
- [analyzeModuleForPossibleParent](server_cache.md#analyzemoduleforpossibleparent)

## Functions

### analyzeIdefForPossibleParent

▸ **analyzeIdefForPossibleParent**(`possibleParent`, `idef`): `boolean`

This function analyzes an item definition to check for a possible
parent and returns true if there's any parent rule within itself, including
its children that matches the possible parent

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `possibleParent` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the possible parent |
| `idef` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition in question |

#### Returns

`boolean`

a simple boolean

#### Defined in

[server/cache.ts:169](https://github.com/onzag/itemize/blob/73e0c39e/server/cache.ts#L169)

___

### analyzeModuleForPossibleParent

▸ **analyzeModuleForPossibleParent**(`possibleParent`, `module`): [`default`](../classes/base_Root_Module.default.md)[]

This function finds modules for a given module, including its children
that do match a possible parent rule

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `possibleParent` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the possible parent |
| `module` | [`default`](../classes/base_Root_Module.default.md) | the current module to analyze |

#### Returns

[`default`](../classes/base_Root_Module.default.md)[]

a list of modules

#### Defined in

[server/cache.ts:138](https://github.com/onzag/itemize/blob/73e0c39e/server/cache.ts#L138)
