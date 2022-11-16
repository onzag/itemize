/**
 * The alt reactioner is an accessibility utility to be used to enable
 * accessibility to provide navigation using only the keyboard, this also
 * enables voice recognition software to use the application even for
 * users without hands
 * 
 * @module
 */

import React, { ForwardedRef } from "react";
import { showRelevant as showScrollerRelevant, hideAll as hideAllScroller, scrollCurrent } from "./AltScroller";
import { AltPriorityShifterContext } from "./AltPriorityShifter"

export interface IAltBaseProps {
  /**
   * The wrapping component to use, by default it will use a div
   */
  component?: string;
  /**
   * Props to pass to the component
   */
  componentProps?: any;
  /**
   * A class name to use in such component
   */
  className?: string;
  /**
  * whether it is currently disabled
  */
  disabled?: boolean;
  /**
   * The priority by default 0, for example, let's say there's an element like a toolbar that is to be
   * used only when a certain element is focused, when such element is focused the alt reactioners
   * may have priority 1, and none of the priority 0 elements will display, of course, this is only
   * usable if you use it in conjuction with disabled
   */
  priority?: number;
  /**
   * A positioning within the group used to specify what part of a scrolling box this belongs to
   * for example -1 is often to be used with fixed navbar, 0 with the body content and 100 with footers
   */
  groupPosition?: number;
  /**
   * will trigger a new input reaction after it has been completed
   */
  triggerAltAfterAction?: boolean;
  /**
   * when you press the tab button and want to wrap around
   * elements, use this to specify whether the component is tabbable
   * and can be focused via the tab key
   */
  tabbable?: boolean;
  /**
   * When using alt+gr tab and shift alt+gr tab it will move quickly between
   * elements of the same tabgroup, if using with an element without a tabgroup
   * it will match the next element that holds a tabgroup
   */
  tabGroup?: string;
  /**
   * Sone elements may unmount and not get called, eg. if some other element
   * caused it to unmount, the alt may remain in a triggered state without
   * realizing nothing anymore is visible
   * 
   * very useful for dialogs for example that may get closed by outside actions
   */
  hideAllIfUnmount?: boolean;
  /**
   * plays with hideAllIfUnmount to trigger an action whenever it's unmounted
   */
  triggerAltIfUnmountAndAltActive?: boolean;
  /**
   * Normally this is unnecessary to set, basically whenever the element is focused
   * all other element quick actions are not allowed to execute
   * 
   * however this does not apply if tab isn't pressed
   * 
   * this is basically the default for input fields and textareas
   */
  blocksQuickActionsWhileFocused?: boolean;
}

export interface IAltReactionerProps extends IAltBaseProps {
  /**
   * The children that is to be rendered inside
   */
  children: (displayed: boolean, blocked: boolean) => React.ReactNode;
  /**
   * a css selector to choose the component that is relevant that the
   * user is supposed to interact with, by default it will simply pick the element itself
   * as its first child node
   */
  selector?: string;
  /**
   * how many times to go up in the parent node before selecting, rather than selecting
   * the current element
   * 
   * requires not be a text type and have a reactionKey
   */
  selectorGoUp?: number;
  /**
   * The key to be used that will trigger the specific action,
   * please use keycodes in lowercase, they need to be lowercase
   * 
   * avoid using arrowup, arrowright, arrowleft or arrowdown as they are used
   * by the AltReactioner component
   */
  reactionKey?: string;
  /**
   * The action to be executed, by default it will click the component, other actions are focus
   * otherwise pass a function for a custom action
   * 
   * focus will focus the element
   * click will click the element
   */
  action?: "focus" | "click";
  /**
   * Will use the reactioner in the text flow as well so that it's selectable while
   * going through textual elements, however it will not be displayed and be treated
   * rather as a simple focusable element, but it will be displayed in alt mode
   */
  useInFlow?: boolean;
  /**
   * Triggers when two reactions with the same id are found
   * and provides a numeric id that represents the next number caught
   * which shall be from 1 to 9
   * 
   * the pluscount is a modifier represented by the + sign that specifies
   * the need to press that key in order to get towards that option group
   * 
   * higher numbers are possible but represent an accessibility flaw and cannot
   * truly be accessed
   */
  onAmbiguousReaction: (isExpected: boolean, id: number, plusCount: number) => void;
  onAmbiguousClear: () => void;

  /**
   * Triggers when alt has been triggered
   * 
   * note that this triggers before the state changes to displayed
   */
  onDisplay?: () => void;
  /**
   * Triggers when hidden
   * 
   * note that this triggers befoe the state changes to hidden
   */
  onHide?: () => void;
}

interface IActualAltReactionerState {
  displayed: boolean;
  blocked: boolean;
}

const ALT_REGISTRY: {
  flow: ActualAltBase<any, any>[];
  activeFlow: ActualAltBase<any, any>[];
  activeFlowFocusIndex: number;
  activeFlowPriority: number;
  actions: {
    [reactionKey: string]: ActualAltReactioner[];
  },
  isBlocked: boolean;
  isDisplayingActions: ActualAltReactioner[];
  displayedActionsFocusIndex: number;
  displayedActionsPriority: number;
  awaitingKeycodes: ActualAltReactioner[];
  awaitingKeycodesFocusIndex: number;
  lastFocusedActionSignatures: { [priorityKey: number]: string };
  lastFocusedFlowSignatures: { [priorityKey: number]: string };
  isJumpingThroughGroups: boolean;
} = {
  flow: [],
  activeFlow: null,
  activeFlowFocusIndex: -1,
  activeFlowPriority: null,
  actions: {},
  isBlocked: false,
  isDisplayingActions: null,
  displayedActionsFocusIndex: -1,
  displayedActionsPriority: null,
  awaitingKeycodes: null,
  awaitingKeycodesFocusIndex: -1,
  lastFocusedActionSignatures: {},
  lastFocusedFlowSignatures: {},
  isJumpingThroughGroups: false,
};

