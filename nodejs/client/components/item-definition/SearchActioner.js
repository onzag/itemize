"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const item_definition_1 = require("../../providers/item-definition");
const deep_equal_1 = __importDefault(require("deep-equal"));
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
            searchRecords: this.props.itemDefinitionContext.searchRecords,
            search: this.props.itemDefinitionContext.search,
            clean: this.props.itemDefinitionContext.clean,
            dismissSearchResults: this.props.itemDefinitionContext.dismissSearchResults,
            dismissSearchError: this.props.itemDefinitionContext.dismissSearchError,
        });
    }
}
function SearchActioner(props) {
    return (react_1.default.createElement(item_definition_1.ItemDefinitionContext.Consumer, null, (itemDefinitionContext) => (react_1.default.createElement(ActualSearchActioner, Object.assign({}, props, { itemDefinitionContext: itemDefinitionContext })))));
}
exports.default = SearchActioner;
