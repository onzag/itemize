import { Pool } from "tarn";
import Root, { IRootRawJSONDataType } from "../base/Root";
import { logger } from ".";

// Used to optimize, it is found out that passing unecessary logs to the transport
// can slow the logger down even if it won't display
const LOG_LEVEL = process.env.LOG_LEVEL;
const CAN_LOG_DEBUG = LOG_LEVEL === "debug" || LOG_LEVEL === "silly" || (!LOG_LEVEL && process.env.NODE_ENV !== "production");

export function retrieveRootPool(rawData: IRootRawJSONDataType): Pool<Root> {
  const pool: Pool<Root> = new Pool({
    create: (cb) => {
      cb(null, new Root(rawData));
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
      CAN_LOG_DEBUG && logger.debug(
        message,
      );
    },
    min: 10,
    max: 100,
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