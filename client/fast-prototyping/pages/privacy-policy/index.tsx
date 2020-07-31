/**
 * A fast prototyping component for the privacy policy information
 * 
 * @packageDocumentation
 */

import React from "react";
import I18nReadMany from "../../../components/localization/I18nReadMany";
import TitleSetter from "../../../components/util/TitleSetter";
import HTMLResourceLoader from "../../../components/resources/HTMLResourceLoader";

/**
 * The privacy policy information component
 * the privacy policy is loaded from the resources file based on
 * privacy_policy_url
 * @returns a react element
 */
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
