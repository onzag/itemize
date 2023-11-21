import { ReadStream } from "fs";
import http from "http";
import https from "https";
import FormDataNode from "form-data";
import { CAN_LOG_DEBUG } from "./environment";
import { logger } from "./logger";

interface IHTTPRequestInfo {
  isHttps: boolean;
  host: string;
  path: string;
  method: string;
  stream?: ReadStream;
  formData?: { [key: string]: any };
  urlEncoded?: { [key: string]: string | string[] };
  headers?: { [key: string]: any };
  dontProcessResponse?: boolean;
  processAsJSON?: boolean;
  returnNonOk?: boolean;
  auth?: string;
}

interface IHTTPResponse<T> {
  response: http.IncomingMessage;
  data: T;
}

export function httpRequest<T>(data: IHTTPRequestInfo): Promise<IHTTPResponse<T>> {
  if (data.formData && data.stream) {
    throw new Error("Cannot use form data and stream at the same time in request");
  }

  if (data.formData && data.urlEncoded) {
    throw new Error("Cannot use form data and url ecoded at the same time in request");
  }

  if (data.stream && data.urlEncoded) {
    throw new Error("Cannot use stream and url ecoded at the same time in request");
  }

  if (CAN_LOG_DEBUG) {
    logger.debug({
      message: "HTTP request",
      data,
      functionName: "httpRequest",
    });
  }

  let hasFiredError = false;
  return new Promise((resolve, reject) => {
    try {
      let stream: ReadStream = data.stream;
      let headers = data.headers || {};
      if (data.formData) {
        const formData = new FormDataNode();
        Object.keys(data.formData).forEach((k) => {
          const ele = data.formData[k];
          if (Array.isArray(ele)) {
            ele.forEach((innerele) => {
              formData.append(k, innerele);
            });
          } else {
            formData.append(k, ele);
          }
        });

        headers = formData.getHeaders();
        if (data.headers) {
          Object.assign(headers, data.headers);
        }

        stream = formData as any;
      }


      let urlEncodedToWrite: string = null;
      if (data.urlEncoded) {
        urlEncodedToWrite = "";
        Object.keys(data.urlEncoded).forEach((key, index) => {
          if (index) {
            urlEncodedToWrite += "&";
          }
          const value = data.urlEncoded[key];
          if (Array.isArray(value)) {
            value.forEach((subvalue, index2) => {
              if (index2) {
                urlEncodedToWrite += "&";
              }
              urlEncodedToWrite += key + "=" + encodeURIComponent(subvalue);
            });
          } else {
            urlEncodedToWrite += key + "=" + encodeURIComponent(value);
          }
        });
        headers["Content-Type"] = "application/x-www-form-urlencoded";
        headers["Content-Length"] = Buffer.byteLength(urlEncodedToWrite);
      }

      const request = (data.isHttps ? https : http).request({
        method: data.method,
        host: data.host,
        path: data.path,
        headers,
        auth: data.auth,
      });

      if (stream) {
        stream.pipe(request);
        stream.on("error", (err) => {
          !hasFiredError && reject(err);
          hasFiredError = true;
        });
      }

      request.on("response", (resp) => {
        if (data.dontProcessResponse) {
          resolve({ response: resp, data: null });
        } else if (!CAN_LOG_DEBUG && !data.returnNonOk && resp.statusCode && (resp.statusCode < 200 || resp.statusCode >= 300)) {
          const err = new Error("Request failed, server responsed with status: " + resp.statusCode);
          !hasFiredError && reject(err);
          hasFiredError = true;
        } else {
          let dataProcessed = "";
          resp.on("data", (chunk) => {
            dataProcessed += chunk;
          });
          resp.on("error", (err) => {
            !hasFiredError && reject(err);
            hasFiredError = true;
          });
          resp.on("end", () => {
            let valueToRespondWith: any = dataProcessed;
            if (
              data.processAsJSON ||
              resp.headers["content-type"].startsWith("application/json")
            ) {
              try {
                valueToRespondWith = JSON.parse(dataProcessed);
              } catch {
                const err = new Error("Could not parse JSON from response");
                !hasFiredError && reject(err);
                hasFiredError = true;
                return;
              }
            }

            if (CAN_LOG_DEBUG) {
              logger.debug({
                message: "HTTP request resolved",
                data: valueToRespondWith,
                functionName: "httpRequest",
              });
            }

            if (data.returnNonOk || (resp.statusCode >= 200 && resp.statusCode < 300) || !resp.statusCode) {
              resolve({ response: resp, data: valueToRespondWith });
            } else {
              const err = new Error("Request failed, server responsed with status: " + resp.statusCode);
              !hasFiredError && reject(err);
              hasFiredError = true;
            }
          });
        }
      });

      request.on("error", (err) => {
        !hasFiredError && reject(err);
        hasFiredError = true;
      });

      if (urlEncodedToWrite) {
        request.write(urlEncodedToWrite);
      }

      if (!stream) {
        request.end();
      }
    } catch (err) {
      !hasFiredError && reject(err);
      hasFiredError = true;
    }
  });
}