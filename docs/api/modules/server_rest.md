[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/rest

# Module: server/rest

This provides the rest endpoints for the itemize app

## Table of contents

### Functions

- [default](server_rest.md#default)

## Functions

### default

▸ **default**(`appData`): `Object`

this function contains and build all the rest services
by returning a router that holds them inside the
/rest/ endpoint

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | the app data that it passes |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `reprocessedCache` | `Object` |
| `router` | `Router` |

#### Defined in

[server/rest.ts:28](https://github.com/onzag/itemize/blob/f2db74a5/server/rest.ts#L28)
