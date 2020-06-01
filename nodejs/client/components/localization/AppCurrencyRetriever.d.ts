import React from "react";
import { ICurrencyType } from "../../../imported-resources";
declare type FnAppCurrencyRetrieverType = (arg: {
    currentCurrency: ICurrencyType;
    availableCurrencies: ICurrencyType[];
    changeCurrencyTo: (code: string) => void;
}) => React.ReactNode;
export default function AppCurrencyRetriever(props: {
    children: FnAppCurrencyRetrieverType;
}): JSX.Element;
export {};
