/**
 * Simply provides the current country of the application context
 * 
 * @packageDocumentation
 */

import React from "react";
import { ICountryType, countries, arrCountries } from "../../../imported-resources";
import { LocaleContext } from "../../internal/app";

/**
 * The function for the retriever
 */
type FnAppCountryRetrieverType = (arg: {
  currentCountry: ICountryType,
  availableCountries: ICountryType[],
  changeCountryTo: (code: string) => void,
}) => React.ReactNode;

/**
 * provides the current country and allows to change them
 * @param props the country retriever props
 * @returns a react node
 */
export default function AppCountryRetriever(props: {
  children: FnAppCountryRetrieverType;
}) {
  return (
    <LocaleContext.Consumer>
      {
        (localeContext) => {
          return props.children({
            currentCountry: countries[localeContext.country.toUpperCase()] || {
              name: "?",
              native: "?",
              code: "?",
              phone: "?",
              continent: "?",
              capital: "?",
              languages: [],
              emoji: "?",
              emojiU: "?",
              currency: "USD",
              longitude: 0,
              latitude: 0,
            },
            availableCountries: arrCountries,
            changeCountryTo: localeContext.updating ? () => null : localeContext.changeCountryTo,
          });
        }
      }
    </LocaleContext.Consumer>
  );
}
