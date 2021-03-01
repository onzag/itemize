[](../README.md) / [Exports](../modules.md) / [base/remote-protocol](../modules/base_remote_protocol.md) / IChangedFeedbackEvent

# Interface: IChangedFeedbackEvent

[base/remote-protocol](../modules/base_remote_protocol.md).IChangedFeedbackEvent

The changed feedback event contains very specific fields

## Hierarchy

* **IChangedFeedbackEvent**

  ↳ [*IChangedFeedbackEventWithTime*](client_internal_testing.ichangedfeedbackeventwithtime.md)

## Table of contents

### Properties

- [id](base_remote_protocol.ichangedfeedbackevent.md#id)
- [itemDefinition](base_remote_protocol.ichangedfeedbackevent.md#itemdefinition)
- [lastModified](base_remote_protocol.ichangedfeedbackevent.md#lastmodified)
- [type](base_remote_protocol.ichangedfeedbackevent.md#type)
- [version](base_remote_protocol.ichangedfeedbackevent.md#version)

## Properties

### id

• **id**: *string*

The slot id of that item definition

Defined in: [base/remote-protocol.ts:79](https://github.com/onzag/itemize/blob/5fcde7cf/base/remote-protocol.ts#L79)

___

### itemDefinition

• **itemDefinition**: *string*

The item definition as a qualified name

Defined in: [base/remote-protocol.ts:75](https://github.com/onzag/itemize/blob/5fcde7cf/base/remote-protocol.ts#L75)

___

### lastModified

• **lastModified**: *string*

A timestamp that comes when type=last_modified

Defined in: [base/remote-protocol.ts:97](https://github.com/onzag/itemize/blob/5fcde7cf/base/remote-protocol.ts#L97)

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

Defined in: [base/remote-protocol.ts:93](https://github.com/onzag/itemize/blob/5fcde7cf/base/remote-protocol.ts#L93)

___

### version

• **version**: *string*

The version of that item definition

Defined in: [base/remote-protocol.ts:83](https://github.com/onzag/itemize/blob/5fcde7cf/base/remote-protocol.ts#L83)
