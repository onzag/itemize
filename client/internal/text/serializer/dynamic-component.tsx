/**
 * This file contains the dynamic styled component that represents an element with hover
 * an active styles
 *
 * @module
 */

import React from "react";

/**
 * Represents the props for the given element
 */
interface IReactifiedElementWithHoverAndActiveProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  Component: any;
  styleHover: React.CSSProperties;
  styleActive: React.CSSProperties;
}

/**
 * Represents the state the element is in as of currently
 */
interface IReactifiedElementWithHoverAndActiveState {
  hover: boolean;
  active: boolean;
}

/**
 * Represents a standard html component where styleActive and styleHover as well as a Tag are defined
 * in order to render with the given props
 */
export class ReactifiedElementWithHoverAndActive extends React.PureComponent<IReactifiedElementWithHoverAndActiveProps, IReactifiedElementWithHoverAndActiveState> {
  private refElement: React.RefObject<any> = React.createRef();
  constructor(props: IReactifiedElementWithHoverAndActiveProps) {
    super(props);

    this.state = {
      hover: false,
      active: false,
    }

    this.onHoverStart = this.onHoverStart.bind(this);
    this.onHoverEnd = this.onHoverEnd.bind(this);
    this.onActiveEnd = this.onActiveEnd.bind(this);
    this.onActiveStart = this.onActiveStart.bind(this);
  }

  public onHoverStart(originalFn: (arg: React.MouseEvent<HTMLElement, MouseEvent>) => void, e: React.MouseEvent<HTMLElement, MouseEvent>) {
    this.setState({
      hover: true,
    });

    originalFn && originalFn(e);
  }

  public onHoverEnd(originalFn: (arg: React.MouseEvent<HTMLElement, MouseEvent>) => void, e: React.MouseEvent<HTMLElement, MouseEvent>) {
    this.setState({
      hover: false,
    });

    originalFn && originalFn(e);
  }

  public onActiveStart(originalFn: (arg: React.MouseEvent<HTMLElement, MouseEvent>) => void, e: React.MouseEvent<HTMLElement, MouseEvent>) {
    this.setState({
      active: true,
    });

    originalFn && originalFn(e);
  }

  public onActiveEnd(originalFn: (arg: React.MouseEvent<HTMLElement, MouseEvent>) => void, e: React.MouseEvent<HTMLElement, MouseEvent>) {
    this.setState({
      active: false,
    });

    originalFn && originalFn(e);
  }

  public getElement() {
    return this.refElement.current;
  }

  public render() {
    // first we pick the tag
    const Component = this.props.Component;

    // now we build the props
    const standardProps = {
      ...this.props,
    };
    // delete what is non-standard
    delete standardProps.Component;
    delete standardProps.styleHover;
    delete standardProps.styleActive;

    // and now we can define the current style
    const styleUsed = {
      ...this.props.style,
      ...(this.state.hover ? this.props.styleHover : null),
      ...(this.state.active ? this.props.styleActive : null),
    };

    // and set it in the style of the props
    standardProps.style = styleUsed;

    // if we have a stylehover
    // we define the mousenter and leave
    if (this.props.styleHover) {
      // note how we bind the original function in case there's one
      standardProps.onMouseEnter = this.onHoverStart.bind(null, this.props.onMouseEnter);
      standardProps.onMouseLeave = this.onHoverEnd.bind(null, this.props.onMouseLeave);
    }

    // also for active
    if (this.props.styleActive) {
      standardProps.onTouchStart = this.onActiveStart.bind(null, this.props.onTouchStart);
      standardProps.onTouchEnd = this.onActiveEnd.bind(null, this.props.onTouchEnd);
      standardProps.onMouseDown = this.onActiveStart.bind(null, this.props.onMouseDown);
      standardProps.onMouseUp = this.onActiveEnd.bind(null, this.props.onMouseUp);
    }

    // and set up the element
    return <Component {...standardProps} ref={this.refElement}/>;
  }
}
