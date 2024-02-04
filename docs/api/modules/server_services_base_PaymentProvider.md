[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/services/base/PaymentProvider

# Module: server/services/base/PaymentProvider

This file specifies a base for creating a payment provider
with all the necessary functions that it should offer

## Table of contents

### Enumerations

- [PaymentEvent](../enums/server_services_base_PaymentProvider.PaymentEvent.md)

### Classes

- [default](../classes/server_services_base_PaymentProvider.default.md)

### Interfaces

- [IPaymentEventObject](../interfaces/server_services_base_PaymentProvider.IPaymentEventObject.md)
- [IPaymentProviderPaymentExtraInfo](../interfaces/server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md)
- [IPaymentProviderPaymentExtraInfoWithHiddenMetadata](../interfaces/server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfoWithHiddenMetadata.md)
- [IPaymentUniqueLocation](../interfaces/server_services_base_PaymentProvider.IPaymentUniqueLocation.md)

### Type Aliases

- [PaymentEventListener](server_services_base_PaymentProvider.md#paymenteventlistener)

### Variables

- [statusToEvents](server_services_base_PaymentProvider.md#statustoevents)

## Type Aliases

### PaymentEventListener

Ƭ **PaymentEventListener**: (`evObj`: [`IPaymentEventObject`](../interfaces/server_services_base_PaymentProvider.IPaymentEventObject.md)) => `Promise`\<`void`\> \| `void`

#### Type declaration

▸ (`evObj`): `Promise`\<`void`\> \| `void`

Represents a payment event listener that is added to the payment provider
in the addEventListener interaction

Note that you can return a promise and this will affect the way hidden metadata is handled
you cannot process hidden metadata asynchroniously unless you return a promise, node
needs to know when the event is done to perform cleanup functions

##### Parameters

| Name | Type |
| :------ | :------ |
| `evObj` | [`IPaymentEventObject`](../interfaces/server_services_base_PaymentProvider.IPaymentEventObject.md) |

##### Returns

`Promise`\<`void`\> \| `void`

#### Defined in

[server/services/base/PaymentProvider.ts:185](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/PaymentProvider.ts#L185)

## Variables

### statusToEvents

• `Const` **statusToEvents**: `Record`\<[`PaymentStatusType`](../enums/base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.PaymentStatusType.md), [`PaymentEvent`](../enums/server_services_base_PaymentProvider.PaymentEvent.md)\>

Provides a conversion between a status change or status creation
to an event type, it's pretty much a 1 to 1, there are of course
the events CREATED and DESTROYED, but those are not status changes

#### Defined in

[server/services/base/PaymentProvider.ts:225](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/PaymentProvider.ts#L225)
