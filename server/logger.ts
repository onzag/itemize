import winston from "winston";
import "winston-daily-rotate-file";
import { INSTANCE_MODE, LOG_LEVEL, NODE_ENV } from "./environment";

// building the logger
export const logger: winston.Logger = (
  INSTANCE_MODE === "BUILD_DATABASE" ||
  INSTANCE_MODE === "LOAD_DATABASE_DUMP"
) ? null : winston.createLogger({
  // buggy typescript somehow the definitions change all the time and will not work
  level: (LOG_LEVEL || (NODE_ENV !== "production" ? "debug" : "info")) as any,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.DailyRotateFile({ filename: `logs/error.${INSTANCE_MODE}.log`, level: "error" }),
    new winston.transports.DailyRotateFile({ filename: `logs/info.${INSTANCE_MODE}.log`, level: "info" })
  ]
});

// if not production add a console.log
if (NODE_ENV !== "production" && logger) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}