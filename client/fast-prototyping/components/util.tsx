import React from "react";

interface DelayDisplayProps {
  duration: number;
}

interface DelayDisplayState {
  shown: boolean;
}

export class DelayDisplay extends React.PureComponent<DelayDisplayProps, DelayDisplayState> {
  private timer: NodeJS.Timer;
  constructor(props: DelayDisplayProps) {
    super(props);

    this.state = {
      shown: false,
    }
  }
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({
        shown: true,
      });
    }, this.props.duration);
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  render() {
    if (this.state.shown) {
      return this.props.children;
    }
    return null;
  }
}