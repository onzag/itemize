import { Pool } from "tarn";
import Root, { IRootRawJSONDataType } from "../base/Root";
import { logger } from ".";

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
      logger.debug(
        message,
      );
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