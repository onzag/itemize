[](../README.md) / [Exports](../modules.md) / base/remote-protocol

# Module: base/remote-protocol

Contains a protocol to be used with remote realtime communication in order
to supply realtime updates between the server and the client

This is just a bunch of types that specifies a protocol this is the protocol
that is implemented by the remote listener

## Table of contents

### Interfaces

- [IBuildNumberEvent](../interfaces/base_remote_protocol.ibuildnumberevent.md)
- [IChangedFeedbackEvent](../interfaces/base_remote_protocol.ichangedfeedbackevent.md)
- [IErrorEvent](../interfaces/base_remote_protocol.ierrorevent.md)
- [IFeedbackRequest](../interfaces/base_remote_protocol.ifeedbackrequest.md)
- [IIdentifyRequest](../interfaces/base_remote_protocol.iidentifyrequest.md)
- [IOwnedSearchFeedbackRequest](../interfaces/base_remote_protocol.iownedsearchfeedbackrequest.md)
- [IOwnedSearchRecordsEvent](../interfaces/base_remote_protocol.iownedsearchrecordsevent.md)
- [IOwnedSearchRegisterRequest](../interfaces/base_remote_protocol.iownedsearchregisterrequest.md)
- [IOwnedSearchUnregisterRequest](../interfaces/base_remote_protocol.iownedsearchunregisterrequest.md)
- [IParentedSearchFeedbackRequest](../interfaces/base_remote_protocol.iparentedsearchfeedbackrequest.md)
- [IParentedSearchRecordsEvent](../interfaces/base_remote_protocol.iparentedsearchrecordsevent.md)
- [IParentedSearchRegisterRequest](../interfaces/base_remote_protocol.iparentedsearchregisterrequest.md)
- [IParentedSearchUnregisterRequest](../interfaces/base_remote_protocol.iparentedsearchunregisterrequest.md)
- [IRedisEvent](../interfaces/base_remote_protocol.iredisevent.md)
- [IRegisterRequest](../interfaces/base_remote_protocol.iregisterrequest.md)
- [IUnregisterRequest](../interfaces/base_remote_protocol.iunregisterrequest.md)

### Variables

