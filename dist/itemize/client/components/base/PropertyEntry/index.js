"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const PropertyEntryBoolean_1 = __importDefault(require("./PropertyEntryBoolean"));
const PropertyEntryText_1 = __importDefault(require("./PropertyEntryText"));
const PropertyEntryDateTime_1 = __importDefault(require("./PropertyEntryDateTime"));
const PropertyEntryLocation_1 = __importDefault(require("./PropertyEntryLocation"));
const PropertyEntryFiles_1 = __importDefault(require("./PropertyEntryFiles"));
const PropertyEntryNumeric_1 = __importDefault(require("./PropertyEntryNumeric"));
const PropertyEntrySelect_1 = __importDefault(require("./PropertyEntrySelect"));
const PropertyEntryField_1 = __importDefault(require("./PropertyEntryField"));
const app_1 = require("../../../internal/app");
const imported_resources_1 = require("../../../../imported-resources");
const styles_1 = require("@material-ui/styles");
const styles_2 = require("./styles");
const typeRegistry = {
    string: PropertyEntryField_1.default,
    integer: PropertyEntryNumeric_1.default,
    number: PropertyEntryNumeric_1.default,
    boolean: PropertyEntryBoolean_1.default,
    text: PropertyEntryText_1.default,
    currency: PropertyEntryNumeric_1.default,
    unit: PropertyEntryNumeric_1.default,
    password: PropertyEntryField_1.default,
    year: PropertyEntryNumeric_1.default,
    datetime: PropertyEntryDateTime_1.default,
    date: PropertyEntryDateTime_1.default,
    time: PropertyEntryDateTime_1.default,
    location: PropertyEntryLocation_1.default,
    files: PropertyEntryFiles_1.default,
};
const PropertyEntryStylesApplier = styles_1.withStyles(styles_2.style)((props) => {
    // First get the element by the type
    const Element = props.property.hasSpecificValidValues() ?
        PropertyEntrySelect_1.default :
        typeRegistry[props.property.getType()];
    return (<Element {...props} language={props.locale.language} i18n={props.locale.i18n} currency={imported_resources_1.currencies[props.locale.currency]} country={imported_resources_1.countries[props.locale.country]} classes={props.classes}/>);
});
function PropertyEntry(props) {
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
            <PropertyEntryStylesApplier {...props} locale={locale}/>
          </styles_1.ThemeProvider>}
    </app_1.LocaleContext.Consumer>);
}
exports.default = PropertyEntry;
