"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/styles");
const styles_2 = require("./styles");
const Include_1 = require("../../../../base/Root/Module/ItemDefinition/Include");
const core_1 = require("@material-ui/core");
const app_1 = require("../../../internal/app");
const IncludeCalloutWarningWithStyles = styles_1.withStyles(styles_2.style)((props) => {
    let calloutExcludedWarning = null;
    if (props.include.isExclusionCallout() &&
        props.state.exclusionState === Include_1.IncludeExclusionState.EXCLUDED) {
        calloutExcludedWarning = props.include.getI18nDataFor(props.locale.language).callout_excluded_label;
    }
    return (<div className={props.classes.container}>
      {calloutExcludedWarning ? <div className={props.classes.warning}>
        <core_1.Icon className={props.classes.icon}>warning</core_1.Icon>
        {calloutExcludedWarning}
      </div> : null}
    </div>);
});
function IncludeCalloutWarning(props) {
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
            <IncludeCalloutWarningWithStyles {...props} locale={locale}/>
          </styles_1.ThemeProvider>}
    </app_1.LocaleContext.Consumer>);
}
exports.default = IncludeCalloutWarning;
