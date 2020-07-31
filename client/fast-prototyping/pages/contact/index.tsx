/**
 * A fast prototyping component for the contact information
 * 
 * @packageDocumentation
 */

import React from "react";
import I18nReadMany from "../../../components/localization/I18nReadMany";
import TitleSetter from "../../../components/util/TitleSetter";
import HTMLResourceLoader from "../../../components/resources/HTMLResourceLoader";

/**
 * The contact props
 */
interface ContactProps {
  /**
   * The identifier for the title
   * by default contact
   */
  titleI18nId?: string;
  /**
   * The identifier for the url where the resource is located
   * by default the contact_url
   */
  urlI18nId?: string;
}

/**
 * The contact fast prototyping page
 * @param props the props for the contact
 * @returns a react element
 */
export function Contact(props: ContactProps) {
  return (
    <I18nReadMany data={[
      { id: props.titleI18nId || "contact", capitalize: true },
      { id: props.urlI18nId || "contact_url" },
    ]}>
      {(i18nContact: string, i18nContactURL: string) => {
        return (
          <>
            <TitleSetter>
              {i18nContact}
            </TitleSetter>
            <HTMLResourceLoader src={i18nContactURL}/>
          </>
        );
      }}
    </I18nReadMany>
  );
}

/**
 * allows to inject props to the contact
 * @param props the props to inject
 * @returns an unitialized react component
 */
export function contactWithProps(props: ContactProps) {
  return () => {
    <Contact {...props}/>
  }
}
