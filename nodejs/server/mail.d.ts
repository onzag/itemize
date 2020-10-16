import ItemDefinition from "../base/Root/Module/ItemDefinition";
import Mailgun from "mailgun-js";
import PropertyDefinition from "../base/Root/Module/ItemDefinition/PropertyDefinition";
import { Cache } from "./cache";
import { ISensitiveConfigRawJSONDataType } from "../config";
export declare class MailService {
    private mailgun;
    private cache;
    private sensitiveConfig;
    constructor(mailgun: Mailgun.Mailgun, cache: Cache, sensitiveConfig: ISensitiveConfigRawJSONDataType);
    sendTemplateEmail(arg: {
        fromUsername: string;
        fromEmailHandle: string;
        to: string | string[];
        subject: string;
        itemDefinition: ItemDefinition;
        property: PropertyDefinition;
        id: number;
        version?: string;
        args: any;
    }): Promise<void>;
}
