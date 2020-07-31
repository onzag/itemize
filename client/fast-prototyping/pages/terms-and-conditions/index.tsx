/**
 * A fast prototyping component for the terms and conditions
 * 
 * @packageDocumentation
 */


import React from "react";
import I18nReadMany from "../../../components/localization/I18nReadMany";
import TitleSetter from "../../../components/util/TitleSetter";
import HTMLResourceLoader from "../../../components/resources/HTMLResourceLoader";

/**
 * The terms and conditions information component
 * the terms and conditions is loaded from the resources file based on
 * terms_and_conditions_url
 * @returns a react element
 */
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
