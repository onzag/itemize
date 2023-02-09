import React from "react";

interface IAltGroupProps {
  /**
  * The wrapping component to use, by default it will use a div
  */
  component?: any;
  /**
   * Props to pass to the component
   */
  componentProps?: any;
  /**
   * any child
   */
  children?: React.ReactNode;
  /**
   * force group position to start default or end
   */
  groupPosition?: "DEFAULT" | "START" | "END";
}

export default function AltGroup(props: IAltGroupProps) {
  const Element = props.component || "div";
  return (
    <Element
      children={props.children}
      {...props.componentProps}
      data-alt-group={props.groupPosition || "DEFAULT"}
    />
  );
}