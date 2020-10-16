"use strict";
/**
 * Contains the submit, search and delete button for fast prototyping
 * usage
 *
 * @packageDocumentation
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const util_1 = require("./util");
const SubmitActioner_1 = __importDefault(require("../../components/item/SubmitActioner"));
const navigation_1 = require("../../components/navigation");
const I18nRead_1 = __importDefault(require("../../components/localization/I18nRead"));
const SearchActioner_1 = __importDefault(require("../../components/search/SearchActioner"));
const mui_core_1 = require("../mui-core");
const DeleteActioner_1 = __importDefault(require("../../components/item/DeleteActioner"));
/**
 * Provides a very useful submit button that extends via the submit
 * actioner and it's fully functional; needs to be in an item
 * definition context
 *
 * If you need to access the error please use the snackbar.tsx component
 * in addition of another submit actioner to fetch the error itself
 *
 * @param props the submit button props
 * @returns a react component
 */
function SubmitButton(props) {
    const [confirmationIsActive, setConfirmationIsActive] = react_1.useState(false);
    const CustomConfirmationComponent = props.CustomConfirmationComponent;
    return (react_1.default.createElement(SubmitActioner_1.default, null, (actioner) => {
        const runProcess = async () => {
            const status = await actioner.submit(props.options);
            props.onSubmit && (await props.onSubmit(status));
            if (!status.error && !props.redirectOnSuccess && props.redirectGoBack) {
                navigation_1.goBack();
            }
            else if (!status.error && props.redirectOnSuccess) {
                const redirectCalculated = typeof props.redirectOnSuccess === "string" ?
                    props.redirectOnSuccess : props.redirectOnSuccess(status);
                if (props.redirectGoBack) {
                    navigation_1.goBack();
                    setTimeout(() => {
                        navigation_1.localizedRedirectTo(redirectCalculated, null, props.redirectReplace);
                    }, 10);
                }
                else {
                    navigation_1.localizedRedirectTo(redirectCalculated, null, props.redirectReplace);
                }
            }
        };
        const submitAction = () => {
            if (props.CustomConfirmationComponent) {
                setConfirmationIsActive(true);
            }
            else {
                runProcess();
            }
        };
        const onCloseAction = (continueWithProcess) => {
            setConfirmationIsActive(false);
            if (continueWithProcess) {
                runProcess();
            }
            else {
                actioner.clean(props.options, "fail");
            }
        };
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(util_1.ProgressingElement, { isProgressing: actioner.submitting, className: props.wrapperClassName },
                react_1.default.createElement(mui_core_1.Button, { variant: props.buttonVariant, color: props.buttonColor, endIcon: props.buttonEndIcon, startIcon: props.buttonStartIcon, className: props.buttonClassName, disabled: props.buttonDisabled, onClick: submitAction },
                    react_1.default.createElement(I18nRead_1.default, { capitalize: true, id: props.i18nId }))),
            CustomConfirmationComponent ?
                react_1.default.createElement(CustomConfirmationComponent, { isActive: confirmationIsActive, onClose: onCloseAction }) :
                null));
    }));
}
exports.SubmitButton = SubmitButton;
/**
 * Allows to create a fast prototyping button that will trigger a search
 * once clicked, uses the search actioner and must be in an item definition context
 * in search mode
 *
 * If you need to access the error please use the snackbar.tsx component
 * in addition of another search actioner to fetch the error itself
 *
 * @param props the search button props
 * @returns a react component
 */
function SearchButton(props) {
    return (react_1.default.createElement(SearchActioner_1.default, null, (actioner) => {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(util_1.ProgressingElement, { isProgressing: actioner.searching, className: props.wrapperClassName },
                react_1.default.createElement(mui_core_1.Button, { variant: props.buttonVariant, color: props.buttonColor, endIcon: props.buttonEndIcon, startIcon: props.buttonStartIcon, className: props.buttonClassName, disabled: props.buttonDisabled, onClick: actioner.search.bind(null, props.options) },
                    react_1.default.createElement(I18nRead_1.default, { capitalize: true, id: props.i18nId })))));
    }));
}
exports.SearchButton = SearchButton;
function DeleteButton(props) {
    const [confirmationIsActive, setConfirmationIsActive] = react_1.useState(false);
    const CustomConfirmationComponent = props.CustomConfirmationComponent;
    return (react_1.default.createElement(DeleteActioner_1.default, null, (actioner) => {
        const runProcess = async () => {
            const status = await actioner.delete(props.options);
            props.onDelete && (await props.onDelete(status));
            if (!status.error && !props.redirectOnSuccess && props.redirectGoBack) {
                navigation_1.goBack();
            }
            else if (!status.error && props.redirectOnSuccess) {
                const redirectCalculated = typeof props.redirectOnSuccess === "string" ?
                    props.redirectOnSuccess : props.redirectOnSuccess(status);
                if (props.redirectGoBack) {
                    navigation_1.goBack();
                    setTimeout(() => {
                        navigation_1.localizedRedirectTo(redirectCalculated, null, props.redirectReplace);
                    }, 10);
                }
                else {
                    navigation_1.localizedRedirectTo(redirectCalculated, null, props.redirectReplace);
                }
            }
        };
        const deleteAction = () => {
            if (props.CustomConfirmationComponent) {
                setConfirmationIsActive(true);
            }
            else {
                runProcess();
            }
        };
        const onCloseAction = (continueWithProcess) => {
            setConfirmationIsActive(false);
            if (continueWithProcess) {
                runProcess();
            }
            else {
                actioner.clean(props.options, "fail");
            }
        };
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(util_1.ProgressingElement, { isProgressing: actioner.deleting, className: props.wrapperClassName },
                react_1.default.createElement(mui_core_1.Button, { variant: props.buttonVariant, color: props.buttonColor, endIcon: props.buttonEndIcon, startIcon: props.buttonStartIcon, className: props.buttonClassName, disabled: props.buttonDisabled, onClick: deleteAction },
                    react_1.default.createElement(I18nRead_1.default, { capitalize: true, id: props.i18nId }))),
            CustomConfirmationComponent ?
                react_1.default.createElement(CustomConfirmationComponent, { isActive: confirmationIsActive, onClose: onCloseAction }) :
                null));
    }));
}
exports.DeleteButton = DeleteButton;
