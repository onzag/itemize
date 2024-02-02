/**
 * The alt reactioner is an accessibility utility to be used to enable
 * accessibility to provide navigation using only the keyboard, this also
 * enables voice recognition software to use the application even for
 * users without hands
 * 
 * @module
 */

import React, { ForwardedRef } from "react";
import { showRelevant as showScrollerRelevant, hideAll as hideAllScroller, scrollCurrent, setScrollerBlockStatus } from "./AltScroller";
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
   * 
   * ALWAYS_ON_TOP makes it so that the element's priority is the same as the maximum one available
   * so it's technically visible on all priorities
   * 
   * ALWAYS_ON_TOP_KEEP_FLOW makes it so that the element priority is the same as the maximum one available
   * but for elements that are as useInFlow pressing tab on it will figure the next available flow element
   */
  priority?: number | "ALWAYS_ON_TOP" | "ALWAYS_ON_TOP_KEEP_FLOW";
  /**
   * will trigger a new input reaction after it has been completed
   */
  triggerAltAfterAction?: boolean;
  /**
   * Triggers when the action triggers
   */
  onActionTriggered?: (tabNavigating: boolean, action: "click" | "focus" | "blur") => void;
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

  /**
   * Once this element is focused it will go into an uncontrolled state
   * on the next tab forwards or backwards and control will only be regained once
   * an element that is part of either the active flow, active layer, or awaiting key codes
   * for example, let's say you have an embbed youtube video in its own iframe, you can wrap the video
   * on a div that is AltText that is uncontrolled, with an aria-label of youtube video, once that element
   * is focused, the alt is set in an uncontrolled state, and it will stop deciding what's next tabbed
   */
  uncontrolled?: boolean;

  /**
   * the default is "*[tabindex],button:not(:disabled),input:not(:disabled),a[href],iframe:not(:disabled)"
   * determines what should be selected inside an uncontrolled container, it will pick it from below or above
   * depending on selection style
   */
  uncontrolledSelector?: string;

  /**
   * When an element is tabbed but it is not part of the current flow but it kept its focus while being in another
   * layer, use this to select which reaction key would you like to trigger from the current active flow
   */
  onTabOutTrigger?: string;

  /**
   * Language override
   */
  lang?: string;

  /**
   * When an element is about to be focused what element to focus, by default it will
   * focus the element that it is tracking, but you may change this behaviour
   *
   * precise focus, comes from direct actions like a reaction key
   * above, comes from standard tabbing
   * below, comes from reverse tabbing
   * 
   * this action also gets used to trigger the click action
   *  
   * @param how precise, above or below
   * @param element the element which focus will be attempted by default
   * @returns the element to focus
   */
  //onFocusAttempt?: (how: "precise" | "above" | "below", e: HTMLElement) => HTMLElement;
}

type CustomActionFn = (e: HTMLElement) => void;

export interface IAltReactionerProps extends IAltBaseProps {
  /**
   * The children that is to be rendered inside
   */
  children: (displayed: boolean, blocked: boolean) => React.ReactNode;
  /**
   * a css selector to choose the component that is relevant that the
   * user is supposed to interact with, by default it will simply pick the element itself
   * as its first child node
   * 
   * if provided an array it will try until one matches
   */
  selector?: string | string[];
  /**
   * how many times to go up in the parent node before selecting, rather than selecting
   * the current element
   * 
   * if it's a string it will use closest
   * 
   * requires not be a text type and have a reactionKey
   */
  selectorGoUp?: number | string;
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
   * Options for the focus action when triggered via keyboard
   */
  focusOptions?: {
    blurIfAlreadyFocused?: "ALWAYS" | "ONLY_IF_NOT_DISPLAYING_ACTIONS",
  }
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
   * By default enter and space when executed will simply pipe to the application
   * unless the action=click by setting consumeEnterAndSpace=true even elements with
   * action=focus will trigger the action in question (aka it will attempt to focus again)
   * and then it will trigger onActionTriggered as if the reactioner had executed it
   * 
   * when the action is focus and one tabs in, onActionTriggered does not get called because
   * it wasn't focus by the actioner, but rather by tabbing, this allows to make it
   * trigger again by using enter and/or space
   */
  consumeEnterAndSpace?: boolean;

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
  uncontrolled: boolean;
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
  uncontrolled: false,
};

