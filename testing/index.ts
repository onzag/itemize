import colors from "colors";

/**
 * Defines a test, and it should be used as an entry
 * for all subtests
 */
export class Test {
  private itQueue: Array<{
    label: string;
    fn: () => PromiseLike<void | string>;
  }>;
  private describeQueue: Array<{
    label: string;
    test: Test;
  }>;

  /**
   * Build a brand new instance
   */
  construtor() {
    this.define = this.define.bind(this);
    this.it = this.it.bind(this);
    this.execute = this.execute.bind(this);
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
  public define(label: string, test: Test) {
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
  public it(label: string, fn: () => PromiseLike<void | string>) {
    if (!this.itQueue) {
      this.itQueue = [];
    }
    this.itQueue.push({
      label,
      fn,
    });
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
    const tabsPlus = tabs + "\t";

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

    if (this.itQueue) {
      for (let itAttr of this.itQueue) {
        total++;
  
        try {
          const warning = await itAttr.fn.call(this);
          if (warning) {
            console.log(tabs + colors.yellow("⚠") + " " + colors.gray(itAttr.label));
            console.log(tabsPlus + warning);
            warnings++;
          } else {
            console.log(tabs + colors.green("✓") + " " + colors.gray(itAttr.label));
          }
          passed++;
        } catch (err) {
          console.log(tabs + colors.red("✗") + " " + colors.gray(itAttr.label));
          console.log(tabsPlus + err.message.replace(/\n/g, "\n" + tabsPlus));
        }
      }
    }

    if (this.describeQueue) {
      for (let testAttr of this.describeQueue) {
        console.log(tabs + testAttr.label);
        const results = await testAttr.test.execute.call(testAttr.test, level + 1);
        total += results.total;
        passed += results.passed;
        warnings += results.warnings;
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
        console.log(colors.yellow(warnings + " warnings"));
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
