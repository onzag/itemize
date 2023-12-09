import { Test } from "..";
import { strict as assert } from "assert";
import { ITestingInfoType } from "../itemize";
import { JSDOM } from "jsdom";

export class RobotsTest extends Test {
  private fullHost: string;
  private testingInfo: ITestingInfoType;
  private host: string;
  private port: string | number;
  private https: boolean;
  private parser: DOMParser;

  constructor(https: boolean, host: string, port: string | number, fullHost: string, testingInfo: ITestingInfoType) {
    super();

    this.fullHost = fullHost;
    this.host = host;
    this.https = https;
    this.port = port;
    this.testingInfo = testingInfo;

    const dom = new JSDOM("");
    const DOMParser = dom.window.DOMParser;
    this.parser = new DOMParser();

    // this.sitemapChecker = this.sitemapChecker.bind(this);
  }
  // public async urlChecker(url: string) {
  //   const expectedLanguage = new URL(url);
  //   expectedLanguage.pathname.split("/")[1];

  //   if (!expectedLanguage) {
  //     assert.fail("Did not provide a language");
  //   }

  //   const response = await fetchNode(
  //     url,
  //   );
  //   if (response.status === 403) {
  //     const forbiddenSignature = response.headers.get("x-forbidden-signature") || "";
  //     assert.fail(
  //       "Server returned 403, this suggests you are accessing a resource that is forbidden for the public\n" +
  //       "Sitemaps are meant for public robots (not logged in) and its URLs should not contain forbidden resources\n" +
  //       "Forbidden signature: " + forbiddenSignature
  //     );
  //   }

  //   const etag = response.headers.get("etag");
  //   if (!etag) {
  //     assert.fail("Server did not provide an Etag, this suggests a crash occurred on the server side and it went through a fallback");
  //   }

  //   assert.strictEqual(response.status, 200, "Did not return 200 OK");
  // }
  // public async sitemapChecker(sitemapURL: string) {
  //   const response = await fetchNode(sitemapURL);
  //   assert.strictEqual(response.status, 200, "Did not return 200 OK");

  //   const sitemapContent = await response.text();

  //   const xmlDoc = this.parser.parseFromString(sitemapContent, "text/xml");
  //   const xmlComponent = xmlDoc.childNodes[0] as Element;
  //   if (
  //     !xmlComponent ||
  //     (xmlComponent.tagName !== "sitemapindex" && xmlComponent.tagName !== "urlset")
  //   ) {
  //     assert.fail("Invalid Sitemap");
  //   }

  //   const locs = xmlComponent.querySelectorAll("loc");
  //   locs.forEach((loc) => {
  //     const sitemapURLParsed = new URL(loc.textContent);

  //     if (
  //       xmlComponent.tagName === "urlset" &&
  //       sitemapURLParsed.hostname !== this.testingInfo.config.developmentHostname &&
  //       sitemapURLParsed.hostname !== this.testingInfo.config.productionHostname
  //     ) {
  //       assert.fail("Raw URL doesn't point to website " + loc.textContent);
  //     }

  //     if (
  //       (
  //         this.host === "localhost"
  //       ) && (
  //         sitemapURLParsed.hostname === this.testingInfo.config.developmentHostname ||
  //         sitemapURLParsed.hostname === this.testingInfo.config.productionHostname
  //       )
  //     ) {
  //       if (this.https) {
  //         sitemapURLParsed.protocol = "https";
  //       } else {
  //         sitemapURLParsed.protocol = "http";
  //       }
  //       sitemapURLParsed.host = "localhost";
  //       sitemapURLParsed.port = this.port.toString();
  //     }
  //     const urlToUse = sitemapURLParsed.toString();

  //     if (xmlComponent.tagName === "sitemapindex") {
  //       this.it(
  //         "Have valid sitemap at " + urlToUse,
  //         this.sitemapChecker.bind(this, urlToUse)
  //       );
  //     } else {
  //       this.it(
  //         "Respond at " + urlToUse,
  //         this.urlChecker.bind(this, urlToUse),
  //       );
  //     }
  //   });
  // }
  public describe() {
    let content: string[];
    let sitemapURL: string;

    // this.it(
    //   "Should have a robots file",
    //   async () => {
    //     const response = await fetchNode(this.fullHost + "/robots.txt");
    //     assert.strictEqual(response.status, 200, "Did not return 200 OK");

    //     content = (await response.text()).trim().split("\n");

    //     const firstLine = content[0];

    //     if (!firstLine.startsWith("user-agent")) {
    //       assert.fail("Not a valid robots file");
    //     }

    //     const disallowAllLine = content
    //       .find((l) => l.trim() === "disallow: /");

    //     if (disallowAllLine) {
    //       this.warn("SEO is not active");
    //       this.skipAll();
    //     }
    //   },
    // ).skipAllOnFail();

    // this.it(
    //   "Should offer a sitemap url",
    //   async () => {
    //     const sitemapLine = content.find((l) => l.trim().toLowerCase().startsWith("sitemap: "));
    //     if (!sitemapLine) {
    //       assert.fail("Found no sitemap line in robots");
    //     }

    //     const splitted = sitemapLine.split(":");
    //     splitted.shift();
    //     const sitemapURLInRobots = splitted.join(":").trim();

    //     if (!sitemapURLInRobots) {
    //       assert.fail("There is no sitemap url in robots");
    //     }

    //     let sitemapURLParsed: URL;
    //     try {
    //       sitemapURLParsed = new URL(sitemapURLInRobots);
    //     } catch {
    //       assert.fail("The sitemap url is invalid: " + sitemapURLInRobots);
    //     }

    //     if (
    //       (
    //         this.host === "localhost"
    //       ) && (
    //         sitemapURLParsed.hostname === this.testingInfo.config.developmentHostname ||
    //         sitemapURLParsed.hostname === this.testingInfo.config.productionHostname
    //       )
    //     ) {
    //       this.info("Used localhost instead of the proper host of " + sitemapURLParsed.hostname);
    //       if (this.https) {
    //         sitemapURLParsed.protocol = "https";
    //       } else {
    //         sitemapURLParsed.protocol = "http";
    //       }
    //       sitemapURLParsed.host = "localhost";
    //       sitemapURLParsed.port = this.port.toString();
    //     }

    //     sitemapURL = sitemapURLParsed.toString();

    //     this.it(
    //       "Should serve and have a valid sitemap at " + sitemapURL,
    //       this.sitemapChecker.bind(this, sitemapURL)
    //     );
    //   }
    // ).skipAllOnFail();
  }
}