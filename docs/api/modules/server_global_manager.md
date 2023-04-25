[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/global-manager

# Module: server/global-manager

## Table of contents

### Classes

- [GlobalManager](../classes/server_global_manager.GlobalManager.md)

### Type aliases

- [InitialExecutionServerDataFn](server_global_manager.md#initialexecutionserverdatafn)

## Type aliases

### InitialExecutionServerDataFn

Ƭ **InitialExecutionServerDataFn**: (`manager`: [`GlobalManager`](../classes/server_global_manager.GlobalManager.md)) => `Promise`<`void`\> \| `void`

#### Type declaration

▸ (`manager`): `Promise`<`void`\> \| `void`

This function is to be executed during intialization of the global manager
in server data mode, in order for you, the developer to setup server
data and other resources

##### Parameters

| Name | Type |
| :------ | :------ |
| `manager` | [`GlobalManager`](../classes/server_global_manager.GlobalManager.md) |

##### Returns

`Promise`<`void`\> \| `void`

#### Defined in

[server/global-manager.ts:56](https://github.com/onzag/itemize/blob/f2db74a5/server/global-manager.ts#L56)
