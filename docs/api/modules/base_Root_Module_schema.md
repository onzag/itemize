[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/schema

# Module: base/Root/Module/schema

This file contains the schema of the unprocessed form of the module

## Table of contents

### Properties

- [default](base_Root_Module_schema.md#default)

## Properties

### default

• **default**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `additionalProperties` | `boolean` |
| `properties` | `Object` |
| `properties.children` | `Object` |
| `properties.children.items` | `Object` |
| `properties.children.items.type` | `string` |
| `properties.children.minItems` | `number` |
| `properties.children.type` | `string` |
| `properties.maxSearchRecords` | `Object` |
| `properties.maxSearchRecords.type` | `string` |
| `properties.maxSearchResults` | `Object` |
| `properties.maxSearchResults.type` | `string` |
| `properties.modRoleAccess` | `Object` |
| `properties.modRoleAccess.items` | `Object` |
| `properties.modRoleAccess.items.type` | `string` |
| `properties.modRoleAccess.type` | `string` |
| `properties.readRoleAccess` | `Object` |
| `properties.readRoleAccess.items` | `Object` |
| `properties.readRoleAccess.items.type` | `string` |
| `properties.readRoleAccess.type` | `string` |
| `properties.requestLimiters` | `Object` |
| `properties.requestLimiters.additionalProperties` | `boolean` |
| `properties.requestLimiters.properties` | `Object` |
| `properties.requestLimiters.properties.condition` | `Object` |
| `properties.requestLimiters.properties.condition.enum` | `string`[] |
| `properties.requestLimiters.properties.condition.type` | `string` |
| `properties.requestLimiters.properties.createdBy` | `Object` |
| `properties.requestLimiters.properties.createdBy.type` | `string` |
| `properties.requestLimiters.properties.custom` | `Object` |
| `properties.requestLimiters.properties.custom.items` | `Object` |
| `properties.requestLimiters.properties.custom.items.type` | `string` |
| `properties.requestLimiters.properties.custom.type` | `string` |
| `properties.requestLimiters.properties.parenting` | `Object` |
| `properties.requestLimiters.properties.parenting.type` | `string` |
| `properties.requestLimiters.properties.since` | `Object` |
| `properties.requestLimiters.properties.since.type` | `string` |
| `properties.requestLimiters.required` | `string`[] |
| `properties.requestLimiters.type` | `string` |
| `properties.searchRoleAccess` | `Object` |
| `properties.searchRoleAccess.items` | `Object` |
| `properties.searchRoleAccess.items.type` | `string` |
| `properties.searchRoleAccess.type` | `string` |
| `properties.searchable` | `Object` |
| `properties.searchable.type` | `string` |
| `properties.type` | `Object` |
| `properties.type.const` | `string` |
| `required` | `string`[] |
| `type` | `string` |
