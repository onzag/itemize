import React, { RefObject } from "react";
import { AltPriorityShifterContext } from "./AltPriorityShifter";

interface IAltScrollerProps {
  /**
   * The priority of the selector
   */
  priority?: number;
  /**
   * wether it is disabled right now
   */
  disabled?: boolean;
  /**
   * Will select the scrollable box as the parent that matches the given
   * css selector, otherwise it will use the first parent
   */
  parentSelector?: string;

  /**
   * Will select the scrollable box based on a child, can be combined with parent
   */
  childSelector?: string;

  /**
   * Triggers when the scroll has been recalculated because the window
   * has changed size
   */
  onResize?: () => void;

  /**
   * Pass as children in order to build the UI of choice
   */
  children: (isScrolling: boolean, scrollDirections?: { up: boolean; left: boolean; right: boolean; down: boolean }) => React.ReactNode;
}

interface IActualAltScrollerState {
  isScrolling: boolean;
  canScrollTop: boolean;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  canScrollBottom: boolean;
}

const ALT_SREGISTRY: ActualAltScroller[] = [];

let ALT_SREGISTRY_IS_IN_DISPLAY_LAST = false;

function hideAll() {
  ALT_SREGISTRY.forEach((v) => {
    v.disableScrolling();
  });

  ALT_SREGISTRY_IS_IN_DISPLAY_LAST = false;
}

function scrollCurrent(dir: "up" | "left" | "right" | "down", cb?: () => void) {
  ALT_SREGISTRY.forEach((v) => {
    if (v.isScrolling()) {
      v.scroll(dir);
      cb();
    }
  });
}

const converts = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
}

export function showRelevant() {
  // first lets find the potential max priority
  let scrollerToTrigger: ActualAltScroller = null as any;
  ALT_SREGISTRY.forEach((v) => {
    if (!v.isDisabled() && (!scrollerToTrigger || v.getPriority() >= scrollerToTrigger.getPriority())) {
      scrollerToTrigger = v;
    }
  });

  if (scrollerToTrigger) {
    scrollerToTrigger.enableScrolling();
  }

  ALT_SREGISTRY_IS_IN_DISPLAY_LAST = true;
}

function recalculatePotentialScrolls(resize: boolean) {
  ALT_SREGISTRY.forEach((v) => {
    if (v.isScrolling()) {
      v.recalculateScrolls();
      if (resize) {
        v.triggerResize();
      }
    }
  });
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
    // ignore these two
    if (e.key === "Shift" || e.key === "Tab" || e.key === "AltGraph") {
      return;
    }

    const dir = converts[e.key];
    const isAltKey = e.altKey;

    const isPureAltKey = isAltKey && e.key.toLowerCase() === "alt";

    if (isPureAltKey) {
      if (ALT_SREGISTRY_IS_IN_DISPLAY_LAST) {
        hideAll();
      } else {
        showRelevant();
      }
    } else if ((isAltKey || ALT_SREGISTRY_IS_IN_DISPLAY_LAST) && dir) {
      // if a match is found we want to prevent the default action
      scrollCurrent(dir, () => {
        e.preventDefault();
      });
    } else {
      hideAll();
    }
  });
  window.addEventListener("resize", () => {
    recalculatePotentialScrolls(true);
  });
  window.addEventListener("mousedown", () => {
    hideAll();
  });
  window.addEventListener("touchstart", () => {
    hideAll();
  });
  window.addEventListener("scroll", () => {
    recalculatePotentialScrolls(false);
  }, true);
}

export class ActualAltScroller extends React.PureComponent<IAltScrollerProps, IActualAltScrollerState> {
  private spanRef: React.RefObject<HTMLSpanElement>;
  constructor(props: IAltScrollerProps) {
    super(props);

    this.state = {
      canScrollTop: false,
      canScrollBottom: false,
      canScrollLeft: false,
      canScrollRight: false,
      isScrolling: false,
    }

    this.spanRef = React.createRef<HTMLSpanElement>()
  }
  public getPriority() {
    return this.props.priority || 0;
  }

  public isDisabled() {
    return this.props.disabled || false;
  }

  public recalculateScrolls() {
    const element = this.getScrollableComponent();
    const allTheWayToTheBottom = element.scrollTop + element.offsetHeight >= element.scrollHeight;
    const allTheWayToTheTop = element.scrollTop <= 0;

    const allTheWayToTheLeft = element.scrollLeft <= 0;
    const allTheWayToTheRight = element.scrollLeft + element.offsetWidth >= element.scrollWidth;

    this.setState({
      isScrolling: true,
      canScrollBottom: !allTheWayToTheBottom,
      canScrollTop: !allTheWayToTheTop,
      canScrollLeft: !allTheWayToTheLeft,
      canScrollRight: !allTheWayToTheRight,
    });
  }

  public unregister() {
    const index = ALT_SREGISTRY.findIndex((e) => e === this);
    if (index !== -1) {
      ALT_SREGISTRY.splice(index, 1);
    }
  }

  public register() {
    if (!ALT_SREGISTRY.includes(this)) {
      ALT_SREGISTRY.push(this);
    }
  }

  public triggerResize() {
    if (this.props.onResize) {
      this.props.onResize();
    }
  }

  componentDidMount() {
    this.register();
  }

  componentWillUnmount() {
    this.unregister();
  }

  public enableScrolling() {
    this.recalculateScrolls();
  }

  public disableScrolling() {
    this.setState({
      isScrolling: false,
    });
  }

  public getScrollableComponent() {
    let element = this.spanRef.current as HTMLElement;

    if (this.props.parentSelector) {
      element = element.closest(this.props.parentSelector) as HTMLElement;
    } else {
      element = element.parentElement as HTMLElement;
    }

    if (this.props.childSelector) {
      element = element.querySelector(this.props.childSelector) as HTMLElement;
    }

    return element;
  }

  public isScrolling() {
    return this.state.isScrolling;
  }

  public scroll(dir: "up" | "down" | "left" | "right") {
    const element = this.getScrollableComponent();
    if (dir === "up" || dir === "down") {
      const scrollTop = element.scrollTop + (dir === "up" ? -element.offsetHeight / 2 : element.offsetHeight / 2);
      element.scroll({
        top: scrollTop,
        behavior: "smooth",
      });
    } else {
      const scrollLeft = element.scrollLeft + (dir === "left" ? -element.offsetWidth / 2 : element.offsetWidth / 2);
      element.scroll({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }

  render() {
    return (
      <>
        <span style={{ display: "none" }} ref={this.spanRef} />
        {
          this.props.children(
            this.state.isScrolling,
            // typescript being funny again
            (this.state.isScrolling ? {
              up: this.state.canScrollTop,
              down: this.state.canScrollBottom,
              left: this.state.canScrollLeft,
              right: this.state.canScrollRight,
            } : null) as any
          )
        }
      </>
    );
  }
}

const AltScroller = React.forwardRef((props: IAltScrollerProps, ref: RefObject<ActualAltScroller>) => {
  return (
    <AltPriorityShifterContext.Consumer>
      {(v) => {
        return (
          <ActualAltScroller
            {...props}
            priority={(props.priority || 0) + v.amount}
            disabled={props.disabled || v.disable}
            ref={ref} />
        );
      }}
    </AltPriorityShifterContext.Consumer>
  );
});

export default AltScroller;