export function hideAll(butKeycodes: ActualAltReactioner[] = []) {
  // hide the scroller too
  if (butKeycodes.length === 0) {
    hideAllScroller();
  }

  ALT_REGISTRY.isBlocked = false;

  Object.keys(ALT_REGISTRY.actions).forEach((reactionKey) => {
    ALT_REGISTRY.actions[reactionKey].forEach((v) => {
      if (!butKeycodes.includes(v)) {
        v.hide();
      }
    });
  });

  ALT_REGISTRY.awaitingKeycodes && ALT_REGISTRY.awaitingKeycodes.forEach((v) => {
    v.triggerAmbiguousClear();
  });

  // clear everything we don't enter keycodes mode
  if (!butKeycodes.length) {
    ALT_REGISTRY.isDisplayingActions = null;
    ALT_REGISTRY.displayedActionsFocusIndex = -1;
    ALT_REGISTRY.awaitingKeycodes = null;
    ALT_REGISTRY.awaitingKeycodesFocusIndex = -1;
    ALT_REGISTRY.displayedActionsPriority = null;
  } else {
    // enter keycodes mode
    ALT_REGISTRY.awaitingKeycodes = butKeycodes;
    ALT_REGISTRY.awaitingKeycodesFocusIndex = -1;
  }
}

function calculateActiveFlow(): number {
  let priorityToUse = Number.MIN_SAFE_INTEGER;
  ALT_REGISTRY.flow.forEach((v) => {
    if (!v.isDisabled() && v.getPriority() > priorityToUse) {
      priorityToUse = v.getPriority();
    }
  });

  const flowResults: ActualAltBase<any, any>[] = [];
  ALT_REGISTRY.flow.forEach((v) => {
    if (!v.isDisabled() && v.getPriority() === priorityToUse) {
      flowResults.push(v);
    }
  });

  flowResults.sort((a, b) => a.isBefore(b) ? -1 : 1);

  ALT_REGISTRY.activeFlow = flowResults;
  ALT_REGISTRY.activeFlowFocusIndex = flowResults.findIndex((e) => e.getElement() === document.activeElement);
  ALT_REGISTRY.activeFlowPriority = priorityToUse;

  return priorityToUse;
}

function calculatePriorityOfDisplayElements(calcActiveFlow?: boolean): number {
  let priorityToUse = calcActiveFlow ? calculateActiveFlow() : Number.MIN_SAFE_INTEGER;
  Object.keys(ALT_REGISTRY.actions).forEach((reactionKey) => {
    ALT_REGISTRY.actions[reactionKey].forEach((v) => {
      if (!v.isDisabled() && v.getPriority() > priorityToUse) {
        priorityToUse = v.getPriority();
      }
    });
  });

  return priorityToUse;
}

export function calculateDisplayElements(priorityToUse: number, doNotShowHide: boolean) {
  const actionResults: {
    [reactionKey: string]: ActualAltReactioner[]
  } = {};
  Object.keys(ALT_REGISTRY.actions).forEach((reactionKey) => {
    ALT_REGISTRY.actions[reactionKey].forEach((v) => {
      if (!v.isDisabled() && v.getPriority() === priorityToUse) {
        if (!actionResults[reactionKey]) {
          actionResults[reactionKey] = [v];
        } else {
          actionResults[reactionKey].push(v);
        }
      } else if (!doNotShowHide && v.isDisplayed()) {
        v.hide();
      }
    });
  });

  const displayElements: ActualAltReactioner[] = [];
  Object.keys(actionResults).forEach((reactionKey) => {
    actionResults[reactionKey].sort((a, b) => a.isBefore(b) ? -1 : 1);
    actionResults[reactionKey].forEach((v, index, arr) => {
      if (arr.length >= 2) {
        let ambigousId = index % 9;
        ambigousId++;
        const plusCount = Math.floor(index / 9);
        v.triggerAmbiguous(true, ambigousId, plusCount);
      } else {
        v.triggerAmbiguousClear();
      }

      !doNotShowHide && v.display();
      displayElements.push(v);
    });
  });

  displayElements.sort((a, b) => a.isBefore(b) ? -1 : 1);

  return displayElements;
}

export function showDisplayElements(priorityToUse: number) {
  const displayElements = calculateDisplayElements(priorityToUse, false);

  if (!displayElements.length) {
    ALT_REGISTRY.isDisplayingActions = null;
    ALT_REGISTRY.displayedActionsPriority = null;
    ALT_REGISTRY.displayedActionsFocusIndex = -1;
    ALT_REGISTRY.awaitingKeycodes = null;
    ALT_REGISTRY.awaitingKeycodesFocusIndex = -1;
  } else {
    ALT_REGISTRY.isDisplayingActions = displayElements;
    ALT_REGISTRY.displayedActionsPriority = priorityToUse;
    ALT_REGISTRY.displayedActionsFocusIndex = displayElements.findIndex((e) => e.getElement() === document.activeElement);
    ALT_REGISTRY.awaitingKeycodes = null;
    ALT_REGISTRY.awaitingKeycodesFocusIndex = -1;
  }

  showScrollerRelevant();
}

