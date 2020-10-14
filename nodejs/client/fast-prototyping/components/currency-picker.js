"use strict";
/**
 * Contains the currency picker fast prototyping element which allows the user
 * to select a currency
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyPicker = void 0;
const react_1 = __importDefault(require("react"));
const localization_1 = require("../../components/localization");
const mui_core_1 = require("../mui-core");
const AppCurrencyRetriever_1 = __importDefault(require("../../components/localization/AppCurrencyRetriever"));
/**
 * Contains the currency picker fast prototyping element which allows the user
 * to select a currency
 *
 * Similarly to the country picker the currency picker can be rather heavy
 */
class CurrencyPicker extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        };
        this.handleButtonSelectClick = this.handleButtonSelectClick.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);
        this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
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
    handleCurrencyChange(changeCurrencyToFn, code) {
        this.setState({
            anchorEl: null,
        });
        if (this.props.handleCurrencyChange) {
            this.props.handleCurrencyChange(code, changeCurrencyToFn);
        }
        else {
            changeCurrencyToFn(code);
        }
    }
    render() {
        return (react_1.default.createElement(AppCurrencyRetriever_1.default, null, (currencyData) => {
            let currentCurrency = currencyData.currentCurrency;
            if (this.props.currentCode) {
                currentCurrency = currencyData.availableCurrencies.find((c) => c.code === this.props.currentCode);
            }
            if (currentCurrency === null) {
                return null;
            }
            const menu = this.state.anchorEl ? react_1.default.createElement(mui_core_1.Menu, { anchorEl: this.state.anchorEl, 
                // same optimization here
                keepMounted: false, open: !!this.state.anchorEl, onClose: this.handleMenuClose }, currencyData.availableCurrencies.map((ac) => (react_1.default.createElement(mui_core_1.MenuItem, { key: ac.code, selected: ac.code === currentCurrency.code, onClick: this.handleCurrencyChange.bind(this, currencyData.changeCurrencyTo, ac.code) },
                react_1.default.createElement("b", null, (ac.symbol || ac.code) + " (" + ac.code + ")"),
                "\u00A0-\u00A0",
                localization_1.capitalize(ac.name))))) : null;
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(mui_core_1.Button, { classes: { root: this.props.className }, color: "inherit", startIcon: react_1.default.createElement("b", null, currentCurrency.symbol), onClick: this.handleButtonSelectClick },
                    this.props.useCode ? currentCurrency.code : currentCurrency.name,
                    this.props.useCode ? "" : " " + currentCurrency.code),
                menu));
        }));
    }
}
exports.CurrencyPicker = CurrencyPicker;
