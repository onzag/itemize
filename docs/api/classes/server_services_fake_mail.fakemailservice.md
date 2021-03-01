[](../README.md) / [Exports](../modules.md) / [server/services/fake-mail](../modules/server_services_fake_mail.md) / FakeMailService

# Class: FakeMailService

[server/services/fake-mail](../modules/server_services_fake_mail.md).FakeMailService

## Hierarchy

* [*default*](server_services_base_mailprovider.default.md)<*null*\>

  ↳ **FakeMailService**

## Table of contents

### Constructors

- [constructor](server_services_fake_mail.fakemailservice.md#constructor)

### Properties

- [appConfig](server_services_fake_mail.fakemailservice.md#appconfig)
- [appSensitiveConfig](server_services_fake_mail.fakemailservice.md#appsensitiveconfig)
- [config](server_services_fake_mail.fakemailservice.md#config)
- [globalCustomServices](server_services_fake_mail.fakemailservice.md#globalcustomservices)
- [globalDatabaseConnection](server_services_fake_mail.fakemailservice.md#globaldatabaseconnection)
- [globalInstance](server_services_fake_mail.fakemailservice.md#globalinstance)
- [globalMailProvider](server_services_fake_mail.fakemailservice.md#globalmailprovider)
- [globalRawDB](server_services_fake_mail.fakemailservice.md#globalrawdb)
- [globalRedis](server_services_fake_mail.fakemailservice.md#globalredis)
- [globalRedisPub](server_services_fake_mail.fakemailservice.md#globalredispub)
- [globalRoot](server_services_fake_mail.fakemailservice.md#globalroot)
- [instanceName](server_services_fake_mail.fakemailservice.md#instancename)
- [localAppData](server_services_fake_mail.fakemailservice.md#localappdata)
- [localInstance](server_services_fake_mail.fakemailservice.md#localinstance)
- [registry](server_services_fake_mail.fakemailservice.md#registry)

### Methods

- [execute](server_services_fake_mail.fakemailservice.md#execute)
- [expressRouter](server_services_fake_mail.fakemailservice.md#expressrouter)
- [getInstanceName](server_services_fake_mail.fakemailservice.md#getinstancename)
- [getRouter](server_services_fake_mail.fakemailservice.md#getrouter)
- [getRunCycleTime](server_services_fake_mail.fakemailservice.md#getruncycletime)
- [getTriggerRegistry](server_services_fake_mail.fakemailservice.md#gettriggerregistry)
- [initialize](server_services_fake_mail.fakemailservice.md#initialize)
- [isInstanceGlobal](server_services_fake_mail.fakemailservice.md#isinstanceglobal)
- [isInstanceLocal](server_services_fake_mail.fakemailservice.md#isinstancelocal)
- [logDebug](server_services_fake_mail.fakemailservice.md#logdebug)
- [logError](server_services_fake_mail.fakemailservice.md#logerror)
- [logInfo](server_services_fake_mail.fakemailservice.md#loginfo)
- [onEmailRecieved](server_services_fake_mail.fakemailservice.md#onemailrecieved)
- [run](server_services_fake_mail.fakemailservice.md#run)
- [sendEmail](server_services_fake_mail.fakemailservice.md#sendemail)
- [sendTemplateEmail](server_services_fake_mail.fakemailservice.md#sendtemplateemail)
- [sendUnverifiedTemplateEmail](server_services_fake_mail.fakemailservice.md#sendunverifiedtemplateemail)
- [setInstanceName](server_services_fake_mail.fakemailservice.md#setinstancename)
- [setupGlobalResources](server_services_fake_mail.fakemailservice.md#setupglobalresources)
- [setupLocalResources](server_services_fake_mail.fakemailservice.md#setuplocalresources)
- [expressRouter](server_services_fake_mail.fakemailservice.md#expressrouter)
- [getRouter](server_services_fake_mail.fakemailservice.md#getrouter)
- [getTriggerRegistry](server_services_fake_mail.fakemailservice.md#gettriggerregistry)
- [getType](server_services_fake_mail.fakemailservice.md#gettype)
- [logDebug](server_services_fake_mail.fakemailservice.md#logdebug)
- [logError](server_services_fake_mail.fakemailservice.md#logerror)
- [logInfo](server_services_fake_mail.fakemailservice.md#loginfo)

## Constructors

### constructor

\+ **new FakeMailService**(`config`: *null*, `registry`: [*RegistryService*](server_services_registry.registryservice.md), `appConfig`: [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md), `appSensitiveConfig`: [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md)): [*FakeMailService*](server_services_fake_mail.fakemailservice.md)

#### Parameters:

Name | Type |
:------ | :------ |
`config` | *null* |
`registry` | [*RegistryService*](server_services_registry.registryservice.md) |
`appConfig` | [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md) |
`appSensitiveConfig` | [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md) |

**Returns:** [*FakeMailService*](server_services_fake_mail.fakemailservice.md)

Inherited from: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/index.ts:51](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L51)

## Properties

### appConfig

• **appConfig**: [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md)

Inherited from: [default](server_services_base_mailprovider.default.md).[appConfig](server_services_base_mailprovider.default.md#appconfig)

Defined in: [server/services/index.ts:34](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L34)

___

### appSensitiveConfig

• **appSensitiveConfig**: [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md)

Inherited from: [default](server_services_base_mailprovider.default.md).[appSensitiveConfig](server_services_base_mailprovider.default.md#appsensitiveconfig)

Defined in: [server/services/index.ts:35](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L35)

___

### config

• **config**: *null*

Inherited from: [default](server_services_base_mailprovider.default.md).[config](server_services_base_mailprovider.default.md#config)

Defined in: [server/services/index.ts:32](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L32)

___

### globalCustomServices

• **globalCustomServices**: *object*

#### Type declaration:

Inherited from: [default](server_services_base_mailprovider.default.md).[globalCustomServices](server_services_base_mailprovider.default.md#globalcustomservices)

Defined in: [server/services/index.ts:43](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L43)

___

### globalDatabaseConnection

• **globalDatabaseConnection**: [*DatabaseConnection*](database.databaseconnection.md)

Inherited from: [default](server_services_base_mailprovider.default.md).[globalDatabaseConnection](server_services_base_mailprovider.default.md#globaldatabaseconnection)

Defined in: [server/services/index.ts:37](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L37)

___

### globalInstance

• **globalInstance**: *boolean*

Inherited from: [default](server_services_base_mailprovider.default.md).[globalInstance](server_services_base_mailprovider.default.md#globalinstance)

Defined in: [server/services/index.ts:50](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L50)

___

### globalMailProvider

• **globalMailProvider**: [*default*](server_services_base_mailprovider.default.md)<any\>

Inherited from: [default](server_services_base_mailprovider.default.md).[globalMailProvider](server_services_base_mailprovider.default.md#globalmailprovider)

Defined in: [server/services/index.ts:42](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L42)

___

### globalRawDB

• **globalRawDB**: [*ItemizeRawDB*](server_raw_db.itemizerawdb.md)

Inherited from: [default](server_services_base_mailprovider.default.md).[globalRawDB](server_services_base_mailprovider.default.md#globalrawdb)

Defined in: [server/services/index.ts:40](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L40)

___

### globalRedis

• **globalRedis**: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md)

Inherited from: [default](server_services_base_mailprovider.default.md).[globalRedis](server_services_base_mailprovider.default.md#globalredis)

Defined in: [server/services/index.ts:39](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L39)

___

### globalRedisPub

• **globalRedisPub**: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md)

Inherited from: [default](server_services_base_mailprovider.default.md).[globalRedisPub](server_services_base_mailprovider.default.md#globalredispub)

Defined in: [server/services/index.ts:38](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L38)

___

### globalRoot

• **globalRoot**: [*default*](root.default.md)

Inherited from: [default](server_services_base_mailprovider.default.md).[globalRoot](server_services_base_mailprovider.default.md#globalroot)

Defined in: [server/services/index.ts:41](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L41)

___

### instanceName

• **instanceName**: *string*

Inherited from: [default](server_services_base_mailprovider.default.md).[instanceName](server_services_base_mailprovider.default.md#instancename)

Defined in: [server/services/index.ts:49](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L49)

___

### localAppData

• **localAppData**: [*IAppDataType*](../interfaces/server.iappdatatype.md)

Inherited from: [default](server_services_base_mailprovider.default.md).[localAppData](server_services_base_mailprovider.default.md#localappdata)

Defined in: [server/services/index.ts:47](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L47)

___

### localInstance

• **localInstance**: *boolean*

Inherited from: [default](server_services_base_mailprovider.default.md).[localInstance](server_services_base_mailprovider.default.md#localinstance)

Defined in: [server/services/index.ts:51](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L51)

___

### registry

• **registry**: [*RegistryService*](server_services_registry.registryservice.md)

Inherited from: [default](server_services_base_mailprovider.default.md).[registry](server_services_base_mailprovider.default.md#registry)

Defined in: [server/services/index.ts:33](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L33)

## Methods

### execute

▸ **execute**(): *void*

Performs the execution of the service, basically
it will do the run function and then re-run as specified

**Returns:** *void*

Inherited from: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/index.ts:155](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L155)

___

### expressRouter

▸ **expressRouter**(`options?`: RouterOptions): *Router*

#### Parameters:

Name | Type |
:------ | :------ |
`options?` | RouterOptions |

**Returns:** *Router*

Inherited from: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/index.ts:105](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L105)

___

### getInstanceName

▸ **getInstanceName**(): *string*

**Returns:** *string*

Inherited from: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/index.ts:69](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L69)

___

### getRouter

▸ **getRouter**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md)): *Router* \| *Promise*<Router\>

Provides a router endpoint, the router endpoint
will exist directly under the rest services
this enables to create webhooks and other subservices
that are attached to this service

If the service provider if executed on a global environment
the endpoint does not get created, this means that in the global
manager this won't be executed, or anything that is meant
for the global manager

The router gets attached to /rest/service

**`override`** 

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |

**Returns:** *Router* \| *Promise*<Router\>

Inherited from: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/index.ts:242](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L242)

___

### getRunCycleTime

▸ **getRunCycleTime**(): *number*

Determines whether the run function
should run over again

**`override`** 

**Returns:** *number*

Inherited from: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/index.ts:215](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L215)

___

### getTriggerRegistry

▸ **getTriggerRegistry**(): [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md) \| *Promise*<[*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)\>

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

**`override`** 

**Returns:** [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md) \| *Promise*<[*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)\>

Inherited from: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/index.ts:269](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L269)

___

### initialize

▸ **initialize**(): *void* \| *Promise*<void\>

This function is executed during
the initialization of the service

If your service is a global service you will
have access to the global resources while
this function executes

**`override`** 

**Returns:** *void* \| *Promise*<void\>

Inherited from: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/index.ts:206](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L206)

___

### isInstanceGlobal

▸ **isInstanceGlobal**(): *boolean*

**Returns:** *boolean*

Inherited from: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/index.ts:73](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L73)

___

### isInstanceLocal

▸ **isInstanceLocal**(): *boolean*

**Returns:** *boolean*

Inherited from: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/index.ts:77](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L77)

___

### logDebug

▸ **logDebug**(`str`: *string*, `extra?`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |
`extra?` | *any* |

**Returns:** *void*

Inherited from: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/index.ts:85](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L85)

___

### logError

▸ **logError**(`str`: *string*, `extra?`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |
`extra?` | *any* |

**Returns:** *void*

Inherited from: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/index.ts:89](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L89)

___

### logInfo

▸ **logInfo**(`str`: *string*, `extra?`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |
`extra?` | *any* |

**Returns:** *void*

Inherited from: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/index.ts:81](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L81)

___

### onEmailRecieved

▸ **onEmailRecieved**(`data`: [*IReceiveEmailData*](../interfaces/server_services_base_mailprovider.ireceiveemaildata.md)): *void*

This method should get called once an email has been received
the service provider that extended the raw mail provider should
be able to trigger this function when specified, this function will
handle the mail configuration then and perform unsubscription tasks

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`data` | [*IReceiveEmailData*](../interfaces/server_services_base_mailprovider.ireceiveemaildata.md) | the email data received, make sure to fill this information properly    |

**Returns:** *void*

Inherited from: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/base/MailProvider.ts:591](https://github.com/onzag/itemize/blob/0569bdf2/server/services/base/MailProvider.ts#L591)

___

### run

▸ **run**(): *void* \| *Promise*<void\>

Executes some code

**`override`** 

**Returns:** *void* \| *Promise*<void\>

Inherited from: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/index.ts:223](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L223)

___

### sendEmail

▸ **sendEmail**(`data`: [*ISendEmailData*](../interfaces/server_services_base_mailprovider.isendemaildata.md)): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`data` | [*ISendEmailData*](../interfaces/server_services_base_mailprovider.isendemaildata.md) |

**Returns:** *Promise*<void\>

Overrides: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/fake-mail.ts:8](https://github.com/onzag/itemize/blob/0569bdf2/server/services/fake-mail.ts#L8)

___

### sendTemplateEmail

▸ **sendTemplateEmail**(`arg`: { `args`: *any* ; `canUnsubscribe`: *boolean* ; `confirmationProperties?`: *string*[] ; `emailProperty?`: *string* ; `fromEmailHandle`: *string* ; `fromUsername`: *string* ; `id`: *string* ; `ignoreUnsubscribe`: *boolean* ; `itemDefinition`: *string* \| [*default*](base_root_module_itemdefinition.default.md) ; `personalize?`: *string*[] ; `property`: *string* \| [*default*](base_root_module_itemdefinition_propertydefinition.default.md) ; `subject`: *string* ; `subscribeProperty`: *string* ; `to`: *string* \| [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md) \| [*ISQLTableRowValue*](../interfaces/sql.isqltablerowvalue.md) \| (*string* \| [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md) \| [*ISQLTableRowValue*](../interfaces/sql.isqltablerowvalue.md))[] ; `version?`: *string*  }): *Promise*<void\>

Sends a template based email to a given user
this way to send things will create unsubscribe urls
and ensure users that have opted out do not receive
such messages, so this is the best way to send emails

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | *object* | the unverified args   |
`arg.args` | *any* | the template args   |
`arg.canUnsubscribe` | *boolean* | whether the user is able to unsubscribe from this email requires the subscribeProperty value to be defined in order to work   |
`arg.confirmationProperties?` | *string*[] | - |
`arg.emailProperty?` | *string* | the email property to use to send emails, normally users only have a single email property so this isn't necessary but they might have some alternative email property to use as target email   |
`arg.fromEmailHandle` | *string* | this is the email handle side before the @domain.com   |
`arg.fromUsername` | *string* | - |
`arg.id` | *string* | the id for the given item we need to pull   |
`arg.ignoreUnsubscribe` | *boolean* | whether we should ignore the subscription values for the given user so they will receive the email anyway regardless of their subscription status this should never really be true   |
`arg.itemDefinition` | *string* \| [*default*](base_root_module_itemdefinition.default.md) | either a string that represents an item definition that can be pulled from the registry or an item definition itself that represents the item definition to be used for templating   |
`arg.personalize?` | *string*[] | if specified it will make each template personalized, it will add the email to the template args, and any other property that is specified on this list to the args, using personalization when sending to multiple users can hurt your mail speed as every user will receive a different email that needs to be built, personalize will also add a unsubscribe_url to the args, you might pass an empty array if you just want that    |
`arg.property` | *string* \| [*default*](base_root_module_itemdefinition_propertydefinition.default.md) | the property that the value is extracted for and should be a text type   |
`arg.subject` | *string* | the subject of the message   |
`arg.subscribeProperty` | *string* | - |
`arg.to` | *string* \| [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md) \| [*ISQLTableRowValue*](../interfaces/sql.isqltablerowvalue.md) \| (*string* \| [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md) \| [*ISQLTableRowValue*](../interfaces/sql.isqltablerowvalue.md))[] | this is a special list of values to send to the users that we want to send to, they can be specified as the list of ids, aka user identifiers of the given users, but grapqhl values or sql values are allowed as well and they improve speed up, remember to pass whole results with all the properties you are using or otherwise it might misbehave   |
`arg.version?` | *string* | an optional version value to use, this version is expected to be a locale version, as such unversioned values will be used as fallback if the version is not found   |

**Returns:** *Promise*<void\>

Inherited from: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/base/MailProvider.ts:332](https://github.com/onzag/itemize/blob/0569bdf2/server/services/base/MailProvider.ts#L332)

___

### sendUnverifiedTemplateEmail

▸ **sendUnverifiedTemplateEmail**(`arg`: { `args`: *any* ; `fromEmailHandle`: *string* ; `fromUsername`: *string* ; `id`: *string* ; `itemDefinition`: *string* \| [*default*](base_root_module_itemdefinition.default.md) ; `property`: *string* \| [*default*](base_root_module_itemdefinition_propertydefinition.default.md) ; `subject`: *string* ; `to`: *string* \| *string*[] ; `unsubscribeMailto?`: *string* ; `unsubscribeURLs?`: { [email: string]: [*IUnsubscribeURL*](../interfaces/server_services_base_mailprovider.iunsubscribeurl.md);  } ; `version?`: *string*  }): *Promise*<void\>

Sends a template based email to a given user and it
will not filter any of these users

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | *object* | the unverified args   |
`arg.args` | *any* | the template args   |
`arg.fromEmailHandle` | *string* | this is the email handle side before the @domain.com   |
`arg.fromUsername` | *string* | - |
`arg.id` | *string* | the id for the given item we need to pull   |
`arg.itemDefinition` | *string* \| [*default*](base_root_module_itemdefinition.default.md) | either a string that represents an item definition that can be pulled from the registry or an item definition itself that represents the item definition to be used for templating   |
`arg.property` | *string* \| [*default*](base_root_module_itemdefinition_propertydefinition.default.md) | the property that the value is extracted for and should be a text type   |
`arg.subject` | *string* | the subject of the message   |
`arg.to` | *string* \| *string*[] | the list of emails to send to   |
`arg.unsubscribeMailto?` | *string* | an optional mailto: protocol unsubscription mechanism to be added to the headers   |
`arg.unsubscribeURLs?` | *object* | urls per email to perform unsubscription    |
`arg.version?` | *string* | an optional version value to use, this version is expected to be a locale version, as such unversioned values will be used as fallback if the version is not found   |

**Returns:** *Promise*<void\>

Inherited from: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/base/MailProvider.ts:144](https://github.com/onzag/itemize/blob/0569bdf2/server/services/base/MailProvider.ts#L144)

___

### setInstanceName

▸ **setInstanceName**(`n`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`n` | *string* |

**Returns:** *void*

Inherited from: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/index.ts:65](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L65)

___

### setupGlobalResources

▸ **setupGlobalResources**(`globalDatabaseConnection`: [*DatabaseConnection*](database.databaseconnection.md), `globalClient`: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md), `globalPub`: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md), `globalMailProvider`: [*default*](server_services_base_mailprovider.default.md)<any\>, `globalCustomServices`: { [name: string]: [*ServiceProvider*](server_services.serviceprovider.md)<any\>;  }, `root`: [*default*](root.default.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`globalDatabaseConnection` | [*DatabaseConnection*](database.databaseconnection.md) |
`globalClient` | [*ItemizeRedisClient*](server_redis.itemizeredisclient.md) |
`globalPub` | [*ItemizeRedisClient*](server_redis.itemizeredisclient.md) |
`globalMailProvider` | [*default*](server_services_base_mailprovider.default.md)<any\> |
`globalCustomServices` | *object* |
`root` | [*default*](root.default.md) |

**Returns:** *void*

Inherited from: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/index.ts:113](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L113)

___

### setupLocalResources

▸ **setupLocalResources**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |

**Returns:** *void*

Inherited from: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/index.ts:133](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L133)

___

### expressRouter

▸ `Static`**expressRouter**(`options?`: RouterOptions): *Router*

#### Parameters:

Name | Type |
:------ | :------ |
`options?` | RouterOptions |

**Returns:** *Router*

Inherited from: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/index.ts:109](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L109)

___

### getRouter

▸ `Static`**getRouter**(`appData`: [*IAppDataType*](../interfaces/server.iappdatatype.md)): *Router* \| *Promise*<Router\>

Provides a router endpoint, but this method
is static, which means it only gets added once

If the service provider if executed on a global environment
the endpoint does not get created, this means that in the global
manager this won't be executed, or anything that is meant
for the global manager

the router gets attached to /rest/service

**`override`** 

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](../interfaces/server.iappdatatype.md) |

**Returns:** *Router* \| *Promise*<Router\>

Inherited from: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/index.ts:259](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L259)

___

### getTriggerRegistry

▸ `Static`**getTriggerRegistry**(): [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md) \| *Promise*<[*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)\>

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

This gets attached if a class is used rather than per instance

**`override`** 

**Returns:** [*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md) \| *Promise*<[*ITriggerRegistry*](../interfaces/server_resolvers_triggers.itriggerregistry.md)\>

Inherited from: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/index.ts:281](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L281)

___

### getType

▸ `Static`**getType**(): [*ServiceProviderType*](../enums/server_services.serviceprovidertype.md)

**Returns:** [*ServiceProviderType*](../enums/server_services.serviceprovidertype.md)

Overrides: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/fake-mail.ts:5](https://github.com/onzag/itemize/blob/0569bdf2/server/services/fake-mail.ts#L5)

___

### logDebug

▸ `Static`**logDebug**(`str`: *string*, `extra?`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |
`extra?` | *any* |

**Returns:** *void*

Inherited from: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/index.ts:97](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L97)

___

### logError

▸ `Static`**logError**(`str`: *string*, `extra?`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |
`extra?` | *any* |

**Returns:** *void*

Inherited from: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/index.ts:101](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L101)

___

### logInfo

▸ `Static`**logInfo**(`str`: *string*, `extra?`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`str` | *string* |
`extra?` | *any* |

**Returns:** *void*

Inherited from: [default](server_services_base_mailprovider.default.md)

Defined in: [server/services/index.ts:93](https://github.com/onzag/itemize/blob/0569bdf2/server/services/index.ts#L93)
