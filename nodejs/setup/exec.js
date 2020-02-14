"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const sudo_prompt_1 = __importDefault(require("sudo-prompt"));
function execAsync(code) {
    return new Promise((resolve, reject) => {
        const codeArray = code.split(/\s+/g);
        const program = codeArray.shift();
        const spawnable = child_process_1.spawn(program, codeArray);
        spawnable.stdout.on("data", (data) => {
            console.log(data.toString());
        });
        spawnable.stderr.on("data", (data) => {
            console.log(data.toString());
        });
        spawnable.on("exit", (code) => {
            if (code !== 0) {
                reject(new Error("Failed with status code " + code));
            }
            else {
                resolve();
            }
        });
        spawnable.on("error", (err) => {
            reject(err);
        });
    });
}
exports.execAsync = execAsync;
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
