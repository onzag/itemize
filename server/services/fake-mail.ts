import MailProvider, { ISendEmailData } from "./base/MailProvider";

export class FakeMailService extends MailProvider<null> {
  public async sendEmail(data: ISendEmailData) {
    this.logInfo(
      "FakeMailService.sendEmail: Fake email being sent",
      data,
    );
  }
}