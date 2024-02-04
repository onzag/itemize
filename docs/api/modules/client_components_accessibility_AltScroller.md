[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/accessibility/AltScroller

# Module: client/components/accessibility/AltScroller

## Table of contents

### Namespaces

- [default](client_components_accessibility_AltScroller.default.md)

### Classes

- [ActualAltScroller](../classes/client_components_accessibility_AltScroller.ActualAltScroller.md)

### Functions

- [default](client_components_accessibility_AltScroller.md#default)
- [getRelevant](client_components_accessibility_AltScroller.md#getrelevant)
- [hideAll](client_components_accessibility_AltScroller.md#hideall)
- [scrollCurrent](client_components_accessibility_AltScroller.md#scrollcurrent)
- [setScrollerBlockStatus](client_components_accessibility_AltScroller.md#setscrollerblockstatus)
- [showRelevant](client_components_accessibility_AltScroller.md#showrelevant)

## Functions

### default

▸ **default**(`props`): `ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\>

**NOTE**: Exotic components are not callable.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IAltScrollerProps` & `RefAttributes`\<[`ActualAltScroller`](../classes/client_components_accessibility_AltScroller.ActualAltScroller.md)\> |

#### Returns

`ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\>

#### Defined in

node_modules/@types/react/index.d.ts:354

___

### getRelevant

▸ **getRelevant**(): [`ActualAltScroller`](../classes/client_components_accessibility_AltScroller.ActualAltScroller.md)

#### Returns

[`ActualAltScroller`](../classes/client_components_accessibility_AltScroller.ActualAltScroller.md)

#### Defined in

[client/components/accessibility/AltScroller.tsx:123](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltScroller.tsx#L123)

___

### hideAll

▸ **hideAll**(): `void`

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltScroller.tsx:61](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltScroller.tsx#L61)

___

### scrollCurrent

▸ **scrollCurrent**(`dir`, `cb?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dir` | ``"left"`` \| ``"right"`` \| ``"down"`` \| ``"up"`` |
| `cb?` | () => `void` |

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltScroller.tsx:87](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltScroller.tsx#L87)

___

### setScrollerBlockStatus

▸ **setScrollerBlockStatus**(`status`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `status` | `boolean` |

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltScroller.tsx:79](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltScroller.tsx#L79)

___

### showRelevant

▸ **showRelevant**(): `void`

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltScroller.tsx:135](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltScroller.tsx#L135)
