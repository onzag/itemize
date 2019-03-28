import React from "react";
import { IPropertyEntryProps } from ".";
import PropertyEntryField from "./PropertyEntryField";

export default function PropertyEntryText(props: IPropertyEntryProps) {
  if (!props.property.isRichText()) {
    return <PropertyEntryField {...props}/>;
  }
  return null;
}
