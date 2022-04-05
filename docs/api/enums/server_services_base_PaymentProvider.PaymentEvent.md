[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services/base/PaymentProvider](../modules/server_services_base_PaymentProvider.md) / PaymentEvent

# Enumeration: PaymentEvent

[server/services/base/PaymentProvider](../modules/server_services_base_PaymentProvider.md).PaymentEvent

These are our payment events and when
they occur

## Table of contents

### Enumeration members

- [ACTIVE](server_services_base_PaymentProvider.PaymentEvent.md#active)
- [CREATED](server_services_base_PaymentProvider.PaymentEvent.md#created)
- [DESTROYED](server_services_base_PaymentProvider.PaymentEvent.md#destroyed)
- [DISPUTED](server_services_base_PaymentProvider.PaymentEvent.md#disputed)
- [INACTIVE](server_services_base_PaymentProvider.PaymentEvent.md#inactive)
- [PAID](server_services_base_PaymentProvider.PaymentEvent.md#paid)
- [PENDING](server_services_base_PaymentProvider.PaymentEvent.md#pending)
- [REVERSED](server_services_base_PaymentProvider.PaymentEvent.md#reversed)

## Enumeration members

### ACTIVE

• **ACTIVE** = `"ACTIVE"`

A subscription has popped up (was created) or changed and it's in a active state

#### Defined in

[server/services/base/PaymentProvider.ts:62](https://github.com/onzag/itemize/blob/5c2808d3/server/services/base/PaymentProvider.ts#L62)

___

### CREATED

• **CREATED** = `"CREATED"`

A payment object was created, usually when the
object itself is added but this event also triggers
when the payment field goes from null to non-null
the payment begins to exist

#### Defined in

[server/services/base/PaymentProvider.ts:30](https://github.com/onzag/itemize/blob/5c2808d3/server/services/base/PaymentProvider.ts#L30)

___

### DESTROYED

• **DESTROYED** = `"DESTROYED"`

A payment object has been destroyed, an update already
made it go null, or a delete event rid of the row

#### Defined in

[server/services/base/PaymentProvider.ts:35](https://github.com/onzag/itemize/blob/5c2808d3/server/services/base/PaymentProvider.ts#L35)

___

### DISPUTED

• **DISPUTED** = `"DISPUTED"`

A payment popped up (was created) or changed and is in a disputed state
use this state for

#### Defined in

[server/services/base/PaymentProvider.ts:49](https://github.com/onzag/itemize/blob/5c2808d3/server/services/base/PaymentProvider.ts#L49)

___

### INACTIVE

• **INACTIVE** = `"INACTIVE"`

A subscription has popped up (was created) or changed and it's in a inactive state

#### Defined in

[server/services/base/PaymentProvider.ts:58](https://github.com/onzag/itemize/blob/5c2808d3/server/services/base/PaymentProvider.ts#L58)

___

### PAID

• **PAID** = `"PAID"`

A payment popped up (was created) or changed and is in a paid state
note that this state is for when refunds are paid as well

#### Defined in

[server/services/base/PaymentProvider.ts:44](https://github.com/onzag/itemize/blob/5c2808d3/server/services/base/PaymentProvider.ts#L44)

___

### PENDING

• **PENDING** = `"PENDING"`

A payment popped up (was created) or changed and is in a pending state

#### Defined in

[server/services/base/PaymentProvider.ts:39](https://github.com/onzag/itemize/blob/5c2808d3/server/services/base/PaymentProvider.ts#L39)

___

### REVERSED

• **REVERSED** = `"REVERSED"`

A payment popped up (was created) or changed and is in a reversed state
A payment has been reversed from its disputed state

#### Defined in

[server/services/base/PaymentProvider.ts:54](https://github.com/onzag/itemize/blob/5c2808d3/server/services/base/PaymentProvider.ts#L54)
