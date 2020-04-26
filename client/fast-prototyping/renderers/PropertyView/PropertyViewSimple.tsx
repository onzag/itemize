import { IPropertyViewSimpleRendererProps } from "../../../internal/components/PropertyView/PropertyViewSimple";
import React from "react";
import { capitalize } from "../../../../util";

export default function PropertyViewSimpleRenderer(props: IPropertyViewSimpleRendererProps) {
  return (
    <span>
      {props.capitalize ? capitalize(props.currentValue) : props.currentValue}
    </span>
  )
}