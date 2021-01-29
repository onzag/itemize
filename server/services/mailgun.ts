import Mailgun from "mailgun-js";
import MailProvider, { ISendEmailData } from "./base/MailProvider";
import type { Router } from "express";
import { ServiceProviderType } from ".";

export class MailgunService extends MailProvider<Mailgun.ConstructorParams> {
  private mailgun: Mailgun.Mailgun;
  private cantReceiveEmail: boolean = false;

  public static getType() {
    return ServiceProviderType.HYBRID;
  }

  public async initialize(): Promise<void> {
    this.mailgun = new Mailgun(this.config);

    const allRoutes = await this.mailgun.get("/routes", {
      skip: 0,
      limit: 100,
    });

    const hostname = process.env.NODE_ENV === "development" ?
      this.appConfig.developmentHostname : this.appConfig.productionHostname;

    const customID = "MAILGUN_ITEMIZE_TRIGGER_" + hostname;

    if (allRoutes && allRoutes.items) {
      const ourRoute = allRoutes.items.find((r: any) => r.description === customID);
      if (!ourRoute) {
        await (new Promise<void>((resolve) => {
          this.mailgun.post(
            "/routes",
            {
              priority: 0,
              description: customID,
              expression: `match_recipient(".*@${this.appSensitiveConfig.mailDomain}")`,
              action: `store(notify=${JSON.stringify("https://" + hostname + "/rest/service/mailgun/callback")})`
            }, (error, body) => {
              if (error) {
                this.logError(
                  "MailgunService.initialize [SERIOUS]: Could not add the mailgun callback, receiving emails is not possible",
                  {
                    message: error.message,
                    statusCode: error.statusCode,
                  },
                );
                this.cantReceiveEmail = true;
              } else {
                // TODO
              }

              resolve();
            });
        }));
      }
    }
  }

  public async sendEmail(data: ISendEmailData) {
    const isSingleEmail = typeof data.to === "string" || data.to.length === 1;
    if (this.cantReceiveEmail && data.unsubscribeMailto && !isSingleEmail) {
      // inefficient method of handling list unsubscribe, basically since
      // it cannot handle the list since there's no webhook it will send
      // the list unsubscribe url instead but in order to do that
      // it can only use single emails as every email got to be different
      // as the mailto protocol is not supposed and it got to send
      // the special url
      await Promise.all((data.to as string[]).map((email) => {
        return this.sendEmail({
          ...data,
          to: email,
        });
      }));
      return;
    }

    // construct the mailgun payload
    const dataToSend: Mailgun.messages.SendData = {
      from: data.from,
      to: data.to,
      html: data.html,
      text: data.text,
      subject: data.subject,
    };

    // setup the unsubscribe header if we have a mailto header
    // that is the default
    let unsubscribeHeader = data.unsubscribeMailto ? (
      this.cantReceiveEmail ? "" : "<" + data.unsubscribeMailto + ">"
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
      dataToSend["h:List-Unsubscribe"] = unsubscribeHeader;
    }

    // and now we send it
    await this.mailgun.messages().send(dataToSend);
  }

  public getRunCycleTime() {
    if (
      !this.cantReceiveEmail &&
      process.env.NODE_ENV === "development" &&
      process.env.INSTANCE_MODE === "ABSOLUTE"
    ) {
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
    if (process.env.NODE_ENV === "development" && process.env.INSTANCE_MODE === "ABSOLUTE") {
      this.checkForNewMail();
    }
  }

  public checkForNewMail() {
    if (this.cantReceiveEmail) {
      return;
    }
    // TODO
  }

  public async getRouter(): Promise<Router> {
    if (this.cantReceiveEmail) {
      this.logError(
        "MaigunService.getRouter [SERIOUS]: Could not setup the router for callbacks because receiving emails is not possible",
      );
      return;
    }
    const router = this.expressRouter();
    router.post(
      "/mailgun/callback",
      (req, res) => {
        // TODO validate webhook, get the email
        this.checkForNewMail();
      }
    );

    return null;
  }
}
