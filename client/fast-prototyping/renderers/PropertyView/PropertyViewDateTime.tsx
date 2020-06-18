import { IPropertyViewDateTimeRendererProps } from "../../../internal/components/PropertyView/PropertyViewDateTime";
import React from "react";

export default function PropertyViewDateTimeRenderer(props: IPropertyViewDateTimeRendererProps) {
  let value: React.ReactNode;
  if (props.args.dateFormat) {
    value = props.momentValue ? props.momentValue.format(props.args.dateFormat) : null;
  } else {
    value = props.defaultFormattedValue;
  }

  if (value === null && props.args.NullComponent) {
    const NullComponent = props.args.NullComponent;
    const nullArgs = props.args.nullComponentArgs;
    value = <NullComponent {...nullArgs}/>;
  }

  return (
    <span>
      {value}
    </span>
  )
}