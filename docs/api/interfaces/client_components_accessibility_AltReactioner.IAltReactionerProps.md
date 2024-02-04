[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/accessibility/AltReactioner](../modules/client_components_accessibility_AltReactioner.md) / IAltReactionerProps

# Interface: IAltReactionerProps

[client/components/accessibility/AltReactioner](../modules/client_components_accessibility_AltReactioner.md).IAltReactionerProps

## Hierarchy

- [`IAltBaseProps`](client_components_accessibility_AltReactioner.IAltBaseProps.md)

  ↳ **`IAltReactionerProps`**

## Table of contents

### Properties

- [action](client_components_accessibility_AltReactioner.IAltReactionerProps.md#action)
- [blocksQuickActionsWhileFocused](client_components_accessibility_AltReactioner.IAltReactionerProps.md#blocksquickactionswhilefocused)
- [children](client_components_accessibility_AltReactioner.IAltReactionerProps.md#children)
- [className](client_components_accessibility_AltReactioner.IAltReactionerProps.md#classname)
- [component](client_components_accessibility_AltReactioner.IAltReactionerProps.md#component)
- [componentGetElementFn](client_components_accessibility_AltReactioner.IAltReactionerProps.md#componentgetelementfn)
- [componentProps](client_components_accessibility_AltReactioner.IAltReactionerProps.md#componentprops)
- [consumeEnterAndSpace](client_components_accessibility_AltReactioner.IAltReactionerProps.md#consumeenterandspace)
- [disabled](client_components_accessibility_AltReactioner.IAltReactionerProps.md#disabled)
- [focusOptions](client_components_accessibility_AltReactioner.IAltReactionerProps.md#focusoptions)
- [hideAllIfUnmount](client_components_accessibility_AltReactioner.IAltReactionerProps.md#hideallifunmount)
- [lang](client_components_accessibility_AltReactioner.IAltReactionerProps.md#lang)
- [onActionTriggered](client_components_accessibility_AltReactioner.IAltReactionerProps.md#onactiontriggered)
- [onAmbiguousClear](client_components_accessibility_AltReactioner.IAltReactionerProps.md#onambiguousclear)
- [onAmbiguousReaction](client_components_accessibility_AltReactioner.IAltReactionerProps.md#onambiguousreaction)
- [onDisplay](client_components_accessibility_AltReactioner.IAltReactionerProps.md#ondisplay)
- [onHide](client_components_accessibility_AltReactioner.IAltReactionerProps.md#onhide)
- [onTabOutTrigger](client_components_accessibility_AltReactioner.IAltReactionerProps.md#ontabouttrigger)
- [priority](client_components_accessibility_AltReactioner.IAltReactionerProps.md#priority)
- [reactionKey](client_components_accessibility_AltReactioner.IAltReactionerProps.md#reactionkey)
- [selector](client_components_accessibility_AltReactioner.IAltReactionerProps.md#selector)
- [selectorGoUp](client_components_accessibility_AltReactioner.IAltReactionerProps.md#selectorgoup)
- [tabAnchor](client_components_accessibility_AltReactioner.IAltReactionerProps.md#tabanchor)
- [tabbable](client_components_accessibility_AltReactioner.IAltReactionerProps.md#tabbable)
- [triggerAltAfterAction](client_components_accessibility_AltReactioner.IAltReactionerProps.md#triggeraltafteraction)
- [triggerAltIfUnmountAndAltActive](client_components_accessibility_AltReactioner.IAltReactionerProps.md#triggeraltifunmountandaltactive)
- [uncontrolled](client_components_accessibility_AltReactioner.IAltReactionerProps.md#uncontrolled)
- [uncontrolledSelector](client_components_accessibility_AltReactioner.IAltReactionerProps.md#uncontrolledselector)
- [useInFlow](client_components_accessibility_AltReactioner.IAltReactionerProps.md#useinflow)

## Properties

### action

• `Optional` **action**: ``"focus"`` \| ``"click"``

The action to be executed, by default it will click the component, other actions are focus
otherwise pass a function for a custom action

focus will focus the element
click will click the element

#### Defined in

[client/components/accessibility/AltReactioner.tsx:179](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L179)

___

### blocksQuickActionsWhileFocused

• `Optional` **blocksQuickActionsWhileFocused**: `boolean`

Normally this is unnecessary to set, basically whenever the element is focused
all other element quick actions are not allowed to execute

however this does not apply if tab isn't pressed

this is basically the default for input fields and textareas

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[blocksQuickActionsWhileFocused](client_components_accessibility_AltReactioner.IAltBaseProps.md#blocksquickactionswhilefocused)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:88](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L88)

___

### children

• **children**: (`displayed`: `boolean`, `blocked`: `boolean`) => `ReactNode`

#### Type declaration

▸ (`displayed`, `blocked`): `ReactNode`

The children that is to be rendered inside

##### Parameters

| Name | Type |
| :------ | :------ |
| `displayed` | `boolean` |
| `blocked` | `boolean` |

##### Returns

`ReactNode`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:146](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L146)

___

### className

• `Optional` **className**: `string`

A class name to use in such component

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[className](client_components_accessibility_AltReactioner.IAltBaseProps.md#classname)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:31](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L31)

___

### component

• `Optional` **component**: `any`

The wrapping component to use, by default it will use a div

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[component](client_components_accessibility_AltReactioner.IAltBaseProps.md#component)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:18](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L18)

___

### componentGetElementFn

• `Optional` **componentGetElementFn**: `string`

how to get the element from the component
use this as a string

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[componentGetElementFn](client_components_accessibility_AltReactioner.IAltBaseProps.md#componentgetelementfn)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:27](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L27)

___

### componentProps

• `Optional` **componentProps**: `any`

Props to pass to the component

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[componentProps](client_components_accessibility_AltReactioner.IAltBaseProps.md#componentprops)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:22](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L22)

___

### consumeEnterAndSpace

• `Optional` **consumeEnterAndSpace**: `boolean`

By default enter and space when executed will simply pipe to the application
unless the action=click by setting consumeEnterAndSpace=true even elements with
action=focus will trigger the action in question (aka it will attempt to focus again)
and then it will trigger onActionTriggered as if the reactioner had executed it

when the action is focus and one tabs in, onActionTriggered does not get called because
it wasn't focus by the actioner, but rather by tabbing, this allows to make it
trigger again by using enter and/or space

#### Defined in

[client/components/accessibility/AltReactioner.tsx:216](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L216)

___

### disabled

• `Optional` **disabled**: `boolean`

whether it is currently disabled

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[disabled](client_components_accessibility_AltReactioner.IAltBaseProps.md#disabled)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:35](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L35)

___

### focusOptions

• `Optional` **focusOptions**: `Object`

Options for the focus action when triggered via keyboard

#### Type declaration

| Name | Type |
| :------ | :------ |
| `blurIfAlreadyFocused?` | ``"ALWAYS"`` \| ``"ONLY_IF_NOT_DISPLAYING_ACTIONS"`` |

#### Defined in

[client/components/accessibility/AltReactioner.tsx:183](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L183)

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

[client/components/accessibility/AltReactioner.tsx:75](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L75)

___

### lang

• `Optional` **lang**: `string`

Language override

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[lang](client_components_accessibility_AltReactioner.IAltBaseProps.md#lang)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:121](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L121)

___

### onActionTriggered

• `Optional` **onActionTriggered**: (`tabNavigating`: `boolean`, `action`: ``"blur"`` \| ``"focus"`` \| ``"click"``) => `void`

#### Type declaration

▸ (`tabNavigating`, `action`): `void`

Triggers when the action triggers

##### Parameters

| Name | Type |
| :------ | :------ |
| `tabNavigating` | `boolean` |
| `action` | ``"blur"`` \| ``"focus"`` \| ``"click"`` |

##### Returns

`void`

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[onActionTriggered](client_components_accessibility_AltReactioner.IAltBaseProps.md#onactiontriggered)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:56](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L56)

___

### onAmbiguousClear

• **onAmbiguousClear**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:204](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L204)

___

### onAmbiguousReaction

• **onAmbiguousReaction**: (`isExpected`: `boolean`, `id`: `number`, `plusCount`: `number`) => `void`

#### Type declaration

▸ (`isExpected`, `id`, `plusCount`): `void`

Triggers when two reactions with the same id are found
and provides a numeric id that represents the next number caught
which shall be from 1 to 9

the pluscount is a modifier represented by the + sign that specifies
the need to press that key in order to get towards that option group

higher numbers are possible but represent an accessibility flaw and cannot
truly be accessed

##### Parameters

| Name | Type |
| :------ | :------ |
| `isExpected` | `boolean` |
| `id` | `number` |
| `plusCount` | `number` |

##### Returns

`void`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:203](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L203)

___

### onDisplay

• `Optional` **onDisplay**: () => `void`

#### Type declaration

▸ (): `void`

Triggers when alt has been triggered

note that this triggers before the state changes to displayed

##### Returns

`void`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:223](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L223)

___

### onHide

• `Optional` **onHide**: () => `void`

#### Type declaration

▸ (): `void`

Triggers when hidden

note that this triggers befoe the state changes to hidden

##### Returns

`void`

#### Defined in

[client/components/accessibility/AltReactioner.tsx:229](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L229)

___

### onTabOutTrigger

• `Optional` **onTabOutTrigger**: `string`

When an element is tabbed but it is not part of the current flow but it kept its focus while being in another
layer, use this to select which reaction key would you like to trigger from the current active flow

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[onTabOutTrigger](client_components_accessibility_AltReactioner.IAltBaseProps.md#ontabouttrigger)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:116](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L116)

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

[client/components/accessibility/AltReactioner.tsx:48](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L48)

___

### reactionKey

• `Optional` **reactionKey**: `string`

The key to be used that will trigger the specific action,
please use keycodes in lowercase, they need to be lowercase

avoid using arrowup, arrowright, arrowleft or arrowdown as they are used
by the AltReactioner component

#### Defined in

[client/components/accessibility/AltReactioner.tsx:171](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L171)

___

### selector

• `Optional` **selector**: `string` \| `string`[]

a css selector to choose the component that is relevant that the
user is supposed to interact with, by default it will simply pick the element itself
as its first child node

if provided an array it will try until one matches

#### Defined in

[client/components/accessibility/AltReactioner.tsx:154](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L154)

___

### selectorGoUp

• `Optional` **selectorGoUp**: `string` \| `number`

how many times to go up in the parent node before selecting, rather than selecting
the current element

if it's a string it will use closest

requires not be a text type and have a reactionKey

#### Defined in

[client/components/accessibility/AltReactioner.tsx:163](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L163)

___

### tabAnchor

• `Optional` **tabAnchor**: `boolean`

When using alt+gr tab and shift alt+gr tab it will move quickly between
anchors

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[tabAnchor](client_components_accessibility_AltReactioner.IAltBaseProps.md#tabanchor)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:67](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L67)

___

### tabbable

• `Optional` **tabbable**: `boolean`

when you press the tab button and want to wrap around
elements, use this to specify whether the component is tabbable
and can be focused via the tab key

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[tabbable](client_components_accessibility_AltReactioner.IAltBaseProps.md#tabbable)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:62](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L62)

___

### triggerAltAfterAction

• `Optional` **triggerAltAfterAction**: `boolean`

will trigger a new input reaction after it has been completed

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[triggerAltAfterAction](client_components_accessibility_AltReactioner.IAltBaseProps.md#triggeraltafteraction)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:52](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L52)

___

### triggerAltIfUnmountAndAltActive

• `Optional` **triggerAltIfUnmountAndAltActive**: `boolean`

plays with hideAllIfUnmount to trigger an action whenever it's unmounted

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[triggerAltIfUnmountAndAltActive](client_components_accessibility_AltReactioner.IAltBaseProps.md#triggeraltifunmountandaltactive)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:79](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L79)

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

[client/components/accessibility/AltReactioner.tsx:103](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L103)

___

### uncontrolledSelector

• `Optional` **uncontrolledSelector**: `string`

the default is "*[tabindex],button:not(:disabled),input:not(:disabled),a[href],iframe:not(:disabled)"
determines what should be selected inside an uncontrolled container, it will pick it from below or above
depending on selection style

#### Inherited from

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[uncontrolledSelector](client_components_accessibility_AltReactioner.IAltBaseProps.md#uncontrolledselector)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:110](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L110)

___

### useInFlow

• `Optional` **useInFlow**: `boolean`

Will use the reactioner in the text flow as well so that it's selectable while
going through textual elements, however it will not be displayed and be treated
rather as a simple focusable element, but it will be displayed in alt mode

#### Overrides

[IAltBaseProps](client_components_accessibility_AltReactioner.IAltBaseProps.md).[useInFlow](client_components_accessibility_AltReactioner.IAltBaseProps.md#useinflow)

#### Defined in

[client/components/accessibility/AltReactioner.tsx:191](https://github.com/onzag/itemize/blob/73e0c39e/client/components/accessibility/AltReactioner.tsx#L191)
