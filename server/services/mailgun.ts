import Mailgun from "mailgun-js";
import { ISendEmailData, MailProvider } from ".";
import type { Router } from "express";
import { IAppDataType } from "..";
import { ITriggerRegistry } from "../resolvers/triggers";

export class MailgunService extends MailProvider<Mailgun.ConstructorParams> {
  private mailgun: Mailgun.Mailgun;

  public initialize() {
    this.mailgun = new Mailgun(this.config);
  }

  public async sendEmail(data: ISendEmailData) {
    this.mailgun.messages().send(data);
  }

  public static async getRouter(appData: IAppDataType): Promise<Router> {
    // TODO setup a webhook if it's not there for the unsubscribe
    // TODO install the webhook and update the given property that represents the unsubscribe

    return null;
  }

  public static async getTriggerRegistry(): Promise<ITriggerRegistry> {
    // TODO when you update mail based properties and make them true
    // we need to remove the user from the unsubscribe list given by
    // mailgun blacklist

    // so now we need to specify what these user properties are

    return null;
  }
}