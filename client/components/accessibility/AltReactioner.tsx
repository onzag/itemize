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
   * The key to be used that will trigger the specific action
   */
  reactionKey: string;
  /**
   * The action to be executed, by default it will click the component, other actions are focus
   * otherwise pass a function for a custom action
   */
  action?: "focus" | "click" | VoidFn;
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
}

interface IAltReactionerState {
  displayed: boolean;
}

const ALT_REGISTRY: {
  [reactionKey: string]: AltReactioner[]
} = {};

let ALT_REGISTRY_IS_IN_DISPLAY_LAST = false;

function hideAll() {
  Object.keys(ALT_REGISTRY).forEach((reactionKey) => {
    ALT_REGISTRY[reactionKey].forEach((v) => v.hide());
  });
  ALT_REGISTRY_IS_IN_DISPLAY_LAST = false;
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
      }
    });
  });
  ALT_REGISTRY_IS_IN_DISPLAY_LAST = true;
}

function triggerBasedOn(code: string, callbackIfmatch: () => void) {
  const value = ALT_REGISTRY[code];
  let cb = callbackIfmatch;
  if (value) {
    value.forEach((k) => {
      if (k.isDisplayed()) {

        // to make sure we call it only once
        cb && cb();
        cb = null as any;

        k.trigger();
      }
    });
  }
  hideAll();
}

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
    const isAltKey = e.altKey;

    const isPureAltKey = isAltKey && keyCode === "alt";

    if (isPureAltKey) {
      if (ALT_REGISTRY_IS_IN_DISPLAY_LAST) {
        hideAll();
      } else {
        showAllRelevant();
      }
    } else if (isAltKey || ALT_REGISTRY_IS_IN_DISPLAY_LAST) {
      // if a match is found we want to prevent the default action
      triggerBasedOn(keyCode, () => {
        e.stopPropagation();
        e.preventDefault();
      });
    }
  });
  window.addEventListener("resize", () => {
    hideAll();
  });
  window.addEventListener("scroll", () => {
    hideAll();
  });
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
    } else {
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

  public trigger() {
    const element = this.getElement();
    if (!element) {
      return;
    }

    if (!this.props.action || this.props.action === "click") {
      console.log(element);
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