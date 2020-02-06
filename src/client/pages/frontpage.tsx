import React from "react";
import { I18nRead } from "../../../itemize/client/components/localization";
import { TitleSetter } from "../../../itemize/client/components/util";

export function FrontPage() {
  return (
    <React.Fragment>
      <I18nRead id="app_name">
        {(value: string) => (
          <TitleSetter>{value}</TitleSetter>
        )}
      </I18nRead>
    </React.Fragment>
  );
}
