import MailProvider, { ISendEmailData } from "./base/MailProvider";
import type { Router } from "express";
import { ServiceProviderType } from ".";
import { NODE_ENV, INSTANCE_MODE } from "../environment";
import express from "express";
import busboy from "busboy";
import type ItemDefinition from "../../base/Root/Module/ItemDefinition";
import type { ReadStream } from "fs";
import FormDataNode from "form-data";
import { httpRequest } from "../request";

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

const MAILGUN_PRIORITY = 10;
const MAILGUN_LAST_TIMESTAMP = "MAILGUN_LAST_TIMESTAMP_TEST79";

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
      NODE_ENV === "development" &&
      INSTANCE_MODE === "ABSOLUTE"
    );

    if (this.isInstanceGlobal()) {
      await this.setupMailgun();
    }
  }

  private async setupMailgun() {
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

    const expression = `match_recipient(".*@${this.appConfig.mailDomain}")`;
    const notifyURL = JSON.stringify(`https://${NODE_ENV === "development" ? this.appConfig.developmentHostname : this.appConfig.productionHostname}/rest/service/mailgun/callback`);
    const action = "store(notify=" + notifyURL + ")"

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
      if (data.unsubscribeURLs[emailInQuestion]) {
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
      const totalItems = (messages.items || [])
      let actualItems = totalItems.filter((v: any) => v.timestamp >= checkTimeToUse);
      if (collected) {
        actualItems = actualItems.concat(collected);
      }

      // TODO guess language using elastic https://www.elastic.co/guide/en/machine-learning/7.17/ml-lang-ident.html

      if (!actualItems.length) {
        this.logInfo({
          className: "MailgunService",
          methodName: "checkForNewMail",
          message: "Did not receive any messages",
          data: {
            lastRunCheckTime,
            checkTimeToUse,
            tomorrow,
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
          message: "Received " + actualItems.length + " messages",
          data: {
            lastRunCheckTime,
            checkTimeToUse,
            tomorrow,
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
            const toUsers = messageData.To.split(",").map((v: string) => v.trim());
            const idSource = this.parseRFC2822(messageData["Message-Id"])[0];
            const id = idSource ? idSource.address : null;

            // not correct
            if (!from || toUsers.length === 0) {
              continue;
            }

            // they come as <ref1@domain.com> <ref2@domain.com> which is not comma separated, so we split, remove empties in case
            // and use the address of each as the references in the mail provider expects an array of references
            let references = messageData.References ?
              this.parseRFC2822(messageData.References.split(" ").filter((v: string) => !!v)).map((v) => v.address) :
              [];

            const attachments = (messageData.attachments && messageData.attachments.map((a: any) => {
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
            })) || null;

            const contentIdMap: any = {};

            if (messageData["content-id-map"] && messageData.attachments) {
              Object.keys(messageData["content-id-map"]).forEach((k) => {
                const valueUrl = messageData["content-id-map"][k].url;
                const attachmentIndex = messageData.attachments.findIndex((v: any) => v.url === valueUrl);
                if (attachmentIndex !== -1) {
                  const attachment = attachments[attachmentIndex];
                  const keyCleaned = k.startsWith("<") ? k.trim().substring(1, k.length - 1).trim() : k;
                  contentIdMap[keyCleaned] = attachment.id;
                }
              });
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
              });
            } catch (err) {
              this.logError({
                className: "MailgunService",
                methodName: "checkForNewMail",
                message: "Could not receive one email",
                err,
                data: {
                  message: messageData,
                },
                serious: true,
              });
            }
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

  public async getRouter(): Promise<Router> {
    // this is specific to production, while the endpoint exists
    // in development
    const router = this.expressRouter();
    router.use(express.urlencoded({
      extended: true,
    }));
    // TODO global is going to say this
    // router.get(
    //   "/mailgun/tick"
    // )
    router.post(
      "/mailgun/callback",
      (req, res) => {
        if (req.body && req.body.token) {
          console.log(req.body);
          console.log(req.headers);
          console.log(req.query);
          res.status(200).end();
        } else {
          const bb = busboy({ headers: req.headers });
          bb.on('file', (name, file, info) => {
            const { filename, encoding, mimeType } = info;
            console.log(
              `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
              filename,
              encoding,
              mimeType
            );
            file.on('data', (data) => {
              console.log(`File [${name}] got ${data.length} bytes`);
            }).on('close', () => {
              console.log(`File [${name}] done`);
            });
          });
          bb.on('field', (name, val, info) => {
            console.log(`Field [${name}]: value: %j`, val);
          });
          bb.on('close', () => {
            console.log('Done parsing form!');
            res.status(200).end();
          });
          req.pipe(bb);
        }
      }
    );

    return router;
  }
}
