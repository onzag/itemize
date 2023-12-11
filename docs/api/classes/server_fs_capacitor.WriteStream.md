[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/fs-capacitor](../modules/server_fs_capacitor.md) / WriteStream

# Class: WriteStream

[server/fs-capacitor](../modules/server_fs_capacitor.md).WriteStream

## Hierarchy

- `Writable`

  ↳ **`WriteStream`**

## Table of contents

### Constructors

- [constructor](server_fs_capacitor.WriteStream.md#constructor)

### Properties

- [\_fd](server_fs_capacitor.WriteStream.md#_fd)
- [\_path](server_fs_capacitor.WriteStream.md#_path)
- [\_pos](server_fs_capacitor.WriteStream.md#_pos)
- [\_readStreams](server_fs_capacitor.WriteStream.md#_readstreams)
- [\_released](server_fs_capacitor.WriteStream.md#_released)
- [destroyed](server_fs_capacitor.WriteStream.md#destroyed)
- [writable](server_fs_capacitor.WriteStream.md#writable)
- [writableCorked](server_fs_capacitor.WriteStream.md#writablecorked)
- [writableEnded](server_fs_capacitor.WriteStream.md#writableended)
- [writableFinished](server_fs_capacitor.WriteStream.md#writablefinished)
- [writableHighWaterMark](server_fs_capacitor.WriteStream.md#writablehighwatermark)
- [writableLength](server_fs_capacitor.WriteStream.md#writablelength)
- [writableObjectMode](server_fs_capacitor.WriteStream.md#writableobjectmode)
- [captureRejectionSymbol](server_fs_capacitor.WriteStream.md#capturerejectionsymbol)
- [captureRejections](server_fs_capacitor.WriteStream.md#capturerejections)
- [defaultMaxListeners](server_fs_capacitor.WriteStream.md#defaultmaxlisteners)
- [errorMonitor](server_fs_capacitor.WriteStream.md#errormonitor)

### Methods

- [\_cleanup](server_fs_capacitor.WriteStream.md#_cleanup)
- [\_cleanupSync](server_fs_capacitor.WriteStream.md#_cleanupsync)
- [\_destroy](server_fs_capacitor.WriteStream.md#_destroy)
- [\_final](server_fs_capacitor.WriteStream.md#_final)
- [\_write](server_fs_capacitor.WriteStream.md#_write)
- [\_writev](server_fs_capacitor.WriteStream.md#_writev)
- [addListener](server_fs_capacitor.WriteStream.md#addlistener)
- [cork](server_fs_capacitor.WriteStream.md#cork)
- [createReadStream](server_fs_capacitor.WriteStream.md#createreadstream)
- [destroy](server_fs_capacitor.WriteStream.md#destroy)
- [emit](server_fs_capacitor.WriteStream.md#emit)
- [end](server_fs_capacitor.WriteStream.md#end)
- [eventNames](server_fs_capacitor.WriteStream.md#eventnames)
- [getMaxListeners](server_fs_capacitor.WriteStream.md#getmaxlisteners)
- [listenerCount](server_fs_capacitor.WriteStream.md#listenercount)
- [listeners](server_fs_capacitor.WriteStream.md#listeners)
- [off](server_fs_capacitor.WriteStream.md#off)
- [on](server_fs_capacitor.WriteStream.md#on)
- [once](server_fs_capacitor.WriteStream.md#once)
- [pipe](server_fs_capacitor.WriteStream.md#pipe)
- [prependListener](server_fs_capacitor.WriteStream.md#prependlistener)
- [prependOnceListener](server_fs_capacitor.WriteStream.md#prependoncelistener)
- [rawListeners](server_fs_capacitor.WriteStream.md#rawlisteners)
- [release](server_fs_capacitor.WriteStream.md#release)
- [removeAllListeners](server_fs_capacitor.WriteStream.md#removealllisteners)
- [removeListener](server_fs_capacitor.WriteStream.md#removelistener)
- [setDefaultEncoding](server_fs_capacitor.WriteStream.md#setdefaultencoding)
- [setMaxListeners](server_fs_capacitor.WriteStream.md#setmaxlisteners)
- [uncork](server_fs_capacitor.WriteStream.md#uncork)
- [write](server_fs_capacitor.WriteStream.md#write)
- [listenerCount](server_fs_capacitor.WriteStream.md#listenercount-1)
- [on](server_fs_capacitor.WriteStream.md#on-1)
- [once](server_fs_capacitor.WriteStream.md#once-1)

## Constructors

### constructor

• **new WriteStream**(`options?`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`WriteStreamOptions`](../interfaces/server_fs_capacitor.WriteStreamOptions.md) |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Overrides

Writable.constructor

#### Defined in

[server/fs-capacitor.ts:108](https://github.com/onzag/itemize/blob/59702dd5/server/fs-capacitor.ts#L108)

## Properties

### \_fd

• `Private` **\_fd**: `number` = `null`

#### Defined in

[server/fs-capacitor.ts:102](https://github.com/onzag/itemize/blob/59702dd5/server/fs-capacitor.ts#L102)

___

### \_path

• `Private` **\_path**: `string` = `null`

#### Defined in

[server/fs-capacitor.ts:103](https://github.com/onzag/itemize/blob/59702dd5/server/fs-capacitor.ts#L103)

___

### \_pos

• `Private` **\_pos**: `number` = `0`

#### Defined in

[server/fs-capacitor.ts:104](https://github.com/onzag/itemize/blob/59702dd5/server/fs-capacitor.ts#L104)

___

### \_readStreams

• `Private` **\_readStreams**: `Set`\<[`ReadStream`](server_fs_capacitor.ReadStream.md)\>

#### Defined in

[server/fs-capacitor.ts:105](https://github.com/onzag/itemize/blob/59702dd5/server/fs-capacitor.ts#L105)

___

### \_released

• `Private` **\_released**: `boolean` = `false`

#### Defined in

[server/fs-capacitor.ts:106](https://github.com/onzag/itemize/blob/59702dd5/server/fs-capacitor.ts#L106)

___

### destroyed

• **destroyed**: `boolean`

#### Inherited from

Writable.destroyed

#### Defined in

node_modules/@types/node/stream.d.ts:148

___

### writable

• `Readonly` **writable**: `boolean`

#### Inherited from

Writable.writable

#### Defined in

node_modules/@types/node/stream.d.ts:141

___

### writableCorked

• `Readonly` **writableCorked**: `number`

#### Inherited from

Writable.writableCorked

#### Defined in

node_modules/@types/node/stream.d.ts:147

___

### writableEnded

• `Readonly` **writableEnded**: `boolean`

#### Inherited from

Writable.writableEnded

#### Defined in

node_modules/@types/node/stream.d.ts:142

___

### writableFinished

• `Readonly` **writableFinished**: `boolean`

#### Inherited from

Writable.writableFinished

#### Defined in

node_modules/@types/node/stream.d.ts:143

___

### writableHighWaterMark

• `Readonly` **writableHighWaterMark**: `number`

#### Inherited from

Writable.writableHighWaterMark

#### Defined in

node_modules/@types/node/stream.d.ts:144

___

### writableLength

• `Readonly` **writableLength**: `number`

#### Inherited from

Writable.writableLength

#### Defined in

node_modules/@types/node/stream.d.ts:145

___

### writableObjectMode

• `Readonly` **writableObjectMode**: `boolean`

#### Inherited from

Writable.writableObjectMode

#### Defined in

node_modules/@types/node/stream.d.ts:146

___

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](server_fs_capacitor.ReadStream.md#capturerejectionsymbol)

#### Inherited from

Writable.captureRejectionSymbol

#### Defined in

node_modules/@types/node/events.d.ts:38

___

### captureRejections

▪ `Static` **captureRejections**: `boolean`

Sets or gets the default captureRejection value for all emitters.

#### Inherited from

Writable.captureRejections

#### Defined in

node_modules/@types/node/events.d.ts:44

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

#### Inherited from

Writable.defaultMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:45

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: typeof [`errorMonitor`](server_fs_capacitor.ReadStream.md#errormonitor)

This symbol shall be used to install a listener for only monitoring `'error'`
events. Listeners installed using this symbol are called before the regular
`'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an
`'error'` event is emitted, therefore the process will still crash if no
regular `'error'` listener is installed.

#### Inherited from

Writable.errorMonitor

#### Defined in

node_modules/@types/node/events.d.ts:37

## Methods

### \_cleanup

▸ **_cleanup**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`error`: `Error`) => `void` |

#### Returns

`void`

#### Defined in

[server/fs-capacitor.ts:143](https://github.com/onzag/itemize/blob/59702dd5/server/fs-capacitor.ts#L143)

___

### \_cleanupSync

▸ **_cleanupSync**(): `void`

#### Returns

`void`

#### Defined in

[server/fs-capacitor.ts:169](https://github.com/onzag/itemize/blob/59702dd5/server/fs-capacitor.ts#L169)

___

### \_destroy

▸ **_destroy**(`error`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |
| `callback` | (`error?`: `Error`) => `any` |

#### Returns

`void`

#### Overrides

Writable.\_destroy

#### Defined in

[server/fs-capacitor.ts:232](https://github.com/onzag/itemize/blob/59702dd5/server/fs-capacitor.ts#L232)

___

### \_final

▸ **_final**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`error?`: `Error`) => `any` |

#### Returns

`void`

#### Overrides

Writable.\_final

#### Defined in

[server/fs-capacitor.ts:190](https://github.com/onzag/itemize/blob/59702dd5/server/fs-capacitor.ts#L190)

___

### \_write

▸ **_write**(`chunk`, `encoding`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `Buffer` |
| `encoding` | `string` |
| `callback` | (`error?`: `Error`) => `any` |

#### Returns

`void`

#### Overrides

Writable.\_write

#### Defined in

[server/fs-capacitor.ts:198](https://github.com/onzag/itemize/blob/59702dd5/server/fs-capacitor.ts#L198)

___

### \_writev

▸ **_writev**(`chunks`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunks` | \{ `chunk`: `any` ; `encoding`: `string`  }[] |
| `callback` | (`error?`: `Error`) => `void` |

#### Returns

`void`

#### Inherited from

Writable.\_writev

#### Defined in

node_modules/@types/node/stream.d.ts:151

___

### addListener

▸ **addListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

Event emitter
The defined events on documents including:
1. close
2. drain
3. error
4. finish
5. pipe
6. unpipe

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:174

▸ **addListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"drain"`` |
| `listener` | () => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:175

▸ **addListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: `Error`) => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:176

▸ **addListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"finish"`` |
| `listener` | () => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:177

▸ **addListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pipe"`` |
| `listener` | (`src`: `Readable`) => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:178

▸ **addListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unpipe"`` |
| `listener` | (`src`: `Readable`) => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:179

▸ **addListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:180

___

### cork

▸ **cork**(): `void`

#### Returns

`void`

#### Inherited from

Writable.cork

#### Defined in

node_modules/@types/node/stream.d.ts:160

___

### createReadStream

▸ **createReadStream**(`options?`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`ReadStreamOptions`](../interfaces/server_fs_capacitor.ReadStreamOptions.md) |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Defined in

[server/fs-capacitor.ts:260](https://github.com/onzag/itemize/blob/59702dd5/server/fs-capacitor.ts#L260)

___

### destroy

▸ **destroy**(`error?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error?` | `Error` |

#### Returns

`void`

#### Inherited from

Writable.destroy

#### Defined in

node_modules/@types/node/stream.d.ts:162

___

### emit

▸ **emit**(`event`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |

#### Returns

`boolean`

#### Inherited from

Writable.emit

#### Defined in

node_modules/@types/node/stream.d.ts:182

▸ **emit**(`event`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"drain"`` |

#### Returns

`boolean`

#### Inherited from

Writable.emit

#### Defined in

node_modules/@types/node/stream.d.ts:183

▸ **emit**(`event`, `err`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `err` | `Error` |

#### Returns

`boolean`

#### Inherited from

Writable.emit

#### Defined in

node_modules/@types/node/stream.d.ts:184

▸ **emit**(`event`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"finish"`` |

#### Returns

`boolean`

#### Inherited from

Writable.emit

#### Defined in

node_modules/@types/node/stream.d.ts:185

▸ **emit**(`event`, `src`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pipe"`` |
| `src` | `Readable` |

#### Returns

`boolean`

#### Inherited from

Writable.emit

#### Defined in

node_modules/@types/node/stream.d.ts:186

▸ **emit**(`event`, `src`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unpipe"`` |
| `src` | `Readable` |

#### Returns

`boolean`

#### Inherited from

Writable.emit

#### Defined in

node_modules/@types/node/stream.d.ts:187

▸ **emit**(`event`, `...args`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `...args` | `any`[] |

#### Returns

`boolean`

#### Inherited from

Writable.emit

#### Defined in

node_modules/@types/node/stream.d.ts:188

___

### end

▸ **end**(`cb?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb?` | () => `void` |

#### Returns

`void`

#### Inherited from

Writable.end

#### Defined in

node_modules/@types/node/stream.d.ts:157

▸ **end**(`chunk`, `cb?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `any` |
| `cb?` | () => `void` |

#### Returns

`void`

#### Inherited from

Writable.end

#### Defined in

node_modules/@types/node/stream.d.ts:158

▸ **end**(`chunk`, `encoding`, `cb?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `any` |
| `encoding` | `string` |
| `cb?` | () => `void` |

#### Returns

`void`

#### Inherited from

Writable.end

#### Defined in

node_modules/@types/node/stream.d.ts:159

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

Writable.eventNames

#### Defined in

node_modules/@types/node/globals.d.ts:584

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

#### Returns

`number`

#### Inherited from

Writable.getMaxListeners

#### Defined in

node_modules/@types/node/globals.d.ts:576

___

### listenerCount

▸ **listenerCount**(`type`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` \| `symbol` |

#### Returns

`number`

#### Inherited from

Writable.listenerCount

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

#### Inherited from

Writable.listeners

#### Defined in

node_modules/@types/node/globals.d.ts:577

___

### off

▸ **off**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.off

#### Defined in

node_modules/@types/node/globals.d.ts:573

___

### on

▸ **on**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.on

#### Defined in

node_modules/@types/node/stream.d.ts:190

▸ **on**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"drain"`` |
| `listener` | () => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.on

#### Defined in

node_modules/@types/node/stream.d.ts:191

▸ **on**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: `Error`) => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.on

#### Defined in

node_modules/@types/node/stream.d.ts:192

▸ **on**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"finish"`` |
| `listener` | () => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.on

#### Defined in

node_modules/@types/node/stream.d.ts:193

▸ **on**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pipe"`` |
| `listener` | (`src`: `Readable`) => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.on

#### Defined in

node_modules/@types/node/stream.d.ts:194

▸ **on**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unpipe"`` |
| `listener` | (`src`: `Readable`) => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.on

#### Defined in

node_modules/@types/node/stream.d.ts:195

▸ **on**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.on

#### Defined in

node_modules/@types/node/stream.d.ts:196

___

### once

▸ **once**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.once

#### Defined in

node_modules/@types/node/stream.d.ts:198

▸ **once**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"drain"`` |
| `listener` | () => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.once

#### Defined in

node_modules/@types/node/stream.d.ts:199

▸ **once**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: `Error`) => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.once

#### Defined in

node_modules/@types/node/stream.d.ts:200

▸ **once**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"finish"`` |
| `listener` | () => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.once

#### Defined in

node_modules/@types/node/stream.d.ts:201

▸ **once**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pipe"`` |
| `listener` | (`src`: `Readable`) => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.once

#### Defined in

node_modules/@types/node/stream.d.ts:202

▸ **once**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unpipe"`` |
| `listener` | (`src`: `Readable`) => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.once

#### Defined in

node_modules/@types/node/stream.d.ts:203

▸ **once**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.once

#### Defined in

node_modules/@types/node/stream.d.ts:204

___

### pipe

▸ **pipe**\<`T`\>(`destination`, `options?`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `WritableStream`\<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `destination` | `T` |
| `options?` | `Object` |
| `options.end?` | `boolean` |

#### Returns

`T`

#### Inherited from

Writable.pipe

#### Defined in

node_modules/@types/node/stream.d.ts:5

___

### prependListener

▸ **prependListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:206

▸ **prependListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"drain"`` |
| `listener` | () => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:207

▸ **prependListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: `Error`) => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:208

▸ **prependListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"finish"`` |
| `listener` | () => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:209

▸ **prependListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pipe"`` |
| `listener` | (`src`: `Readable`) => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:210

▸ **prependListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unpipe"`` |
| `listener` | (`src`: `Readable`) => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:211

▸ **prependListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:212

___

### prependOnceListener

▸ **prependOnceListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:214

▸ **prependOnceListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"drain"`` |
| `listener` | () => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:215

▸ **prependOnceListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: `Error`) => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:216

▸ **prependOnceListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"finish"`` |
| `listener` | () => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:217

▸ **prependOnceListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pipe"`` |
| `listener` | (`src`: `Readable`) => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:218

▸ **prependOnceListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unpipe"`` |
| `listener` | (`src`: `Readable`) => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:219

▸ **prependOnceListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:220

___

### rawListeners

▸ **rawListeners**(`event`): `Function`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

Writable.rawListeners

#### Defined in

node_modules/@types/node/globals.d.ts:578

___

### release

▸ **release**(): `void`

#### Returns

`void`

#### Defined in

[server/fs-capacitor.ts:227](https://github.com/onzag/itemize/blob/59702dd5/server/fs-capacitor.ts#L227)

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.removeAllListeners

#### Defined in

node_modules/@types/node/globals.d.ts:574

___

### removeListener

▸ **removeListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:222

▸ **removeListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"drain"`` |
| `listener` | () => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:223

▸ **removeListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: `Error`) => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:224

▸ **removeListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"finish"`` |
| `listener` | () => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:225

▸ **removeListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pipe"`` |
| `listener` | (`src`: `Readable`) => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:226

▸ **removeListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unpipe"`` |
| `listener` | (`src`: `Readable`) => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:227

▸ **removeListener**(`event`, `listener`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:228

___

### setDefaultEncoding

▸ **setDefaultEncoding**(`encoding`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoding` | `string` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.setDefaultEncoding

#### Defined in

node_modules/@types/node/stream.d.ts:156

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Inherited from

Writable.setMaxListeners

#### Defined in

node_modules/@types/node/globals.d.ts:575

___

### uncork

▸ **uncork**(): `void`

#### Returns

`void`

#### Inherited from

Writable.uncork

#### Defined in

node_modules/@types/node/stream.d.ts:161

___

### write

▸ **write**(`chunk`, `cb?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `any` |
| `cb?` | (`error`: `Error`) => `void` |

#### Returns

`boolean`

#### Inherited from

Writable.write

#### Defined in

node_modules/@types/node/stream.d.ts:154

▸ **write**(`chunk`, `encoding`, `cb?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `any` |
| `encoding` | `string` |
| `cb?` | (`error`: `Error`) => `void` |

#### Returns

`boolean`

#### Inherited from

Writable.write

#### Defined in

node_modules/@types/node/stream.d.ts:155

___

### listenerCount

▸ **listenerCount**(`emitter`, `event`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `EventEmitter` |
| `event` | `string` \| `symbol` |

#### Returns

`number`

**`Deprecated`**

since v4.0.0

#### Inherited from

Writable.listenerCount

#### Defined in

node_modules/@types/node/events.d.ts:26

___

### on

▸ **on**(`emitter`, `event`): `AsyncIterableIterator`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `EventEmitter` |
| `event` | `string` |

#### Returns

`AsyncIterableIterator`\<`any`\>

#### Inherited from

Writable.on

#### Defined in

node_modules/@types/node/events.d.ts:23

___

### once

▸ **once**(`emitter`, `event`): `Promise`\<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `NodeEventTarget` |
| `event` | `string` \| `symbol` |

#### Returns

`Promise`\<`any`[]\>

#### Inherited from

Writable.once

#### Defined in

node_modules/@types/node/events.d.ts:21

▸ **once**(`emitter`, `event`): `Promise`\<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `DOMEventTarget` |
| `event` | `string` |

#### Returns

`Promise`\<`any`[]\>

#### Inherited from

Writable.once

#### Defined in

node_modules/@types/node/events.d.ts:22
