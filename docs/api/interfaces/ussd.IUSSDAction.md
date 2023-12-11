[@onzag/itemize](../README.md) / [Modules](../modules.md) / [ussd](../modules/ussd.md) / IUSSDAction

# Interface: IUSSDAction

[ussd](../modules/ussd.md).IUSSDAction

An action that can be taken while a chunk of a specific page
is displayed

Actions should only display by the end of the chunk

## Table of contents

### Properties

- [inputValueLabel](ussd.IUSSDAction.md#inputvaluelabel)
- [label](ussd.IUSSDAction.md#label)
- [onInputReceived](ussd.IUSSDAction.md#oninputreceived)
- [requestInputValue](ussd.IUSSDAction.md#requestinputvalue)

## Properties

### inputValueLabel

• **inputValueLabel**: `string`

The label for such value

#### Defined in

[ussd/index.ts:25](https://github.com/onzag/itemize/blob/59702dd5/ussd/index.ts#L25)

___

### label

• **label**: `string`

Represents the label of the given action

#### Defined in

[ussd/index.ts:15](https://github.com/onzag/itemize/blob/59702dd5/ussd/index.ts#L15)

___

### onInputReceived

• **onInputReceived**: (`appData`: [`IAppDataType`](server.IAppDataType.md), `value`: `string`) => `string` \| `void` \| `Promise`\<`string` \| `void`\>

#### Type declaration

▸ (`appData`, `value`): `string` \| `void` \| `Promise`\<`string` \| `void`\>

When an input is received this function is executed
if a string is returned it will redirect

##### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](server.IAppDataType.md) |
| `value` | `string` |

##### Returns

`string` \| `void` \| `Promise`\<`string` \| `void`\>

#### Defined in

[ussd/index.ts:31](https://github.com/onzag/itemize/blob/59702dd5/ussd/index.ts#L31)

___

### requestInputValue

• **requestInputValue**: `boolean`

Whether to request input value

#### Defined in

[ussd/index.ts:20](https://github.com/onzag/itemize/blob/59702dd5/ussd/index.ts#L20)
