import React from "react";

export const AltPriorityShifterContext = React.createContext({
  amount: 0,
  disable: false,
});

interface IAltPriorityShifterProps {
  amount?: number;
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
          }}>
            {this.props.children}
          </AltPriorityShifterContext.Provider>
        )}
      </AltPriorityShifterContext.Consumer>
    )
  }
}