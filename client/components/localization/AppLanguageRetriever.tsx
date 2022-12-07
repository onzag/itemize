/**
 * Simply provides the current language
 * 
 * @module
 */

import type { EndpointErrorType } from "../../../base/errors";
import React, { useCallback, useState } from "react";
import { ChangeLanguageToFn, LocaleContext } from "../../internal/providers/locale-provider";

/**
 * How the language is formed
 */
interface IFnAppLanguageRetrieverLanguageFormType {
  code: string;
  name: string;
}

interface IActualAppLanguageRetrieverProps {
  currentLanguage: IFnAppLanguageRetrieverLanguageFormType;
  availableLanguages: IFnAppLanguageRetrieverLanguageFormType[];
  rtl: boolean;
  changeLanguageTo: ChangeLanguageToFn;
}

interface IActualAppLanguageRetrieverPropsWithFn extends IActualAppLanguageRetrieverProps {
  children: FnAppLanguageRetrieverType;
}

export interface ILanguageRetrieverArg extends IActualAppLanguageRetrieverProps {
  error: EndpointErrorType;
  dismissError?: () => void;
}

/**
 * The function that the retriever calls
 */
type FnAppLanguageRetrieverType = (arg: ILanguageRetrieverArg) => React.ReactNode;

function ActualAppLanguageRetriever(props: IActualAppLanguageRetrieverPropsWithFn) {
  const [error, setError] = useState<EndpointErrorType>(null);

  const dismissError = useCallback(() => {
    setError(null);
  }, []);

  const changeLanguageTo = useCallback<ChangeLanguageToFn>(async (...args) => {
    const err = await props.changeLanguageTo(...args);
    setError(err);
    return err;
  }, [props.changeLanguageTo])

  return props.children({
    currentLanguage: props.currentLanguage,
    availableLanguages: props.availableLanguages,
    rtl: props.rtl,
    changeLanguageTo,
    error,
    dismissError,
  }) as any;
}

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

          const nProps = {
            currentLanguage,
            availableLanguages,
            rtl: localeContext.rtl,
            changeLanguageTo: localeContext.updating ? () => null as any : localeContext.changeLanguageTo,
            children: props.children
          };

          return (
            <ActualAppLanguageRetriever
              {...nProps}
            />
          )
        }
      }
    </LocaleContext.Consumer>
  );
}
