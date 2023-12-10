import express, { Router } from "express";
import type { RQArg, RQField, RQRootSchema } from "../base/Root/rq";
import { ENDPOINT_ERRORS, MAX_FIELD_SIZE, MAX_FILES_PER_REQUEST, MAX_FILE_SIZE } from "../constants";
import busboy from "busboy";
import { logger } from "./logger";
import { ReadStreamOptions, WriteStream, ReadStream } from "fs-capacitor";
import { EndpointError, EndpointErrorType } from "../base/errors";
import { IRQArgs, IRQEndpointValue, IRQRequestFields, IRQValue, RQArgsValue } from "../rq-querier";

interface IPromisedFileStream {
  id: string;
  fileName: string;
  mimeType: string;
  encoding: string;
  createReadStream: (options?: ReadStreamOptions) => ReadStream;
}

interface IFilesAwaiter {
  // the promise that provides the file stream
  promise: Promise<IPromisedFileStream>;
  // resolve this promise or reject it, depending on what happens to the request
  promiseResolve: (v: IPromisedFileStream) => void;
  promiseReject: (err: EndpointError) => void;

  // whether it is resolved
  isResolved: boolean;
  // and the capacitor that represents the write stream
  capacitor: WriteStream;
};

interface IFilesAwaiterContainer {
  // this will be the id of the file
  [id: string]: IFilesAwaiter;
};

function processSingleArg(
  files: IFilesAwaiterContainer,
  schema: RQArg,
  argValue: RQArgsValue,
  alwaysRequired: boolean,
  parent: any,
  parentKey: string | number,
  varErr: string = "",
) {
  if (typeof argValue === "undefined" || argValue === null) {
    if (schema.required || alwaysRequired) {
      throw new EndpointError({
        code: ENDPOINT_ERRORS.UNSPECIFIED,
        message: "argument " + varErr + " cannot be null or undefined as it's required",
      });
    } else {
      // it's alright
      return;
    }
  }

  if (schema.type === "any") {
    return;
  } else if (schema.type === "binary") {
    if (typeof argValue !== "string") {
      throw new EndpointError({
        code: ENDPOINT_ERRORS.UNSPECIFIED,
        message: "argument " + varErr + " should be string as it's binary to mark a file id",
      });
    } else {
      if (!files[argValue]) {
        const container: IFilesAwaiter = {
          capacitor: null,
          isResolved: false,
          promise: null,
          promiseReject: null,
          promiseResolve: null,
        }
        container.promise = new Promise((resolve, reject) => {
          container.promiseReject = reject;
          container.promiseResolve = resolve;
        });
        files[argValue] = container;
        // change it to the promise
        parent[parentKey] = container.promise as any;
      } else {
        // file was used twice?
        // should work just fine
      }
    }
  } else if (schema.type === "boolean") {
    if (typeof argValue !== "boolean") {
      throw new EndpointError({
        code: ENDPOINT_ERRORS.UNSPECIFIED,
        message: "argument " + varErr + " should be boolean",
      });
    }
  } else if (schema.type === "integer") {
    if (!Number.isInteger(argValue)) {
      throw new EndpointError({
        code: ENDPOINT_ERRORS.UNSPECIFIED,
        message: "argument " + varErr + " should be integer",
      });
    }
  } else if (schema.type === "integer-positive") {
    if (!Number.isInteger(argValue) || (argValue as number) < 0) {
      throw new EndpointError({
        code: ENDPOINT_ERRORS.UNSPECIFIED,
        message: "argument " + varErr + " should be a positive integer",
      });
    }
  } else if (schema.type === "number") {
    if (typeof argValue !== "number" || isNaN(argValue)) {
      throw new EndpointError({
        code: ENDPOINT_ERRORS.UNSPECIFIED,
        message: "argument " + varErr + " should be a number",
      });
    }
  } else if (schema.type === "string") {
    if (typeof argValue !== "string") {
      throw new EndpointError({
        code: ENDPOINT_ERRORS.UNSPECIFIED,
        message: "argument " + varErr + " should be a string",
      });
    }
  } else if (schema.type === "object") {
    processArgs(files, schema.properties, argValue as IRQArgs, varErr);
  }
}

