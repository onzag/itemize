[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services/base/PaymentProvider](../modules/server_services_base_PaymentProvider.md) / IPaymentUniqueLocation

# Interface: IPaymentUniqueLocation

[server/services/base/PaymentProvider](../modules/server_services_base_PaymentProvider.md).IPaymentUniqueLocation

Represents the break down of an UUID to realize
where in the database the payment is located

## Table of contents

### Properties

- [id](server_services_base_PaymentProvider.IPaymentUniqueLocation.md#id)
- [include](server_services_base_PaymentProvider.IPaymentUniqueLocation.md#include)
- [item](server_services_base_PaymentProvider.IPaymentUniqueLocation.md#item)
- [property](server_services_base_PaymentProvider.IPaymentUniqueLocation.md#property)
- [version](server_services_base_PaymentProvider.IPaymentUniqueLocation.md#version)

## Properties

### id

• **id**: `string`

The id of the row where it is located

#### Defined in

[server/services/base/PaymentProvider.ts:195](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/PaymentProvider.ts#L195)

___

### include

• `Optional` **include**: `string` \| [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md)

The include where it is located at that item

#### Defined in

[server/services/base/PaymentProvider.ts:207](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/PaymentProvider.ts#L207)

___

### item

• **item**: `string` \| [`default`](../classes/base_Root_Module_ItemDefinition.default.md)

The item where it is located at

#### Defined in

[server/services/base/PaymentProvider.ts:203](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/PaymentProvider.ts#L203)

___

### property

• **property**: `string` \| [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

And the property itself

#### Defined in

[server/services/base/PaymentProvider.ts:211](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/PaymentProvider.ts#L211)

___

### version

• **version**: `string`

The version of the row where it is located

#### Defined in

[server/services/base/PaymentProvider.ts:199](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/PaymentProvider.ts#L199)
