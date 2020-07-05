import pkgcloud from "pkgcloud";
import { ISEORuleSet, ISEORule } from ".";
import https from "https";
import { logger } from "../index";
import { IncomingMessage } from "http";

export class SEOGenerator {
  private container: pkgcloud.storage.Container;
  private prefix: string;
  private rules: ISEORuleSet;
  private supportedLanguages: string[];

  constructor(
    rules: ISEORuleSet,
    container: pkgcloud.storage.Container,
    prefix: string,
    supportedLanguages: string[];
  ) {
    this.container = container;
    this.prefix = prefix;
    this.rules = rules;
    this.supportedLanguages = supportedLanguages;
  }

  public async run() {
    await this.checkIndexFile();
    for (const ruleKey of Object.keys(this.rules)) {
      await this.runFor(ruleKey, this.rules[ruleKey]);
    }
  }

  private async runHeadRequest(at: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const strURL = this.prefix + at;
      logger.info("SEOGenerator.runHeadRequest: Checking sitemap " + strURL);
      const url = new URL(strURL);
      https.get({
        method: "HEAD",
        host: url.host,
        path: url.pathname,
      }, (resp) => {
        if (resp.statusCode === 200 || resp.statusCode === 0) {
          logger.info("SEOGenerator.runHeadRequest: Checking succeed " + strURL);
        } else {
          logger.info("SEOGenerator.runHeadRequest: Checking failed " + strURL);
        }
  
        return resp.statusCode === 200 || resp.statusCode === 0;
      });
    });
  }

  private async checkIndexFile() {
    let needsRevalidate = await this.runHeadRequest("sitemaps/index.xml");
    if (!needsRevalidate) {
      for (const language of this.supportedLanguages) {
        needsRevalidate = await this.runHeadRequest("sitemaps/" + language + )
      }
    }
  }

  private async runFor(key: string, rule: ISEORule) {

  }
}