"use strict";
/**
 * Allows to set up a the dump configuration information
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.dumpConfigRequest = void 0;
/**
 * Allows to set up the dump configuration information
 * @param currentConfig the current configuration
 * @param sensitiveConfig the sensitive config
 */
function dumpConfigRequest(currentConfig, sensitiveConfig) {
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
                (sensitiveConfig.localContainer || "MAIN") :
                (
                // main in the openstack container list
                sensitiveConfig.openstackContainers["MAIN"] ?
                    // so it is main
                    "MAIN" :
                    // pick the first container you find, nothing found, then main
                    Object.keys(sensitiveConfig.openstackContainers)[0] || sensitiveConfig.localContainer || "MAIN"),
        },
    };
}
exports.dumpConfigRequest = dumpConfigRequest;