- [BUILDNUMBER\_EVENT](base_remote_protocol.md#buildnumber_event)
- [CHANGED\_FEEEDBACK\_EVENT](base_remote_protocol.md#changed_feeedback_event)
- [CURRENCY\_FACTORS\_UPDATED\_EVENT](base_remote_protocol.md#currency_factors_updated_event)
- [ERROR\_EVENT](base_remote_protocol.md#error_event)
- [FEEDBACK\_REQUEST](base_remote_protocol.md#feedback_request)
- [FeedbackRequestSchema](base_remote_protocol.md#feedbackrequestschema)
- [IDENTIFIED\_EVENT](base_remote_protocol.md#identified_event)
- [IDENTIFY\_REQUEST](base_remote_protocol.md#identify_request)
- [IdentifyRequestSchema](base_remote_protocol.md#identifyrequestschema)
- [KICKED\_EVENT](base_remote_protocol.md#kicked_event)
- [OWNED\_SEARCH\_FEEDBACK\_REQUEST](base_remote_protocol.md#owned_search_feedback_request)
- [OWNED\_SEARCH\_RECORDS\_EVENT](base_remote_protocol.md#owned_search_records_event)
- [OWNED\_SEARCH\_REGISTER\_REQUEST](base_remote_protocol.md#owned_search_register_request)
- [OWNED\_SEARCH\_UNREGISTER\_REQUEST](base_remote_protocol.md#owned_search_unregister_request)
- [OwnedSearchFeedbackRequestSchema](base_remote_protocol.md#ownedsearchfeedbackrequestschema)
- [OwnedSearchRegisterRequestSchema](base_remote_protocol.md#ownedsearchregisterrequestschema)
- [OwnedSearchUnregisterRequestSchema](base_remote_protocol.md#ownedsearchunregisterrequestschema)
- [PARENTED\_SEARCH\_FEEDBACK\_REQUEST](base_remote_protocol.md#parented_search_feedback_request)
- [PARENTED\_SEARCH\_RECORDS\_EVENT](base_remote_protocol.md#parented_search_records_event)
- [PARENTED\_SEARCH\_REGISTER\_REQUEST](base_remote_protocol.md#parented_search_register_request)
- [PARENTED\_SEARCH\_UNREGISTER\_REQUEST](base_remote_protocol.md#parented_search_unregister_request)
- [ParentedSearchFeedbackRequestSchema](base_remote_protocol.md#parentedsearchfeedbackrequestschema)
- [ParentedSearchRegisterRequestSchema](base_remote_protocol.md#parentedsearchregisterrequestschema)
- [ParentedSearchUnregisterRequestSchema](base_remote_protocol.md#parentedsearchunregisterrequestschema)
- [REGISTER\_REQUEST](base_remote_protocol.md#register_request)
- [RegisterRequestSchema](base_remote_protocol.md#registerrequestschema)
- [UNREGISTER\_REQUEST](base_remote_protocol.md#unregister_request)
- [UnregisterRequestSchema](base_remote_protocol.md#unregisterrequestschema)

## Variables

### BUILDNUMBER\_EVENT

• `Const` **BUILDNUMBER\_EVENT**: *buildnumber*= "buildnumber"

The build number event is an event streamed from the
server to the client once this client has connected

Defined in: [base/remote-protocol.ts:19](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L19)

___

### CHANGED\_FEEEDBACK\_EVENT

• `Const` **CHANGED\_FEEEDBACK\_EVENT**: *changed*= "changed"

Event that comes from the server when something has
changed or as an answer from a feedback request

Defined in: [base/remote-protocol.ts:67](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L67)

___

### CURRENCY\_FACTORS\_UPDATED\_EVENT

• `Const` **CURRENCY\_FACTORS\_UPDATED\_EVENT**: *currency-factors-updated*= "currency-factors-updated"

This event occurs when the currency factors have been changed and it streams to
every socket that just happens to be connected, not just identified but just
connected into it, while the data could be attached, we really want to perform
the request to the server in order to ensure that it is cached

Defined in: [base/remote-protocol.ts:34](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L34)

___

### ERROR\_EVENT

• `Const` **ERROR\_EVENT**: *listener-error*= "listener-error"

This is streamed to the client once the server hits an error
that was somehow caused by the client, there's no much use
for an error event other than notice invalid requests

Defined in: [base/remote-protocol.ts:41](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L41)

___

### FEEDBACK\_REQUEST

• `Const` **FEEDBACK\_REQUEST**: *feedback*= "feedback"

a request that is sent to the server in order to
request feedback for a single item definition

Defined in: [base/remote-protocol.ts:260](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L260)

___

### FeedbackRequestSchema

• `Const` **FeedbackRequestSchema**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`properties` | *object* |
`properties.id` | *object* |
`properties.id.type` | *string* |
`properties.itemDefinition` | *object* |
`properties.itemDefinition.type` | *string* |
`properties.version` | *object* |
`properties.version.type` | *string*[] |
`required` | *string*[] |
`type` | *string* |

Defined in: [base/remote-protocol.ts:271](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L271)

___

### IDENTIFIED\_EVENT

• `Const` **IDENTIFIED\_EVENT**: *identified*= "identified"

Identified event comes once the user has been identified properly

Defined in: [base/remote-protocol.ts:54](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L54)

___

### IDENTIFY\_REQUEST

• `Const` **IDENTIFY\_REQUEST**: *identify*= "identify"

The identify request comes when a socket first connects and identifies
itself (this must be the first request, or otherwise other requests will
be ignored)

Defined in: [base/remote-protocol.ts:161](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L161)

___

### IdentifyRequestSchema

• `Const` **IdentifyRequestSchema**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`properties` | *object* |
`properties.token` | *object* |
`properties.token.type` | *string*[] |
`properties.uuid` | *object* |
`properties.uuid.type` | *string* |
`required` | *string*[] |
`type` | *string* |

Defined in: [base/remote-protocol.ts:170](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L170)

___

### KICKED\_EVENT

• `Const` **KICKED\_EVENT**: *kicked*= "kicked"

Event that occurs when the user has been kicked, when log out
from all devices has been triggered, users are kicked out and forcefully
logged out, this even also occurs on an invalid identified event

Defined in: [base/remote-protocol.ts:61](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L61)

___

### OWNED\_SEARCH\_FEEDBACK\_REQUEST

• `Const` **OWNED\_SEARCH\_FEEDBACK\_REQUEST**: *owned-search-feedback*= "owned-search-feedback"

The feedback version of [PARENTED_SEARCH_REGISTER_REQUEST](base_remote_protocol.md#parented_search_register_request)

Defined in: [base/remote-protocol.ts:462](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L462)

___

### OWNED\_SEARCH\_RECORDS\_EVENT

• `Const` **OWNED\_SEARCH\_RECORDS\_EVENT**: *owned-search-records*= "owned-search-records"

When they are owned items, as a search has been cached using a creator
as a base

Defined in: [base/remote-protocol.ts:130](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L130)

___

### OWNED\_SEARCH\_REGISTER\_REQUEST

• `Const` **OWNED\_SEARCH\_REGISTER\_REQUEST**: *owned-search-register*= "owned-search-register"

this is necessary for owned searches in order to run created by
cached searches and then request for updates

Defined in: [base/remote-protocol.ts:306](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L306)

___

### OWNED\_SEARCH\_UNREGISTER\_REQUEST

• `Const` **OWNED\_SEARCH\_UNREGISTER\_REQUEST**: *owned-search-unregister*= "owned-search-unregister"

The unregister version of [OWNED_SEARCH_REGISTER_REQUEST](base_remote_protocol.md#owned_search_register_request)

Defined in: [base/remote-protocol.ts:381](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L381)

___

### OwnedSearchFeedbackRequestSchema

• `Const` **OwnedSearchFeedbackRequestSchema**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`properties` | *object* |
`properties.createdBy` | *object* |
`properties.createdBy.type` | *string* |
`properties.lastModified` | *object* |
`properties.lastModified.type` | *string*[] |
`properties.qualifiedPathName` | *object* |
`properties.qualifiedPathName.type` | *string* |
`required` | *string*[] |
`type` | *string* |

Defined in: [base/remote-protocol.ts:470](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L470)

___

### OwnedSearchRegisterRequestSchema

• `Const` **OwnedSearchRegisterRequestSchema**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`properties` | *object* |
`properties.createdBy` | *object* |
`properties.createdBy.type` | *string* |
`properties.qualifiedPathName` | *object* |
`properties.qualifiedPathName.type` | *string* |
`required` | *string*[] |
`type` | *string* |

Defined in: [base/remote-protocol.ts:315](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L315)

___

### OwnedSearchUnregisterRequestSchema

• `Const` **OwnedSearchUnregisterRequestSchema**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`properties` | *object* |
`properties.createdBy` | *object* |
`properties.createdBy.type` | *string* |
`properties.qualifiedPathName` | *object* |
`properties.qualifiedPathName.type` | *string* |
`required` | *string*[] |
`type` | *string* |

Defined in: [base/remote-protocol.ts:388](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L388)

___

### PARENTED\_SEARCH\_FEEDBACK\_REQUEST

• `Const` **PARENTED\_SEARCH\_FEEDBACK\_REQUEST**: *parented-search-feedback*= "parented-search-feedback"

The feedback version of [PARENTED_SEARCH_REGISTER_REQUEST](base_remote_protocol.md#parented_search_register_request)

Defined in: [base/remote-protocol.ts:493](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L493)

___

### PARENTED\_SEARCH\_RECORDS\_EVENT

• `Const` **PARENTED\_SEARCH\_RECORDS\_EVENT**: *parented-search-records*= "parented-search-records"

When they are parented items the parent type and id, that has been cached
using those

Defined in: [base/remote-protocol.ts:143](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L143)

___

### PARENTED\_SEARCH\_REGISTER\_REQUEST

• `Const` **PARENTED\_SEARCH\_REGISTER\_REQUEST**: *parented-search-register*= "parented-search-register"

this is necessary for parented searches in order to run parented by
cached searches and then request for updates

Defined in: [base/remote-protocol.ts:335](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L335)

___

### PARENTED\_SEARCH\_UNREGISTER\_REQUEST

• `Const` **PARENTED\_SEARCH\_UNREGISTER\_REQUEST**: *parented-search-unregister*= "parented-search-unregister"

The unregister version of [PARENTED_SEARCH_REGISTER_REQUEST](base_remote_protocol.md#parented_search_register_request)

Defined in: [base/remote-protocol.ts:407](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L407)

___

### ParentedSearchFeedbackRequestSchema

• `Const` **ParentedSearchFeedbackRequestSchema**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`properties` | *object* |
`properties.lastModified` | *object* |
`properties.lastModified.type` | *string*[] |
`properties.parentId` | *object* |
`properties.parentId.type` | *string* |
`properties.parentType` | *object* |
`properties.parentType.type` | *string* |
`properties.parentVersion` | *object* |
`properties.parentVersion.type` | *string*[] |
`properties.qualifiedPathName` | *object* |
`properties.qualifiedPathName.type` | *string* |
`required` | *string*[] |
`type` | *string* |

Defined in: [base/remote-protocol.ts:502](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L502)

___

### ParentedSearchRegisterRequestSchema

• `Const` **ParentedSearchRegisterRequestSchema**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`properties` | *object* |
`properties.parentId` | *object* |
`properties.parentId.type` | *string* |
`properties.parentType` | *object* |
`properties.parentType.type` | *string* |
`properties.parentVersion` | *object* |
`properties.parentVersion.type` | *string*[] |
`properties.qualifiedPathName` | *object* |
`properties.qualifiedPathName.type` | *string* |
`required` | *string*[] |
`type` | *string* |

Defined in: [base/remote-protocol.ts:345](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L345)

___

### ParentedSearchUnregisterRequestSchema

• `Const` **ParentedSearchUnregisterRequestSchema**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`properties` | *object* |
`properties.parentId` | *object* |
`properties.parentId.type` | *string* |
`properties.parentType` | *object* |
`properties.parentType.type` | *string* |
`properties.parentVersion` | *object* |
`properties.parentVersion.type` | *string*[] |
`properties.qualifiedPathName` | *object* |
`properties.qualifiedPathName.type` | *string* |
`required` | *string*[] |
`type` | *string* |

Defined in: [base/remote-protocol.ts:416](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L416)

___

### REGISTER\_REQUEST

• `Const` **REGISTER\_REQUEST**: *register*= "register"

The request that is sent to the server in order to register
a single item definition for updates and changes

Defined in: [base/remote-protocol.ts:190](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L190)

___

### RegisterRequestSchema

• `Const` **RegisterRequestSchema**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`properties` | *object* |
`properties.id` | *object* |
`properties.id.type` | *string* |
`properties.itemDefinition` | *object* |
`properties.itemDefinition.type` | *string* |
`properties.version` | *object* |
`properties.version.type` | *string*[] |
`required` | *string*[] |
`type` | *string* |

Defined in: [base/remote-protocol.ts:202](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L202)

___

### UNREGISTER\_REQUEST

• `Const` **UNREGISTER\_REQUEST**: *unregister*= "unregister"

Request to unregister and stop getting notifications from
a single item definition

Defined in: [base/remote-protocol.ts:226](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L226)

___

### UnregisterRequestSchema

• `Const` **UnregisterRequestSchema**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`properties` | *object* |
`properties.id` | *object* |
`properties.id.type` | *string* |
`properties.itemDefinition` | *object* |
`properties.itemDefinition.type` | *string* |
`properties.version` | *object* |
`properties.version.type` | *string*[] |
`required` | *string*[] |
`type` | *string* |

Defined in: [base/remote-protocol.ts:236](https://github.com/onzag/itemize/blob/55e63f2c/base/remote-protocol.ts#L236)
