"use strict";
/**
 * Contains an external dialog that are usually referred errors and messages
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalDialogs = void 0;
const react_1 = __importDefault(require("react"));
const mui_core_1 = require("../../mui-core");
const dialog_1 = require("../dialog");
const LocationStateReader_1 = __importDefault(require("../../../components/navigation/LocationStateReader"));
const I18nReadMany_1 = __importDefault(require("../../../components/localization/I18nReadMany"));
/**
 * The external dialog style creator
 * @returns a bunch of styles
 */
const externalDialogsStyle = () => mui_core_1.createStyles({
    needsUpdateContent: {
        padding: "1rem 0.5rem",
    },
});
/**
 * The external dialogs component, given a
 * err, msg, and msgTitle in the query string, all as string will
 * display a dialog as long as they are there
 * @returns a react element
 */
exports.ExternalDialogs = mui_core_1.withStyles(externalDialogsStyle)((props) => {
    return (react_1.default.createElement(LocationStateReader_1.default, { stateIsInQueryString: true, defaultState: { err: null, msg: null, msgtitle: null } }, (state, setLocationState) => {
        const clear = () => {
            setLocationState({ err: null, msg: null, msgtitle: null }, true);
        };
        const title = state.err ? "generic_error" : state.msgtitle;
        if (!title) {
            return null;
        }
        const description = state.err ? `error.${state.err}` : state.msg;
        return react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(I18nReadMany_1.default, { data: [
                    { id: title, capitalize: true },
                    { id: description, capitalize: true },
                    { id: "ok", capitalize: true }
                ] }, (i18nTitle, i18nDescription, ok) => {
                return (react_1.default.createElement(dialog_1.DialogResponsive, { title: i18nTitle, open: !!title, onClose: clear, buttons: react_1.default.createElement(mui_core_1.Button, { color: "primary", "aria-label": ok, startIcon: react_1.default.createElement(mui_core_1.DoneIcon, null), onClick: clear }, ok) },
                    react_1.default.createElement(mui_core_1.Typography, { variant: "body1", className: props.classes.needsUpdateContent }, i18nDescription)));
            }));
    }));
});
