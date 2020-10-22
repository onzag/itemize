import colors from "colors";

class ItHandle {
  public label: string;
  public fn: () => void | string | PromiseLike<void | string>;
  public isSkippedAllOnFail: boolean = false;
  public isSkippedLayerOnFail: boolean = false;
  public isQuitted: boolean = false;

  constructor(label: string, fn: () => void | string | PromiseLike<void | string>) {
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

  public quitOnFail() {
    this.isQuitted = true;
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
  private doSkipNext: boolean = false;
  private doSkipAll: boolean = false;
  private doSkipLayer: boolean = false;
  private doStop: boolean = false;

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
    fn: () => void | string | PromiseLike<void | string> = null,
  ): ItHandle {
    if (!this.itQueue) {
      this.itQueue = [];
    }
    const handle = new ItHandle(label, fn);
    this.itQueue.push(handle);
    return handle;
  }

  /**
   * Skip all the next IT tests
   * they should be on the same layer
   */
  public skipNext() {
    this.doSkipNext = true;
  }

  /**
   * Skips all the following IT tests
   * and by all it means all of them
   */
  public skipAll() {
    this.doSkipAll = true;
  }

  /**
   * Skip all the tests that are
   * on the same layer following
   * this
   */
  public skipLayer() {
    this.doSkipLayer = true;
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

    if (this.itQueue) {
      const loopItQueue = this.itQueue;
      this.itQueue = null;
      for (let itAttr of loopItQueue) {
        if (this.doSkipAll || this.doSkipNext || this.doSkipLayer) {
          this.doSkipNext = false;
          console.log(tabs + colors.gray("⦰ [skipped]") + " " + colors.gray(itAttr.label));
          continue;
        }

        total++;

        try {
          const warning = itAttr.fn ? await itAttr.fn.call(this) : null;
          console.log(tabs + colors.green("✓") + " " + colors.gray(itAttr.label));
          if (warning) {
            console.log(tabsPlus + colors.yellow("⚠") + " " + colors.yellow(warning));
            warnings++;
          }
          passed++;
        } catch (err) {
          if (itAttr.isSkippedAllOnFail) {
            this.doSkipAll = true;
          }
          if (itAttr.isSkippedLayerOnFail) {
            this.doSkipLayer = true;
          }
          if (itAttr.isQuitted) {
            this.doStop = true;
          }

          // we remove any children if any added by this queue
          // as it failed so children won't be executed
          this.itQueue = null;

          console.log(tabs + colors.red("✗") + " " + colors.gray(itAttr.label));
          console.log(tabsPlus + err.message.replace(/\n/g, "\n" + tabsPlus));
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
      await this.before.call(this);
    } catch (err) {
      console.log(colors.red(err.stack));
      process.exit(1);
    }

    try {
      await this.describe.call(this);
    } catch (err) {
      console.log(colors.red(err.stack));
      process.exit(1);
    }

    const itResults = await this.executeIts(level);
    total += itResults.total;
    passed += itResults.passed;
    warnings += itResults.warnings;

    if (!this.doStop && this.describeQueue) {
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
