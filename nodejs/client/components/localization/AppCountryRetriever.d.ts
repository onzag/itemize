import React from "react";
import { ICountryType } from "../../../imported-resources";
declare type FnAppCountryRetrieverType = (arg: {
    currentCountry: ICountryType;
    availableCountries: ICountryType[];
    changeCountryTo: (code: string) => void;
}) => React.ReactNode;
export default function AppCountryRetriever(props: {
    children: FnAppCountryRetrieverType;
}): JSX.Element;
export {};
