[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/types/payment

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/types/payment

Contains the payment type description that should be fullfilled
by a payment provider resource

## Table of contents

### Enumerations

- [PaymentStatusType](../enums/base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.PaymentStatusType.md)

### Interfaces

- [IPropertyDefinitionSupportedPaymentType](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.IPropertyDefinitionSupportedPaymentType.md)

### Variables

- [default](base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.md#default)
- [paymentAllowedStatuses](base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.md#paymentallowedstatuses)
- [paymentStatusesArr](base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.md#paymentstatusesarr)
- [paymentTypesArr](base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.md#paymenttypesarr)

## Variables

### default

• **default**: [`IPropertyDefinitionSupportedType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md)<[`IPropertyDefinitionSupportedPaymentType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.IPropertyDefinitionSupportedPaymentType.md)\>

The type of a curreny type specifies how it behaves in the app

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/payment.ts:67](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/types/payment.ts#L67)

___

### paymentAllowedStatuses

• **paymentAllowedStatuses**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `invoice` | [`PaymentStatusType`](../enums/base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.PaymentStatusType.md)[] |
| `refund` | [`PaymentStatusType`](../enums/base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.PaymentStatusType.md)[] |
| `subscription` | [`PaymentStatusType`](../enums/base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.PaymentStatusType.md)[] |

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/payment.ts:34](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/types/payment.ts#L34)

___

### paymentStatusesArr

• **paymentStatusesArr**: `string`[]

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/payment.ts:32](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/types/payment.ts#L32)

___

### paymentTypesArr

• **paymentTypesArr**: `string`[]

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/payment.ts:33](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/types/payment.ts#L33)
