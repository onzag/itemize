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
      <AltPriorityShifterContext.Consumer>
        {(v) => (
          <AltPriorityShifterContext.Provider value={this.props.amount + v}>
            {this.props.children}
          </AltPriorityShifterContext.Provider>
        )}
      </AltPriorityShifterContext.Consumer>
    )
  }
}