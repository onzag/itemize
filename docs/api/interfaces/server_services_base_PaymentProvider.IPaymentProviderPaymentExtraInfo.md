[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services/base/PaymentProvider](../modules/server_services_base_PaymentProvider.md) / IPaymentProviderPaymentExtraInfo

# Interface: IPaymentProviderPaymentExtraInfo

[server/services/base/PaymentProvider](../modules/server_services_base_PaymentProvider.md).IPaymentProviderPaymentExtraInfo

The extra info that comes from a payment event

## Hierarchy

- **`IPaymentProviderPaymentExtraInfo`**

  ↳ [`IPaymentProviderPaymentExtraInfoWithHiddenMetadata`](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md)

## Table of contents

### Properties

- [id](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md#id)
- [include](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md#include)
- [item](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md#item)
- [module](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md#module)
- [originalMetadata](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md#originalmetadata)
- [originalSQLData](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md#originalsqldata)
- [originalStatus](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md#originalstatus)
- [property](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md#property)
- [uuid](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md#uuid)
- [version](server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md#version)

## Properties

### id

• **id**: `string`

The id of the row where the payment is contained

#### Defined in

[server/services/base/PaymentProvider.ts:88](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/PaymentProvider.ts#L88)

___

### include

• `Optional` **include**: [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md)

If the payment is part of a include, which include is it

#### Defined in

[server/services/base/PaymentProvider.ts:80](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/PaymentProvider.ts#L80)

___

### item

• **item**: [`default`](../classes/base_Root_Module_ItemDefinition.default.md)

The item that contains this payment

#### Defined in

[server/services/base/PaymentProvider.ts:76](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/PaymentProvider.ts#L76)

___

### module

• **module**: [`default`](../classes/base_Root_Module.default.md)

The module where this payment is contained at

#### Defined in

[server/services/base/PaymentProvider.ts:72](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/PaymentProvider.ts#L72)

___

### originalMetadata

• **originalMetadata**: `string`

The original metadata of the payment before the new metadata
had come into effect
this will be null if it was created

#### Defined in

[server/services/base/PaymentProvider.ts:104](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/PaymentProvider.ts#L104)

___

### originalSQLData

• **originalSQLData**: [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

The original SQL data of the payment row where it was contained
before the changes of status had come into effect
this will be null if it was created

#### Defined in

[server/services/base/PaymentProvider.ts:110](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/PaymentProvider.ts#L110)

___

### originalStatus

• **originalStatus**: [`PaymentStatusType`](../enums/base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.PaymentStatusType.md)

The original status of the payment before the new data
had come into effect
this will be null if it was created

#### Defined in

[server/services/base/PaymentProvider.ts:98](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/PaymentProvider.ts#L98)

___

### property

• **property**: [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

The payment property itself

#### Defined in

[server/services/base/PaymentProvider.ts:84](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/PaymentProvider.ts#L84)

___

### uuid

• **uuid**: `string`

The unique identifier of this payment regarding its location to
the database

#### Defined in

[server/services/base/PaymentProvider.ts:115](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/PaymentProvider.ts#L115)

___

### version

• **version**: `string`

The version of the row where the payment is contained

#### Defined in

[server/services/base/PaymentProvider.ts:92](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/PaymentProvider.ts#L92)
