"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const localization_1 = require("../../components/localization");
const mui_core_1 = require("../mui-core");
const AppCurrencyRetriever_1 = __importDefault(require("../../components/localization/AppCurrencyRetriever"));
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
        changeCurrencyToFn(code);
    }
    render() {
        return (react_1.default.createElement(AppCurrencyRetriever_1.default, null, (currencyData) => {
            const menu = this.state.anchorEl ? react_1.default.createElement(mui_core_1.Menu, { anchorEl: this.state.anchorEl, keepMounted: false, open: !!this.state.anchorEl, onClose: this.handleMenuClose }, currencyData.availableCurrencies.map((ac) => (react_1.default.createElement(mui_core_1.MenuItem, { key: ac.code, selected: ac.code === currencyData.currentCurrency.code, onClick: this.handleCurrencyChange.bind(this, currencyData.changeCurrencyTo, ac.code) },
                react_1.default.createElement("b", null, ac.symbol || ac.code),
                "\u00A0-\u00A0",
                localization_1.capitalize(ac.name))))) : null;
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(mui_core_1.Button, { classes: { root: this.props.className }, color: "inherit", startIcon: react_1.default.createElement("b", null, currencyData.currentCurrency.symbol), onClick: this.handleButtonSelectClick }, this.props.useCode ? currencyData.currentCurrency.code : currencyData.currentCurrency.name),
                menu));
        }));
    }
}
exports.CurrencyPicker = CurrencyPicker;
