import { IPropertyViewTextRendererProps } from "../../../internal/components/PropertyView/PropertyViewText";
import React from "react";

export default function PropertyViewTextRenderer(props: IPropertyViewTextRendererProps) {
  if (props.isRichText) {
    return (
      <div className="rich-text" dangerouslySetInnerHTML={{__html: props.currentValue}}/>
    )
  }
  return (
    <span>
      {props.currentValue}
    </span>
  )
}