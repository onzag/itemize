import React from "react";
import { TitleSetter } from "../../../components/util";
import { I18nReadMany } from "../../../components/localization";
import HTMLResourceLoader from "../../../components/resources";

export function PrivacyPolicy() {
  return (
    <I18nReadMany data={[
      { id: "privacy_policy", capitalize: true },
      { id: "privacy_policy_url" },
    ]}>
      {(i18nPrivacyPolicy: string, privacyPolicyURL: string) => {
        return (
          <React.Fragment>
            <TitleSetter>
              {i18nPrivacyPolicy}
            </TitleSetter>
            <HTMLResourceLoader src={privacyPolicyURL}/>
          </React.Fragment>
        );
      }}
    </I18nReadMany>
  );
}