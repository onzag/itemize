[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/initialize

# Module: server/initialize

This file contains the initialization function that initializes
the itemize application, just basically setting up the rest endpoints
and whatever the server requires to show something to the client

## Table of contents

### Functions

- [initializeApp](server_initialize.md#initializeapp)

## Functions

### initializeApp

▸ **initializeApp**(`appData`, `custom`, `routers`): `void`

Initializes the server application with its configuration

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | the application data to use |
| `custom` | [`IServerCustomizationDataType`](../interfaces/server.IServerCustomizationDataType.md) | the custom config that has been passed |
| `routers` | `Router`[] | - |

#### Returns

`void`

#### Defined in

[server/initialize.ts:108](https://github.com/onzag/itemize/blob/f2db74a5/server/initialize.ts#L108)
