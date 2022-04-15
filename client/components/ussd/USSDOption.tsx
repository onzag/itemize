import React from "react";
import USSDAction from "./USSDAction";

interface IUSSDOptionProps {
  children: string;
  url: string;
}

export default function USSDOption(props: IUSSDOptionProps) {
  return (
    <USSDAction
      id={"URL_TO_" + props.url}
      label={props.children}
      onInput={() => props.url}
    />
  )
}