/**
 * This file copies the necessary moment files that are used for data displaying
 * in all the different languages that are meant to be supported
 *
 * @packageDocumentation
 */
import { IBuilderBasicConfigType } from "./config";
/**
 * Copies the compiled moment files that exist within the node_modules
 * for async usage as they are deemed necessary on the fly
 * @param rawConfig the raw configuration
 * @returns a void promise
 */
export declare function copyMomentFiles(rawConfig: IBuilderBasicConfigType): Promise<void>;
