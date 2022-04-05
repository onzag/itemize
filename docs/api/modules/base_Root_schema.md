[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/schema

# Module: base/Root/schema

This file contains a json schema for the unprocessed form
of the root, this root schema is meant to be used in order to check
root json files

## Table of contents

### Properties

- [default](base_Root_schema.md#default)

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
| `properties.i18n` | `Object` |
| `properties.i18n.type` | `string` |
| `properties.type` | `Object` |
| `properties.type.const` | `string` |
| `required` | `string`[] |
| `type` | `string` |
