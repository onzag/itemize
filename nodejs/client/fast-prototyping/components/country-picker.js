"use strict";
/**
 * Contains a country picker that allows the user to fully select their own country
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const localization_1 = require("../../components/localization");
const mui_core_1 = require("../mui-core");
const AppCountryRetriever_1 = __importDefault(require("../../components/localization/AppCountryRetriever"));
/**
 * Contains a country picker that allows the user to fully select their own country
 *
 * Picking a country will affect language and currency
 *
 * This country picker is heavy stuff, despite it being a rather simple component
 * it has to render so many countries it can make the app slow
 *
 * For that reason it will not keep itself mounted as the generated tree can be rather large
 */
class CountryPicker extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        };
        this.handleButtonSelectClick = this.handleButtonSelectClick.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
    }
    handleButtonSelectClick(e) {
        this.setState({
            anchorEl: e.currentTarget,
        });
    }
    handleMenuClose() {
        this.setState({
            anchorEl: null,
        });
    }
    handleCountryChange(changeCountryToFn, code) {
        this.setState({
            anchorEl: null,
        });
        changeCountryToFn(code);
    }
    render() {
        return (react_1.default.createElement(AppCountryRetriever_1.default, null, (countryData) => {
            const menu = this.state.anchorEl ? react_1.default.createElement(mui_core_1.Menu, { anchorEl: this.state.anchorEl, 
                // this is important to keep it false in orer to ensure the app isn't sluggish
                keepMounted: false, open: !!this.state.anchorEl, onClose: this.handleMenuClose }, countryData.availableCountries.map((ac) => (react_1.default.createElement(mui_core_1.MenuItem, { key: ac.code, selected: ac.code === countryData.currentCountry.code, onClick: this.handleCountryChange.bind(this, countryData.changeCountryTo, ac.code) },
                ac.emoji,
                " ",
                localization_1.capitalize(ac.native))))) : null;
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(mui_core_1.Button, { classes: { root: this.props.className }, color: "inherit", startIcon: countryData.currentCountry.emoji, onClick: this.handleButtonSelectClick }, this.props.useCode ? countryData.currentCountry.code : countryData.currentCountry.native),
                menu));
        }));
    }
}
exports.CountryPicker = CountryPicker;
