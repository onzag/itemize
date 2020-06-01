"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const localization_1 = require("../../components/localization");
const core_1 = require("@material-ui/core");
const Translate_1 = __importDefault(require("@material-ui/icons/Translate"));
const AppLanguageRetriever_1 = __importDefault(require("../../components/localization/AppLanguageRetriever"));
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
        changeLanguageToFn(code);
    }
    render() {
        return (react_1.default.createElement(AppLanguageRetriever_1.default, null, (languageData) => {
            const menu = this.state.anchorEl ? react_1.default.createElement(core_1.Menu, { anchorEl: this.state.anchorEl, keepMounted: false, open: !!this.state.anchorEl, onClose: this.handleMenuClose }, languageData.availableLanguages.map((al) => (react_1.default.createElement(core_1.MenuItem, { key: al.code, selected: al.code === languageData.currentLanguage.code, onClick: this.handleLanguageChange.bind(this, languageData.changeLanguageTo, al.code) }, localization_1.capitalize(al.name))))) : null;
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(core_1.Button, { classes: { root: this.props.className }, color: "inherit", startIcon: react_1.default.createElement(Translate_1.default, null), onClick: this.handleButtonSelectClick }, !this.props.shrinkingDisplay ?
                    (this.props.useCode ? languageData.currentLanguage.code : languageData.currentLanguage.name) :
                    react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement("span", { className: this.props.shrinkingDisplayStandardClassName }, languageData.currentLanguage.name),
                        react_1.default.createElement("span", { className: this.props.shrinkingDisplayShrunkClassName }, languageData.currentLanguage.code))),
                menu));
        }));
    }
}
exports.LanguagePicker = LanguagePicker;
