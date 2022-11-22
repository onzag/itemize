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
  component?: any;
  /**
   * Props to pass to the component
   */
  componentProps?: any;
  /**
   * how to get the element from the component
   * use this as a string
   */
  componentGetElementFn?: string;
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
   * anchors
   */
  tabAnchor?: boolean;
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

  /**
   * whether it is used in flow
   */
  useInFlow?: boolean;
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
  all: ActualAltBase<any, any>[];
  activeFlow: ActualAltBase<any, any>[];
  activeFlowFocusIndex: number;
  activeFlowPriority: number;
  isBlocked: boolean;
  isDisplayingLayereds: ActualAltBase<any, any>[];
  displayedLayeredFocusIndex: number;
  displayedLayeredPriority: number;
  awaitingLayerKeycodes: ActualAltReactioner[];
  awaitingLayerKeycodesFocusIndex: number;
  lastFocusedLayerSignatures: { [priorityKey: number]: string };
  lastFocusedFlowSignatures: { [priorityKey: number]: string };
  isJumpingThroughAnchors: boolean;
} = {
  all: [],
  activeFlow: null,
  activeFlowFocusIndex: -1,
  activeFlowPriority: null,
  isBlocked: false,
  isDisplayingLayereds: null,
  displayedLayeredFocusIndex: -1,
  displayedLayeredPriority: null,
  awaitingLayerKeycodes: null,
  awaitingLayerKeycodesFocusIndex: -1,
  lastFocusedLayerSignatures: {},
  lastFocusedFlowSignatures: {},
  isJumpingThroughAnchors: false,
};

export function hideAll(butKeycodes: ActualAltReactioner[] = []) {
  // hide the scroller too
  if (butKeycodes.length === 0) {
    hideAllScroller();
  }

  ALT_REGISTRY.isBlocked = false;

  ALT_REGISTRY.all.forEach((element) => {
    if (element instanceof ActualAltReactioner && !butKeycodes.includes(element)) {
      element.hide();
    }
  });

  ALT_REGISTRY.awaitingLayerKeycodes && ALT_REGISTRY.awaitingLayerKeycodes.forEach((v) => {
    v.triggerAmbiguousClear();
  });

  // clear everything we don't enter keycodes mode
  if (!butKeycodes.length) {
    ALT_REGISTRY.isDisplayingLayereds = null;
    ALT_REGISTRY.displayedLayeredFocusIndex = -1;
    ALT_REGISTRY.awaitingLayerKeycodes = null;
    ALT_REGISTRY.awaitingLayerKeycodesFocusIndex = -1;
    ALT_REGISTRY.displayedLayeredPriority = null;
  } else {
    // enter keycodes mode
    ALT_REGISTRY.awaitingLayerKeycodes = butKeycodes;
    ALT_REGISTRY.awaitingLayerKeycodesFocusIndex = -1;
  }
}

function calculateActiveFlow(): number {
  let priorityToUse = Number.MIN_SAFE_INTEGER;
  ALT_REGISTRY.all.forEach((v) => {
    if (!v.isDisabled() && v.getPriority() > priorityToUse && v.isUsedInFlow()) {
      priorityToUse = v.getPriority();
    }
  });

  const flowResults: ActualAltBase<any, any>[] = [];
  ALT_REGISTRY.all.forEach((v) => {
    if (!v.isDisabled() && v.getPriority() === priorityToUse && v.isUsedInFlow()) {
      flowResults.push(v);
    }
  });

  flowResults.sort((a, b) => a.isBefore(b) ? -1 : 1);

  ALT_REGISTRY.activeFlow = flowResults;
  ALT_REGISTRY.activeFlowFocusIndex = flowResults.findIndex((e) => e.getElement() === document.activeElement);
  ALT_REGISTRY.activeFlowPriority = priorityToUse;

  return priorityToUse;
}