function processArgs(files: IFilesAwaiterContainer, schema: { [id: string]: RQArg }, args: IRQArgs, prefixErrr: string = "") {
  if (typeof args !== "object" || args === null || typeof args === "undefined" || Array.isArray(args)) {
    throw new EndpointError({
      code: ENDPOINT_ERRORS.UNSPECIFIED,
      message: (prefixErrr ? "base arguments" : prefixErrr) + " should be an object",
    });
  }
  Object.keys(schema).forEach((argKey) => {
    const argSchema = schema[argKey];
    const argValue = args[argKey];

    if (argSchema.array) {
      if (typeof argValue === "undefined" || argValue === null) {
        // it's required but not specified
        if (argSchema.required) {
          throw new EndpointError({
            code: ENDPOINT_ERRORS.UNSPECIFIED,
            message: "argument " + (prefixErrr ? prefixErrr + "." : "") + argKey + " cannot be null or undefined as it's required",
          });
        } else {
          // it's alright
          return;
        }
      }

      // not array
      if (!Array.isArray(argValue)) {
        // well it must be
        throw new EndpointError({
          code: ENDPOINT_ERRORS.UNSPECIFIED,
          message: "argument " + (prefixErrr ? prefixErrr + "." : "") + argKey + " should be array",
        });
      } else {
        // we can loop within and validate each value
        argValue.forEach((v, index) => {
          // files for the files
          // the shema, the value in question
          // it's always required and must not be null
          // the parent is our array
          // and the setter is at our index
          // and we plug our prefix to our location
          processSingleArg(files, argSchema, v, true, argValue, index, (prefixErrr ? prefixErrr + "." : "") + argKey + "[" + index + "]");
        });
      }
    } else {
      // files for hte files
      // the schema of the arg
      // the value for this single argument
      // not always required
      // the parent is our args object
      // the key for this
      // and the prefix with our key for our var name
      processSingleArg(files, argSchema, argValue as RQArgsValue, false, args, argKey, (prefixErrr ? prefixErrr + "." : "") + argKey);
    }
  });
}

type IFieldsHelper = string | IFieldsHelper[];

function processFields(
  stdFields: {[id: string]: RQField},
  ownFields: {[id: string]: RQField},
  fieldsSrc: IFieldsHelper,
  plusOne: number = 0,
  prefixErrr: string = ""
): IRQRequestFields {
  if (!Array.isArray(fieldsSrc)) {
    throw new EndpointError({
      code: ENDPOINT_ERRORS.UNSPECIFIED,
      message: (prefixErrr ? "base fields" : prefixErrr) + " should be an array of string",
    });
  }
  const fieldsResult: IRQRequestFields = {};

  fieldsSrc.forEach((field, index) => {
    if (typeof field !== "string" && !Array.isArray(field)) {
      throw new EndpointError({
        code: ENDPOINT_ERRORS.UNSPECIFIED,
        message: prefixErrr + "[" + (index + plusOne) + "] should be string or array of string",
      });
    } else if (Array.isArray(field) && field.length === 0) {
      throw new EndpointError({
        code: ENDPOINT_ERRORS.UNSPECIFIED,
        message: prefixErrr + "[" + (index + plusOne) + "] is an array of length zero",
      });
    } else if (fieldsSrc.indexOf(field) !== index) {
      throw new EndpointError({
        code: ENDPOINT_ERRORS.UNSPECIFIED,
        message: prefixErrr + "[" + (index + plusOne) + "] is duplicate",
      });
    }
  });

  const realFieldsSrc = fieldsSrc.filter((v) => {
    v !== "&STD";
  });
  // it found some STD and we must add the standard
  if (realFieldsSrc.length !== fieldsSrc.length) {
    // now we will look
    Object.keys(stdFields).forEach((stdField) => {
      // if it's not already included and more defined
      if (!realFieldsSrc.includes(stdField)) {
        // we add it into
        realFieldsSrc.push(stdField);
      }
    });
  }

  realFieldsSrc.forEach((field) => {
    // original index, may be -1 if it's a key that came from "&STD"
    const index = fieldsSrc.indexOf(field) + plusOne;

    if (Array.isArray(field)) {
      const allToAddFields = [...field];
      const mainKey = allToAddFields.shift();
      if (typeof mainKey !== "string") {
        throw new EndpointError({
          code: ENDPOINT_ERRORS.UNSPECIFIED,
          message: prefixErrr + "[" + index + "][0] main key is not a string",
        });
      }
      const schemaField = stdFields[mainKey] || ownFields[mainKey];
      if (!schemaField) {
        throw new EndpointError({
          code: ENDPOINT_ERRORS.UNSPECIFIED,
          message: prefixErrr + "[" + index + "][0] main key does not represent a field found in the schema",
        });
      }
      // non-std
      if (schemaField.type === "object") {
        fieldsResult[mainKey] = processFields(
          schemaField.stdFields,
          schemaField.ownFields,
          allToAddFields,
          1,
          prefixErrr + "[" + index + "]",
        )
      } else {
        throw new EndpointError({
          code: ENDPOINT_ERRORS.UNSPECIFIED,
          message: prefixErrr + "[" + index + "] refers to an object type but the schema says it's " + schemaField.type,
        });
      }
    } else {
      const schemaField = stdFields[field] || ownFields[field];
      if (!schemaField) {
        throw new EndpointError({
          code: ENDPOINT_ERRORS.UNSPECIFIED,
          message: prefixErrr + "[" + index + "] key does not represent a field found in the schema",
        });
      }
      fieldsResult[field] = {};
      // std defined, it will add all standard fields
      if (schemaField.type === "object") {
        fieldsResult[field] = processFields(
          schemaField.stdFields,
          schemaField.ownFields,
          ["&STD"],
          1,
          prefixErrr + "[" + index + "]",
        )
      }
    }
  });

  return fieldsResult;
}

