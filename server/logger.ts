import winston from "winston";
import Transport from "winston-transport";
import { FORCE_CONSOLE_LOGS, INSTANCE_LOG_ERROR_FILE, INSTANCE_LOG_FILE, INSTANCE_MODE, INSTANCE_UUID, LOG_LEVEL, NODE_ENV } from "./environment";
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

export interface IItemizeLoggingStructure<T> {
  message: string;

  className?: string;
  methodName?: string;
  functionName?: string;
  endpoint?: string;
  data?: T;
}

export interface IItemizeLoggingErrorStructure<T> extends IItemizeLoggingStructure<T> {
  serious?: boolean;
  err?: Error;
  orphan?: boolean;
}

export interface IItemizeFinalLoggingObject extends IItemizeLoggingStructure<any> {
  serious?: boolean;
  errMessage?: string;
  errStack?: string;
  orphan?: boolean;
  timestamp: string;
}

// building the logger
const rawLogger: winston.Logger = disableLogger ? null : winston.createLogger({
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
if ((NODE_ENV !== "production" || FORCE_CONSOLE_LOGS) && rawLogger) {
  rawLogger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

function converterFn(level: string, obj: IItemizeLoggingErrorStructure<any>) {
  let msg = "";
  if (obj.className) {
    msg += obj.className;
  }
  if (obj.methodName) {
    if (msg) {
      msg += ".";
    }
    msg += obj.methodName;
  } else if (obj.functionName) {
    if (msg) {
      msg += ".";
    }
    msg += obj.functionName;
  }

  if (obj.serious) {
    if (msg) {
      msg += " ";
    }
    msg += "[SERIOUS]";
  }

  if (msg) {
    msg += ": ";
  }

  msg += obj.message;

  delete obj.message;

  if (obj.err) {
    const err = obj.err;
    delete obj.err;

    (obj as any).errMessage = err.message;
    (obj as any).errStack = err.stack;
  }

  return rawLogger[level](msg, obj);
}

export const logger = disableLogger ? null : {
  info: converterFn.bind(null, "info") as (arg: IItemizeLoggingStructure<any>) => void,
  debug: converterFn.bind(null, "debug") as (arg: IItemizeLoggingStructure<any>) => void,
  error: converterFn.bind(null, "error") as (arg: IItemizeLoggingErrorStructure<any>) => void,
}

export type ILoggerType = typeof logger;

class LoggingProviderTransport extends Transport {
  private provider: LoggingProvider<any>;
  constructor(options: winston.transport.TransportStreamOptions, provider: LoggingProvider<any>) {
    super(options);

    this.provider = provider;
  }

  public async log(info: any, next: () => void) {
    const level = info.level as string;

    if (level !== "info" && level !== "error") {
      next();
      return;
    }

    try {
      await this.provider.log(INSTANCE_UUID, level, info);
    } catch (err) {
      await this.provider.logToFallback(err, INSTANCE_UUID, level, info);
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

  rawLogger.add(infoTransport);

  rawLogger.remove(standardInfoTransport);
  rawLogger.remove(standardErrorTransport);
}

process.on('warning', (warningInfo) => {
  logger.error({
    message: warningInfo.message,
    err: warningInfo,
    serious: true,
  });
});

process.on('uncaughtException', async (err) => {
  logger.error({
    message: err.message,
    err,
    serious: true,
  });

  // give it time to save but it should die
  await wait(1000);
  process.exit(1);
});

const wait = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};