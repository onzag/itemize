/**
 * Simply provides the current country of the application context
 * 
 * @module
 */

import type { EndpointErrorType } from "../../../base/errors";
import React, { useCallback, useState } from "react";
import { ICountryType, countries, arrCountries } from "../../../imported-resources";
import { LocaleContext, ChangeCountryToFn } from "../../internal/providers/locale-provider";

interface IActualAppCountryRetrieverProps {
  currentCountry: ICountryType,
  availableCountries: ICountryType[],
  changeCountryTo: ChangeCountryToFn;
}

interface IActualAppCountryRetrieverPropsWithFn extends IActualAppCountryRetrieverProps {
  children: FnAppCountryRetrieverType;
}

export interface ICountryRetrieverArg extends IActualAppCountryRetrieverProps {
  error: EndpointErrorType;
  dismissError?: () => void;
}

/**
 * The function that the retriever calls
 */
type FnAppCountryRetrieverType = (arg: ICountryRetrieverArg) => React.ReactNode;

function ActualAppCountryRetriever(props: IActualAppCountryRetrieverPropsWithFn) {
  const [error, setError] = useState<EndpointErrorType>(null);

  const dismissError = useCallback(() => {
    setError(null);
  }, []);

  const changeCountryTo = useCallback<ChangeCountryToFn>(async (...args) => {
    const err = await props.changeCountryTo(...args);
    setError(err);
    return err;
  }, [props.changeCountryTo])

  return props.children({
    currentCountry: props.currentCountry,
    availableCountries: props.availableCountries,
    changeCountryTo,
    error,
    dismissError,
  }) as any;
}

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
          const nProps = {
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
            changeCountryTo: localeContext.updating ? () => null as any : localeContext.changeCountryTo,
            children: props.children,
          };

          return (
            <ActualAppCountryRetriever {...nProps} />
          );
        }
      }
    </LocaleContext.Consumer>
  );
}
