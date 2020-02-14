"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const countries_json_1 = __importDefault(require("./countries.json"));
const currencies_json_1 = __importDefault(require("./currencies.json"));
exports.countries = countries_json_1.default;
exports.currencies = currencies_json_1.default;
exports.arrCountries = Object.keys(exports.countries).map((code) => exports.countries[code]);
exports.arrCurrencies = Object.keys(exports.currencies).map((code) => exports.currencies[code]);
