import fetchNode, { Response } from "node-fetch";
import { Test } from "..";
import { strict as assert } from "assert";
import { ITestingInfoType } from "../itemize";
import { JSDOM } from "jsdom";

export class RobotsTest extends Test {
  private fullHost: string;
  private info: ITestingInfoType;
  private host: string;
  private port: string | number;
  private https: boolean;
  private parser: DOMParser;

  constructor(https: boolean, host: string, port: string | number, fullHost: string, info: ITestingInfoType) {
    super();

    this.fullHost = fullHost;
    this.host = host;
    this.https = https;
    this.port = port;
    this.info = info;

    const dom = new JSDOM("");
    const DOMParser = dom.window.DOMParser;
    this.parser = new DOMParser();

    this.sitemapChecker = this.sitemapChecker.bind(this);
  }
  public async urlChecker(url: string) {
    const response = await fetchNode(
      url,
      {
        method: "HEAD",
      }
    );
    assert.strictEqual(response.status, 200, "Did not return 200 OK");
  }
  public async sitemapChecker(sitemapURL: string) {
    const response = await fetchNode(sitemapURL);
    assert.strictEqual(response.status, 200, "Did not return 200 OK");

    const sitemapContent = await response.text();

    const xmlDoc = this.parser.parseFromString(sitemapContent, "text/xml");
    const xmlComponent = xmlDoc.childNodes[0] as Element;
    if (
      !xmlComponent ||
      (xmlComponent.tagName !== "sitemapindex" && xmlComponent.tagName !== "urlset")
    ) {
      assert.fail("Invalid Sitemap");
    }

    const locs = xmlComponent.querySelectorAll("loc");
    locs.forEach((loc) => {
      const sitemapURLParsed = new URL(loc.textContent);

      if (
        xmlComponent.tagName === "urlset" &&
        sitemapURLParsed.hostname !== this.info.config.developmentHostname &&
        sitemapURLParsed.hostname !== this.info.config.productionHostname
      ) {
        assert.fail("Raw URL doesn't point to website " + loc.textContent);
      }

      if (
        (
          this.host === "localhost"
        ) && (
          sitemapURLParsed.hostname === this.info.config.developmentHostname ||
          sitemapURLParsed.hostname === this.info.config.productionHostname
        )
      ) {
        if (this.https) {
          sitemapURLParsed.protocol = "https";
        } else {
          sitemapURLParsed.protocol = "http";
        }
        sitemapURLParsed.host = "localhost";
        sitemapURLParsed.port = this.port.toString();
      }
      const urlToUse = sitemapURLParsed.toString();

      if (xmlComponent.tagName === "sitemapindex") {
        this.it(
          "Have valid sitemap at " + urlToUse,
          this.sitemapChecker.bind(this, urlToUse)
        );
      } else {
        this.it(
          "Provide something at " + urlToUse,
          this.urlChecker.bind(this, urlToUse),
        );
      }
    });
  }
  public describe() {
    let content: string[];
    let sitemapURL: string;

    this.it(
      "Should have a robots file",
      async () => {
        const response = await fetchNode(this.fullHost + "/robots.txt");
        assert.strictEqual(response.status, 200, "Did not return 200 OK");

        content = (await response.text()).trim().split("\n");

        const firstLine = content[0];

        if (!firstLine.startsWith("user-agent")) {
          assert.fail("Not a valid robots file");
        }

        const disallowAllLine = content
          .find((l) => l.trim() === "disallow: /");

        if (disallowAllLine) {
          this.skipAll();
          return "SEO is not active";
        }
      },
    ).skipAllOnFail();

    this.it(
      "Should offer a sitemap url",
      async () => {
        const sitemapLine = content.find((l) => l.trim().toLowerCase().startsWith("sitemap: "));
        if (!sitemapLine) {
          assert.fail("Found no sitemap line in robots");
        }

        const splitted = sitemapLine.split(":");
        splitted.shift();
        const sitemapURLInRobots = splitted.join(":").trim();

        if (!sitemapURLInRobots) {
          assert.fail("There is no sitemap url in robots");
        }

        let sitemapURLParsed: URL;
        try {
          sitemapURLParsed = new URL(sitemapURLInRobots);
        } catch {
          assert.fail("The sitemap url is invalid: " + sitemapURLInRobots);
        }

        let warningOfLocalhost: string = null;
        if (
          (
            this.host === "localhost"
          ) && (
            sitemapURLParsed.hostname === this.info.config.developmentHostname ||
            sitemapURLParsed.hostname === this.info.config.productionHostname
          )
        ) {
          warningOfLocalhost = "Used localhost instead of the proper host of " + sitemapURLParsed.hostname;
          if (this.https) {
            sitemapURLParsed.protocol = "https";
          } else {
            sitemapURLParsed.protocol = "http";
          }
          sitemapURLParsed.host = "localhost";
          sitemapURLParsed.port = this.port.toString();
        }

        sitemapURL = sitemapURLParsed.toString();

        this.it(
          "Should serve and have a valid sitemap at " + sitemapURL,
          this.sitemapChecker.bind(this, sitemapURL)
        );

        return warningOfLocalhost;
      }
    ).skipAllOnFail();
  }
}