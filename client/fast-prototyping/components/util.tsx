import React from "react";
import { createStyles, WithStyles, withStyles, Button, CircularProgress } from "@material-ui/core";

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

const progressingElementStyle = createStyles({
  progressWrapper: (props: IProgressingElementProps) => ({
    position: "relative",
    display: "inline-block",
    width: props.fullWidth ? "100%" : "auto",
  }),
  progressElement: (props: IProgressingElementProps) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -((props.progressSize || 24)/2),
    marginLeft: -((props.progressSize || 24)/2),
  }),
  cover: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    backgroundColor: "rgba(255, 255, 255, 0.65)",
  }
});

interface IProgressingElementProps extends WithStyles<typeof progressingElementStyle> {
  isProgressing: boolean;
  progressSize?: number;
  children: React.ReactNode;
  delayDuration?: number;
  fullWidth?: boolean;
}

export const ProgressingElement = withStyles(progressingElementStyle)((props: IProgressingElementProps) => {
  const size = props.progressSize || 24;
  return (<div className={props.classes.progressWrapper}>
    {props.children}
    {
      props.isProgressing ?
      <DelayDisplay duration={props.delayDuration || 300}>
        <div className={props.classes.cover}>
          <CircularProgress size={size} className={props.classes.progressElement}/>
        </div>
      </DelayDisplay> :
      null
    }
  </div>);
});