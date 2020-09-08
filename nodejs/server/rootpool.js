"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tarn_1 = require("tarn");
const Root_1 = __importDefault(require("../base/Root"));
const _1 = require(".");
// Used to optimize, it is found out that passing unecessary logs to the transport
// can slow the logger down even if it won't display
const LOG_LEVEL = process.env.LOG_LEVEL;
const CAN_LOG_DEBUG = LOG_LEVEL === "debug" || LOG_LEVEL === "silly" || (!LOG_LEVEL && process.env.NODE_ENV !== "production");
function retrieveRootPool(rawData) {
    const pool = new tarn_1.Pool({
        create: (cb) => {
            cb(null, new Root_1.default(rawData));
        },
        validate: () => {
            return true;
        },
        destroy: () => {
            // if the object is destroyed so all its memory addresses
            // so no need for manual cleanup when javacript garbage collector
            // can collect all the slots
            return;
        },
        log: (message) => {
            CAN_LOG_DEBUG && _1.logger.debug(message);
        },
        min: 10,
        max: 40,
        acquireTimeoutMillis: 1000,
        createTimeoutMillis: 1000,
        destroyTimeoutMillis: 300,
        idleTimeoutMillis: 30000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 1,
        propagateCreateError: true,
    });
    return pool;
}
exports.retrieveRootPool = retrieveRootPool;
