import MailProvider, { ISendEmailData } from "./base/MailProvider";
import type { Router } from "express";
import { ServiceProviderType } from ".";
import { NODE_ENV, INSTANCE_MODE, GLOBAL_MANAGER_MODE } from "../environment";
import express from "express";
import busboy from "busboy";
import type ItemDefinition from "../../base/Root/Module/ItemDefinition";
import type { ReadStream } from "fs";
import FormDataNode from "form-data";
import { httpRequest } from "../request";
import { jwtVerify } from "../token";
import crypto from "crypto";
import uuid from "uuid";
import os from "os";
import path from "path";
import fs from "fs";
import { IPropertyDefinitionSupportedSingleFilesType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/types/files";

interface IMailgunConfig {
  apiKey: string;
  endpoint: string;
}

interface IMailgunRoutesItemResponse {
  actions: string[];
  created_at: string;
  description: string;
  expression: string;
  id: string;
  priority: number;
}

interface IMailgunRoutesResponse {
  items: IMailgunRoutesItemResponse[],
  total_count: number;
}

interface IMailgunTmpFile {
  fieldName: string;
  filename: string;
  encoding: string;
  mimeType: string;
  fileSize: number;
  tmpLocation: string;
}

interface IMailgunTmpFileMap {
  [key: string]: IMailgunTmpFile;
}

const MAILGUN_PRIORITY = 10;
const MAILGUN_LAST_TIMESTAMP = "MAILGUN_LAST_TIMESTAMP_TEST80";

export class MailgunService extends MailProvider<IMailgunConfig> {
  private host: string;
  private pathInitial: string;
  private pathInitialWithMailDomain: string;
  private isHttps: boolean;
  private userHeader: string;
  private usesDevelopmentReceive: boolean;

  public static getType() {
    return ServiceProviderType.HYBRID;
  }

  public async initialize(): Promise<void> {
    this.setMessageStorageItemDefinition(
      (
        this.isInstanceGlobal() ?
          this.globalRoot.registry[this.appConfig.mailStorage] :
          this.localAppData.root.registry[this.appConfig.mailStorage]
      ) as ItemDefinition
    );

    const urlInfo = new URL(this.config.endpoint);
    this.isHttps = urlInfo.protocol === "https:";
    this.host = urlInfo.host;
    this.pathInitial = urlInfo.pathname;
    if (!this.pathInitial.endsWith("/")) {
      this.pathInitial += "/";
    }

    this.pathInitialWithMailDomain = this.pathInitial + this.appConfig.mailDomain + "/";

    this.userHeader = "Basic " + Buffer.from("api:" + this.config.apiKey).toString('base64');

    this.usesDevelopmentReceive = (
      INSTANCE_MODE === "ABSOLUTE"
    );

    if (this.isInstanceGlobal()) {
      // await this.setupMailgun();
    }
  }

  private async setupMailgun() {
    // ran just so that it creates a key if it does not exist
    await this.localAppData.registry.createJWTSecretFor("MAILGUN_JWT_KEY");

    const allRoutes = (await httpRequest<IMailgunRoutesResponse>(
      {
        host: this.host,
        path: this.pathInitial + "routes",
        isHttps: this.isHttps,
        method: "GET",
        headers: {
          Authorization: this.userHeader,
        }
      }
    )).data;

    if (this.usesDevelopmentReceive) {
      this.logInfo({
        message: "Setting up mailgun for receiving emails using the fallback development mode, will use polling",
        className: "MailgunService",
        methodName: "setupMailgun",
      });
    }

    const expression = `match_recipient(".*@${this.appConfig.mailDomain}")`;
    const forwardURL = JSON.stringify(`https://${NODE_ENV === "development" ? this.appConfig.developmentHostname : this.appConfig.productionHostname}/rest/service/mailgun/callback`);
    const action = this.usesDevelopmentReceive ? "store()" : "forward(" + forwardURL + ")";

    const existingRoute = allRoutes.items.find((r) => (
      r.priority === MAILGUN_PRIORITY &&
      r.expression === expression
    ));

    const existingRouteIsConflicting = !!(existingRoute && (!existingRoute.actions || !existingRoute.actions.includes(action)));

    if (existingRoute && !existingRouteIsConflicting) {
      this.logInfo({
        message: "A matching route for mailgun was found",
        className: "MailgunService",
        data: {
          existingRoute,
        },
        methodName: "setupMailgun",
      });
    } else {
      this.logInfo({
        message: "A matching route for mailgun was not found, attempting to create one",
        className: "MailgunService",
        data: {
          expression,
          action,
          existingRouteIsConflicting,
          existingRoute,
        },
        methodName: "setupMailgun",
      });

      try {
        await httpRequest({
          host: this.host,
          path: this.pathInitial + "routes" + (existingRouteIsConflicting ? "/" + existingRoute.id : ""),
          isHttps: this.isHttps,
          method: existingRouteIsConflicting ? "PUT" : "POST",
          headers: {
            Authorization: this.userHeader,
          },
          formData: {
            priority: MAILGUN_PRIORITY.toString(),
            expression,
            action,
            description: "MAILGUN_SERVICE_ACTION",
          },
        });
      } catch (err) {
        this.logError({
          message: "Cannot receive emails, route could not be updated or created",
          className: "MailgunService",
          data: {
            expression,
            action,
            existingRouteIsConflicting,
            existingRoute,
          },
          methodName: "setupMailgun",
          err,
        });
      }
    }
  }

  public async sendEmail(data: ISendEmailData) {
    const isSingleEmail = typeof data.to === "string" || data.to.length === 1;

    // log for debugging purposes
    this.logDebug(
      {
        className: "MailgunService",
        methodName: "sendEmail",
        message: "Email being sent",
        data,
      },
    );

    const toArr = Array.isArray(data.to) ? data.to : [data.to];
    const toCleaned = toArr.map((v) => !v.includes("<") ? "<" + v + ">" : v).join(" ,");

    const fromCleaned = data.from.includes("<") ? data.from : "<" + data.from + ">";

    const formData = new FormDataNode();
    formData.append("from", fromCleaned);
    formData.append("to", toCleaned);
    formData.append("subject", data.subject);

    if (data.html) {
      formData.append("html", data.html);
    }

    if (data.text) {
      formData.append("text", data.html);
    }

    if (data.fromForwarded) {
      formData.append("h:Reply-To", data.fromForwarded);
    }

    if (data.id) {
      formData.append("h:Message-Id", "<" + data.id + ">");
    }

    if (data.replyOf) {
      const messageId = data.replyOf.uuid;
      formData.append("h:In-Reply-To", "<" + messageId + ">");
      formData.append("h:References", (data.replyOf.references || []).concat([messageId]).map((r: string) => "<" + r + ">"));
    }

    // setup the unsubscribe header if we have a mailto header
    // that is the default
    let unsubscribeHeader = data.unsubscribeMailto ? (
      "<" + data.unsubscribeMailto + ">"
    ) : null;

    // if we have a single email, we can add the http protocol one
    if (isSingleEmail && data.unsubscribeMailto) {
      // for that we pick the email
      const emailInQuestion = Array.isArray(data.to) ? data.to[0] : data.to;
      // and try and find the given unsubscribe url
      if (data.unsubscribeURLs && data.unsubscribeURLs[emailInQuestion]) {
        // add a comma if necessary
        if (unsubscribeHeader) {
          unsubscribeHeader += ", ";
        }
        // and add the url
        unsubscribeHeader += "<" + data.unsubscribeURLs[emailInQuestion].noRedirected + ">";
      }
    }

    // if we managed to build an unsubscribe header, then let's send it
    if (unsubscribeHeader) {
      formData.append("h:List-Unsubscribe", unsubscribeHeader);
    }

    if (data.attachments) {
      for (let attachment of data.attachments) {
        const inlineId = data.contentIdMap && Object.keys(data.contentIdMap).find((id) => data.contentIdMap[id] === attachment.id);
        let readStream: ReadStream;

        if (attachment.src && (attachment.src as any).read) {
          readStream = attachment.src as ReadStream;
        } else {
          const getter = await attachment.src;
          if (getter && (getter as any).createReadStream) {
            readStream = (getter as any).createReadStream();
          }
        }

        formData.append(
          inlineId ? "inline" : "attachment",
          readStream,
          {
            filename: inlineId || attachment.name,
            contentType: attachment.type,
          },
        );
      }
    }

    await this.send(formData, data);
  }

  private async send(data: FormDataNode, errDetails: any): Promise<void> {
    const headers = data.getHeaders();
    headers.Authorization = this.userHeader;
    try {
      await httpRequest({
        headers,
        host: this.host,
        path: this.pathInitialWithMailDomain + "messages",
        stream: data as any,
        isHttps: this.isHttps,
        method: "POST",
      });
    } catch (err) {
      this.logError({
        className: "MailgunService",
        methodName: "send",
        serious: true,
        message: "Sending email failed",
        err,
        data: errDetails,
      });
      throw err;
    }
  }

  public getRunCycleTime() {
    return null;

    if (this.usesDevelopmentReceive && !this.isInstanceGlobal()) {
      // because we are most likely running for localhost
      // as we are in a development environment we have no
      // access to the webhook so we will fallback
      // to polling, this method wouldn't be nice on
      // a production environment with many extended
      // instances
      // we are going to run the checking function
      // every 5 seconds
      return 5000;
    }

    return null;
  }

  public run() {
    if (this.usesDevelopmentReceive && !this.isInstanceGlobal()) {
      this.checkForNewMail();
    }
  }

  public async checkForNewMail(pagingNext?: string, collected?: any[], lastRunCheckT?: string): Promise<void> {
    this.logInfo({
      className: "MailgunService",
      methodName: "checkForNewMail",
      message: "Checking for new email",
    });

    try {
      // it will check from the last time it checked
      // this ensures that every message is processed even if there messages
      // sent during downtime

      // main problem is that the first time this is executed it will literaly
      // pull every message there is
      const lastRunCheckTime = (lastRunCheckT || await this.registry.getKey(MAILGUN_LAST_TIMESTAMP)) || 0;
      const checkTimeToUse = lastRunCheckTime + 0.000001;
      // due to a bug in mailgun api we need to pass an end date
      const tomorrow = (new Date()).getTime() / 1000;
      const urlToUse = pagingNext ? new URL(pagingNext) : null;

      const messages = (await httpRequest<any>({
        isHttps: urlToUse ? urlToUse.protocol === "https:" : this.isHttps,
        host: urlToUse ? urlToUse.host : this.host,
        method: "GET",
        path: urlToUse ?
          urlToUse.pathname :
          this.pathInitialWithMailDomain + "events?event=stored&limit=300&begin=" + encodeURIComponent(checkTimeToUse) + "&end=" + encodeURIComponent(tomorrow),
        headers: {
          Authorization: this.userHeader,
        },
      })).data;

      // due to a bug in mailgun API, we need to compare this again
      const totalItems = (messages.items || []);
      let rejected: number = 0;
      // the timestamp often does not match and needs to be rechecked
      let actualItems = totalItems.filter((v: any) => {
        const approved = v.timestamp >= checkTimeToUse;
        if (!approved) {
          rejected++;
        }

        return approved;
      });
      if (collected) {
        actualItems = actualItems.concat(collected);
      }

      if (!actualItems.length) {
        this.logInfo({
          className: "MailgunService",
          methodName: "checkForNewMail",
          message: "Did not receive any messages " + rejected + " rejected",
          data: {
            lastRunCheckTime,
            checkTimeToUse,
            tomorrow,
            rejected,
          }
        });
      } else {
        const hasMore = totalItems.length >= 300;
        if (hasMore) {
          return this.checkForNewMail(messages.paging.next, messages.items, lastRunCheckTime);
        }
        this.logInfo({
          className: "MailgunService",
          methodName: "checkForNewMail",
          message: "Received " + actualItems.length + " messages " + rejected + " rejected",
          data: {
            lastRunCheckTime,
            checkTimeToUse,
            tomorrow,
            rejected,
            // messages: totalItems,
          }
        });

        // due to a bug in mailgun api sometimes it comes out of order
        const newestMessage = actualItems.reduce((i: any, i2: any) => i.timestamp > i2.timestamp ? i : i2);
        const newLastRunCheckTime = (
          newestMessage.timestamp
        );

        await this.registry.setKey(MAILGUN_LAST_TIMESTAMP, newLastRunCheckTime);

        for (let message of actualItems) {
          if (message.storage && message.storage.url) {
            const messageURL = new URL(message.storage.url);
            const messageData = (await httpRequest<any>({
              isHttps: messageURL.protocol === "https:",
              host: messageURL.host,
              method: "GET",
              path: messageURL.pathname,
              headers: {
                Authorization: this.userHeader,
              },
            })).data;

            const from = messageData.From;
            const toUsers = messageData.To.split(",");

            // not correct
            if (!from || toUsers.length === 0) {
              continue;
            }

            await this.processMessageFrom(messageData);
          }
        }
      }
    } catch (err) {
      this.logError({
        className: "MailgunService",
        methodName: "checkForNewMail",
        message: "Could not check for new mail",
        err,
        serious: true,
      });
    }
  }

  public async processMessageFrom(messageData: any, files?: IMailgunTmpFileMap) {
    const from = messageData.From;
    const toUsers = messageData.To.split(",").map((v: string) => v.trim());
    const idSource = this.parseRFC2822(messageData["Message-Id"])[0];
    const id = idSource ? idSource.address : null;

    // not correct
    if (!from || toUsers.length === 0) {
      return;
    }

    // the reply of
    const replyOfRfc = messageData["In-Reply-To"] ?
      this.parseRFC2822(messageData["In-Reply-To"])[0] :
      null;
    const replyOf = (replyOfRfc && replyOfRfc.address) || null;

    // they come as <ref1@domain.com> <ref2@domain.com> which is not comma separated, so we split, remove empties in case
    // and use the address of each as the references in the mail provider expects an array of references
    const references = messageData.References ?
      this.parseRFC2822(messageData.References.split(" ").filter((v: string) => !!v)).map((v) => v.address) :
      [];

    // because this function handles both stored messages and
    // forwarded we got to figure out how to get each, first this object
    // is to track forwarded messages ids to the new ids that will be used
    // for itemize when creating a file
    const fileForwardedIdToAttachmentId: { [k: string]: string } = {};
    const attachments: IPropertyDefinitionSupportedSingleFilesType[] = (files ? (
      // here you can see
      Object.keys(files).map((streamFilename) => {
        // the stream file name is just the temporary file identifier that was used
        // just some random id
        const file = files[streamFilename];
        // we feed it as the id for the local file but even that is not what will be used
        // as id can be anything unique from the file to generate another uuid from
        const value = this.createFileFromLocalFile(
          streamFilename,
          // feed the location name size, etc...
          file.tmpLocation,
          file.filename,
          file.fileSize,
          file.mimeType,
        );
        // now we can get the field name, to the id of the file
        // the field name is what was used when posting the file and not the real file
        // name
        fileForwardedIdToAttachmentId[file.fieldName] = value.id;
        return value;
      })

      // in the case of stored messages attachments are different
    ) : (messageData.attachments && messageData.attachments.map((a: any) => {
      // they reside at an url, so we got to create a file from that url
      // when saving it will be downloaded from that url
      return this.createFileFromURL(
        a.url,
        a.name,
        a.size,
        a["content-type"],
        {
          httpHeaders: {
            Authorization: this.userHeader,
          },
        }
      )
    }))) || null;

    // now for content ids for dynamic content
    const contentIdMap: any = {};

    if (messageData["content-id-map"] && attachments && attachments.length) {
      // this is what forwarding receives, now we need to convert it to an id somehow
      if (typeof messageData["content-id-map"] === "string") {
        let contentIdMapParsed: any = null;
        try {
          // example "{\"<f_l8ofnnuq0>\":\"attachment-1\"}"
          contentIdMapParsed = JSON.parse(messageData["content-id-map"])
        } catch {
          // could not parse json
        }

        if (contentIdMapParsed) {
          Object.keys(contentIdMapParsed).forEach((k) => {
            // we need to get the filed name for example "attachment-1"
            const valueFieldName = contentIdMapParsed[k];
            // and now we need to get the new id that the file was matched to
            // because the file will use its own uuid when being created
            const valueFileId = fileForwardedIdToAttachmentId[valueFieldName];
            // if we get one, and we should
            if (valueFileId) {
              // let's find that file
              const attachment = attachments.find((a) => a.id === valueFileId);
              // remove the < from the potential <f_l8ofnnuq0> so you have f_l8ofnnuq0 only
              // so cid:f_l8ofnnuq0 can be matched
              const keyCleaned = k.startsWith("<") ? k.trim().substring(1, k.length - 1).trim() : k;
              // now we add it to our new map as it should
              // be with the id of the file
              contentIdMap[keyCleaned] = attachment.id;
            }
          });
        }
      } else {
        // stored messages receive this, they get an object, with content-type, name, size, and url
        Object.keys(messageData["content-id-map"]).forEach((k) => {
          // for that we got to get the url from the content id map
          const valueUrl = messageData["content-id-map"][k].url;
          // and find the attachment that holds that url from the attachments list
          // that was provided in the stored message
          const attachmentIndex = messageData.attachments.findIndex((v: any) => v.url === valueUrl);
          // if it's found
          if (attachmentIndex !== -1) {
            // grab the attachment and clear
            const attachment = attachments[attachmentIndex];
            const keyCleaned = k.startsWith("<") ? k.trim().substring(1, k.length - 1).trim() : k;
            contentIdMap[keyCleaned] = attachment.id;
          }
        });
      }
    }

    // let's figure the language because mailgun does not
    let language: string = null;
    if (this.localAppData.elastic) {
      try {
        const langData = await this.localAppData.elastic.guessLanguageFor(messageData["body-plain"]);
        if (langData && langData.predicted_value) {
          language = langData.predicted_value;
        }
      } catch (err) {
        this.logError({
          className: "MailgunService",
          methodName: "processMessageFrom",
          message: "Could not use elastic for language analysis",
          err,
          data: {
            message: messageData,
          },
        });
      }
    }

    const date = messageData["Date"] ? new Date(messageData["Date"]) : null;
    let timestamp: string = null;
    if (date && date.toString() !== "Invalid Date") {
      // this shall work for specifying the time when
      // it was actually created
      timestamp = date.toISOString();
    }

    try {
      await this.onExternalEmailReceived({
        from,
        html: messageData["body-html"],
        references,
        id,
        subject: messageData.subject,
        to: toUsers,
        attachments,
        contentIdMap,
        language,
        timestamp,
        replyOf,
      });
    } catch (err) {
      this.logError({
        className: "MailgunService",
        methodName: "processMessageFrom",
        message: "Could not receive one email",
        err,
        data: {
          message: messageData,
        },
        serious: true,
      });
    }
  }

  public cleanup(folder: string) {
    fs.rmdir(folder, (err) => {
      if (err) {
        if (err.code !== "ENOENT") {
          this.logError({
            className: "MailgunService",
            methodName: "cleanup",
            message: "Could not clean up orphan folder",
            err,
            orphan: true,
            data: {
              folder,
            }
          });
        }
      }
    });
  }

  public async getRouter(): Promise<Router> {
    // this is specific to production, while the endpoint exists
    // in development
    const router = this.expressRouter();
    router.use(express.urlencoded({
      extended: true,
    }));
    // ticks mailgun to check messages
    // not really used as the functionaly was changed to use forwarding
    // since forwarding takes less load on mailgun
    router.get(
      "/mailgun/tick",
      async (req, res) => {
        const token = req.query.token as string;
        if (!token || typeof token !== "string") {
          res.status(400).end("Needs a token");
        }

        try {
          await jwtVerify(token, await this.localAppData.registry.getJWTSecretFor("MAILGUN_JWT_KEY"));
        } catch {
          res.status(403).end("Could not verify token");
          return;
        }

        res.status(200).end("Queued email check");

        try {
          await this.checkForNewMail();
        } catch (err) {
        }
      }
    );
    router.post(
      "/mailgun/callback",
      async (req, res) => {
        //crypto.createHmac("sha256", MAILGUN_KEY).update(timestamp + token).digest("hex") === signature
        if (req.headers["content-type"]) {
          const isURLEncoded = req.headers["content-type"].startsWith("application/x-www-form-urlencoded");
          const isFormData = req.headers["content-type"].startsWith("multipart/form-data");

          if (isURLEncoded) {
            const token = req.body.token;
            const signature = req.body.signature;
            const timestamp = req.body.timestamp;

            const isValid = crypto.createHmac("sha256", this.config.apiKey).update(timestamp + token).digest("hex") === signature;

            if (!isValid) {
              res.status(403).end();
            } else {
              try {
                await this.processMessageFrom(req.body);
                res.status(200).end();
              } catch (err) {
                res.status(500).end("Error while processing message");
              }
            }
          } else if (isFormData) {
            const data: any = {};
            const pathLocation = path.join(os.tmpdir(), uuid.v4().replace(/-/g, ""));
            const files: IMailgunTmpFileMap = {};

            try {
              await fs.promises.mkdir(pathLocation);
            } catch (err) {
              this.logError({
                message: "Could not create temporary file location",
                className: "MailgunService",
                err,
                endpoint: "/mailgun/callback",
                serious: true,
              });
              res.status(500).end("Could not create temporary file location");
              return;
            }

            let hasResponded: boolean = false;
            let hasCleaned: boolean = false;

            const bb = busboy({ headers: req.headers });
            bb.on('file', (name, file, info) => {
              const { filename, encoding, mimeType } = info;
              let fileSize: number = 0;

              const streamFilename = uuid.v4().replace(/-/g, "");
              const tmpLocation = path.join(pathLocation, streamFilename);

              let outStream: fs.WriteStream;
              try {
                outStream = fs.createWriteStream(
                  tmpLocation,
                );
              } catch (err) {
                this.logError({
                  message: "Could not create output stream",
                  className: "MailgunService",
                  err,
                  endpoint: "/mailgun/callback",
                  serious: true,
                });

                if (!hasResponded) {
                  hasResponded = true;
                  res.status(500).end("Could not create write stream");
                  !hasCleaned && this.cleanup(pathLocation);
                  hasCleaned = true;
                }

                throw err;
              }
              file.on("data", (chunk) => {
                fileSize += chunk.length;
              }).pipe(outStream);

              outStream.on('error', (err) => {
                if (!hasResponded) {
                  hasResponded = true;
                  this.logError({
                    message: "Could not write stream",
                    className: "MailgunService",
                    endpoint: "/mailgun/callback",
                    err,
                    serious: true,
                  });
                  res.status(500).end("Could not write stream");
                  !hasCleaned && this.cleanup(pathLocation);
                  hasCleaned = true;
                }
              });

              file.on("error", (err) => {
                if (!hasResponded) {
                  hasResponded = true;
                  this.logError({
                    message: "Could not read stream",
                    className: "MailgunService",
                    endpoint: "/mailgun/callback",
                    err,
                    serious: true,
                  });
                  res.status(500).end("Could not read stream");
                  this.cleanup(pathLocation);
                }
              }).on("close", () => {
                files[streamFilename] = {
                  fieldName: name,
                  filename,
                  encoding,
                  mimeType,
                  fileSize,
                  tmpLocation,
                };
              });
            });
            bb.on('field', (name, val) => {
              data[name] = val;
            });
            bb.on('error', () => {
              if (!hasResponded) {
                hasResponded = true;
                this.logError({
                  message: "Reading bus error",
                  className: "MailgunService",
                  endpoint: "/mailgun/callback",
                  serious: true,
                });
                res.status(500).end("Reading bus error");
                !hasCleaned && this.cleanup(pathLocation);
                hasCleaned = true;
              }
            });
            bb.on('partsLimit', () => {
              if (!hasResponded) {
                hasResponded = true;
                this.logError({
                  message: "Parts limit",
                  className: "MailgunService",
                  endpoint: "/mailgun/callback",
                  serious: true,
                });
                res.status(400).end("Parts limit");
                !hasCleaned && this.cleanup(pathLocation);
                hasCleaned = true;
              }
            });
            bb.on('filesLimit', () => {
              if (!hasResponded) {
                hasResponded = true;
                this.logError({
                  message: "Files limit",
                  className: "MailgunService",
                  endpoint: "/mailgun/callback",
                  serious: true,
                });
                res.status(400).end("Files limit");
                !hasCleaned && this.cleanup(pathLocation);
                hasCleaned = true;
              }
            });
            bb.on('fieldsLimit', () => {
              if (!hasResponded) {
                hasResponded = true;
                this.logError({
                  message: "Fields limit",
                  className: "MailgunService",
                  endpoint: "/mailgun/callback",
                  serious: true,
                });
                res.status(400).end("Fields limit");
                !hasCleaned && this.cleanup(pathLocation);
                hasCleaned = true;
              }
            });
            bb.on('close', async () => {
              const token = data.token;
              const signature = data.signature;
              const timestamp = data.timestamp;

              const isValid = crypto.createHmac("sha256", this.config.apiKey).update(timestamp + token).digest("hex") === signature;

              if (!isValid) {
                if (!hasResponded) {
                  hasResponded = true;
                  res.status(403).end();
                }
                !hasCleaned && this.cleanup(pathLocation);
                hasCleaned = true;
                return;
              }

              try {
                await this.processMessageFrom(data, files);
              } catch (err) {
                if (!hasResponded) {
                  hasResponded = true;
                  res.status(500).end("Error while processing message");
                }
              }

              if (!hasResponded) {
                hasResponded = true;
                res.status(200).end();
              }

              // delete files after they have been consumed
              !hasCleaned && this.cleanup(pathLocation);
              hasCleaned = true;
            });
            req.pipe(bb);
          } else {
            res.status(400).end();
          }
        } else {
          res.status(400).end();
        }
      }
    );

    return router;
  }
}