// (window as any).ALT_REGISTRY = ALT_REGISTRY;

/**
 * Provide a given alt reactioner component from the pool
 * based on the provided element
 * 
 * @param element 
 * @returns 
 */
export function findReactComponentFromElement(element: HTMLElement) {
  return ALT_REGISTRY.all.find((e) => e.getElement() === element) || null;
}

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
    ALT_REGISTRY.uncontrolled = false;
  } else {
    // enter keycodes mode
    ALT_REGISTRY.awaitingLayerKeycodes = butKeycodes;
    ALT_REGISTRY.awaitingLayerKeycodesFocusIndex = -1;
    ALT_REGISTRY.uncontrolled = false;
  }
}

function calculateActiveFlow(): number {
  let priorityToUse = Number.MIN_SAFE_INTEGER;
  let priorityToInform = priorityToUse;

  let hasAlwaysOnTop: boolean = false;
  let hasAlwaysOnTopWKeep: boolean = false;
  ALT_REGISTRY.all.forEach((v) => {
    if (!v.isDisabled()) {
      hasAlwaysOnTop = v.getPriority() === "ALWAYS_ON_TOP";
      hasAlwaysOnTopWKeep = v.getPriority() === "ALWAYS_ON_TOP_KEEP_FLOW";
    }
  });

  ALT_REGISTRY.all.forEach((v) => {
    if (
      !v.isDisabled() &&
      typeof v.getPriority() === "number" &&
      (v.getPriority() as number) > priorityToUse
    ) {
      // if it has an always on top the maximum priority is its priority
      // regardless of whether something is in flow or not
      // for the keep_flow one then it will use whatever the priority on flow
      // is being used
      if (hasAlwaysOnTop || v.isUsedInFlow()) {
        priorityToUse = v.getPriority() as number;
        priorityToInform = priorityToUse;

        // when we keep we still use the priority that may still be lower
        // but we will inform the correct priority that we have established as always on top
        // the reason is that we keep the flow that is under this, we keep our flow
      } else if (hasAlwaysOnTopWKeep) {
        priorityToInform = v.getPriority() as number;
      }
    }
  });

  const flowResults: ActualAltBase<any, any>[] = [];
  ALT_REGISTRY.all.forEach((v) => {
    if (
      !v.isDisabled() &&
      (v.getPriority() === priorityToUse || v.getPriority() === "ALWAYS_ON_TOP" || v.getPriority() === "ALWAYS_ON_TOP_KEEP_FLOW") &&
      v.isUsedInFlow()
    ) {
      flowResults.push(v);
    }
  });

  flowResults.sort((a, b) => a.isBefore(b) ? -1 : 1);

  ALT_REGISTRY.activeFlow = flowResults;
  ALT_REGISTRY.activeFlowFocusIndex = flowResults.findIndex((e) => e.getElement() === document.activeElement);
  ALT_REGISTRY.activeFlowPriority = priorityToUse;

  return priorityToInform;
}

