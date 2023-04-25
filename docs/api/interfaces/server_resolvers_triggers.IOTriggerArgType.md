[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/resolvers/triggers](../modules/server_resolvers_triggers.md) / IOTriggerArgType

# Interface: IOTriggerArgType

[server/resolvers/triggers](../modules/server_resolvers_triggers.md).IOTriggerArgType

## Table of contents

### Properties

- [action](server_resolvers_triggers.IOTriggerArgType.md#action)
- [appData](server_resolvers_triggers.IOTriggerArgType.md#appdata)
- [customId](server_resolvers_triggers.IOTriggerArgType.md#customid)
- [dictionary](server_resolvers_triggers.IOTriggerArgType.md#dictionary)
- [extraArgs](server_resolvers_triggers.IOTriggerArgType.md#extraargs)
- [id](server_resolvers_triggers.IOTriggerArgType.md#id)
- [itemDefinition](server_resolvers_triggers.IOTriggerArgType.md#itemdefinition)
- [language](server_resolvers_triggers.IOTriggerArgType.md#language)
- [module](server_resolvers_triggers.IOTriggerArgType.md#module)
- [newValue](server_resolvers_triggers.IOTriggerArgType.md#newvalue)
- [newValueBlocked](server_resolvers_triggers.IOTriggerArgType.md#newvalueblocked)
- [newValueSQL](server_resolvers_triggers.IOTriggerArgType.md#newvaluesql)
- [originalValue](server_resolvers_triggers.IOTriggerArgType.md#originalvalue)
- [originalValueBlocked](server_resolvers_triggers.IOTriggerArgType.md#originalvalueblocked)
- [originalValueSQL](server_resolvers_triggers.IOTriggerArgType.md#originalvaluesql)
- [requestedUpdate](server_resolvers_triggers.IOTriggerArgType.md#requestedupdate)
- [requestedUpdateCreatedBy](server_resolvers_triggers.IOTriggerArgType.md#requestedupdatecreatedby)
- [requestedUpdateParent](server_resolvers_triggers.IOTriggerArgType.md#requestedupdateparent)
- [requestedUpdateToBlock](server_resolvers_triggers.IOTriggerArgType.md#requestedupdatetoblock)
- [requestedUpdateToUnblock](server_resolvers_triggers.IOTriggerArgType.md#requestedupdatetounblock)
- [user](server_resolvers_triggers.IOTriggerArgType.md#user)
- [version](server_resolvers_triggers.IOTriggerArgType.md#version)

### Methods

- [forbid](server_resolvers_triggers.IOTriggerArgType.md#forbid)
- [setForId](server_resolvers_triggers.IOTriggerArgType.md#setforid)
- [setVersion](server_resolvers_triggers.IOTriggerArgType.md#setversion)

## Properties

### action

• **action**: [`IOTriggerActions`](../enums/server_resolvers_triggers.IOTriggerActions.md)

The action being ran

#### Defined in

[server/resolvers/triggers.ts:105](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L105)

___

### appData

• **appData**: [`IAppDataType`](server.IAppDataType.md)

App data of the entire application

#### Defined in

[server/resolvers/triggers.ts:31](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L31)

___

### customId

• **customId**: `string`

A custom id that might be provided during adding events
this is when the user specifies their own id
to use during a custom id event

#### Defined in

[server/resolvers/triggers.ts:129](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L129)

___

### dictionary

• **dictionary**: `string`

The dictionary that was obtained from the language

#### Defined in

[server/resolvers/triggers.ts:27](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L27)

___

### extraArgs

• **extraArgs**: [`IGQLArgs`](gql_querier.IGQLArgs.md)

Arguments that are not part of the patch that were passed to graphql

#### Defined in

[server/resolvers/triggers.ts:93](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L93)

___

### id

• **id**: `string`

The id of the item we are working with, it is null for
CREATE, but it is set for CREATED and others

#### Defined in

[server/resolvers/triggers.ts:110](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L110)

___

### itemDefinition

• **itemDefinition**: [`default`](../classes/base_Root_Module_ItemDefinition.default.md)

the item definition in question

#### Defined in

[server/resolvers/triggers.ts:97](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L97)

___

### language

• **language**: `string`

The language that was used

#### Defined in

[server/resolvers/triggers.ts:23](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L23)

___

### module

• **module**: [`default`](../classes/base_Root_Module.default.md)

The module in question

#### Defined in

[server/resolvers/triggers.ts:101](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L101)

___

### newValue

• **newValue**: [`IGQLValue`](gql_querier.IGQLValue.md)

the new value that it is hosting usually only available
on done requests

#### Defined in

[server/resolvers/triggers.ts:48](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L48)

___

### newValueBlocked

• **newValueBlocked**: `boolean`

whether the new value is blocked

#### Defined in

[server/resolvers/triggers.ts:56](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L56)

___

### newValueSQL

• **newValueSQL**: [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

The new value when sql is done

#### Defined in

[server/resolvers/triggers.ts:52](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L52)

___

### originalValue

• **originalValue**: [`IGQLValue`](gql_querier.IGQLValue.md)

the current value that the database is hosting

#### Defined in

[server/resolvers/triggers.ts:35](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L35)

___

### originalValueBlocked

• **originalValueBlocked**: `boolean`

whether the original value is blocked

#### Defined in

[server/resolvers/triggers.ts:43](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L43)

___

### originalValueSQL

• **originalValueSQL**: [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

The original value in sql form

#### Defined in

[server/resolvers/triggers.ts:39](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L39)

___

### requestedUpdate

• **requestedUpdate**: [`IGQLArgs`](gql_querier.IGQLArgs.md)

A partial arg based update for the value, remember this is a partial
value

#### Defined in

[server/resolvers/triggers.ts:61](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L61)

___

### requestedUpdateCreatedBy

• **requestedUpdateCreatedBy**: `string`

The creator for the requested update
only truly exists during an add action and represents
the expected creator
might differ from the current user if create in behalf is active

#### Defined in

[server/resolvers/triggers.ts:68](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L68)

___

### requestedUpdateParent

• **requestedUpdateParent**: `Object`

The parent for the requested update
only truly exists during an add and edit action and represents
the expected parent or the new parent
might differ from the current user if create in behalf is active

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `type` | `string` |
| `version` | `string` |

#### Defined in

[server/resolvers/triggers.ts:75](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L75)

___

### requestedUpdateToBlock

• **requestedUpdateToBlock**: `boolean`

Whether the requested update is trying to set the state
to blocked

#### Defined in

[server/resolvers/triggers.ts:84](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L84)

___

### requestedUpdateToUnblock

• **requestedUpdateToUnblock**: `boolean`

Whether the requested update is trying to set the state
to blocked

#### Defined in

[server/resolvers/triggers.ts:89](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L89)

___

### user

• **user**: `Object`

The user we are working with

#### Type declaration

| Name | Type |
| :------ | :------ |
| `customData` | `any` |
| `id` | `string` |
| `role` | `string` |

#### Defined in

[server/resolvers/triggers.ts:119](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L119)

___

### version

• **version**: `string`

The version of the item we are working with, it is null for
CREATE, but it is set for CREATED and others

#### Defined in

[server/resolvers/triggers.ts:115](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L115)

## Methods

### forbid

▸ **forbid**(`message`, `customCode?`): `void`

Causes the request to be forbidden

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `customCode?` | `string` |

#### Returns

`void`

#### Defined in

[server/resolvers/triggers.ts:133](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L133)

___

### setForId

▸ **setForId**(`id`): `void`

Changes the id that will be used in a CREATE event

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`void`

#### Defined in

[server/resolvers/triggers.ts:137](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L137)

___

### setVersion

▸ **setVersion**(`version`): `void`

Changes the version that will be used in a CREATE event

#### Parameters

| Name | Type |
| :------ | :------ |
| `version` | `string` |

#### Returns

`void`

#### Defined in

[server/resolvers/triggers.ts:141](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L141)
