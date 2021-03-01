[](../README.md) / [Exports](../modules.md) / [client/components/item/SubmitActioner](../modules/client_components_item_submitactioner.md) / ISubmitActionerInfoArgType

# Interface: ISubmitActionerInfoArgType

[client/components/item/SubmitActioner](../modules/client_components_item_submitactioner.md).ISubmitActionerInfoArgType

The actioner arg contains the properties that are useful
for doing the conditional logic for submitting

## Table of contents

### Properties

- [clean](client_components_item_submitactioner.isubmitactionerinfoargtype.md#clean)
- [dismissError](client_components_item_submitactioner.isubmitactionerinfoargtype.md#dismisserror)
- [dismissSubmitted](client_components_item_submitactioner.isubmitactionerinfoargtype.md#dismisssubmitted)
- [submit](client_components_item_submitactioner.isubmitactionerinfoargtype.md#submit)
- [submitError](client_components_item_submitactioner.isubmitactionerinfoargtype.md#submiterror)
- [submitted](client_components_item_submitactioner.isubmitactionerinfoargtype.md#submitted)
- [submitting](client_components_item_submitactioner.isubmitactionerinfoargtype.md#submitting)

## Properties

### clean

• **clean**: (`options`: [*IActionCleanOptions*](client_providers_item.iactioncleanoptions.md), `state`: *success* \| *fail*, `avoidTriggeringUpdate?`: *boolean*) => *void*

clean function, also a mirror from the item definition one

#### Type declaration:

▸ (`options`: [*IActionCleanOptions*](client_providers_item.iactioncleanoptions.md), `state`: *success* \| *fail*, `avoidTriggeringUpdate?`: *boolean*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*IActionCleanOptions*](client_providers_item.iactioncleanoptions.md) |
`state` | *success* \| *fail* |
`avoidTriggeringUpdate?` | *boolean* |

**Returns:** *void*

Defined in: [client/components/item/SubmitActioner.tsx:55](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/SubmitActioner.tsx#L55)

Defined in: [client/components/item/SubmitActioner.tsx:55](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/SubmitActioner.tsx#L55)

___

### dismissError

• **dismissError**: () => *void*

Dismiss the error state, and make it clean

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/components/item/SubmitActioner.tsx:42](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/SubmitActioner.tsx#L42)

Defined in: [client/components/item/SubmitActioner.tsx:42](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/SubmitActioner.tsx#L42)

___

### dismissSubmitted

• **dismissSubmitted**: () => *void*

dismiss the submitted state and make it clean

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/components/item/SubmitActioner.tsx:46](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/SubmitActioner.tsx#L46)

Defined in: [client/components/item/SubmitActioner.tsx:46](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/SubmitActioner.tsx#L46)

___

### submit

• **submit**: (`options`: [*IActionSubmitOptions*](client_providers_item.iactionsubmitoptions.md)) => *Promise*<[*IActionResponseWithId*](client_providers_item.iactionresponsewithid.md)\>

actual performs the submit, this function is a mirror from the
item definition provider one

#### Type declaration:

▸ (`options`: [*IActionSubmitOptions*](client_providers_item.iactionsubmitoptions.md)): *Promise*<[*IActionResponseWithId*](client_providers_item.iactionresponsewithid.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*IActionSubmitOptions*](client_providers_item.iactionsubmitoptions.md) |

**Returns:** *Promise*<[*IActionResponseWithId*](client_providers_item.iactionresponsewithid.md)\>

Defined in: [client/components/item/SubmitActioner.tsx:51](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/SubmitActioner.tsx#L51)

Defined in: [client/components/item/SubmitActioner.tsx:51](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/SubmitActioner.tsx#L51)

___

### submitError

• **submitError**: [*EndpointErrorType*](../modules/base_errors.md#endpointerrortype)

A submit error that happened after the last submit in this same
item definition slot

Defined in: [client/components/item/SubmitActioner.tsx:29](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/SubmitActioner.tsx#L29)

___

### submitted

• **submitted**: *boolean*

Whether it submitted, sucesfully

Defined in: [client/components/item/SubmitActioner.tsx:38](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/SubmitActioner.tsx#L38)

___

### submitting

• **submitting**: *boolean*

Whether it is currently submitting, useful for showing a spinner or something
as you cannot really submit while submitting

Defined in: [client/components/item/SubmitActioner.tsx:34](https://github.com/onzag/itemize/blob/0e9b128c/client/components/item/SubmitActioner.tsx#L34)
