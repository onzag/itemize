"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const mui_core_1 = require("./mui-core");
const moment_1 = __importDefault(require("moment"));
const moment_2 = __importDefault(require("@date-io/moment"));
function SSRSheetsRemover(props) {
    react_1.useEffect(() => {
        const ssrStyles = document.querySelector('#ssr-sheets');
        if (ssrStyles) {
            ssrStyles.parentElement.removeChild(ssrStyles);
        }
    }, []);
    // buggy typescript
    return props.children;
}
exports.SSRSheetsRemover = SSRSheetsRemover;
function appWrapper(app, config) {
    // we create the material ui theme
    const theme = mui_core_1.createMuiTheme({
        typography: {
            fontFamily: "'" + config.fontName + "', sans-serif",
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
        },
    });
    return (react_1.default.createElement(mui_core_1.ThemeProvider, { theme: theme },
        react_1.default.createElement(mui_core_1.CssBaseline, null),
        react_1.default.createElement(SSRSheetsRemover, null, app)));
}
exports.appWrapper = appWrapper;
function mainWrapper(mainComponent, localeContext) {
    const languageDeregionalized = localeContext.language.includes("-") ?
        localeContext.language.split("-")[0] : localeContext.language;
    return (react_1.default.createElement(mui_core_1.MuiPickersUtilsProvider, { utils: moment_2.default, locale: languageDeregionalized, libInstance: moment_1.default }, mainComponent));
}
exports.mainWrapper = mainWrapper;
