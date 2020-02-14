/**
 * Builds the HTML file that is used as the index entry for the itemize
 * application
 *
 * @packageDocumentation
 */
import { IBuilderBasicConfigType } from "./config";
/**
 * Builds and stores the html file in the dist directory from the source
 * for the itemize app, this file also makes for the buildnumber as the buildnumber
 * is synchronized within the html file
 * @param rawConfig the configuration that is being used
 */
export declare function buildHTML(rawConfig: IBuilderBasicConfigType): Promise<void>;
