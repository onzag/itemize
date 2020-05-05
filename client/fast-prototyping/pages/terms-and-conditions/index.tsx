import React from "react";
import I18nReadMany from "../../../components/localization/I18nReadMany";
import TitleSetter from "../../../components/util/TitleSetter";
import HTMLResourceLoader from "../../../components/resources/HTMLResourceLoader";

export function TermsAndConditions() {
  return (
    <I18nReadMany data={[
      { id: "terms_and_conditions", capitalize: true },
      { id: "terms_and_conditions_url" },
    ]}>
      {(i18nTermsAndConditions: string, termsAndConditionsURL: string) => {
        return (
          <React.Fragment>
            <TitleSetter>
              {i18nTermsAndConditions}
            </TitleSetter>
            <HTMLResourceLoader src={termsAndConditionsURL}/>
          </React.Fragment>
        );
      }}
    </I18nReadMany>
  );
}