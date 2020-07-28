"use strict";
/**
 * This file contains the search actioner which is capable of triggering searches
 * in the item definition context
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const item_definition_1 = require("../../providers/item-definition");
const deep_equal_1 = __importDefault(require("deep-equal"));
/**
 * The actual class that does the search heavy lifting
 */
class ActualSearchActioner extends react_1.default.Component {
    shouldComponentUpdate(nextProps) {
        // so we only update if we have different, searchError, searching status, or our searchRecords are
        // inherently different
        return nextProps.children !== this.props.children ||
            nextProps.itemDefinitionContext.searchError !== this.props.itemDefinitionContext.searchError ||
            nextProps.itemDefinitionContext.searching !== this.props.itemDefinitionContext.searching ||
            !deep_equal_1.default(nextProps.itemDefinitionContext.searchRecords, this.props.itemDefinitionContext.searchRecords);
    }
    render() {
        // and we pass it as the actioner
        return this.props.children({
            searchError: this.props.itemDefinitionContext.searchError,
            searching: this.props.itemDefinitionContext.searching,
            searchRecords: this.props.itemDefinitionContext.searchRecords,
            search: this.props.itemDefinitionContext.search,
            clean: this.props.itemDefinitionContext.clean,
            dismissSearchResults: this.props.itemDefinitionContext.dismissSearchResults,
            dismissSearchError: this.props.itemDefinitionContext.dismissSearchError,
        });
    }
}
/**
 * The search actioner allows to run contextual searches in the current item definition
 * please ensure that such context is in search mode as failure to do so will result
 * in an error once a search is attempted
 * @param props the props
 * @returns a react element
 */
function SearchActioner(props) {
    return (react_1.default.createElement(item_definition_1.ItemDefinitionContext.Consumer, null, (itemDefinitionContext) => (react_1.default.createElement(ActualSearchActioner, Object.assign({}, props, { itemDefinitionContext: itemDefinitionContext })))));
}
exports.default = SearchActioner;
