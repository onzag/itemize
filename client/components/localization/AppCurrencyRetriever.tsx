/**
 * Simply provides the current currency
 * 
 * @module
 */

import type { EndpointErrorType } from "../../../base/errors";
import React, { useCallback, useContext, useState } from "react";
import { ICurrencyType, currencies, arrCurrencies } from "../../../imported-resources";
import { LocaleContext, ChangeCurrencyToFn } from "../../internal/providers/locale-provider";

interface IActualAppCurrencyRetrieverProps {
  currentCurrency: ICurrencyType;
  availableCurrencies: ICurrencyType[];
  changeCurrencyTo: ChangeCurrencyToFn;
}

interface IActualAppCurrencyRetrieverPropsWithFn extends IActualAppCurrencyRetrieverProps {
  children: FnAppCurrencyRetrieverType;
}

export interface ICurrencyRetrieverArg extends IActualAppCurrencyRetrieverProps {
  error: EndpointErrorType;
  dismissError?: () => void;
}

/**
 * The function that the retriever calls
 */
type FnAppCurrencyRetrieverType = (arg: ICurrencyRetrieverArg) => React.ReactNode;

function ActualAppCurrencyRetriever(props: IActualAppCurrencyRetrieverPropsWithFn) {
  const [error, setError] = useState<EndpointErrorType>(null);

  const dismissError = useCallback(() => {
    setError(null);
  }, []);

  const changeCurrencyTo = useCallback<ChangeCurrencyToFn>(async (...args) => {
    const err = await props.changeCurrencyTo(...args);
    setError(err);
    return err;
  }, [props.changeCurrencyTo])

  return props.children({
    currentCurrency: props.currentCurrency,
    availableCurrencies: props.availableCurrencies,
    changeCurrencyTo,
    error,
    dismissError,
  }) as any;
}

/**
 * Provides the current currency in the application context and allows
 * it to be changed by a new one from the available list it also provides
 * @param props the props
 * @returns a react node
 */
export default function AppCurrencyRetriever(props: {
  children: FnAppCurrencyRetrieverType;
}) {
  return (
    <LocaleContext.Consumer>
      {
        (localeContext) => {
          const nProps = {
            currentCurrency: currencies[localeContext.currency.toUpperCase()],
            availableCurrencies: arrCurrencies,
            changeCurrencyTo: localeContext.updating ? () => null as any : localeContext.changeCurrencyTo,
            children: props.children,
          };

          return (
            <ActualAppCurrencyRetriever {...nProps}/>
          );
        }
      }
    </LocaleContext.Consumer>
  );
}

export function useAppCurrencyRetriever() {
  const localeContext = useContext(LocaleContext);

  return {
    currentCurrency: currencies[localeContext.currency.toUpperCase()],
    availableCurrencies: arrCurrencies,
    changeCurrencyTo: localeContext.updating ? () => null as any : localeContext.changeCurrencyTo,
  };
}