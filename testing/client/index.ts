import { Test } from "..";
import { strict as assert } from "assert";
import { ITestingInfoType } from "../itemize";
import type { Browser } from "puppeteer";
import { ExplorerText } from "./explorer";

const NODE_ENV = process.env.NODE_ENV;

export class ClientTest extends Test {
  private testingInfo: ITestingInfoType;
  private host: string;
  private port: string | number;
  private https: boolean;
  private puppet: Browser;

  private fullHost: string;

  constructor(
    https: boolean,
    host: string,
    port: string | number,
    testingInfo: ITestingInfoType,
    puppet: Browser,
  ) {
    super();

    this.host = host;
    this.https = https;
    this.port = port;
    this.testingInfo = testingInfo;

    this.puppet = puppet;
  }
  public async before() {
    this.fullHost = (this.https ? "https://" : "http://") + this.host + (this.port ? ":" + this.port : "");
  }

  public describe() {
    // TODO explore the website as a range of users and with language specified
    this.define(
      "Exploring the website as a guest (no language specified)",
      new ExplorerText(
        this.host,
        this.fullHost,
        this.testingInfo,
        this.puppet,
        "/",
      ),
    );
  }

  public after() {

  }
}