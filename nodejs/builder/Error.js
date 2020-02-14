"use strict";
/**
 * Contains the errors that are thrown during the build and check
 * process
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const safe_1 = __importDefault(require("colors/safe"));
require("source-map-support/register");
/**
 * This class is able to display nicely a traceback object from
 * the traceback class in order to know where errors came from during
 * the building and checking process
 */
class CheckUpError extends Error {
    /**
     * The constructor needs a message and the traceback object
     * @param message the string message
     * @param traceback the traceback
     */
    constructor(message, traceback) {
        super(message);
        this.traceback = traceback;
        Object.setPrototypeOf(this, CheckUpError.prototype);
    }
    /**
     * displays the error message to stdout
     */
    display() {
        console.log(safe_1.default.red(this.message));
        this.traceback.display();
    }
}
exports.default = CheckUpError;