function calculatePriorityOfLayereds(calcActiveFlow?: boolean): number {
  let priorityToUse = calcActiveFlow ? calculateActiveFlow() : Number.MIN_SAFE_INTEGER;
  ALT_REGISTRY.all.forEach((v) => {
    if (!v.isDisabled() && v.getPriority() > priorityToUse && !v.isUsedInFlow()) {
      priorityToUse = v.getPriority();
    }
  });

  return priorityToUse;
}

export function calculateLayereds(priorityToUse: number, doNotShowHide: boolean) {
  const actionResults: {
    [reactionKey: string]: ActualAltReactioner[]
  } = {};

  const layereds: Array<ActualAltBase<any, any>> = [];

  ALT_REGISTRY.all.forEach((v) => {
    if (v instanceof ActualAltReactioner) {
      if (!v.isDisabled() && v.getPriority() === priorityToUse) {
        if (v instanceof ActualAltReactioner) {
          const reactionKey = v.getReactionKey();
          if (!actionResults[reactionKey]) {
            actionResults[reactionKey] = [v];
          } else {
            actionResults[reactionKey].push(v);
          }
        } else {
          layereds.push(v);
        }
      } else if (v instanceof ActualAltReactioner && !doNotShowHide && v.isDisplayed()) {
        v.hide();
      }
    } else if (!v.isUsedInFlow() && !v.isDisabled() && v.getPriority() === priorityToUse) {
      layereds.push(v);
    } else if (v instanceof ActualAltReactioner && !doNotShowHide && v.isDisplayed()) {
      v.hide();
    }
  });

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
      layereds.push(v);
    });
  });

  layereds.sort((a, b) => a.isBefore(b) ? -1 : 1);

  return layereds;
}

export function showLayereds(priorityToUse: number) {
  const displayElements = calculateLayereds(priorityToUse, false);

  if (!displayElements.length) {
    ALT_REGISTRY.isDisplayingLayereds = null;
    ALT_REGISTRY.displayedLayeredPriority = null;
    ALT_REGISTRY.displayedLayeredFocusIndex = -1;
    ALT_REGISTRY.awaitingLayerKeycodes = null;
    ALT_REGISTRY.awaitingLayerKeycodesFocusIndex = -1;
  } else {
    ALT_REGISTRY.isDisplayingLayereds = displayElements;
    ALT_REGISTRY.displayedLayeredPriority = priorityToUse;
    ALT_REGISTRY.displayedLayeredFocusIndex = displayElements.findIndex((e) => e.getElement() === document.activeElement);
    ALT_REGISTRY.awaitingLayerKeycodes = null;
    ALT_REGISTRY.awaitingLayerKeycodesFocusIndex = -1;
  }

  showScrollerRelevant();
}

