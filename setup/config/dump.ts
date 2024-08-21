/**
 * Allows to set up a the dump configuration information
 * @module
 */

import { IDumpConfigRawJSONDataType, IConfigRawJSONDataType } from "../../config";

/**
 * Allows to set up the dump configuration information
 * @param currentConfig the current configuration
 * @param sensitiveConfig the sensitive config
 */
export function dumpConfigRequest(
  currentConfig: IDumpConfigRawJSONDataType,
  config: IConfigRawJSONDataType,
): IDumpConfigRawJSONDataType {
  // dump cannot be reconfigured because it's a very complex type
  // and this config utility doesn't support such complexity
  if (currentConfig) {
    return currentConfig;
  }

  return {
    save: {
      "cms": {
        "fragment": true,
      },
    },
    load: {
      primaryClusterId: config.defaultCluster,
    },
  };
}
