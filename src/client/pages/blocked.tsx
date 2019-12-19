import React from "react";
import { I18nReadError } from "../../../itemize/client/components/localization";

export function BlockedPage(props: { hasBlockedAccess: boolean, children: any }) {
  return (
    <React.Fragment>
      <div>
        <I18nReadError
          error={{
            message: "The item is blocked",
            code: "BLOCKED",
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
