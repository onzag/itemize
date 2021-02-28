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

Defined in: [base/Root/index.ts:91](https://github.com/onzag/itemize/blob/11a98dec/base/Root/index.ts#L91)

___

### i18nData

• **i18nData**: [*Ii18NType*](base_root.ii18ntype.md)

The i18n information that comes from the properties file

Defined in: [base/Root/index.ts:85](https://github.com/onzag/itemize/blob/11a98dec/base/Root/index.ts#L85)

___

### location

• `Optional` **location**: *string*

Exists during the building process and represents the file location
it is stripped after processing

Defined in: [base/Root/index.ts:70](https://github.com/onzag/itemize/blob/11a98dec/base/Root/index.ts#L70)

___

### pointers

• `Optional` **pointers**: *any*

Also exists during the building process only and it's the pointers
that are used for tracebacks

Defined in: [base/Root/index.ts:75](https://github.com/onzag/itemize/blob/11a98dec/base/Root/index.ts#L75)

___

### raw

• `Optional` **raw**: *string*

The raw content of the file itself, as a plain string, it's stripped
after processing

Defined in: [base/Root/index.ts:80](https://github.com/onzag/itemize/blob/11a98dec/base/Root/index.ts#L80)

___

### type

• **type**: *root*

The type is always root

Defined in: [base/Root/index.ts:64](https://github.com/onzag/itemize/blob/11a98dec/base/Root/index.ts#L64)
