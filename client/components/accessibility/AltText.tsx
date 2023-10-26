import React, { ForwardedRef } from "react";
import { IAltBaseProps, ActualAltBase } from "./AltReactioner";
import { AltPriorityShifterContext } from "./AltPriorityShifter"

export interface IAltTextProps extends IAltBaseProps {
  /**
   * whether it is used in flow, for text the default is true
   */
  useInFlow?: boolean;
  /**
   * The children that should be read
   */
  children?: React.ReactNode;

  /**
   * aria-label
   */
  label?: string;

  /**
   * aria-description
   */
  description?: string;

  /**
   * aria-labelledby
   */
  labelledBy?: string;

  /**
   * An aria-describedby by value
   */
  describedBy?: string;

  /**
   * When an element is tabbed but it is not part of the current flow but it kept its focus while being in another
   * layer, use this to select which reaction key would you like to trigger from the current active flow
   */
  onTabOutTrigger?: string;
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
            useInFlow={true}
            {...props}
            componentProps={args}
            priority={typeof props.priority === "string" ? props.priority : (props.priority || 0) + v.amount}
            disabled={props.disabled || v.disable}
            ref={ref} />
        );
      }}
    </AltPriorityShifterContext.Consumer>
  );
});

export default AltText;