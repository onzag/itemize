import winston from "winston";
import "winston-daily-rotate-file";

// get the environment in order to be able to set it up
const NODE_ENV = process.env.NODE_ENV;
const LOG_LEVEL = process.env.LOG_LEVEL;
const INSTANCE_MODE: "CLUSTER_MANAGER" | "GLOBAL_MANAGER" | "ABSOLUTE" | "EXTENDED" | "BUILD_DATABASE" | "LOAD_DATABASE_DUMP" | "CLEAN_STORAGE" | "CLEAN_SITEMAPS" = process.env.INSTANCE_MODE || "ABSOLUTE" as any;

// building the logger
export const logger: winston.Logger = (
  INSTANCE_MODE === "BUILD_DATABASE" ||
  INSTANCE_MODE === "LOAD_DATABASE_DUMP"
) ? null : winston.createLogger({
  level: LOG_LEVEL || (NODE_ENV !== "production" ? "debug" : "info"),
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