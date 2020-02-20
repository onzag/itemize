/**
 * This file generates the manifest files based on the config and the root
 *
 * @packageDocumentation
 */
import { IBuilderBasicConfigType } from "./config";
import { IRootRawJSONDataType } from "../base/Root";
/**
 * Builds the different manifest files that are necessary
 * @param rawConfig the raw configuration
 * @param rawRoot the root in raw form
 * @returns a void promise
 */
export declare function buildManifest(rawConfig: IBuilderBasicConfigType, rawRoot: IRootRawJSONDataType): Promise<void>;
