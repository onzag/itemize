import React from "react";
interface IFnAppLanguageRetrieverLanguageFormType {
    code: string;
    name: string;
}
declare type FnAppLanguageRetrieverType = (arg: {
    currentLanguage: IFnAppLanguageRetrieverLanguageFormType;
    availableLanguages: IFnAppLanguageRetrieverLanguageFormType[];
    rtl: boolean;
    changeLanguageTo: (code: string) => void;
}) => React.ReactNode;
export default function AppLanguageRetriever(props: {
    children: FnAppLanguageRetrieverType;
}): JSX.Element;
export {};