function triggerBasedOn(code: string, shiftKey: boolean, callbackIfmatch: () => void, forceHidden?: boolean) {
  if (code === "shift") {
    return;
  } else if (code === "tab") {
    if (ALT_REGISTRY.awaitingKeycodes) {
      const len = ALT_REGISTRY.awaitingKeycodes.length;
      let nextIndex = ((ALT_REGISTRY.awaitingKeycodesFocusIndex + len + (!shiftKey ? 1 : -1))) % len;

      if (ALT_REGISTRY.awaitingKeycodesFocusIndex === -1) {
        const potentialNextIndex =
          ALT_REGISTRY.awaitingKeycodes.findIndex((e) => e.getSignature() === ALT_REGISTRY.lastFocusedActionSignatures[ALT_REGISTRY.displayedActionsPriority]);
        if (potentialNextIndex !== -1) {
          nextIndex = potentialNextIndex;
        } else {
          nextIndex = 0;
        }
      }

      const selected = ALT_REGISTRY.awaitingKeycodes[ALT_REGISTRY.awaitingKeycodesFocusIndex];
      const expectNextGroup = ALT_REGISTRY.isJumpingThroughGroups ? (selected ? selected.getTabGroup() : undefined) : undefined;

      // make sure that there are tabbable components not to enter an infinite loop
      if (!ALT_REGISTRY.awaitingKeycodes.some((e) =>
        e.isTabbable() &&
        e.isCorrectMatchForTabGroup(expectNextGroup))
      ) {
        // break it and stop it now
        callbackIfmatch();
        return;
      }

      let nextElement = ALT_REGISTRY.awaitingKeycodes[nextIndex];
      while (
        !nextElement.isTabbable() ||
        !nextElement.isCorrectMatchForTabGroup(expectNextGroup)
      ) {
        nextIndex = ((nextIndex + len + (!shiftKey ? 1 : -1))) % len;
        nextElement = ALT_REGISTRY.awaitingKeycodes[nextIndex];
      }
      // the index should be fine now and pointing to the next tabbable component

      nextElement.focus();
      if (!nextElement.isElementInView()) {
        nextElement.getElement().scrollIntoView({ behavior: "smooth" });
      }

      if (document.activeElement !== nextElement.getElement()) {
        console.warn("Failed to focus on next element, is it missing tab-index?", nextElement.getElement());
      }
      ALT_REGISTRY.isBlocked = nextElement.isBlocking();
      ALT_REGISTRY.awaitingKeycodes.forEach((e) => e.setBlocked(ALT_REGISTRY.isBlocked));
      ALT_REGISTRY.awaitingKeycodesFocusIndex = nextIndex;
      ALT_REGISTRY.lastFocusedActionSignatures[ALT_REGISTRY.displayedActionsPriority] = nextElement.getSignature();
    } else if (ALT_REGISTRY.isDisplayingActions) {
      const len = ALT_REGISTRY.isDisplayingActions.length;
      let nextIndex = ((ALT_REGISTRY.displayedActionsFocusIndex + len + (!shiftKey ? 1 : -1))) % len;

      // we may be in the alt mode but we have no actions outside of flow as such, we are going to forcefully
      // tab in the flow
      const hasNoActionsOutsideFlow = ALT_REGISTRY.isDisplayingActions.every((e) => e.isUsedInFlow());

      if (ALT_REGISTRY.displayedActionsFocusIndex === -1) {
        // let's check if we are already focused in one of the elements that are relevant
        // so we can go directly to the next one
        const alreadyFocusedAtIndex =
          ALT_REGISTRY.isDisplayingActions.findIndex((e) =>
            e.isTabbable() &&
            (hasNoActionsOutsideFlow ? true : !e.isUsedInFlow()) &&
            e.getElement() === document.activeElement
          );

        if (alreadyFocusedAtIndex !== -1) {
          nextIndex = ((alreadyFocusedAtIndex + len + (!shiftKey ? 1 : -1))) % len;
        } else {
          // this is for first time focus or when we have pressed tab and none of the potential elements
          // are active in our list
          const potentialNextIndex =
            ALT_REGISTRY.isDisplayingActions.findIndex((e) => e.getSignature() === ALT_REGISTRY.lastFocusedActionSignatures[ALT_REGISTRY.displayedActionsPriority]);
          if (potentialNextIndex !== -1) {
            nextIndex = potentialNextIndex;
          } else {
            nextIndex = 0;
          }
        }
      }

      const selected = ALT_REGISTRY.isDisplayingActions[ALT_REGISTRY.displayedActionsFocusIndex];
      const expectNextGroup = ALT_REGISTRY.isJumpingThroughGroups ? (selected ? selected.getTabGroup() : undefined) : undefined;

      // make sure that there are tabbable components not to enter an infinite loop
      if (!ALT_REGISTRY.isDisplayingActions.some((e) =>
        e.isTabbable() &&
        (hasNoActionsOutsideFlow ? true : !e.isUsedInFlow()) &&
        e.isCorrectMatchForTabGroup(expectNextGroup)
      )) {
        // break it and stop it now
        callbackIfmatch();
        return;
      }

      let nextElement = ALT_REGISTRY.isDisplayingActions[nextIndex];
      while (
        !nextElement.isTabbable() ||
        (hasNoActionsOutsideFlow ? false : nextElement.isUsedInFlow()) ||
        !nextElement.isCorrectMatchForTabGroup(expectNextGroup)
      ) {
        nextIndex = ((nextIndex + len + (!shiftKey ? 1 : -1))) % len;
        nextElement = ALT_REGISTRY.isDisplayingActions[nextIndex];
      }
      // the index should be fine now and pointing to the next tabbable component

      nextElement.focus();
      if (!nextElement.isElementInView()) {
        nextElement.getElement().scrollIntoView({ behavior: "smooth" });
      }

      if (document.activeElement !== nextElement.getElement()) {
        console.warn("Failed to focus on next element, is it missing tab-index?", nextElement.getElement());
      }

      ALT_REGISTRY.isBlocked = nextElement.isBlocking();
      ALT_REGISTRY.isDisplayingActions.forEach((e) => e.setBlocked(ALT_REGISTRY.isBlocked));
      ALT_REGISTRY.displayedActionsFocusIndex = nextIndex;
      ALT_REGISTRY.lastFocusedActionSignatures[ALT_REGISTRY.displayedActionsPriority] = nextElement.getSignature();
    } else if (ALT_REGISTRY.activeFlow) {
      const len = ALT_REGISTRY.activeFlow.length;
      let nextIndex = ((ALT_REGISTRY.activeFlowFocusIndex + len + (!shiftKey ? 1 : -1))) % len;

      if (ALT_REGISTRY.activeFlowFocusIndex === -1) {
        // let's check if we are already focused in one of the elements that are relevant
        // so we can go directly to the next one
        const alreadyFocusedAtIndex =
          ALT_REGISTRY.activeFlow.findIndex((e) => e.isTabbable() && e.getElement() === document.activeElement);

        if (alreadyFocusedAtIndex !== -1) {
          nextIndex = ((alreadyFocusedAtIndex + len + (!shiftKey ? 1 : -1))) % len;
        } else {
          // this is for first time focus or when we have pressed tab and none of the potential elements
          // are active in our list
          const potentialNextIndex =
            ALT_REGISTRY.activeFlow.findIndex((e) => e.getSignature() === ALT_REGISTRY.lastFocusedFlowSignatures[ALT_REGISTRY.activeFlowPriority]);
          if (potentialNextIndex !== -1) {
            nextIndex = potentialNextIndex;
          } else {
            nextIndex = 0;
          }
        }
      }

      const selected = ALT_REGISTRY.activeFlow[ALT_REGISTRY.activeFlowFocusIndex];
      const expectNextGroup = ALT_REGISTRY.isJumpingThroughGroups ? (selected ? selected.getTabGroup() : undefined) : undefined;

      // make sure that there are tabbable components not to enter an infinite loop
      if (!ALT_REGISTRY.activeFlow.some((e) => e.isTabbable() && e.isCorrectMatchForTabGroup(expectNextGroup))) {
        // break it and stop it now
        callbackIfmatch();
        return;
      }

      let nextElement = ALT_REGISTRY.activeFlow[nextIndex];
      while (!nextElement.isTabbable() || !nextElement.isCorrectMatchForTabGroup(expectNextGroup)) {
        nextIndex = ((nextIndex + len + (!shiftKey ? 1 : -1))) % len;
        nextElement = ALT_REGISTRY.activeFlow[nextIndex];
      }
      // the index should be fine now and pointing to the next tabbable component

      nextElement.focus();
      if (!nextElement.isElementInView()) {
        nextElement.getElement().scrollIntoView({ behavior: "smooth" });
      }

      if (document.activeElement !== nextElement.getElement()) {
        console.warn("Failed to focus on next element, is it missing tab-index?", nextElement.getElement());
      }

      // now we set the blocking status of whatever is now the active element
      // flow cannot be blocked because flow is not displaying anything
      ALT_REGISTRY.isBlocked = false;
      ALT_REGISTRY.activeFlow.forEach((e) => (e as any).setBlocked && (e as any).setBlocked(ALT_REGISTRY.isBlocked));

      ALT_REGISTRY.activeFlowFocusIndex = nextIndex;
      ALT_REGISTRY.lastFocusedFlowSignatures[ALT_REGISTRY.activeFlowPriority] = nextElement.getSignature();
    }

    callbackIfmatch();
    return;
  }

  if (ALT_REGISTRY.isBlocked && code !== "escape") {
    // no match, it's blocked
    // tab, and other events are still allowed to flow
    // escape is also allowed to flow here, that's because
    // there may be an action linked to escape
    return;
  }

  // requesting for the remaining options on an overflown list
  // this occurs if there are just too many options available
  // so that the shortcut is overflown
  if (
    ALT_REGISTRY.awaitingKeycodes &&
    code === "+" &&
    ALT_REGISTRY.awaitingKeycodes.length > 9
  ) {
    const cancelledKeycodes = ALT_REGISTRY.awaitingKeycodes.splice(0, 9);
    cancelledKeycodes.forEach((k) => {
      k.hide();
      k.triggerAmbiguousClear();
    });

    ALT_REGISTRY.awaitingKeycodes.forEach((v, index) => {
      let ambigousId = index % 9;
      ambigousId++;
      const plusCount = Math.floor(index / 9);
      v.triggerAmbiguous(false, ambigousId, plusCount);
    });

    callbackIfmatch();
    return;
  }

  if (
    code === "enter" ||
    code === " "
  ) {
    const relatedActiveElement = ALT_REGISTRY.isDisplayingActions.find((v) => v.getElement() === document.activeElement);
    if (relatedActiveElement && relatedActiveElement.props.action !== "focus") {
      callbackIfmatch();
      hideAll();
      relatedActiveElement.trigger(true);
      return;
    }
  }

  const value = ALT_REGISTRY.awaitingKeycodes ?
    // can be nan if not a number but who minds that
    ALT_REGISTRY.awaitingKeycodes[parseInt(code) - 1] :
    ALT_REGISTRY.actions[code];

  const matches: ActualAltReactioner[] = []
  if (value) {
    if (Array.isArray(value)) {
      value.forEach((k) => {
        if (k.getPriority() === ALT_REGISTRY.displayedActionsPriority && (k.isDisplayed() || forceHidden)) {
          matches.push(k);
        }
      });
    } else {
      if (value.getPriority() === ALT_REGISTRY.displayedActionsPriority && (value.isDisplayed() || forceHidden)) {
        matches.push(value);
      }
    }
  }

  if (matches.length) {
    callbackIfmatch();
  }

  // one or zero matches
  if (matches.length <= 1) {
    const isTabNavigatingCurrent =
      ALT_REGISTRY.isDisplayingActions &&
      !!ALT_REGISTRY.isDisplayingActions.find((v) => v.getElement() === document.activeElement);
    hideAll();
    matches.forEach((m) => m.trigger(isTabNavigatingCurrent));

    // zero matches and the code was for the escape key
    // then we will force escaping this stuff
    if (matches.length === 0 && code === "escape") {
      hideAll();
      document.activeElement && (document.activeElement as HTMLElement).blur && (document.activeElement as HTMLElement).blur();
    }
  } else {
    matches.sort((a, b) => a.isBefore(b) ? -1 : 1);
    hideAll(matches);
    matches.forEach((m, index) => {
      let ambigousId = index % 9;
      ambigousId++;
      const plusCount = Math.floor(index / 9);
      m.triggerAmbiguous(false, ambigousId, plusCount);
    });
  }
}

