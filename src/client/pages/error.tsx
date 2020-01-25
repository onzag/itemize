import React from "react";
import { EndpointErrorType } from "../../../itemize/base/errors";
import { I18nReadError } from "../../../itemize/client/components/localization";

export function ErrorPage(props: { error: EndpointErrorType }) {
  return (
    <React.Fragment>
      <div>
        <I18nReadError error={props.error}/>
      </div>
    </React.Fragment>
  );
}
