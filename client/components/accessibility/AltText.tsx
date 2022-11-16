import React, { ForwardedRef } from "react";
import { IAltBaseProps, ActualAltBase } from "./AltReactioner";
import { AltPriorityShifterContext } from "./AltPriorityShifter"

interface IAltTextProps extends IAltBaseProps {
  /**
   * The children that should be read
   */
  children: React.ReactChild;

  /**
   * aria-label
   */
  label?: string;

  /**
   * aria-description
   */
  description: string;

  /**
   * aria-labelledby
   */
  labelledBy?: string;

  /**
   * An aria-describedby by value
   */
  describedBy?: string;
}

const AltText = React.forwardRef((props: IAltTextProps, ref: ForwardedRef<ActualAltBase<IAltBaseProps, any>>) => {
  return (
    <AltPriorityShifterContext.Consumer>
      {(v) => {
        const args = {
          ["aria-labelledby"]: props.labelledBy,
          ["aria-describedby"]: props.describedBy,
          ["aria-label"]: props.label,
          ["aria-description"]: props.description,
        };

        if (props.componentProps) {
          Object.assign(args, props.componentProps);
        }

        return (
          <ActualAltBase
            {...props}
            componentProps={args}
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