"use strict";
/**
 * This file represents the renderer context for the fast prototyping mechanism it
 * contains all the components that take form for the renderer context for fast prototyping
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rendererContext = void 0;
const PropertyEntryField_1 = __importDefault(require("./PropertyEntry/PropertyEntryField"));
const PropertyEntryFile_1 = __importDefault(require("./PropertyEntry/PropertyEntryFile"));
const PropertyEntryBoolean_1 = __importDefault(require("./PropertyEntry/PropertyEntryBoolean"));
const PropertyEntryLocation_1 = __importDefault(require("./PropertyEntry/PropertyEntryLocation"));
const PropertyEntrySelect_1 = __importDefault(require("./PropertyEntry/PropertyEntrySelect"));
const PropertyEntryText_1 = __importDefault(require("./PropertyEntry/PropertyEntryText"));
const PropertyEntryDateTime_1 = __importDefault(require("./PropertyEntry/PropertyEntryDateTime"));
const PropertyViewBoolean_1 = __importDefault(require("./PropertyView/PropertyViewBoolean"));
const PropertyViewSimple_1 = __importDefault(require("./PropertyView/PropertyViewSimple"));
const PropertyViewText_1 = __importDefault(require("./PropertyView/PropertyViewText"));
const PropertyViewFile_1 = __importDefault(require("./PropertyView/PropertyViewFile"));
const PropertyViewDateTime_1 = __importDefault(require("./PropertyView/PropertyViewDateTime"));
const PropertyViewLocation_1 = __importDefault(require("./PropertyView/PropertyViewLocation"));
const PropertyViewCurrency_1 = __importDefault(require("./PropertyView/PropertyViewCurrency"));
const PropertyEntryReference_1 = __importDefault(require("./PropertyEntry/PropertyEntryReference"));
exports.rendererContext = {
    PropertyEntryField: PropertyEntryField_1.default,
    PropertyEntryReference: PropertyEntryReference_1.default,
    PropertyEntryFile: PropertyEntryFile_1.default,
    PropertyEntryBoolean: PropertyEntryBoolean_1.default,
    PropertyEntryLocation: PropertyEntryLocation_1.default,
    PropertyEntrySelect: PropertyEntrySelect_1.default,
    PropertyEntryText: PropertyEntryText_1.default,
    PropertyEntryDateTime: PropertyEntryDateTime_1.default,
    PropertyViewBoolean: PropertyViewBoolean_1.default,
    PropertyViewSimple: PropertyViewSimple_1.default,
    PropertyViewText: PropertyViewText_1.default,
    PropertyViewDateTime: PropertyViewDateTime_1.default,
    PropertyViewFile: PropertyViewFile_1.default,
    PropertyViewLocation: PropertyViewLocation_1.default,
    PropertyViewCurrency: PropertyViewCurrency_1.default,
};
