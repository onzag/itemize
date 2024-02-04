[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/mode

# Module: server/mode

Specifies the mode we are in, not the NODE_ENV mode for the server side but rather what
the client is expecting, development builds or production; what does the user want
normally both NODE_ENV should match with what the server is running but this
might not be the case when a devkey is used

## Table of contents

### Functions

- [getCookie](server_mode.md#getcookie)
- [getMode](server_mode.md#getmode)

## Functions

### getCookie

▸ **getCookie**(`splittedCookie`, `name`): `string`

Provides the value of a cookie using a very cheap method

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `splittedCookie` | `string`[] | the splitted cookie value |
| `name` | `string` | the name we want to retrieve |

#### Returns

`string`

#### Defined in

[server/mode.ts:18](https://github.com/onzag/itemize/blob/73e0c39e/server/mode.ts#L18)

___

### getMode

▸ **getMode**(`appData`, `req`): ``"development"`` \| ``"production"``

Specifies the mode that our application is running at

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | the application data |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> | the request we need to check against |

#### Returns

``"development"`` \| ``"production"``

#### Defined in

[server/mode.ts:34](https://github.com/onzag/itemize/blob/73e0c39e/server/mode.ts#L34)
