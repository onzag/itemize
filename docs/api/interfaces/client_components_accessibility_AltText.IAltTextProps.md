[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/accessibility/AltText](../modules/client_components_accessibility_AltText.md) / IAltTextProps

# Interface: IAltTextProps

[client/components/accessibility/AltText](../modules/client_components_accessibility_AltText.md).IAltTextProps

## Hierarchy

- [`IAltBaseProps`](client_components_accessibility_AltReactioner.IAltBaseProps.md)

  ↳ **`IAltTextProps`**

## Table of contents

### Properties

- [blocksQuickActionsWhileFocused](client_components_accessibility_AltText.IAltTextProps.md#blocksquickactionswhilefocused)
- [children](client_components_accessibility_AltText.IAltTextProps.md#children)
- [className](client_components_accessibility_AltText.IAltTextProps.md#classname)
- [component](client_components_accessibility_AltText.IAltTextProps.md#component)
- [componentGetElementFn](client_components_accessibility_AltText.IAltTextProps.md#componentgetelementfn)
- [componentProps](client_components_accessibility_AltText.IAltTextProps.md#componentprops)
- [describedBy](client_components_accessibility_AltText.IAltTextProps.md#describedby)
- [description](client_components_accessibility_AltText.IAltTextProps.md#description)
- [disabled](client_components_accessibility_AltText.IAltTextProps.md#disabled)
- [hideAllIfUnmount](client_components_accessibility_AltText.IAltTextProps.md#hideallifunmount)
- [label](client_components_accessibility_AltText.IAltTextProps.md#label)
- [labelledBy](client_components_accessibility_AltText.IAltTextProps.md#labelledby)
- [lang](client_components_accessibility_AltText.IAltTextProps.md#lang)
- [onTabOutTrigger](client_components_accessibility_AltText.IAltTextProps.md#ontabouttrigger)
- [priority](client_components_accessibility_AltText.IAltTextProps.md#priority)
- [tabAnchor](client_components_accessibility_AltText.IAltTextProps.md#tabanchor)
- [tabbable](client_components_accessibility_AltText.IAltTextProps.md#tabbable)
- [triggerAltAfterAction](client_components_accessibility_AltText.IAltTextProps.md#triggeraltafteraction)
- [triggerAltIfUnmountAndAltActive](client_components_accessibility_AltText.IAltTextProps.md#triggeraltifunmountandaltactive)
- [uncontrolled](client_components_accessibility_AltText.IAltTextProps.md#uncontrolled)
- [uncontrolledSelector](client_components_accessibility_AltText.IAltTextProps.md#uncontrolledselector)
- [useInFlow](client_components_accessibility_AltText.IAltTextProps.md#useinflow)

### Methods

- [onActionTriggered](client_components_accessibility_AltText.IAltTextProps.md#onactiontriggered)

## Properties

### blocksQuickActionsWhileFocused

• `Optional` **blocksQuickActionsWhileFocused**: `boolean`

Normally this is unnecessary to set, basically whenever the element is focused
all other element quick actions are not allowed to execute

however this does not apply if tab isn't pressed

this is basically the default for input fields and textareas

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[blocksQuickActionsWhileFocused](client_components_accessibility_AltReactioner.IAltBaseProps.md#blocksquickactionswhilefocused)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:88](https://github.com/onzag/itemize/blob/a24376ed/client/components/accessibility/AltReactioner.tsx#L88)

___

### children

• `Optional` **children**: `ReactNode`

The children that should be read

#### Defined in

[client/components/accessibility/AltText.tsx:13](https://github.com/onzag/itemize/blob/a24376ed/client/components/accessibility/AltText.tsx#L13)

___

### className

• `Optional` **className**: `string`

A class name to use in such component

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[className](client_components_accessibility_AltReactioner.IAltBaseProps.md#classname)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:31](https://github.com/onzag/itemize/blob/a24376ed/client/components/accessibility/AltReactioner.tsx#L31)

___

### component

• `Optional` **component**: `any`

The wrapping component to use, by default it will use a div

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[component](client_components_accessibility_AltReactioner.IAltBaseProps.md#component)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:18](https://github.com/onzag/itemize/blob/a24376ed/client/components/accessibility/AltReactioner.tsx#L18)

___

### componentGetElementFn

• `Optional` **componentGetElementFn**: `string`

how to get the element from the component
use this as a string

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[componentGetElementFn](client_components_accessibility_AltReactioner.IAltBaseProps.md#componentgetelementfn)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:27](https://github.com/onzag/itemize/blob/a24376ed/client/components/accessibility/AltReactioner.tsx#L27)

___

### componentProps

• `Optional` **componentProps**: `any`

Props to pass to the component

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[componentProps](client_components_accessibility_AltReactioner.IAltBaseProps.md#componentprops)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:22](https://github.com/onzag/itemize/blob/a24376ed/client/components/accessibility/AltReactioner.tsx#L22)

___

### describedBy

• `Optional` **describedBy**: `string`

An aria-describedby by value

#### Defined in

[client/components/accessibility/AltText.tsx:33](https://github.com/onzag/itemize/blob/a24376ed/client/components/accessibility/AltText.tsx#L33)

___

### description

• `Optional` **description**: `string`

aria-description

#### Defined in

[client/components/accessibility/AltText.tsx:23](https://github.com/onzag/itemize/blob/a24376ed/client/components/accessibility/AltText.tsx#L23)

___

### disabled

• `Optional` **disabled**: `boolean`

whether it is currently disabled

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[disabled](client_components_accessibility_AltReactioner.IAltBaseProps.md#disabled)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:35](https://github.com/onzag/itemize/blob/a24376ed/client/components/accessibility/AltReactioner.tsx#L35)

___

### hideAllIfUnmount

• `Optional` **hideAllIfUnmount**: `boolean`

Sone elements may unmount and not get called, eg. if some other element
caused it to unmount, the alt may remain in a triggered state without
realizing nothing anymore is visible

very useful for dialogs for example that may get closed by outside actions

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[hideAllIfUnmount](client_components_accessibility_AltReactioner.IAltBaseProps.md#hideallifunmount)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:75](https://github.com/onzag/itemize/blob/a24376ed/client/components/accessibility/AltReactioner.tsx#L75)

___

### label

• `Optional` **label**: `string`

aria-label

#### Defined in

[client/components/accessibility/AltText.tsx:18](https://github.com/onzag/itemize/blob/a24376ed/client/components/accessibility/AltText.tsx#L18)

___

### labelledBy

• `Optional` **labelledBy**: `string`

aria-labelledby

#### Defined in

[client/components/accessibility/AltText.tsx:28](https://github.com/onzag/itemize/blob/a24376ed/client/components/accessibility/AltText.tsx#L28)

___

### lang

• `Optional` **lang**: `string`

Language override

#### Overrides

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[lang](client_components_accessibility_AltReactioner.IAltBaseProps.md#lang)

#### Defined in

[client/components/accessibility/AltText.tsx:38](https://github.com/onzag/itemize/blob/a24376ed/client/components/accessibility/AltText.tsx#L38)

___

### onTabOutTrigger

• `Optional` **onTabOutTrigger**: `string`

When an element is tabbed but it is not part of the current flow but it kept its focus while being in another
layer, use this to select which reaction key would you like to trigger from the current active flow

#### Overrides

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[onTabOutTrigger](client_components_accessibility_AltReactioner.IAltBaseProps.md#ontabouttrigger)

#### Defined in

[client/components/accessibility/AltText.tsx:44](https://github.com/onzag/itemize/blob/a24376ed/client/components/accessibility/AltText.tsx#L44)

___

### priority

• `Optional` **priority**: `number` \| ``"ALWAYS_ON_TOP"`` \| ``"ALWAYS_ON_TOP_KEEP_FLOW"``

The priority by default 0, for example, let's say there's an element like a toolbar that is to be
used only when a certain element is focused, when such element is focused the alt reactioners
may have priority 1, and none of the priority 0 elements will display, of course, this is only
usable if you use it in conjuction with disabled

ALWAYS_ON_TOP makes it so that the element's priority is the same as the maximum one available
so it's technically visible on all priorities

ALWAYS_ON_TOP_KEEP_FLOW makes it so that the element priority is the same as the maximum one available
but for elements that are as useInFlow pressing tab on it will figure the next available flow element

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[priority](client_components_accessibility_AltReactioner.IAltBaseProps.md#priority)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:48](https://github.com/onzag/itemize/blob/a24376ed/client/components/accessibility/AltReactioner.tsx#L48)

___

### tabAnchor

• `Optional` **tabAnchor**: `boolean`

When using alt+gr tab and shift alt+gr tab it will move quickly between
anchors

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[tabAnchor](client_components_accessibility_AltReactioner.IAltBaseProps.md#tabanchor)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:67](https://github.com/onzag/itemize/blob/a24376ed/client/components/accessibility/AltReactioner.tsx#L67)

___

### tabbable

• `Optional` **tabbable**: `boolean`

when you press the tab button and want to wrap around
elements, use this to specify whether the component is tabbable
and can be focused via the tab key

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[tabbable](client_components_accessibility_AltReactioner.IAltBaseProps.md#tabbable)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:62](https://github.com/onzag/itemize/blob/a24376ed/client/components/accessibility/AltReactioner.tsx#L62)

___

### triggerAltAfterAction

• `Optional` **triggerAltAfterAction**: `boolean`

will trigger a new input reaction after it has been completed

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[triggerAltAfterAction](client_components_accessibility_AltReactioner.IAltBaseProps.md#triggeraltafteraction)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:52](https://github.com/onzag/itemize/blob/a24376ed/client/components/accessibility/AltReactioner.tsx#L52)

___

### triggerAltIfUnmountAndAltActive

• `Optional` **triggerAltIfUnmountAndAltActive**: `boolean`

plays with hideAllIfUnmount to trigger an action whenever it's unmounted

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[triggerAltIfUnmountAndAltActive](client_components_accessibility_AltReactioner.IAltBaseProps.md#triggeraltifunmountandaltactive)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:79](https://github.com/onzag/itemize/blob/a24376ed/client/components/accessibility/AltReactioner.tsx#L79)

___

### uncontrolled

• `Optional` **uncontrolled**: `boolean`

Once this element is focused it will go into an uncontrolled state
on the next tab forwards or backwards and control will only be regained once
an element that is part of either the active flow, active layer, or awaiting key codes
for example, let's say you have an embbed youtube video in its own iframe, you can wrap the video
on a div that is AltText that is uncontrolled, with an aria-label of youtube video, once that element
is focused, the alt is set in an uncontrolled state, and it will stop deciding what's next tabbed

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[uncontrolled](client_components_accessibility_AltReactioner.IAltBaseProps.md#uncontrolled)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:103](https://github.com/onzag/itemize/blob/a24376ed/client/components/accessibility/AltReactioner.tsx#L103)

___

### uncontrolledSelector

• `Optional` **uncontrolledSelector**: `string`

the default is "*[tabindex],button:not(:disabled),input:not(:disabled),a[href],iframe:not(:disabled)"
determines what should be selected inside an uncontrolled container, it will pick it from below or above
depending on selection style

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[uncontrolledSelector](client_components_accessibility_AltReactioner.IAltBaseProps.md#uncontrolledselector)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:110](https://github.com/onzag/itemize/blob/a24376ed/client/components/accessibility/AltReactioner.tsx#L110)

___

### useInFlow

• `Optional` **useInFlow**: `boolean`

whether it is used in flow, for text the default is true

#### Overrides

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[useInFlow](client_components_accessibility_AltReactioner.IAltBaseProps.md#useinflow)

#### Defined in

[client/components/accessibility/AltText.tsx:9](https://github.com/onzag/itemize/blob/a24376ed/client/components/accessibility/AltText.tsx#L9)

## Methods

### onActionTriggered

▸ `Optional` **onActionTriggered**(`tabNavigating`, `action`): `void`

Triggers when the action triggers

#### Parameters

| Name | Type |
| :------ | :------ |
| `tabNavigating` | `boolean` |
| `action` | ``"click"`` \| ``"focus"`` \| ``"blur"`` |

#### Returns

`void`

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[onActionTriggered](client_components_accessibility_AltReactioner.IAltBaseProps.md#onactiontriggered)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:56](https://github.com/onzag/itemize/blob/a24376ed/client/components/accessibility/AltReactioner.tsx#L56)
