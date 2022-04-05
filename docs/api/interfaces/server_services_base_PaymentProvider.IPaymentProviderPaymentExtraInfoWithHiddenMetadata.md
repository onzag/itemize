[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services/base/PaymentProvider](../modules/server_services_base_PaymentProvider.md) / IPaymentProviderPaymentExtraInfoWithHiddenMetadata

# Interface: IPaymentProviderPaymentExtraInfoWithHiddenMetadata

[server/services/base/PaymentProvider](../modules/server_services_base_PaymentProvider.md).IPaymentProviderPaymentExtraInfoWithHiddenMetadata

This interface extends the original extra info, but allows for the setting
of the hidden metadata and contains the hidden metadata within itself

## Hierarchy

- [`IPaymentProviderPaymentExtraInfo`](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md)

  ↳ **`IPaymentProviderPaymentExtraInfoWithHiddenMetadata`**

  ↳↳ [`IPaymentEventObject`](server_services_base_PaymentProvider.IPaymentEventObject.md)

## Table of contents

### Properties

- [id](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#id)
- [include](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#include)
- [item](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#item)
- [module](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#module)
- [originalHiddenMetadata](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#originalhiddenmetadata)
- [originalMetadata](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#originalmetadata)
- [originalSQLData](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#originalsqldata)
- [originalStatus](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#originalstatus)
- [property](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#property)
- [setHiddenMetadataAsJSON](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#sethiddenmetadataasjson)
- [uuid](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#uuid)
- [version](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#version)

### Methods

- [getHiddenMetadata](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#gethiddenmetadata)
- [getHiddenMetadataAsJSON](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#gethiddenmetadataasjson)
- [setHiddenMetadata](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md#sethiddenmetadata)

## Properties

### id

• **id**: `string`

The id of the row where the payment is contained

#### Inherited from

[IPaymentProviderPaymentExtraInfo](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md).[id](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md#id)

#### Defined in

[server/services/base/PaymentProvider.ts:88](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L88)

___

### include

• `Optional` **include**: [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md)

If the payment is part of a include, which include is it

#### Inherited from

[IPaymentProviderPaymentExtraInfo](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md).[include](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md#include)

#### Defined in

[server/services/base/PaymentProvider.ts:80](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L80)

___

### item

• **item**: [`default`](../classes/base_Root_Module_ItemDefinition.default.md)

The item that contains this payment

#### Inherited from

[IPaymentProviderPaymentExtraInfo](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md).[item](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md#item)

#### Defined in

[server/services/base/PaymentProvider.ts:76](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L76)

___

### module

• **module**: [`default`](../classes/base_Root_Module.default.md)

The module where this payment is contained at

#### Inherited from

[IPaymentProviderPaymentExtraInfo](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md).[module](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md#module)

#### Defined in

[server/services/base/PaymentProvider.ts:72](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L72)

___

### originalHiddenMetadata

• **originalHiddenMetadata**: `string`

The original hidden metadata that was contained before the event
had occurred

#### Defined in

[server/services/base/PaymentProvider.ts:138](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L138)

___

### originalMetadata

• **originalMetadata**: `string`

The original metadata of the payment before the new metadata
had come into effect
this will be null if it was created

#### Inherited from

[IPaymentProviderPaymentExtraInfo](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md).[originalMetadata](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md#originalmetadata)

#### Defined in

[server/services/base/PaymentProvider.ts:104](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L104)

___

### originalSQLData

• **originalSQLData**: [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

The original SQL data of the payment row where it was contained
before the changes of status had come into effect
this will be null if it was created

#### Inherited from

[IPaymentProviderPaymentExtraInfo](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md).[originalSQLData](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md#originalsqldata)

#### Defined in

[server/services/base/PaymentProvider.ts:110](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L110)

___

### originalStatus

• **originalStatus**: [`PaymentStatusType`](../enums/base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.PaymentStatusType.md)

The original status of the payment before the new data
had come into effect
this will be null if it was created

#### Inherited from

[IPaymentProviderPaymentExtraInfo](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md).[originalStatus](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md#originalstatus)

#### Defined in

[server/services/base/PaymentProvider.ts:98](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L98)

___

### property

• **property**: [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

The payment property itself

#### Inherited from

[IPaymentProviderPaymentExtraInfo](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md).[property](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md#property)

#### Defined in

[server/services/base/PaymentProvider.ts:84](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L84)

___

### setHiddenMetadataAsJSON

• **setHiddenMetadataAsJSON**: `SetHiddenMetadataAsJSONType` \| `SetHiddenMetadataAsJSONType2`

This function treats the hidden metadata as JSON
and sets the value of a given attribute or the whole
thing

#### Defined in

[server/services/base/PaymentProvider.ts:158](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L158)

___

### uuid

• **uuid**: `string`

The unique identifier of this payment regarding its location to
the database

#### Inherited from

[IPaymentProviderPaymentExtraInfo](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md).[uuid](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md#uuid)

#### Defined in

[server/services/base/PaymentProvider.ts:115](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L115)

___

### version

• **version**: `string`

The version of the row where the payment is contained

#### Inherited from

[IPaymentProviderPaymentExtraInfo](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md).[version](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md#version)

#### Defined in

[server/services/base/PaymentProvider.ts:92](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L92)

## Methods

### getHiddenMetadata

▸ **getHiddenMetadata**(): `string`

Provides the current up to date hidden metadata

#### Returns

`string`

#### Defined in

[server/services/base/PaymentProvider.ts:142](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L142)

___

### getHiddenMetadataAsJSON

▸ **getHiddenMetadataAsJSON**(`attr?`): `any`

This function treats the hidden metadata as
JSON, and provides the value, note that it will
crash if it's invalid json

#### Parameters

| Name | Type |
| :------ | :------ |
| `attr?` | `string` |

#### Returns

`any`

#### Defined in

[server/services/base/PaymentProvider.ts:152](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L152)

___

### setHiddenMetadata

▸ **setHiddenMetadata**(`hiddenMetadata`): `void`

Sets the hidden metadata value

#### Parameters

| Name | Type |
| :------ | :------ |
| `hiddenMetadata` | `string` |

#### Returns

`void`

#### Defined in

[server/services/base/PaymentProvider.ts:146](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L146)
