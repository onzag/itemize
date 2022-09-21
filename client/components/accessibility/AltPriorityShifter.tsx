import { disable } from "colors";
import React from "react";

export const AltPriorityShifterContext = React.createContext({
  amount: 0,
  disable: false,
  groupPositionAmount: 0,
});

interface IAltPriorityShifterProps {
  amount?: number;
  groupPositionAmount?: number;
  disable?: boolean;
  children: React.ReactNode;
}

export default class AltPriorityShifter extends React.PureComponent<IAltPriorityShifterProps> {
  constructor(props: IAltPriorityShifterProps) {
    super(props);
  }

  render() {
    return (
      <AltPriorityShifterContext.Consumer>
        {(v) => (
          <AltPriorityShifterContext.Provider value={{
            amount: (this.props.amount || 0) + v.amount,
            disable: v.disable || this.props.disable,
            groupPositionAmount: (this.props.groupPositionAmount || 0) + v.groupPositionAmount,
          }}>
            {this.props.children}
          </AltPriorityShifterContext.Provider>
        )}
      </AltPriorityShifterContext.Consumer>
    )
  }
}