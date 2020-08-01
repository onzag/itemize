/**
 * Allows to set up a standard configuration information
 * @packageDocumentation
 */
import { IConfigRawJSONDataType } from "../../config";
/**
 * Allows to set up a standard configuration information
 * @param currentConfig the current configuration
 * @param packageJSON the current package.json file content (parsed)
 */
export declare function standardConfigSetup(currentConfig: IConfigRawJSONDataType, packageJSON: any): Promise<IConfigRawJSONDataType>;
