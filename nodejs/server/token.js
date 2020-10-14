"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerify = exports.jwtSign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function jwtSign(payload, secretOrPrivateKey, options) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, secretOrPrivateKey, options, (err, encoded) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(encoded);
            }
        });
    });
}
exports.jwtSign = jwtSign;
async function jwtVerify(token, secretOrPublicKey, options) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, secretOrPublicKey, options, (err, decoded) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(decoded);
            }
        });
    });
}
exports.jwtVerify = jwtVerify;
