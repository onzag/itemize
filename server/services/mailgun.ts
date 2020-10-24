import Mailgun from "mailgun-js";
import { ISendEmailData, MailProvider } from ".";

export class MailgunService extends MailProvider<Mailgun.ConstructorParams> {
  private mailgun: Mailgun.Mailgun;

  public initialize() {
    this.mailgun = new Mailgun(this.config);
  }

  public async sendEmail(data: ISendEmailData) {
    this.mailgun.messages().send(data);
  }
}