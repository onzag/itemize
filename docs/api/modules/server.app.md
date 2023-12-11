[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server](server.md) / app

# Namespace: app

[server](server.md).app

## Table of contents

### Variables

- [\_router](server.app.md#_router)
- [locals](server.app.md#locals)
- [map](server.app.md#map)
- [mountpath](server.app.md#mountpath)
- [request](server.app.md#request)
- [resource](server.app.md#resource)
- [response](server.app.md#response)
- [router](server.app.md#router)
- [routes](server.app.md#routes)
- [settings](server.app.md#settings)
- [stack](server.app.md#stack)

### Functions

- [addListener](server.app.md#addlistener)
- [all](server.app.md#all)
- [checkout](server.app.md#checkout)
- [connect](server.app.md#connect)
- [copy](server.app.md#copy)
- [defaultConfiguration](server.app.md#defaultconfiguration)
- [delete](server.app.md#delete)
- [disable](server.app.md#disable)
- [disabled](server.app.md#disabled)
- [emit](server.app.md#emit)
- [enable](server.app.md#enable)
- [enabled](server.app.md#enabled)
- [engine](server.app.md#engine)
- [eventNames](server.app.md#eventnames)
- [get](server.app.md#get)
- [getMaxListeners](server.app.md#getmaxlisteners)
- [head](server.app.md#head)
- [init](server.app.md#init)
- [link](server.app.md#link)
- [listen](server.app.md#listen)
- [listenerCount](server.app.md#listenercount)
- [listeners](server.app.md#listeners)
- [lock](server.app.md#lock)
- [m-search](server.app.md#m-search)
- [merge](server.app.md#merge)
- [mkactivity](server.app.md#mkactivity)
- [mkcol](server.app.md#mkcol)
- [move](server.app.md#move)
- [notify](server.app.md#notify)
- [off](server.app.md#off)
- [on](server.app.md#on)
- [once](server.app.md#once)
- [options](server.app.md#options)
- [param](server.app.md#param)
- [patch](server.app.md#patch)
- [path](server.app.md#path)
- [post](server.app.md#post)
- [prependListener](server.app.md#prependlistener)
- [prependOnceListener](server.app.md#prependoncelistener)
- [propfind](server.app.md#propfind)
- [proppatch](server.app.md#proppatch)
- [purge](server.app.md#purge)
- [put](server.app.md#put)
- [rawListeners](server.app.md#rawlisteners)
- [removeAllListeners](server.app.md#removealllisteners)
- [removeListener](server.app.md#removelistener)
- [render](server.app.md#render)
- [report](server.app.md#report)
- [route](server.app.md#route)
- [search](server.app.md#search)
- [set](server.app.md#set)
- [setMaxListeners](server.app.md#setmaxlisteners)
- [subscribe](server.app.md#subscribe)
- [trace](server.app.md#trace)
- [unlink](server.app.md#unlink)
- [unlock](server.app.md#unlock)
- [unsubscribe](server.app.md#unsubscribe)
- [use](server.app.md#use)

## Variables

### \_router

• **\_router**: `any`

Used to get all registered routes in Express Application

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1237

___

### locals

• **locals**: `Record`\<`string`, `any`\> & `Locals`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1222

___

### map

• **map**: `any`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1220

___

### mountpath

• **mountpath**: `string` \| `string`[]

The app.mountpath property contains one or more path patterns on which a sub-app was mounted.

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1255

___

### request

• **request**: `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1259

___

### resource

• **resource**: `any`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1218

___

### response

• **response**: `Response`\<`any`, `Record`\<`string`, `any`\>, `number`\>

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1260

___

### router

• **router**: `string`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1214

___

### routes

• **routes**: `any`

The app.routes object houses all of the routes defined mapped by the
associated HTTP verb. This object may be used for introspection
capabilities, for example Express uses this internally not only for
routing but to provide default OPTIONS behaviour unless app.options()
is used. Your application or framework may also remove routes by
simply by removing them from this object.

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1232

___

### settings

• **settings**: `any`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1216

___

### stack

• **stack**: `any`[]

Stack of configured routes

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:295

## Functions

### addListener

▸ **addListener**(`event`, `listener`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

`Express`

#### Defined in

node_modules/@types/node/globals.d.ts:569

___

### all

▸ **all**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **all**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **all**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **all**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **all**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### checkout

▸ **checkout**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **checkout**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **checkout**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **checkout**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **checkout**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### connect

▸ **connect**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **connect**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **connect**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **connect**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **connect**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### copy

▸ **copy**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **copy**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **copy**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **copy**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **copy**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### defaultConfiguration

▸ **defaultConfiguration**(): `void`

Initialize application configuration.

#### Returns

`void`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1075

___

### delete

▸ **delete**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **delete**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **delete**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **delete**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **delete**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### disable

▸ **disable**(`setting`): `Express`

Disable `setting`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `setting` | `string` |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1174

___

### disabled

▸ **disabled**(`setting`): `boolean`

Check if `setting` is disabled.

   app.disabled('foo')
   // => true

   app.enable('foo')
   app.disabled('foo')
   // => false

#### Parameters

| Name | Type |
| :------ | :------ |
| `setting` | `string` |

#### Returns

`boolean`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1168

___

### emit

▸ **emit**(`event`, `...args`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `...args` | `any`[] |

#### Returns

`boolean`

#### Defined in

node_modules/@types/node/globals.d.ts:579

___

### enable

▸ **enable**(`setting`): `Express`

Enable `setting`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `setting` | `string` |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1171

___

### enabled

▸ **enabled**(`setting`): `boolean`

Check if `setting` is enabled (truthy).

   app.enabled('foo')
   // => false

   app.enable('foo')
   app.enabled('foo')
   // => true

#### Parameters

| Name | Type |
| :------ | :------ |
| `setting` | `string` |

#### Returns

`boolean`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1156

___

### engine

▸ **engine**(`ext`, `fn`): `Express`

Register the given template engine callback `fn`
as `ext`.

By default will `require()` the engine based on the
file extension. For example if you try to render
a "foo.jade" file Express will invoke the following internally:

    app.engine('jade', require('jade').__express);

For engines that do not provide `.__express` out of the box,
or if you wish to "map" a different extension to the template engine
you may use this method. For example mapping the EJS template engine to
".html" files:

    app.engine('html', require('ejs').renderFile);

In this case EJS provides a `.renderFile()` method with
the same signature that Express expects: `(path, options, callback)`,
though note that it aliases this method as `ejs.__express` internally
so if you're using ".ejs" extensions you dont need to do anything.

Some template engines do not follow this convention, the
[Consolidate.js](https://github.com/visionmedia/consolidate.js)
library was created to map all of node's popular template
engines to follow this convention, thus allowing them to
work seamlessly within Express.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ext` | `string` |
| `fn` | (`path`: `string`, `options`: `object`, `callback`: (`e`: `any`, `rendered?`: `string`) => `void`) => `void` |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1105

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

#### Returns

(`string` \| `symbol`)[]

#### Defined in

node_modules/@types/node/globals.d.ts:584

___

### get

▸ **get**(`name`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`any`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1123

▸ **get**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **get**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **get**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **get**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **get**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

#### Returns

`number`

#### Defined in

node_modules/@types/node/globals.d.ts:576

___

### head

▸ **head**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **head**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **head**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **head**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **head**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### init

▸ **init**(): `void`

Initialize the server.

  - setup default configuration
  - setup default middleware
  - setup route reflection methods

#### Returns

`void`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1070

___

### link

▸ **link**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **link**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **link**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **link**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **link**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### listen

▸ **listen**(`port`, `hostname`, `backlog`, `callback?`): `Server`

Listen for connections.

A node `http.Server` is returned, with this
application (which is a `Function`) as its
callback. If you wish to create both an HTTP
and HTTPS server you may do so with the "http"
and "https" modules as shown here:

   var http = require('http')
     , https = require('https')
     , express = require('express')
     , app = express();

   http.createServer(app).listen(80);
   https.createServer({ ... }, app).listen(443);

#### Parameters

| Name | Type |
| :------ | :------ |
| `port` | `number` |
| `hostname` | `string` |
| `backlog` | `number` |
| `callback?` | () => `void` |

#### Returns

`Server`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1207

▸ **listen**(`port`, `hostname`, `callback?`): `Server`

#### Parameters

| Name | Type |
| :------ | :------ |
| `port` | `number` |
| `hostname` | `string` |
| `callback?` | () => `void` |

#### Returns

`Server`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1208

▸ **listen**(`port`, `callback?`): `Server`

#### Parameters

| Name | Type |
| :------ | :------ |
| `port` | `number` |
| `callback?` | () => `void` |

#### Returns

`Server`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1209

▸ **listen**(`callback?`): `Server`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback?` | () => `void` |

#### Returns

`Server`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1210

▸ **listen**(`path`, `callback?`): `Server`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `callback?` | () => `void` |

#### Returns

`Server`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1211

▸ **listen**(`handle`, `listeningListener?`): `Server`

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | `any` |
| `listeningListener?` | () => `void` |

#### Returns

`Server`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1212

___

### listenerCount

▸ **listenerCount**(`type`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` \| `symbol` |

#### Returns

`number`

#### Defined in

node_modules/@types/node/globals.d.ts:580

___

### listeners

▸ **listeners**(`event`): `Function`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Defined in

node_modules/@types/node/globals.d.ts:577

___

### lock

▸ **lock**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **lock**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **lock**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **lock**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **lock**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### m-search

▸ **m-search**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **m-search**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **m-search**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **m-search**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **m-search**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### merge

▸ **merge**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **merge**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **merge**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **merge**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **merge**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### mkactivity

▸ **mkactivity**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **mkactivity**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **mkactivity**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **mkactivity**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **mkactivity**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### mkcol

▸ **mkcol**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **mkcol**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **mkcol**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **mkcol**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **mkcol**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### move

▸ **move**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **move**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **move**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **move**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **move**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### notify

▸ **notify**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **notify**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **notify**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **notify**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **notify**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### off

▸ **off**(`event`, `listener`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

`Express`

#### Defined in

node_modules/@types/node/globals.d.ts:573

___

### on

▸ **on**(`event`, `callback`): `Express`

The mount event is fired on a sub-app, when it is mounted on a parent app.
The parent app is passed to the callback function.

NOTE:
Sub-apps will:
 - Not inherit the value of settings that have a default value. You must set the value in the sub-app.
 - Inherit the value of settings with no default value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `callback` | (`parent`: `Application`\<`Record`\<`string`, `any`\>\>) => `void` |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1250

___

### once

▸ **once**(`event`, `listener`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

`Express`

#### Defined in

node_modules/@types/node/globals.d.ts:571

___

### options

▸ **options**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **options**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **options**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **options**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **options**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### param

▸ **param**(`name`, `handler`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` \| `string`[] |
| `handler` | `RequestParamHandler` |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1125

▸ **param**(`callback`): `Express`

Alternatively, you can pass only a callback, in which case you have the opportunity to alter the app.param()

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`name`: `string`, `matcher`: `RegExp`) => `RequestParamHandler` |

#### Returns

`Express`

**`Deprecated`**

since version 4.11

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1132

___

### patch

▸ **patch**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **patch**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **patch**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **patch**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **patch**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### path

▸ **path**(): `string`

Return the app's absolute pathname
based on the parent(s) that have
mounted it.

For example if the application was
mounted as "/admin", which itself
was mounted as "/blog" then the
return value would be "/blog/admin".

#### Returns

`string`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1144

___

### post

▸ **post**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **post**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **post**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **post**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **post**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### prependListener

▸ **prependListener**(`event`, `listener`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

`Express`

#### Defined in

node_modules/@types/node/globals.d.ts:582

___

### prependOnceListener

▸ **prependOnceListener**(`event`, `listener`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

`Express`

#### Defined in

node_modules/@types/node/globals.d.ts:583

___

### propfind

▸ **propfind**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **propfind**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **propfind**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **propfind**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **propfind**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### proppatch

▸ **proppatch**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **proppatch**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **proppatch**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **proppatch**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **proppatch**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### purge

▸ **purge**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **purge**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **purge**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **purge**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **purge**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### put

▸ **put**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **put**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **put**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **put**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **put**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### rawListeners

▸ **rawListeners**(`event`): `Function`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Defined in

node_modules/@types/node/globals.d.ts:578

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

`Express`

#### Defined in

node_modules/@types/node/globals.d.ts:574

___

### removeListener

▸ **removeListener**(`event`, `listener`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

`Express`

#### Defined in

node_modules/@types/node/globals.d.ts:572

___

### render

▸ **render**(`name`, `options?`, `callback?`): `void`

Render the given view `name` name with `options`
and a callback accepting an error and the
rendered template string.

Example:

   app.render('email', { name: 'Tobi' }, function(err, html){
     // ...
   })

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options?` | `object` |
| `callback?` | (`err`: `Error`, `html`: `string`) => `void` |

#### Returns

`void`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1187

▸ **render**(`name`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `callback` | (`err`: `Error`, `html`: `string`) => `void` |

#### Returns

`void`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1188

___

### report

▸ **report**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **report**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **report**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **report**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **report**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### route

▸ **route**\<`T`\>(`prefix`): `IRoute`\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefix` | `T` |

#### Returns

`IRoute`\<`T`\>

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:290

▸ **route**(`prefix`): `IRoute`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefix` | `PathParams` |

#### Returns

`IRoute`\<`string`\>

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:291

___

### search

▸ **search**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **search**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **search**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **search**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **search**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### set

▸ **set**(`setting`, `val`): `Express`

Assign `setting` to `val`, or return `setting`'s value.

   app.set('foo', 'bar');
   app.get('foo');
   // => "bar"
   app.set('foo', ['bar', 'baz']);
   app.get('foo');
   // => ["bar", "baz"]

Mounted servers inherit their parent server's settings.

#### Parameters

| Name | Type |
| :------ | :------ |
| `setting` | `string` |
| `val` | `any` |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1122

___

### setMaxListeners

▸ **setMaxListeners**(`n`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`Express`

#### Defined in

node_modules/@types/node/globals.d.ts:575

___

### subscribe

▸ **subscribe**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **subscribe**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **subscribe**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **subscribe**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **subscribe**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### trace

▸ **trace**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **trace**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **trace**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **trace**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **trace**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### unlink

▸ **unlink**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **unlink**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **unlink**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **unlink**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **unlink**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### unlock

▸ **unlock**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **unlock**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **unlock**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **unlock**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **unlock**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### unsubscribe

▸ **unsubscribe**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **unsubscribe**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **unsubscribe**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **unsubscribe**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **unsubscribe**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164

___

### use

▸ **use**(`...handlers`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...handlers` | `RequestHandler`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:168

▸ **use**(`...handlers`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...handlers` | `RequestHandlerParams`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:169

▸ **use**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:170

▸ **use**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:181

▸ **use**\<`Route`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends `string` |
| `P` | `RouteParameters`\<`Route`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Route` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:116

▸ **use**\<`Path`, `P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Path` | extends `string` |
| `P` | `RouteParameters`\<`Path`\> |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Path` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:129

▸ **use**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandler`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:142

▸ **use**\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>(`path`, `...handlers`): `Express`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `ParamsDictionary` |
| `ResBody` | `any` |
| `ReqBody` | `any` |
| `ReqQuery` | `ParsedQs` |
| `LocalsObj` | extends `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `...handlers` | `RequestHandlerParams`\<`P`, `ResBody`, `ReqBody`, `ReqQuery`, `LocalsObj`\>[] |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:153

▸ **use**(`path`, `subApplication`): `Express`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `PathParams` |
| `subApplication` | `Application`\<`Record`\<`string`, `any`\>\> |

#### Returns

`Express`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:164
