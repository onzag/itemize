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

export function hideAll() {
  ALT_SREGISTRY.forEach((v) => {
    v.disableScrolling();
  });
}

function isScrollIgnore(element: HTMLElement): boolean {
  if (element.dataset && element.dataset.scrollIgnore) {
    return true;
  }

  if (!element.parentElement) {
    return false;
  }

  return isScrollIgnore(element.parentElement);
}

export function scrollCurrent(dir: "up" | "left" | "right" | "down", cb?: () => void) {
  // ensure that the active element is not meant to consume the
  // action, aka they ignore scrolling events because
  // they are meant to consume them
  if (document.activeElement && document.activeElement instanceof HTMLElement) {
    if (
      document.activeElement.tagName === "INPUT" ||
      document.activeElement.tagName === "TEXTAREA" ||
      isScrollIgnore(document.activeElement)
    ) {
      return;
    }
  }

  // see if one is active
  let scrolled = false;
  ALT_SREGISTRY.forEach((v) => {
    if (v.isScrolling()) {
      v.scroll(dir);
      scrolled = true;
      cb();
    }
  });

  // force the hidden current to scroll
  if (!scrolled) {
    const current = getRelevant();

    if (current) {
      current.scroll(dir);
      cb();
    }
  }
}

export function getRelevant() {
  // first lets find the potential max priority
  let scrollerToTrigger: ActualAltScroller = null as any;
  ALT_SREGISTRY.forEach((v) => {
    if (!v.isDisabled() && (!scrollerToTrigger || v.getPriority() >= scrollerToTrigger.getPriority())) {
      scrollerToTrigger = v;
    }
  });

  return scrollerToTrigger;
}

export function showRelevant() {
  // first lets find the potential max priority
  const scrollerToTrigger: ActualAltScroller = getRelevant()

  if (scrollerToTrigger) {
    scrollerToTrigger.enableScrolling();
  }
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
  window.addEventListener("resize", () => {
    recalculatePotentialScrolls(true);
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

    const computedStyleIsRTL = getComputedStyle(element).direction === "rtl";

    // can be a negative number in the case that we are using rtl
    const allTheWayToTheLeftPoint = computedStyleIsRTL ?
      element.offsetWidth - element.scrollWidth :
      0;
    const allTheWayToTheRightPoint = computedStyleIsRTL ?
      0 :
      element.scrollWidth - element.offsetWidth;

    const allTheWayToTheLeft = element.scrollLeft <= allTheWayToTheLeftPoint;
    const allTheWayToTheRight = element.scrollLeft >= allTheWayToTheRightPoint;

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
    this.props.onDisplay && this.props.onDisplay();
    this.recalculateScrolls();
  }

  public disableScrolling() {
    this.props.onHide && this.props.onHide()
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