/**
 * This file contains utilities for localization
 * 
 * @module
 */

import { capitalize as utilcapitalize} from "../../../util";

/**
 * Capitalizes a string, taking into consideration special characters
 * @param str the string to capitalize
 */
export function capitalize(str: string) {
  return utilcapitalize(str);
}
