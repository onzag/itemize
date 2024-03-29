/**
 * Contains a pool of root, we need a pool of root because
 * we are unable to render an itemize app being used at once
 * as the root registires are modified during SSR rendering
 * @module
 */

import { Pool } from "tarn";
import Root, { IRootRawJSONDataType } from "../base/Root";
import { logger } from "./logger";
import {
  CAN_LOG_DEBUG,
} from "./environment";

/**
 * Provides a pool of root
 * @param rawData the root raw data
 */
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
        {
          message,
          functionName: "retrieveRootPool",
        }
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