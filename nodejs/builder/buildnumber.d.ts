/**
 * Builds the builnumber file
 *
 * @packageDocumentation
 */
import { IBuilderBasicConfigType } from "./config";
/**
 * Creates the buildnumber file
 * @param rawConfig the configuration that is being used
 */
export declare function buildBuildNumber(rawConfig: IBuilderBasicConfigType): Promise<void>;
