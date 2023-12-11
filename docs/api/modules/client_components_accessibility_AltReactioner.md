[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/accessibility/AltReactioner

# Module: client/components/accessibility/AltReactioner

The alt reactioner is an accessibility utility to be used to enable
accessibility to provide navigation using only the keyboard, this also
enables voice recognition software to use the application even for
users without hands

## Table of contents

### Namespaces

- [default](client_components_accessibility_AltReactioner.default.md)

### Classes

- [ActualAltBase](../classes/client_components_accessibility_AltReactioner.ActualAltBase.md)
- [ActualAltReactioner](../classes/client_components_accessibility_AltReactioner.ActualAltReactioner.md)

### Interfaces

- [IAltBaseProps](../interfaces/client_components_accessibility_AltReactioner.IAltBaseProps.md)
- [IAltReactionerProps](../interfaces/client_components_accessibility_AltReactioner.IAltReactionerProps.md)

### Functions

- [calculateLayereds](client_components_accessibility_AltReactioner.md#calculatelayereds)
- [default](client_components_accessibility_AltReactioner.md#default)
- [hideAll](client_components_accessibility_AltReactioner.md#hideall)
- [showLayereds](client_components_accessibility_AltReactioner.md#showlayereds)
- [toggleAlt](client_components_accessibility_AltReactioner.md#togglealt)
- [triggerAltCycle](client_components_accessibility_AltReactioner.md#triggeraltcycle)
- [triggerTabCycle](client_components_accessibility_AltReactioner.md#triggertabcycle)

## Functions

### calculateLayereds

▸ **calculateLayereds**(`priorityToUse`, `doNotShowHide`): [`ActualAltBase`](../classes/client_components_accessibility_AltReactioner.ActualAltBase.md)\<`any`, `any`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `priorityToUse` | `number` |
| `doNotShowHide` | `boolean` |

#### Returns

[`ActualAltBase`](../classes/client_components_accessibility_AltReactioner.ActualAltBase.md)\<`any`, `any`\>[]

#### Defined in

[client/components/accessibility/AltReactioner.tsx:372](https://github.com/onzag/itemize/blob/59702dd5/client/components/accessibility/AltReactioner.tsx#L372)

___

### default

▸ **default**(`props`): `ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\>

**NOTE**: Exotic components are not callable.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IAltReactionerProps`](../interfaces/client_components_accessibility_AltReactioner.IAltReactionerProps.md) & `RefAttributes`\<[`ActualAltReactioner`](../classes/client_components_accessibility_AltReactioner.ActualAltReactioner.md)\> |

#### Returns

`ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\>

#### Defined in

node_modules/@types/react/index.d.ts:354

___

### hideAll

▸ **hideAll**(`butKeycodes?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `butKeycodes` | [`ActualAltReactioner`](../classes/client_components_accessibility_AltReactioner.ActualAltReactioner.md)[] | `[]` |

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:271](https://github.com/onzag/itemize/blob/59702dd5/client/components/accessibility/AltReactioner.tsx#L271)

___

### showLayereds

▸ **showLayereds**(`priorityToUse`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `priorityToUse` | `number` |

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:431](https://github.com/onzag/itemize/blob/59702dd5/client/components/accessibility/AltReactioner.tsx#L431)

___

### toggleAlt

▸ **toggleAlt**(): `void`

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:779](https://github.com/onzag/itemize/blob/59702dd5/client/components/accessibility/AltReactioner.tsx#L779)

___

### triggerAltCycle

▸ **triggerAltCycle**(`tabNavigation`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tabNavigation` | `boolean` |

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1489](https://github.com/onzag/itemize/blob/59702dd5/client/components/accessibility/AltReactioner.tsx#L1489)

___

### triggerTabCycle

▸ **triggerTabCycle**(): `void`

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1516](https://github.com/onzag/itemize/blob/59702dd5/client/components/accessibility/AltReactioner.tsx#L1516)
