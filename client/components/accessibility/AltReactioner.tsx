/**
 * The alt reactioner is an accessibility utility to be used to enable
 * accessibility to provide navigation using only the keyboard, this also
 * enables voice recognition software to use the application even for
 * users without hands
 * 
 * @module
 */

import React from "react";

type VoidFn = (element: HTMLElement) => void;

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
   * by the AltScroller component
   */
  reactionKey: string;
  /**
   * The action to be executed, by default it will click the component, other actions are focus
   * otherwise pass a function for a custom action
   */
  action?: "focus" | "click" | VoidFn;
  /**
   * Triggers when two reactions with the same id are found
   * and provides a numeric id that represents the next number caught
   * which shall be from 1 to 9
   * 
   * higher numbers are possible but represent an accessibility flaw and cannot
   * truly be accessed
   */
  onAmbiguousReaction: (id: number) => void;
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
   * A positioning within the group in order to solve ambiguous reactions, the lowest
   * it will be used for sorting, use it if you expect ambigous values
   */
  groupPosition?: number;
}

interface IAltReactionerState {
  displayed: boolean;
}

const ALT_REGISTRY: {
  [reactionKey: string]: AltReactioner[]
} = {};

let ALT_REGISTRY_IS_IN_DISPLAY_LAST = false;
let ALT_REGISTRY_IS_WAITING_FOR_KEYCODES = false;
let ALT_REGISTRY_AWAITING_KEYCODES: AltReactioner[] = [];

function hideAll(butKeycodes: AltReactioner[] = []) {
  Object.keys(ALT_REGISTRY).forEach((reactionKey) => {
    ALT_REGISTRY[reactionKey].forEach((v) => !butKeycodes.includes(v) ? v.hide() : null);
  });

  ALT_REGISTRY_AWAITING_KEYCODES.forEach((v) => {
    v.triggerAmbiguousClear();
  });

  if (!butKeycodes.length) {
    ALT_REGISTRY_IS_IN_DISPLAY_LAST = false;
    ALT_REGISTRY_IS_WAITING_FOR_KEYCODES = false;
    ALT_REGISTRY_AWAITING_KEYCODES = [];
  } else {
    ALT_REGISTRY_IS_WAITING_FOR_KEYCODES = true;
    ALT_REGISTRY_AWAITING_KEYCODES = butKeycodes;
  }
}

function recalculateAllRelevant() {
  if (ALT_REGISTRY_IS_WAITING_FOR_KEYCODES) {
    hideAll();
    showAllRelevant();
  } else if (ALT_REGISTRY_IS_IN_DISPLAY_LAST) {
    showAllRelevant();
  }
}

function showAllRelevant() {
  // first lets find the potential max priority
  let priorityToUse = 0;
  Object.keys(ALT_REGISTRY).forEach((reactionKey) => {
    ALT_REGISTRY[reactionKey].forEach((v) => {
      if (!v.isDisabled() && v.getPriority() > priorityToUse && v.isElementInView()) {
        priorityToUse = v.getPriority();
      }
    });
  });

  Object.keys(ALT_REGISTRY).forEach((reactionKey) => {
    ALT_REGISTRY[reactionKey].forEach((v) => {
      if (!v.isDisabled() && v.getPriority() === priorityToUse && v.isElementInView()) {
        v.display();
      } else if (v.isDisplayed()) {
        v.hide();
      }
    });
  });
  ALT_REGISTRY_IS_IN_DISPLAY_LAST = true;
  ALT_REGISTRY_IS_WAITING_FOR_KEYCODES = false;
  ALT_REGISTRY_AWAITING_KEYCODES = [];
}

function triggerBasedOn(code: string, callbackIfmatch: () => void) {
  const value = ALT_REGISTRY_IS_WAITING_FOR_KEYCODES ?
    // can be nan if not a number but who minds that
    ALT_REGISTRY_AWAITING_KEYCODES[parseInt(code) - 1] :
    ALT_REGISTRY[code];
  const matches: AltReactioner[] = []
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
    hideAll();
    matches.forEach((m) => m.trigger());
  } else {
    hideAll(matches);
    matches.sort((a, b) => a.getGroupPosition() - b.getGroupPosition());
    matches.forEach((m, index) => m.triggerAmbiguous(index + 1));
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

    const isPureAltKey = isAltKey && keyCode === "alt";

    if (isPureAltKey) {
      if (ALT_REGISTRY_IS_IN_DISPLAY_LAST) {
        hideAll();
      } else {
        showAllRelevant();
      }
    } else if (!isArrow && (isAltKey || ALT_REGISTRY_IS_IN_DISPLAY_LAST)) {
      // if a match is found we want to prevent the default action
      triggerBasedOn(keyCode, () => {
        e.preventDefault();
      });
    }
  });
  window.addEventListener("resize", () => {
    hideAll();
  });
  window.addEventListener("scroll", () => {
    recalculateAllRelevant();
  }, true);
  window.addEventListener("mousedown", () => {
    hideAll();
  });
  window.addEventListener("touchstart", () => {
    hideAll();
  });
}

export default class AltReactioner extends React.PureComponent<IAltReactionerProps, IAltReactionerState> {
  private containerRef: React.RefObject<HTMLElement>;

  constructor(props: IAltReactionerProps) {
    super(props);

    this.state = {
      displayed: false,
    }

    this.containerRef = React.createRef<HTMLElement>();
  }

  public unregister(props: IAltReactionerProps = this.props) {
    if (ALT_REGISTRY[props.reactionKey]) {
      const index = ALT_REGISTRY[props.reactionKey].findIndex((e) => e === this);
      if (index !== -1) {
        ALT_REGISTRY[props.reactionKey].splice(index, 1);
      }
    }
  }

  public register(props: IAltReactionerProps = this.props) {
    if (!ALT_REGISTRY[props.reactionKey]) {
      ALT_REGISTRY[props.reactionKey] = [this];
    } else if (!ALT_REGISTRY[props.reactionKey].includes(this)) {
      ALT_REGISTRY[props.reactionKey].push(this);
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
      this.unregister();
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
    return this.props.groupPosition || Number.MAX_SAFE_INTEGER;
  }

  public triggerAmbiguous(id: number) {
    return this.props.onAmbiguousReaction(id)
  }

  public triggerAmbiguousClear() {
    return this.props.onAmbiguousClear();
  }

  public trigger() {
    const element = this.getElement();
    if (!element) {
      return;
    }

    if (!this.props.action || this.props.action === "click") {
      (element as HTMLElement).click();
    } else if (this.props.action === "focus") {
      (element as HTMLElement).focus();
    } else {
      this.props.action(element as HTMLElement);
    }
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