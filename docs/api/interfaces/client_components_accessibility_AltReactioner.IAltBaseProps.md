[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/accessibility/AltReactioner](../modules/client_components_accessibility_AltReactioner.md) / IAltBaseProps

# Interface: IAltBaseProps

[client/components/accessibility/AltReactioner](../modules/client_components_accessibility_AltReactioner.md).IAltBaseProps

## Hierarchy

- **`IAltBaseProps`**

  ↳ [`IAltReactionerProps`](client_components_accessibility_AltReactioner.IAltReactionerProps.md)

  ↳ [`IAltTextProps`](client_components_accessibility_AltText.IAltTextProps.md)

## Table of contents

### Properties

- [blocksQuickActionsWhileFocused](client_components_accessibility_AltReactioner.IAltBaseProps.md#blocksquickactionswhilefocused)
- [className](client_components_accessibility_AltReactioner.IAltBaseProps.md#classname)
- [component](client_components_accessibility_AltReactioner.IAltBaseProps.md#component)
- [componentGetElementFn](client_components_accessibility_AltReactioner.IAltBaseProps.md#componentgetelementfn)
- [componentProps](client_components_accessibility_AltReactioner.IAltBaseProps.md#componentprops)
- [disabled](client_components_accessibility_AltReactioner.IAltBaseProps.md#disabled)
- [hideAllIfUnmount](client_components_accessibility_AltReactioner.IAltBaseProps.md#hideallifunmount)
- [onTabOutTrigger](client_components_accessibility_AltReactioner.IAltBaseProps.md#ontabouttrigger)
- [priority](client_components_accessibility_AltReactioner.IAltBaseProps.md#priority)
- [tabAnchor](client_components_accessibility_AltReactioner.IAltBaseProps.md#tabanchor)
- [tabbable](client_components_accessibility_AltReactioner.IAltBaseProps.md#tabbable)
- [triggerAltAfterAction](client_components_accessibility_AltReactioner.IAltBaseProps.md#triggeraltafteraction)
- [triggerAltIfUnmountAndAltActive](client_components_accessibility_AltReactioner.IAltBaseProps.md#triggeraltifunmountandaltactive)
- [uncontrolled](client_components_accessibility_AltReactioner.IAltBaseProps.md#uncontrolled)
- [useInFlow](client_components_accessibility_AltReactioner.IAltBaseProps.md#useinflow)

## Properties

### blocksQuickActionsWhileFocused

• `Optional` **blocksQuickActionsWhileFocused**: `boolean`

Normally this is unnecessary to set, basically whenever the element is focused
all other element quick actions are not allowed to execute

however this does not apply if tab isn't pressed

this is basically the default for input fields and textareas

#### Defined in

[client/components/accessibility/AltReactioner.tsx:84](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L84)

___

### className

• `Optional` **className**: `string`

A class name to use in such component

#### Defined in

[client/components/accessibility/AltReactioner.tsx:31](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L31)

___

### component

• `Optional` **component**: `any`

The wrapping component to use, by default it will use a div

#### Defined in

[client/components/accessibility/AltReactioner.tsx:18](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L18)

___

### componentGetElementFn

• `Optional` **componentGetElementFn**: `string`

how to get the element from the component
use this as a string

#### Defined in

[client/components/accessibility/AltReactioner.tsx:27](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L27)

___

### componentProps

• `Optional` **componentProps**: `any`

Props to pass to the component

#### Defined in

[client/components/accessibility/AltReactioner.tsx:22](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L22)

___

### disabled

• `Optional` **disabled**: `boolean`

whether it is currently disabled

#### Defined in

[client/components/accessibility/AltReactioner.tsx:35](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L35)

___

### hideAllIfUnmount

• `Optional` **hideAllIfUnmount**: `boolean`

Sone elements may unmount and not get called, eg. if some other element
caused it to unmount, the alt may remain in a triggered state without
realizing nothing anymore is visible

very useful for dialogs for example that may get closed by outside actions

#### Defined in

[client/components/accessibility/AltReactioner.tsx:71](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L71)

___

### onTabOutTrigger

• `Optional` **onTabOutTrigger**: `string`

When an element is tabbed but it is not part of the current flow but it kept its focus while being in another
layer, use this to select which reaction key would you like to trigger from the current active flow

#### Defined in

[client/components/accessibility/AltReactioner.tsx:105](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L105)

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

#### Defined in

[client/components/accessibility/AltReactioner.tsx:48](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L48)

___

### tabAnchor

• `Optional` **tabAnchor**: `boolean`

When using alt+gr tab and shift alt+gr tab it will move quickly between
anchors

#### Defined in

[client/components/accessibility/AltReactioner.tsx:63](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L63)

___

### tabbable

• `Optional` **tabbable**: `boolean`

when you press the tab button and want to wrap around
elements, use this to specify whether the component is tabbable
and can be focused via the tab key

#### Defined in

[client/components/accessibility/AltReactioner.tsx:58](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L58)

___

### triggerAltAfterAction

• `Optional` **triggerAltAfterAction**: `boolean`

will trigger a new input reaction after it has been completed

#### Defined in

[client/components/accessibility/AltReactioner.tsx:52](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L52)

___

### triggerAltIfUnmountAndAltActive

• `Optional` **triggerAltIfUnmountAndAltActive**: `boolean`

plays with hideAllIfUnmount to trigger an action whenever it's unmounted

#### Defined in

[client/components/accessibility/AltReactioner.tsx:75](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L75)

___

### uncontrolled

• `Optional` **uncontrolled**: `boolean`

Once this element is focused it will go into an uncontrolled state
on the next tab forwards or backwards and control will only be regained once
an element that is part of either the active flow, active layer, or awaiting key codes
for example, let's say you have an embbed youtube video in its own iframe, you can wrap the video
on a div that is AltText that is uncontrolled, with an aria-label of youtube video, once that element
is focused, the alt is set in an uncontrolled state, and it will stop deciding what's next tabbed

#### Defined in

[client/components/accessibility/AltReactioner.tsx:99](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L99)

___

### useInFlow

• `Optional` **useInFlow**: `boolean`

whether it is used in flow

#### Defined in

[client/components/accessibility/AltReactioner.tsx:89](https://github.com/onzag/itemize/blob/f2db74a5/client/components/accessibility/AltReactioner.tsx#L89)
