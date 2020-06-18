import { IPropertyViewSimpleRendererProps } from "../../../internal/components/PropertyView/PropertyViewSimple";
import React from "react";
import { capitalize } from "../../../../util";
import moment from "moment";

export default function PropertyViewSimpleRenderer(props: IPropertyViewSimpleRendererProps) {
  let value: React.ReactNode;
  if (props.args.dateFormat) {
    value = props.currentValue ? moment(props.currentValue).format(props.args.dateFormat) : props.currentValue;
  } else {
    value = props.capitalize ? capitalize(props.currentValue) : props.currentValue;
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