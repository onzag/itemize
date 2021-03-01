[](../README.md) / [Exports](../modules.md) / [client/internal/testing](../modules/client_internal_testing.md) / IGlobalTestingType

# Interface: IGlobalTestingType

[client/internal/testing](../modules/client_internal_testing.md).IGlobalTestingType

## Table of contents

### Properties

- [mountedExplorers](client_internal_testing.iglobaltestingtype.md#mountedexplorers)
- [mountedItems](client_internal_testing.iglobaltestingtype.md#mounteditems)
- [mountedModules](client_internal_testing.iglobaltestingtype.md#mountedmodules)
- [socket](client_internal_testing.iglobaltestingtype.md#socket)

## Properties

### mountedExplorers

• **mountedExplorers**: [*IMountedExplorers*](client_internal_testing.imountedexplorers.md)[]

Defined in: [client/internal/testing.ts:123](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/testing.ts#L123)

___

### mountedItems

• **mountedItems**: [*IMountedItem*](client_internal_testing.imounteditem.md)[]

Defined in: [client/internal/testing.ts:121](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/testing.ts#L121)

___

### mountedModules

• **mountedModules**: [*IMountedModule*](client_internal_testing.imountedmodule.md)[]

Defined in: [client/internal/testing.ts:122](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/testing.ts#L122)

___

### socket

• **socket**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`changedFeedbackEvents` | [*IChangedFeedbackEventWithTime*](client_internal_testing.ichangedfeedbackeventwithtime.md)[] |
`errors` | [*IErrorEventWithTime*](client_internal_testing.ierroreventwithtime.md)[] |
`feedbackRequests` | [*IFeedbackRequestWithTime*](client_internal_testing.ifeedbackrequestwithtime.md)[] |
`identifiedEvents` | [*IIdentifiedEventWithTime*](client_internal_testing.iidentifiedeventwithtime.md)[] |
`identifyRequests` | [*IIdentifyRequestWithTime*](client_internal_testing.iidentifyrequestwithtime.md)[] |
`ownedSearchFeedbackRequests` | [*IOwnedSearchFeedbackRequestWithTime*](client_internal_testing.iownedsearchfeedbackrequestwithtime.md)[] |
`ownedSearchRecordsAddedEvents` | [*IOwnedSearchRecordsAddedEventWithTime*](client_internal_testing.iownedsearchrecordsaddedeventwithtime.md)[] |
`ownedSearchRegisterRequests` | [*IOwnedSearchRegisterRequestWithTime*](client_internal_testing.iownedsearchregisterrequestwithtime.md)[] |
`ownedSearchUnregisterRequests` | [*IOwnedSearchUnregisterRequestWithTime*](client_internal_testing.iownedsearchunregisterrequestwithtime.md)[] |
`parentedSearchFeebackRequests` | [*IParentedSearchFeedbackRequestWithTime*](client_internal_testing.iparentedsearchfeedbackrequestwithtime.md)[] |
`parentedSearchRecordsAddedEvents` | [*IParentedSearchRecordsAddedEventWithTime*](client_internal_testing.iparentedsearchrecordsaddedeventwithtime.md)[] |
`parentedSearchRegisterRequests` | [*IParentedSearchRegisterRequestWithTime*](client_internal_testing.iparentedsearchregisterrequestwithtime.md)[] |
`parentedSearchUnregisterRequests` | [*IParentedSearchUnregisterRequestWithTime*](client_internal_testing.iparentedsearchunregisterrequestwithtime.md)[] |
`registerRequests` | [*IRegisterRequestWithTime*](client_internal_testing.iregisterrequestwithtime.md)[] |
`unregisterRequests` | [*IUnregisterRequestWithTime*](client_internal_testing.iunregisterrequestwithtime.md)[] |

Defined in: [client/internal/testing.ts:124](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/testing.ts#L124)
