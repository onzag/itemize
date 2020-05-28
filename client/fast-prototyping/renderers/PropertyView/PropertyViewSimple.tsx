import { IPropertyViewSimpleRendererProps } from "../../../internal/components/PropertyView/PropertyViewSimple";
import React from "react";
import { capitalize } from "../../../../util";
import moment from "moment";

export default function PropertyViewSimpleRenderer(props: IPropertyViewSimpleRendererProps) {
  if (props.args.dateFormat) {
    return (
      <span>
        {props.currentValue ? moment(props.currentValue).format(props.args.dateFormat) : props.currentValue}
      </span>
    )
  }
  return (
    <span>
      {props.capitalize ? capitalize(props.currentValue) : props.currentValue}
    </span>
  )
}