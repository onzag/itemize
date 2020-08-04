"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IOTriggerActions;
(function (IOTriggerActions) {
    IOTriggerActions[IOTriggerActions["CREATE"] = 0] = "CREATE";
    IOTriggerActions[IOTriggerActions["CREATED"] = 1] = "CREATED";
    IOTriggerActions[IOTriggerActions["EDIT"] = 2] = "EDIT";
    IOTriggerActions[IOTriggerActions["EDITED"] = 3] = "EDITED";
    IOTriggerActions[IOTriggerActions["DELETE"] = 4] = "DELETE";
    IOTriggerActions[IOTriggerActions["DELETED"] = 5] = "DELETED";
    IOTriggerActions[IOTriggerActions["GET"] = 6] = "GET";
})(IOTriggerActions = exports.IOTriggerActions || (exports.IOTriggerActions = {}));
function fixPaths(src) {
    const output = {};
    Object.keys(src).forEach((key) => {
        let actualPathKey = key;
        if (actualPathKey.startsWith("/")) {
            actualPathKey.substr(1);
        }
        if (actualPathKey.endsWith("/")) {
            actualPathKey.substr(0, actualPathKey.length - 1);
        }
        output[actualPathKey] = src[key];
    });
    return output;
}
exports.fixPaths = fixPaths;
function mergeTriggerRegistries(...triggers) {
    const final = {
        itemDefinition: {
            io: {},
            search: {},
        },
        module: {
            io: {},
            search: {},
        },
    };
    triggers.forEach((t) => {
        const iTrigger = t.itemDefinition;
        const modTrigger = t.module;
        if (iTrigger) {
            if (iTrigger.io) {
                Object.assign(final.itemDefinition.io, fixPaths(iTrigger.io));
            }
            if (iTrigger.search) {
                Object.assign(final.itemDefinition.search, fixPaths(iTrigger.search));
            }
        }
        if (modTrigger) {
            if (modTrigger.io) {
                Object.assign(final.module.io, fixPaths(modTrigger.io));
            }
            if (modTrigger.search) {
                Object.assign(final.module.search, fixPaths(modTrigger.search));
            }
        }
    });
    return final;
}
exports.mergeTriggerRegistries = mergeTriggerRegistries;
