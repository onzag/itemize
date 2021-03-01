/**
 * Allows for fine control of the scroll position using
 * react, as it keeps it based on the same id
 * 
 * it's a memory leaky implementation but should do just fine
 *
 * @module
 */

import React from "react";

/**
 * The properties of the scroll keeper
 */
interface IScrollKeeperProps {
  /**
   * The id to use, different ids mean different scroll positions
   */
  id: string;
  /**
   * whether to mantain an older stored position, changing using the scroll
   * keeper will just keep the scroll to 0 on top on a different id
   */
  mantainPosition?: boolean;
  /**
   * the children to render
   */
  children?: React.ReactNode;
}

/**
 * The stored scrolls by id
 */
const MEMORY_SCROLLS: {
  [id: string]: number;
} = {};

/**
 * The scroll keeper allows to keep the scroll on position 0 or on a stored
 * position
 */
export default class ScrollKeeper extends React.PureComponent<IScrollKeeperProps> {
  constructor(props: IScrollKeeperProps) {
    super(props);

    this.onScroll = this.onScroll.bind(this);
  }
  public recalculateScroll() {
    // so we recalculate where we should be scrolled
    let scrollTop = 0;
    if (this.props.mantainPosition) {
      // if we are mantaining the old position we try this
      scrollTop = MEMORY_SCROLLS[this.props.id] || 0;
    }
    document.body.scrollTop = scrollTop;
  }
  public onScroll() {
    // when we scroll we might need to store this last
    // position if we are asked to
    if (this.props.mantainPosition) {
      MEMORY_SCROLLS[this.props.id] = document.body.scrollTop;
    }
  }
  public addEventListenerForScroll() {
    document.body.addEventListener("scroll", this.onScroll);
  }
  public removeEventListenerForScroll() {
    document.body.removeEventListener("scroll", this.onScroll);
  }
  public componentDidMount() {
    if (this.props.mantainPosition) {
      this.addEventListenerForScroll();
    }
    this.recalculateScroll();
  }
  public componentDidUpdate(prevProps: IScrollKeeperProps) {
    if (this.props.id !== prevProps.id) {
      this.recalculateScroll();
      if (this.props.mantainPosition && !prevProps.mantainPosition) {
        this.addEventListenerForScroll();
      } else if (prevProps.mantainPosition && !this.props.mantainPosition) {
        this.removeEventListenerForScroll();
      }
    }
  }
  public componentWillUnmount() {
    this.removeEventListenerForScroll();
  }
  public render() {
    return this.props.children;
  }
}