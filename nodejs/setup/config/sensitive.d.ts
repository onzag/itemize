/**
 * Allows to set up a sensitive configuration information
 * @packageDocumentation
 */
import { ISensitiveConfigRawJSONDataType } from "../../config";
/**
 * Allows for setting up the senstive configuration
 * @param version development of production
 * @param currentConfig the currently stored config
 * @param referenceConfig the reference configuration to use values against
 */
export declare function sensitiveConfigSetup(version: string, currentConfig: ISensitiveConfigRawJSONDataType, referenceConfig: ISensitiveConfigRawJSONDataType): Promise<ISensitiveConfigRawJSONDataType>;
