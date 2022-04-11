import winston from "winston";
import Transport from "winston-transport";
import { INSTANCE_LOG_ERROR_FILE, INSTANCE_LOG_FILE, INSTANCE_MODE, INSTANCE_UUID, LOG_LEVEL, NODE_ENV } from "./environment";
import type LoggingProvider from "./services/base/LoggingProvider";

const disableLogger = (
  INSTANCE_MODE === "BUILD_DATABASE" ||
  INSTANCE_MODE === "LOAD_DATABASE_DUMP"
);

const standardInfoTransport = disableLogger ? null : (
  new winston.transports.File({
    level: "info",
    filename: INSTANCE_LOG_FILE,
  })
);

const standardErrorTransport = disableLogger ? null : (
  new winston.transports.File({
    level: "error",
    filename: INSTANCE_LOG_ERROR_FILE,
  })
);

// building the logger
export const logger: winston.Logger = disableLogger ? null : winston.createLogger({
  // buggy typescript somehow the definitions change all the time and will not work
  level: (LOG_LEVEL || (NODE_ENV !== "production" ? "debug" : "info")) as any,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    standardInfoTransport,
    standardErrorTransport,
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

class LoggingProviderTransport extends Transport {
  private provider: LoggingProvider<any>;
  constructor(options: winston.transport.TransportStreamOptions, provider: LoggingProvider<any>) {
    super(options);

    this.provider = provider;
  }

  public async log(info: any, next: () => void) {
    try {
      await this.provider.log(INSTANCE_UUID, this.level as any, info);
    } catch (err) {
      await this.provider.logToFallback(err, INSTANCE_UUID, this.level as any, info);
    }
    next();
  }
}

export function extendLoggerWith(p: LoggingProvider<any>) {
  if (disableLogger) {
    return;
  }

  const infoTransport = new LoggingProviderTransport({
    level: "info",
  }, p);

  const errorTransport = new LoggingProviderTransport({
    level: "error",
  }, p);

  logger.add(infoTransport);
  logger.add(errorTransport);

  logger.remove(standardInfoTransport);
  logger.remove(standardErrorTransport);
}