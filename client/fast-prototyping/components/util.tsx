/**
 * Contains fast prototyping utilities for fast developing
 * 
 * @module
 */

import React from "react";
import { DelayDisplay } from "../../components/util";

import "./util.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";

/**
 * Progressing element props
 */
interface IProgressingElementProps {
  /**
   * Whether it is currently progressing
   */
  isProgressing: boolean;
  /**
   * The size of the progressing circle (optional) default 24
   */
  progressCircleSize?: number;
  /**
   * The children to add into it
   */
  children: React.ReactNode;
  /**
   * The delay duration to show this progress happening, the default is 300
   */
  delayDuration?: number;
  /**
   * Whether to use full 100% width
   */
  fullWidth?: boolean;
  /**
   * The class name of the progress wrapper
   */
  className?: string;
}

interface IProgressWrapperProps {
  fullWidth?: boolean;
}

const ProgressWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "fullWidth"
})<IProgressWrapperProps>(({ fullWidth }) => ({
  position: "relative",
  display: "inline-block",
  width: fullWidth ? "100%" : "auto",
}));

const Cover = styled("div")({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  backgroundColor: "rgba(255, 255, 255, 0.65)",
});

const CircularProgressStyled = styled(CircularProgress)(({ size }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  marginTop: -((size as number) / 2),
  marginLeft: -((size as number) / 2),
}))

/**
 * Shows a loading circle on top of a component to show that such is loading
 * @param props the loading props
 * @returns a react component
 */
export function ProgressingElement(props: IProgressingElementProps) {
  const size = props.progressCircleSize || 24;
  return (<ProgressWrapper className={props.className} fullWidth={props.fullWidth}>
    {props.children}
    {
      props.isProgressing ?
        <DelayDisplay duration={props.delayDuration || 300}>
          <Cover>
            <CircularProgressStyled size={size} />
          </Cover>
        </DelayDisplay> :
        null
    }
  </ProgressWrapper>);
};

/**
 * The slow loading element props
 */
interface SlowLoadingElementProps {
  /**
   * The children that are slow loading
   */
  children: React.ReactNode;
  /**
   * An id
   */
  id: string;
  /**
   * Wheter the display is inline
   */
  inline?: boolean;
  /**
   * triggers once the item has mounted
   */
  onMount?: () => void;
}

/**
 * The slow loading state
 */
interface SlowLoadingElementState {
  /**
   * Whether it is ready
   */
  isReady: boolean;
  /**
   * ready for which id
   */
  readyForId: string;
}

/**
 * Some elements can be fairly heavy and slow loading, this component will detach the execution of some of these components
 * so that they don't have to slow down the execution of other code, doesn't play nice with SSR
 */
export class SlowLoadingElement extends React.Component<SlowLoadingElementProps, SlowLoadingElementState> {
  /**
   * Becomes true once unmounted, avoid setState on
   * unmounted components if the element really takes a while
   * to load
   */
  private unmounted: boolean = false;

  public static getDerivedStateFromProps(
    props: SlowLoadingElementProps,
    state: SlowLoadingElementState,
  ): Partial<SlowLoadingElementState> {
    // basically if the id changes, we consider ourselves not ready anymore
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
    if (this.state.isReady) {
      return;
    }
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
  public componentDidUpdate(prevProps: SlowLoadingElementProps, prevState: SlowLoadingElementState) {
    if (this.state.isReady && !prevState.isReady && this.props.onMount) {
      this.props.onMount();
    }
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
        <div className="slow-loading-ring" />
      </div>
    } else {
      return null;
    }
  }
}
