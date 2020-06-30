import React from "react";

interface IScrollKeeperProps {
  id: string;
  mantainPosition?: boolean;
  children?: React.ReactNode;
}

const MEMORY_SCROLLS: {
  [id: string]: number;
} = {};

export default class ScrollKeeper extends React.PureComponent<IScrollKeeperProps> {
  constructor(props: IScrollKeeperProps) {
    super(props);

    this.onScroll = this.onScroll.bind(this);
  }
  public recalculateScroll() {
    let scrollTop = 0;
    if (this.props.mantainPosition) {
      scrollTop = MEMORY_SCROLLS[this.props.id] || 0;
    }
    document.body.scrollTop = scrollTop;
  }
  public onScroll() {
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