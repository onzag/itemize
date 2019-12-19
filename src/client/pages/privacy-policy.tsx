import React from "react";
import { I18nRead } from "../../../itemize/client/components/localization";
import HTMLResourceLoader from "../../../itemize/client/components/resources";

export function PrivacyPolicy() {
  return (
    <React.Fragment>
      <I18nRead id="privacy_policy">
        {
          (value: string) => {
            return <HTMLResourceLoader location={value}/>;
          }
        }
      </I18nRead>
    </React.Fragment>
  );
}