function calculatePriorityOfLayereds(calcActiveFlow?: boolean): number {
  let priorityToUse = calcActiveFlow ? calculateActiveFlow() : Number.MIN_SAFE_INTEGER;
  ALT_REGISTRY.all.forEach((v) => {
    if (!v.isDisabled() && typeof v.getPriority() === "number" && (v.getPriority() as number) > priorityToUse && !v.isUsedInFlow()) {
      priorityToUse = v.getPriority() as number;
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
      // FOR ALT REACTIONER
      if (
        // not disabled
        !v.isDisabled() &&
        // fits priority
        (v.getPriority() === priorityToUse || v.getPriority() === "ALWAYS_ON_TOP" || v.getPriority() === "ALWAYS_ON_TOP_KEEP_FLOW")
      ) {
        const reactionKey = v.getReactionKey();
        if (!actionResults[reactionKey]) {
          actionResults[reactionKey] = [v];
        } else {
          actionResults[reactionKey].push(v);
        }
      } else if (!doNotShowHide && v.isDisplayed()) {
        v.hide();
      }

      // FOR ALT TEXT
    } else if (
      // non disabled
      !v.isDisabled() &&
      // fits priority
      (v.getPriority() === priorityToUse || v.getPriority() === "ALWAYS_ON_TOP" || v.getPriority() === "ALWAYS_ON_TOP_KEEP_FLOW")
    ) {
      layereds.push(v);
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

      nextElement.focus(shiftKey ? "below" : "above");
      if (nextElement.isUncontrolled() && process.env.NODE_ENV === "development") {
        console.log("Entered uncontrolled mode");//, nextElement);
      }

      if (!nextElement.isUncontrolled() && document.activeElement !== nextElement.getElement()) {
        console.warn("Failed to focus on next element, is it missing tab-index?", nextElement.getElement());
      }
      ALT_REGISTRY.isBlocked = nextElement.isBlocking();
      ALT_REGISTRY.awaitingLayerKeycodes.forEach((e) => e.setBlocked(ALT_REGISTRY.isBlocked));
      ALT_REGISTRY.awaitingLayerKeycodesFocusIndex = nextIndex;
      ALT_REGISTRY.lastFocusedLayerSignatures[ALT_REGISTRY.displayedLayeredPriority] = nextElement.getSignature();
      ALT_REGISTRY.uncontrolled = nextElement.isUncontrolled();
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
      nextElement.focus(shiftKey ? "below" : "above");
      if (nextElement.isUncontrolled() && process.env.NODE_ENV === "development") {
        console.log("Entered uncontrolled mode");//, nextElement);
      }

      if (!nextElement.isUncontrolled() && document.activeElement !== nextElement.getElement()) {
        console.warn("Failed to focus on next element, is it missing tab-index?", nextElement.getElement());
      }

      ALT_REGISTRY.isBlocked = nextElement.isBlocking();
      ALT_REGISTRY.isDisplayingLayereds.forEach((e) => e.setBlocked(ALT_REGISTRY.isBlocked));
      ALT_REGISTRY.displayedLayeredFocusIndex = nextIndex;
      ALT_REGISTRY.lastFocusedLayerSignatures[ALT_REGISTRY.displayedLayeredPriority] = nextElement.getSignature();
      ALT_REGISTRY.uncontrolled = nextElement.isUncontrolled();
    } else if (ALT_REGISTRY.activeFlow) {
      const len = ALT_REGISTRY.activeFlow.length;
      let nextIndex = ((ALT_REGISTRY.activeFlowFocusIndex + len + (!shiftKey ? 1 : -1))) % len;
      let resolvedWithAllStrategy = false;

      if (ALT_REGISTRY.activeFlowFocusIndex === -1) {
        const alreadyFocusedAtAll = ALT_REGISTRY.all.find((e) => e.getElement() === document.activeElement);
        if (alreadyFocusedAtAll && alreadyFocusedAtAll.onTaboutFindElementWithReactionKey()) {
          const keyToFind = alreadyFocusedAtAll.onTaboutFindElementWithReactionKey();

          const potentialNextIndex =
            ALT_REGISTRY.activeFlow.findIndex((e) =>
              (e as ActualAltReactioner).getReactionKey && (e as ActualAltReactioner).getReactionKey() === keyToFind
            );

          if (potentialNextIndex !== -1) {
            nextIndex = potentialNextIndex;
            resolvedWithAllStrategy = true;
          }
        }

        if (!resolvedWithAllStrategy) {
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
      }

      // make sure that there are tabbable components not to enter an infinite loop
      if (!ALT_REGISTRY.activeFlow.some((e) => e.isTabbable())) {
        // break it and stop it now
        callbackIfmatch();
        return;
      }

      let nextElement = ALT_REGISTRY.activeFlow[nextIndex];
      if (!resolvedWithAllStrategy) {
        const expectNextToBeAnchor =
          ALT_REGISTRY.isJumpingThroughAnchors &&
          ALT_REGISTRY.activeFlow.some((e) => e.isTabbable() && e.isTabAnchor());

        while (
          !nextElement.isTabbable() ||
          (expectNextToBeAnchor ? !nextElement.isTabAnchor() : false)
        ) {
          nextIndex = ((nextIndex + len + (!shiftKey ? 1 : -1))) % len;
          nextElement = ALT_REGISTRY.activeFlow[nextIndex];
        }
      }

      // the index should be fine now and pointing to the next tabbable component
      nextElement.focus(resolvedWithAllStrategy ? "precise" : (shiftKey ? "below" : "above"));
      if (nextElement.isUncontrolled() && process.env.NODE_ENV === "development") {
        console.log("Entered uncontrolled mode");//, nextElement);
      }

      if (!nextElement.isUncontrolled() && document.activeElement !== nextElement.getElement()) {
        console.warn("Failed to focus on next element, is it missing tab-index?", nextElement.getElement());
      }

      // now we set the blocking status of whatever is now the active element
      // flow cannot be blocked because flow is not displaying anything
      ALT_REGISTRY.isBlocked = false;
      ALT_REGISTRY.activeFlow.forEach((e) => e.setBlocked(ALT_REGISTRY.isBlocked));
      ALT_REGISTRY.activeFlowFocusIndex = nextIndex;
      ALT_REGISTRY.lastFocusedFlowSignatures[ALT_REGISTRY.activeFlowPriority] = nextElement.getSignature();
      ALT_REGISTRY.uncontrolled = nextElement.isUncontrolled();
    }

    setScrollerBlockStatus(ALT_REGISTRY.isBlocked || ALT_REGISTRY.uncontrolled);
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
    const relatedActiveElement = ALT_REGISTRY.all.find((v) => v.getElement() === document.activeElement);
    if (
      relatedActiveElement &&
      relatedActiveElement instanceof ActualAltReactioner &&
      (
        relatedActiveElement.props.action !== "focus" ||
        relatedActiveElement.props.consumeEnterAndSpace
      )
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
  } else if (code === "escape") {
    let priorityToUse = Number.MIN_SAFE_INTEGER;
    ALT_REGISTRY.all.forEach((v) => {
      if (!v.isDisabled() && typeof v.getPriority() === "number" && (v.getPriority() as number) > priorityToUse) {
        priorityToUse = v.getPriority() as number;
      }
    });
    matches = ALT_REGISTRY.all.filter(
      (v) => (
        v.getPriority() === priorityToUse || v.getPriority() === "ALWAYS_ON_TOP" || v.getPriority() === "ALWAYS_ON_TOP_KEEP_FLOW"
      ) && (v as ActualAltReactioner).getReactionKey && (v as ActualAltReactioner).getReactionKey() === code) as any;
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
    setScrollerBlockStatus(ALT_REGISTRY.uncontrolled);
  } else {
    // pressing alt with nothing displayed
    const activeFlowPriority = calculateActiveFlow();
    const displayElementsPriority = calculatePriorityOfLayereds();

    showLayereds(activeFlowPriority > displayElementsPriority ? activeFlowPriority : displayElementsPriority);

    const activeLayered = ALT_REGISTRY.isDisplayingLayereds && ALT_REGISTRY.isDisplayingLayereds[ALT_REGISTRY.displayedLayeredFocusIndex];
    setScrollerBlockStatus((activeLayered ? activeLayered.isBlocking() : false) || ALT_REGISTRY.uncontrolled);
  }
}

const rawSymbols = "+-.,;(){}=?!#%&";

if (typeof document !== "undefined") {
  let lastKeyDownWasTab = false;
  let lastKeyDownWasShiftTab = false;

  // this is a keycode that was consumed by the alt actioner
  // during the keydown event, if the keycode was not consumed
  // eg. the alt actioner was not active
  // then it's not populated

  // the keycode gets cleaned during keyup
  let keyCodeConsumed: string = null;
  let keyConsumed: string = null;
  let previousKeyupWasControlComposite: boolean = false;

  window.addEventListener("focus", () => {
    hideAll();
  });

  document.addEventListener('focus', () => {
    if (ALT_REGISTRY.uncontrolled) {
      const match = ALT_REGISTRY.all.find((e) => e.getElement() === document.activeElement);
      if (match) {
        ALT_REGISTRY.uncontrolled = match.isUncontrolled();

        if (!ALT_REGISTRY.uncontrolled) {
          // one should be into active flow
          if (ALT_REGISTRY.awaitingLayerKeycodesFocusIndex !== -1) {
            let nextIndex = ALT_REGISTRY.awaitingLayerKeycodesFocusIndex + (lastKeyDownWasShiftTab ? -1 : 1);
            if (nextIndex >= ALT_REGISTRY.awaitingLayerKeycodes.length) {
              nextIndex = 0;
            }

            const nextElement = ALT_REGISTRY.awaitingLayerKeycodes[nextIndex];

            if (nextElement.getElement() !== document.activeElement) {
              ALT_REGISTRY.awaitingLayerKeycodesFocusIndex = nextIndex;
              nextElement.focus(lastKeyDownWasShiftTab ? "below" : "above");
            }
          } else if (ALT_REGISTRY.isDisplayingLayereds) {
            let nextIndex = ALT_REGISTRY.displayedLayeredFocusIndex + (lastKeyDownWasShiftTab ? -1 : 1);
            if (nextIndex >= ALT_REGISTRY.isDisplayingLayereds.length) {
              nextIndex = 0;
            }

            const nextElement = ALT_REGISTRY.isDisplayingLayereds[nextIndex];

            if (nextElement.getElement() !== document.activeElement) {
              ALT_REGISTRY.displayedLayeredFocusIndex = nextIndex;
              nextElement.focus(lastKeyDownWasShiftTab ? "below" : "above");
            }
          } else if (ALT_REGISTRY.activeFlowFocusIndex !== -1) {
            let nextIndex = ALT_REGISTRY.activeFlowFocusIndex + (lastKeyDownWasShiftTab ? -1 : 1);
            if (nextIndex >= ALT_REGISTRY.activeFlow.length) {
              nextIndex = 0;
            }
            const nextElement = ALT_REGISTRY.activeFlow[nextIndex];

            if (nextElement.getElement() !== document.activeElement) {
              ALT_REGISTRY.activeFlowFocusIndex = nextIndex;
              nextElement.focus(lastKeyDownWasShiftTab ? "below" : "above");
            }
          }
        }
      }
    }
  }, true);

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
      !previousKeyupWasControlComposite
    ) {
      toggleAlt();
    }

    // we don't want to match control itself
    const isAComposedControlKey = e.ctrlKey && e.key !== "Control";

    if (isAComposedControlKey) {
      previousKeyupWasControlComposite = true;
    } else {
      previousKeyupWasControlComposite = false;
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
    } else if (
      rawSymbols.includes(e.key)
    ) {
      keyCode = e.key;
    }

    const isArrow = arrows.includes(keyCode);
    const isAltKey = e.altKey;
    const isTab = keyCode === "tab";
    const isEscape = keyCode === "escape";
    const isEnter = keyCode === "enter";
    const isSpace = keyCode === " ";

    lastKeyDownWasTab = isTab && !e.shiftKey;
    lastKeyDownWasShiftTab = isTab && e.shiftKey;

    // uncontrolled
    if (ALT_REGISTRY.uncontrolled && (isTab || isArrow)) {
      return;
    }

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
    } else if (!isArrow && (isAltKey || ALT_REGISTRY.isDisplayingLayereds || isEscape || isEnter || isSpace)) {
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

      if (!e.defaultPrevented) {
        scrollCurrent(dir as any, () => {
          e.preventDefault();
          e.stopPropagation();
        });
      }
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

function isInView(element: HTMLElement): boolean {
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
    if (
      typeof this.props.blocksQuickActionsWhileFocused !== "undefined" &&
      this.props.blocksQuickActionsWhileFocused !== null
    ) {
      return this.props.blocksQuickActionsWhileFocused;
    }

    const element = this.getElement();

    if (!element) {
      return false;
    }

    if (element.tagName === "INPUT") {
      const type = element.getAttribute("type");
      return type !== "radio" && type !== "checkbox" && type !== "button" && type !== "submit";
    }

    return element.tagName === "TEXTAREA" || element.isContentEditable;
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

  public getPriority(): number | "ALWAYS_ON_TOP" | "ALWAYS_ON_TOP_KEEP_FLOW" {
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

  public getElement() {
    if (!this.containerRef.current) {
      return null as HTMLElement;
    }

    if (this.props.componentGetElementFn) {
      return (this.containerRef.current as any)[this.props.componentGetElementFn]() as HTMLElement;
    }

    return this.containerRef.current as HTMLElement;
  }

  public getContainer() {
    if (!this.containerRef.current) {
      return null as HTMLElement;
    }

    return this.containerRef.current;
  }

  /**
   * Gets the tree ancestry starting from the container that is parented by
   * the root and ending with the current
   * [parent A] [parent B] [element]
   * @returns 
   */
  public getTreeAncestry() {
    let current = this.getElement();

    if (!current) {
      return [];
    }

    const matchingGroupsAncestors: HTMLElement[] = [current];
    current = current.parentElement;
    while (current) {
      if (
        current.dataset.altGroup ||
        current.tagName === "TD" ||
        current.tagName === "UL" ||
        current.tagName === "OL" ||
        current.tagName === "TH"
      ) {
        matchingGroupsAncestors.push(current);
      }

      current = current.parentElement;
    }
    return matchingGroupsAncestors.reverse();
  }

  public isBefore(other: ActualAltBase<any, any>) {
    const treeAncestrySelf = this.getTreeAncestry();
    const treeAncestryOther = other.getTreeAncestry();

    // we are missing, it must be because we are dismounting
    // other is missing we are before
    // it must be because it's dismounting
    if (!treeAncestrySelf.length || !treeAncestryOther.length) {
      return false;
    }

    // we are finding an element in common in the tree, because this is a tree
    // the index should match, we are looking for the first match
    // were they are both the same at the same level
    let elementInCommonIndex = -1;

    // we start by pushing forwards from the largest element to the smallest as we have matches
    // until we no longer get a match, this is our element in common that parents both making the siblings
    // the comparison point
    // eg.
    // <div0 data-alt-group>
    //   <div1 data-alt-group>
    //     <p>title</p>
    //     <div2 data-alt-group>
    //       <p>text</p>
    //     </div2>
    //   </div1>
    // </div0>
    // for title its ancestry will be div0, div1, p
    // for text its ancestry will be div0, div1, div2, text
    // this algorithm will start by checking div0, matches, div1, matches, p/div2 no match and stop there
    // so our comparison point is the p and div2, making <p>title</p> be compared against <div2...
    // for our is before check
    let elementInCommonIndexTest = 0;
    while (
      treeAncestrySelf[elementInCommonIndexTest] &&
      treeAncestryOther[elementInCommonIndexTest] &&
      treeAncestrySelf[elementInCommonIndexTest] === treeAncestryOther[elementInCommonIndexTest]
    ) {
      elementInCommonIndex = elementInCommonIndexTest;
      elementInCommonIndexTest++;
    }

    // we will compare with siblings that are parented by the same group
    // if no parent is found then use the lowermost element since they are considered siblings
    const comparisonSelf: HTMLElement = elementInCommonIndex === -1 ?
      // we have to compare one with each other because they have no parent in common
      treeAncestrySelf[0] :
      // we will use the sibling of the element in common
      // for example div1>div2>p div1>div2>span where div1 and div2 are alt groups will use p and span to compare
      // each other but say div1>div2>p vs div1>span will use the span and the div2 to compare, basically
      // the comparison is done at the same level
      treeAncestrySelf[elementInCommonIndex + 1];
    const comparisonOther: HTMLElement = elementInCommonIndex === -1 ?
      treeAncestryOther[0] :
      treeAncestryOther[elementInCommonIndex + 1];

    // can only truly happen if they are equal or if one is contained
    if (!comparisonSelf || !comparisonOther) {
      // basically the other that we are checking to compare is contained within
      // eg. comparing div1>p against div1 itself, p, will try to compare the element in common
      // div1, so it will use p, but div1 itself goes out of range, therefore we are going to check
      // if the element in common is contained
      const isOtherContainedInSelf = elementInCommonIndex !== -1 &&
        elementInCommonIndex === (treeAncestrySelf.length - 1);

      // we are before if we contain it as we have priority as a container
      return isOtherContainedInSelf;


      // console.warn("Could not determine a comparison between two elements in alt reactioner, are they the same?");
      // return false;
    }

    if (
      (comparisonSelf.dataset.altGroup === "START" && comparisonOther.dataset.altGroup !== "START") ||
      (comparisonSelf.dataset.altGroup !== "END" && comparisonOther.dataset.altGroup === "END")
    ) {
      return true;
    }

    if (
      (comparisonSelf.dataset.altGroup === "END" && comparisonOther.dataset.altGroup !== "END") ||
      (comparisonSelf.dataset.altGroup !== "START" && comparisonOther.dataset.altGroup === "START")
    ) {
      return false;
    }

    const isRtL = document.querySelector("html").dir === "rtl";

    const selfClientRect = comparisonSelf.getBoundingClientRect();
    const otherClientRect = comparisonOther.getBoundingClientRect();

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
      (this.props.priority || 0).toString()
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

  public focus(how: "precise" | "above" | "below") {
    // uncontrolled elements cannot focus and are not themselves focuseable
    if (this.isUncontrolled()) {
      const container = this.getContainer();
      const selector = this.props.uncontrolledSelector || "*[tabindex],button:not(:disabled),input:not(:disabled),a[href],iframe:not(:disabled)";

      let elementToFocus: HTMLElement = null;
      // normal tabbing or precise selection
      if (how !== "below") {
        elementToFocus = container.querySelector(selector);
      } else {
        // shift tab
        const arr = container.querySelectorAll(selector);
        if (arr.length) {
          elementToFocus = arr[arr.length - 1] as HTMLElement;
        }
      }

      if (!elementToFocus) {
        console.warn("Could not find anything focuseable inside uncontrolled container");
      } else {
        elementToFocus.focus();

        if (!isInView(elementToFocus) && elementToFocus) {
          elementToFocus.scrollIntoView({ behavior: "smooth" });
        }
      }

      return;
    }

    const element = this.getElement();

    // if (this.props.onFocusAttempt) {
    //   element = this.props.onFocusAttempt(how, element);
    // }

    (element as HTMLElement).focus();

    if (!isInView(element) && element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  public onTaboutFindElementWithReactionKey() {
    return this.props.onTabOutTrigger || null;
  }

  public blur() {
    const element = this.getElement();
    (element as HTMLElement).blur();
  }

  public isUncontrolled() {
    return !!this.props.uncontrolled;
  }

  public render() {
    const Element = (this.props.component || "div") as any;
    return (
      <Element
        ref={this.containerRef}
        tabIndex={this.props.uncontrolled ? -1 : 0}
        className={this.props.className}
        data-alt-reactioner={true}
        data-priority={this.props.priority || 0}
        {...this.props.componentProps}
      >
        {this.props.children || this.props.componentProps.children}
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
          setScrollerBlockStatus(ALT_REGISTRY.isBlocked || ALT_REGISTRY.uncontrolled);
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

export function triggerAltCycle(tabNavigation: boolean) {
  setTimeout(() => {
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
      // not anymore because a triggered alt cycle must consider itself to override
      // blocking inputs, it's as if I have pressed alt
      ALT_REGISTRY.isBlocked = false;// somethingAlreadyActive.isBlocking();
      ALT_REGISTRY.isDisplayingLayereds.forEach((e) => e.setBlocked(ALT_REGISTRY.isBlocked));
      setScrollerBlockStatus(ALT_REGISTRY.isBlocked || ALT_REGISTRY.uncontrolled);
      // otherwise if we are not we can go ahead and trigger tab
    } else if (tabNavigation) {
      // because we were tab navigating before we want to tab navigate
      // the new cycle too and ensure something is selected
      triggerBasedOn("tab", false, () => { });
    }
  }, 50);
}

export function triggerTabCycle() {
  setTimeout(() => {
    const activeFlowPriority = calculateActiveFlow();

    if (!ALT_REGISTRY.isDisplayingLayereds) {
      // pressing tab with nothing displayed
      const displayElementsPriority = calculatePriorityOfLayereds();

      if (displayElementsPriority > activeFlowPriority) {
        showLayereds(displayElementsPriority);
      }
    }

    triggerBasedOn("tab", false, () => { });
  }, 50);
}

export class ActualAltReactioner extends ActualAltBase<IAltReactionerProps, IActualAltReactionerState> {
  constructor(props: IAltReactionerProps) {
    super(props);

    this.state = {
      displayed: false,
      blocked: false,
    }
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

    if (typeof this.props.selectorGoUp !== "undefined") {
      if (typeof this.props.selectorGoUp === "number") {
        for (let i = 0; i < this.props.selectorGoUp; i++) {
          elementRootSelect = elementRootSelect.parentNode as HTMLElement;
        }
      } else {
        elementRootSelect = elementRootSelect.closest(this.props.selectorGoUp);
      }
    }

    if (this.props.selectorGoUp && !this.props.selector) {
      return elementRootSelect;
    } else {
      let element: HTMLElement = null;
      // use the array until we find a match
      if (Array.isArray(this.props.selector)) {
        this.props.selector.forEach((selector) => {
          if (element) {
            return;
          }

          element = elementRootSelect.querySelector(selector) as HTMLElement;
        });
      } else {
        element = this.props.selector ?
          elementRootSelect.querySelector(this.props.selector) as HTMLElement :
          elementRootSelect.childNodes[0] as HTMLElement;
      }

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
      this.props.reactionKey.toString()
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

  public trigger(isTabNavigatingCurrent: boolean) {
    let element = this.getElement();
    if (!element) {
      console.warn("Did not receive an element from the selector during trigger, check your selector options");
      return;
    }

    // if (this.props.onFocusAttempt) {
    //   element = this.props.onFocusAttempt("precise", element);
    // }

    // if (!element) {
    //   console.warn("Did not receive an element from the selector during onFocusAttempt, check your onFocusAttempt function");
    //   return;
    // }

    // due to a bug in react altering the props before the next
    // render cycle I need to store it like this so it actually works
    // and stops modifying immutable values as side effects
    const triggerAltAfterAction = this.props.triggerAltAfterAction;
    const action = this.props.action;
    const onActionTriggered = this.props.onActionTriggered;

    if (!action || action === "click") {
      (element as HTMLElement).click();
    } else if (action === "focus") {
      const focusOptions = this.props.focusOptions;

      if (focusOptions?.blurIfAlreadyFocused) {
        const isFocused = document.activeElement === element;
        const satisify1 = (
          isFocused &&
          focusOptions.blurIfAlreadyFocused === "ONLY_IF_NOT_DISPLAYING_ACTIONS" &&
          !ALT_REGISTRY.isDisplayingLayereds &&
          !ALT_REGISTRY.awaitingLayerKeycodes
        );
        const satisfy2 = (
          isFocused &&
          focusOptions.blurIfAlreadyFocused === "ALWAYS"
        );
        if (satisfy2 || satisify1) {
          (element as HTMLElement).blur();
          if (onActionTriggered) {
            onActionTriggered(isTabNavigatingCurrent, "blur");
          }
          ALT_REGISTRY.uncontrolled = false;
          return;
        }
      }

      (element as HTMLElement).focus();

      if (!isInView(element)) {
        element.scrollIntoView({ behavior: "smooth" });
      }

      ALT_REGISTRY.uncontrolled = this.isUncontrolled();
    }

    if (onActionTriggered) {
      onActionTriggered(isTabNavigatingCurrent, action || "click");
    }

    if (triggerAltAfterAction) {
      // due to react being slow better to put it in a timeout
      triggerAltCycle(isTabNavigatingCurrent);
    }
  }

  public render() {
    const Element = (this.props.component || "div") as any;
    return (
      <Element
        style={{ display: "contents" }}
        className={this.props.className}
        ref={this.containerRef}
        data-alt-reactioner={true}
        data-priority={this.props.priority || 0}
        lang={this.props.lang}
        {...this.props.componentProps}
      >
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
            priority={typeof props.priority === "string" ? props.priority : (props.priority || 0) + v.amount}
            disabled={props.disabled || v.disable}
            ref={ref}
          />
        );
      }}
    </AltPriorityShifterContext.Consumer>
  );
});

export default AltReactioner;