const arrows = [
  "arrowup",
  "arrowleft",
  "arrowright",
  "arrowdown",
];

export function toggleAlt() {
  if (ALT_REGISTRY.isDisplayingActions && !ALT_REGISTRY.isBlocked) {
    // pressing alt again
    hideAll();
    calculateActiveFlow();
  } else if (ALT_REGISTRY.isBlocked) {
    // unblock the registry after pressing alt again
    ALT_REGISTRY.isBlocked = false;
    ALT_REGISTRY.isDisplayingActions && ALT_REGISTRY.isDisplayingActions.forEach((e) => e.setBlocked(false));
    ALT_REGISTRY.activeFlow && ALT_REGISTRY.activeFlow.forEach((e) => (e as any).setBlocked && (e as any).setBlocked(false));
    ALT_REGISTRY.awaitingKeycodes && ALT_REGISTRY.awaitingKeycodes.forEach((e) => (e as any).setBlocked && (e as any).setBlocked(false));
  } else {
    // pressing alt with nothing displayed
    const activeFlowPriority = calculateActiveFlow();
    const displayElementsPriority = calculatePriorityOfDisplayElements();

    showDisplayElements(activeFlowPriority > displayElementsPriority ? activeFlowPriority : displayElementsPriority);
  }
}

if (typeof document !== "undefined") {
  // this is a keycode that was consumed by the alt actioner
  // during the keydown event, if the keycode was not consumed
  // eg. the alt actioner was not active
  // then it's not populated

  // the keycode gets cleaned during keyup
  let keyCodeConsumed: string = null;
  let keyConsumed: string = null;
  let previousKeyupWasControl: boolean = false;

  window.addEventListener("focus", () => {
    hideAll();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      hideAll();
    }
  });
  document.addEventListener("keyup", (e) => {
    if (e.key === "AltGraph") {
      ALT_REGISTRY.isJumpingThroughGroups = false;
      // fallback with control, but unlike alt it will not be able
      // to directly trigger, because there are many shortcuts with control
      // we need to ensure it was not consumed by the alt actioner to make
      // it dissapear last so it can act as a toggle
    } else if (
      e.key === "Control" &&
      keyConsumed !== "Control" &&
      // prevent last shortcuts such as ctrl+c and ctrl+v from
      // triggering the alt
      !previousKeyupWasControl
    ) {
      toggleAlt();
    }

    if (e.ctrlKey) {
      previousKeyupWasControl = true;
    } else {
      previousKeyupWasControl = false;
    }

    keyConsumed = null;
    keyCodeConsumed = null;
  });
  document.addEventListener("keydown", (e) => {
    // some special events don't have this
    // eg. autocomplete
    if (!e.code) {
      return;
    }

    if (e.key === "AltGraph") {
      ALT_REGISTRY.isJumpingThroughGroups = true;
      return;
    }

    // make it work with exotic keybords
    // so that special characters match, for example
    // russian keyboard, japanese keyboard, arabic keyboard
    let keyCode = e.code.toLowerCase().replace("key", "").replace("digit", "");
    if (keyCode.startsWith("alt")) {
      keyCode = "alt";
    } else if (keyCode.startsWith("shift")) {
      keyCode = "shift";
    }
    const isArrow = arrows.includes(keyCode);
    const isAltKey = e.altKey;
    const isTab = keyCode === "tab";
    const isEscape = keyCode === "escape";

    const isPureAltKey = isAltKey && keyCode === "alt";

    if (isPureAltKey) {
      e.stopPropagation();
      e.preventDefault();
    }

    if (isPureAltKey || isTab || isEscape) {
      keyCodeConsumed = e.code;
      keyConsumed = e.key;

      if (isPureAltKey) {
        toggleAlt();
      } else if (isTab || isEscape) {
        const activeFlowPriority = calculateActiveFlow();

        if (!ALT_REGISTRY.isDisplayingActions) {
          // pressing tab with nothing displayed
          const displayElementsPriority = calculatePriorityOfDisplayElements();

          if (displayElementsPriority > activeFlowPriority) {
            if (isEscape) {
              // don't display just trigger force
              triggerBasedOn(keyCode, e.shiftKey, () => {
                e.stopPropagation();
                e.preventDefault();
              }, true);
              return;
            } else {
              showDisplayElements(displayElementsPriority);
            }
          }
        }

        triggerBasedOn(keyCode, e.shiftKey, () => {
          e.stopPropagation();
          e.preventDefault();
        });
      }
    } else if (!isArrow && (isAltKey || ALT_REGISTRY.isDisplayingActions)) {
      keyCodeConsumed = e.code;
      keyConsumed = e.key;

      // if a match is found we want to prevent the default action
      triggerBasedOn(keyCode, e.shiftKey, () => {
        e.stopPropagation();
        e.preventDefault();
      });

      // alt+arrows not to work because it's used for
      // history navigation
    } else if (isArrow && !isAltKey) {
      keyCodeConsumed = e.code;
      keyConsumed = e.key;

      const dir = keyCode.replace("arrow", "");

      scrollCurrent(dir as any, () => {
        e.preventDefault();
        e.stopPropagation();
      });
    }
  });
  window.addEventListener("mousedown", () => {
    hideAll();
  });
  window.addEventListener("touchstart", () => {
    hideAll();
  });
}

