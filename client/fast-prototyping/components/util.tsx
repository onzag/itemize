import React from "react";
import { createStyles, WithStyles, withStyles, CircularProgress } from "@material-ui/core";
import "./util.scss";

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

const progressingElementStyle: any = createStyles({
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
  className?: string;
}

export const ProgressingElement = withStyles(progressingElementStyle)((props: IProgressingElementProps) => {
  const size = props.progressSize || 24;
  return (<div className={`${props.classes.progressWrapper} ${props.className ? props.className : ""}`}>
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

interface SlowLoadingElementProps {
  children: React.ReactNode;
  id: string;
  inline?: boolean;
}

interface SlowLoadingElementState {
  isReady: boolean;
  readyForId: string;
}

export class SlowLoadingElement extends React.Component<SlowLoadingElementProps, SlowLoadingElementState> {
  private unmounted: boolean = false;
  public static getDerivedStateFromProps(
    props: SlowLoadingElementProps,
    state: SlowLoadingElementState,
  ): Partial<SlowLoadingElementState> {
    if (props.id !== state.readyForId) {
      return {
        isReady: false,
        readyForId: props.id,
      };
    }
    return null;
  }
  constructor(props: SlowLoadingElementProps) {
    super(props);

    this.state = {
      isReady: false,
      readyForId: props.id || null,
    }
  }
  public makeReady() {
    setTimeout(() => {
      if (!this.unmounted) {
        this.setState({
          isReady: true,
        });
      }
    }, 10);
  }
  public shouldComponentUpdate(nextProps: SlowLoadingElementProps, nextState: SlowLoadingElementState) {
    return this.state.isReady !== nextState.isReady ||
      nextProps.id !== this.props.id ||
      nextProps.children !== this.props.children;
  }
  public componentDidMount() {
    this.makeReady();
  }
  public componentDidUpdate() {
    this.makeReady();
  }
  public componentWillUnmount() {
    this.unmounted = true;
  }
  public render() {
    if (this.state.isReady) {
      return this.props.children;
    } else if (!this.props.inline) {
      return <div className="slow-loading-ring-wrapper">
        <div className="slow-loading-ring"/>
      </div>
    } else {
      return null;
    }
  }
}