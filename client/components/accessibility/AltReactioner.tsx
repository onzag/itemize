/**
 * The alt reactioner is an accessibility utility to be used to enable
 * accessibility to provide navigation using only the keyboard, this also
 * enables voice recognition software to use the application even for
 * users without hands
 * 
 * @module
 */

import React, { RefObject } from "react";
import { showRelevant } from "./AltScroller";
import { AltPriorityShifterContext } from "./AltPriorityShifter"

export interface IAltReactionerProps {
  /**
   * The children that is to be rendered inside
   */
  children: (displayed: boolean) => React.ReactNode;
  /**
   * The wrapping component to use, by default it will use a div
   */
  component?: string;
  /**
   * a css selector to choose the component that is relevant that the
   * user is supposed to interact with, by default it will simply pick the element itself
   * as its first child node
   */
  selector?: string;
  /**
   * how many times to go up in the parent node before selecting, rather than selecting
   * the current element
   */
  selectorGoUp?: number;
  /**
   * The key to be used that will trigger the specific action,
   * please use keycodes in lowercase, they need to be lowercase
   * 
   * avoid using arrowup, arrowright, arrowleft or arrowdown as they are used
   * by the AltReactioner component
   */
  reactionKey: string;
  /**
   * The action to be executed, by default it will click the component, other actions are focus
   * otherwise pass a function for a custom action
   * 
   * focus will focus the element
   * click will click the element
   */
  action?: "focus" | "click"
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
   * A positioning within the group in order to solve ambiguous reactions and perform
   * tab navigation
   */
  groupPosition: number;
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

interface IActualAltReactionerState {
  displayed: boolean;
}

const ALT_REGISTRY: {
  [reactionKey: string]: ActualAltReactioner[]
} = {};

let ALT_REGISTRY_IS_IN_DISPLAY_LAST = false;
let ALT_REGISTRY_IS_IN_DISPLAY_ELEMENTS: ActualAltReactioner[] = [];
let ALT_REGISTRY_IS_IN_DISPLAY_ELEMENTS_FOCUS_INDEX: number = -1;
let ALT_REGISTRY_IS_IN_DISPLAY_PRIORITY: number = null;
let ALT_REGISTRY_IS_WAITING_FOR_KEYCODES = false;
let ALT_REGISTRY_AWAITING_KEYCODES: ActualAltReactioner[] = [];
let ALT_REGISTRY_AWAITING_KEYCODES_FOCUS_INDEX: number = -1;
let ALT_REGISTRY_LAST_FOCUSED_SIGNATURE: { [priorityKey: number]: string } = {};

function hideAll(butKeycodes: ActualAltReactioner[] = []) {
  Object.keys(ALT_REGISTRY).forEach((reactionKey) => {
    ALT_REGISTRY[reactionKey].forEach((v) => {
      if (!butKeycodes.includes(v)) {
        v.hide();
      }
    });
  });

  ALT_REGISTRY_AWAITING_KEYCODES.forEach((v) => {
    v.triggerAmbiguousClear();
  });

  // clear everything we don't enter keycodes mode
  if (!butKeycodes.length) {
    ALT_REGISTRY_IS_IN_DISPLAY_LAST = false;
    ALT_REGISTRY_IS_IN_DISPLAY_ELEMENTS = [];
    ALT_REGISTRY_IS_IN_DISPLAY_ELEMENTS_FOCUS_INDEX = -1;
    ALT_REGISTRY_IS_IN_DISPLAY_PRIORITY = null;
    ALT_REGISTRY_IS_WAITING_FOR_KEYCODES = false;
    ALT_REGISTRY_AWAITING_KEYCODES = [];
    ALT_REGISTRY_AWAITING_KEYCODES_FOCUS_INDEX = -1;
  } else {
    // enter keycodes mode
    ALT_REGISTRY_IS_WAITING_FOR_KEYCODES = true;
    ALT_REGISTRY_AWAITING_KEYCODES = butKeycodes;
    ALT_REGISTRY_AWAITING_KEYCODES_FOCUS_INDEX = -1;
  }
}

function showAllRelevant() {
  // first lets find the potential max priority
  let priorityToUse = 0;
  Object.keys(ALT_REGISTRY).forEach((reactionKey) => {
    ALT_REGISTRY[reactionKey].forEach((v) => {
      if (!v.isDisabled() && v.getPriority() > priorityToUse) {
        priorityToUse = v.getPriority();
      }
    });
  });

  const results: {
    [reactionKey: string]: ActualAltReactioner[]
  } = {};
  Object.keys(ALT_REGISTRY).forEach((reactionKey) => {
    ALT_REGISTRY[reactionKey].forEach((v) => {
      if (!v.isDisabled() && v.getPriority() === priorityToUse) {
        if (!results[reactionKey]) {
          results[reactionKey] = [v];
        } else {
          results[reactionKey].push(v);
        }
      } else if (v.isDisplayed()) {
        v.hide();
      }
    });
  });

  const displayElements: ActualAltReactioner[] = [];
  Object.keys(results).forEach((reactionKey) => {
    results[reactionKey].sort((a, b) => a.getGroupPosition() - b.getGroupPosition());
    results[reactionKey].forEach((v, index, arr) => {
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

  displayElements.sort((a, b) => a.getGroupPosition() - b.getGroupPosition());

  ALT_REGISTRY_IS_IN_DISPLAY_LAST = true;
  ALT_REGISTRY_IS_IN_DISPLAY_ELEMENTS = displayElements;
  ALT_REGISTRY_IS_IN_DISPLAY_PRIORITY = priorityToUse;
  ALT_REGISTRY_IS_IN_DISPLAY_ELEMENTS_FOCUS_INDEX = -1;
  ALT_REGISTRY_IS_WAITING_FOR_KEYCODES = false;
  ALT_REGISTRY_AWAITING_KEYCODES = [];
}

function triggerBasedOn(code: string, shiftKey: boolean, callbackIfmatch: () => void) {
  if (code === "shift") {
    return;
  } else if (code === "tab") {
    if (ALT_REGISTRY_IS_WAITING_FOR_KEYCODES) {
      const len = ALT_REGISTRY_AWAITING_KEYCODES.length;
      let nextIndex = ((ALT_REGISTRY_AWAITING_KEYCODES_FOCUS_INDEX + len + (!shiftKey ? 1 : -1))) % len;

      if (ALT_REGISTRY_AWAITING_KEYCODES_FOCUS_INDEX === -1) {
        const potentialNextIndex =
          ALT_REGISTRY_AWAITING_KEYCODES.findIndex((e) => e.getSignature() === ALT_REGISTRY_LAST_FOCUSED_SIGNATURE[ALT_REGISTRY_IS_IN_DISPLAY_PRIORITY]);
        if (potentialNextIndex !== -1) {
          nextIndex = potentialNextIndex;
        } else {
          nextIndex = 0;
        }
      }

      // make sure that there are tabbable components not to enter an infinite loop
      if (!ALT_REGISTRY_AWAITING_KEYCODES.some((e) => e.isTabbale())) {
        // break it and stop it now
        callbackIfmatch();
        return;
      }

      let nextElement = ALT_REGISTRY_AWAITING_KEYCODES[nextIndex];
      while (!nextElement.isTabbale()) {
        nextIndex = ((nextIndex + len + (!shiftKey ? 1 : -1))) % len;
        nextElement = ALT_REGISTRY_AWAITING_KEYCODES[nextIndex];
      }
      // the index should be fine now and pointing to the next tabbable component

      nextElement.focus();
      if (!nextElement.isElementInView()) {
        nextElement.getElement().scrollIntoView({ behavior: "smooth" });
      }
      ALT_REGISTRY_AWAITING_KEYCODES_FOCUS_INDEX = nextIndex;
      ALT_REGISTRY_LAST_FOCUSED_SIGNATURE[ALT_REGISTRY_IS_IN_DISPLAY_PRIORITY] = nextElement.getSignature();
    } else {
      const len = ALT_REGISTRY_IS_IN_DISPLAY_ELEMENTS.length;
      let nextIndex = ((ALT_REGISTRY_IS_IN_DISPLAY_ELEMENTS_FOCUS_INDEX + len + (!shiftKey ? 1 : -1))) % len;

      if (ALT_REGISTRY_IS_IN_DISPLAY_ELEMENTS_FOCUS_INDEX === -1) {
        // let's check if we are already focused in one of the elements that are relevant
        // so we can go directly to the next one
        const alreadyFocusedAtIndex =
          ALT_REGISTRY_IS_IN_DISPLAY_ELEMENTS.findIndex((e) => e.isTabbale() && e.getElement() === document.activeElement);

        if (alreadyFocusedAtIndex !== -1) {
          nextIndex = ((alreadyFocusedAtIndex + len + (!shiftKey ? 1 : -1))) % len;
        } else {
          // this is for first time focus or when we have pressed tab and none of the potential elements
          // are active in our list
          const potentialNextIndex =
            ALT_REGISTRY_IS_IN_DISPLAY_ELEMENTS.findIndex((e) => e.getSignature() === ALT_REGISTRY_LAST_FOCUSED_SIGNATURE[ALT_REGISTRY_IS_IN_DISPLAY_PRIORITY]);
          if (potentialNextIndex !== -1) {
            nextIndex = potentialNextIndex;
          } else {
            nextIndex = 0;
          }
        }
      }

      // make sure that there are tabbable components not to enter an infinite loop
      if (!ALT_REGISTRY_IS_IN_DISPLAY_ELEMENTS.some((e) => e.isTabbale())) {
        // break it and stop it now
        callbackIfmatch();
        return;
      }

      let nextElement = ALT_REGISTRY_IS_IN_DISPLAY_ELEMENTS[nextIndex];
      while (!nextElement.isTabbale()) {
        nextIndex = ((nextIndex + len + (!shiftKey ? 1 : -1))) % len;
        nextElement = ALT_REGISTRY_IS_IN_DISPLAY_ELEMENTS[nextIndex];
      }
      // the index should be fine now and pointing to the next tabbable component

      nextElement.focus();
      if (!nextElement.isElementInView()) {
        nextElement.getElement().scrollIntoView({ behavior: "smooth" });
      }
      ALT_REGISTRY_IS_IN_DISPLAY_ELEMENTS_FOCUS_INDEX = nextIndex;
      ALT_REGISTRY_LAST_FOCUSED_SIGNATURE[ALT_REGISTRY_IS_IN_DISPLAY_PRIORITY] = nextElement.getSignature();
    }

    callbackIfmatch();
    return;
  }

  // requesting for the remaining options on an overflown list
  // this occurs if there are just too many options available
  // so that the shortcut is overflown
  if (
    ALT_REGISTRY_IS_WAITING_FOR_KEYCODES &&
    code === "+" &&
    ALT_REGISTRY_AWAITING_KEYCODES.length > 9
  ) {
    const cancelledKeycodes = ALT_REGISTRY_AWAITING_KEYCODES.splice(0, 9);
    cancelledKeycodes.forEach((k) => {
      k.hide();
      k.triggerAmbiguousClear();
    });

    ALT_REGISTRY_AWAITING_KEYCODES.forEach((v, index) => {
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
    const relatedActiveElement = ALT_REGISTRY_IS_IN_DISPLAY_ELEMENTS.find((v) => v.getElement() === document.activeElement);
    if (relatedActiveElement && relatedActiveElement.props.action !== "focus") {
      callbackIfmatch();
      hideAll();
      relatedActiveElement.trigger(true);
      return;
    }
  }

  const value = ALT_REGISTRY_IS_WAITING_FOR_KEYCODES ?
    // can be nan if not a number but who minds that
    ALT_REGISTRY_AWAITING_KEYCODES[parseInt(code) - 1] :
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
    const isTabNavigatingCurrent = !!ALT_REGISTRY_IS_IN_DISPLAY_ELEMENTS.find((v) => v.getElement() === document.activeElement);
    hideAll();
    matches.forEach((m) => m.trigger(isTabNavigatingCurrent));
  } else {
    matches.sort((a, b) => a.getGroupPosition() - b.getGroupPosition());
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
    const keyCode = e.key.toLowerCase();
    const isArrow = arrows.includes(keyCode);
    const isAltKey = e.altKey;
    const isTab = keyCode === "tab";

    const isPureAltKey = isAltKey && keyCode === "alt";

    if (isPureAltKey || (!ALT_REGISTRY_IS_IN_DISPLAY_LAST && isTab)) {
      if (ALT_REGISTRY_IS_IN_DISPLAY_LAST) {
        hideAll();
      } else {
        showAllRelevant();

        if (isTab) {
          triggerBasedOn(keyCode, e.shiftKey, () => {
            e.stopPropagation();
            e.preventDefault();
          });
        }
      }
    } else if (!isArrow && (isAltKey || ALT_REGISTRY_IS_IN_DISPLAY_LAST)) {
      // if a match is found we want to prevent the default action
      triggerBasedOn(keyCode, e.shiftKey, () => {
        e.stopPropagation();
        e.preventDefault();
      });
    }
  });
  window.addEventListener("resize", () => {
    hideAll();
  });
  window.addEventListener("mousedown", () => {
    hideAll();
  });
  window.addEventListener("touchstart", () => {
    hideAll();
  });
}

export class ActualAltReactioner extends React.PureComponent<IAltReactionerProps, IActualAltReactionerState> {
  private containerRef: React.RefObject<HTMLElement>;

  constructor(props: IAltReactionerProps) {
    super(props);

    this.state = {
      displayed: false,
    }

    this.containerRef = React.createRef<HTMLElement>();

    this.triggerAltCycle = this.triggerAltCycle.bind(this);
  }

  public isTabbale() {
    return typeof this.props.tabbable === "boolean" ? this.props.tabbable : true;
  }

  public unregister(props: IAltReactionerProps = this.props) {
    if (ALT_REGISTRY[props.reactionKey]) {
      const index = ALT_REGISTRY[props.reactionKey].findIndex((e) => e === this);
      if (index !== -1) {
        ALT_REGISTRY[props.reactionKey].splice(index, 1);
      }
    }

    // HANDLE DISSAPEARING ELEMENTS IN THE MIDDLE OF THE ACTION
    // THIS SHOULDNT HAPPEN BUT CAN HAPPEN IF MISDESIGNED
    // WHICH CAN CAUSE AN ISSUE WHEN THE REACTIONER TRIES TO FOCUS
    // THINGS THAT DONT EXIST
    const index2 = ALT_REGISTRY_IS_IN_DISPLAY_ELEMENTS.findIndex((e) => e === this);
    if (index2 !== -1) {
      // this can be undefined because of -1
      const currentSelectedElem = ALT_REGISTRY_IS_IN_DISPLAY_ELEMENTS[ALT_REGISTRY_IS_IN_DISPLAY_ELEMENTS_FOCUS_INDEX];
      ALT_REGISTRY_IS_IN_DISPLAY_ELEMENTS.splice(index2, 1);
      // but we are okay with that because that will give a -1 back here
      ALT_REGISTRY_IS_IN_DISPLAY_ELEMENTS_FOCUS_INDEX = ALT_REGISTRY_IS_IN_DISPLAY_ELEMENTS.findIndex((e) => e === currentSelectedElem);
    }

    const index3 = ALT_REGISTRY_AWAITING_KEYCODES.findIndex((e) => e === this);
    if (index3 !== -1) {
      // this can be undefined because of -1
      const currentSelectedElem = ALT_REGISTRY_AWAITING_KEYCODES[ALT_REGISTRY_AWAITING_KEYCODES_FOCUS_INDEX];
      ALT_REGISTRY_AWAITING_KEYCODES.splice(index3, 1);
      // but we are okay with that because that will give a -1 back here
      ALT_REGISTRY_AWAITING_KEYCODES_FOCUS_INDEX = ALT_REGISTRY_AWAITING_KEYCODES.findIndex((e) => e === currentSelectedElem);
    }
  }

  public register(props: IAltReactionerProps = this.props) {
    if (!ALT_REGISTRY[props.reactionKey]) {
      ALT_REGISTRY[props.reactionKey] = [this];
    } else if (!ALT_REGISTRY[props.reactionKey].includes(this)) {
      ALT_REGISTRY[props.reactionKey].push(this);
    }

    if (
      ALT_REGISTRY_IS_IN_DISPLAY_LAST &&
      !ALT_REGISTRY_IS_WAITING_FOR_KEYCODES &&
      ALT_REGISTRY_IS_IN_DISPLAY_PRIORITY === (props.priority || 0) &&
      !ALT_REGISTRY_IS_IN_DISPLAY_ELEMENTS.includes(this)
    ) {
      ALT_REGISTRY_IS_IN_DISPLAY_ELEMENTS.push(this);
      ALT_REGISTRY_IS_IN_DISPLAY_ELEMENTS.sort((a, b) => a.getGroupPosition() - b.getGroupPosition());
      this.display();
    }
  }

  componentDidMount() {
    this.register();
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

  componentWillUnmount() {
    this.unregister();
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
      return null;
    }

    let elementRootSelect = this.containerRef.current;

    if (this.props.selectorGoUp) {
      for (let i = 0; i < this.props.selectorGoUp; i++) {
        elementRootSelect = elementRootSelect.parentNode as HTMLElement;
      }
    }

    if (this.props.selectorGoUp && !this.props.selector) {
      return elementRootSelect;
    } else {
      const element = this.props.selector ?
        elementRootSelect.querySelector(this.props.selector) :
        elementRootSelect.childNodes[0] as HTMLElement;
      return element;
    }
  }

  public isDisplayed() {
    return this.state.displayed;
  }

  public getGroupPosition() {
    return this.props.groupPosition;
  }

  public getSignature() {
    return (
      (this.props.priority || 0).toString() + "." +
      (this.props.action || "click").toString() + "." +
      this.props.reactionKey.toString() + "." +
      this.props.groupPosition.toString()
    );
  }

  public triggerAmbiguous(expected: boolean, id: number, plusCount: number) {
    return this.props.onAmbiguousReaction(expected, id, plusCount)
  }

  public triggerAmbiguousClear() {
    return this.props.onAmbiguousClear();
  }

  public triggerAltCycle(isTabNavigatingCurrent: boolean) {
    showAllRelevant();
    if (isTabNavigatingCurrent) {
      // because we were tab navigating before we want to tab navigate
      // the new cycle too and ensure something is selected
      triggerBasedOn("tab", false, () => {});
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
      <Element style={{ display: "contents" }} ref={this.containerRef}>
        {this.props.children(this.state.displayed)}
      </Element>
    );
  }
}

const AltReactioner = React.forwardRef((props: IAltReactionerProps, ref: RefObject<ActualAltReactioner>) => {
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