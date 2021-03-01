/**
 * Contains the errors that are thrown during the build and check
 * process
 *
 * @module
 */

import colors from "colors/safe";
import Traceback from "./Traceback";
import "source-map-support/register";

/**
 * This class is able to display nicely a traceback object from
 * the traceback class in order to know where errors came from during
 * the building and checking process
 */
export default class CheckUpError extends Error {
  private traceback: Traceback;

  /**
   * The constructor needs a message and the traceback object
   * @param message the string message
   * @param traceback the traceback
   */
  constructor(
    message: string,
    traceback: Traceback,
  ) {
    super(message);

    this.traceback = traceback;

    Object.setPrototypeOf(this, CheckUpError.prototype);
  }

  /**
   * displays the error message to stdout
   */
  public display() {
    console.log(colors.red(this.message));
    this.traceback.display();
  }
}
