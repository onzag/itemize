import React from "react";
import { I18nRead } from "../../../itemize/client/components/localization";
import HTMLResourceLoader from "../../../itemize/client/components/resources";

export function TermsAndConditions() {
  return (
    <React.Fragment>
      <I18nRead id="terms_and_conditions">
        {
          (value: string) => {
            return <HTMLResourceLoader location={value}/>;
          }
        }
      </I18nRead>
    </React.Fragment>
  );
}
