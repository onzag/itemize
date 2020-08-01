/**
 * Contains the fast prototyping wrappers for usage
 * with the itemize application in the fast prototyping mode
 *
 * @packageDocumentation
 */
import React from "react";
import { ILocaleContextType } from "../internal/app";
import { IConfigRawJSONDataType } from "../../config";
/**
 * The appwrapper is the static wrapper that does not really ever change and stays on top
 * of the entire application for this reason, it's expected to render once
 *
 * For fast prototyping we use material ui, and as such we pass those providers here
 *
 * @param app the application that react is asking to render
 * @param config the configuration that is being used, this is the same as the config.json
 */
export declare function appWrapper(app: React.ReactElement, config: IConfigRawJSONDataType): JSX.Element;
/**
 * The main wrapper stays under the app and it's a dynamic component that will be requested
 * to updated if the app locale context changes, which creates a chain effect
 *
 * for fast prototyping we use the mui pickers utility for material ui pickers, and these
 * need to change according to locale
 *
 * @param mainComponent the main component that is under the app
 * @param localeContext the locale that we are using
 */
export declare function mainWrapper(mainComponent: React.ReactElement, localeContext: ILocaleContextType): JSX.Element;
