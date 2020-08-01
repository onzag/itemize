"use strict";
/**
 * Contains the fast prototyping wrappers for usage
 * with the itemize application in the fast prototyping mode
 *
 * @packageDocumentation
 */
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
/**
 * Removes the #ssr-sheets component that is injected by the collector if
 * SSR was used
 * @param props the props for the sheet remover
 * @returns a react node
 */
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
/**
 * The appwrapper is the static wrapper that does not really ever change and stays on top
 * of the entire application for this reason, it's expected to render once
 *
 * For fast prototyping we use material ui, and as such we pass those providers here
 *
 * @param app the application that react is asking to render
 * @param config the configuration that is being used, this is the same as the config.json
 */
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
/**
 * The main wrapper stays under the app and it's a dynamic component that will be requested
 * to updated if the app locale context changes, which creates a chain effect
 *
 * for fast prototyping we use the mui pickers utility for material ui pickers, and these
 * need to change according to locale
 *
 * @param mainComponent the main component that is under the app
 * @param localeContext the locale that we are using
 */
function mainWrapper(mainComponent, localeContext) {
    const languageDeregionalized = localeContext.language.includes("-") ?
        localeContext.language.split("-")[0] : localeContext.language;
    return (react_1.default.createElement(mui_core_1.MuiPickersUtilsProvider, { utils: moment_2.default, locale: languageDeregionalized, libInstance: moment_1.default }, mainComponent));
}
exports.mainWrapper = mainWrapper;
