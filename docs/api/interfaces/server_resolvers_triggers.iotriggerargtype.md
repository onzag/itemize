[](../README.md) / [Exports](../modules.md) / [server/resolvers/triggers](../modules/server_resolvers_triggers.md) / IOTriggerArgType

# Interface: IOTriggerArgType

[server/resolvers/triggers](../modules/server_resolvers_triggers.md).IOTriggerArgType

## Table of contents

### Properties

- [action](server_resolvers_triggers.iotriggerargtype.md#action)
- [appData](server_resolvers_triggers.iotriggerargtype.md#appdata)
- [extraArgs](server_resolvers_triggers.iotriggerargtype.md#extraargs)
- [forbid](server_resolvers_triggers.iotriggerargtype.md#forbid)
- [id](server_resolvers_triggers.iotriggerargtype.md#id)
- [itemDefinition](server_resolvers_triggers.iotriggerargtype.md#itemdefinition)
- [module](server_resolvers_triggers.iotriggerargtype.md#module)
- [newValue](server_resolvers_triggers.iotriggerargtype.md#newvalue)
- [originalValue](server_resolvers_triggers.iotriggerargtype.md#originalvalue)
- [requestedUpdate](server_resolvers_triggers.iotriggerargtype.md#requestedupdate)
- [user](server_resolvers_triggers.iotriggerargtype.md#user)
- [version](server_resolvers_triggers.iotriggerargtype.md#version)

## Properties

### action

• **action**: [*IOTriggerActions*](../enums/server_resolvers_triggers.iotriggeractions.md)

The action being ran

Defined in: [server/resolvers/triggers.ts:51](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/triggers.ts#L51)

___

### appData

• **appData**: [*IAppDataType*](server.iappdatatype.md)

App data of the entire application

Defined in: [server/resolvers/triggers.ts:21](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/triggers.ts#L21)

___

### extraArgs

• **extraArgs**: [*IGQLArgs*](gql_querier.igqlargs.md)

Arguments that are not part of the patch that were passed to graphql

Defined in: [server/resolvers/triggers.ts:39](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/triggers.ts#L39)

___

### forbid

• **forbid**: (`message`: *string*, `customCode?`: *string*) => *void*

Causes the request to be forbidden

#### Type declaration:

▸ (`message`: *string*, `customCode?`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`message` | *string* |
`customCode?` | *string* |

**Returns:** *void*

Defined in: [server/resolvers/triggers.ts:73](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/triggers.ts#L73)

Defined in: [server/resolvers/triggers.ts:73](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/triggers.ts#L73)

___

### id

• **id**: *string*

The id of the item we are working with, it is null for
CREATE, but it is set for CREATED and others

Defined in: [server/resolvers/triggers.ts:56](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/triggers.ts#L56)

___

### itemDefinition

• **itemDefinition**: [*default*](../classes/base_root_module_itemdefinition.default.md)

the item definition in question

Defined in: [server/resolvers/triggers.ts:43](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/triggers.ts#L43)

___

### module

• **module**: [*default*](../classes/base_root_module.default.md)

The module in question

Defined in: [server/resolvers/triggers.ts:47](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/triggers.ts#L47)

___

### newValue

• **newValue**: [*IGQLValue*](gql_querier.igqlvalue.md)

the new value that it is hosting usually only available
on done requests

Defined in: [server/resolvers/triggers.ts:30](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/triggers.ts#L30)

___

### originalValue

• **originalValue**: [*IGQLValue*](gql_querier.igqlvalue.md)

the current value that the database is hosting

Defined in: [server/resolvers/triggers.ts:25](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/triggers.ts#L25)

___

### requestedUpdate

• **requestedUpdate**: [*IGQLArgs*](gql_querier.igqlargs.md)

A partial arg based update for the value, remember this is a partial
value

Defined in: [server/resolvers/triggers.ts:35](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/triggers.ts#L35)

___

### user

• **user**: *object*

The user we are working with

#### Type declaration:

Name | Type |
:------ | :------ |
`customData` | *any* |
`id` | *string* |
`role` | *string* |

Defined in: [server/resolvers/triggers.ts:65](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/triggers.ts#L65)

___

### version

• **version**: *string*

The version of the item we are working with, it is null for
CREATE, but it is set for CREATED and others

Defined in: [server/resolvers/triggers.ts:61](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/triggers.ts#L61)
