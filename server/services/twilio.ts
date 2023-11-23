import { httpRequest } from "../../server/request";
import { ServiceProviderType } from ".";
import PhoneProvider, { ISendSMSData } from "./base/PhoneProvider";

interface ITWilioConfig {
  accountId: string;
  accountToken: string;
  phoneNumbers: {
    [match: string]: string;
  }
}

export class TwilioService extends PhoneProvider<ITWilioConfig> {
  public static getType() {
    return ServiceProviderType.HYBRID;
  }

  // TODO allow to define bulk groups by property
  // TODO allow to send to bulk groups

  public async sendSMS(data: ISendSMSData) {
    if (data.text.length > 1600) {
      const err = new Error("The text attempted to be sent is too long as it exceeds 1600 characters");
      this.logError({
        message: "Text is too long",
        data,
        err,
        className: "TwilioService",
        methodName: "sendSMS",
        serious: true,
      });
      throw err;
    }

    const targetPhones = Array.isArray(data.to) ? data.to : [data.to];

    const targetPhonesSorted: { [match: string]: string[] } = {};

    for (let targetPhone of targetPhones) {
      let targetPhoneMatches: string = "*";

      const avaliableMatches = Object.keys(this.config.phoneNumbers);
      for (let avaliableMatch of avaliableMatches) {
        if (targetPhone.startsWith(avaliableMatch)) {
          // matches more characters, this shouldn't happen nevertheless
          // as the country codes should be non-overlapping
          if (targetPhoneMatches.length < avaliableMatch.length) {
            targetPhoneMatches = avaliableMatch;
          }
        };
      }

      if (!targetPhonesSorted[targetPhoneMatches]) {
        targetPhonesSorted[targetPhoneMatches] = [];
      }

      targetPhonesSorted[targetPhoneMatches].push(targetPhone);
    }

    await Promise.all(Object.keys(targetPhonesSorted).map((k) => this.sendSMSToTargets(k, targetPhonesSorted[k], data.text)));
  }

  public async sendSMSToTargets(fromMatchFor: string, to: string[], text: string) {
    const sourcePhone = this.config.phoneNumbers[fromMatchFor];

    if (!sourcePhone) {
      this.logError({
        message: "Could not get a match for the phones while attempting to send a SMS",
        data: {
          fromMatchFor,
          to,
          text,
        },
        className: "TwilioService",
        methodName: "sendSMSToTargets",
        serious: true,
      });
      return;
    }

    // twilio doesn't support bulk like that
    // it needs to be previously specified
    let errorRaised: Error;
    for (let target of to) {
      try {
        // let's allow it to at least try all before cancelling
        await this.sendSMSToSingleTarget(sourcePhone, target, text);
      } catch (err) {
        errorRaised = err;
      }
    }

    if (errorRaised) {
      throw errorRaised;
    }
  }

  public async sendSMSToSingleTarget(from: string, to: string, text: string) {
    try {
      await httpRequest({
        host: "api.twilio.com",
        path: "/2010-04-01/Accounts/" + this.config.accountId + "/Messages.json",
        isHttps: true,
        method: "POST",
        auth: `${this.config.accountId}:${this.config.accountToken}`,
        urlEncoded: {
          To: to,
          From: from,
          Body: text,
        }
      });
    } catch (err) {
      this.logError({
        err,
        message: "HTTP request to twilio API failed",
        serious: true,
        className: "TwilioService",
        methodName: "sendSMSToTargets",
        data: {
          from,
          to,
          text,
        },
      });
      throw err;
    }
  }
}