"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const exec_1 = require("../exec");
async function dockerSetup(arg) {
    console.log(colors_1.default.bgGreen("DOCKER CHECK"));
    try {
        await exec_1.execAsync("docker --version");
    }
    catch (err) {
        throw new Error("Docker not found, please visit https://docs.docker.com/install/ for instructions");
    }
    return arg;
}
exports.default = dockerSetup;
