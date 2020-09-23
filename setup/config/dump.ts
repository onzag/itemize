/**
 * Allows to set up a the dump configuration information
 * @packageDocumentation
 */

import { ISensitiveConfigRawJSONDataType, IDumpConfigRawJSONDataType } from "../../config";

/**
 * Allows to set up the dump configuration information
 * @param currentConfig the current configuration
 * @param sensitiveConfig the sensitive config
 */
export function dumpConfigRequest(
  currentConfig: IDumpConfigRawJSONDataType,
  sensitiveConfig: ISensitiveConfigRawJSONDataType,
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
      primaryContainerId:
        // No openstack containers defined
        !sensitiveConfig.openstackContainers ?
          // then it's main
          "MAIN" :
          (
            // main in the openstack container list
            sensitiveConfig.openstackContainers["MAIN"] ?
            // so it is main
            "MAIN" :
            // pick the first container you find, nothing found, then main
            Object.keys(sensitiveConfig.openstackContainers)[0] || "MAIN"
          ),
    },
  };
}