function isHidden(element: HTMLElement): boolean {
  const computedStyle = getComputedStyle(element);

  if (computedStyle.display === "none" || computedStyle.visibility === "hidden") {
    return true;
  }

  if (!element.parentElement) {
    return false;
  }

  return isHidden(element.parentElement);
}

export class ActualAltBase<P extends IAltBaseProps, S> extends React.PureComponent<P, S> {
  public containerRef: React.RefObject<HTMLElement>;

  constructor(props: P) {
    super(props);

    this.containerRef = React.createRef<HTMLElement>();
  }

  public getTabGroup() {
    return this.props.tabGroup || null;
  }

  public isBlocking() {
    if (this.props.blocksQuickActionsWhileFocused) {
      return true;
    }

    const element = this.getElement();

    if (!element) {
      return false;
    }

    return element.tagName === "INPUT" || element.tagName === "TEXTAREA";
  }

  public isCorrectMatchForTabGroup(v: string) {
    // no tab group to match for, everything matches
    if (typeof v === "undefined") {
      return true;
    } else if (v === null) {
      // the expected match is for anything that has a tab group
      return !!this.getTabGroup();
    } else {
      return this.getTabGroup() === v;
    }
  }

  public isTabbable() {
    return typeof this.props.tabbable === "boolean" ? this.props.tabbable : true;
  }

