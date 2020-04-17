import React from "react";
import { TitleSetter } from "../../../components/util";
import { I18nReadMany } from "../../../components/localization";
import HTMLResourceLoader from "../../../components/resources";

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