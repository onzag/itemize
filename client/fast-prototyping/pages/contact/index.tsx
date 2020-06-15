import React from "react";
import I18nReadMany from "../../../components/localization/I18nReadMany";
import TitleSetter from "../../../components/util/TitleSetter";
import HTMLResourceLoader from "../../../components/resources/HTMLResourceLoader";

interface ContactProps {
  titleI18nId?: string;
  urlI18nId?: string;
}

export function Contact(props: ContactProps) {
  return (
    <I18nReadMany data={[
      { id: props.titleI18nId || "contact", capitalize: true },
      { id: props.urlI18nId || "contact_url" },
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

export function contactWithProps(props: ContactProps) {
  return () => {
    <Contact {...props}/>
  }
}