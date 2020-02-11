"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const app_1 = require("../../../internal/app");
const imported_resources_1 = require("../../../../imported-resources");
const styles_1 = require("@material-ui/styles");
const styles_2 = require("./styles");
const PropertyViewField_1 = __importDefault(require("./PropertyViewField"));
const PropertyViewDateTime_1 = __importDefault(require("./PropertyViewDateTime"));
const PropertyViewBoolean_1 = __importDefault(require("./PropertyViewBoolean"));
const PropertyViewText_1 = __importDefault(require("./PropertyViewText"));
const PropertyViewLocation_1 = __importDefault(require("./PropertyViewLocation"));
const typeRegistry = {
    string: PropertyViewField_1.default,
    integer: PropertyViewField_1.default,
    number: PropertyViewField_1.default,
    boolean: PropertyViewBoolean_1.default,
    text: PropertyViewText_1.default,
    currency: PropertyViewField_1.default,
    unit: PropertyViewField_1.default,
    password: PropertyViewField_1.default,
    year: PropertyViewField_1.default,
    datetime: PropertyViewDateTime_1.default,
    date: PropertyViewDateTime_1.default,
    time: PropertyViewDateTime_1.default,
    location: PropertyViewLocation_1.default,
    // TODO
    files: null,
};
const PropertyViewStylesApplier = styles_1.withStyles(styles_2.style)((props) => {
    // First get the element by the type
    const Element = typeRegistry[props.property.getType()];
    return (<Element {...props} language={props.locale.language} i18n={props.locale.i18n} currency={imported_resources_1.currencies[props.locale.currency]} country={imported_resources_1.countries[props.locale.country]} classes={props.classes}/>);
});
function PropertyView(props) {
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
            <PropertyViewStylesApplier {...props} locale={locale}/>
          </styles_1.ThemeProvider>}
    </app_1.LocaleContext.Consumer>);
}
exports.default = PropertyView;
function RawBasePropertyView(props) {
    return (<div>
      {props.value}
    </div>);
}
exports.RawBasePropertyView = RawBasePropertyView;
