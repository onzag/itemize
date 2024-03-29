import { ServiceProviderType } from ".";
import PhoneProvider, { ISendSMSData } from "./base/PhoneProvider";

export class FakeSMSService extends PhoneProvider<null> {
  public static getType() {
    return ServiceProviderType.HYBRID;
  }
  public async sendSMS(data: ISendSMSData) {
    this.logInfo(
      {
        className: "FakeSMSService",
        methodName: "sendSMS",
        message: "Fake SMS being sent",
        data,
      },
    );
  }
}