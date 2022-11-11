/**
 * This file contains all the interfaces that are used to define SSR rules
 * it used to be big, but now it has become simple
 * @module
 */

import type Root from "../../base/Root";
import type { ILangLocalesType } from "../../base/Root";
import type { ICollectorType } from "../../client";
import type { ISSRContextType } from "../../client/internal/providers/ssr-provider";
import type { IConfigRawJSONDataType } from "../../config";

/**
 * This is what a SSR rule is and specifies
 * how a page is to be rendered
 */
export interface ISSRRule {
  /**
   * The language that the rule is rendering at
   */
  language: string;
  /**
   * All the other available languages, this is used to build
   * the href langs
   */
  languages: string[];
  /**
   * whether it is a right to left language so it
   * can be accounted for in the HTML
   */
  rtl: boolean;
  /**
   * The user we are rendering for
   */
  forUser: {
    token: string;
    id: string;
    role: string;
    customData: any;
  };
  /**
   * Whether we will simply not use SSR at all
   */
  noSSR: boolean;
  /**
   * The mode the user is going with
   */
  mode: "development" | "production";
}

export interface ISSRServerModeInfo {
  collector?: ICollectorType;
  config: IConfigRawJSONDataType,
  ssrContext: ISSRContextType;
  clientDetails: {
    lang: string;
    currency: string;
    country: string;
    guessedData: string;
  };
  langLocales: ILangLocalesType;
  root: Root;
  originalUrl: string;
  redirectTo: (path: string) => void;
  userLocalizationService: any;
  ip: string;
  appliedRule: ISSRRule;
}