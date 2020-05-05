import React from "react";
import I18nReadError, { II18nReadErrorProps } from "./I18nReadError";
import I18nRead, { II18nReadProps } from "./I18nRead";

interface Ii18nReadManyProps {
  data: Array<II18nReadProps | II18nReadErrorProps>;
  children: (...results: React.ReactNode[]) => React.ReactNode;
}

export default function I18nReadMany(props: Ii18nReadManyProps): any {
  if (props.data.length === 0) {
    return props.children();
  } else if (props.data.length === 1) {
    const toProvide = props.data[0];
    if ((toProvide as II18nReadErrorProps).error) {
      <I18nReadError {...toProvide as II18nReadErrorProps}>
        {props.children}
      </I18nReadError>
    }
    return (
      <I18nRead {...toProvide as II18nReadProps}>
        {props.children}
      </I18nRead>
    );
  }
  const missing = props.data.slice(1);
  const toProvide = props.data[0];
  const children = (result: React.ReactNode) => {
    return (
      <I18nReadMany data={missing}>
        {(...results: React.ReactNode[]) => {
          return props.children(result, ...results);
        }}
      </I18nReadMany>
    );
  };
  if ((toProvide as II18nReadErrorProps).error) {
    return (
      <I18nReadError {...toProvide as II18nReadErrorProps}>
        {children}
      </I18nReadError>
    );
  }
  return (
    <I18nRead {...toProvide as II18nReadProps}>
      {children}
    </I18nRead>
  );
}