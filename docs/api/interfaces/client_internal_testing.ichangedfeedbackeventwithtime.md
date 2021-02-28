[](../README.md) / [Exports](../modules.md) / [client/internal/testing](../modules/client_internal_testing.md) / IChangedFeedbackEventWithTime

# Interface: IChangedFeedbackEventWithTime

[client/internal/testing](../modules/client_internal_testing.md).IChangedFeedbackEventWithTime

## Hierarchy

* [*IChangedFeedbackEvent*](base_remote_protocol.ichangedfeedbackevent.md)

  ↳ **IChangedFeedbackEventWithTime**

## Table of contents

### Properties

- [id](client_internal_testing.ichangedfeedbackeventwithtime.md#id)
- [itemDefinition](client_internal_testing.ichangedfeedbackeventwithtime.md#itemdefinition)
- [lastModified](client_internal_testing.ichangedfeedbackeventwithtime.md#lastmodified)
- [time](client_internal_testing.ichangedfeedbackeventwithtime.md#time)
- [type](client_internal_testing.ichangedfeedbackeventwithtime.md#type)
- [version](client_internal_testing.ichangedfeedbackeventwithtime.md#version)

## Properties

### id

• **id**: *string*

The slot id of that item definition

Inherited from: [IChangedFeedbackEvent](base_remote_protocol.ichangedfeedbackevent.md).[id](base_remote_protocol.ichangedfeedbackevent.md#id)

Defined in: [base/remote-protocol.ts:78](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L78)

___

### itemDefinition

• **itemDefinition**: *string*

The item definition as a qualified name

Inherited from: [IChangedFeedbackEvent](base_remote_protocol.ichangedfeedbackevent.md).[itemDefinition](base_remote_protocol.ichangedfeedbackevent.md#itemdefinition)

Defined in: [base/remote-protocol.ts:74](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L74)

___

### lastModified

• **lastModified**: *string*

A timestamp that comes when type=last_modified

Inherited from: [IChangedFeedbackEvent](base_remote_protocol.ichangedfeedbackevent.md).[lastModified](base_remote_protocol.ichangedfeedbackevent.md#lastmodified)

Defined in: [base/remote-protocol.ts:96](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L96)

___

### time

• **time**: *string*

Defined in: [client/internal/testing.ts:103](https://github.com/onzag/itemize/blob/11a98dec/client/internal/testing.ts#L103)

___

### type

• **type**: *created* \| *modified* \| *not_found* \| *last_modified*

The event type
created: similar to modified means the item has been created, you should re-request
modified: means that is has been modified, you should re-request
not_found: meants that the item has been deleted
last_modified: comes as an answer to a feedback request, check for the last_modified attribute
in your client cache to see if the server version is more recent and re-request it if that is
the case, check the lastModified property

Inherited from: [IChangedFeedbackEvent](base_remote_protocol.ichangedfeedbackevent.md).[type](base_remote_protocol.ichangedfeedbackevent.md#type)

Defined in: [base/remote-protocol.ts:92](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L92)

___

### version

• **version**: *string*

The version of that item definition

Inherited from: [IChangedFeedbackEvent](base_remote_protocol.ichangedfeedbackevent.md).[version](base_remote_protocol.ichangedfeedbackevent.md#version)

Defined in: [base/remote-protocol.ts:82](https://github.com/onzag/itemize/blob/11a98dec/base/remote-protocol.ts#L82)
