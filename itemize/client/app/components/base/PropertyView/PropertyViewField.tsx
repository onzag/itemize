import { getClassName, IPropertyViewProps } from "../PropertyView";
import React from "react";

export default function PropertyViewField(props: IPropertyViewProps) {
  return (
    <div className={getClassName(props, "field")}>
      {props.value.value}
    </div>
  );
}
