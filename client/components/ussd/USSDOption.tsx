import React from "react";
import USSDAction from "./USSDAction";

interface IUSSDOptionProps {
  label: string;
  i18nCapitalize?: boolean;
  useI18n?: boolean;
  url: string;
}

export default function USSDOption(props: IUSSDOptionProps) {
  return (
    <USSDAction
      id={"URL_TO_" + props.url}
      label={props.label}
      i18nCapitalize={props.i18nCapitalize}
      useI18n={props.useI18n}
      onInput={() => props.url}
    />
  )
}