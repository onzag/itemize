import { ServiceProviderType } from ".";
import PhoneProvider, { ISendSMSData } from "./base/PhoneProvider";

export class TwilioService extends PhoneProvider<null> {
  public static getType() {
    return ServiceProviderType.HYBRID;
  }
  public async sendSMS(data: ISendSMSData) {
    // TODO Not implemented
    this.logInfo(
      {
        className: "TwilioService",
        methodName: "sendSMS",
        message: "NOT IMPLEMENTED",
        data,
      },
    );
  }
}