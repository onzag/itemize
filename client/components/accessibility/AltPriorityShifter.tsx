import React from "react";

export const AltPriorityShifterContext = React.createContext(0);

interface IAltPriorityShifterProps {
  amount: number;
  children: React.ReactNode;
}

export default class AltPriorityShifter extends React.PureComponent<IAltPriorityShifterProps> {
  constructor(props: IAltPriorityShifterProps) {
    super(props);
  }

  render() {
    return (
      <AltPriorityShifterContext.Provider value={this.props.amount}>
        {this.props.children}
      </AltPriorityShifterContext.Provider>
    )
  }
}