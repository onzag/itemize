"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/core/styles");
const CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
const pickers_1 = require("@material-ui/pickers");
const core_1 = require("@material-ui/core");
const moment_1 = __importDefault(require("moment"));
const moment_2 = __importDefault(require("@date-io/moment"));
// TODO add collector somewhere around here
function appWrapper(app, config) {
    // we create the material ui theme
    const theme = core_1.createMuiTheme({
        typography: {
            fontFamily: "'" + config.fontName + "', sans-serif",
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
        },
    });
    return (react_1.default.createElement(styles_1.ThemeProvider, { theme: theme },
        react_1.default.createElement(CssBaseline_1.default, null),
        app));
}
exports.appWrapper = appWrapper;
function mainWrapper(mainComponent, localeContext) {
    const languageDeregionalized = localeContext.language.includes("-") ?
        localeContext.language.split("-")[0] : localeContext.language;
    return (react_1.default.createElement(pickers_1.MuiPickersUtilsProvider, { utils: moment_2.default, locale: languageDeregionalized, libInstance: moment_1.default }, mainComponent));
}
exports.mainWrapper = mainWrapper;
