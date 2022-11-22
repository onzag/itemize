import React from "react";
import AltPriorityShifter from "./AltPriorityShifter";

interface IIAltAutomaticGroupProps {
  /**
   * the priority that the group exists at
   */
  priority?: number;

  /**
   * the component to use by default uses a div
   */
  component?: string;

  /**
   * the selector moves in steps the group position based
   * on others that it finds behind it, set the base group position
   * in order to add it to that amount
   */
  baseGroupPosition?: number;

  /**
   * by default the grouper will pick the first children
   * to calculate the position within the group, use a selector
   * if you want to manually choose instead
   */
  selector?: string;

  /**
   * If somehow flow is lost during resize operations
   * and want it to be recalculated then set this to true
   */
  recalculateOnResize?: boolean;

  /**
   * it will not render itself as a parent but rather as a sibling and pick
   * the next sibling as a base, note that this affects how selector does work
   */
  useNextSiblingStrategy?: boolean;
}

interface IIAltAutomaticGroupState {
  selfShift: number;
}

const ALT_GROUPS: { [priority: number]: AltAutomaticGroup[] } = {};

function recalculateAt(priority: number) {
  ALT_GROUPS[priority].sort((a, b) => a.isBefore(b) ? -1 : 1);
  ALT_GROUPS[priority].forEach((v, index) => {
    if (v.getCurrentShift() !== index) {
      v.setShift(index);
    }
  });
}

/**
 * If you are doing special things like moving stuff around and you 
 * want the group position to be manually recalculated you can use this
 * function
 */
export function recalculateAll() {
  Object.keys(ALT_GROUPS).forEach((priority) => {
    recalculateAt(priority as any);
  });
}

/**
 * Automatically shifts groups in order to make them be together in a group position
 * because every alt element holds a group position, but sometimes we may be unable to determine
 * the group position that is given
 */
export default class AltAutomaticGroup extends React.PureComponent<IIAltAutomaticGroupProps, IIAltAutomaticGroupState> {
  private elementRef: React.RefObject<HTMLElement> = React.createRef();

  constructor(props: IIAltAutomaticGroupProps) {
    super(props);

    this.state = {
      selfShift: 0,
    }

    this.recalculate = this.recalculate.bind(this);
  }

  public setShift(n: number) {
    this.setState({
      selfShift: n,
    });
  }

  public getCurrentShift() {
    return this.state.selfShift;
  }

  public getElement() {
    if (!this.elementRef.current) {
      return null;
    }

    const reference = this.props.useNextSiblingStrategy ?
      this.elementRef.current.nextSibling as HTMLElement :
      this.elementRef.current;

    if (this.props.selector) {
      return reference.querySelector(this.props.selector);
    }

    if (this.props.useNextSiblingStrategy) {
      return reference;
    }

    return reference.childNodes[0] as HTMLElement || null;
  }

  public isBefore(other: AltAutomaticGroup) {
    const isRtL = (document.querySelector("html") as any).dir === "rtl";

    // we are missing, it must be because we are dismounting
    const element = this.getElement();
    if (!element) {
      return false;
    }

    const selfClientRect = element.getBoundingClientRect();

    // other is missing we are before
    // it must be because it's dismounting
    const otherElement = other.getElement();
    if (!otherElement) {
      return true;
    }

    const otherClientRect = otherElement.getBoundingClientRect();

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

  public componentDidUpdate(prevProps: Readonly<IIAltAutomaticGroupProps>) {
    if (prevProps.priority !== this.props.priority) {
      this.unregister(prevProps);
      this.register(this.props);
    }
  }

  public register(props: IIAltAutomaticGroupProps = this.props) {
    if (!ALT_GROUPS[props.priority]) {
      ALT_GROUPS[props.priority] = [this];
    } else {
      ALT_GROUPS[props.priority].push(this);
      recalculateAt(props.priority);
    }

    if (props.recalculateOnResize) {
      window.addEventListener("resize", this.recalculate);
    }
  }

  public unregister(props: IIAltAutomaticGroupProps = this.props) {
    const index = ALT_GROUPS[props.priority].findIndex((e) => e === this);
    if (index !== -1) {
      ALT_GROUPS[props.priority].splice(index, 1);
    }

    if (props.recalculateOnResize) {
      window.removeEventListener("resize", this.recalculate);
    }
  }

  public recalculate() {
    recalculateAt(this.props.priority);
  }

  public componentDidMount() {
    this.register();
  }

  public componentWillUnmount() {
    this.unregister();
  }

  public render() {
    const Element: any = this.props.component || "div";

    if (this.props.useNextSiblingStrategy) {
      return (
        <>
          <Element style={{ display: "none" }} ref={this.elementRef}></Element>
          <AltPriorityShifter groupPositionAmount={(this.props.baseGroupPosition || 0) + this.state.selfShift}>
            {this.props.children}
          </AltPriorityShifter>
        </>
      )
    }

    return (
      <Element style={{ display: "contents" }} ref={this.elementRef}>
        <AltPriorityShifter groupPositionAmount={(this.props.baseGroupPosition || 0) + this.state.selfShift}>
          {this.props.children}
        </AltPriorityShifter>
      </Element>
    );
  }
}