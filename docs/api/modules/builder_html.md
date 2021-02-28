[](../README.md) / [Exports](../modules.md) / builder/html

# Module: builder/html

Builds the HTML file that is used as the index entry for the itemize
application

## Table of contents

### Functions

- [buildHTML](builder_html.md#buildhtml)

## Functions

### buildHTML

▸ **buildHTML**(`rawConfig`: [*IBuilderBasicConfigType*](../interfaces/builder_config.ibuilderbasicconfigtype.md)): *Promise*<void\>

Builds and stores the html file in the dist directory from the source
for the itemize app, this file also makes for the buildnumber as the buildnumber
is synchronized within the html file

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rawConfig` | [*IBuilderBasicConfigType*](../interfaces/builder_config.ibuilderbasicconfigtype.md) | the configuration that is being used    |

**Returns:** *Promise*<void\>

Defined in: [builder/html.ts:61](https://github.com/onzag/itemize/blob/11a98dec/builder/html.ts#L61)
