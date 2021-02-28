[](../README.md) / [Exports](../modules.md) / builder/schema-checks

# Module: builder/schema-checks

This file specifies how schema checks are ran against json sources
in order to validate schemas using ajv

## Table of contents

### Variables

- [checkConfig](builder_schema_checks.md#checkconfig)
- [checkDBConfig](builder_schema_checks.md#checkdbconfig)
- [checkDumpConfig](builder_schema_checks.md#checkdumpconfig)
- [checkItemDefinitionSchemaValidate](builder_schema_checks.md#checkitemdefinitionschemavalidate)
- [checkModuleSchemaValidate](builder_schema_checks.md#checkmoduleschemavalidate)
- [checkPropertyDefinitionArraySchemaValidate](builder_schema_checks.md#checkpropertydefinitionarrayschemavalidate)
- [checkRedisConfig](builder_schema_checks.md#checkredisconfig)
- [checkRootSchemaValidate](builder_schema_checks.md#checkrootschemavalidate)
- [checkSensitiveConfig](builder_schema_checks.md#checksensitiveconfig)
- [checkSpecialPropertyValueSetSchemaValidate](builder_schema_checks.md#checkspecialpropertyvaluesetschemavalidate)

### Functions

- [ajvCheck](builder_schema_checks.md#ajvcheck)

## Variables

### checkConfig

• `Const` **checkConfig**: ValidateFunction

Check the partial config (non-sensitive)

Defined in: [builder/schema-checks.ts:62](https://github.com/onzag/itemize/blob/11a98dec/builder/schema-checks.ts#L62)

___

### checkDBConfig

• `Const` **checkDBConfig**: ValidateFunction

Check raw database config

Defined in: [builder/schema-checks.ts:68](https://github.com/onzag/itemize/blob/11a98dec/builder/schema-checks.ts#L68)

___

### checkDumpConfig

• `Const` **checkDumpConfig**: ValidateFunction

Check raw dump config

Defined in: [builder/schema-checks.ts:74](https://github.com/onzag/itemize/blob/11a98dec/builder/schema-checks.ts#L74)

___

### checkItemDefinitionSchemaValidate

• `Const` **checkItemDefinitionSchemaValidate**: ValidateFunction

Checks an item definition schema

Defined in: [builder/schema-checks.ts:30](https://github.com/onzag/itemize/blob/11a98dec/builder/schema-checks.ts#L30)

___

### checkModuleSchemaValidate

• `Const` **checkModuleSchemaValidate**: ValidateFunction

Checks a module

Defined in: [builder/schema-checks.ts:50](https://github.com/onzag/itemize/blob/11a98dec/builder/schema-checks.ts#L50)

___

### checkPropertyDefinitionArraySchemaValidate

• `Const` **checkPropertyDefinitionArraySchemaValidate**: ValidateFunction

Checks a property definition array schema

Defined in: [builder/schema-checks.ts:36](https://github.com/onzag/itemize/blob/11a98dec/builder/schema-checks.ts#L36)

___

### checkRedisConfig

• `Const` **checkRedisConfig**: ValidateFunction

Check redis config

Defined in: [builder/schema-checks.ts:80](https://github.com/onzag/itemize/blob/11a98dec/builder/schema-checks.ts#L80)

___

### checkRootSchemaValidate

• `Const` **checkRootSchemaValidate**: ValidateFunction

Checks a root schema

Defined in: [builder/schema-checks.ts:24](https://github.com/onzag/itemize/blob/11a98dec/builder/schema-checks.ts#L24)

___

### checkSensitiveConfig

• `Const` **checkSensitiveConfig**: ValidateFunction

Check the partial sensitive configuration

Defined in: [builder/schema-checks.ts:56](https://github.com/onzag/itemize/blob/11a98dec/builder/schema-checks.ts#L56)

___

### checkSpecialPropertyValueSetSchemaValidate

• `Const` **checkSpecialPropertyValueSetSchemaValidate**: ValidateFunction

Defined in: [builder/schema-checks.ts:44](https://github.com/onzag/itemize/blob/11a98dec/builder/schema-checks.ts#L44)

## Functions

### ajvCheck

▸ **ajvCheck**(`fn`: Ajv.ValidateFunction, `rawData`: *any*, `traceback`: [*default*](../classes/builder_traceback.default.md)): *void*

Runs a given ajv check function of the ones avaliable
in this list against a schema and ensures to populate traceback
values

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`fn` | Ajv.ValidateFunction | the function to run   |
`rawData` | *any* | the raw data to validate against   |
`traceback` | [*default*](../classes/builder_traceback.default.md) | the traceback to throw errors to    |

**Returns:** *void*

Defined in: [builder/schema-checks.ts:91](https://github.com/onzag/itemize/blob/11a98dec/builder/schema-checks.ts#L91)
