"use strict";
/**
 * The language picker component allows the user to choose a language and update the app
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
const AppLanguageRetriever_1 = __importDefault(require("../../components/localization/AppLanguageRetriever"));
/**
 * Allows the user to choose a language from the language list
 *
 * Because there aren't usually many languages this picker tends to be rather lightweight however
 * it still remains unmounted by default
 */
class LanguagePicker extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        };
        this.handleButtonSelectClick = this.handleButtonSelectClick.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
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
    handleLanguageChange(changeLanguageToFn, code) {
        this.setState({
            anchorEl: null,
        });
        if (this.props.handleLanguageChange) {
            this.props.handleLanguageChange(code, changeLanguageToFn);
        }
        else {
            changeLanguageToFn(code);
        }
    }
    render() {
        return (react_1.default.createElement(AppLanguageRetriever_1.default, null, (languageData) => {
            let currentLanguage = languageData.currentLanguage;
            if (this.props.currentCode) {
                currentLanguage = languageData.availableLanguages.find((l) => l.code === this.props.currentCode);
            }
            if (currentLanguage === null) {
                return null;
            }
            const menu = this.state.anchorEl ? react_1.default.createElement(mui_core_1.Menu, { anchorEl: this.state.anchorEl, keepMounted: false, open: !!this.state.anchorEl, onClose: this.handleMenuClose }, languageData.availableLanguages.map((al) => (react_1.default.createElement(mui_core_1.MenuItem, { key: al.code, selected: al.code === currentLanguage.code, onClick: this.handleLanguageChange.bind(this, languageData.changeLanguageTo, al.code) }, localization_1.capitalize(al.name))))) : null;
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(mui_core_1.Button, { classes: { root: this.props.className }, color: "inherit", startIcon: react_1.default.createElement(mui_core_1.TranslateIcon, null), onClick: this.handleButtonSelectClick }, !this.props.shrinkingDisplay ?
                    (this.props.useCode ? currentLanguage.code : currentLanguage.name) :
                    react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement("span", { className: this.props.shrinkingDisplayStandardClassName }, currentLanguage.name),
                        react_1.default.createElement("span", { className: this.props.shrinkingDisplayShrunkClassName }, currentLanguage.code))),
                menu));
        }));
    }
}
exports.LanguagePicker = LanguagePicker;
