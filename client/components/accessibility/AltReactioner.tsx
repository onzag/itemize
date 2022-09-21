/**
 * The alt reactioner is an accessibility utility to be used to enable
 * accessibility to provide navigation using only the keyboard, this also
 * enables voice recognition software to use the application even for
 * users without hands
 * 
 * @module
 */

import React, { ForwardedRef } from "react";
import { showRelevant } from "./AltScroller";
import { AltPriorityShifterContext } from "./AltPriorityShifter"

export interface IAltBaseProps {
  /**
   * The wrapping component to use, by default it will use a div
   */
  component?: string;
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
}

export interface IAltReactionerProps extends IAltBaseProps {
  /**
   * The children that is to be rendered inside
   */
  children: (displayed: boolean) => React.ReactNode;
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
}

interface IActualAltReactionerState {
  displayed: boolean;
}

const ALT_REGISTRY: {
  flow: ActualAltBase<any, any>[];
  activeFlow: ActualAltBase<any, any>[];
  activeFlowFocusIndex: number;
  activeFlowPriority: number;
  actions: {
    [reactionKey: string]: ActualAltReactioner[];
  },
  isDisplayingActions: ActualAltReactioner[];
  displayedActionsFocusIndex: number;
  displayedActionsPriority: number;
  awaitingKeycodes: ActualAltReactioner[];
  awaitingKeycodesFocusIndex: number;
  lastFocusedActionSignatures: { [priorityKey: number]: string };
  lastFocusedFlowSignatures: { [priorityKey: number]: string };
} = {
  flow: [],
  activeFlow: null,
  activeFlowFocusIndex: -1,
  activeFlowPriority: null,
  actions: {},
  isDisplayingActions: null,
  displayedActionsFocusIndex: -1,
  displayedActionsPriority: null,
  awaitingKeycodes: null,
  awaitingKeycodesFocusIndex: -1,
  lastFocusedActionSignatures: {},
  lastFocusedFlowSignatures: {},
};

function hideAll(butKeycodes: ActualAltReactioner[] = []) {
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

function showDisplayElements(priorityToUse: number) {
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
      } else if (v.isDisplayed()) {
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

      v.display();
      displayElements.push(v);
    });
  });

  displayElements.sort((a, b) => a.isBefore(b) ? -1 : 1);

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
}

