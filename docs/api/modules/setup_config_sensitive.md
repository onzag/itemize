[](../README.md) / [Exports](../modules.md) / setup/config/sensitive

# Module: setup/config/sensitive

Allows to set up a sensitive configuration information

## Table of contents

### Functions

- [sensitiveConfigSetup](setup_config_sensitive.md#sensitiveconfigsetup)

## Functions

### sensitiveConfigSetup

▸ **sensitiveConfigSetup**(`version`: *string*, `currentConfig`: [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md), `referenceConfig`: [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md)): *Promise*<[*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md)\>

Allows for setting up the senstive configuration

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`version` | *string* | development of production   |
`currentConfig` | [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md) | the currently stored config   |
`referenceConfig` | [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md) | the reference configuration to use values against    |

**Returns:** *Promise*<[*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md)\>

Defined in: [setup/config/sensitive.ts:33](https://github.com/onzag/itemize/blob/11a98dec/setup/config/sensitive.ts#L33)
