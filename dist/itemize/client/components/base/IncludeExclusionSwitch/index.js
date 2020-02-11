"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const app_1 = require("../../../internal/app");
const styles_1 = require("@material-ui/styles");
const styles_2 = require("./styles");
const TernaryExclusionSwitch_1 = __importDefault(require("./TernaryExclusionSwitch"));
const StandardExclusionSwitch_1 = __importDefault(require("./StandardExclusionSwitch"));
const IncludeExclusionSwitchWithStyles = styles_1.withStyles(styles_2.style)((props) => {
    return (<div className={props.classes.container}>
      {props.include.canExclusionBeSet(props.forId, props.forVersion) ?
        (props.include.isExclusionTernary() ?
            <TernaryExclusionSwitch_1.default {...props}/> :
            <StandardExclusionSwitch_1.default {...props}/>) :
        null}
    </div>);
});
function IncludeExclusionSwitch(props) {
    let appliedTheme = styles_2.STANDARD_THEME;
    if (props.theme) {
        appliedTheme = {
            ...styles_2.STANDARD_THEME,
            ...props.theme,
        };
    }
    // Build the context and render sending the right props
    return (<app_1.LocaleContext.Consumer>
      {(locale) => <styles_1.ThemeProvider theme={appliedTheme}>
            <IncludeExclusionSwitchWithStyles {...props} locale={locale}/>
          </styles_1.ThemeProvider>}
    </app_1.LocaleContext.Consumer>);
}
exports.default = IncludeExclusionSwitch;
