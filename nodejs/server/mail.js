"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
const util_1 = require("../util");
const USE_FAKE_EMAILS = process.env.FAKE_EMAILS === "true";
class MailService {
    constructor(mailgun, cache, sensitiveConfig) {
        this.mailgun = mailgun;
        this.cache = cache;
        this.sensitiveConfig = sensitiveConfig;
    }
    async sendTemplateEmail(arg) {
        let templateValue = null;
        let parsedTemplateValue = null;
        let textValue = null;
        if (arg.id) {
            try {
                templateValue = await this.cache.requestValue(arg.itemDefinition, arg.id, arg.version || null);
                if (!templateValue && arg.version) {
                    templateValue = await this.cache.requestValue(arg.itemDefinition, arg.id, null);
                }
                if (templateValue && templateValue.content) {
                    parsedTemplateValue = util_1.renderTemplate(templateValue.content, arg.args);
                }
            }
            catch (err) {
                server_1.logger.error("MailService.sendTemplateEmail [SERIOUS]: failed to retrieve item definition", {
                    errMessage: err.message,
                    errStack: err.stack,
                    itemDefinition: arg.itemDefinition.getQualifiedPathName(),
                    id: arg.id,
                    version: arg.version,
                });
                throw err;
            }
        }
        if (!parsedTemplateValue) {
            textValue = "You do not have a template fragment setup for " +
                arg.itemDefinition.getQualifiedPathName() + "." + arg.id + "." + (arg.version || "");
            textValue += "\n\n" + JSON.stringify(arg.args, null, 2) + "\n";
        }
        const from = `${arg.fromUsername} <${arg.fromEmailHandle}@${this.sensitiveConfig.mailgunDomain}>`;
        const mailgunArgs = {
            from,
            to: arg.to,
            subject: arg.subject,
        };
        if (textValue) {
            mailgunArgs.text = textValue;
        }
        else {
            mailgunArgs.html = parsedTemplateValue;
        }
        if (USE_FAKE_EMAILS || !this.mailgun) {
            if (!USE_FAKE_EMAILS) {
                server_1.logger.error("MailService.sendTemplateEmail [SERIOUS]: mailgun API is attempting to be used but it's not available", {
                    mailgunArgs,
                });
            }
            else {
                server_1.logger.info("MailService.sendTemplateEmail: Fake email being sent", mailgunArgs);
            }
            return;
        }
        if (mailgunArgs.to === null || (Array.isArray(mailgunArgs) && mailgunArgs.length === 0)) {
            server_1.logger.warn("MailService.sendTemplateEmail: Attempted to send an email without recepient", {
                mailgunArgs,
            });
            return;
        }
        try {
            await this.mailgun.messages().send(mailgunArgs);
        }
        catch (err) {
            server_1.logger.error("MailService.sendTemplateEmail [SERIOUS]: mailgun API failed to deliver an email", {
                errMessage: err.message,
                errStack: err.stack,
                mailgunArgs,
            });
            throw err;
        }
    }
}
exports.MailService = MailService;
