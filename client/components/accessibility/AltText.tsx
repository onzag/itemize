import React, { ForwardedRef } from "react";
import { IAltBaseProps, ActualAltBase } from "./AltReactioner";
import { AltPriorityShifterContext } from "./AltPriorityShifter"

interface IAltTextProps extends IAltBaseProps {
  children: React.ReactChild;
}

const AltText = React.forwardRef((props: IAltTextProps, ref: ForwardedRef<ActualAltBase<IAltBaseProps, any>>) => {
  return (
    <AltPriorityShifterContext.Consumer>
      {(v) => {
        return (
          <ActualAltBase
            {...props}
            priority={(props.priority || 0) + v.amount}
            groupPosition={(props.groupPosition || 0) + v.groupPositionAmount}
            disabled={props.disabled || v.disable}
            ref={ref} />
        );
      }}
    </AltPriorityShifterContext.Consumer>
  );
});

export default AltText;