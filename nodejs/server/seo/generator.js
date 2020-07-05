"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const index_1 = require("../index");
class SEOGenerator {
    constructor(rules, container, prefix, supportedLanguages) {
        this.container = container;
        this.prefix = prefix;
        this.rules = rules;
        this.supportedLanguages = supportedLanguages;
    }
    async run() {
        await this.checkIndexFile();
        for (const ruleKey of Object.keys(this.rules)) {
            await this.runFor(ruleKey, this.rules[ruleKey]);
        }
    }
    async runHeadRequest(at) {
        return new Promise((resolve, reject) => {
            const strURL = this.prefix + at;
            index_1.logger.info("SEOGenerator.runHeadRequest: Checking sitemap " + strURL);
            const url = new URL(strURL);
            https_1.default.get({
                method: "HEAD",
                host: url.host,
                path: url.pathname,
            }, (resp) => {
                if (resp.statusCode === 200 || resp.statusCode === 0) {
                    index_1.logger.info("SEOGenerator.runHeadRequest: Checking succeed " + strURL);
                }
                else {
                    index_1.logger.info("SEOGenerator.runHeadRequest: Checking failed " + strURL);
                }
                return resp.statusCode === 200 || resp.statusCode === 0;
            });
        });
    }
    async checkIndexFile() {
        let needsRevalidate = await this.runHeadRequest("sitemaps/index.xml");
        if (!needsRevalidate) {
            for (const language of this.supportedLanguages) {
                needsRevalidate = await this.runHeadRequest("sitemaps/" + language + );
            }
        }
    }
    async runFor(key, rule) {
    }
}
exports.SEOGenerator = SEOGenerator;
