import colors from "colors";

class ItHandle {
  public label: string;
  public fn: () => void | PromiseLike<void>;
  public isSkippedAllOnFail: boolean = false;
  public isSkippedLayerOnFail: boolean = false;
  public isQuitted: boolean = false;
  public isSkippedNextOnFail: boolean = false;

  constructor(label: string, fn: () => void | PromiseLike<void>) {
    this.label = label;
    this.fn = fn;
  }

  public skipAllOnFail() {
    this.isSkippedAllOnFail = true;
    return this;
  }

  public skipLayerOnFail() {
    this.isSkippedLayerOnFail = true;
    return this;
  }

  public skipNextOnFail() {
    this.isSkippedNextOnFail = true;
    return this;
  }

  public quitOnFail() {
    this.isQuitted = true;
    return this;
  }
}

class WarnHandle {
  public content: string;
  public isInfo: boolean;

  constructor(content: string) {
    this.content = content;
  }

  markAsInfo() {
    this.isInfo = true;
    return this;
  }
}

/**
 * Defines a test, and it should be used as an entry
 * for all subtests
 */
export class Test {
  private itQueue: ItHandle[];
  private describeQueue: Array<{
    label: string;
    test: Test;
  }>;
  private warningQueue: WarnHandle[];
  private doSkipNext: boolean = false;
  private doSkipAll: boolean = false;
  private doSkipLayer: boolean = false;
  private doStop: boolean = false;
  private currentStep: "it" | "describe" | "before" | "after" = null;

  /**
   * Build a brand new instance
   */
  construtor() {
    this.define = this.define.bind(this);
    this.it = this.it.bind(this);
    this.execute = this.execute.bind(this);
    this.executeIts = this.executeIts.bind(this);
    this.skipAll = this.skipAll.bind(this);
    this.skipNext = this.skipNext.bind(this);
    this.skipLayer = this.skipLayer.bind(this);
    this.quit = this.quit.bind(this);
  }

  /**
   * Executes before, override this function
   * it allows you to dinamically add tests as
   * well
   * @override
   */
  public before(): any | Promise<any> {
    return null;
  }

  /**
   * Executes during just after before has been executed
   * @override
   */
  public describe(): any | Promise<any> {
    return null;
  }

  /**
   * Executes after everything is done
   * use for cleanup
   * @override
   */
  public after(): any | Promise<any> {
    return null;
  }

  /**
   * Define a new test
   * @param label the label for the test
   * @param test the test instance
   */
  public define(label: string, test: Test = null) {
    if (!this.describeQueue) {
      this.describeQueue = [];
    }
    this.describeQueue.push({
      label,
      test,
    });
  }

  /**
   * Define a new assertion
   * @param label the label for the assertion
   * @param fn the assetion to execute
   */
  public it(
    label: string,
    fn: () => void | PromiseLike<void> = null,
  ): ItHandle {
    if (!this.itQueue) {
      this.itQueue = [];
    }
    const handle = new ItHandle(label, fn);
    this.itQueue.push(handle);
    return handle;
  }

  public step(
    fn: () => void | PromiseLike<void> = null,
  ): ItHandle {
    if (!this.itQueue) {
      this.itQueue = [];
    }
    const handle = new ItHandle(null, fn);
    this.itQueue.push(handle);
    return handle;
  }

  public warn(txt: string) {
    if (!this.warningQueue) {
      this.warningQueue = [];
    }

    const handle = new WarnHandle(txt);
    this.warningQueue.push(handle);
    return handle;
  }

  public info(txt: string) {
    const handle = this.warn(txt);
    handle.markAsInfo();
    return handle;
  }

  /**
   * Skip all the next IT tests
   * they should be on the same layer
   */
  public skipNext() {
    if (this.currentStep === "it") {
      this.doSkipNext = true;
      return;
    }
    this.step(() => {
      this.doSkipNext = true;
    });
  }

  /**
   * Skips all the following IT tests
   * and by all it means all of them
   */
  public skipAll() {
    if (this.currentStep === "it") {
      this.doSkipAll = true;
      return;
    }
    this.step(() => {
      this.doSkipAll = true;
    });
  }

  /**
   * Skip all the tests that are
   * on the same layer following
   * this
   */
  public skipLayer() {
    if (this.currentStep === "it") {
      this.doSkipNext = true;
      return;
    }
    this.step(() => {
      this.doSkipLayer = true;
    });
  }

  public wait(ms: number): Promise<void> {
    return new Promise((r) => {
      setTimeout(r, ms);
    });
  }

  /**
   * Quits this test
   */
  public quit() {
    this.doStop = true;
  }

