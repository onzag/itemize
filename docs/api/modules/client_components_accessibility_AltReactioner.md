[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/accessibility/AltReactioner

# Module: client/components/accessibility/AltReactioner

The alt reactioner is an accessibility utility to be used to enable
accessibility to provide navigation using only the keyboard, this also
enables voice recognition software to use the application even for
users without hands

## Table of contents

### Classes

- [ActualAltBase](../classes/client_components_accessibility_AltReactioner.ActualAltBase.md)
- [ActualAltReactioner](../classes/client_components_accessibility_AltReactioner.ActualAltReactioner.md)

### Interfaces

- [IAltBaseProps](../interfaces/client_components_accessibility_AltReactioner.IAltBaseProps.md)
- [IAltReactionerProps](../interfaces/client_components_accessibility_AltReactioner.IAltReactionerProps.md)

### Variables

- [default](client_components_accessibility_AltReactioner.md#default)

### Functions

- [calculateLayereds](client_components_accessibility_AltReactioner.md#calculatelayereds)
- [hideAll](client_components_accessibility_AltReactioner.md#hideall)
- [showLayereds](client_components_accessibility_AltReactioner.md#showlayereds)
- [toggleAlt](client_components_accessibility_AltReactioner.md#togglealt)

## Variables

### default

• **default**: `ForwardRefExoticComponent`<[`IAltReactionerProps`](../interfaces/client_components_accessibility_AltReactioner.IAltReactionerProps.md) & `RefAttributes`<[`ActualAltReactioner`](../classes/client_components_accessibility_AltReactioner.ActualAltReactioner.md)\>\>

#### Defined in

[client/components/accessibility/AltReactioner.tsx:1542](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L1542)

## Functions

### calculateLayereds

▸ **calculateLayereds**(`priorityToUse`, `doNotShowHide`): [`ActualAltBase`](../classes/client_components_accessibility_AltReactioner.ActualAltBase.md)<`any`, `any`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `priorityToUse` | `number` |
| `doNotShowHide` | `boolean` |

#### Returns

[`ActualAltBase`](../classes/client_components_accessibility_AltReactioner.ActualAltBase.md)<`any`, `any`\>[]

#### Defined in

[client/components/accessibility/AltReactioner.tsx:338](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L338)

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

[client/components/accessibility/AltReactioner.tsx:237](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L237)

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

[client/components/accessibility/AltReactioner.tsx:397](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L397)

___

### toggleAlt

▸ **toggleAlt**(): `void`

#### Returns

`void`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:744](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L744)
