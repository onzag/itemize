"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PropertyEntryField_1 = __importDefault(require("./PropertyEntry/PropertyEntryField"));
const PropertyEntryFile_1 = __importDefault(require("./PropertyEntry/PropertyEntryFile"));
const PropertyEntryBoolean_1 = __importDefault(require("./PropertyEntry/PropertyEntryBoolean"));
const PropertyEntryLocation_1 = __importDefault(require("./PropertyEntry/PropertyEntryLocation"));
const PropertyEntrySelect_1 = __importDefault(require("./PropertyEntry/PropertyEntrySelect"));
const PropertyEntryText_1 = __importDefault(require("./PropertyEntry/PropertyEntryText"));
const PropertyViewSimple_1 = __importDefault(require("./PropertyView/PropertyViewSimple"));
const PropertyViewText_1 = __importDefault(require("./PropertyView/PropertyViewText"));
const PropertyViewFile_1 = __importDefault(require("./PropertyView/PropertyViewFile"));
exports.rendererContext = {
    PropertyEntryField: PropertyEntryField_1.default,
    PropertyEntryFile: PropertyEntryFile_1.default,
    PropertyEntryBoolean: PropertyEntryBoolean_1.default,
    PropertyEntryLocation: PropertyEntryLocation_1.default,
    PropertyEntrySelect: PropertyEntrySelect_1.default,
    PropertyEntryText: PropertyEntryText_1.default,
    PropertyViewSimple: PropertyViewSimple_1.default,
    PropertyViewText: PropertyViewText_1.default,
    PropertyViewFile: PropertyViewFile_1.default,
};
