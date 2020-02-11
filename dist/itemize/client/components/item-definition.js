"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const item_definition_1 = require("../providers/item-definition");
const deep_equal_1 = __importDefault(require("deep-equal"));
class ActualItemDefinitionLoader extends react_1.default.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.itemDefinitionContext.loadError !== this.props.itemDefinitionContext.loadError ||
            nextProps.children !== this.props.children ||
            nextProps.itemDefinitionContext.blocked !== this.props.itemDefinitionContext.blocked ||
            nextProps.itemDefinitionContext.blockedButDataAccessible !==
                this.props.itemDefinitionContext.blockedButDataAccessible ||
            nextProps.itemDefinitionContext.notFound !== this.props.itemDefinitionContext.notFound ||
            nextProps.itemDefinitionContext.loading !== this.props.itemDefinitionContext.loading;
    }
    render() {
        return this.props.children({
            loading: this.props.itemDefinitionContext.loading,
            notFound: this.props.itemDefinitionContext.notFound,
            blocked: this.props.itemDefinitionContext.blocked,
            hasBlockedAccess: this.props.itemDefinitionContext.blockedButDataAccessible,
            error: this.props.itemDefinitionContext.loadError,
            reload: this.props.itemDefinitionContext.reload,
        });
    }
}
/**
 * This safe element assumes success and will render success unless proven
 * otherwise, there's no loading, it will use whatever it has stored meanwhile
 */
function ItemDefinitionLoader(props) {
    return (<item_definition_1.ItemDefinitionContext.Consumer>{(itemDefinitionContext) => (<ActualItemDefinitionLoader {...props} itemDefinitionContext={itemDefinitionContext}/>)}</item_definition_1.ItemDefinitionContext.Consumer>);
}
exports.ItemDefinitionLoader = ItemDefinitionLoader;
class ActualSubmitActioner extends react_1.default.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.children !== this.props.children ||
            nextProps.itemDefinitionContext.submitError !== this.props.itemDefinitionContext.submitError ||
            nextProps.itemDefinitionContext.submitting !== this.props.itemDefinitionContext.submitting ||
            nextProps.itemDefinitionContext.submitted !== this.props.itemDefinitionContext.submitted;
    }
    render() {
        return this.props.children({
            submitError: this.props.itemDefinitionContext.submitError,
            submitting: this.props.itemDefinitionContext.submitting,
            submitted: this.props.itemDefinitionContext.submitted,
            submit: this.props.itemDefinitionContext.submit,
            dismissError: this.props.itemDefinitionContext.dismissSubmitError,
            dismissSubmitted: this.props.itemDefinitionContext.dismissSubmitted,
        });
    }
}
function SubmitActioner(props) {
    return (<item_definition_1.ItemDefinitionContext.Consumer>{(itemDefinitionContext) => (<ActualSubmitActioner {...props} itemDefinitionContext={itemDefinitionContext}/>)}</item_definition_1.ItemDefinitionContext.Consumer>);
}
exports.SubmitActioner = SubmitActioner;
class ActualSearchActioner extends react_1.default.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.children !== this.props.children ||
            nextProps.itemDefinitionContext.searchError !== this.props.itemDefinitionContext.searchError ||
            nextProps.itemDefinitionContext.searching !== this.props.itemDefinitionContext.searching ||
            !deep_equal_1.default(nextProps.itemDefinitionContext.searchResults, this.props.itemDefinitionContext.searchResults);
    }
    render() {
        return this.props.children({
            searchError: this.props.itemDefinitionContext.searchError,
            searching: this.props.itemDefinitionContext.searching,
            searchResults: this.props.itemDefinitionContext.searchResults,
            search: this.props.itemDefinitionContext.search,
            dismissSearchResults: this.props.itemDefinitionContext.dismissSearchResults,
            dismissSearchError: this.props.itemDefinitionContext.dismissSearchError,
        });
    }
}
function SearchActioner(props) {
    return (<item_definition_1.ItemDefinitionContext.Consumer>{(itemDefinitionContext) => (<ActualSearchActioner {...props} itemDefinitionContext={itemDefinitionContext}/>)}</item_definition_1.ItemDefinitionContext.Consumer>);
}
exports.SearchActioner = SearchActioner;
