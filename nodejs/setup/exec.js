"use strict";
/**
 * Utility to execute commands in sh, even in sudo mode
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const sudo_prompt_1 = __importDefault(require("sudo-prompt"));
/**
 * Simply does an exec
 * @param code the code we execute
 * @returns a void promise
 */
function execAsync(code) {
    // this is the promise
    return new Promise((resolve, reject) => {
        // we need to rid of spaces
        const codeArray = code.split(/\s+/g);
        // the program is the first arg
        const program = codeArray.shift();
        // and now we run spawn with each arg
        const spawnable = child_process_1.spawn(program, codeArray);
        // and log the data
        spawnable.stdout.on("data", (data) => {
            console.log(data.toString());
        });
        // the errors
        spawnable.stderr.on("data", (data) => {
            console.log(data.toString());
        });
        // and the exit for resolving
        spawnable.on("exit", (code) => {
            if (code !== 0) {
                reject(new Error("Failed with status code " + code));
            }
            else {
                resolve();
            }
        });
        // on error we reject
        spawnable.on("error", (err) => {
            reject(err);
        });
    });
}
exports.execAsync = execAsync;
/**
 * Does the same as execAsync but with sudo provileges
 * @param code the code to execute
 * @param name the name we are giving this application
 * @param icns
 * @returns a void promise
 */
function execSudo(code, name, icns) {
    return new Promise((resolve, reject) => {
        sudo_prompt_1.default.exec(code, {
            name,
            icns,
        }, (error, stdout, stderr) => {
            if (stdout) {
                console.log(stdout);
            }
            if (stderr) {
                console.log(stderr);
            }
            if (error) {
                reject(error);
            }
            else {
                resolve();
            }
        });
    });
}
exports.execSudo = execSudo;
