/**
 * Simply provides the current country of the application context
 *
 * @packageDocumentation
 */
import React from "react";
import { ICountryType } from "../../../imported-resources";
/**
 * The function for the retriever
 */
declare type FnAppCountryRetrieverType = (arg: {
    currentCountry: ICountryType;
    availableCountries: ICountryType[];
    changeCountryTo: (code: string) => void;
}) => React.ReactNode;
/**
 * provides the current country and allows to change them
 * @param props the country retriever props
 * @returns a react node
 */
export default function AppCountryRetriever(props: {
    children: FnAppCountryRetrieverType;
}): JSX.Element;
export {};
