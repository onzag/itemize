/**
 * Simply provides the current currency
 * 
 * @module
 */

import React from "react";
import { ICurrencyType, currencies, arrCurrencies } from "../../../imported-resources";
import { LocaleContext } from "../../internal/providers/locale-provider";

/**
 * This is the function for the arg retriever
 */
type FnAppCurrencyRetrieverType = (arg: {
  currentCurrency: ICurrencyType,
  availableCurrencies: ICurrencyType[],
  changeCurrencyTo: (code: string) => void,
}) => React.ReactNode;

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
          return props.children({
            currentCurrency: currencies[localeContext.currency.toUpperCase()],
            availableCurrencies: arrCurrencies,
            changeCurrencyTo: localeContext.updating ? () => null : localeContext.changeCurrencyTo,
          });
        }
      }
    </LocaleContext.Consumer>
  );
}