function triggerBasedOn(code: string, shiftKey: boolean, callbackIfmatch: () => void) {
  if (code === "shift") {
    return;
  } else if (code === "tab") {
    if (ALT_REGISTRY.awaitingLayerKeycodes) {
      const len = ALT_REGISTRY.awaitingLayerKeycodes.length;
      let nextIndex = ((ALT_REGISTRY.awaitingLayerKeycodesFocusIndex + len + (!shiftKey ? 1 : -1))) % len;

      if (ALT_REGISTRY.awaitingLayerKeycodesFocusIndex === -1) {
        const potentialNextIndex =
          ALT_REGISTRY.awaitingLayerKeycodes.findIndex((e) => e.getSignature() === ALT_REGISTRY.lastFocusedLayerSignatures[ALT_REGISTRY.displayedLayeredPriority]);
        if (potentialNextIndex !== -1) {
          nextIndex = potentialNextIndex;
        } else {
          nextIndex = 0;
        }
      }

      // make sure that there are tabbable components not to enter an infinite loop
      if (!ALT_REGISTRY.awaitingLayerKeycodes.some((e) => e.isTabbable())) {
        // break it and stop it now
        callbackIfmatch();
        return;
      }

      const expectNextToBeAnchor =
        ALT_REGISTRY.isJumpingThroughAnchors &&
        ALT_REGISTRY.awaitingLayerKeycodes.some((e) => e.isTabbable() && e.isTabAnchor());

      let nextElement = ALT_REGISTRY.awaitingLayerKeycodes[nextIndex];
      while (
        !nextElement.isTabbable() ||
        (expectNextToBeAnchor ? !nextElement.isTabAnchor() : false)
      ) {
        nextIndex = ((nextIndex + len + (!shiftKey ? 1 : -1))) % len;
        nextElement = ALT_REGISTRY.awaitingLayerKeycodes[nextIndex];
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
      ALT_REGISTRY.awaitingLayerKeycodes.forEach((e) => e.setBlocked(ALT_REGISTRY.isBlocked));
      ALT_REGISTRY.awaitingLayerKeycodesFocusIndex = nextIndex;
      ALT_REGISTRY.lastFocusedLayerSignatures[ALT_REGISTRY.displayedLayeredPriority] = nextElement.getSignature();
    } else if (ALT_REGISTRY.isDisplayingLayereds) {
      const len = ALT_REGISTRY.isDisplayingLayereds.length;
      let nextIndex = ((ALT_REGISTRY.displayedLayeredFocusIndex + len + (!shiftKey ? 1 : -1))) % len;

      // we may be in the alt mode but we have no actions outside of flow as such, we are going to forcefully
      // tab in the flow
      const hasNoActionsOutsideFlow = ALT_REGISTRY.isDisplayingLayereds.every((e) => e.isUsedInFlow());

      if (ALT_REGISTRY.displayedLayeredFocusIndex === -1) {
        // let's check if we are already focused in one of the elements that are relevant
        // so we can go directly to the next one
        const alreadyFocusedAtIndex =
          ALT_REGISTRY.isDisplayingLayereds.findIndex((e) =>
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
            ALT_REGISTRY.isDisplayingLayereds.findIndex((e) => e.getSignature() === ALT_REGISTRY.lastFocusedLayerSignatures[ALT_REGISTRY.displayedLayeredPriority]);
          if (potentialNextIndex !== -1) {
            nextIndex = potentialNextIndex;
          } else {
            nextIndex = 0;
          }
        }
      }

      // make sure that there are tabbable components not to enter an infinite loop
      if (!ALT_REGISTRY.isDisplayingLayereds.some((e) =>
        e.isTabbable() &&
        (hasNoActionsOutsideFlow ? true : !e.isUsedInFlow())
      )) {
        // break it and stop it now
        callbackIfmatch();
        return;
      }

      const expectNextToBeAnchor =
        ALT_REGISTRY.isJumpingThroughAnchors &&
        ALT_REGISTRY.isDisplayingLayereds.some((e) =>
          e.isTabbable() &&
          e.isTabAnchor() &&
          (hasNoActionsOutsideFlow ? true : !e.isUsedInFlow())
        );

      let nextElement = ALT_REGISTRY.isDisplayingLayereds[nextIndex];
      while (
        !nextElement.isTabbable() ||
        (hasNoActionsOutsideFlow ? false : nextElement.isUsedInFlow()) ||
        (expectNextToBeAnchor ? !nextElement.isTabAnchor() : false)
      ) {
        nextIndex = ((nextIndex + len + (!shiftKey ? 1 : -1))) % len;
        nextElement = ALT_REGISTRY.isDisplayingLayereds[nextIndex];
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
      ALT_REGISTRY.isDisplayingLayereds.forEach((e) => e.setBlocked(ALT_REGISTRY.isBlocked));
      ALT_REGISTRY.displayedLayeredFocusIndex = nextIndex;
      ALT_REGISTRY.lastFocusedLayerSignatures[ALT_REGISTRY.displayedLayeredPriority] = nextElement.getSignature();
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

      // make sure that there are tabbable components not to enter an infinite loop
      if (!ALT_REGISTRY.activeFlow.some((e) => e.isTabbable())) {
        // break it and stop it now
        callbackIfmatch();
        return;
      }

      const expectNextToBeAnchor =
        ALT_REGISTRY.isJumpingThroughAnchors &&
        ALT_REGISTRY.activeFlow.some((e) => e.isTabbable() && e.isTabAnchor());

      let nextElement = ALT_REGISTRY.activeFlow[nextIndex];
      while (
        !nextElement.isTabbable() ||
        (expectNextToBeAnchor ? !nextElement.isTabAnchor() : false)
      ) {
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
      ALT_REGISTRY.activeFlow.forEach((e) => e.setBlocked(ALT_REGISTRY.isBlocked));

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
    ALT_REGISTRY.awaitingLayerKeycodes &&
    code === "+" &&
    ALT_REGISTRY.awaitingLayerKeycodes.length > 9
  ) {
    const cancelledKeycodes = ALT_REGISTRY.awaitingLayerKeycodes.splice(0, 9);
    cancelledKeycodes.forEach((k) => {
      k.hide();
      k.triggerAmbiguousClear();
    });

    ALT_REGISTRY.awaitingLayerKeycodes.forEach((v, index) => {
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
    const relatedActiveElement = ALT_REGISTRY.isDisplayingLayereds.find((v) => v.getElement() === document.activeElement);
    if (
      relatedActiveElement &&
      relatedActiveElement instanceof ActualAltReactioner &&
      relatedActiveElement.props.action !== "focus"
    ) {
      callbackIfmatch();
      hideAll();
      relatedActiveElement.trigger(true);
      return;
    }
  }

  let matches: ActualAltReactioner[] = []
  if (ALT_REGISTRY.awaitingLayerKeycodes) {
    const value = ALT_REGISTRY.awaitingLayerKeycodes[parseInt(code) - 1];
    if (value) {
      matches.push(value);
    }
  } else if (ALT_REGISTRY.isDisplayingLayereds) {
    matches = ALT_REGISTRY.isDisplayingLayereds
      .filter((v) => (v as ActualAltReactioner).getReactionKey && (v as ActualAltReactioner).getReactionKey() === code) as any;
  }

  if (matches.length) {
    callbackIfmatch();
  }

  // one or zero matches
  if (matches.length <= 1) {
    const isTabNavigatingCurrent =
      ALT_REGISTRY.isDisplayingLayereds &&
      !!ALT_REGISTRY.isDisplayingLayereds.find((v) => v.getElement() === document.activeElement);
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
  if (ALT_REGISTRY.isDisplayingLayereds && !ALT_REGISTRY.isBlocked) {
    // pressing alt again
    hideAll();
    calculateActiveFlow();
  } else if (ALT_REGISTRY.isBlocked) {
    // unblock the registry after pressing alt again
    ALT_REGISTRY.isBlocked = false;
    ALT_REGISTRY.isDisplayingLayereds && ALT_REGISTRY.isDisplayingLayereds.forEach((e) => e.setBlocked(false));
    ALT_REGISTRY.activeFlow && ALT_REGISTRY.activeFlow.forEach((e) => (e as any).setBlocked && (e as any).setBlocked(false));
    ALT_REGISTRY.awaitingLayerKeycodes && ALT_REGISTRY.awaitingLayerKeycodes.forEach((e) => (e as any).setBlocked && (e as any).setBlocked(false));
  } else {
    // pressing alt with nothing displayed
    const activeFlowPriority = calculateActiveFlow();
    const displayElementsPriority = calculatePriorityOfLayereds();

    showLayereds(activeFlowPriority > displayElementsPriority ? activeFlowPriority : displayElementsPriority);
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
      ALT_REGISTRY.isJumpingThroughAnchors = false;
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
      ALT_REGISTRY.isJumpingThroughAnchors = true;
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

    const isPureAltKey = isAltKey && keyCode === "alt";

    if (isPureAltKey) {
      e.stopPropagation();
      e.preventDefault();
    }

    if (isPureAltKey || isTab) {
      keyCodeConsumed = e.code;
      keyConsumed = e.key;

      if (isPureAltKey) {
        toggleAlt();
      } else if (isTab) {
        const activeFlowPriority = calculateActiveFlow();

        if (!ALT_REGISTRY.isDisplayingLayereds) {
          // pressing tab with nothing displayed
          const displayElementsPriority = calculatePriorityOfLayereds();

          if (displayElementsPriority > activeFlowPriority) {
            showLayereds(displayElementsPriority);
          }
        }

        triggerBasedOn(keyCode, e.shiftKey, () => {
          e.stopPropagation();
          e.preventDefault();
        });
      }
    } else if (!isArrow && (isAltKey || ALT_REGISTRY.isDisplayingLayereds)) {
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

  public isUsedInFlow() {
    return !!this.props.useInFlow;
  }

  public isTabAnchor() {
    return this.props.tabAnchor;
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

  /**
   * when another alt is blocking this triggers
   */
  public setBlocked(v: boolean) {

  }

  public componentDidUpdate(prevProps: IAltBaseProps) {
    if (
      this.props.disabled !== prevProps.disabled ||
      this.props.priority !== prevProps.priority ||
      this.props.useInFlow !== prevProps.useInFlow
    ) {
      this.unregister(prevProps);
      this.register();
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

    if (this.props.componentGetElementFn) {
      return (this.containerRef.current as any)[this.props.componentGetElementFn]() as HTMLElement;
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
    if (!ALT_REGISTRY.all.find((e) => e === this)) {
      ALT_REGISTRY.all.push(this);
    }

    if (
      props.useInFlow &&
      ALT_REGISTRY.activeFlow &&
      ALT_REGISTRY.activeFlowPriority === (props.priority || 0) &&
      !ALT_REGISTRY.activeFlow.includes(this)
    ) {
      const currentFocused = ALT_REGISTRY.activeFlow[ALT_REGISTRY.activeFlowFocusIndex];
      ALT_REGISTRY.activeFlow.push(this);
      ALT_REGISTRY.activeFlow.sort((a, b) => a.isBefore(b) ? -1 : 1);
      ALT_REGISTRY.activeFlowFocusIndex = ALT_REGISTRY.activeFlow.findIndex((e) => e === currentFocused);

      return true;
    } else if (
      !props.useInFlow &&
      ALT_REGISTRY.isDisplayingLayereds &&
      ALT_REGISTRY.displayedLayeredPriority === (props.priority || 0) &&
      !ALT_REGISTRY.isDisplayingLayereds.includes(this)
    ) {
      const currentFocused = ALT_REGISTRY.isDisplayingLayereds[ALT_REGISTRY.displayedLayeredFocusIndex];
      ALT_REGISTRY.isDisplayingLayereds.push(this);
      ALT_REGISTRY.isDisplayingLayereds.sort((a, b) => a.isBefore(b) ? -1 : 1);
      ALT_REGISTRY.displayedLayeredFocusIndex = ALT_REGISTRY.isDisplayingLayereds.findIndex((e) => e === currentFocused);

      if (!ALT_REGISTRY.awaitingLayerKeycodes) {
        calculateLayereds(ALT_REGISTRY.displayedLayeredPriority, false);
      }

      return true;
    }

    return false;
  }

  public unregister(props: IAltBaseProps = this.props) {
    const index = ALT_REGISTRY.all.findIndex((e) => e === this);
    if (index !== -1) {
      ALT_REGISTRY.all.splice(index, 1);
    }

    if (
      props.useInFlow &&
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
    } else if (
      !props.useInFlow &&
      ALT_REGISTRY.isDisplayingLayereds &&
      ALT_REGISTRY.displayedLayeredPriority === (props.priority || 0) &&
      ALT_REGISTRY.isDisplayingLayereds.includes(this)
    ) {
      const currentFocused = ALT_REGISTRY.isDisplayingLayereds[ALT_REGISTRY.displayedLayeredFocusIndex];
      ALT_REGISTRY.isDisplayingLayereds.findIndex((e) => e === this);
      if (index !== -1) {
        ALT_REGISTRY.isDisplayingLayereds.splice(index, 1);
      }
      ALT_REGISTRY.displayedLayeredFocusIndex = ALT_REGISTRY.isDisplayingLayereds.findIndex((e) => e === currentFocused);
    }

    if (ALT_REGISTRY.awaitingLayerKeycodes) {
      const index3 = ALT_REGISTRY.awaitingLayerKeycodes.findIndex((e) => e === (this as any));
      if (index3 !== -1) {
        // this can be undefined because of -1
        const currentSelectedElem = ALT_REGISTRY.awaitingLayerKeycodes[ALT_REGISTRY.awaitingLayerKeycodesFocusIndex];
        ALT_REGISTRY.awaitingLayerKeycodes.splice(index3, 1);
        // but we are okay with that because that will give a -1 back here
        ALT_REGISTRY.awaitingLayerKeycodesFocusIndex = ALT_REGISTRY.awaitingLayerKeycodes.findIndex((e) => e === currentSelectedElem);
      }
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
      <Element
        ref={this.containerRef}
        tabIndex={0}
        className={this.props.className}
        {...this.props.componentProps}
      >
        {this.props.children}
      </Element>
    );
  }

  componentDidMount() {
    this.register();
  }

  componentWillUnmount() {
    this.unregister();

    const isDisplayingLayereds = ALT_REGISTRY.isDisplayingLayereds && ALT_REGISTRY.isDisplayingLayereds.length;
    const isTabNavigatingCurrent = ALT_REGISTRY.isDisplayingLayereds &&
      !!ALT_REGISTRY.isDisplayingLayereds.find((v) => v.getElement() === document.activeElement);

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
      const expectedPriority = calculatePriorityOfLayereds(true);

      // if we are meant to trigger the display anyway
      if (this.props.triggerAltIfUnmountAndAltActive && isDisplayingLayereds) {
        // then we do so and we get what we are displaying
        showLayereds(expectedPriority);

        // something else must have focused an element that is part of our flow
        // or whatnot, for example, an autofocused element, this was not us
        const somethingAlreadyActive = ALT_REGISTRY.isDisplayingLayereds.find((a) => a.getElement() === document.activeElement);
        if (somethingAlreadyActive) {
          // must check if it's a blocking input
          ALT_REGISTRY.isBlocked = somethingAlreadyActive.isBlocking();
          ALT_REGISTRY.isDisplayingLayereds.forEach((e) => e.setBlocked(ALT_REGISTRY.isBlocked));
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

  public setBlocked(blocked: boolean) {
    this.setState({
      blocked,
    })
  }

  public getReactionKey() {
    return this.props.reactionKey;
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

  componentDidUpdate(prevProps: IAltReactionerProps) {
    super.componentDidUpdate(prevProps);

    if (this.state.displayed && this.props.disabled) {
      this.setState({
        displayed: false,
      });
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
    showLayereds(calculatePriorityOfLayereds(true));
    // something else must have focused an element that is part of our flow
    // or whatnot, for example, an autofocused element
    const somethingAlreadyActive =
      ALT_REGISTRY.isDisplayingLayereds &&
      ALT_REGISTRY.isDisplayingLayereds.find((a) => a.getElement() === document.activeElement);

    if (
      somethingAlreadyActive
    ) {
      // must check if it's a blocking input
      ALT_REGISTRY.isBlocked = somethingAlreadyActive.isBlocking();
      ALT_REGISTRY.isDisplayingLayereds.forEach((e) => e.setBlocked(ALT_REGISTRY.isBlocked));
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
      <Element style={{ display: "contents" }} className={this.props.className} ref={this.containerRef} {...this.props.componentProps}>
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