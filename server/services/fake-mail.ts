import type ItemDefinition from "../../base/Root/Module/ItemDefinition";
import express, { Router } from "express";
import { ServiceProviderType } from ".";
import MailProvider, { ISendEmailData } from "./base/MailProvider";

export class FakeMailService extends MailProvider<null> {
  public static getType() {
    return ServiceProviderType.HYBRID;
  }
  public initialize() {
    this.setMessageStorageItemDefinition(
      (
        this.isInstanceGlobal() ?
        this.globalRoot.registry[this.appConfig.mailStorage] :
        this.localAppData.root.registry[this.appConfig.mailStorage]
      ) as ItemDefinition
    );
  }
  public async sendEmail(data: ISendEmailData) {
    this.logInfo(
      {
        className: "FakeMailService",
        methodName: "sendEmail",
        message: "Fake email being sent",
        data,
      },
    );
  }
  public async getRouter(): Promise<Router> {
    const router = this.expressRouter();
    router.get(
      "/fake-mail/receive",
      async (req, res) => {
        const subject = req.query.subject || "No Subject";
        const target = req.query.to;
        const html = req.query.html || "No content";
        const source = req.query.from;

        if (
          !target ||
          (!Array.isArray(target) && typeof target !== "string") ||
          typeof subject !== "string" ||
          typeof html !== "string" ||
          typeof source !== "string"
        ) {
          res.status(400).end();
          return;
        }

        const email = {
          attachments: null as any,
          from: source,
          html,
          subject,
          to: Array.isArray(target) ? target as string[] : [target],
        };

        this.logInfo(
          {
            className: "FakeMailService",
            endpoint: "service/fake-mail/receive",
            message: "fake email being received",
            data: email,
          }
        );

        await this.onExternalEmailReceived(email);

        res.status(200).end("Email received");
      }
    );

    return router;
  }
}