function triggerBasedOn(code: string, shiftKey: boolean, callbackIfmatch: () => void) {
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

      // make sure that there are tabbable components not to enter an infinite loop
      if (!ALT_REGISTRY.awaitingKeycodes.some((e) => e.isTabbale() && !e.isUsedInFlow())) {
        // break it and stop it now
        callbackIfmatch();
        return;
      }

      let nextElement = ALT_REGISTRY.awaitingKeycodes[nextIndex];
      while (!nextElement.isTabbale()) {
        nextIndex = ((nextIndex + len + (!shiftKey ? 1 : -1))) % len;
        nextElement = ALT_REGISTRY.awaitingKeycodes[nextIndex];
      }
      // the index should be fine now and pointing to the next tabbable component

      nextElement.focus();
      if (!nextElement.isElementInView()) {
        nextElement.getElement().scrollIntoView({ behavior: "smooth" });
      }
      ALT_REGISTRY.awaitingKeycodesFocusIndex = nextIndex;
      ALT_REGISTRY.lastFocusedActionSignatures[ALT_REGISTRY.displayedActionsPriority] = nextElement.getSignature();
    } else if (ALT_REGISTRY.isDisplayingActions) {
      const len = ALT_REGISTRY.isDisplayingActions.length;
      let nextIndex = ((ALT_REGISTRY.displayedActionsFocusIndex + len + (!shiftKey ? 1 : -1))) % len;

      if (ALT_REGISTRY.displayedActionsFocusIndex === -1) {
        // let's check if we are already focused in one of the elements that are relevant
        // so we can go directly to the next one
        const alreadyFocusedAtIndex =
          ALT_REGISTRY.isDisplayingActions.findIndex((e) => e.isTabbale() && !e.isUsedInFlow() && e.getElement() === document.activeElement);

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

      // make sure that there are tabbable components not to enter an infinite loop
      if (!ALT_REGISTRY.isDisplayingActions.some((e) => e.isTabbale() && !e.isUsedInFlow())) {
        // break it and stop it now
        callbackIfmatch();
        return;
      }

      let nextElement = ALT_REGISTRY.isDisplayingActions[nextIndex];
      while (!(nextElement.isTabbale() || nextElement.isUsedInFlow())) {
        nextIndex = ((nextIndex + len + (!shiftKey ? 1 : -1))) % len;
        nextElement = ALT_REGISTRY.isDisplayingActions[nextIndex];
      }
      // the index should be fine now and pointing to the next tabbable component

      nextElement.focus();
      if (!nextElement.isElementInView()) {
        nextElement.getElement().scrollIntoView({ behavior: "smooth" });
      }
      ALT_REGISTRY.displayedActionsFocusIndex = nextIndex;
      ALT_REGISTRY.lastFocusedActionSignatures[ALT_REGISTRY.displayedActionsPriority] = nextElement.getSignature();
    } else if (ALT_REGISTRY.activeFlow) {
      const len = ALT_REGISTRY.activeFlow.length;
      let nextIndex = ((ALT_REGISTRY.activeFlowFocusIndex + len + (!shiftKey ? 1 : -1))) % len;

      if (ALT_REGISTRY.activeFlowFocusIndex === -1) {
        // let's check if we are already focused in one of the elements that are relevant
        // so we can go directly to the next one
        const alreadyFocusedAtIndex =
          ALT_REGISTRY.activeFlow.findIndex((e) => e.isTabbale() && e.getElement() === document.activeElement);

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
      if (!ALT_REGISTRY.activeFlow.some((e) => e.isTabbale())) {
        // break it and stop it now
        callbackIfmatch();
        return;
      }

      let nextElement = ALT_REGISTRY.activeFlow[nextIndex];
      while (!nextElement.isTabbale()) {
        nextIndex = ((nextIndex + len + (!shiftKey ? 1 : -1))) % len;
        nextElement = ALT_REGISTRY.isDisplayingActions[nextIndex];
      }
      // the index should be fine now and pointing to the next tabbable component

      nextElement.focus();
      if (!nextElement.isElementInView()) {
        nextElement.getElement().scrollIntoView({ behavior: "smooth" });
      }
      ALT_REGISTRY.activeFlowFocusIndex = nextIndex;
      ALT_REGISTRY.lastFocusedFlowSignatures[ALT_REGISTRY.activeFlowPriority] = nextElement.getSignature();
    }

    callbackIfmatch();
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
    showRelevant();
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
    ALT_REGISTRY[code];

  const matches: ActualAltReactioner[] = []
  if (value) {
    if (Array.isArray(value)) {
      value.forEach((k) => {
        if (k.isDisplayed()) {
          matches.push(k);
        }
      });
    } else {
      if (value.isDisplayed()) {
        matches.push(value);
      }
    }
  }

  if (matches.length) {
    callbackIfmatch();
  }

  // one or zero matches
  if (matches.length <= 1) {
    const isTabNavigatingCurrent = !!ALT_REGISTRY.isDisplayingActions.find((v) => v.getElement() === document.activeElement);
    hideAll();
    matches.forEach((m) => m.trigger(isTabNavigatingCurrent));
  } else {
    matches.sort((a, b) => a.isBefore(b) ? -1 : 1);
    hideAll(matches);
    matches.forEach((m, index) => {
      let ambigousId = index % 9;
      ambigousId++;
      const plusCount = Math.floor(index / 9);
      m.triggerAmbiguous(false, ambigousId, plusCount);
    });
    showRelevant();
  }
}

const arrows = [
  "arrowup",
  "arrowleft",
  "arrowright",
  "arrowdown",
];

if (typeof document !== "undefined") {
  window.addEventListener("focus", () => {
    hideAll();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      hideAll();
    }
  });
  document.addEventListener("keydown", (e) => {
    // some special events don't have this
    if (!e.code) {
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
      if (isPureAltKey) {
        if (ALT_REGISTRY.isDisplayingActions) {
          // pressing alt again
          hideAll();
          calculateActiveFlow();
        } else {
          // pressing alt with nothing displayed
          const activeFlowPriority = calculateActiveFlow();
          const displayElementsPriority = calculatePriorityOfDisplayElements();

          showDisplayElements(activeFlowPriority > displayElementsPriority ? activeFlowPriority : displayElementsPriority);
        }
      } else if (isTab) {
        const activeFlowPriority = calculateActiveFlow();

        if (!ALT_REGISTRY.isDisplayingActions) {
          // pressing tab with nothing displayed
          const displayElementsPriority = calculatePriorityOfDisplayElements();

          if (displayElementsPriority > activeFlowPriority) {
            showDisplayElements(displayElementsPriority);
          }
        }

        triggerBasedOn(keyCode, e.shiftKey, () => {
          e.stopPropagation();
          e.preventDefault();
        });
      }
    } else if (!isArrow && (isAltKey || ALT_REGISTRY.isDisplayingActions)) {
      // if a match is found we want to prevent the default action
      triggerBasedOn(keyCode, e.shiftKey, () => {
        e.stopPropagation();
        e.preventDefault();
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

export class ActualAltBase<P extends IAltBaseProps, S> extends React.PureComponent<P, S> {
  public containerRef: React.RefObject<HTMLElement>;

  constructor(props: P) {
    super(props);

    this.containerRef = React.createRef<HTMLElement>();
  }

  public isTabbale() {
    return typeof this.props.tabbable === "boolean" ? this.props.tabbable : true;
  }

  public getPriority() {
    return this.props.priority || 0;
  }

  public isDisabled() {
    return this.props.disabled || false;
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
    const selfClientRect = this.getElement().getBoundingClientRect();
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
  }
}

export class ActualAltReactioner extends ActualAltBase<IAltReactionerProps, IActualAltReactionerState> {
  constructor(props: IAltReactionerProps) {
    super(props);

    this.state = {
      displayed: false,
    }

    this.triggerAltCycle = this.triggerAltCycle.bind(this);
  }

  public isUsedInFlow() {
    return !!this.props.useInFlow;
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
      return element;
    }
  }

  public unregister(props: IAltReactionerProps = this.props) {
    if (props.useInFlow) {
      super.unregister(props);
    }

    if (ALT_REGISTRY[props.reactionKey]) {
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
    } else if (!ALT_REGISTRY[props.reactionKey].includes(this)) {
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
      this.display();
    }
  }

  componentDidUpdate(prevProps: IAltReactionerProps) {
    if (this.state.displayed && this.props.disabled) {
      this.setState({
        displayed: false,
      });
    }

    if (this.props.reactionKey !== prevProps.reactionKey) {
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
      this.setState({
        displayed: true,
      });
    }
  }

  public hide() {
    if (this.state.displayed) {
      this.setState({
        displayed: false,
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
    if (isTabNavigatingCurrent) {
      // because we were tab navigating before we want to tab navigate
      // the new cycle too and ensure something is selected
      triggerBasedOn("tab", false, () => { });
    }
    showRelevant();
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
        {this.props.children(this.state.displayed)}
      </Element>
    );
  }
}

const AltReactioner = React.forwardRef((props: IAltReactionerProps, ref: ForwardedRef<ActualAltReactioner>) => {
  return (
    <AltPriorityShifterContext.Consumer>
      {(v) => {
        return (
          <ActualAltReactioner {...props} priority={(props.priority || 0) + v} ref={ref} />
        );
      }}
    </AltPriorityShifterContext.Consumer>
  );
});

export default AltReactioner;