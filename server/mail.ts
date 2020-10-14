import ItemDefinition from "../base/Root/Module/ItemDefinition";
import Mailgun from "mailgun-js";
import PropertyDefinition from "../base/Root/Module/ItemDefinition/PropertyDefinition";
import { ISQLTableRowValue } from "../base/Root/sql";
import { logger } from "../server";
import { renderTemplate, capitalize } from "../util";
import { Cache } from "./cache";
import { ISensitiveConfigRawJSONDataType } from "../config";

const USE_FAKE_EMAILS = process.env.FAKE_EMAILS === "true";

export class MailService {
  private mailgun: Mailgun.Mailgun;
  private cache: Cache;
  private sensitiveConfig: ISensitiveConfigRawJSONDataType;
  constructor(mailgun: Mailgun.Mailgun, cache: Cache, sensitiveConfig: ISensitiveConfigRawJSONDataType) {
    this.mailgun = mailgun;
    this.cache = cache;
    this.sensitiveConfig = sensitiveConfig;
  }

  async sendTemplateEmail(
    arg: {
      fromUsername: string,
      fromEmailHandle: string,
      to: string;
      subject: string;
      itemDefinition: ItemDefinition;
      property: PropertyDefinition;
      id: number;
      version?: string;
      args: any;
    }
  ) {
    let templateValue: ISQLTableRowValue = null;
    let parsedTemplateValue: string = null;
    let textValue: string = null;

    if (arg.id) {
      try {
        templateValue = await this.cache.requestValue(arg.itemDefinition, arg.id, arg.version || null);

        if (!templateValue && arg.version) {
          templateValue = await this.cache.requestValue(arg.itemDefinition, arg.id, null);
        }

        if (templateValue && templateValue.content) {
          parsedTemplateValue = renderTemplate(
            templateValue.content,
            arg.args,
          );
        }
      } catch (err) {
        logger.error(
          "MailService.sendTemplateEmail [SERIOUS]: failed to retrieve item definition",
          {
            errMessage: err.message,
            errStack: err.stack,
            itemDefinition: arg.itemDefinition.getQualifiedPathName(),
            id: arg.id,
            version: arg.version,
          },
        );
        throw err;
      }
    }

    if (!parsedTemplateValue) {
      textValue = "You do not have a template fragment setup for " +
        arg.itemDefinition.getQualifiedPathName() + "." + arg.id + "." + (arg.version || "");
      textValue += "\n\n" + JSON.stringify(arg.args, null, 2) + "\n";
    }

    const from = `${arg.fromUsername} <${arg.fromEmailHandle}@${this.sensitiveConfig.mailgunDomain}>`;

    const mailgunArgs: Mailgun.messages.SendData = {
      from,
      to: arg.to,
      subject: arg.subject,
    }

    if (textValue) {
      mailgunArgs.text = textValue;
    } else {
      mailgunArgs.html = parsedTemplateValue;
    }

    if (USE_FAKE_EMAILS || !this.mailgun) {
      if (!USE_FAKE_EMAILS) {
        logger.error(
          "MailService.sendTemplateEmail [SERIOUS]: mailgun API is attempting to be used but it's not available",
          {
            mailgunArgs,
          },
        );
      } else {
        console.log(mailgunArgs);
      }
      return;
    }

    try {
      await this.mailgun.messages().send(mailgunArgs);
    } catch (err) {
      logger.error(
        "MailService.sendTemplateEmail [SERIOUS]: mailgun API failed to deliver an email",
        {
          errMessage: err.message,
          errStack: err.stack,
          mailgunArgs,
        },
      );
      throw err;
    }
  }
}