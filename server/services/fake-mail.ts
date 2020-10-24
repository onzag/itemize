import { ISendEmailData, MailProvider } from ".";

export class FakeMailService extends MailProvider<null> {
  public async sendEmail(data: ISendEmailData) {
    this.logInfo(
      "FakeMailService.sendTemplateEmail: Fake email being sent",
      data,
    );
  }
}