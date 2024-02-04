[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/global-manager

# Module: server/global-manager

## Table of contents

### Classes

- [GlobalManager](../classes/server_global_manager.GlobalManager.md)

### Type Aliases

- [InitialExecutionServerDataFn](server_global_manager.md#initialexecutionserverdatafn)

## Type Aliases

### InitialExecutionServerDataFn

Ƭ **InitialExecutionServerDataFn**: (`manager`: [`GlobalManager`](../classes/server_global_manager.GlobalManager.md)) => `Promise`\<`void`\> \| `void`

#### Type declaration

▸ (`manager`): `Promise`\<`void`\> \| `void`

This function is to be executed during intialization of the global manager
in server data mode, in order for you, the developer to setup server
data and other resources

##### Parameters

| Name | Type |
| :------ | :------ |
| `manager` | [`GlobalManager`](../classes/server_global_manager.GlobalManager.md) |

##### Returns

`Promise`\<`void`\> \| `void`

#### Defined in

[server/global-manager.ts:54](https://github.com/onzag/itemize/blob/73e0c39e/server/global-manager.ts#L54)
