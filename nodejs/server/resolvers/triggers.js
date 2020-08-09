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
function mergeIOTriggers(triggerA, triggerB) {
    if (!triggerA) {
        return triggerB;
    }
    else if (!triggerB) {
        return triggerA;
    }
    const mergedTrigger = async (arg) => {
        const originalUpdateResult = await triggerA(arg);
        if (originalUpdateResult) {
            return await triggerB({
                ...arg,
                update: originalUpdateResult,
            });
        }
        else {
            return await triggerB(arg);
        }
    };
    return mergedTrigger;
}
function mergeSearchTriggers(triggerA, triggerB) {
    if (!triggerA) {
        return triggerB;
    }
    else if (!triggerB) {
        return triggerA;
    }
    const mergedTrigger = async (arg) => {
        await triggerA(arg);
        await triggerB(arg);
    };
    return mergedTrigger;
}
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
        if (t === null || typeof t === "undefined") {
            return;
        }
        const iTrigger = t.itemDefinition;
        const modTrigger = t.module;
        if (iTrigger) {
            if (iTrigger.io) {
                const fixed = fixPaths(iTrigger.io);
                Object.keys(fixed).forEach((path) => {
                    final.itemDefinition.io[path] = mergeIOTriggers(final.itemDefinition.io[path], fixed[path]);
                });
            }
            if (iTrigger.search) {
                const fixed = fixPaths(iTrigger.search);
                Object.keys(fixed).forEach((path) => {
                    final.itemDefinition.search[path] = mergeSearchTriggers(final.itemDefinition.search[path], fixed[path]);
                });
            }
        }
        if (modTrigger) {
            if (modTrigger.io) {
                const fixed = fixPaths(modTrigger.io);
                Object.keys(fixed).forEach((path) => {
                    final.module.io[path] = mergeIOTriggers(final.module.io[path], fixed[path]);
                });
            }
            if (modTrigger.search) {
                const fixed = fixPaths(modTrigger.search);
                Object.keys(fixed).forEach((path) => {
                    final.module.search[path] = mergeSearchTriggers(final.module.search[path], fixed[path]);
                });
            }
        }
    });
    return final;
}
exports.mergeTriggerRegistries = mergeTriggerRegistries;
