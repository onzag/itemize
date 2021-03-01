/**
 * Allows to disable SSR to a given section of code, only takes into effect
 * if the server detects SSR is being used otherwise will render normally
 * 
 * @module
 */

import React from "react";
import { SSRContext } from "../../internal/providers/ssr-provider";

/**
 * The no ssr props
 */
interface INoSSRProps {
  children: React.ReactNode;
}

/**
 * The state for the no ssr
 */
interface INoSSRState {
  shouldRender: boolean;
}

/**
 * The actual class for no ssr that performs the double pass
 * the original no ssr only uses this class if it considers itself
 * in a SSR context
 */
class ActualNoSSR extends React.PureComponent<INoSSRProps, INoSSRState> {
  constructor(props: INoSSRProps) {
    super(props);

    this.state = {
      shouldRender: false,
    }
  }
  public componentDidMount() {
    this.setState({
      shouldRender: true,
    });
  }
  public render() {
    if (this.state.shouldRender) {
      return this.props.children
    }

    return null;
  }
}

/**
 * This SSR disabler is clever, if you are in a non-ssr context it will render
 * immediately, however if you are in a SSR enabled context then it will use a double
 * pass, this will ensure things are in sync
 * @param props the props
 */
export default function NoSSR(props: INoSSRProps) {
  return (
    <SSRContext.Consumer>
      {(ssr) => {
        // we are in a SSR enabled context, we need to use double pass for this
        if (ssr) {
          return <ActualNoSSR {...props}/>
        } else {
          return props.children;
        }
      }}
    </SSRContext.Consumer>
  );
}