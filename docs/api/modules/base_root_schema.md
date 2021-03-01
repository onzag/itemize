[](../README.md) / [Exports](../modules.md) / base/Root/schema

# Module: base/Root/schema

This file contains a json schema for the unprocessed form
of the root, this root schema is meant to be used in order to check
root json files

## Table of contents

### Properties

- [default](base_root_schema.md#default)

## Properties

### default

• **default**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`additionalProperties` | *boolean* |
`properties` | *object* |
`properties.children` | *object* |
`properties.children.items` | *object* |
`properties.children.items.type` | *string* |
`properties.children.minItems` | *number* |
`properties.children.type` | *string* |
`properties.i18n` | *object* |
`properties.i18n.type` | *string* |
`properties.type` | *object* |
`properties.type.const` | *string* |
`required` | *string*[] |
`type` | *string* |
