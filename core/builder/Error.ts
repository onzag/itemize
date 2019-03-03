import * as colors from "colors/safe";
import Traceback from "./Traceback";

export default class CheckUpError extends Error {
  private traceback: Traceback;

  constructor(
    message: string,
    traceback: Traceback,
  ) {
    super(message);

    this.traceback = traceback;

    Object.setPrototypeOf(this, CheckUpError.prototype);
  }

  public display() {
    console.log(colors.red(this.message));
    this.traceback.display();
  }
}