  public getPriority() {
    return this.props.priority || 0;
  }

  public isDisabled() {
    // if the element is display none or visibility hidden
    // then it's considered disabled
    const element = this.getElement();

    if (!element) {
      return true;
    }

    if (this.props.disabled) {
      return true;
    }

    return isHidden(element);
  }

  public isElementInView() {
    const element = this.getElement();
    if (!element) {
      return false;
    }

    const bounding = element.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  public getElement() {
    if (!this.containerRef.current) {
      return null as HTMLElement;
    }

    return this.containerRef.current as HTMLElement;
  }

  public getPosition() {
    return this.props.groupPosition || 0;
  }

  public isBefore(other: ActualAltBase<any, any>) {
    const otherPosition = other.getPosition();
    const selfPosition = this.getPosition();

    if (otherPosition !== selfPosition) {
      return otherPosition > selfPosition;
    }

    const isRtL = document.querySelector("html").dir === "rtl";

    // we are missing, it must be because we are dismounting
    if (!this.getElement()) {
      return false;
    }

    const selfClientRect = this.getElement().getBoundingClientRect();

    // other is missing we are before
    // it must be because it's dismounting
    if (!other.getElement()) {
      return true;
    }

    const otherClientRect = other.getElement().getBoundingClientRect();

    // check if there's a vertical intersection which can make them be considered to be in the same
    // line overall, in this intersection we exclude the tips
    const vLevelIntersect = !((selfClientRect.bottom <= otherClientRect.top) || (otherClientRect.bottom <= selfClientRect.top));

    // if they intersect vertically they are considered in the same line, then
    if (vLevelIntersect) {
      const isSelfTheLeftMost = selfClientRect.left > otherClientRect.left;
      return isRtL ? isSelfTheLeftMost : !isSelfTheLeftMost;
    } else {
      // smaller the top number the higher it is
      const isSelfTheTopMost = selfClientRect.top < otherClientRect.top;
      return isSelfTheTopMost;
    }
  }

  public getSignature() {
    return (
      (this.props.priority || 0).toString() + "." +
      (this.props.groupPosition || 0).toString()
    );
  }

  public register(props: IAltBaseProps = this.props) {
    if (!ALT_REGISTRY.flow.find((e) => e === this)) {
      ALT_REGISTRY.flow.push(this);
    }

    if (
      ALT_REGISTRY.activeFlow &&
      ALT_REGISTRY.activeFlowPriority === (props.priority || 0) &&
      !ALT_REGISTRY.activeFlow.includes(this)
    ) {
      const currentFocused = ALT_REGISTRY.activeFlow[ALT_REGISTRY.activeFlowFocusIndex];
      ALT_REGISTRY.activeFlow.push(this);
      ALT_REGISTRY.activeFlow.sort((a, b) => a.isBefore(b) ? -1 : 1);
      ALT_REGISTRY.activeFlowFocusIndex = ALT_REGISTRY.activeFlow.findIndex((e) => e === currentFocused);
    }
  }

  public unregister(props: IAltBaseProps = this.props) {
    const index = ALT_REGISTRY.flow.findIndex((e) => e === this);
    if (index !== -1) {
      ALT_REGISTRY.flow.splice(index, 1);
    }

    if (
      ALT_REGISTRY.activeFlow &&
      ALT_REGISTRY.activeFlowPriority === (props.priority || 0) &&
      ALT_REGISTRY.activeFlow.includes(this)
    ) {
      const currentFocused = ALT_REGISTRY.activeFlow[ALT_REGISTRY.activeFlowFocusIndex];
      ALT_REGISTRY.activeFlow.findIndex((e) => e === this);
      if (index !== -1) {
        ALT_REGISTRY.activeFlow.splice(index, 1);
      }
      ALT_REGISTRY.activeFlowFocusIndex = ALT_REGISTRY.activeFlow.findIndex((e) => e === currentFocused);
    }
  }

  public focus() {
    const element = this.getElement();
    (element as HTMLElement).focus();
  }

  public blur() {
    const element = this.getElement();
    (element as HTMLElement).blur();
  }

  public render() {
    const Element = (this.props.component || "div") as any;
    return (
      <Element ref={this.containerRef} tabIndex={0} className={this.props.className}>
        {this.props.children}
      </Element>
    );
  }

  componentDidMount() {
    this.register();
  }

  componentWillUnmount() {
    this.unregister();

    const isDisplayingActions = ALT_REGISTRY.isDisplayingActions && ALT_REGISTRY.isDisplayingActions.length;
    const isTabNavigatingCurrent = ALT_REGISTRY.isDisplayingActions &&
      !!ALT_REGISTRY.isDisplayingActions.find((v) => v.getElement() === document.activeElement);

    if (this.props.hideAllIfUnmount || this.props.triggerAltIfUnmountAndAltActive) {
      hideAll();
    }

    // give it some time, just in case
    setTimeout(() => {
      // this occurs for example if something dismounts and then
      // some element autofocus back when it was before
      // or it is asked by the reactioner to do so and focus
      // where it used to be

      // so let's get the priority we are now
      const expectedPriority = calculatePriorityOfDisplayElements(true);

      // if we are meant to trigger the display anyway
      if (this.props.triggerAltIfUnmountAndAltActive && isDisplayingActions) {
        // then we do so and we get what we are displaying
        showDisplayElements(expectedPriority);

        // something else must have focused an element that is part of our flow
        // or whatnot, for example, an autofocused element, this was not us
        const somethingAlreadyActive = ALT_REGISTRY.isDisplayingActions.find((a) => a.getElement() === document.activeElement);
        if (somethingAlreadyActive) {
          // must check if it's a blocking input
          ALT_REGISTRY.isBlocked = somethingAlreadyActive.isBlocking();
          ALT_REGISTRY.isDisplayingActions.forEach((e) => e.setBlocked(ALT_REGISTRY.isBlocked));
        } else if (isTabNavigatingCurrent) {
          // because we were tab navigating before we want to tab navigate
          // the new cycle too and ensure something is selected
          // in this case we do so because we were tab navigating before
          triggerBasedOn("tab", false, () => { });
        }
      }
    }, 100);
  }
}

export class ActualAltReactioner extends ActualAltBase<IAltReactionerProps, IActualAltReactionerState> {
  constructor(props: IAltReactionerProps) {
    super(props);

    this.state = {
      displayed: false,
      blocked: false,
    }

    this.triggerAltCycle = this.triggerAltCycle.bind(this);
  }

