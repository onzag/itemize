[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/fs-capacitor](../modules/server_fs_capacitor.md) / ReadStream

# Class: ReadStream

[server/fs-capacitor](../modules/server_fs_capacitor.md).ReadStream

## Hierarchy

- `Readable`

  ↳ **`ReadStream`**

## Table of contents

### Constructors

- [constructor](server_fs_capacitor.ReadStream.md#constructor)

### Properties

- [\_pos](server_fs_capacitor.ReadStream.md#_pos)
- [\_writeStream](server_fs_capacitor.ReadStream.md#_writestream)
- [destroyed](server_fs_capacitor.ReadStream.md#destroyed)
- [readable](server_fs_capacitor.ReadStream.md#readable)
- [readableEncoding](server_fs_capacitor.ReadStream.md#readableencoding)
- [readableEnded](server_fs_capacitor.ReadStream.md#readableended)
- [readableFlowing](server_fs_capacitor.ReadStream.md#readableflowing)
- [readableHighWaterMark](server_fs_capacitor.ReadStream.md#readablehighwatermark)
- [readableLength](server_fs_capacitor.ReadStream.md#readablelength)
- [readableObjectMode](server_fs_capacitor.ReadStream.md#readableobjectmode)
- [captureRejectionSymbol](server_fs_capacitor.ReadStream.md#capturerejectionsymbol)
- [captureRejections](server_fs_capacitor.ReadStream.md#capturerejections)
- [defaultMaxListeners](server_fs_capacitor.ReadStream.md#defaultmaxlisteners)
- [errorMonitor](server_fs_capacitor.ReadStream.md#errormonitor)

### Methods

- [[asyncIterator]](server_fs_capacitor.ReadStream.md#[asynciterator])
- [\_destroy](server_fs_capacitor.ReadStream.md#_destroy)
- [\_read](server_fs_capacitor.ReadStream.md#_read)
- [addListener](server_fs_capacitor.ReadStream.md#addlistener)
- [destroy](server_fs_capacitor.ReadStream.md#destroy)
- [emit](server_fs_capacitor.ReadStream.md#emit)
- [eventNames](server_fs_capacitor.ReadStream.md#eventnames)
- [getMaxListeners](server_fs_capacitor.ReadStream.md#getmaxlisteners)
- [isPaused](server_fs_capacitor.ReadStream.md#ispaused)
- [listenerCount](server_fs_capacitor.ReadStream.md#listenercount)
- [listeners](server_fs_capacitor.ReadStream.md#listeners)
- [off](server_fs_capacitor.ReadStream.md#off)
- [on](server_fs_capacitor.ReadStream.md#on)
- [once](server_fs_capacitor.ReadStream.md#once)
- [pause](server_fs_capacitor.ReadStream.md#pause)
- [pipe](server_fs_capacitor.ReadStream.md#pipe)
- [prependListener](server_fs_capacitor.ReadStream.md#prependlistener)
- [prependOnceListener](server_fs_capacitor.ReadStream.md#prependoncelistener)
- [push](server_fs_capacitor.ReadStream.md#push)
- [rawListeners](server_fs_capacitor.ReadStream.md#rawlisteners)
- [read](server_fs_capacitor.ReadStream.md#read)
- [removeAllListeners](server_fs_capacitor.ReadStream.md#removealllisteners)
- [removeListener](server_fs_capacitor.ReadStream.md#removelistener)
- [resume](server_fs_capacitor.ReadStream.md#resume)
- [setEncoding](server_fs_capacitor.ReadStream.md#setencoding)
- [setMaxListeners](server_fs_capacitor.ReadStream.md#setmaxlisteners)
- [unpipe](server_fs_capacitor.ReadStream.md#unpipe)
- [unshift](server_fs_capacitor.ReadStream.md#unshift)
- [wrap](server_fs_capacitor.ReadStream.md#wrap)
- [from](server_fs_capacitor.ReadStream.md#from)
- [listenerCount](server_fs_capacitor.ReadStream.md#listenercount-1)
- [on](server_fs_capacitor.ReadStream.md#on-1)
- [once](server_fs_capacitor.ReadStream.md#once-1)

## Constructors

### constructor

• **new ReadStream**(`writeStream`, `options?`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `writeStream` | [`WriteStream`](server_fs_capacitor.WriteStream.md) |
| `options?` | [`ReadStreamOptions`](../interfaces/server_fs_capacitor.ReadStreamOptions.md) |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Overrides

Readable.constructor

#### Defined in

[server/fs-capacitor.ts:34](https://github.com/onzag/itemize/blob/73e0c39e/server/fs-capacitor.ts#L34)

## Properties

### \_pos

• `Private` **\_pos**: `number` = `0`

#### Defined in

[server/fs-capacitor.ts:31](https://github.com/onzag/itemize/blob/73e0c39e/server/fs-capacitor.ts#L31)

___

### \_writeStream

• `Private` **\_writeStream**: [`WriteStream`](server_fs_capacitor.WriteStream.md)

#### Defined in

[server/fs-capacitor.ts:32](https://github.com/onzag/itemize/blob/73e0c39e/server/fs-capacitor.ts#L32)

___

### destroyed

• **destroyed**: `boolean`

#### Inherited from

Readable.destroyed

#### Defined in

node_modules/@types/node/stream.d.ts:35

___

### readable

• **readable**: `boolean`

#### Inherited from

Readable.readable

#### Defined in

node_modules/@types/node/stream.d.ts:28

___

### readableEncoding

• `Readonly` **readableEncoding**: `BufferEncoding`

#### Inherited from

Readable.readableEncoding

#### Defined in

node_modules/@types/node/stream.d.ts:29

___

### readableEnded

• `Readonly` **readableEnded**: `boolean`

#### Inherited from

Readable.readableEnded

#### Defined in

node_modules/@types/node/stream.d.ts:30

___

### readableFlowing

• `Readonly` **readableFlowing**: `boolean`

#### Inherited from

Readable.readableFlowing

#### Defined in

node_modules/@types/node/stream.d.ts:31

___

### readableHighWaterMark

• `Readonly` **readableHighWaterMark**: `number`

#### Inherited from

Readable.readableHighWaterMark

#### Defined in

node_modules/@types/node/stream.d.ts:32

___

### readableLength

• `Readonly` **readableLength**: `number`

#### Inherited from

Readable.readableLength

#### Defined in

node_modules/@types/node/stream.d.ts:33

___

### readableObjectMode

• `Readonly` **readableObjectMode**: `boolean`

#### Inherited from

Readable.readableObjectMode

#### Defined in

node_modules/@types/node/stream.d.ts:34

___

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](server_fs_capacitor.ReadStream.md#capturerejectionsymbol)

#### Inherited from

Readable.captureRejectionSymbol

#### Defined in

node_modules/@types/node/events.d.ts:38

___

### captureRejections

▪ `Static` **captureRejections**: `boolean`

Sets or gets the default captureRejection value for all emitters.

#### Inherited from

Readable.captureRejections

#### Defined in

node_modules/@types/node/events.d.ts:44

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

#### Inherited from

Readable.defaultMaxListeners

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

Readable.errorMonitor

#### Defined in

node_modules/@types/node/events.d.ts:37

## Methods

### [asyncIterator]

▸ **[asyncIterator]**(): `AsyncIterableIterator`\<`any`\>

#### Returns

`AsyncIterableIterator`\<`any`\>

#### Inherited from

Readable.[asyncIterator]

#### Defined in

node_modules/@types/node/stream.d.ts:124

___

### \_destroy

▸ **_destroy**(`error`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |
| `callback` | (`error?`: `Error`) => `void` |

#### Returns

`void`

#### Inherited from

Readable.\_destroy

#### Defined in

node_modules/@types/node/stream.d.ts:47

___

### \_read

▸ **_read**(`n`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`void`

#### Overrides

Readable.\_read

#### Defined in

[server/fs-capacitor.ts:43](https://github.com/onzag/itemize/blob/73e0c39e/server/fs-capacitor.ts#L43)

___

### addListener

▸ **addListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

Event emitter
The defined events on documents including:
1. close
2. data
3. end
4. error
5. pause
6. readable
7. resume

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:61

▸ **addListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:62

▸ **addListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:63

▸ **addListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: `Error`) => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:64

▸ **addListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:65

▸ **addListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:66

▸ **addListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:67

▸ **addListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:68

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

Readable.destroy

#### Defined in

node_modules/@types/node/stream.d.ts:48

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

Readable.emit

#### Defined in

node_modules/@types/node/stream.d.ts:70

▸ **emit**(`event`, `chunk`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `chunk` | `any` |

#### Returns

`boolean`

#### Inherited from

Readable.emit

#### Defined in

node_modules/@types/node/stream.d.ts:71

▸ **emit**(`event`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |

#### Returns

`boolean`

#### Inherited from

Readable.emit

#### Defined in

node_modules/@types/node/stream.d.ts:72

▸ **emit**(`event`, `err`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `err` | `Error` |

#### Returns

`boolean`

#### Inherited from

Readable.emit

#### Defined in

node_modules/@types/node/stream.d.ts:73

▸ **emit**(`event`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |

#### Returns

`boolean`

#### Inherited from

Readable.emit

#### Defined in

node_modules/@types/node/stream.d.ts:74

▸ **emit**(`event`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |

#### Returns

`boolean`

#### Inherited from

Readable.emit

#### Defined in

node_modules/@types/node/stream.d.ts:75

▸ **emit**(`event`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |

#### Returns

`boolean`

#### Inherited from

Readable.emit

#### Defined in

node_modules/@types/node/stream.d.ts:76

▸ **emit**(`event`, `...args`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `...args` | `any`[] |

#### Returns

`boolean`

#### Inherited from

Readable.emit

#### Defined in

node_modules/@types/node/stream.d.ts:77

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

Readable.eventNames

#### Defined in

node_modules/@types/node/globals.d.ts:584

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

#### Returns

`number`

#### Inherited from

Readable.getMaxListeners

#### Defined in

node_modules/@types/node/globals.d.ts:576

___

### isPaused

▸ **isPaused**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Readable.isPaused

#### Defined in

node_modules/@types/node/stream.d.ts:42

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

Readable.listenerCount

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

Readable.listeners

#### Defined in

node_modules/@types/node/globals.d.ts:577

___

### off

▸ **off**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.off

#### Defined in

node_modules/@types/node/globals.d.ts:573

___

### on

▸ **on**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.on

#### Defined in

node_modules/@types/node/stream.d.ts:79

▸ **on**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.on

#### Defined in

node_modules/@types/node/stream.d.ts:80

▸ **on**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.on

#### Defined in

node_modules/@types/node/stream.d.ts:81

▸ **on**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: `Error`) => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.on

#### Defined in

node_modules/@types/node/stream.d.ts:82

▸ **on**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.on

#### Defined in

node_modules/@types/node/stream.d.ts:83

▸ **on**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.on

#### Defined in

node_modules/@types/node/stream.d.ts:84

▸ **on**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.on

#### Defined in

node_modules/@types/node/stream.d.ts:85

▸ **on**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.on

#### Defined in

node_modules/@types/node/stream.d.ts:86

___

### once

▸ **once**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.once

#### Defined in

node_modules/@types/node/stream.d.ts:88

▸ **once**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.once

#### Defined in

node_modules/@types/node/stream.d.ts:89

▸ **once**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.once

#### Defined in

node_modules/@types/node/stream.d.ts:90

▸ **once**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: `Error`) => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.once

#### Defined in

node_modules/@types/node/stream.d.ts:91

▸ **once**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.once

#### Defined in

node_modules/@types/node/stream.d.ts:92

▸ **once**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.once

#### Defined in

node_modules/@types/node/stream.d.ts:93

▸ **once**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.once

#### Defined in

node_modules/@types/node/stream.d.ts:94

▸ **once**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.once

#### Defined in

node_modules/@types/node/stream.d.ts:95

___

### pause

▸ **pause**(): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.pause

#### Defined in

node_modules/@types/node/stream.d.ts:40

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

Readable.pipe

#### Defined in

node_modules/@types/node/stream.d.ts:5

___

### prependListener

▸ **prependListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:97

▸ **prependListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:98

▸ **prependListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:99

▸ **prependListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: `Error`) => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:100

▸ **prependListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:101

▸ **prependListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:102

▸ **prependListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:103

▸ **prependListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:104

___

### prependOnceListener

▸ **prependOnceListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:106

▸ **prependOnceListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:107

▸ **prependOnceListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:108

▸ **prependOnceListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: `Error`) => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:109

▸ **prependOnceListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:110

▸ **prependOnceListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:111

▸ **prependOnceListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:112

▸ **prependOnceListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:113

___

### push

▸ **push**(`chunk`, `encoding?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `any` |
| `encoding?` | `string` |

#### Returns

`boolean`

#### Inherited from

Readable.push

#### Defined in

node_modules/@types/node/stream.d.ts:46

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

Readable.rawListeners

#### Defined in

node_modules/@types/node/globals.d.ts:578

___

### read

▸ **read**(`size?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `size?` | `number` |

#### Returns

`any`

#### Inherited from

Readable.read

#### Defined in

node_modules/@types/node/stream.d.ts:38

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.removeAllListeners

#### Defined in

node_modules/@types/node/globals.d.ts:574

___

### removeListener

▸ **removeListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:115

▸ **removeListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:116

▸ **removeListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:117

▸ **removeListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: `Error`) => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:118

▸ **removeListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:119

▸ **removeListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:120

▸ **removeListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:121

▸ **removeListener**(`event`, `listener`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:122

___

### resume

▸ **resume**(): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.resume

#### Defined in

node_modules/@types/node/stream.d.ts:41

___

### setEncoding

▸ **setEncoding**(`encoding`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoding` | `string` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.setEncoding

#### Defined in

node_modules/@types/node/stream.d.ts:39

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.setMaxListeners

#### Defined in

node_modules/@types/node/globals.d.ts:575

___

### unpipe

▸ **unpipe**(`destination?`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `destination?` | `WritableStream` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.unpipe

#### Defined in

node_modules/@types/node/stream.d.ts:43

___

### unshift

▸ **unshift**(`chunk`, `encoding?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `any` |
| `encoding?` | `BufferEncoding` |

#### Returns

`void`

#### Inherited from

Readable.unshift

#### Defined in

node_modules/@types/node/stream.d.ts:44

___

### wrap

▸ **wrap**(`oldStream`): [`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldStream` | `ReadableStream` |

#### Returns

[`ReadStream`](server_fs_capacitor.ReadStream.md)

#### Inherited from

Readable.wrap

#### Defined in

node_modules/@types/node/stream.d.ts:45

___

### from

▸ **from**(`iterable`, `options?`): `Readable`

A utility method for creating Readable Streams out of iterators.

#### Parameters

| Name | Type |
| :------ | :------ |
| `iterable` | `Iterable`\<`any`\> \| `AsyncIterable`\<`any`\> |
| `options?` | `ReadableOptions` |

#### Returns

`Readable`

#### Inherited from

Readable.from

#### Defined in

node_modules/@types/node/stream.d.ts:26

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

Readable.listenerCount

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

Readable.on

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

Readable.once

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

Readable.once

#### Defined in

node_modules/@types/node/events.d.ts:22
