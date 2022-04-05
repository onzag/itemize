[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/rest

# Module: server/rest

This provides the rest endpoints for the itemize app

## Table of contents

### Functions

- [default](server_rest.md#default)

## Functions

### default

▸ **default**(`appData`): `Router`

this function contains and build all the rest services
by returning a router that holds them inside the
/rest/ endpoint

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | the app data that it passes |

#### Returns

`Router`

#### Defined in

[server/rest.ts:24](https://github.com/onzag/itemize/blob/f2f29986/server/rest.ts#L24)
