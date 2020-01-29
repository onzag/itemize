import React from "react";
import { I18nReadError } from "../../../itemize/client/components/localization";
import { ENDPOINT_ERRORS } from "../../../itemize/constants";

export function BlockedPage(props: { hasBlockedAccess: boolean, children: any }) {
  return (
    <React.Fragment>
      <div>
        <I18nReadError
          error={{
            message: "The item is blocked",
            code: ENDPOINT_ERRORS.BLOCKED,
          }}
        />
      </div>
      {
        props.hasBlockedAccess ?
        props.children :
        null
      }
    </React.Fragment>
  );
}