  private async executeIts(level: number) {
    // reset these as they are only for this layer
    this.doSkipNext = false;
    this.doSkipLayer = false;

    let total: number = 0;
    let passed: number = 0;
    let warnings: number = 0;

    const tabs = "\t".repeat(level);
    const tabsPlus = tabs + "\t";

    // clear the warning queue
    this.warningQueue = null;

    if (this.itQueue) {
      const loopItQueue = this.itQueue;
      this.itQueue = null;
      for (let itAttr of loopItQueue) {
        if (this.doSkipAll || this.doSkipNext || this.doSkipLayer) {
          this.doSkipNext = false;
          console.log(tabs + colors.gray("⦰ [skipped]") + " " + colors.gray(itAttr.label));
          continue;
        }

        if (itAttr.label) {
          total++;
        }

        try {
          itAttr.fn ? await itAttr.fn.call(this) : null;
          if (itAttr.label) {
            console.log(tabs + colors.green("✓") + " " + colors.gray(itAttr.label));
          }
          const itWarnings = this.warningQueue;
          this.warningQueue = null;
          if (itWarnings) {
            for (let warningToShow of itWarnings) {
              const colorFn = warningToShow.isInfo ? colors.cyan : colors.yellow;
              console.log(
                (itAttr.label ? tabsPlus : tabs) +
                colorFn(warningToShow.isInfo ? "ⓘ" : "⚠") + " " + colorFn(warningToShow.content)
              );
              if (!warningToShow.isInfo) {
                warnings++;
              }
            }
          }
          if (itAttr.label) {
            passed++;
          }
        } catch (err) {
          this.warningQueue = null;
          if (itAttr.isSkippedAllOnFail) {
            this.doSkipAll = true;
          }
          if (itAttr.isSkippedLayerOnFail) {
            this.doSkipLayer = true;
          }
          if (itAttr.isSkippedNextOnFail) {
            this.doSkipNext = true;
          }
          if (itAttr.isQuitted) {
            this.doStop = true;
          }

          // we remove any children if any added by this queue
          // as it failed so children won't be executed
          this.itQueue = null;

          if (itAttr.label) {
            console.log(tabs + colors.red("✗") + " " + colors.gray(itAttr.label));
          }
          console.log(
            (itAttr.label ? tabsPlus : tabs) +
            err.message.replace(/\n/g, "\n" + tabsPlus)
          );
        }

        if (this.doStop) {
          break;
        }

        // check if the it that we just executed added its own
        // sub it steps for itself, this will do that
        // if new it assumptions were added on the fly
        // they will appear as children
        if (this.itQueue && this.itQueue.length) {
          const thisLayerSkipLayer: boolean = this.doSkipLayer;
          const thisLayerSkipNext: boolean = this.doSkipNext;

          const subItQueue = await this.executeIts(level + 1);
          total += subItQueue.total;
          passed += subItQueue.passed;
          warnings += subItQueue.warnings;

          // avoid the previous skip layer and skip next to leak in this queue
          // we restore from this layer
          // all does leak
          this.doSkipLayer = thisLayerSkipLayer;
          this.doSkipNext = thisLayerSkipNext;
        }
      }
    }

    return {
      total,
      passed,
      warnings,
    }
  }

  /**
   * Executes the test
   * @param level 
   */
  private async execute(level: number = 0) {
    let total: number = 0;
    let passed: number = 0;
    let warnings: number = 0;

    const tabs = "\t".repeat(level);

    try {
      this.currentStep = "before";
      await this.before.call(this);
    } catch (err) {
      console.log(colors.red(err.stack));
      process.exit(1);
    }

    try {
      this.currentStep = "describe";
      await this.describe.call(this);
    } catch (err) {
      console.log(colors.red(err.stack));
      process.exit(1);
    }

    if (this.warningQueue) {
      const baseWarnings = this.warningQueue;
      this.warningQueue = null;
      if (baseWarnings) {
        for (let warningToShow of baseWarnings) {
          const colorFn = warningToShow.isInfo ? colors.cyan : colors.yellow;
          console.log(
            tabs +
            colorFn(warningToShow.isInfo ? "ⓘ" : "⚠") + " " + colorFn(warningToShow.content)
          );
          if (!warningToShow.isInfo) {
            warnings++;
          }
        }
      }
    }

    this.currentStep = "it";
    const itResults = await this.executeIts(level);
    total += itResults.total;
    passed += itResults.passed;
    warnings += itResults.warnings;

    if (!this.doStop && this.describeQueue) {
      this.currentStep = "describe";
      for (let testAttr of this.describeQueue) {
        if (this.doSkipAll || this.doSkipNext || this.doSkipLayer) {
          console.log(tabs + colors.gray("⦰ [skipped]") + " " + testAttr.label);
          this.doSkipNext = false;
          continue;
        }

        console.log(tabs + testAttr.label);
        if (testAttr.test !== null) {
          const results = await testAttr.test.execute.call(testAttr.test, level + 1);
          total += results.total;
          passed += results.passed;
          warnings += results.warnings;
        }
      }
    }

    try {
      this.currentStep = "after";
      await this.after.call(this);
    } catch (err) {
      console.log(colors.red(err.stack));
      process.exit(1);
    }

    if (level === 0) {
      console.log(colors.green(passed + " passing"));
      if (warnings > 0) {
        console.log(colors.yellow(warnings + (warnings === 1 ? " warning" : " warnings")));
      }

      const failing = total - passed;
      if (failing > 0) {
        console.log(colors.red(failing + " failing"));

        process.exit(1);
      }
    }

    return {
      total,
      passed,
      warnings,
    }
  }
}
