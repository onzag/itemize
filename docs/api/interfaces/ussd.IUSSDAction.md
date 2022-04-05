[@onzag/itemize](../README.md) / [Modules](../modules.md) / [ussd](../modules/ussd.md) / IUSSDAction

# Interface: IUSSDAction

[ussd](../modules/ussd.md).IUSSDAction

An action that can be taken while a chunk of a specific page
is displayed

Actions should only display by the end of the chunk

## Table of contents

### Properties

- [label](ussd.IUSSDAction.md#label)
- [onFailGoToURL](ussd.IUSSDAction.md#onfailgotourl)
- [onInputReceivedExecute](ussd.IUSSDAction.md#oninputreceivedexecute)
- [onSuccessGoToURL](ussd.IUSSDAction.md#onsuccessgotourl)

## Properties

### label

• **label**: `string`

Represents the label of the given action

#### Defined in

[ussd/index.ts:13](https://github.com/onzag/itemize/blob/5c2808d3/ussd/index.ts#L13)

___

### onFailGoToURL

• **onFailGoToURL**: `string`[]

It's arrays in order to be able to build
these dinamically
"%value" represents the value given by USSD and should be URL encoded
"%error" represents the received error from the graphql request and should be stringified as JSON and URL encoded

#### Defined in

[ussd/index.ts:38](https://github.com/onzag/itemize/blob/5c2808d3/ussd/index.ts#L38)

___

### onInputReceivedExecute

• **onInputReceivedExecute**: `string`[]

It's arrays in order to be able to build
these dinamically, this represents a graphql request body

"%value" represents the value and should be stringified as JSON

#### Defined in

[ussd/index.ts:21](https://github.com/onzag/itemize/blob/5c2808d3/ussd/index.ts#L21)

___

### onSuccessGoToURL

• **onSuccessGoToURL**: `string`[]

It's arrays in order to be able to build
these dinamically
"%value" represents the given by USSD and should be URL encoded
"%id" represents the received id from the graphql request and should be URL encoded
"%version" represents the received version from the graphql request and should be URL encoded

#### Defined in

[ussd/index.ts:30](https://github.com/onzag/itemize/blob/5c2808d3/ussd/index.ts#L30)