  public isUsedInFlow() {
    return !!this.props.useInFlow;
  }

  public setBlocked(blocked: boolean) {
    this.setState({
      blocked,
    })
  }

  public getElement() {
    if (!this.containerRef.current) {
      return null as HTMLElement;
    }

    let elementRootSelect = this.containerRef.current as HTMLElement;

    if (this.props.selectorGoUp) {
      for (let i = 0; i < this.props.selectorGoUp; i++) {
        elementRootSelect = elementRootSelect.parentNode as HTMLElement;
      }
    }

    if (this.props.selectorGoUp && !this.props.selector) {
      return elementRootSelect;
    } else {
      const element = this.props.selector ?
        elementRootSelect.querySelector(this.props.selector) as HTMLElement :
        elementRootSelect.childNodes[0] as HTMLElement;

      if (!element) {
        console.warn("Could not retrieve element for reactioner for reaction key " + this.props.reactionKey);
      }

      return element;
    }
  }

  public unregister(props: IAltReactionerProps = this.props) {
    if (props.useInFlow) {
      super.unregister(props);
    }

    if (ALT_REGISTRY.actions[props.reactionKey]) {
      const index = ALT_REGISTRY.actions[props.reactionKey].findIndex((e) => e === this);
      if (index !== -1) {
        ALT_REGISTRY.actions[props.reactionKey].splice(index, 1);
      }
    }

    // HANDLE DISSAPEARING ELEMENTS IN THE MIDDLE OF THE ACTION
    // THIS SHOULDNT HAPPEN BUT CAN HAPPEN IF MISDESIGNED
    // WHICH CAN CAUSE AN ISSUE WHEN THE REACTIONER TRIES TO FOCUS
    // THINGS THAT DONT EXIST
    if (ALT_REGISTRY.isDisplayingActions) {
      const index2 = ALT_REGISTRY.isDisplayingActions.findIndex((e) => e === this);
      if (index2 !== -1) {
        // this can be undefined because of -1
        const currentSelectedElem = ALT_REGISTRY.isDisplayingActions[ALT_REGISTRY.displayedActionsFocusIndex];
        ALT_REGISTRY.isDisplayingActions.splice(index2, 1);
        // but we are okay with that because that will give a -1 back here
        ALT_REGISTRY.displayedActionsFocusIndex = ALT_REGISTRY.isDisplayingActions.findIndex((e) => e === currentSelectedElem);
      }
    }

    if (ALT_REGISTRY.awaitingKeycodes) {
      const index3 = ALT_REGISTRY.awaitingKeycodes.findIndex((e) => e === this);
      if (index3 !== -1) {
        // this can be undefined because of -1
        const currentSelectedElem = ALT_REGISTRY.awaitingKeycodes[ALT_REGISTRY.awaitingKeycodesFocusIndex];
        ALT_REGISTRY.awaitingKeycodes.splice(index3, 1);
        // but we are okay with that because that will give a -1 back here
        ALT_REGISTRY.awaitingKeycodesFocusIndex = ALT_REGISTRY.awaitingKeycodes.findIndex((e) => e === currentSelectedElem);
      }
    }
  }