/**
 * The rq system is used to be a simplified version
 * of a graphql client with upload potential that doesn't need
 * a custom format and is optimized for simplicity
 * 
 * @param options 
 * @returns 
 */
export function rqSystem(options: {
  maxFileSize: number;
  maxFiles: number;
  maxFieldSize: number;
  jsonSchema: RQRootSchema;
  schema: RQRootSchema;
}) {
  const stringified = JSON.stringify(options.jsonSchema, null, 2);
  const router = Router();

  // this endpoint will not be visible for users
  // when the waf is enabled but can be useful for development
  // to see what is available, normally the client can see
  // this 
  router.get("/", (req, res) => {
    res.setHeader("content-type", "application/json; charset=utf-8");
    res.status(200);
    res.end(stringified);
  });

  // this is the actual endpoint that gets the job done
  router.post("/", async (req, res) => {
    // we are replying with json
    res.setHeader("content-type", "application/json; charset=utf-8");

    // just in case
    let hasResponded = false;

    // this is our request and response that we will process
    let rqRequest: any = null;
    let rqResponse: IRQEndpointValue = {
      data: {},
    };

    // our files that will be handled by the capacitor
    // as soon as the fields are received this will be populated until a file
    // stream is available
    const files: IFilesAwaiterContainer = {};

    // now we prepare the boi
    const bb = busboy({
      headers: req.headers,
      limits: {
        fields: 1,
        fieldSize: MAX_FIELD_SIZE,
        files: MAX_FILES_PER_REQUEST,
        fileSize: MAX_FILE_SIZE,
      },
    });

    // release the files that we have setup
    // either with an error or just because we are done
    let isFilesReleased = false;
    const releaseFiles = (err?: EndpointError) => {
      // if they are not released yet we release
      if (!isFilesReleased) {
        // now we go over those files
        Object.keys(files).forEach((fKey) => {
          // reject any pending files, hopefully we have an error for it
          !files[fKey].isResolved && files[fKey].promiseReject(err || new EndpointError({
            code: ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
            message: "Release was requested before all files had been resolved yet no custom error was provided",
          }));
          // now we are resolved
          files[fKey].isResolved = true;
          // release the capacitor if any
          files[fKey].capacitor && files[fKey].capacitor.release();
        });
        // we have released
        isFilesReleased = true;
      }
    };
    const rejectPendingUnresolvedFiles = () => {
      // if they are not released yet we release
      if (!isFilesReleased) {
        // now we go over those files
        Object.keys(files).forEach((fKey) => {
          // does not have a capacitor which means it was never found in the stream
          if (!files[fKey].capacitor) {
            // reject any pending files, hopefully we have an error for it
            files[fKey].promiseReject(new EndpointError({
              code: ENDPOINT_ERRORS.UNSPECIFIED,
              message: "Request was missing the file with id " + fKey,
            }));
            // now we are resolved
            files[fKey].isResolved = true;
          }
        });
      }
    };

    // this is for suddenly exit, this will 
    let exited = false;
    let exitCause: EndpointErrorType = null;
    const exit = (cause: EndpointErrorType, isDeadly?: boolean) => {
      // if we haven't exited yet
      if (!exited) {
        // now we have
        exited = true;
        exitCause = cause;

        // if it's for a deadly cause then we are just ending this altogether
        // while any exit will stop any further processing
        // a deadly cause will ignore any other response because most likely
        // the request is malformed
        if (!hasResponded && isDeadly) {
          hasResponded = true;

          // so we respond
          res.status(400).end(JSON.stringify({
            errors: [
              {
                error: cause,
              }
            ]
          }));
        }

        // now we destroy the boy
        bb.destroy();
        // unpipe the request from the boy
        req.unpipe(bb);
        // and this was done like this in graphq-upload
        // apparently it's better, to resume the request
        setImmediate(() => {
          req.resume();
        });

        // now we release all the files if we haven't
        // while providing a cause of why
        // any requests waiting for files to be processed
        // will end up rejected and crashing
        releaseFiles(new EndpointError(cause));
      }
    }

    // so let's begin working with the busboy
    // the field must be the first thing to see
    // in the multipart request
    bb.on('field', (name, val) => {
      // we expect a field and a field alone, called rq
      if (name === "rq") {
        // try to parse it
        try {
          rqRequest = JSON.parse(val);
        } catch (err) {
          // if not that's a deadly error, no way to process that thing
          exit({
            message: "Invalid JSON for rq field",
            code: ENDPOINT_ERRORS.UNSPECIFIED,
          }, true);
          return;
        }

        // let's process the files
        Object.keys(rqRequest).forEach((alias) => {
          const name = rqRequest[alias].n || alias;
          const schemaRegion =
            options.schema.mutation[name] ||
            options.schema.query[name];
          try {
            if (!schemaRegion) {
              // can't process, this will result in an error
              const err: EndpointErrorType = {
                message: "Invalid request location " + name + " at " + alias,
                code: ENDPOINT_ERRORS.UNSPECIFIED,
              };
              throw new EndpointError(err);
            } else {
              // add the token if it uses it
              if (typeof rqRequest[alias].args.token === "undefined") {
                rqRequest[alias].args.token = req.headers.token as string;
              }
              // now let's find the potential binaries
              // only in the args of course since only
              // the args can have a binary
              processArgs(files, schemaRegion.args, rqRequest[alias].args);
              processFields(schemaRegion.stdFields, schemaRegion.ownFields, rqRequest[alias].f);
            }
          } catch (err) {
            if (!rqResponse.errors) {
              rqResponse.errors = [];
            }
            // this will prevent processing
            if (err instanceof EndpointError) {
              rqResponse.errors.push({
                error: err.data,
                source: alias,
              });
            } else {
              rqResponse.errors.push({
                error: {
                  message: "Internal Server Error while processing files",
                  code: ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
                },
                source: alias,
              });
            }
          }
        });

        // now we attempt to respond that request
        respond();
      } else {
        // otherwise the field is not rq, and we don't process
        // that, this is a deadly error
        exit({
          message: "Invalid field provided " + name,
          code: ENDPOINT_ERRORS.UNSPECIFIED,
        }, true);
      }
    });

    const respond = async () => {
      // now we can process the results
      const results = await Promise.all(Object.keys(rqRequest).map(async (alias) => {
        try {
          // this bit has already been maked with an error so we cannot really process it
          const alreadyErrored = rqResponse.errors && rqResponse.errors.find((e) => e.source === alias);
          if (hasResponded || alreadyErrored) {
            return null;
          };
          const name = rqRequest[alias].n || alias;
          const schemaRegion =
            options.schema.mutation[name] ||
            options.schema.query[name];

          // our already processed arguments
          const args = rqRequest[alias].args;
          const fields = rqRequest[alias].fields;

          // it must exist because it has been checked
          const value: IRQValue = schemaRegion.resolve({
            args,
            fields,
          });
          return {
            err: null,
            source: alias,
            value,
          };
        } catch (err) {
          if (err instanceof EndpointError) {
            return {
              err: err.data,
              source: alias,
              value: undefined as IRQValue,
            };
          } else {
            // log error
            const err: EndpointErrorType = {
              message: "Internal Server Error while processing " + alias,
              code: ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
            };
            return {
              err,
              source: alias,
              value: undefined as IRQValue,
            };
          }
        }
      }));

      if (!hasResponded) {
        results.forEach((r) => {
          // this was skipped
          if (r === null) {
            return;
          }

          // we got a value add it
          if (typeof r.value !== "undefined") {
            rqResponse[r.source] = r.value;
          }
          // we got an error
          if (r.err) {
            if (!rqResponse.errors) {
              rqResponse.errors = [];
            }
            rqResponse.errors.push({
              error: r.err,
              source: r.source,
            });
          }
        });

        res.status(200).end(JSON.stringify(rqResponse));
      }
    }

    bb.on('file', (id, file, info) => {
      const { filename, encoding, mimeType } = info;
      const capacitor = new WriteStream();

      if (!rqRequest) {
        exit({
          code: ENDPOINT_ERRORS.UNSPECIFIED,
          message: "Received file with " + id + " before rq operations",
        }, true);
      } else if (!files[id]) {
        rqResponse.warnings = rqResponse.warnings || [];
        rqResponse.warnings.push({
          warning: {
            code: ENDPOINT_ERRORS.UNSPECIFIED,
            message: "Received file with " + id + " which is not present in rq operation",
          },
        });
        // drain the file without anything
        file.resume();
      } else {
        let fileErrored = false;

        capacitor.on("error", () => {
          fileErrored = true;
          file.unpipe();
          file.resume();
        });

        file.on("limit", () => {
          fileErrored = true;
          file.unpipe();
          capacitor.destroy();
          exit({
            code: ENDPOINT_ERRORS.UNSPECIFIED,
            message: "File with id " + id + " far too large",
          });
        });

        file.on("error", (err) => {
          fileErrored = true;
          file.unpipe();
          capacitor.destroy();
          exit({
            code: ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
            message: "File with id " + id + " could not be processed",
          });
        });

        const fileObj: IPromisedFileStream = {
          id,
          fileName: filename,
          mimeType,
          encoding,
          createReadStream(options?: ReadStreamOptions) {
            if (fileErrored) {
              throw new Error("The file is in an error state");
            } else if (exited) {
              throw new Error("The request has already exited");
            } else if (isFilesReleased) {
              throw new Error("The files are already released");
            }
            return capacitor.createReadStream(options);
          },
        };

        files[id].capacitor = capacitor;
        files[id].promiseResolve(fileObj);
        files[id].isResolved = true;

        file.pipe(capacitor);
      }
    });
    bb.on('error', () => {
      exit({
        message: "Reading Bus Error",
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      });
    });
    bb.on('partsLimit', () => {
      exit({
        message: "Parts Limit",
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      });
    });
    bb.on('filesLimit', () => {
      exit({
        message: "Files Limit",
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      });
    });
    bb.on('fieldsLimit', () => {
      exit({
        message: "Fields Limit",
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      });
    });
    bb.once("finish", () => {
      req.unpipe(bb);
      req.resume();

      // no more files but there may be pending ones
      // we reject such
      rejectPendingUnresolvedFiles();
    });
    req.pipe(bb);
    res.once("close", () => {
      releaseFiles();
    });
  });
  return router;
}