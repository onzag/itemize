/**
 * Builds and requests the necessary resources either the required
 * ones as well as whatever else the programmer adds and it even optimizes
 * these by running some optimizers
 *
 * @packageDocumentation
 */
import { IBuilderBasicConfigType } from "./config";
/**
 * Builds all the resources in the resources directory and optimizes if
 * possible
 * @param rawConfig the raw config
 * @returns a void promise
 */
export declare function buildResources(rawConfig: IBuilderBasicConfigType): Promise<void>;