  public register(props: IAltReactionerProps = this.props) {
    if (props.useInFlow) {
      super.register(props);
    }

    if (!ALT_REGISTRY.actions[props.reactionKey]) {
      ALT_REGISTRY.actions[props.reactionKey] = [this];
    } else if (!ALT_REGISTRY.actions[props.reactionKey].includes(this)) {
      ALT_REGISTRY.actions[props.reactionKey].push(this);
    }

    if (
      ALT_REGISTRY.isDisplayingActions &&
      !ALT_REGISTRY.awaitingKeycodes &&
      ALT_REGISTRY.displayedActionsPriority === (props.priority || 0) &&
      !ALT_REGISTRY.isDisplayingActions.includes(this)
    ) {
      const currentFocused = ALT_REGISTRY.isDisplayingActions[ALT_REGISTRY.displayedActionsFocusIndex];
      ALT_REGISTRY.isDisplayingActions.push(this);
      ALT_REGISTRY.isDisplayingActions.sort((a, b) => a.isBefore(b) ? -1 : 1);
      ALT_REGISTRY.displayedActionsFocusIndex = ALT_REGISTRY.isDisplayingActions.findIndex((e) => e === currentFocused);

      if (!this.isDisabled()) {
        this.display();
        this.setBlocked(ALT_REGISTRY.isBlocked);
      }
    }
  }

  componentDidUpdate(prevProps: IAltReactionerProps) {
    if (this.state.displayed && this.props.disabled) {
      this.setState({
        displayed: false,
      });
    }

    if (
      this.props.reactionKey !== prevProps.reactionKey ||
      this.props.disabled !== prevProps.disabled ||
      this.props.priority !== prevProps.priority ||
      this.props.useInFlow !== prevProps.useInFlow
    ) {
      this.unregister(prevProps);
      this.register();
    }
  }

  public getSignature() {
    return (
      (this.props.priority || 0).toString() + "." +
      (this.props.action || "click").toString() + "." +
      this.props.reactionKey.toString() + "." +
      (this.props.groupPosition || 0).toString()
    );
  }

  public display() {
    if (!this.state.displayed) {
      this.props.onDisplay && this.props.onDisplay();
      this.setState({
        displayed: true,
      });
    }
  }

  public hide() {
    if (this.state.displayed || this.state.blocked) {
      this.props.onHide && this.props.onHide();
      this.setState({
        displayed: false,
        blocked: false,
      });
    }
  }

  public isDisplayed() {
    return this.state.displayed;
  }

  public triggerAmbiguous(expected: boolean, id: number, plusCount: number) {
    return this.props.onAmbiguousReaction(expected, id, plusCount)
  }

  public triggerAmbiguousClear() {
    return this.props.onAmbiguousClear();
  }

  public triggerAltCycle(isTabNavigatingCurrent: boolean) {
    showDisplayElements(calculatePriorityOfDisplayElements(true));
    // something else must have focused an element that is part of our flow
    // or whatnot, for example, an autofocused element
    const somethingAlreadyActive =
      ALT_REGISTRY.isDisplayingActions &&
      ALT_REGISTRY.isDisplayingActions.find((a) => a.getElement() === document.activeElement);

    if (
      somethingAlreadyActive
    ) {
      // must check if it's a blocking input
      ALT_REGISTRY.isBlocked = somethingAlreadyActive.isBlocking();
      ALT_REGISTRY.isDisplayingActions.forEach((e) => e.setBlocked(ALT_REGISTRY.isBlocked));
      // otherwise if we are not we can go ahead and trigger tab
    } else if (isTabNavigatingCurrent) {
      // because we were tab navigating before we want to tab navigate
      // the new cycle too and ensure something is selected
      triggerBasedOn("tab", false, () => { });
    }
  }

  public trigger(isTabNavigatingCurrent: boolean) {
    const element = this.getElement();
    if (!element) {
      return;
    }

    if (!this.props.action || this.props.action === "click") {
      (element as HTMLElement).click();
    } else if (this.props.action === "focus") {
      (element as HTMLElement).focus();
    }

    if (this.props.triggerAltAfterAction) {
      this.triggerAltCycle(isTabNavigatingCurrent);
    }
  }

  public render() {
    const Element = (this.props.component || "div") as any;
    return (
      <Element style={{ display: "contents" }} className={this.props.className} ref={this.containerRef}>
        {this.props.children(this.state.displayed, this.state.blocked)}
      </Element>
    );
  }
}

const AltReactioner = React.forwardRef((props: IAltReactionerProps, ref: ForwardedRef<ActualAltReactioner>) => {
  return (
    <AltPriorityShifterContext.Consumer>
      {(v) => {
        return (
          <ActualAltReactioner
            {...props}
            priority={(props.priority || 0) + v.amount}
            groupPosition={(props.groupPosition || 0) + v.groupPositionAmount}
            disabled={props.disabled || v.disable}
            ref={ref}
          />
        );
      }}
    </AltPriorityShifterContext.Consumer>
  );
});

export default AltReactioner;