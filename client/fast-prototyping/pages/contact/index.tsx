import React from "react";
import I18nReadMany from "../../../components/localization/I18nReadMany";
import TitleSetter from "../../../components/util/TitleSetter";
import HTMLResourceLoader from "../../../components/resources/HTMLResourceLoader";

export function Contact() {
  return (
    <I18nReadMany data={[
      { id: "contact", capitalize: true },
      { id: "contact_url" },
    ]}>
      {(i18nContact: string, i18nContactURL: string) => {
        return (
          <React.Fragment>
            <TitleSetter>
              {i18nContact}
            </TitleSetter>
            <HTMLResourceLoader src={i18nContactURL}/>
          </React.Fragment>
        );
      }}
    </I18nReadMany>
  );
}