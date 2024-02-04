import type { Browser, Cookie, Page } from "puppeteer";
import { ITestingInfoType } from "../itemize";
import { Test } from "..";
import { IGlobalTestingType } from "../../client/internal/testing";
import { strict as assert } from "assert";
import { ISSRContextType } from "../../client/internal/providers/ssr-provider";

export class ExplorerText extends Test {
  private host: string;
  private testingInfo: ITestingInfoType;
  private puppet: Browser;
  private fullHost: string;
  private initialPath: string;

  private page: Page;
  private currentTestingContext: IGlobalTestingType;
  private currentTestingContextCookies: Cookie[];
  private currentTestingContextBuildNumber: string;
  private currentTestingContextSSR: ISSRContextType;

  constructor(
    host: string,
    fullHost: string,
    testingInfo: ITestingInfoType,
    puppet: Browser,
    initialPath: string,
  ) {
    super();

    this.fullHost = fullHost;
    this.testingInfo = testingInfo;
    this.puppet = puppet;
    this.host = host;
    this.initialPath = initialPath;
  }
  public async before() {
    this.page = await this.puppet.newPage();

    await (this.page as any)._client.send("Network.clearBrowserCache");
    await (this.page as any)._client.send("Network.clearBrowserCookies");

    await this.page.setCookie({
      name: "testing",
      value: "true",
      path: "/",
      domain: this.host,
    });

    await this.page.goto(this.fullHost + this.initialPath, {
      waitUntil: "networkidle0",
    });

    this.currentTestingContextCookies = await this.page.cookies();
    this.currentTestingContextBuildNumber = await this.page.evaluate(() => {
      return window.BUILD_NUMBER;
    });
    this.currentTestingContextSSR = await this.page.evaluate(() => {
      return window.SSR;
    });
    await this.retrieveTestingInfo();
  }

  public async retrieveTestingInfo() {
    await this.wait(500);
    this.currentTestingContext = await this.page.evaluate(() => {
      return window.TESTING;
    });
  }

  // public async runStep() {
  //   // TODO?
  // }

  public async describe() {
    const guessedDataCookie = this.currentTestingContextCookies.find((c) => c.name === "guessedData");

    this.it(
      "Should have a guessed data cookie",
      () => {
        if (!guessedDataCookie || !guessedDataCookie.value) {
          assert.fail("Could no find a guessedData cookie");
        }
        const parsed = JSON.parse(guessedDataCookie.value);
        if (parsed) {
          this.info("The user guessed country is " + parsed.country);
          this.info("The user guessed currency is " + parsed.currency);
          this.info("The user guessed language is " + parsed.language);
        }
      }
    );

    this.it(
      "Should have a matching buildnumber",
      () => {
        if (!this.currentTestingContextBuildNumber) {
          assert.fail("Did not provide a build number");
        }

        assert.strictEqual(this.currentTestingContextBuildNumber, this.testingInfo.buildnumber);
      }
    );

    this.it(
      "Should have identified its socket once, and not have done any requests before that",
      () => {
        const howMany = this.currentTestingContext.socket.identifyRequests.length;
        if (howMany === 0) {
          console.log(this.currentTestingContext.socket);
          assert.fail("Socket was not identified");
        } else if (howMany >= 2) {
          assert.fail("Socket was identified several times");
        }

        const response = this.currentTestingContext.socket.identifiedEvents[0];
        if (!response) {
          assert.fail("Socket requested identification but did not received a response");
        }
        const identifyTime = (new Date(response.time)).getTime();

        const slotsToSearchIn = [
          "feedbackRequests",
          "ownedSearchFeedbackRequests",
          "parentedSearchFeebackRequests",
          "registerRequests",
          "unregisterRequests",
          "ownedSearchRegisterRequests",
          "ownedSearchUnregisterRequests",
          "parentedSearchRegisterRequests",
          "parentedSearchUnregisterRequests",
        ];

        slotsToSearchIn.forEach((slot) => {
          const socketMessageBeforeIdentify =
            this.currentTestingContext.socket.registerRequests.find(
              (r) => (new Date(r.time)).getTime() < identifyTime
            );

          if (socketMessageBeforeIdentify) {
            assert.fail(
              "Found a request before the socket was identified, the server responded at " +
              response.time +
              " whereas this request was done at " +
              socketMessageBeforeIdentify.time +
              "\n" +
              JSON.stringify(socketMessageBeforeIdentify, null, 2)
            );
          }
        });
      }
    );

    this.it(
      "Should have no errors in the socket",
      () => {
        if (this.currentTestingContext.socket.errors.length !== 0) {
          assert.fail("Found some errors in the socket:\n" + JSON.stringify(this.currentTestingContext.socket.errors, null, 2))
        }
      }
    );

    // this.step(this.runStep);
  }

  public async after() {
    await this.page.close();
  }
}