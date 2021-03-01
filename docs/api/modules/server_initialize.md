[](../README.md) / [Exports](../modules.md) / server/initialize

# Module: server/initialize

This file contains the initialization function that initializes
the itemize application, just basically setting up the rest endpoints
and whatever the server requires to show something to the client

## Table of contents

### Functions

- [initializeApp](server_initialize.md#initializeapp)

## Functions

### initializeApp

▸ **initializeApp**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md), `custom`: [*IServerCustomizationDataType*](../interfaces/server.iservercustomizationdatatype.md), `routers`: express.Router[]): *void*

Initializes the server application with its configuration

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) | the application data to use   |
`custom` | [*IServerCustomizationDataType*](../interfaces/server.iservercustomizationdatatype.md) | the custom config that has been passed    |
`routers` | express.Router[] | - |

**Returns:** *void*

Defined in: [server/initialize.ts:109](https://github.com/onzag/itemize/blob/0569bdf2/server/initialize.ts#L109)
