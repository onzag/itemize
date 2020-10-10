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
const item_1 = require("../../providers/item");
const deep_equal_1 = __importDefault(require("deep-equal"));
/**
 * The actual class that does the search heavy lifting
 */
class ActualSearchActioner extends react_1.default.Component {
    shouldComponentUpdate(nextProps) {
        // so we only update if we have different, searchError, searching status, or our searchRecords are
        // inherently different
        return nextProps.children !== this.props.children ||
            nextProps.itemContext.searchError !== this.props.itemContext.searchError ||
            nextProps.itemContext.searching !== this.props.itemContext.searching ||
            !deep_equal_1.default(nextProps.itemContext.searchRecords, this.props.itemContext.searchRecords);
    }
    render() {
        // and we pass it as the actioner
        return this.props.children({
            searchError: this.props.itemContext.searchError,
            searching: this.props.itemContext.searching,
            searchRecords: this.props.itemContext.searchRecords,
            search: this.props.itemContext.search,
            clean: this.props.itemContext.clean,
            dismissSearchResults: this.props.itemContext.dismissSearchResults,
            dismissSearchError: this.props.itemContext.dismissSearchError,
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
    return (react_1.default.createElement(item_1.ItemContext.Consumer, null, (itemContext) => (react_1.default.createElement(ActualSearchActioner, Object.assign({}, props, { itemContext: itemContext })))));
}
exports.default = SearchActioner;
