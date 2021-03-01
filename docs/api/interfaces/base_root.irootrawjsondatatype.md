[](../README.md) / [Exports](../modules.md) / [base/Root](../modules/base_root.md) / IRootRawJSONDataType

# Interface: IRootRawJSONDataType

[base/Root](../modules/base_root.md).IRootRawJSONDataType

This is the raw processed form of the root

## Table of contents

### Properties

- [children](base_root.irootrawjsondatatype.md#children)
- [i18nData](base_root.irootrawjsondatatype.md#i18ndata)
- [location](base_root.irootrawjsondatatype.md#location)
- [pointers](base_root.irootrawjsondatatype.md#pointers)
- [raw](base_root.irootrawjsondatatype.md#raw)
- [type](base_root.irootrawjsondatatype.md#type)

## Properties

### children

• **children**: [*IModuleRawJSONDataType*](base_root_module.imodulerawjsondatatype.md)[]

All the modules contained within the root it is added after
the build

Defined in: [base/Root/index.ts:95](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/index.ts#L95)

___

### i18nData

• **i18nData**: [*Ii18NType*](base_root.ii18ntype.md)

The i18n information that comes from the properties file

Defined in: [base/Root/index.ts:89](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/index.ts#L89)

___

### location

• `Optional` **location**: *string*

Exists during the building process and represents the file location
it is stripped after processing

Defined in: [base/Root/index.ts:74](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/index.ts#L74)

___

### pointers

• `Optional` **pointers**: *any*

Also exists during the building process only and it's the pointers
that are used for tracebacks

Defined in: [base/Root/index.ts:79](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/index.ts#L79)

___

### raw

• `Optional` **raw**: *string*

The raw content of the file itself, as a plain string, it's stripped
after processing

Defined in: [base/Root/index.ts:84](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/index.ts#L84)

___

### type

• **type**: *root*

The type is always root

Defined in: [base/Root/index.ts:68](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/index.ts#L68)
