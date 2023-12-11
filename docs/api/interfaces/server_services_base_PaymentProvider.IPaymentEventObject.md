[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services/base/PaymentProvider](../modules/server_services_base_PaymentProvider.md) / IPaymentEventObject

# Interface: IPaymentEventObject

[server/services/base/PaymentProvider](../modules/server_services_base_PaymentProvider.md).IPaymentEventObject

This is the whole event object of the payment and contains everything regarding
the hidden metadata and original data as well as the event information and payment
object itself that is into action

## Hierarchy

- [`IPaymentProviderPaymentExtraInfoWithHiddenMetadata`](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md)

  ↳ **`IPaymentEventObject`**

## Table of contents

### Properties

- [event](server_services_base_PaymentProvider.IPaymentEventObject.md#event)
- [getHiddenMetadata](server_services_base_PaymentProvider.IPaymentEventObject.md#gethiddenmetadata)
- [getHiddenMetadataAsJSON](server_services_base_PaymentProvider.IPaymentEventObject.md#gethiddenmetadataasjson)
- [id](server_services_base_PaymentProvider.IPaymentEventObject.md#id)
- [include](server_services_base_PaymentProvider.IPaymentEventObject.md#include)
- [item](server_services_base_PaymentProvider.IPaymentEventObject.md#item)
- [module](server_services_base_PaymentProvider.IPaymentEventObject.md#module)
- [originalHiddenMetadata](server_services_base_PaymentProvider.IPaymentEventObject.md#originalhiddenmetadata)
- [originalMetadata](server_services_base_PaymentProvider.IPaymentEventObject.md#originalmetadata)
- [originalSQLData](server_services_base_PaymentProvider.IPaymentEventObject.md#originalsqldata)
- [originalStatus](server_services_base_PaymentProvider.IPaymentEventObject.md#originalstatus)
- [payment](server_services_base_PaymentProvider.IPaymentEventObject.md#payment)
- [property](server_services_base_PaymentProvider.IPaymentEventObject.md#property)
- [setHiddenMetadata](server_services_base_PaymentProvider.IPaymentEventObject.md#sethiddenmetadata)
- [setHiddenMetadataAsJSON](server_services_base_PaymentProvider.IPaymentEventObject.md#sethiddenmetadataasjson)
- [uuid](server_services_base_PaymentProvider.IPaymentEventObject.md#uuid)
- [version](server_services_base_PaymentProvider.IPaymentEventObject.md#version)

## Properties

### event

• **event**: [`PaymentEvent`](../enums/server_services_base_PaymentProvider.PaymentEvent.md)

This is the event type that was triggered

#### Defined in

[server/services/base/PaymentProvider.ts:170](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/PaymentProvider.ts#L170)

___

### getHiddenMetadata

• **getHiddenMetadata**: () => `string`

#### Type declaration

▸ (): `string`

Provides the current up to date hidden metadata

##### Returns

`string`

#### Inherited from

[IPaymentProviderPaymentExtraInfoWithHiddenMetadata](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md).[getHiddenMetadata](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#gethiddenmetadata)

#### Defined in

[server/services/base/PaymentProvider.ts:142](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/PaymentProvider.ts#L142)

___

### getHiddenMetadataAsJSON

• **getHiddenMetadataAsJSON**: (`attr?`: `string`) => `any`

#### Type declaration

▸ (`attr?`): `any`

This function treats the hidden metadata as
JSON, and provides the value, note that it will
crash if it's invalid json

##### Parameters

| Name | Type |
| :------ | :------ |
| `attr?` | `string` |

##### Returns

`any`

#### Inherited from

[IPaymentProviderPaymentExtraInfoWithHiddenMetadata](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md).[getHiddenMetadataAsJSON](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#gethiddenmetadataasjson)

#### Defined in

[server/services/base/PaymentProvider.ts:152](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/PaymentProvider.ts#L152)

___

### id

• **id**: `string`

The id of the row where the payment is contained

#### Inherited from

[IPaymentProviderPaymentExtraInfoWithHiddenMetadata](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md).[id](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#id)

#### Defined in

[server/services/base/PaymentProvider.ts:88](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/PaymentProvider.ts#L88)

___

### include

• `Optional` **include**: [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md)

If the payment is part of a include, which include is it

#### Inherited from

[IPaymentProviderPaymentExtraInfoWithHiddenMetadata](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md).[include](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#include)

#### Defined in

[server/services/base/PaymentProvider.ts:80](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/PaymentProvider.ts#L80)

___

### item

• **item**: [`default`](../classes/base_Root_Module_ItemDefinition.default.md)

The item that contains this payment

#### Inherited from

[IPaymentProviderPaymentExtraInfoWithHiddenMetadata](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md).[item](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#item)

#### Defined in

[server/services/base/PaymentProvider.ts:76](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/PaymentProvider.ts#L76)

___

### module

• **module**: [`default`](../classes/base_Root_Module.default.md)

The module where this payment is contained at

#### Inherited from

[IPaymentProviderPaymentExtraInfoWithHiddenMetadata](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md).[module](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#module)

#### Defined in

[server/services/base/PaymentProvider.ts:72](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/PaymentProvider.ts#L72)

___

### originalHiddenMetadata

• **originalHiddenMetadata**: `string`

The original hidden metadata that was contained before the event
had occurred

#### Inherited from

[IPaymentProviderPaymentExtraInfoWithHiddenMetadata](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md).[originalHiddenMetadata](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#originalhiddenmetadata)

#### Defined in

[server/services/base/PaymentProvider.ts:138](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/PaymentProvider.ts#L138)

___

### originalMetadata

• **originalMetadata**: `string`

The original metadata of the payment before the new metadata
had come into effect
this will be null if it was created

#### Inherited from

[IPaymentProviderPaymentExtraInfoWithHiddenMetadata](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md).[originalMetadata](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#originalmetadata)

#### Defined in

[server/services/base/PaymentProvider.ts:104](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/PaymentProvider.ts#L104)

___

### originalSQLData

• **originalSQLData**: [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

The original SQL data of the payment row where it was contained
before the changes of status had come into effect
this will be null if it was created

#### Inherited from

[IPaymentProviderPaymentExtraInfoWithHiddenMetadata](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md).[originalSQLData](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#originalsqldata)

#### Defined in

[server/services/base/PaymentProvider.ts:110](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/PaymentProvider.ts#L110)

___

### originalStatus

• **originalStatus**: [`PaymentStatusType`](../enums/base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.PaymentStatusType.md)

The original status of the payment before the new data
had come into effect
this will be null if it was created

#### Inherited from

[IPaymentProviderPaymentExtraInfoWithHiddenMetadata](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md).[originalStatus](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#originalstatus)

#### Defined in

[server/services/base/PaymentProvider.ts:98](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/PaymentProvider.ts#L98)

___

### payment

• **payment**: [`IPropertyDefinitionSupportedPaymentType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.IPropertyDefinitionSupportedPaymentType.md)

And this is the new payment object as it is right now

#### Defined in

[server/services/base/PaymentProvider.ts:174](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/PaymentProvider.ts#L174)

___

### property

• **property**: [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

The payment property itself

#### Inherited from

[IPaymentProviderPaymentExtraInfoWithHiddenMetadata](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md).[property](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#property)

#### Defined in

[server/services/base/PaymentProvider.ts:84](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/PaymentProvider.ts#L84)

___

### setHiddenMetadata

• **setHiddenMetadata**: (`hiddenMetadata`: `string`) => `void`

#### Type declaration

▸ (`hiddenMetadata`): `void`

Sets the hidden metadata value

##### Parameters

| Name | Type |
| :------ | :------ |
| `hiddenMetadata` | `string` |

##### Returns

`void`

#### Inherited from

[IPaymentProviderPaymentExtraInfoWithHiddenMetadata](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md).[setHiddenMetadata](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#sethiddenmetadata)

#### Defined in

[server/services/base/PaymentProvider.ts:146](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/PaymentProvider.ts#L146)

___

### setHiddenMetadataAsJSON

• **setHiddenMetadataAsJSON**: `SetHiddenMetadataAsJSONType` \| `SetHiddenMetadataAsJSONType2`

This function treats the hidden metadata as JSON
and sets the value of a given attribute or the whole
thing

#### Inherited from

[IPaymentProviderPaymentExtraInfoWithHiddenMetadata](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md).[setHiddenMetadataAsJSON](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#sethiddenmetadataasjson)

#### Defined in

[server/services/base/PaymentProvider.ts:158](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/PaymentProvider.ts#L158)

___

### uuid

• **uuid**: `string`

The unique identifier of this payment regarding its location to
the database

#### Inherited from

[IPaymentProviderPaymentExtraInfoWithHiddenMetadata](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md).[uuid](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#uuid)

#### Defined in

[server/services/base/PaymentProvider.ts:115](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/PaymentProvider.ts#L115)

___

### version

• **version**: `string`

The version of the row where the payment is contained

#### Inherited from

[IPaymentProviderPaymentExtraInfoWithHiddenMetadata](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md).[version](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#version)

#### Defined in

[server/services/base/PaymentProvider.ts:92](https://github.com/onzag/itemize/blob/59702dd5/server/services/base/PaymentProvider.ts#L92)
