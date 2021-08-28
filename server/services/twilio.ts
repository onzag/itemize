import { ServiceProviderType } from ".";
import PhoneProvider, { ISendSMSData } from "./base/PhoneProvider";

export class TwilioService extends PhoneProvider<null> {
  public static getType() {
    return ServiceProviderType.HYBRID;
  }
  public async sendSMS(data: ISendSMSData) {
    // TODO Not implemented
    this.logInfo(
      "TwilioService.sendSMS: NOT IMPLEMENTED",
      data,
    );
  }
}