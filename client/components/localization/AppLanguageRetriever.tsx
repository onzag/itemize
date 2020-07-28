/**
 * Simply provides the current language
 * 
 * @packageDocumentation
 */

import React from "react";
import { LocaleContext } from "../../internal/app";

/**
 * How the language is formed
 */
interface IFnAppLanguageRetrieverLanguageFormType {
  code: string;
  name: string;
}

/**
 * The function that the retriever calls
 */
type FnAppLanguageRetrieverType = (arg: {
  currentLanguage: IFnAppLanguageRetrieverLanguageFormType,
  availableLanguages: IFnAppLanguageRetrieverLanguageFormType[],
  rtl: boolean,
  changeLanguageTo: (code: string) => void,
}) => React.ReactNode;

/**
 * Allows to read the current language as well as to change it from
 * the list of available languages that it can change, it also provides
 * the rtl property for right to left languages
 * @param props the props
 * @returns a react node
 */
export default function AppLanguageRetriever(props: {
  children: FnAppLanguageRetrieverType;
}) {
  return (
    <LocaleContext.Consumer>
      {
        (localeContext) => {
          const currentLanguage: IFnAppLanguageRetrieverLanguageFormType = {
            code: localeContext.language,
            name: localeContext.langLocales[localeContext.language].name,
          };
          const availableLanguages: IFnAppLanguageRetrieverLanguageFormType[] = [];
          Object.keys(localeContext.langLocales).forEach((code) => {
            availableLanguages.push({
              code,
              name: localeContext.langLocales[code].name,
            });
          });
          return props.children({
            currentLanguage,
            availableLanguages,
            rtl: localeContext.rtl,
            changeLanguageTo: localeContext.updating ? () => null : localeContext.changeLanguageTo,
          });
        }
      }
    </LocaleContext.Consumer>
  );
}
