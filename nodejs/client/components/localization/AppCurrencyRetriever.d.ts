/**
 * Simply provides the current currency
 *
 * @packageDocumentation
 */
import React from "react";
import { ICurrencyType } from "../../../imported-resources";
/**
 * This is the function for the arg retriever
 */
declare type FnAppCurrencyRetrieverType = (arg: {
    currentCurrency: ICurrencyType;
    availableCurrencies: ICurrencyType[];
    changeCurrencyTo: (code: string) => void;
}) => React.ReactNode;
/**
 * Provides the current currency in the application context and allows
 * it to be changed by a new one from the available list it also provides
 * @param props the props
 * @returns a react node
 */
export default function AppCurrencyRetriever(props: {
    children: FnAppCurrencyRetrieverType;
}): JSX.Element;
export {};
